import { ListBulletIcon } from "@heroicons/react/24/outline";

interface SalesListCardProps {
  loading: boolean;
  onOpenModal: () => void;
}

export default function SalesListCard({ loading, onOpenModal }: SalesListCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-200 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Lista de Vendas Detalhada</h3>
          <p className="text-sm text-gray-600">Visualize todos os pedidos de venda com detalhes completos</p>
        </div>
        <button
          onClick={onOpenModal}
          disabled={loading}
          className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ListBulletIcon className="h-5 w-5" />
          {loading ? 'Carregando...' : 'Abrir Lista'}
        </button>
      </div>
    </div>
  );
}