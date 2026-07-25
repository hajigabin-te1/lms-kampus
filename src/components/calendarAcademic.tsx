import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

const academicEvents = [
  { date: "2025-09-01", title: "Awal Kuliah Ganjil 25/26", type: "start" },
  { date: "2025-10-20", title: "Ujian Tengah Semester (UTS)", type: "exam" },
  { date: "2026-01-05", title: "Ujian Akhir Semester (UAS)", type: "exam" },
  {
    date: "2026-01-07",
    title: "Ujian Akhir Semester Susulan (UAS)",
    type: "exam",
  },
  { date: "2026-02-16", title: "Masa Pengisian KRS Genap", type: "krs" },
  { date: "2026-03-02", title: "Awal Kuliah Genap 25/26", type: "start" },
];

export default function AcademicCalendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // State untuk menyimpan tahun-bulan yang sedang aktif dilihat (Format: YYYY-MM)
  const todayStr = new Date().toISOString().split("T")[0];
  const [currentMonthStr, setCurrentMonthStr] = useState(
    todayStr.substring(0, 7),
  );

  // 1. FILTER OTOMATIS AGENDA BERDASARKAN BULAN YANG SEDANG DILIHAT
  const monthlyEvents = useMemo(() => {
    return academicEvents.filter((event) =>
      event.date.startsWith(currentMonthStr),
    );
  }, [currentMonthStr]);

  // Logika hitung periode ganjil/genap (tetap sama)
  const academicPeriod = useMemo(() => {
    const [year, month] = currentMonthStr.split("-").map(Number);
    let tahunAkademik = "";
    let semester = "";

    if (month >= 9 || month <= 2) {
      semester = "Ganjil";
      tahunAkademik =
        month >= 9 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
    } else {
      semester = "Genap";
      tahunAkademik = `${year - 1}/${year}`;
    }
    return { tahunAkademik, semester };
  }, [currentMonthStr]);

  // Logika marking dot biasa (kembali ke setelan awal)
  const markedDates = useMemo(() => {
    const marked: any = {};
    academicEvents.forEach((event) => {
      let color = "#10B981";
      if (event.type === "exam") color = "#EF4444";
      if (event.type === "krs") color = "#F59E0B";

      marked[event.date] = { marked: true, dotColor: color };
    });

    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: "#3B82F6",
      };
    }
    return marked;
  }, [selectedDate]);

  return (
    <View className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 m-4">
      <View className="mb-4">
        <Text className="text-base font-bold text-gray-800 dark:text-gray-100">
          Kalender Akademik
        </Text>
        <Text className="text-xs text-blue-600 font-semibold mt-0.5">
          Tahun {academicPeriod.tahunAkademik} — Semester{" "}
          {academicPeriod.semester}
        </Text>
      </View>

      <Calendar
        current={todayStr}
        markedDates={markedDates}
        // 2. TANGKAP PERUBAHAN BULAN SAAT USER SWIPE / KLIK PANAH KALENDER
        onMonthChange={(month) => {
          setCurrentMonthStr(month.dateString.substring(0, 7));
          setSelectedDate(""); // Reset pilihan tanggal setiap ganti bulan
          setSelectedEvent(null);
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          const event = academicEvents.find((e) => e.date === day.dateString);
          setSelectedEvent(event ? event.title : "Tidak ada agenda khusus");
        }}
        theme={{
          selectedDayBackgroundColor: "#3B82F6",
          todayTextColor: "#3B82F6",
          arrowColor: "#3B82F6",
          monthTextColor: "#1E293B",
          textMonthFontWeight: "bold",
        }}
      />

      {/* 3. TAMPILAN DETAIL AGENDA KLIKAN (DINAMIS TANGGAL) */}
      <View className="mt-4 p-4 bg-blue-50 dark:bg-slate-700 rounded-2xl border border-blue-100">
        <Text className="text-xs text-blue-500 font-medium">
          Detail Klik Tanggal ({selectedDate || "Belum memilih"}):
        </Text>
        <Text className="text-sm font-semibold text-slate-800 dark:text-white mt-1">
          {selectedEvent ||
            "Ketuk tanggal bertitik untuk melihat detail hari spesifik."}
        </Text>
      </View>

      {/* 4. DAFTAR SEMUA AGENDA BULAN INI (DINAMIS BULAN) */}
      <View className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Agenda Selama Bulan Ini:
        </Text>
        {monthlyEvents.length === 0 ? (
          <Text className="text-sm text-gray-400 italic py-2">
            Tidak ada agenda akademik di bulan ini.
          </Text>
        ) : (
          monthlyEvents.map((ev, index) => {
            const tgl = ev.date.split("-")[2]; // Ambil angka tanggalnya saja
            return (
              <View
                key={index}
                className="flex-row items-center py-2 border-b border-gray-50 dark:border-gray-700"
              >
                <View className="bg-slate-100 dark:bg-slate-600 rounded-xl px-3 py-1 items-center justify-center mr-3 w-12">
                  <Text className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {tgl}
                  </Text>
                </View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
                  {ev.title}
                </Text>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}
