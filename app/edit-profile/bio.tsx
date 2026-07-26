import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BioScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("budi.santoso@student.univ.edu");
  const [phone, setPhone] = useState("081234567890");

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
          <Text className="text-lg font-bold text-gray-800">Data Diri</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
          {/* Avatar Section */}
          <View className="items-center mb-8 mt-4">
            <View className="relative">
              <View className="w-28 h-28 rounded-full border-4 border-blue-50 overflow-hidden bg-gray-100">
                <Image
                  source={{
                    uri: "https://ui-avatars.com/api/?name=Budi+Santoso&background=4facfe&color=fff&size=150",
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-blue-600 w-9 h-9 rounded-full justify-center items-center border-2 border-white shadow-sm"
                activeOpacity={0.8}
              >
                <Ionicons name="camera" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="mt-4 text-xs font-medium text-gray-400">
              Ketuk ikon kamera untuk mengubah foto
            </Text>
          </View>

          {/* Form Section */}
          <View className="space-y-4">
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Email
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Masukkan email Anda"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Nomor Ponsel / WhatsApp
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Ionicons name="logo-whatsapp" size={20} color="#9ca3af" />
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  className="flex-1 text-base text-gray-800 ml-3"
                  placeholder="Contoh: 08123456789"
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
