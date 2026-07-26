// src/services/dashboardService.ts
import { ApiResponse, DashboardData } from "../types/api";
import api from "./api";

export const fetchDashboardData = async () => {
  try {
    // Memanggil endpoint backend Laravel, contoh: GET /api/dashboard
    const response = await api.get<ApiResponse<DashboardData>>("/dashboard");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal memuat data profil dashboard",
    );
  }
};
