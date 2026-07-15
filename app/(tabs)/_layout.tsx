import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

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
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        // Sembunyikan header bawaan Expo Router karena kita sudah bikin header sendiri di dashboard
        headerShown: false,
      }}
    >
      {/* Tab 1: Dashboard */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Beranda",
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
      {/* 
      <Tabs.Screen
        name="courses"
        options={{
          title: "Kelas",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "book" : "book-outline"} size={22} color={color} />
          ),
        }}
      /> 
      */}
    </Tabs>
  );
}
