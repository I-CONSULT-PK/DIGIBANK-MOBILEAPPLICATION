import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Footer from "../../../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../../GlobalStyles";
import CustomButton from "../../../components/Button";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from '../../../config';

const PayNow = ({ route }) => {
  const navigation = useNavigation();
  const { userDetails, beneObj, amount, selected } = route.params || {};

  const [bankCharges, setBankCharges] = useState(5);
  const [totalAmount, setTotalAmount] = useState(parseInt(bankCharges) + parseInt(amount));

  const fundTransfer = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem('token');

      const fundData = {
        senderAccountNumber: userDetails.accountNumber,
        receiverAccountNumber: beneObj.accountNumber,
        transferAmount: parseFloat(amount),
        bankName: beneObj.beneficiaryBankName,
        purpose: selected
      };

      if (bearerToken) {
        const response = await axios.post(`${API_BASE_URL}/v1/customer/fund/fundTransfer`, fundData, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        });

        const dto = response.data;

        if (dto && dto.success && dto.data) {
          Alert.alert('Success', 'Fund has been transfered successfully');

          setTimeout(() => {
            navigation.navigate('Home');
          }, 1000);
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
    } catch (error) {
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
                {userDetails.firstName + " " + userDetails.lastName}
              </Text>
              <Text className="text-sm leading-snug text-neutral-500">
                {userDetails.accountNumber}
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
                <Text className="text-gray-800 font-semibold">{beneObj.beneficiaryName}</Text>
              </View>
              <View className="my-2">
                <View className="border-t border-gray-300" />
              </View>
            </View>

            {/* Bank Name Section */}
            <View className="flex flex-col w-full mb-4">
              <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-neutral-500">Bank Name</Text>
                <Text className="text-gray-800 font-semibold">{beneObj.beneficiaryBankName}</Text>
              </View>
              <View className="my-2">
                <View className="border-t border-gray-300" />
              </View>
            </View>

            {/* Nick Name Section */}
            <View className="flex flex-col w-full">
              <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-neutral-500">Alias</Text>
                <Text className="text-gray-800 font-semibold">{beneObj.beneficiaryAlias}</Text>
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
                <Text className="text-gray-800 font-semibold">Rs. {amount}</Text>
              </View>
              <View className="my-2">
                <View className="border-t border-gray-300" />
              </View>
            </View>

            <View className="flex flex-col w-full mb-4">
              <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-neutral-500">Bank Charges</Text>
                <Text className="text-gray-800 font-semibold">Rs. {bankCharges}</Text>
              </View>
              <View className="my-2">
                <View className="border-t border-gray-300" />
              </View>
            </View>

            <View className="flex flex-col w-full">
              <View className="flex flex-row items-center justify-between w-full">
                <Text className="text-black">Total Amount</Text>
                <Text className="text-black font-semibold">Rs. {totalAmount}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="p-5">
          <CustomButton
            text={"Pay Now"}
            onPress={fundTransfer}
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
    elevation: 30,
    borderColor: Color.PrimaryWebOrient,
  },
});

export default PayNow;
