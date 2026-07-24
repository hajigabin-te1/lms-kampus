import { Text, useWindowDimensions, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const rawData = [
  { semester: 1, ips: 3.2 },
  { semester: 2, ips: 3.33 },
  { semester: 3, ips: 3.35 },
  { semester: 4, ips: 3.6 },
];

const getSemesterColor = (sem: number) => {
  if (sem <= 8) return "#27E83D";
  if (sem >= 9 && sem <= 10) return "#E8CF2E";
  return "#DB1818";
};

export default function ChartAcademic() {
  const { width } = useWindowDimensions();
  const chartWidth = width - 80;

  const chartData = rawData.map((item) => ({
    value: item.ips,
    label: `S${item.semester}`,
    dataPointColor: getSemesterColor(item.semester),
    dataPointLabelComponent: () => (
      <View className="bg-slate-300 px-1 rounded absolute -top-6 -left-2">
        <Text className="text-[10px] text-white font-bold">
          {item.ips.toFixed(2)}
        </Text>
      </View>
    ),
  }));

  return (
    <View className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 m-4">
      <View className="mb-4">
        <Text className="text-base font-bold text-gray-800 dark:text-gray-100">
          Tren Indeks Prestasi Semester (IPS)
        </Text>
        <Text className="text-xs text-gray-400 mt-0.5">
          Batas studi maksimal S1: 14 Semester
        </Text>
      </View>

      <View className="items-center justify-center">
        <LineChart
          data={chartData}
          width={chartWidth}
          height={180}
          spacing={38}
          initialSpacing={15}
          thickness={3}
          color="#38E0DB"
          hideRules={false}
          rulesColor="#ABC7C5"
          maxValue={4}
          noOfSections={4}
          animateOnDataChange
          animationDuration={1200}
          dataPointsRadius={5}
        />
      </View>

      {/* Legend Batas Studi */}
      <View className="flex-row justify-between mt-5 pt-3 border-t border-gray-100 dark:border-gray-700">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
          <Text className="text-xs font-medium text-gray-600 dark:text-gray-400">
            S1-S8 (Ideal)
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
          <Text className="text-xs font-medium text-gray-600 dark:text-gray-400">
            S9-S10 (Peringatan)
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-rose-500 mr-2" />
          <Text className="text-xs font-medium text-gray-600 dark:text-gray-400">
            S11-S14 (Kritis)
          </Text>
        </View>
      </View>
    </View>
  );
}
