import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { Color } from "../../../GlobalStyles";
import API_BASE_URL from '../../../config';
import CustomButton from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import Footer from "../../../components/Footer";

const SendFromAccount = ({ route }) => {
  const navigation = useNavigation();
  const { beneObj } = route.params || {};

  const [userDetails, setUserDetails] = useState(null);
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

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

  const handleSelect = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  const loadUserDetails = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      const bearerToken = await AsyncStorage.getItem('token');

      if (customerId && bearerToken) {
        const response = await axios.get(`${API_BASE_URL}/v1/customer/fetchUserDetails?userId=${customerId}`, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        });

        const dto = response.data;

        if (dto && dto.success && dto.data) {
          setUserDetails(dto.data);
        }
        else {
          if (dto.message) {
            Alert.alert('Error', dto.message);
          } else if (dto.errors && dto.errors.length > 0) {
            Alert.alert('Error', dto.errors.join('\n'));
          }
        }
      } else {
        Alert.alert('Error', 'Unexpected error occurred. Try again later!');
      }
    }
    catch (error) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          Alert.alert('Error', 'Server timed out. Try again later!');
        } else if (statusCode === 503) {
          Alert.alert('Error', 'Service unavailable. Please try again later.');
        } else if (statusCode === 400) {
          Alert.alert('Error', error.response.data.data.errors[0]);
        } else {
          Alert.alert('Error', error.message);
        }
      } else if (error.request) {
        Alert.alert('Error', 'No response from the server. Please check your connection.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  const handleNext = () => {
    if(userDetails === null || beneObj === null || amount === 0 || selected === "") {
      Alert.alert('Error', 'Please fill all the required fields');
    }
    else {
      if (amount < 1 || amount > 5000000) {
        Alert.alert('Error', 'Please enter the correct amount');
      }
      else {
        navigation.navigate('PayNow', { userDetails, beneObj, amount, selected });
      }
    }
  };

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
            Payment
          </Text>
        </View>
        {/* From Account Section */}
        <Text className="font-semibold mb-1 text-gray-700 mt-7 px-3">
          From Account
        </Text>
        <View className="flex justify-center items-center">
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
                {userDetails && (userDetails.firstName + " " + userDetails.lastName)}
              </Text>
              <Text className="text-sm leading-snug text-neutral-500">
                {userDetails && (userDetails.accountNumber)}
              </Text>
            </View>
          </View>
        </View>
        {/* To Account Section */}
        <Text className="font-semibold mb-1 text-gray-700 mt-7 px-3">
          To Account
        </Text>
        <View className="flex justify-center items-center">
          <View
            className="flex flex-row overflow-hidden items-center p-4 bg-white rounded-lg shadow-md w-96 max-w-md"
            style={styles.container}
          >
            {/* UBL BANK section */}
            <View className="p-2 rounded-md shadow-md shadow-gray-300 justify-center items-center bg-slate-100">
              <Image
                source={{ uri: beneObj.bankUrl }}
                resizeMode="contain"
                className="w-10 h-10"
              />
            </View>

            {/* Account details section */}
            <View className="flex flex-col ml-4">
              <Text className="text-base font-semibold text-gray-800">
                {beneObj.beneficiaryName}
              </Text>
              <Text className="text-sm leading-snug text-neutral-500">
                {beneObj.accountNumber}
              </Text>
            </View>
          </View>
        </View>
        {/* Balance and Amount Section */}
        <Text className="font-semibold mb-1 text-gray-700 mt-4 px-3">
          Available balance: {userDetails && (userDetails.defaultAccountBalance)}
        </Text>
        <Text className="font-semibold mb-1 text-gray-700 mt-7 px-3">
          Enter amount
        </Text>
        <View className="flex items-center">
          <TextInput
            className="mt-2 w-96"
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChange={(text) => setAmount(text)}
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
              data={purpose}
              save="value"
              placeholder="Select a purpose"
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
            onPress={handleNext}
            width="w-[100%]"
          />
        </View>
      </ScrollView>

      <Footer />
      <StatusBar backgroundColor='#f9fafc' style="dark" />
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
