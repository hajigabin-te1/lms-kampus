import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
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

  // Modals state
  const [menuVisible, setMenuVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dummy Data for requested fields
  const pembimbingAkademik = "Dr. Budi Santoso, S.Kom., M.Kom.";
  const statusMahasiswa = "Aktif";
  const isOBE = true; // Flag for OBE curriculum

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

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      router.replace("/(auth)/login" as any);
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#ECECF8]">
        <ActivityIndicator size="large" color="#2083a8" />
      </View>
    );
  }

  // Set colors based on theme for gradient and text
  const bgColors = isDarkMode
    ? (["#1e1e2d", "#151521"] as const)
    : (["#ECECF8", "#4caff0"] as const);

  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const subTextColor = isDarkMode ? "text-gray-300" : "text-gray-600";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-white";

  return (
    <SafeAreaView
      className="flex-1"
      style={{ flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <LinearGradient
        colors={bgColors}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerClassName="p-5 pb-10"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header: Hamburger on Left, Theme & Profile on Right */}
          <View className="flex-row justify-between items-center mt-2 mb-6">
            <TouchableOpacity
              onPress={() => setSidebarVisible(true)}
              className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-white/50"}`}
            >
              <Ionicons
                name="menu"
                size={28}
                color={isDarkMode ? "#fff" : "#1f2937"}
              />
            </TouchableOpacity>

            <View className="flex-row items-center space-x-3">
              <TouchableOpacity
                onPress={toggleTheme}
                className={`p-2 rounded-full mr-2 ${isDarkMode ? "bg-gray-700" : "bg-white/50"}`}
              >
                <Ionicons
                  name={isDarkMode ? "moon" : "sunny"}
                  size={24}
                  color={isDarkMode ? "#fbbf24" : "#f59e0b"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setMenuVisible(true)}
                className="w-12 h-12 rounded-full bg-white justify-center items-center border-2 border-[#C7F2DC]"
              >
                <Ionicons name="person" size={24} color="#3173C4" />
              </TouchableOpacity>
            </View>
          </View>

          {/* User Identity Section */}
          <View className="mb-6">
            <Text className={`text-2xl font-bold ${textColor}`}>
              Halo, {user?.name || "Mahasiswa"}! 👋
            </Text>
            <Text className={`text-sm mt-1 font-medium ${subTextColor}`}>
              {user?.prodi || "Program Studi Tidak Tersedia"}
            </Text>
          </View>

          {/* Statistics Card (Glassmorphism / Modern Semi-Transparent) */}
          <LinearGradient
            colors={["rgba(200,200,200,0.2)", "rgba(225,225,225,0.5)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 24,
              padding: 20,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            {/* Top right Dropdown (Semester) */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-sm font-semibold tracking-wider">
                Semester Aktif
              </Text>
              <TouchableOpacity className="flex-row items-center bg-white/20 px-3 py-1.5 rounded-full">
                <Text className="text-white text-xs font-bold mr-1">
                  2025/2026 Genap
                </Text>
                <Ionicons name="chevron-down" size={14} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Centered: IPS & IPK */}
            <View className="flex-row justify-center items-center mb-6">
              <View className="items-center px-4">
                <Text className="text-white/80 text-xs font-medium mb-1">
                  IPK
                </Text>
                <Text className="text-white text-4xl font-extrabold">3.85</Text>
              </View>

              <View className="w-[1px] h-12 bg-white/30 mx-4" />

              <View className="items-center px-4">
                <Text className="text-white/80 text-xs font-medium mb-1">
                  IPS
                </Text>
                <Text className="text-white text-4xl font-extrabold">3.90</Text>
              </View>
            </View>

            {/* Bottom: OBE Curriculum Indicator */}
            {isOBE && (
              <View className="flex-row justify-between items-center bg-white/10 p-3 rounded-2xl border border-white/10">
                <View className="flex-row items-center">
                  <Ionicons name="ribbon" size={20} color="#fbbf24" />
                  <Text className="text-white text-sm ml-2 font-medium">
                    Kurikulum OBE
                  </Text>
                </View>
                <TouchableOpacity className="bg-white/20 px-4 py-1.5 rounded-full">
                  <Text className="text-white text-xs font-bold">
                    Lihat OBE
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>

          {/* Row of Two Cards: Total Kelas & Tugas Pending */}
          <View className="flex-row justify-between mb-8 space-x-4">
            <View
              className={`flex-1 ${cardBg} p-4 rounded-2xl shadow-sm items-center mr-2`}
            >
              <View className="w-12 h-12 rounded-full bg-[#C7F2DC] justify-center items-center mb-3">
                <Ionicons name="book" size={24} color="#047857" />
              </View>
              <Text className={`text-2xl font-bold ${textColor}`}>6</Text>
              <Text className={`text-xs mt-1 text-center ${subTextColor}`}>
                Total Kelas Perkuliahan
              </Text>
            </View>

            <View
              className={`flex-1 ${cardBg} p-4 rounded-2xl shadow-sm items-center ml-2`}
            >
              <View className="w-12 h-12 rounded-full bg-[#ffe4e6] justify-center items-center mb-3">
                <Ionicons name="document-text" size={24} color="#e11d48" />
              </View>
              <Text className={`text-2xl font-bold ${textColor}`}>2</Text>
              <Text className={`text-xs mt-1 text-center ${subTextColor}`}>
                Tugas Pending
              </Text>
            </View>
          </View>

          {/* Agenda Hari Ini Section */}
          <View className="mb-8">
            <View className="flex-row justify-between items-end mb-4">
              <Text className={`text-xl font-bold ${textColor}`}>
                Agenda Hari Ini
              </Text>
              <Text className={`text-sm font-medium ${subTextColor}`}>
                Senin, 20 Juli 2026
              </Text>
            </View>

            <TouchableOpacity
              className={`${cardBg} p-4 rounded-2xl mb-3 flex-row items-center shadow-sm`}
            >
              <View className="w-12 h-12 rounded-2xl bg-[#3173C4] justify-center items-center mr-4">
                <Ionicons name="laptop-outline" size={24} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className={`text-base font-semibold ${textColor} mb-1`}>
                  Sistem Informasi Manajemen
                </Text>
                <Text className={`text-xs ${subTextColor}`}>
                  09:00 - 10:50 WITA
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              className={`${cardBg} p-4 rounded-2xl mb-3 flex-row items-center shadow-sm`}
            >
              <View className="w-12 h-12 rounded-2xl bg-[#f59e0b] justify-center items-center mr-4">
                <Ionicons name="star-outline" size={24} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className={`text-base font-semibold ${textColor} mb-1`}>
                  Kewarganegaraan
                </Text>
                <Text className={`text-xs ${subTextColor}`}>
                  11:00 - 12:50 WITA
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Assessment Transparancy (Existing Section preserved) */}
          <View className="mb-6">
            <Text className={`text-xl font-bold ${textColor} mb-4`}>
              Assessment Transparancy
            </Text>

            <View className={`${cardBg} rounded-2xl overflow-hidden shadow-sm`}>
              {/* Item 1 */}
              <View className="flex-row items-center p-4">
                <View className="w-12 h-12 rounded-2xl bg-[#fee2e2] justify-center items-center mr-4">
                  <Ionicons name="alert-circle" size={24} color="#ef4444" />
                </View>
                <View className="flex-1">
                  <Text className={`text-sm font-semibold ${textColor} mb-1`}>
                    Jumlah tugas belum terkumpul
                  </Text>
                  <Text className={`text-xs ${subTextColor}`}>
                    Cek deadline tugas yang tersedia
                  </Text>
                </View>
              </View>

              <View
                className={`h-[1px] ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} ml-4`}
              />

              {/* Item 2 */}
              <View className="flex-row items-center p-4">
                <View className="w-12 h-12 rounded-2xl bg-[#fef3c7] justify-center items-center mr-4">
                  <Ionicons name="trending-up" size={24} color="#d97706" />
                </View>
                <View className="flex-1">
                  <Text className={`text-sm font-semibold ${textColor} mb-1`}>
                    3 CPL perlu ditingkatkan
                  </Text>
                  <Text className={`text-xs ${subTextColor}`}>
                    Tingkatkan proyekmu untuk hasil yang lebih baik
                  </Text>
                </View>
              </View>

              <View
                className={`h-[1px] ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} ml-4`}
              />

              {/* Item 3 */}
              <View className="flex-row items-center p-4">
                <View className="w-12 h-12 rounded-2xl bg-[#e0e7ff] justify-center items-center mr-4">
                  <Ionicons name="trending-down" size={24} color="#4338ca" />
                </View>
                <View className="flex-1">
                  <Text className={`text-sm font-semibold ${textColor} mb-1`}>
                    IPK Menurun
                  </Text>
                  <Text className={`text-xs ${subTextColor}`}>
                    Indeks Prestasi menurun dari semester sebelumnya
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Modal Sidebar (Custom Sliding Menu) */}
        <Modal
          visible={sidebarVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSidebarVisible(false)}
        >
          <View className="flex-1 flex-row">
            {/* Sidebar Content */}
            <View
              className={`w-3/4 h-full ${isDarkMode ? "bg-gray-900" : "bg-white"} p-6 shadow-2xl`}
            >
              <View className="flex-row justify-between items-center mb-8 mt-10">
                <Text className={`text-2xl font-bold ${textColor}`}>
                  Menu Utama
                </Text>
                <TouchableOpacity
                  onPress={() => setSidebarVisible(false)}
                  className="p-2"
                >
                  <Ionicons
                    name="close"
                    size={28}
                    color={isDarkMode ? "#fff" : "#1f2937"}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="flex-row items-center mb-6 py-2">
                <Ionicons
                  name="home-outline"
                  size={24}
                  color={isDarkMode ? "#d1d5db" : "#4b5563"}
                />
                <Text className={`text-lg ml-4 font-medium ${textColor}`}>
                  Beranda
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center mb-6 py-2">
                <Ionicons
                  name="book-outline"
                  size={24}
                  color={isDarkMode ? "#d1d5db" : "#4b5563"}
                />
                <Text className={`text-lg ml-4 font-medium ${textColor}`}>
                  Jadwal & Kelas
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center mb-6 py-2">
                <Ionicons
                  name="stats-chart-outline"
                  size={24}
                  color={isDarkMode ? "#d1d5db" : "#4b5563"}
                />
                <Text className={`text-lg ml-4 font-medium ${textColor}`}>
                  Transkrip Nilai
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center mb-6 py-2">
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color={isDarkMode ? "#d1d5db" : "#4b5563"}
                />
                <Text className={`text-lg ml-4 font-medium ${textColor}`}>
                  Pengaturan
                </Text>
              </TouchableOpacity>
            </View>

            {/* Overlay Area to close sidebar */}
            <TouchableOpacity
              className="flex-1 bg-black/30"
              activeOpacity={1}
              onPress={() => setSidebarVisible(false)}
            />
          </View>
        </Modal>

        {/* Modal Dropdown Profil */}
        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-black/10 items-end pt-[80px] pr-5"
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          >
            <View
              className={`w-72 rounded-3xl p-5 shadow-2xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              {/* Profil Header Dropdown */}
              <View className="items-center mb-4 border-b border-gray-100 pb-4">
                <View className="w-16 h-16 rounded-full bg-gray-100 justify-center items-center mb-2">
                  <Ionicons name="person" size={32} color="#3173C4" />
                </View>
                <Text className={`text-lg font-bold ${textColor}`}>
                  {user?.name || "Mahasiswa"}
                </Text>
                <Text className={`text-xs ${subTextColor}`}>{user?.email}</Text>
              </View>

              <View className="flex-row items-center mb-4">
                <View className="w-8 justify-center items-center mr-3">
                  <Ionicons name="card-outline" size={22} color="#6b7280" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 font-medium">NIM</Text>
                  <Text className={`text-sm font-semibold mt-0.5 ${textColor}`}>
                    {user?.nim || "-"}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mb-4">
                <View className="w-8 justify-center items-center mr-3">
                  <Ionicons name="school-outline" size={22} color="#6b7280" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 font-medium">
                    Program Studi
                  </Text>
                  <Text className={`text-sm font-semibold mt-0.5 ${textColor}`}>
                    {user?.prodi || "-"}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mb-4">
                <View className="w-8 justify-center items-center mr-3">
                  <Ionicons name="people-outline" size={22} color="#6b7280" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 font-medium">
                    Pembimbing Akademik
                  </Text>
                  <Text className={`text-sm font-semibold mt-0.5 ${textColor}`}>
                    {pembimbingAkademik}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mb-4">
                <View className="w-8 justify-center items-center mr-3">
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={22}
                    color="#6b7280"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 font-medium">
                    Status
                  </Text>
                  <View className="bg-emerald-100 self-start px-2 py-0.5 rounded-full mt-1">
                    <Text className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                      {statusMahasiswa}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                className={`h-[1px] ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} my-2`}
              />

              <TouchableOpacity
                className="flex-row items-center py-2 mt-2"
                onPress={handleLogout}
              >
                <View className="w-8 justify-center items-center mr-3">
                  <Ionicons name="log-out-outline" size={22} color="#ef4444" />
                </View>
                <Text className="text-red-500 font-bold text-sm">
                  Keluar Akun
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}
