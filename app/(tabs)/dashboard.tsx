import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Modal,
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

interface menuType {
  id: number;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}

export default function DashboardScreen() {
  const tabBarTinggi = useBottomTabBarHeight();
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dummy_semester = [
    "2025/2026 Genap",
    "2025/2026 Ganjil",
    "2024/2025 Genap",
    "2024/2025 Ganjil",
    "2023/2024 Genap",
    "2023/2024 Ganjil",
  ];
  const menus: menuType[] = [
    { id: 1, title: "Dashboard", icon: "home-outline" },
    { id: 2, title: "Kelas Saya", icon: "book-outline" },
    { id: 3, title: "KRS & KHS", icon: "receipt-outline" },
    { id: 4, title: "Jadwal & Presensi", icon: "today-outline" },
    { id: 5, title: "Ujian CBT", icon: "desktop-outline" },
  ];
  const [activeSemester, setActiveSemester] = useState(dummy_semester[0]);
  const [semesterModalVisible, setSemesterModalVisible] = useState(false);

  // Modals state
  const [menuVisible, setMenuVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Animation refs
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSidebar = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSidebarVisible(false);
    });
  };

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
          contentContainerStyle={{ paddingBottom: tabBarTinggi + 20 }} //wajib di tambahkan pada setiap halaman
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header: Hamburger on Left, Theme & Profile on Right */}
          <View className="flex-row justify-between items-center mt-2 mb-6">
            <TouchableOpacity
              onPress={openSidebar}
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
            colors={
              isDarkMode
                ? ["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]
                : ["rgba(255,255,255,0.7)", "rgba(255,255,255,0.4)"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 24,
              padding: 20,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: isDarkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.5)",
            }}
          >
            {/* Top right Dropdown (Semester) */}
            <View className="flex-row justify-between items-center mb-6">
              <Text
                className={`${isDarkMode ? "text-white/80" : "text-gray-600"} text-sm font-semibold tracking-wider`}
              >
                Semester Aktif
              </Text>
              <TouchableOpacity
                className={`flex-row items-center px-3 py-1.5 rounded-full ${isDarkMode ? "bg-white/20" : "bg-white/50"}`}
                onPress={() => setSemesterModalVisible(true)}
              >
                <Text
                  className={`${isDarkMode ? "text-white" : "text-gray-800"} text-xs font-bold mr-1`}
                >
                  {activeSemester}
                </Text>

                <Ionicons
                  name="chevron-down"
                  size={14}
                  color={isDarkMode ? "#fff" : "#1f2937"}
                />
              </TouchableOpacity>
            </View>

            {/* Centered: IPS & IPK */}
            <View className="flex-row justify-center items-center mb-6">
              <View className="items-center px-4">
                <Text
                  className={`${isDarkMode ? "text-white/80" : "text-gray-600"} text-xs font-medium mb-1`}
                >
                  IPK
                </Text>
                <Text
                  className={`${isDarkMode ? "text-white" : "text-gray-800"} text-4xl font-extrabold`}
                >
                  3.85
                </Text>
              </View>

              <View
                className={`w-[1px] h-12 mx-4 ${isDarkMode ? "bg-white/30" : "bg-gray-300"}`}
              />

              <View className="items-center px-4">
                <Text
                  className={`${isDarkMode ? "text-white/80" : "text-gray-600"} text-xs font-medium mb-1`}
                >
                  IPS
                </Text>
                <Text
                  className={`${isDarkMode ? "text-white" : "text-gray-800"} text-4xl font-extrabold`}
                >
                  3.90
                </Text>
              </View>
            </View>

            {/* Bottom: OBE Curriculum Indicator */}
            {/* {isOBE && (
              <View
                className={`flex-row justify-between items-center p-3 rounded-2xl border ${isDarkMode ? "bg-white/10 border-white/10" : "bg-white/40 border-white/40"}`}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="ribbon"
                    size={20}
                    color={isDarkMode ? "#fbbf24" : "#f59e0b"}
                  />
                  <Text
                    className={`${isDarkMode ? "text-white" : "text-gray-800"} text-sm ml-2 font-medium`}
                  >
                    Kurikulum OBE
                  </Text>
                </View>
                <TouchableOpacity
                  className={`px-4 py-1.5 rounded-full ${isDarkMode ? "bg-white/20" : "bg-white/60"}`}
                >
                  <Text
                    className={`${isDarkMode ? "text-white" : "text-gray-800"} text-xs font-bold`}
                  >
                    Lihat OBE
                  </Text>
                </TouchableOpacity>
              </View>
            )} */}
            {isOBE ? (
              <View
                className={`flex-row justify-between items-center p-3 rounded-2xl border ${isDarkMode ? "bg-white/10 border-white/10" : "bg-white/40 border-white/40"}`}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="ribbon"
                    size={20}
                    color={isDarkMode ? "#fbbf24" : "#f59e0b"}
                  />
                  <Text
                    className={`${isDarkMode ? "text-white" : "text-gray-800"} text-sm ml-2 font-medium`}
                  >
                    Kurikulum OBE
                  </Text>
                </View>
                <TouchableOpacity
                  className={`px-4 py-1.5 rounded-full ${isDarkMode ? "bg-white/20" : "bg-white/60"}`}
                >
                  <Text
                    className={`${isDarkMode ? "text-white" : "text-gray-800"} text-xs font-bold`}
                  >
                    Lihat OBE
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Tampilan jika Non OBE (isOBE = false)
              <View
                className={`flex-row justify-between items-center p-3 rounded-2xl border ${isDarkMode ? "bg-gray-800/40 border-gray-700/50" : "bg-gray-200/50 border-gray-300/50"}`}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color={isDarkMode ? "#9ca3af" : "#6b7280"}
                  />
                  <Text
                    className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-sm ml-2 font-medium`}
                  >
                    Non OBE
                  </Text>
                </View>
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

          {/* Assessment Transparancy */}
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

        {/* ==================== CUSTOM SIDEBAR WITH BLUR ==================== */}
        {sidebarVisible && (
          <>
            {/* Overlay Area Blur & Dimming */}
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                opacity: fadeAnim,
                zIndex: 40,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={closeSidebar}
                style={{ flex: 1 }}
              >
                <BlurView intensity={70} tint="dark" style={{ flex: 1 }} />
              </TouchableOpacity>
            </Animated.View>

            {/* Sidebar Slide Content */}
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "75%",
                zIndex: 50,
                transform: [{ translateX: slideAnim }],
              }}
              className={`${isDarkMode ? "bg-gray-900" : "bg-white"} p-6 shadow-2xl`}
            >
              <View className="flex-row justify-between items-center mb-8 mt-10">
                <Text className={`text-2xl font-bold ${textColor}`}>
                  Menu Utama
                </Text>
                <TouchableOpacity onPress={closeSidebar} className="p-2">
                  <Ionicons
                    name="close"
                    size={28}
                    color={isDarkMode ? "#fff" : "#1f2937"}
                  />
                </TouchableOpacity>
              </View>
              {/* ISI SIDEBAR MENU */}
              {menus.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    className="flex-row items-center mb-6 py-2"
                  >
                    <Ionicons
                      name={item.icon}
                      size={24}
                      color={isDarkMode ? "#d1d5db" : "#4b5563"}
                    />
                    <Text className="ml-4 text-base font-medium text-gray-500 dark:text-gray-300">
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Animated.View>
          </>
        )}
        {/* ================================================================== */}

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
        {/* Modal Dropdown Pilihan Semester */}
        <Modal
          visible={semesterModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSemesterModalVisible(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-black/30 justify-center items-center px-5"
            activeOpacity={1}
            onPress={() => setSemesterModalVisible(false)}
          >
            <View
              className={`w-full max-w-xs rounded-3xl p-5 shadow-2xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <View className="flex-row justify-between items-center mb-4 pb-3 border-b border-gray-100">
                <Text className={`text-lg font-bold ${textColor}`}>
                  Pilih Semester
                </Text>
                <TouchableOpacity
                  onPress={() => setSemesterModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              {dummy_semester.map((semester, index) => {
                const isSelected = activeSemester === semester;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setActiveSemester(semester);
                      setSemesterModalVisible(false);
                      // TODO: Nantinya di sini bisa ditambah fungsi untuk fetch ulang API
                      // berdasarkan semester yang dipilih, misal: fetchDashboardData(semester)
                    }}
                    className={`py-3 px-4 rounded-2xl mb-2 flex-row justify-between items-center ${
                      isSelected
                        ? isDarkMode
                          ? "bg-[#3173C4]/20"
                          : "bg-[#e0e7ff]"
                        : ""
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${isSelected ? "text-[#3173C4]" : textColor}`}
                    >
                      {semester}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="#3173C4"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}
