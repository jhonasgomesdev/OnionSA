import { ListBulletIcon, XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { type SaleOrder } from "../../service/spreadsheetApi";

interface SalesListModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: SaleOrder[];
  error: string | null;
}

export default function SalesListModal({ isOpen, onClose, orders, error }: SalesListModalProps) {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header - FIXO (sem scroll) */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ListBulletIcon className="h-6 w-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Lista de Vendas
              </h3>
              <p className="text-sm text-gray-600">
                {error ? "Erro ao carregar" : `${orders.length} pedido(s) encontrado(s)`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Body - COM SCROLL VERTICAL */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {error ? (
              <div className="text-center py-8">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-red-700 mb-2">Erro ao carregar dados</h4>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Fechar
                </button>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum pedido encontrado</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Produto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Preço
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Data de Entrega
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          Região
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.document} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.clientName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            R$ {order.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.deliveryDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.region}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - FIXO (sem scroll) */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-brand-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-brand-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}