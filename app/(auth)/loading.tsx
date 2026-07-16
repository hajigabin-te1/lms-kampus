import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    // Menahan halaman loading selama 4 detik (di antara rentang 3-5 detik)
    const timer = setTimeout(() => {
      // Pindah ke halaman dashboard dan hapus riwayat navigasi login
      router.replace("/(tabs)/dashboard");
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#3173C4", "#C7F2DC"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 2 }}
    >
      <StatusBar style="light" />

      <View style={styles.content}>
        {/* Logo Kampus */}
        <Image
          source={require("../../assets/images/logo-STIA.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>LMS Kampus</Text>
        <Text style={styles.subtitle}>
          Menyiapkan ruang kelas digital Anda...
        </Text>

        {/* Animasi Loading Spinner */}
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.spinner}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 40,
  },
  spinner: {
    transform: [{ scale: 1.2 }], // Membuat spinner sedikit lebih besar dan responsif
  },
});
