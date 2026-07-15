import * as SecureStore from "expo-secure-store";
import api from "./api";

// Bikin interface untuk struktur yang ditarik dari Laravel
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    nim: string;
    prodi: string;
  };
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>("login", {
      email,
      password,
    });
    const { token } = response.data;
    // simpan token
    if (token) {
      await SecureStore.setItemAsync("token", token);
    }
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Login gagal";
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  await SecureStore.deleteItemAsync("token");
};
