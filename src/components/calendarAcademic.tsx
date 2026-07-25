import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
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
  {
    date: "2026-08-10",
    title: "Ujian Akhir Semester (UAS) Genap",
    type: "exam",
  }, // Contoh bulan mendatang
];

const getEventTypeColor = (type: string) => {
  if (type === "exam") return "#EF4444";
  if (type === "krs") return "#F59E0B";
  return "#10B981";
};

export default function AcademicCalendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];
  const currentMonthYearToday = todayStr.substring(0, 7); // Contoh: "2026-08"
  const [currentMonthStr, setCurrentMonthStr] = useState(currentMonthYearToday);

  // State Pengendali Modal Kustom
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // State untuk melacak bulan apa saja yang sudah memicu alert agar tidak muncul berulang-ulang
  const [triggeredMonths, setTriggeredMonths] = useState<string[]>([]);

  const monthlyEvents = useMemo(() => {
    return academicEvents.filter((event) =>
      event.date.startsWith(currentMonthStr),
    );
  }, [currentMonthStr]);

  // ======================================================================
  // LOGIKA FILTER ALERT: HANYA BULAN SEKARANG & MASA DEPAN + HANYA 1 KALI
  // ======================================================================
  useEffect(() => {
    const hasExamThisMonth = monthlyEvents.some(
      (event) => event.type === "exam",
    );

    // Cek apakah bulan yang sedang dibuka >= bulan hari ini (belum kedaluwarsa)
    const isCurrentOrFutureMonth = currentMonthStr >= currentMonthYearToday;

    // Cek apakah bulan ini belum pernah memicu alert sebelumnya dalam sesi ini
    const isNotYetTriggered = !triggeredMonths.includes(currentMonthStr);

    if (hasExamThisMonth && isCurrentOrFutureMonth && isNotYetTriggered) {
      const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      const currentMonthIndex = parseInt(currentMonthStr.split("-")[1]) - 1;

      // Set pesan untuk modal kustom
      setModalMessage(
        `Halo Mahasiswa! Sistem mendeteksi adanya agenda Ujian (UTS/UAS) pada bulan ${monthNames[currentMonthIndex]}. Jangan lupa persiapkan belajar dan jaga kesehatan fisik Anda!`,
      );
      setIsModalVisible(true);

      // Kunci bulan ini agar tidak memicu alert lagi jika user bolak-balik menekan panah kalender
      setTriggeredMonths((prev) => [...prev, currentMonthStr]);
    }
  }, [currentMonthStr, monthlyEvents, triggeredMonths, currentMonthYearToday]);

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

  const markedDates = useMemo(() => {
    const marked: any = {};
    academicEvents.forEach((event) => {
      marked[event.date] = {
        marked: true,
        dotColor: getEventTypeColor(event.type),
      };
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
      {/* ======================================================================
          MODAL POP-UP KUSTOM (ESTETIK NATIVEWIND)
          ====================================================================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-white dark:bg-gray-900 w-full max-w-sm p-6 rounded-3xl items-center shadow-2xl border border-gray-100 dark:border-gray-800">
            {/* Lingkaran Ikon Peringatan Merah */}
            <View className="w-16 h-16 bg-rose-100 dark:bg-rose-950 rounded-full justify-center items-center mb-4 shadow-sm">
              <Ionicons name="alert-circle" size={36} color="#EF4444" />
            </View>

            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center tracking-tight">
              Pengingat Akademik
            </Text>

            <Text className="text-sm text-gray-500 dark:text-gray-400 text-center leading-relaxed mb-6">
              {modalMessage}
            </Text>

            {/* Tombol Konfirmasi Estetik */}
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="w-full bg-blue-600 active:bg-blue-700 py-3.5 rounded-2xl items-center shadow-md shadow-blue-500/20"
            >
              <Text className="text-white font-bold text-base tracking-wide">
                Siap, Paham
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* TAMPILAN HEADER & KALENDER */}
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-base font-bold text-gray-800 dark:text-gray-100">
            Kalender Akademik
          </Text>
          <Text className="text-xs text-blue-600 font-semibold mt-0.5">
            Tahun {academicPeriod.tahunAkademik} — Semester{" "}
            {academicPeriod.semester}
          </Text>
        </View>
      </View>

      <Calendar
        current={todayStr}
        markedDates={markedDates}
        onMonthChange={(month) => {
          setCurrentMonthStr(month.dateString.substring(0, 7));
          setSelectedDate("");
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

      <View className="mt-4 p-4 bg-blue-50 dark:bg-slate-700 rounded-2xl border border-blue-100 dark:border-slate-600">
        <Text className="text-xs text-blue-500 font-medium">
          Detail Klik Tanggal ({selectedDate || "Belum memilih"}):
        </Text>
        <Text className="text-sm font-semibold text-slate-800 dark:text-white mt-1">
          {selectedEvent ||
            "Ketuk tanggal bertitik untuk melihat detail hari spesifik."}
        </Text>
      </View>

      {/* DAFTAR AGENDA BULAN INI */}
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
            const tgl = ev.date.split("-")[2];
            const indicatorColor = getEventTypeColor(ev.type);

            return (
              <View
                key={index}
                className="flex-row items-center py-2.5 pl-3 pr-2 mb-2 bg-slate-50 dark:bg-slate-700 rounded-xl overflow-hidden relative"
              >
                <View
                  className="absolute left-0 top-0 bottom-0 w-1.5"
                  style={{ backgroundColor: indicatorColor }}
                />
                <View className="bg-white dark:bg-slate-600 border border-slate-100 dark:border-slate-500 rounded-xl px-2.5 py-1 items-center justify-center mr-3 w-11 shadow-sm">
                  <Text className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
                    {tgl}
                  </Text>
                </View>
                <Text className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex-1">
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
