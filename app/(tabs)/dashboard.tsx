import { Ionicons } from "@expo/vector-icons"; // Icon bawaan dari Expo
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserData {
  id: number;
  name: string;
  email: string;
  nim: string;
  prodi: string;
}

export default function DashboardScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ambil data user halaman saat ini
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const userDataString = await SecureStore.getItemAsync("userData");
        if (userDataString) {
          setUser(JSON.parse(userDataString));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchdata();
  }, []);

  // Fungsi untuk logout dan menghapus token
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken"); // Hapus token dari memori
      router.replace("/(auth)/login" as any); // Arahkan kembali ke halaman login
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  // tampilkan loading sebentar
  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator
          size={"large"}
          color={"#2083a8ff"}
        ></ActivityIndicator>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            {/* Tampilkan nama user secara dinamis, gunakan optional chaining (?) untuk mencegah error jika data kosong */}
            <Text style={styles.greeting}>
              Halo, {user?.name || "Mahasiswa"}! 👋
            </Text>
            <Text style={styles.subGreeting}>
              {user?.email || "Selamat datang di LMS Kampus"}
            </Text>
          </View>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={24} color="#3173C4" />
          </View>
        </View>

        {/* Ringkasan / Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={[styles.iconBox, { backgroundColor: "#C7F2DC" }]}>
              <Ionicons name="book" size={24} color="#3173C4" />
            </View>
            <Text style={styles.summaryNumber}>6</Text>
            <Text style={styles.summaryText}>Mata Kuliah</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.iconBox, { backgroundColor: "#ffe4e6" }]}>
              <Ionicons name="document-text" size={24} color="#e11d48" />
            </View>
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryText}>Tugas Aktif</Text>
          </View>
        </View>

        {/* Seksi Mata Kuliah Terkini (Dummy Data) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jadwal Hari Ini</Text>

          <TouchableOpacity style={styles.courseCard}>
            <View style={styles.courseIcon}>
              <Ionicons name="laptop-outline" size={24} color="#ffffff" />
            </View>
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>Pemrograman Mobile</Text>
              <Text style={styles.courseTime}>08:00 - 10:30 WITA</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.courseCard}>
            <View style={styles.courseIcon}>
              <Ionicons name="business-outline" size={24} color="#ffffff" />
            </View>
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>Administrasi Bisnis</Text>
              <Text style={styles.courseTime}>11:00 - 13:00 WITA</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Tombol Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Keluar Akun</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // Abu-abu sangat terang untuk background
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  subGreeting: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#C7F2DC", // Aksen hijau terang dari request-mu
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  summaryText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#3173C4", // Biru primer
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  courseTime: {
    fontSize: 13,
    color: "#6b7280",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fee2e2", // Merah sangat terang
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    color: "#ef4444", // Merah
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
