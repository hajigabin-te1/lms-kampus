import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://api.lms-kampus.com/api"; // Sesuaikan URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 1. REQUEST INTERCEPTOR: Menyelipkan token sebelum request dikirim (Tembus Middleware)
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 2. RESPONSE INTERCEPTOR: Menangkap respon dari Laravel
api.interceptors.response.use(
  (response) => {
    // Kalau sukses tembus middleware, langsung kembalikan datanya
    return response;
  },
  async (error) => {
    // Kalau gagal, cek apakah error-nya dari middleware auth (401)
    if (error.response && error.response.status === 401) {
      console.log("Token ditolak atau expired oleh middleware Laravel!");

      // Hapus data token dan user dari memori HP
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userData");

      // Catatan: Untuk mengarahkan kembali ke login, biasanya di-handle di level UI / Komponen
      // dengan menangkap error ini, karena kita tidak bisa pakai useRouter() di luar komponen React.
    }

    return Promise.reject(error);
  },
);

export default api;
