import { useState, useRef } from "react";
import api from "../service/api";
import {
  CloudArrowUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

interface UploadCardProps {
  onUpload?: (file: File) => Promise<any>;
  isUploading?: boolean;
}

export default function UploadCard({ onUpload, isUploading = false }: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isValidFileType = (file: File): boolean => {
    const allowedTypes = ['.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    return allowedTypes.includes(fileExtension);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!isValidFileType(selectedFile)) {
        setStatus("error");
        setMessage("Por favor, selecione um arquivo Excel (.xlsx ou .xls)");
        return;
      }
      
      setFile(selectedFile);
      setStatus("idle");
      setMessage("");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (!isValidFileType(droppedFile)) {
        setStatus("error");
        setMessage("Por favor, selecione um arquivo Excel (.xlsx ou .xls)");
        return;
      }
      
      setFile(droppedFile);
      setStatus("idle");
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Por favor, selecione um arquivo antes de enviar.");
      setStatus("error");
      return;
    }

    try {
      setStatus("uploading");
      setMessage("");

      let result;

      if (onUpload) {
        result = await onUpload(file);
      } else {
        // Fallback para a implementação original
        const formData = new FormData();
        formData.append("spreadsheet", file);
        
        const response = await api.post("/spreadsheet/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        result = response.data;
      }

      setStatus("success");
      setMessage(result?.message || "Planilha enviada com sucesso!");
      
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err.response?.data?.message || err.response?.data || "Erro ao enviar planilha.");
    }
  };

  const handleContainerClick = () => {
    if (!isUploading && status !== "uploading") {
      fileInputRef.current?.click();
    }
  };

  const isButtonDisabled = status === "uploading" || isUploading;

  return (
    <div 
      className={`flex flex-col items-center justify-center bg-white p-10 rounded-2xl shadow-soft hover:shadow-lg transition w-96 border-2 border-dashed ${
        isDragging 
          ? 'border-brand-500 bg-brand-50' 
          : 'border-gray-200 hover:border-gray-300'
      } ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleContainerClick}
    >
      {/* Input file hidden */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="hidden"
        disabled={isButtonDisabled}
      />

      {/* Conteúdo visual */}
      {status === "uploading" || isUploading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-600 mb-4"></div>
          <span className="text-lg font-semibold text-brand-800 mb-2">
            Enviando...
          </span>
        </div>
      ) : (
        <>
          <CloudArrowUpIcon className="h-16 w-16 text-brand-600 mb-4" />
          <span className="text-lg font-semibold text-brand-800 mb-2 text-center">
            {file ? "Arquivo selecionado" : "Clique ou arraste sua planilha"}
          </span>
        </>
      )}

      {/* Info do arquivo selecionado */}
      {file && status !== "uploading" && !isUploading && (
        <div className="flex items-center gap-2 mt-2 p-3 bg-gray-50 rounded-lg w-full">
          <DocumentIcon className="h-5 w-5 text-gray-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}

      {/* Botão de upload - SEMPRE renderizado quando há arquivo */}
      {file && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleUpload();
          }}
          disabled={isButtonDisabled}
          className="mt-6 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed w-full"
        >
          {isButtonDisabled ? "Enviando..." : "Enviar Planilha"}
        </button>
      )}

      {/* Mensagens de status */}
      {status === "success" && (
        <div className="flex items-center text-green-600 mt-4 p-3 bg-green-50 rounded-lg w-full">
          <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="text-sm">{message}</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center text-red-600 mt-4 p-3 bg-red-50 rounded-lg w-full">
          <XCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="text-sm">{message}</span>
        </div>
      )}

      {/* Texto de ajuda */}
      {!file && (
        <p className="text-xs text-gray-500 mt-4 text-center">
          Formatos suportados: .xlsx, .xls
        </p>
      )}
    </div>
  );
}