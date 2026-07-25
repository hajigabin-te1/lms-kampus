import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useState } from "react";
import {
  Animated,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
// Impor global store Zustand
import { useNotificationStore } from "@/src/stores/notificationStore";
const getTypeConfig = (type: string) => {
  if (type === "finance")
    return {
      icon: "card-outline",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    };
  if (type === "academic")
    return { icon: "book-outline", color: "text-blue-500", bg: "bg-blue-50" };
  return {
    icon: "information-circle-outline",
    color: "text-gray-500",
    bg: "bg-gray-50",
  };
};

export default function NotificationScreen() {
  // Ambil state dan aksi fungsi dari Zustand
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    setNotifications,
  } = useNotificationStore();
  const [refreshing, setRefreshing] = useState(false);

  // Fungsi Pull to Refresh untuk memuat ulang atau mensimulasikan penarikan data baru dari API
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Menambah notifikasi tiruan baru saat ditarik ke bawah
      const newData = [
        {
          id: String(Date.now()),
          type: "academic",
          title: "Jadwal Kuliah Diperbarui",
          desc: "Ada perubahan ruangan untuk matakuliah Aljabar Linear.",
          time: "Baru saja",
          isRead: false,
        },
        ...notifications,
      ];
      setNotifications(newData);
      setRefreshing(false);
    }, 1500); // loading simulasi 1.5 detik
  }, [notifications]);

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8 py-20">
      <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-4">
        <Ionicons name="notifications-off-outline" size={44} color="#9CA3AF" />
      </View>
      <Text className="text-base font-bold text-gray-800 text-center">
        Notifikasi Kosong
      </Text>
      <Text className="text-xs text-gray-400 text-center mt-1 leading-relaxed">
        Tarik ke bawah layar untuk memeriksa data pengumuman terbaru.
      </Text>
    </View>
  );

  const renderRightActions = (id: string, progress: any, dragX: any) => {
    // Memperbaiki isian rentang interpolasi agar animasi membesar/mengecil berjalan normal
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0], // Skala penuh saat digeser melebihi batas -80px, mengecil saat ditiadakan
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
        <View className="flex-1 bg-gray-50 pt-4">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xl font-bold text-gray-800">Notifikasi</Text>
            {notifications.length > 0 && (
              <TouchableOpacity onPress={markAllAsRead}>
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
            ListEmptyComponent={renderEmptyState}
            // INTEGRASI FITUR PULL TO REFRESH
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#007AFF"]}
              />
            }
            renderItem={({ item }) => {
              const config = getTypeConfig(item.type);
              return (
                <Swipeable
                  renderRightActions={(progress, dragX) =>
                    renderRightActions(item.id, progress, dragX)
                  }
                  friction={1.5} // Membuat tarikan terasa membal/bounce secara natural
                >
                  <TouchableOpacity
                    onPress={() => markAsRead(item.id)}
                    activeOpacity={0.7}
                    className={`flex-row p-4 rounded-2xl mb-3 border border-gray-100 relative bg-white ${
                      !item.isRead
                        ? "border-l-4 border-l-blue-500 shadow-sm"
                        : "opacity-70"
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
                          className={`text-sm font-bold flex-1 pr-2 text-gray-800 ${!item.isRead ? "" : "font-semibold text-gray-500"}`}
                        >
                          {item.title}
                        </Text>
                        {!item.isRead && (
                          <View className="w-2 h-2 bg-red-500 rounded-full mt-1.5" />
                        )}
                      </View>
                      <Text
                        className="text-xs text-gray-500 mt-1 leading-relaxed"
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
