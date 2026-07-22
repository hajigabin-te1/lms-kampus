import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // Warna icon & teks saat tab sedang aktif (Biru primermu)
        tabBarActiveTintColor: "#3173C4",
        // Warna icon & teks saat tab tidak aktif
        tabBarInactiveTintColor: "#9ca3af",
        // Desain tab bar
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          borderTopColor: "#e5e7eb",
          minHeight: Platform.OS === "ios" ? 85 : 65,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          position: "absolute",
        },
        tabBarBackground: () => (
          <View
            // Kotak ini yang akan bertindak sebagai visual tab bar yang melengkung
            className="absolute top-0 bottom-0 left-0 right-0 bg-white"
            style={{
              borderTopLeftRadius: 25, // Kelengkungan kiri atas
              borderTopRightRadius: 25, // Kelengkungan kanan atas

              // Efek bayangan premium agar lekukannya terlihat melayang di atas konten halaman
              ...Platform.select({
                ios: {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: -4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 10,
                },
                android: {
                  elevation: 10,
                },
              }),
            }}
          />
        ),
        // Sembunyikan header bawaan Expo Router karena kita sudah bikin header sendiri di dashboard
        headerShown: false,
      }}
    >
      {/* Tab 1: Dashboard */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* Kamu bisa tambah tab lain di bawah sini nanti, contoh: */}
      <Tabs.Screen
        name="kalendar"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      {/* BAGIAN AWAL QR CODE */}
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan QR",
          headerShown: false, // Sembunyikan header atas agar kamera memenuhi layar penuh
          // tabBarIcon: ({ color }) => (
          //   <FontAwesome size={24} name="qrcode" color={color} />
          // ),
          tabBarLabel: () => null,
          // Mengganti tombol standar dengan komponen kustom kital sendiri
          tabBarButton: (props: any) => (
            <TouchableOpacity
              {...props}
              activeOpacity={0.8}
              // Menggunakan posisi absolut dan top negatif agar lingkaran meloncat naik ke atas bar tab
              className="absolute top-[-25px] left-1/2 -ml-[35px] w-[70px] h-[70px] rounded-full bg-blue-600 justify-center items-center z-50"
              style={{
                // Memberikan efek bayangan (shadow) tebal ala e-wallet agar terlihat melayang (depth effect)
                ...Platform.select({
                  ios: {
                    shadowColor: "#007AFF",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.4,
                    shadowRadius: 5,
                  },
                  android: {
                    elevation: 8,
                  },
                }),
              }}
            >
              {/* Box Putih Kecil di Dalam atau Langsung Ikon */}
              <View className="w-[58px] h-[58px] rounded-full bg-blue-500 justify-center items-center border-2 border-white">
                <FontAwesome name="qrcode" size={30} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      {/* BAGIAN AKHIR QR CODE */}
      <Tabs.Screen
        name="notifikasi"
        options={{
          title: "Notification",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused
                  ? "notifications-circle"
                  : "notifications-circle-outline"
              }
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
