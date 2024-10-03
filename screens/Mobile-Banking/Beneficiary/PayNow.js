import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import API_BASE_URL from '../../../config';
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";

const PayNow = ({ route, navigation }) => {
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
          navigation.navigate('TransferSuccess', { amount: dto.data.data.trans_amount, beneObj, currency: dto.data.data.ccy, dateTime: dto.data.data.localDateTime, ref: dto.data.data.paymentReference, bankCharges });
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

  const IBFT = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem('token');

      const fundData = {
        bankCode: beneObj.bankCode,
        fromAccountNumber: userDetails.accountNumber,
        toAccountNumber: beneObj.accountNumber,
        amount: parseFloat(amount),
        purpose: selected
      };

      if (bearerToken) {
        const response = await axios.post(`${API_BASE_URL}/v1/customer/fund/interBankFundsTransfer`, fundData, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        });

        const dto = response.data;

        if (dto && dto.success && dto.data) {
          navigation.navigate('TransferSuccess', { amount: dto.data.data.amount, beneObj, currency: "PKR", dateTime: dto.data.data.transactionDate, ref: dto.data.data.transactionId, bankCharges });
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
    <SafeAreaView className="h-full flex-1 bg-[#F9FAFC]">
      <View style={{ height: 90 }}>
        <View className="flex-row items-center justify-center w-full h-full">
          <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-5">
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

          <View className="mt-6">
            <Text className="font-InterSemiBold">To Account</Text>

            <View className="w-full bg-white rounded-lg py-5 px-5 mt-3 shadow-md shadow-slate-400">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-InterRegular text-gray-500">Account Title</Text>
                <Text className="text-sm font-InterSemiBold">{beneObj.beneficiaryName}</Text>
              </View>

              <View className="my-2.5">
                <View className="border-t border-gray-300" />
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-InterRegular text-gray-500">Bank Name</Text>
                <Text className="text-sm font-InterSemiBold">{beneObj.beneficiaryBankName}</Text>
              </View>

              <View className="my-2.5">
                <View className="border-t border-gray-300" />
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-InterRegular text-gray-500">Nick Name</Text>
                <Text className="text-sm font-InterSemiBold">{beneObj.beneficiaryAlias}</Text>
              </View>
            </View>
          </View>

          <View className="mt-6">
            <Text className="font-InterSemiBold">Transfer Details</Text>

            <View className="w-full bg-white rounded-lg py-5 px-5 mt-3 shadow-md shadow-slate-400">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-InterRegular text-gray-500">Amount</Text>
                <Text className="text-sm font-InterSemiBold">Rs. {amount}</Text>
              </View>

              <View className="my-2.5">
                <View className="border-t border-gray-300" />
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-InterRegular text-gray-500">Bank Charges</Text>
                <Text className="text-sm font-InterSemiBold">Rs. {bankCharges}</Text>
              </View>

              <View className="my-2.5">
                <View className="border-t border-gray-300" />
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-InterRegular text-gray-500">Total Amount</Text>
                <Text className="text-sm font-InterSemiBold">Rs. {totalAmount}</Text>
              </View>
            </View>
          </View>

          <Button
            text="Pay Now"
            onPress={() => userDetails.bankName === beneObj.beneficiaryBankName ? fundTransfer() : IBFT()}
            styles="mt-10 mb-4"
          />
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor="#F9FAFC" style="dark" />
    </SafeAreaView>
  );
};

export default PayNow;
