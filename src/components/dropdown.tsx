import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const Dropdown = (data: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState(null);

  const options = data;
  const handleOptionClick = (option: any) => {
    setSelectOption(option);
    setIsOpen(false);
  };

  return (
    <View className="w-4/5 self-center mt-12">
      <Text className="text-base text-gray-50 mb-2">
        Silahkan Pilih Semester Aktif
      </Text>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className={`flex-row justify-between items-center bg-white border border-gray-300 px-4 py-3 
                ${isOpen ? "rounded-t-lg" : "rounded-lg"} 
                `}
      >
        <Text className="text-base text-gray-700">
          {selectOption || "Select an option"}
        </Text>
        <Text className="text-base text-gray-700">{isOpen ? "▲" : "▼"}</Text>
      </Pressable>
      {isOpen && (
        <View className="bg-white border border-gray-300 rounded-b-lg mt-2 max-h-40">
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }): any => {
              <Pressable
                onPress={() => handleOptionClick(item)}
                className="px-4 py-3"
              >
                <Text className="text-base text-gray-700"></Text>
              </Pressable>;
            }}
          ></FlatList>
        </View>
      )}
    </View>
  );
};

export default Dropdown;
