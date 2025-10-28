import { useState } from "react";
import { XMarkIcon, CheckBadgeIcon, ExclamationTriangleIcon, DocumentTextIcon, ExclamationCircleIcon, CalendarIcon, MapPinIcon, BuildingOfficeIcon, ShoppingBagIcon, HashtagIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface UploadResult {
  message: string;
  validCount: number;
  invalidCount: number;
  errors?: any[];
}

interface UploadResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: UploadResult | null;
}

// Função para formatar mensagens de erro de forma amigável
function formatErrorMessage(error: string): string {
  const errorMappings: { [key: string]: string } = {
    "Razão social é obrigatório.": "Razão social é obrigatória",
    "CEP precisa conter 8 digitos.": "CEP precisa conter 8 dígitos",
    "O nome do produto precisa ser um dos seguintes: celular, notebook, televisão.": "Produto deve ser: Celular, Notebook ou Televisão",
    "O número do pedido precisa ser maior que 0.": "Número do pedido deve ser maior que zero",
    "A data do pedido deve ser igual ou inferior a data atual.": "Data do pedido não pode ser futura"
  };
  
  return errorMappings[error] || error;
}

// Componente para exibir uma linha com erro de forma expansível
function ErrorRowWithControl({ errorData, forceExpanded }: { errorData: any, forceExpanded: boolean }) {
  const [isExpanded, setIsExpanded] = useState(forceExpanded);

  // Atualiza o estado interno quando forceExpanded muda
  useState(() => {
    setIsExpanded(forceExpanded);
  });

  return (
    <div className="mb-3 border border-gray-200 rounded-lg overflow-hidden">
      {/* Cabeçalho da linha com erro - sempre visível */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          )}
          <DocumentTextIcon className="h-5 w-5 text-gray-600" />
          <div>
            <span className="font-semibold text-gray-800">
              Linha {errorData.rowNumber} - CPF: {errorData.row.document}
            </span>
            <div className="text-sm text-gray-600 mt-1">
              {errorData.errors.length} problema(s) encontrado(s)
            </div>
          </div>
        </div>
        <div className="text-sm text-red-600 font-medium">
          {errorData.errors.length} erro(s)
        </div>
      </button>

      {/* Conteúdo expansível */}
      {isExpanded && (
        <div className="p-4 bg-white border-t border-gray-200">
          {/* Dados da linha em grid lado a lado */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            {/* Coluna 1 */}
            <div className="space-y-3">
              {/* Razão Social */}
              <div className="flex items-start gap-2">
                <BuildingOfficeIcon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Razão Social:</div>
                  <div className="text-gray-800">
                    {errorData.row.corporateReason || <span className="text-red-500 italic">Não informado</span>}
                  </div>
                </div>
              </div>
              
              {/* Produto */}
              <div className="flex items-start gap-2">
                <ShoppingBagIcon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Produto:</div>
                  <div className="text-gray-800">{errorData.row.productName}</div>
                </div>
              </div>
            </div>
            
            {/* Coluna 2 */}
            <div className="space-y-3">
              {/* CEP */}
              <div className="flex items-start gap-2">
                <MapPinIcon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">CEP:</div>
                  <div className="text-gray-800">{errorData.row.cep}</div>
                </div>
              </div>
              
              {/* Número do Pedido */}
              <div className="flex items-start gap-2">
                <HashtagIcon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Número do Pedido:</div>
                  <div className="text-gray-800">{errorData.row.orderNumber}</div>
                </div>
              </div>
            </div>
            
            {/* Data do Pedido - linha completa */}
            <div className="col-span-2">
              <div className="flex items-start gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Data do Pedido:</div>
                  <div className="text-gray-800">
                    {new Date(errorData.row.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lista de erros */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-red-700 mb-3">
              <ExclamationCircleIcon className="h-4 w-4" />
              Problemas que precisam ser corrigidos:
            </div>
            <ul className="space-y-2">
              {errorData.errors.map((error: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm text-red-600">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{formatErrorMessage(error)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function UploadResultModal({ isOpen, onClose, result }: UploadResultModalProps) {
  const [allExpanded, setAllExpanded] = useState(false);

  if (!isOpen || !result) return null;

  const hasErrors = result.invalidCount > 0;

  // Função para expandir/comprimir todas as linhas
  const toggleAllRows = () => {
    setAllExpanded(!allExpanded);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {hasErrors ? (
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upload Realizado com Observações
                  </h3>
                  <p className="text-sm text-gray-600">
                    Encontramos alguns problemas que precisam de atenção
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckBadgeIcon className="h-6 w-6 text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upload Concluído com Sucesso
                  </h3>
                  <p className="text-sm text-gray-600">
                    Todos os dados foram processados corretamente
                  </p>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {/* Mensagem principal */}
          <p className="text-gray-700 mb-6 text-center text-lg">
            {result.message}
          </p>

          {/* Estatísticas */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {result.validCount}
              </div>
              <div className="text-sm text-green-700 font-medium">
                Linhas Válidas
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {result.invalidCount}
              </div>
              <div className="text-sm text-red-700 font-medium">
                Linhas com Erro
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {result.validCount + result.invalidCount}
              </div>
              <div className="text-sm text-blue-700 font-medium">
                Total Processado
              </div>
            </div>
          </div>

          {/* Detalhes dos erros */}
          {hasErrors && result.errors && (
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">
                    Linhas com problemas ({result.invalidCount} linha(s))
                  </span>
                  <button
                    onClick={toggleAllRows}
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    {allExpanded ? 'Comprimir Todas' : 'Expandir Todas'}
                  </button>
                </div>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                {result.errors.map((errorData: any, index: number) => (
                  <ErrorRowWithControl 
                    key={index} 
                    errorData={errorData} 
                    forceExpanded={allExpanded}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 bg-brand-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            {hasErrors ? 'Entendido' : 'Fechar'}
          </button>
        </div>
      </div>
    </div>
  );
}