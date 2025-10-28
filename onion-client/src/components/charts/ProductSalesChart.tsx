import React from 'react';

interface ProductData {
  product: string;
  sales: number;
  revenue: number;
}

interface ProductSalesChartProps {
  data: ProductData[];
}

const ProductSalesChart: React.FC<ProductSalesChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Nenhum dado disponível
      </div>
    );
  }

  const maxSales = Math.max(...data.map(item => item.sales));

  return (
    <div className="h-64 space-y-2">
      {data.map((item) => (
        <div key={item.product} className="flex items-center space-x-3">
          <div className="w-32 text-sm text-gray-600 truncate">
            {item.product}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{item.sales} vendas</span>
              <span>R$ {item.revenue.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-brand-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(item.sales / maxSales) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSalesChart;