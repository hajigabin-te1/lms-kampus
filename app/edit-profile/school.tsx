import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SchoolScreen() {
  const router = useRouter();
  const [namaSekolah, setNamaSekolah] = useState("SMA Negeri 1 Jakarta");
  const [tahunLulus, setTahunLulus] = useState("2023");
  const [jurusan, setJurusan] = useState("IPA");

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 bg-white shadow-sm border-b border-gray-100 z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 justify-center items-center rounded-full bg-gray-50 mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">Asal Sekolah</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
          {/* Form Section */}
          <View className="space-y-4">
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Nama Sekolah
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="school-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={namaSekolah}
                  onChangeText={setNamaSekolah}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Nama Sekolah"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Tahun Lulus
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="calendar-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={tahunLulus}
                  onChangeText={setTahunLulus}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Tahun Lulus"
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Jurusan
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="book-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={jurusan}
                  onChangeText={setJurusan}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Jurusan"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Floating Action Button Bottom */}
        <View className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            className="bg-blue-600 py-4 rounded-2xl items-center shadow-sm"
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-base">Simpan Perubahan</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
