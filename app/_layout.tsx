import "../src/styles/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Daftarkan rute utama aplikasimu di sini (opsional tapi disarankan) */}
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/loading" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="class/[id]" />
      </Stack>
      <Toast />
    </>
  );
}
