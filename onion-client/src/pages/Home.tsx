import UploadCard from "../components/UploadCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h2 className="text-3xl font-semibold text-brand-700 mb-2">Upload de Vendas</h2>
      <p className="text-gray-600 mb-6">
        Faça o upload da planilha de vendas para aprimorar a análise dos resultados.
      </p>
      <button
        //onClick={handleDownloadModel}
        className="mb-10 bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-2 rounded-lg shadow-soft"
      >
        📥 Download do Modelo
      </button>
      <UploadCard />
    </div>
  );
}