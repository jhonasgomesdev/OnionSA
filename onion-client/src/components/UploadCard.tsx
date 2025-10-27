import { useState } from "react";
import {
  CloudArrowUpIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import api from "../service/api";

export default function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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

    const formData = new FormData();
    formData.append("spreadsheet", file);

    try {
      setStatus("uploading");
      setMessage("");

      await api.post("/spreadsheet/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("success");
      setMessage("Planilha enviada com sucesso!");
      setFile(null);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err.response?.data?.message || "Erro ao enviar planilha.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-10 rounded-2xl shadow-soft hover:shadow-lg transition w-96 border border-gray-200">
      <label className="flex flex-col items-center justify-center cursor-pointer">
        <CloudArrowUpIcon className="h-16 w-16 text-brand-600 mb-4" />
        <span className="text-lg font-semibold text-brand-800 mb-2">
          Selecione sua planilha
        </span>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="hidden"
        />
        {file && (
          <p className="text-sm text-gray-500 mt-2">{file.name}</p>
        )}
      </label>

      <button
        onClick={handleUpload}
        disabled={status === "uploading"}
        className={`mt-6 px-6 py-2 rounded-lg font-semibold transition ${
          status === "uploading"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-brand-600 hover:bg-brand-700 text-white"
        }`}
      >
        {status === "uploading" ? "Enviando..." : "Enviar Planilha"}
      </button>

      {status === "success" && (
        <div className="flex items-center text-green-600 mt-4">
          <CheckCircleIcon className="h-6 w-6 mr-2" />
          <span>{message}</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center text-red-600 mt-4">
          <XCircleIcon className="h-6 w-6 mr-2" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}