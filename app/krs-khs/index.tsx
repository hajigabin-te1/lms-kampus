import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KRSScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-[#ECECF8]">
      {/* Header dengan tombol back */}
      <View className="flex-row items-center px-4 py-4 bg-white shadow-sm border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 justify-center items-center rounded-full bg-gray-50 mr-3"
        >
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">KRS & KHS</Text>
      </View>

      {/* Konten Halaman */}
      <View className="flex-1 p-5 items-center justify-center">
        <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
          <Ionicons name="receipt-outline" size={48} color="#3173C4" />
        </View>
        <Text className="text-xl font-bold text-gray-800 text-center mb-2">
          Halaman KRS & KHS
        </Text>
        <Text className="text-sm text-gray-500 text-center px-4 leading-relaxed">
          Kartu Rencana Studi dan Kartu Hasil Studi Anda akan ditampilkan di sini
          pada pengembangan selanjutnya.
        </Text>
      </View>
    </SafeAreaView>
  );
}
