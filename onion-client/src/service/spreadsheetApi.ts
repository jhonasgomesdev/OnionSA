import api from "./api"

export const downloadSpreadsheet = async () => {
  try {
        const response = await api.get(`/spreadsheet/download-model/`, {
        responseType: "blob",
        });

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const uploadSpreadsheet = async (formData: FormData) => {
  try {
        const response = await api.post(`/spreadsheet/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export interface SaleOrder {
  document: string;
  clientName: string;
  productName: string;
  price: number;
  deliveryDate: string;
  region: string;
}

export const getSaleOrders = async (): Promise<SaleOrder[]> => {
  try {
    const response = await api.get(`/spreadsheet/sale-list/`);
    return response.data;
  } 
  catch (error) {
    console.error("Erro ao buscar lista de vendas:", error);
    throw error;
  }
}
