import { LoginData } from "@/src/types/api";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
//import api from "./api";

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

// export const login = async (email: string, password: string) => {
//   try {
//     // const response = await api.post<LoginResponse>("login", {
//     //   email,
//     //   password,
//     // });
//     //const { token } = response.data;
//     // simpan token
//     // if (token) {
//     //   await SecureStore.setItemAsync("token", token);
//     // }
//     // return response.data;
//   } catch (error: any) {
//     const errorMessage = error.response?.data?.message || "Login gagal";
//     throw new Error(errorMessage);
//   }
// };

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginData> => {
  // 1. Simulasikan jeda waktu (loading) internet selama 1.5 detik
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 2. Simulasikan pengecekan dari database
  // Kita buat skenario: hanya bisa login pakai akun dummy ini
  if (email === "mhs@stia.ac.id" && password === "rahasia123") {
    // 3. Siapkan data dummy yang bentuknya persis dengan balikan Laravel nanti
    const dummyData: LoginData = {
      token: "1|dummy_token_sementara_buat_ngetes",
      user: {
        id: 101,
        name: "Haji gabin",
        email: "mhs@stia.ac.id",
        prodi: "Administrasi Publik",
        nim: "2088121",
      },
    };

    // 4. Simpan token ke memori HP persis seperti aslinya
    if (Platform.OS === "web") {
      try {
        localStorage.setItem("userToken", dummyData.token);
      } catch (e) {
        console.warn("localStorage is not available");
      }
    } else {
      await SecureStore.setItemAsync("userToken", dummyData.token);
    }

    return dummyData;
  } else {
    // 5. Simulasikan error kalau password salah (biar kamu bisa tes alert error-nya)
    throw new Error(
      "Email atau password salah! Coba mhs@stia.ac.id / rahasia123",
    );
  }
};

export const logout = async () => {
  await SecureStore.deleteItemAsync("token");
};
