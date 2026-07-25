import React, { useState } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
// Impor Reanimated & Gesture Handler untuk fitur geser
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const initialNotifications = [
  {
    id: "1",
    type: "finance",
    title: "Pembayaran UKT Diterima",
    desc: "Registrasi keuangan Semester Genap sah.",
    time: "2 jam lalu",
    isRead: false,
  },
  {
    id: "2",
    type: "academic",
    title: "Nilai KHS Baru Dirilis",
    desc: "Dosen Pengampu telah menginput nilai matakuliah Basis Data.",
    time: "Kemarin",
    isRead: false,
  },
  {
    id: "3",
    type: "system",
    title: "Pemeliharaan Sistem Server",
    desc: "SIAKAD Mobile akan nonaktif pada hari Sabtu pukul 23.00 WIB.",
    time: "3 hari lalu",
    isRead: true,
  },
];

const getTypeConfig = (type: string) => {
  if (type === "finance")
    return {
      icon: "card-outline",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    };
  if (type === "academic")
    return {
      icon: "book-outline",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    };
  return {
    icon: "information-circle-outline",
    color: "text-gray-500",
    bg: "bg-gray-50 dark:bg-gray-800",
  };
};

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
    );
  };

  // Fungsi aksi hapus data
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  // ======================================================================
  // 3. TAMPILAN EMPTY STATE (DETAIL KOSONG)
  // ======================================================================
  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8 py-20">
      <View className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center mb-4">
        <Ionicons name="notifications-off-outline" size={44} color="#9CA3AF" />
      </View>
      <Text className="text-base font-bold text-gray-800 dark:text-white text-center">
        Notifikasi Kosong
      </Text>
      <Text className="text-xs text-gray-400 text-center mt-1 leading-relaxed">
        Kotak masuk Anda bersih! Semua pengumuman akademik terbaru akan muncul
        di halaman ini.
      </Text>
    </View>
  );

  // Komponen aksi tombol hapus saat digeser ke kiri
  const renderRightActions = (id: string, progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0], // Skala 1 saat terbuka, Skala 0 saat tertutup
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        onPress={() => deleteNotification(id)}
        className="bg-rose-500 w-20 mb-3 justify-center items-center rounded-2xl shadow-sm"
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1 bg-gray-50 dark:bg-gray-900 pt-4">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xl font-bold text-gray-800 dark:text-white">
              Notifikasi
            </Text>
            {notifications.length > 0 && (
              <TouchableOpacity
                onPress={() =>
                  setNotifications((prev) =>
                    prev.map((n) => ({ ...n, isRead: true })),
                  )
                }
              >
                <Text className="text-xs text-blue-600 font-semibold">
                  Tandai Semua Dibaca
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 80,
              flexGrow: 1,
            }}
            ListEmptyComponent={renderEmptyState} // Panggil empty state di sini
            renderItem={({ item }) => {
              const config = getTypeConfig(item.type);
              return (
                // 1. INTEGRASI FITUR SWIPE TO DELETE
                <Swipeable
                  renderRightActions={(progress, dragX) =>
                    renderRightActions(item.id, progress, dragX)
                  }
                  friction={2}
                >
                  <TouchableOpacity
                    onPress={() => markAsRead(item.id)}
                    activeOpacity={0.7}
                    className={`flex-row p-4 rounded-2xl mb-3 border border-gray-100 dark:border-gray-800 relative bg-white dark:bg-gray-800 ${
                      !item.isRead
                        ? "border-l-4 border-l-blue-500 shadow-sm"
                        : "opacity-75"
                    }`}
                  >
                    <View
                      className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${config.bg}`}
                    >
                      <Ionicons
                        name={config.icon as any}
                        size={22}
                        className={config.color}
                      />
                    </View>

                    <View className="flex-1 justify-center">
                      <View className="flex-row justify-between items-start">
                        <Text
                          className={`text-sm font-bold flex-1 pr-2 text-gray-800 dark:text-gray-100 ${!item.isRead ? "" : "font-semibold text-gray-500"}`}
                        >
                          {item.title}
                        </Text>
                        {!item.isRead && (
                          <View className="w-2 h-2 bg-red-500 rounded-full mt-1.5" />
                        )}
                      </View>
                      <Text
                        className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed"
                        numberOfLines={2}
                      >
                        {item.desc}
                      </Text>
                      <Text className="text-[10px] text-gray-400 mt-2 font-medium">
                        {item.time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Swipeable>
              );
            }}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
