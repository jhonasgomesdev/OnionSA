import { useState } from "react";
import { ChartBarIcon, MapIcon } from "@heroicons/react/24/outline";

// Hooks
import { useSalesData } from "../components/hooks/useSalesData";

// Components
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardCard from "../components/dashboard/DashboardCard";
import SalesListCard from "../components/dashboard/SalesListCard";
import SalesListModal from "../components/dashboard/SalesListModal";

// Charts
import ProductSalesChart from "../components/charts/ProductSalesChart";
import RegionSalesMap from "../components/charts/RegionSalesMap";

export default function Dashboard() {
  const [showSalesList, setShowSalesList] = useState(false);
  
  const { orders, loading, error, productData, regionData, totalRevenue } = useSalesData();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <DashboardHeader 
          loading={loading}
          ordersCount={orders.length}
          totalRevenue={totalRevenue}
        />

        {/* Grid de Cards com Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: Gráfico de Vendas por Produto */}
          <DashboardCard
            title="Vendas por Produto"
            description="Distribuição de vendas por categoria de produto"
            icon={ChartBarIcon}
            loading={loading}
          >
            <ProductSalesChart data={productData} />
          </DashboardCard>

          {/* Card 2: Gráfico de Vendas por Região */}
          <DashboardCard
            title="Vendas por Região"
            description="Mapa de vendas distribuídas por região"
            icon={MapIcon}
            loading={loading}
          >
            <RegionSalesMap data={regionData} />
          </DashboardCard>
        </div>

        {/* Card 3: Lista de Vendas */}
        <SalesListCard 
          loading={loading}
          onOpenModal={() => setShowSalesList(true)}
        />
      </div>

      {/* Modal da Lista de Vendas */}
      <SalesListModal
        isOpen={showSalesList}
        onClose={() => setShowSalesList(false)}
        orders={orders}
        error={error}
      />
    </div>
  );
}