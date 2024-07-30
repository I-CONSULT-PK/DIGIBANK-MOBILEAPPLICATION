import React, { useState } from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import { RadioButton } from "react-native-paper";
import CustomButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../GlobalStyles";

const BeneficiaryOption = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("wallet");

  const handleContinueClick = () => {
    closeOptionsMenu();

    if (selectedOption === "wallet") {
      navigation.navigate("WalletBeneficiary");
    } else if (selectedOption === "bank") {
      navigation.navigate("BankBeneficiary");
    }
  };

  return (
    <View
      className="bg-white p-4  rounded-2xl absolute top-[43%] w-full z-10 h-[70%] left-0 ring-2 ring-black ring-opacity-50"
      style={{
        backgroundColor: "white",
      }}
    >
      <View className="border-b-2 border-gray-200 pb-4 mb-4 right-1">
        <Text className="text-xl font-bold mx-auto">Add New Beneficiary</Text>
      </View>

      <TouchableOpacity
        onPress={() => setSelectedOption("wallet")}
        className="mb-4"
      >
        <View
          className="p-2 mb-5 rounded-xl flex-row items-center h-20 "
          style={{
            backgroundColor: "#F4F5F9",
          }}
        >
          <RadioButton
            value="wallet"
            status={selectedOption === "wallet" ? "checked" : "unchecked"}
            color={Color.PrimaryWebOrient}
          />
          <View className="ml-0">
            <Text className="font-bold">Primary Wallet</Text>
            <Text
              className="font-semibold  text-sm"
              style={{
                color: "#A5A7A8",
              }}
            >
              Add a user to Beneficiary using Wallet
            </Text>
          </View>
          <View></View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelectedOption("bank")}
        className="mb-4"
      >
        <View
          className="p-2 mb-2 rounded-xl flex-row items-center h-20"
          style={{
            backgroundColor: "#F4F5F9",
          }}
        >
          <RadioButton
            value="bank"
            status={selectedOption === "bank" ? "checked" : "unchecked"}
            onPress={() => setSelectedOption("bank")}
            color={Color.PrimaryWebOrient}
          />
          <View className="ml-0">
            <Text className="font-bold">Bank Account</Text>
            <Text
              className="font-semibold text-sm"
              style={{
                color: "#A5A7A8",
              }}
            >
              Add a user to Beneficiary using Account
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleContinueClick}>
        <View className="p-2 mt-1">
          <CustomButton
            Text={"Next"}
            backgroundColor={Color.PrimaryWebOrient}
            onPress={() => {
              if (selectedOption === "wallet") {
                navigation.navigate("WalletBeneficiary");
              } else if (selectedOption === "bank") {
                navigation.navigate("BankBeneficiary");
              }
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BeneficiaryOption;
