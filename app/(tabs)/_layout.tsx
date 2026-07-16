import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

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
          minHeight: Platform.OS === "ios" ? 85 : 65,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
        },
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
        name="kelas"
        options={{
          title: "Class",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="jadwal"
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
      <Tabs.Screen
        name="nilai"
        options={{
          title: "Grades",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "medal" : "medal-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pengaturan"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
