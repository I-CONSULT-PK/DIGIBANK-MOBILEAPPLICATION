import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";

import { Color } from "../../../GlobalStyles";
import OptionBox from "../../../components/OptionBox";
import Footer from "../../../components/Footer";

import BankIcon from "../../../assets/bank-icon.png";
import RaastIcon from "../../../assets/raast-icon.png";

const SendBeneficiaryMoney = ({ navigation }) => {
  useEffect(() => {
    const handleBackPress = () => {
      navigation.navigate("Home");
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <SafeAreaView className="h-full flex-1" style={{ backgroundColor: Color.PrimaryWebOrient }}>
      <View style={{ backgroundColor: Color.PrimaryWebOrient, height: 100 }}>
        <View className="flex-row items-center justify-center w-full h-full">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="absolute left-5"
          >
            <Entypo name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-InterBold">Send Money</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full h-full px-6 bg-[#F9FAFC]">
          <View className="mt-8">
            <Text className="font-InterSemiBold text-base">Select Method</Text>
          </View>

          <View className="mt-8">
            <OptionBox
              image={BankIcon}
              text="Transfer to Bank"
              subtext="Transfer to all banks & wallets"
              icon1="arrowright"
              onPress1={() => navigation.navigate("BeneficiaryList", { source: 'payment' })}
              iconColor1={Color.PrimaryWebOrient}
            />

            <View className="my-4 w-full border-b border-gray-300" />

            <OptionBox
              image={RaastIcon}
              text="Raast Payment"
              subtext="Free transfer to mobile number / IBAN / Bank account"
              icon1="arrowright"
              iconColor1={Color.PrimaryWebOrient}
            />

            <View className="my-4 w-full border-b border-gray-300" />
          </View>
        </View>
      </ScrollView>

      <Footer />

      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default SendBeneficiaryMoney;
