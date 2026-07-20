import { ApiResponse, ClassDetail, ClassItem } from "../types/api";
import api from "./api";

// Asumsi temanmu membuat 2 endpoint terpisah:
// 1. GET /classes/active  (Untuk kelas semester ini)
// 2. GET /classes/history (Untuk riwayat kelas)

export const fetchActiveClasses = async () => {
  try {
    const response = await api.get<ApiResponse<ClassItem[]>>("/classes/active");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal mengambil data kelas aktif",
    );
  }
};

export const fetchHistoryClasses = async () => {
  try {
    const response =
      await api.get<ApiResponse<ClassItem[]>>("/classes/history");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal mengambil data riwayat kelas",
    );
  }
};

export const fetchClassDetail = async (id: string) => {
  try {
    const response = await api.get<ApiResponse<ClassDetail>>(`/classes/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal mengambil data detail kelas",
    );
  }
};
