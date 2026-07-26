import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const menuItems = [
  { id: "1", title: "Edit Profile", icon: "person-outline", route: "/edit-profile" },
  { id: "2", title: "Tentang Aplikasi", icon: "information-circle-outline", route: "/about" },
  { id: "3", title: "Saran & Masukan", icon: "chatbubbles-outline", route: "/feedback" },
  { id: "4", title: "FAQ", icon: "help-circle-outline", route: "/faq" },
];

export default function ProfileScreen() {
  const renderHeader = () => (
    <View className="px-4 py-6">
      <LinearGradient
        colors={["#4facfe", "#00f2fe"]}
        style={{
          borderRadius: 24,
          padding: 24,
          alignItems: "center",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="w-24 h-24 rounded-full border-4 border-white overflow-hidden mb-4 bg-gray-200 justify-center items-center">
          <Image
            source={{
              uri: "https://ui-avatars.com/api/?name=Budi+Santoso&background=ffffff&color=4facfe&size=150",
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text className="text-xl font-bold text-white mb-1">Budi Santoso</Text>
        <Text className="text-sm text-blue-50 mb-1 font-medium">NIM: 1234567890</Text>
        <Text className="text-sm text-blue-50 font-medium">Prodi: Teknik Informatika</Text>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <View className="flex-1 bg-gray-50">
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log("Navigating to", item.route);
              }}
              className="flex-row items-center px-6 py-4 bg-white mb-3 mx-4 rounded-2xl shadow-sm border border-gray-100"
              activeOpacity={0.7}
            >
              <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-4">
                <Ionicons name={item.icon as any} size={20} color="#0080FF" />
              </View>
              <Text className="flex-1 text-base font-semibold text-gray-800">
                {item.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
