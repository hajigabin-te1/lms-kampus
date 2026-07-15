import { LinearGradient } from "expo-linear-gradient"; // Tambahan: Import LinearGradient
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { login } from "../services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    // validasi kosongan
    if (!email && !password) {
      alert("Gagal login silahkan cek kembali password nya");
      return;
    }
    console.log("Login berhasil dengan:", email, password);

    setIsLoading(true);

    try {
      // Panggil API service untuk login
      const data = await login(email, password);

      await SecureStore.setItemAsync("userData", JSON.stringify(data.user));

      console.log("Berhasil login : ", data.user.name);

      router.replace("/(tabs)/dashboard" as any);
    } catch (error: any) {
      console.log("error gagal login : ", error.message);
      alert("error.message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      {/* Background Gradasi */}
      <LinearGradient
        colors={["#3173C4", "#C7F2DC"]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <View style={styles.formContainer}>
              {/* Card Putih untuk Form */}
              <View style={styles.card}>
                <View style={styles.headerContainer}>
                  {/* Pastikan path logo STIA Indonesia kamu sesuai */}
                  <Image
                    source={require("../assets/logo-polije.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <Text style={styles.title}>LMS Kampus</Text>
                  <Text style={styles.subtitle}>Masuk ke akun Anda</Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email / NIM</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Masukkan Email atau NIM"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Masukkan Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={() => console.log("Lupa Password")}
                >
                  <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? "Memproses..." : "Masuk"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20, // Sedikit dikurangi agar card lebih proporsional
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10, // Shadow untuk Android
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3173C4", // Disesuaikan dengan warna primer
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14, // Sedikit diperbesar agar area tap lebih nyaman
    fontSize: 15,
    color: "#1f2937",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#3173C4", // Disesuaikan dengan warna primer
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#3173C4", // Menggunakan warna dari request
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#3173C4",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
