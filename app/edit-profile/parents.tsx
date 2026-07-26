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

export default function ParentsScreen() {
  const router = useRouter();
  const [namaAyah, setNamaAyah] = useState("Sutrisno");
  const [pekerjaanAyah, setPekerjaanAyah] = useState("PNS");
  const [namaIbu, setNamaIbu] = useState("Sumarni");
  const [pekerjaanIbu, setPekerjaanIbu] = useState("Ibu Rumah Tangga");
  const [noTelpOrtu, setNoTelpOrtu] = useState("081298765432");

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
          <Text className="text-lg font-bold text-gray-800">Data Orang Tua / Wali</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
          {/* Form Section */}
          <View className="space-y-4">
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Nama Ayah
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="person-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={namaAyah}
                  onChangeText={setNamaAyah}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Nama Ayah"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Pekerjaan Ayah
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="briefcase-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={pekerjaanAyah}
                  onChangeText={setPekerjaanAyah}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Pekerjaan Ayah"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Nama Ibu
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="person-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={namaIbu}
                  onChangeText={setNamaIbu}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Nama Ibu"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Pekerjaan Ibu
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="briefcase-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={pekerjaanIbu}
                  onChangeText={setPekerjaanIbu}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Pekerjaan Ibu"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Nomor Telepon Orang Tua / Wali
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="call-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={noTelpOrtu}
                  onChangeText={setNoTelpOrtu}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan No. Telepon"
                  keyboardType="phone-pad"
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
