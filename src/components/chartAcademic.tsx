import { Text, useWindowDimensions, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const rawData = [
  { semester: 1, ips: 3.2 },
  { semester: 2, ips: 3.33 },
  { semester: 3, ips: 3.35 },
  { semester: 4, ips: 3.6 },
  { semester: 5, ips: 3.7 },
  { semester: 6, ips: 2.3 },
  { semester: 7, ips: 3.45 },
  { semester: 8, ips: 3.6 },
  { semester: 9, ips: 3.62 },
  { semester: 10, ips: 3.54 },
];

const getSemesterColor = (sem: number) => {
  if (sem <= 8) return "#27E83D";
  if (sem >= 9 && sem <= 10) return "#E8CF2E";
  return "#DB1818";
};

export default function ChartAcademic({
  isDarkMode = false,
}: {
  isDarkMode?: boolean;
}) {
  const { width } = useWindowDimensions();
  // Menghitung chartWidth yang responsif dengan padding dari parent dan self
  const chartWidth = width - 110;

  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const subTextColor = isDarkMode ? "text-gray-300" : "text-gray-500";
  const rulesColor = isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";

  const chartData = rawData.map((item) => ({
    value: item.ips,
    label: `S${item.semester}`,
    dataPointColor: getSemesterColor(item.semester),
    textColor: isDarkMode ? "#ffffff" : "#1f2937",
    dataPointLabelComponent: () => (
      <View
        className={`${isDarkMode ? "bg-gray-700" : "bg-white"} px-1.5 py-0.5 rounded absolute -top-6 -left-3 shadow-sm`}
      >
        <Text
          className={`text-[8px] ${isDarkMode ? "text-white" : "text-gray-800"} font-bold`}
        >
          {item.ips.toFixed(2)}
        </Text>
      </View>
    ),
  }));

  return (
    <View
      className="p-5 rounded-3xl mb-6 border border-white/20"
      style={{
        backgroundColor: isDarkMode
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.4)",
      }}
    >
      <View className="mb-4">
        <Text className={`text-base font-bold ${textColor}`}>
          Tren Indeks Prestasi Semester (IPS)
        </Text>
        <Text className={`text-xs mt-0.5 ${subTextColor}`}>
          Batas studi maksimal S1: 14 Semester
        </Text>
      </View>

      <View className="items-center justify-center -ml-2">
        <LineChart
          data={chartData}
          width={chartWidth}
          height={250}
          spacing={50}
          initialSpacing={24}
          thickness={3}
          color="#38E0DB"
          hideRules={false}
          rulesColor={rulesColor}
          yAxisTextStyle={{
            color: isDarkMode ? "#e5e7eb" : "#374151",
            fontSize: 10,
          }}
          xAxisLabelTextStyle={{
            color: isDarkMode ? "#e5e7eb" : "#374151",
            fontSize: 10,
          }}
          maxValue={4}
          noOfSections={4}
          animateOnDataChange
          animationDuration={1200}
          dataPointsRadius={5}
          isAnimated
        />
      </View>

      {/* Legend Batas Studi */}
      <View
        className={`flex-row justify-between mt-5 pt-3 border-t ${isDarkMode ? "border-white/10" : "border-black/5"}`}
      >
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-emerald-500 mr-1.5" />
          <Text className={`text-[10px] font-medium ${subTextColor}`}>
            S1-S8 (Ideal)
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-amber-500 mr-1.5" />
          <Text className={`text-[10px] font-medium ${subTextColor}`}>
            S9-S10 (Peringatan)
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-rose-500 mr-1.5" />
          <Text className={`text-[10px] font-medium ${subTextColor}`}>
            S11-S14 (Kritis)
          </Text>
        </View>
      </View>
    </View>
  );
}
