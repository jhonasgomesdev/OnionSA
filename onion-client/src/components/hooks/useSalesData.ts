import { useState, useEffect } from "react";
import { getSaleOrders, type SaleOrder } from "../../service/spreadsheetApi";

export interface ProductData {
  product: string;
  sales: number;
  revenue: number;
}

export interface RegionData {
  region: string;
  sales: number;
  revenue: number;
}

export const useSalesData = () => {
  const [orders, setOrders] = useState<SaleOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSalesData();
  }, []);

  const loadSalesData = async () => {
    if (orders.length === 0 && !loading) {
      setLoading(true);
      setError(null);
      
      try {
        const ordersData = await getSaleOrders();
        setOrders(ordersData);
      } catch (err: any) {
        console.error("❌ Erro ao carregar vendas:", err);
        setError(err.response?.data?.message || "Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Processar dados para os gráficos
  const getProductSalesData = (): ProductData[] => {
    const productSales = orders.reduce((acc, order) => {
      const product = order.productName;
      acc[product] = (acc[product] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(productSales).map(([product, count]) => ({
      product,
      sales: count,
      revenue: orders
        .filter(order => order.productName === product)
        .reduce((sum, order) => sum + order.price, 0)
    }));
  };

  const getRegionSalesData = (): RegionData[] => {
    const regionSales = orders.reduce((acc, order) => {
      const region = order.region;
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(regionSales).map(([region, count]) => ({
      region,
      sales: count,
      revenue: orders
        .filter(order => order.region === region)
        .reduce((sum, order) => sum + order.price, 0)
    }));
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);

  return {
    orders,
    loading,
    error,
    productData: getProductSalesData(),
    regionData: getRegionSalesData(),
    totalRevenue,
    refreshData: loadSalesData
  };
};