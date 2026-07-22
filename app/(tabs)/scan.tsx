import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// 1. Impor komponen CameraView dan hook requestPermission dari expo-camera
import { CameraView, useCameraPermissions } from "expo-camera";

export default function ScanScreen() {
  // Hook bawaan untuk mengelola izin akses kamera perangkat
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // 2. Cek status izin akses kamera saat komponen dimuat
  if (!permission) {
    // Status izin masih loading/sedang memuat
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    // Jika user belum memberikan izin akses kamera, tampilkan tombol minta izin
    return (
      <View
        className="flex-1 justify-center items-center p-6 gap-4"
        style={{ backgroundColor: "#1C2EB5" }}
      >
        <Text className="text-center text-gray-700 text-base">
          Aplikasi memerlukan izin akses kamera untuk memindai QR Code.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-blue-500 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Berikan Izin Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. Fungsi yang dipanggil otomatis saat QR Code berhasil terdeteksi
  const handleBarcodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);

    // Di sini Anda bisa memasukkan logika HTTP Method POST, navigasi, dll.
    alert(`QR Code Berhasil Discan!\nTipe: ${type}\nData: ${data}`);
  };

  return (
    <View className="flex-1 bg-black">
      {/* 4. Gunakan komponen CameraView dengan konfigurasi barcodeScanner */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // Batasi hanya mendeteksi QR Code saja agar akurat
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />
      {/* 5. Lapisan UI Transparan di atas Kamera agar Terlihat Bagus */}
      <View className="absolute top-0 bottom-0 left-0 right-0 justify-center items-center bg-black/50">
        {/* Kotak Target Pembingkai QR (Overlay) */}
        <View className="w-64 h-64 border-2 border-white rounded-3xl bg-transparent items-center justify-center">
          {/* Efek Garis Laser Pemindai (Opsional) */}
          <View className="w-56 h-[2px] bg-green-400 opacity-70" />
        </View>

        <Text className="text-white text-base font-semibold mt-6 px-4 py-2 bg-black/60 rounded-full">
          Posisikan QR Code di dalam kotak
        </Text>

        {/* 6. Munculkan tombol reset jika QR Code sudah terlanjur terscan */}
        {scanned && (
          <TouchableOpacity
            onPress={() => setScanned(false)}
            className="mt-8 bg-emerald-500 px-6 py-3 rounded-xl shadow-lg"
          >
            <Text className="text-white font-bold text-base">Scan Lagi</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
