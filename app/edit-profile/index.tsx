import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const listMenu = [
  { id: 1, name: "Data Diri", path: "/edit-profile/bio" },
  { id: 2, name: "Data Akademik", path: "/edit-profile/academic" },
  { id: 3, name: "Data Umum", path: "/edit-profile/common" },
  { id: 4, name: "Alamat", path: "/edit-profile/adresses" },
  { id: 5, name: "Orang Tua / Wali", path: "/edit-profile/parents" },
  { id: 6, name: "Asal Sekolah", path: "/edit-profile/school" },
  { id: 7, name: "Ubah Password", path: "/edit-profile/change-password" },
];

export default function EditprofileScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-[#ECECF8]">
      {/* Konten Header */}
      <View className="flex-row items-center px-4 py-4 bg-white shadow-sm border-b border-gray-100">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          className="h-10 w-10 justify-center items-center rounded-full bg-gray-50 mr-3"
        >
          <Ionicons name="arrow-back" size={24} color={"#1f2937"} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">
          Kembali ke Profile
        </Text>
      </View>

      {/* Konten Isis */}
      <View className="flex-1 bg-gray-50">
        <FlatList
          data={listMenu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center px-6 py-4 bg-white mb-1 mx-2 rounded  shadow-sm border border-gray-100"
              onPress={() => {
                router.push(`${item.path}` as any);
              }}
              activeOpacity={0.7}
            >
              <Text className="flex-1 text-base font-semibold text-gray-800">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
