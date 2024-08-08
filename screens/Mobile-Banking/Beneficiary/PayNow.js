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
const PayNow = () => {
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
        <TouchableOpacity
          className="mt-10 ml-4" 
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
        {/* Title Section */}
        <View className="justify-center items-center">
          <Text className="font-InterBold text-2xl">Send Money</Text>
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
        <View className="flex flex-col text-sm max-w-[328px]">
          <View className="flex flex-col items-start font-semibold text-gray-800">
            <Text className="font-semibold mb-1 text-gray-700 mt-7 px-3">
              To Account
            </Text>
          </View>
          <View className="flex flex-col items-center p-5 bg-white rounded-lg  w-96 mt-5 ml-2">
            {/* Account Title Section */}
            <View className="flex flex-col w-full mb-4">
              <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-neutral-500">Account Title</Text>
                <Text className="text-gray-800 font-semibold">Mahrukh Zafar</Text>
              </View>
              <View className="my-2">
                <View className="border-t border-gray-300" />
              </View>
            </View>

            {/* Bank Name Section */}
            <View className="flex flex-col w-full mb-4">
              <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-neutral-500">Bank Name</Text>
                <Text className="text-gray-800 font-semibold">UBL</Text>
              </View>
              <View className="my-2">
                <View className="border-t border-gray-300" />
              </View>
            </View>

            {/* Nick Name Section */}
            <View className="flex flex-col w-full">
              <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-neutral-500">Nick Name</Text>
                <Text className="text-gray-800 font-semibold">Mahrukh</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Balance and Amount Section */}
        <View className="flex flex-col text-sm max-w-[328px]">
          <View className="flex flex-col items-start font-semibold text-gray-800">
            <Text className="font-semibold mb-1 text-gray-700 mt-7 px-3">
              Transfer Details
            </Text>
          </View>
          <View className="flex flex-col items-center p-5 bg-white rounded-lg  w-96 mt-5 ml-2">
            {/* Account Title Section */}
            <View className="flex flex-col w-full mb-4">
              <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-neutral-500">Amount</Text>
                <Text className="text-gray-800 font-semibold">Rs. 10,000</Text>
              </View>
              <View className="my-2">
                <View className="border-t border-gray-300" />
              </View>
            </View>

            {/* Bank Name Section */}
            <View className="flex flex-col w-full mb-4">
              <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-neutral-500">Bank Charges</Text>
                <Text className="text-gray-800 font-semibold">Rs. 5</Text>
              </View>
              <View className="my-2">
                <View className="border-t border-gray-300" />
              </View>
            </View>

            {/* Nick Name Section */}
            <View className="flex flex-col w-full">
              <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-black">Total Amount</Text>
                <Text className="text-black font-semibold">Rs. 10,002</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="p-5">
          <CustomButton
            text={"Pay Now"}
            onPress={() => navigation.navigate("CashUpCard")}
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

export default PayNow;
