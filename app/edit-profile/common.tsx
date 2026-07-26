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

export default function CommonScreen() {
  const router = useRouter();
  const [agama, setAgama] = useState("Islam");
  const [golonganDarah, setGolonganDarah] = useState("O");
  const [tempatLahir, setTempatLahir] = useState("Jakarta");
  const [tanggalLahir, setTanggalLahir] = useState("01 Januari 2000");

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
          <Text className="text-lg font-bold text-gray-800">Data Umum</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
          {/* Form Section */}
          <View className="space-y-4">
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Agama
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="heart-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={agama}
                  onChangeText={setAgama}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Agama"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Golongan Darah
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="water-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={golonganDarah}
                  onChangeText={setGolonganDarah}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Golongan Darah"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Tempat Lahir
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="location-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={tempatLahir}
                  onChangeText={setTempatLahir}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Tempat Lahir"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Tanggal Lahir
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="calendar-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={tanggalLahir}
                  onChangeText={setTanggalLahir}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Contoh: 01 Januari 2000"
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
