import React from 'react';

interface RegionData {
  region: string;
  sales: number;
  revenue: number;
}

interface RegionSalesMapProps {
  data: RegionData[];
}

const RegionSalesMap: React.FC<RegionSalesMapProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Nenhum dado disponível
      </div>
    );
  }

  const validData = data.filter(item => 
    item.region && 
    !['Baixo', 'Baiso', 'Médio', 'Alto', 'Muito Alto'].includes(item.region)
  );

  if (validData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Nenhum dado de região válido disponível
      </div>
    );
  }

  // Calcular totais para a lógica de cores
  const totalSales = validData.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = validData.reduce((sum, item) => sum + item.revenue, 0);
  
  // Calcular média de vendas por região
  const averageSales = totalSales / validData.length;
  const averageRevenue = totalRevenue / validData.length;

  // Lógica de cores baseada na comparação com a média
  const getColor = (item: RegionData) => {
    const salesRatio = item.sales / averageSales;
    const revenueRatio = item.revenue / averageRevenue;
    
    // Combina ambos os fatores (vendas e receita)
    const combinedRatio = (salesRatio + revenueRatio) / 2;

    if (combinedRatio > 1.5) return 'bg-red-500';      // Muito acima da média
    if (combinedRatio > 1.2) return 'bg-orange-500';   // Acima da média
    if (combinedRatio > 0.8) return 'bg-yellow-500';   // Na média
    if (combinedRatio > 0.5) return 'bg-blue-500';     // Abaixo da média
    return 'bg-green-500';                             // Muito abaixo da média
  };

  return (
    <div className="space-y-4"> {/* Aumentei o espaçamento */}
      {/* Grid das regiões */}
      <div className="grid grid-cols-2 gap-3 min-h-[200px]"> {/* Altura mínima */}
        {validData.map((item) => (
          <div
            key={item.region}
            className={`p-3 rounded-lg text-white ${getColor(item)} shadow-sm flex flex-col justify-between`}
          >
            <div>
              <div className="font-semibold text-sm truncate" title={item.region}>
                {item.region}
              </div>
              <div className="text-xs opacity-90 mt-1">
                {item.sales} {item.sales === 1 ? 'venda' : 'vendas'}
              </div>
            </div>
            <div className="text-xs opacity-75 mt-2">
              R$ {item.revenue.toLocaleString('pt-BR', { 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legenda com melhor espaçamento */}
      <div className="pt-4 border-t border-gray-200"> {/* Separador e padding */}
        <div className="flex flex-wrap justify-center gap-3 text-xs"> {/* Flex-wrap para responsividade */}
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Muito abaixo</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Abaixo</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-600">Na média</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-600">Acima</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">Muito acima</span>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-2">
          Baseado na média: {averageSales.toFixed(1)} vendas • R$ {averageRevenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
        </div>
      </div>
    </div>
  );
};

export default RegionSalesMap;