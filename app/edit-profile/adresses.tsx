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

export default function AdressesScreen() {
  const router = useRouter();
  const [alamatLengkap, setAlamatLengkap] = useState("Jl. Jend. Sudirman No. 123");
  const [provinsi, setProvinsi] = useState("DKI Jakarta");
  const [kota, setKota] = useState("Jakarta Selatan");
  const [kodePos, setKodePos] = useState("12190");

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
          <Text className="text-lg font-bold text-gray-800">Alamat</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
          {/* Form Section */}
          <View className="space-y-4">
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Alamat Lengkap
              </Text>
              <View className="flex-row items-start bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="home-outline" size={20} color="#9ca3af" className="mt-1" />
                <TextInput
                  value={alamatLengkap}
                  onChangeText={setAlamatLengkap}
                  className="flex-1 text-base text-gray-800 ml-3 min-h-[80px]"
                  placeholder="Masukkan Alamat Lengkap"
                  multiline={true}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Provinsi
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="map-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={provinsi}
                  onChangeText={setProvinsi}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Provinsi"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Kota / Kabupaten
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="business-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={kota}
                  onChangeText={setKota}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Kota / Kabupaten"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Kode Pos
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="mail-unread-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={kodePos}
                  onChangeText={setKodePos}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan Kode Pos"
                  keyboardType="number-pad"
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
