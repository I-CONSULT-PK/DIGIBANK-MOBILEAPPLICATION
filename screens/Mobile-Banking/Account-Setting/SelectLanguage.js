import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import Button from "../../../components/Button";

const SelectLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "English", value: "en" },
    { label: "Español", value: "es" },
    { label: "Français", value: "fr" },
    { label: "Deutsch", value: "de" },
    { label: "中文", value: "zh" },
  ]);

  const navigation = useNavigation();

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem("language", language);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold ml-4">Change Language</Text>
      </View>
      <Text className="text-xl font-semibold ml-4">Select Language</Text>
      <View className="flex-row items-center">
        <DropDownPicker
          open={open}
          value={selectedLanguage}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedLanguage}
          setItems={setItems}
          onChangeValue={handleLanguageChange}
          placeholder="Select Language"
          containerStyle={{ width: "80%" }}
          dropDownContainerStyle="bg-white border border-gray-300 rounded-md shadow-md"
          textStyle="text-base text-gray-700"
          style="bg-white border border-gray-300 rounded-md"
          placeholderStyle="text-gray-400"
        />
        <Text className="ml-4 text-base text-gray-700">
          {items.find((item) => item.value === selectedLanguage)?.label ||
            "Language"}
        </Text>
      </View>
      <View className="mt-3 mb-1">
        <Button text="Next" width="w-[100%]" styles="mb-4 py-4" />
      </View>
    </SafeAreaView>
  );
};

export default SelectLanguage;
