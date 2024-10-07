import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, Alert, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { decrypt } from "../../../utils/crypto";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import Footer from "../../../components/Footer";

const SendFromAccount = ({ route }) => {
  const navigation = useNavigation();
  const { beneObj, source } = route.params || {};
  
  const [userDetails, setUserDetails] = useState({
    userName: null,
    accountNumber: null,
    bankLogo: null,
    balance: null,
    bankName: null
  });
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const handleBackPress = () => {
      source === "dashboard" ? navigation.navigate("Home") : navigation.goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const purpose = [
    { key: "1", value: "Bill Payment" },
    { key: "2", value: "Salary Payment" },
    { key: "3", value: "Loan Repayment" },
    { key: "4", value: "Gift" },
    { key: "5", value: "Savings" },
    { key: "6", value: "Investment" },
    { key: "7", value: "Donation" },
    { key: "8", value: "Transfer to own account" },
    { key: "9", value: "Rent Payment" },
    { key: "10", value: "Subscription Payment" },
    { key: "11", value: "Other" },
  ];

  const loadUserDetails = async () => {
    try {
      const firstName = await AsyncStorage.getItem("firstName");
      const lastName = await AsyncStorage.getItem("lastName");
      const accountNumber = await AsyncStorage.getItem("accountNumber");
      const encryptedBankLogo = await AsyncStorage.getItem("bankLogo");
      const balance = await AsyncStorage.getItem("balance");
      const bankName = await AsyncStorage.getItem("bankName");

      const bankLogo = encryptedBankLogo ? await decrypt(encryptedBankLogo) : null;

      setUserDetails({
        userName: (firstName || "") + " " + (lastName || ""),
        accountNumber: accountNumber,
        bankLogo: bankLogo,
        balance: balance,
        bankName: bankName
      });
    } catch (error) {
      console.error("Error loading user details: ", error);
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  const handleNext = () => {
    if (
      userDetails === null ||
      beneObj === null ||
      amount === 0 ||
      selected === ""
    ) {
      Alert.alert("Error", "Please fill all the required fields");
    } else {
      if (amount < 1 || amount > 5000000) {
        Alert.alert("Error", "Please enter the correct amount");
      } else {
        navigation.navigate("PayNow", {
          userDetails,
          beneObj,
          amount,
          selected,
        });
      }
    }
  };

  return (
    <SafeAreaView className="h-full flex-1 bg-[#F9FAFC]">
      <View style={{ height: 90 }}>
        <View className="flex-row items-center justify-center w-full h-full">
          <TouchableOpacity onPress={() => {
            source === "dashboard"
              ? navigation.navigate("Home")
              : navigation.goBack();
          }} className="absolute left-5">
            <Entypo name="chevron-left" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-black text-lg font-InterBold">Payment</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full h-full px-5">
          <View>
            <Text className="font-InterSemiBold">From Account</Text>
            <View className="bg-white p-3 rounded-lg shadow-md shadow-slate-400 w-full mt-3">
              <View className="flex-row items-center">
                {userDetails.bankLogo && <Image
                  source={{ uri: userDetails.bankLogo }}
                  className=" w-12 h-12"
                  resizeMode='contain'
                />}
                <View className="flex flex-col ml-4">
                  <Text className="font-InterSemiBold">
                    {userDetails && userDetails.userName}
                  </Text>
                  <Text className="text-sm leading-snug text-neutral-500">
                    {userDetails && userDetails.accountNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-4">
            <Text className="font-InterSemiBold">To Account</Text>
            <View className="bg-white p-3 rounded-lg shadow-md shadow-slate-400 w-full mt-3">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: beneObj.bankUrl }}
                  className=" w-12 h-12"
                  resizeMode='contain'
                />
                <View className="flex flex-col ml-4">
                  <Text className="font-InterSemiBold">
                    {beneObj.beneficiaryName}
                  </Text>
                  <Text className="text-sm leading-snug text-neutral-500">
                    {beneObj.accountNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-6">
            <Text className="font-InterSemiBold text-gray-700">
              Available balance: {userDetails && userDetails.balance}
            </Text>
          </View>

          <View className="mt-6">
            <Text className="font-InterSemiBold">
              Enter amount
            </Text>
            <TextInput
              className="mt-3 border border-gray-300 rounded-lg font-InterMedium"
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChange={(text) => setAmount(text)}
              style={{ width: "100%" }}
            />

            <Text className="mt-2 text-sm font-InterMedium text-gray-500">
              Enter an amount between Rs. 1 and Rs. 5,000,000
            </Text>
          </View>

          <View className="mt-6">
            <Text className="font-InterSemiBold">
              Purpose of payment
            </Text>

            <SelectList
              setSelected={(val) => setSelected(val)}
              data={purpose}
              save="value"
              search={false}
              placeholder="Select a purpose"
              boxStyles={{
                borderColor: "lightgray",
                borderWidth: 1,
                marginTop: 16,
                height: 52
              }}
              dropdownStyles={{
                borderColor: "lightgray",
                borderWidth: 1,
              }}
              inputStyles={{
                fontSize: 14.2,
                fontFamily: 'InterRegular'
              }}
              dropdownTextStyles={{
                fontSize: 14.2,
                fontFamily: 'InterRegular'
              }}
            />
          </View>

          <Button
            text="Next"
            onPress={handleNext}
            styles="mt-8 mb-4"
          />
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor="#F9FAFC" style="dark" />
    </SafeAreaView>
  );
};

export default SendFromAccount;
