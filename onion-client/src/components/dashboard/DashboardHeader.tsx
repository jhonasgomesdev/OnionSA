interface DashboardHeaderProps {
  loading: boolean;
  ordersCount: number;
  totalRevenue: number;
}

export default function DashboardHeader({ loading, ordersCount, totalRevenue }: DashboardHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Vendas</h1>
      <p className="text-gray-600">
        {loading ? "Carregando dados..." : `Total: ${ordersCount} vendas - R$ ${totalRevenue.toFixed(2)}`}
      </p>
    </div>
  );
}