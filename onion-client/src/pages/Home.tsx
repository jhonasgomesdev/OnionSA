import { useState } from "react";
import UploadCard from "../components/UploadCard";
import { UploadResultModal } from "../components/UploadResultModal";
import { downloadSpreadsheet, uploadSpreadsheet } from "../service/spreadsheetApi";
import {
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";

// Interface para o resultado do upload baseado no seu backend
interface UploadResult {
  message: string;
  validCount: number;
  invalidCount: number;
  errors?: any[];
}

async function handleDownloadModel() {
  try {
    const blob = await downloadSpreadsheet();

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "modelo.xlsx");
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } 
  catch (error) {
    console.error("Erro ao baixar modelo:", error);
    alert("Erro ao baixar o modelo. Tente novamente.");
  }
}

export default function Home() {
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function handleUploadSpreadsheet(file: File) {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("spreadsheet", file);

      const response = await uploadSpreadsheet(formData);
      
      console.log("Upload realizado com sucesso:", response);
      
      // Salva o resultado e abre o modal
      setUploadResult(response);
      setIsModalOpen(true);
      
      return response;
    } 
    catch (error: any) {
      console.error("Erro ao fazer upload:", error);
      
      if (error.response?.data) {
        const errorMessage = typeof error.response.data === 'string' 
          ? error.response.data 
          : error.response.data.message || 'Erro ao enviar o arquivo';
        alert(`❌ ${errorMessage}`);
      } else {
        alert("❌ Erro ao enviar o arquivo. Tente novamente.");
      }
      
      throw error;
    } finally {
      setIsUploading(false);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setUploadResult(null);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="justify-end w-full flex text-center">
        <button
          onClick={handleDownloadModel}
          className="mb-10 bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-2 rounded-lg shadow-soft flex items-center gap-2"
        >
          <ArrowDownTrayIcon className="h-6 w-6" />
          Download Modelo
        </button>
      </div>
      
      <h2 className="text-3xl font-semibold text-brand-700 mb-2">Upload de Vendas</h2>
      <p className="text-gray-600 mb-6">
        Faça o upload da planilha de vendas para aprimorar a análise dos resultados.
      </p>
      
      <UploadCard onUpload={handleUploadSpreadsheet} isUploading={isUploading} />
      
      {/* Modal de Resultados */}
      <UploadResultModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        result={uploadResult}
      />
    </div>    
  );
}