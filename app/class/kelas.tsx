import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- DUMMY DATA ---
// Nanti data ini bisa diganti dengan hasil hit API dari Laravel
const ACTIVE_CLASSES = [
  {
    id: 1,
    name: "Psikologi Sosial",
    lecturer: "Abd. Halim, S.Kom, M.Kom",
    label: "B",
    type: "Reguler",
    sks: 3,
    hari: "Senin",
    jam: "11.00 - 12.50",
  },
  {
    id: 2,
    name: "Filsafat Logika",
    lecturer: "Nida Urahmah, M.Pd",
    label: "B",
    type: "Reguler",
    sks: 3,
    hari: "Senin",
    jam: "09.00 - 10.50",
  },
  {
    id: 3,
    name: "Kewarganegaraan",
    lecturer: "Siti Paulina, M.Pd",
    label: "B",
    type: "Reguler",
    sks: 2,
    hari: "Selasa",
    jam: "11.00 - 12.50",
  },
  {
    id: 4,
    name: "Sistem Informasi Manajemen",
    lecturer: "Ni Made Musiyani Anjasmari, M.AP",
    label: "B",
    type: "Reguler",
    sks: 3,
    hari: "Selasa",
    jam: "09.00 - 10.50",
  },
  {
    id: 5,
    name: "Kebijakan Publik",
    lecturer: "Barkatullah, S.Sos, MA",
    label: "B",
    type: "Reguler",
    sks: 3,
    hari: "Rabu",
    jam: "09.00 - 10.50",
  },
  {
    id: 6,
    name: "Statistik Administrasi Publik",
    lecturer: "Nor Ainah, M.M",
    label: "B",
    type: "Reguler",
    sks: 3,
    hari: "Rabu",
    jam: "11.00 - 12.50",
  },
  {
    id: 7,
    name: "Manajemen Publik",
    lecturer: "Norhidayah, S.Sos, MA",
    label: "B",
    type: "Reguler",
    sks: 3,
    hari: "Kamis",
    jam: "09.00 - 10.50",
  },
];

const HISTORY_CLASSES = [
  {
    id: 101,
    name: "Algoritma Pemrograman",
    lecturer: "Budi Santoso, M.Kom",
    label: "A",
    type: "Reguler",
    sks: 3,
    hari: "Senin",
    jam: "11.00 - 12.50",
  },
  {
    id: 102,
    name: "Pengantar TI",
    lecturer: "Dr. Hendra",
    label: "A",
    type: "Reguler",
    sks: 2,
    hari: "Senin",
    jam: "09.00 - 10.50",
  },
];

export default function KelasScreen() {
  // State untuk mengontrol tab yang aktif: 'semester_ini' atau 'riwayat'
  const [activeTab, setActiveTab] = useState("semester_ini");
  const router = useRouter();
  // Komponen Card untuk daftar kelas agar bisa dipakai berulang
  const ClassCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push(`/class/${item.id}` as any)}
      style={styles.classCard}
    >
      <View style={styles.classCardHeader}>
        <Text style={styles.className}>{item.name}</Text>
        <View style={styles.classLabelBox}>
          <Text style={styles.classLabelText}>Kelas {item.label}</Text>
        </View>
      </View>

      <View style={styles.classDetailRow}>
        <Ionicons name="person-outline" size={16} color="#6b7280" />
        <Text style={styles.classLecturer}>{item.lecturer}</Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Text style={{ fontSize: 11, fontWeight: "bold" }}>{item.hari}, </Text>
        <Text style={{ fontSize: 11, fontWeight: "bold" }}>{item.jam}</Text>
      </View>

      <View style={styles.classFooter}>
        <View
          style={[
            styles.badge,
            item.type === "Reguler" ? styles.badgeBlue : styles.badgeGreen,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              item.type === "Reguler"
                ? styles.badgeTextBlue
                : styles.badgeTextGreen,
            ]}
          >
            {item.type}
          </Text>
        </View>
        <Text style={styles.classSks}>{item.sks} SKS</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* HEADER TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "semester_ini" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("semester_ini")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "semester_ini" && styles.tabTextActive,
            ]}
          >
            Semester Ini
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "riwayat" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("riwayat")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "riwayat" && styles.tabTextActive,
            ]}
          >
            Riwayat Kelas
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* KONTEN: SEMESTER INI */}
        {activeTab === "semester_ini" && (
          <View>
            {/* Section 1: Summary Cards */}
            <View style={styles.summaryContainer}>
              <View
                style={[styles.summaryCard, { borderLeftColor: "#3173C4" }]}
              >
                <Text style={styles.summaryTitle}>Ketercapaian OBE</Text>
                <View style={styles.summaryValueRow}>
                  <Text style={styles.summaryNumber}>100</Text>
                  <Text className="font-semibold color-gray-500"> % </Text>
                </View>
              </View>
              <View
                style={[styles.summaryCard, { borderLeftColor: "#10b981" }]}
              >
                <Text style={styles.summaryTitle}>Total SKS</Text>
                <View style={styles.summaryValueRow}>
                  <Text style={styles.summaryNumber}>21</Text>
                  <Text style={styles.summaryUnit}> SKS</Text>
                </View>
              </View>
            </View>

            {/* Section 2: Daftar Kelas */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Kelas Perkuliahan</Text>
              <Text style={styles.sectionSubtitle}>
                {ACTIVE_CLASSES.length} Kelas Aktif
              </Text>
            </View>

            {ACTIVE_CLASSES.map((item) => (
              <ClassCard key={item.id} item={item} />
            ))}
          </View>
        )}

        {/* KONTEN: RIWAYAT KELAS */}
        {activeTab === "riwayat" && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Riwayat Perkuliahan</Text>
            </View>

            {HISTORY_CLASSES.map((item) => (
              <ClassCard key={item.id} item={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // Background abu-abu terang
  },
  // --- TABS STYLING ---
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabButtonActive: {
    borderBottomColor: "#3173C4",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6b7280",
  },
  tabTextActive: {
    color: "#3173C4",
  },

  // --- CONTENT STYLING ---
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // --- SECTION 1: SUMMARY CARDS ---
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  summaryValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
  },
  summaryUnit: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },

  // --- SECTION HEADER ---
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#3173C4",
    fontWeight: "600",
  },

  // --- SECTION 2: CLASS CARDS ---
  classCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  classCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  className: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginRight: 10,
  },
  classLabelBox: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  classLabelText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
  },
  classDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  classLecturer: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 6,
  },
  classFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeBlue: {
    backgroundColor: "#e0e7ff",
  },
  badgeTextBlue: {
    color: "#4338ca",
    fontSize: 12,
    fontWeight: "600",
  },
  badgeGreen: {
    backgroundColor: "#C7F2DC",
  },
  badgeTextGreen: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "600",
  },
  classSks: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
