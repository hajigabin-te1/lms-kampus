import { fetchClassDetail } from "@/src/services/classService";
import { ClassDetail } from "@/src/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ClassDetailScreen() {
  const router = useRouter();

  // 1. Tangkap ID dari URL menggunakan useLocalSearchParams
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [classDetail, setClassDetail] = useState<ClassDetail | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Simulasi fetch data detail berdasarkan ID
  useEffect(() => {
    const loadDetail = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setErrorMsg("");
        const response = await fetchClassDetail(String(id));
        if (response.status === "success" && response.data) {
          setClassDetail(response.data);
        }
      } catch (error: any) {
        console.log("Gagal muat dan ada :", error.message || "");
        setErrorMsg("error.message");
      } finally {
        setIsLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3173C4" />
      </SafeAreaView>
    );
  }

  // Tampilan jika data gagal dimuat atau tidak ditemukan
  if (!classDetail || errorMsg) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Ionicons name="warning-outline" size={48} color="#ef4444" />
        <Text style={{ marginTop: 12, color: "#ef4444", fontWeight: "bold" }}>
          Data tidak ditemukan
        </Text>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => router.back()}
        >
          <Text style={{ color: "#3173C4", fontWeight: "bold" }}>Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Kelas</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.detailCard}>
          {/* Menggunakan data dinamis dari classDetail */}
          <Text style={styles.title}>{classDetail.name}</Text>
          <Text style={styles.subtitle}>{classDetail.lecturer}</Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>SKS</Text>
            <Text style={styles.value}>{classDetail.sks} SKS</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Kelas</Text>
            <Text style={styles.value}>
              {classDetail.label} ({classDetail.type})
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ruangan</Text>
            {/* Fallback string jika backend mengembalikan null */}
            <Text style={styles.value}>
              {classDetail.room || "Belum ditentukan"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Jadwal</Text>
            <Text style={styles.value}>
              {classDetail.schedule || "Belum ditentukan"}
            </Text>
          </View>
        </View>

        {classDetail.description && (
          <View style={[styles.detailCard, { marginTop: 16 }]}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: 8,
              }}
            >
              Deskripsi
            </Text>
            <Text style={{ fontSize: 14, color: "#6b7280", lineHeight: 22 }}>
              {classDetail.description}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  centered: { justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1f2937" },
  content: { padding: 20 },
  infoText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
    textAlign: "center",
  },
  detailCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3173C4",
    marginBottom: 4,
  },
  subtitle: { fontSize: 15, color: "#6b7280", marginBottom: 16 },
  divider: { height: 1, backgroundColor: "#e5e7eb", marginBottom: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: { fontSize: 14, color: "#6b7280" },
  value: { fontSize: 14, fontWeight: "600", color: "#1f2937" },
});
