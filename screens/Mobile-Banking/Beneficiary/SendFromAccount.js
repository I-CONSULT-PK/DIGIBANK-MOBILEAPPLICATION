import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Footer from "../../../components/Footer";
import { useNavigation } from "@react-navigation/native";
import TextInput from "../../../components/TextInput";
import { Color } from "../../../GlobalStyles";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "../../../components/Button";
import { StatusBar } from "expo-status-bar";

const SendFromAccount = ({ route }) => {
  const navigation = useNavigation();
  const { beneObj, accountData } = route.params || {};

  console.log(accountData);

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
            onPress={() => navigation.navigate("Home")}
            className="absolute left-2 "
            style={{ zIndex: 1 }}
          >
            <Entypo name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-center font-InterBold text-2xl">
            Add Beneficiary
          </Text>
        </View>
        {/* From Account Section */}
        <Text className="font-semibold mb-1 text-gray-700 mt-7 px-3">
          From Account
        </Text>
        <View className="flex justify-center items-center ">
          <View
            className="flex flex-row items-center p-4 bg-white rounded-lg shadow-md  mx-4"
            style={{ width: "94%" }}
          >
            {/* DIGI BANK section */}
            <View className="px-3 py-2 text-sm font-medium text-white bg-cyan-500 rounded-md h-[54px] w-[65px]">
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
        <View className="flex justify-center items-center ">
          <View
            className="flex flex-row items-center p-4 bg-white rounded-lg shadow-md  mx-4"
            style={{ width: "94%" }}
          >
            {/* UBL BANK section */}
            <View className="p-2 rounded-sm shadow-md shadow-gray-200 justify-center items-center bg-slate-100">
              {beneObj && (
                <Image
                  source={{ uri: beneObj.bankUrl }}
                  resizeMode="contain"
                  className="w-10 h-10"
                />
              )}

              {accountData && (
                <Image
                  source={{ uri: accountData.bankUrl }}
                  resizeMode="contain"
                  className="w-10 h-10"
                />
              )}
            </View>

            {/* Account details section */}
            <View className="flex flex-col ml-4">
              <Text className="text-base font-semibold text-gray-800">
                {beneObj ? beneObj.beneficiaryName : accountData.title}
              </Text>
              <Text className="text-sm leading-snug text-neutral-500">
                {beneObj ? beneObj.accountNumber : accountData.accountNumber}
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
        <View className="flex flex-row  p-4 rounded-lg shadow-md  ">
          <TextInput
            className="mt-2 "
            placeholder="0.00"
            keyboardType="numeric"
            style={{ width: "100%" }}
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

        <View className="w-full px-4 py-4 rounded-lg shadow-md">
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={Purpose}
            save="value"
            placeholder="Others"
            boxStyles={{
              borderColor: "gray",
              borderWidth: 1,
              width: "100%", // Make the dropdown full width
            }}
            dropdownStyles={{
              borderColor: "gray",
              borderWidth: 0.5,
            }}
          />
        </View>

        <View className="p-5">
          <CustomButton
            text={"Next"}
            onPress={() => navigation.navigate("PayNow")}
          />
        </View>
      </ScrollView>

      <Footer />
      <StatusBar backgroundColor="#f9fafc" style="dark" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    elevation: 20,
    borderColor: Color.PrimaryWebOrient,
  },
});

export default SendFromAccount;
