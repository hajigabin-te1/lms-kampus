import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Ambil token yang sebelumnya disimpan saat login
        const token = await SecureStore.getItemAsync("userToken");

        if (token) {
          // Token ada -> Arahkan ke halaman utama/dashboard
          // Menggunakan replace agar user tidak bisa 'back' ke halaman loading ini
          router.replace("/(tabs)/dashboard" as any);
        } else {
          // Token tidak ada -> Arahkan ke halaman login
          router.replace("/(auth)/login" as any);
        }
      } catch (error) {
        console.error("Gagal mengecek token:", error);
        // Kalau terjadi error baca memori, amannya lempar ke login
        router.replace("/(auth)/login" as any);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  // Selama proses pengecekan (biasanya sangat cepat), tampilkan loading spinner
  if (isChecking) {
    return (
      <View style={styles.container}>
        {/* Warna disesuaikan dengan warna tema aplikasimu */}
        <ActivityIndicator size="large" color="#3173C4" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
