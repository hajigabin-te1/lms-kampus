// app/(tabs)/calendar.tsx
import CalendarAcademic from "@/src/components/calendarAcademic";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarScreen() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#ECECF8", "#0080FF"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          className="flex-1 bg-gray-50 dark:bg-gray-900"
          contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
        >
          <View className="p-4">
            <Text className="text-xl font-bold text-gray-800 dark:text-white">
              LMS Campus
            </Text>
            <Text className="text-sm text-gray-500">
              Informasi Agenda Kegiatan Kampus STIA Amuntai
            </Text>
          </View>

          {/* Panggil komponen kalender akademik dinamis */}
          <CalendarAcademic />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ECECF8",
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#ffffff",
//   },
// });
