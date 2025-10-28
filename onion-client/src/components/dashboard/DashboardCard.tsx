interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
  loading?: boolean;
}

export default function DashboardCard({ 
  title, 
  description, 
  icon: Icon, 
  children,
  loading = false 
}: DashboardCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-200 hover:shadow-lg transition-all duration-200 w-full group">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-brand-50 rounded-lg group-hover:bg-brand-100 transition-colors">
          <Icon className="h-6 w-6 text-brand-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      
      {/* Área do gráfico */}
      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            <span className="ml-2 text-brand-600">Carregando...</span>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}