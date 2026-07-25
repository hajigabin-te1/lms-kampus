import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

const dummyCalendar = [
  {
    date: "2025-09-01",
    title: "Awal Perkuliahan 2025/2026 Ganjil",
    type: "start",
  },
  { date: "2025-10-21", title: "Ujian Tengah Semester (UTS)", type: "exam" },
  { date: "2026-01-07", title: "Ujian Akhir Semester (UAS)", type: "exam" },
  { date: "2026-02-16", title: "Pengisian KRS 2025/2026 Genap", type: "krs" },
  {
    date: "2026-03-01",
    title: "Awal Perkuliahan 2025/2026 Genap",
    type: "start",
  },
];

export default function CalendarAcademic() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Logika matematika
  const periodeAkademik = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    let academicYear = "";
    let semester = "";

    if (currentMonth >= 9 || currentMonth <= 2) {
      semester = "Ganjil";
      if (currentMonth >= 9) {
        academicYear = `${currentYear} / ${currentYear + 1} `;
      } else {
        academicYear = `${currentYear - 1} / ${currentYear}`;
      }
    } else {
      semester = "Genap";
      academicYear = `${currentYear - 1} / ${currentYear}`;
    }
    return { academicYear, semester };
  }, []);

  // Transformasikan data untuk menandai pada Calendar React Native
  const MarkerDates = useMemo(() => {
    const marked: any = {};

    dummyCalendar.forEach((event) => {
      let color = "##BBD8FC";
      if (event.type === "krs") color = "#214E83";
      if (event.type === "exam") color = "#96FC0F";

      marked[event.date] = {
        marked: true,
        dotColor: color,
        activeOpacity: 0.7,
      };
    });
    // Menandai tanggal yang sedang diklik user secara dinamis
    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: "#3B82F6", // Biru saat diklik
      };
    }

    return marked;
  }, []);

  // Fungsi saat user mengetuk salah satu tanggal di kalender
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    const event = dummyCalendar.find((e) => e.date === day.dateString);
    setSelectedEvent(event ? event.title : "Tidak ada agenda akademik");
  };
  return (
    <View className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 m-4">
      {/* Badge Header Periode Akademik Dinamis */}
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-base font-bold text-gray-800 dark:text-gray-100">
            Kalender Akademik
          </Text>
          <Text className="text-xs text-blue-600 font-semibold mt-0.5">
            Tahun {periodeAkademik.academicYear} — Semester{" "}
            {periodeAkademik.semester}
          </Text>
        </View>
      </View>

      {/* 4. KOMPONEN KALENDER UTAMA */}
      <Calendar
        current={new Date().toISOString().split("T")[0]} // Otomatis membuka bulan hari ini
        onDayPress={handleDayPress}
        markedDates={MarkerDates}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#3B82F6",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#3B82F6",
          dayTextColor: "#2d4150",
          textDisabledColor: "#dd99ee",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "#3B82F6",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "#1E293B",
          textMonthFontWeight: "bold",
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12,
        }}
      />

      {/* 5. BOX DETAIL AGENDA SAAT TANGGAL DIKLIK */}
      <View className="mt-4 p-4 bg-slate-50 dark:bg-gray-700 rounded-2xl border border-slate-100 dark:border-gray-600">
        <Text className="text-xs text-gray-400 font-medium">
          Detail Agenda ({selectedDate || "Pilih tanggal"}):
        </Text>
        <Text className="text-sm font-semibold text-slate-800 dark:text-white mt-1">
          {selectedEvent ||
            "Ketuk tanggal bertanda dot/titik untuk melihat agenda kampus"}
        </Text>
      </View>
    </View>
  );
}
