import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Footer from "../../../components/Footer";
import { useNavigation } from "@react-navigation/native";
import TextInput from "../../../components/TextInput";
import { Color } from "../../../GlobalStyles";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "../../../components/Button";
const SendFromAccount = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState("");

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };
  const Purpose = [
    { key: "1", value: "Standard Chartered Bank" },
    { key: "2", value: "HBL (Habib Bank Limited)" },
    { key: "3", value: "UBL (United Bank Limited)" },
    { key: "4", value: "MCB Bank" },
    { key: "5", value: "Bank Alfalah" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc]">
      <ScrollView className="flex-1">
      <View className="relative w-full mt-10">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5 "
              style={{ zIndex: 1 }}
            >
              <Entypo name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
            <Text className="text-center font-InterBold text-2xl">
            Send Money
            </Text>
          </View>
        {/* From Account Section */}
        <Text className="font-semibold mb-1 text-gray-700 mt-7 px-3">
          From Account
        </Text>
        <View className="flex justify-center items-center px-3">
          <View
            className="flex flex-row items-center p-4 bg-white rounded-lg shadow-md w-96 max-w-md"
            style={styles.container}
          >
            {/* DIGI BANK section */}
            <View className="px-3 py-2 text-sm font-medium  text-white bg-cyan-500 rounded-md h-[54px] w-[65px]">
              <Text className="text-center text-white">DIGI {"\n"}BANK</Text>
            </View>

            {/* Account details section */}
            <View className="flex flex-col ml-4">
              <Text className="text-base font-semibold text-gray-800">
                Mirza Uraib
              </Text>
              <Text className="text-sm leading-snug text-neutral-500">
                25678945087986
              </Text>
            </View>
          </View>
        </View>
        {/* To Account Section */}
        <Text className="font-semibold mb-1 text-gray-700 mt-7 px-3">
          To Account
        </Text>
        <View className="flex justify-center items-center px-3">
          <View
            className="flex flex-row items-center p-4 bg-white rounded-lg shadow-md w-96 max-w-md"
            style={styles.container}
          >
            {/* UBL BANK section */}
            <View className="px-3 py-2 text-sm font-medium text-center  bg-blue rounded-md h-[54px] w-[65px]">
              <Text className="text-center text-white">UBL {"\n"}BANK</Text>
            </View>

            {/* Account details section */}
            <View className="flex flex-col ml-4">
              <Text className="text-base font-semibold text-gray-800">
                Mahrukh Zafar
              </Text>
              <Text className="text-sm leading-snug text-neutral-500">
                25678945087986
              </Text>
            </View>
          </View>
        </View>
        {/* Balance and Amount Section */}
        <Text className="font-semibold mb-1 text-gray-700 mt-4 px-3">
          Available balance Rs. 95,000
        </Text>
        <Text className="font-semibold mb-1 text-gray-700 mt-7 px-3">
          Enter amount
        </Text>
        <View className="flex items-center">
          <TextInput
            className="mt-2 w-96"
            placeholder="0.00"
            keyboardType="numeric"
          />
        </View>
        <Text className="px-3 mt-5">
          Enter an amount between Rs. 1 and{"\n"}
          Rs. 5,000,000
        </Text>
        <View className="mt-5">
          <Text className="text-sm font-medium text-zinc-600 px-3">
            Purpose Of Payment
          </Text>
        </View>
        <View className="flex-1 justify-center items-center p-4">
          <View className="w-96">
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={Purpose}
              save="value"
              placeholder="Others"
              boxStyles={{
                borderColor: "gray",
                borderWidth: 1,
              }}
              dropdownStyles={{
                borderColor: "gray",
                borderWidth: 1,
              }}
            />
          </View>
        </View>
        <View className="p-5">
          <CustomButton
            text={"Next"}
            onPress={() => navigation.navigate("PayNow")}
          />
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    elevation: 30,
    borderColor: Color.PrimaryWebOrient,
  },
});

export default SendFromAccount;
