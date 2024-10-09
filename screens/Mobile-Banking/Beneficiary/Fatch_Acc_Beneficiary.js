import React, { useState, useContext, useRef } from "react";
import { Text, View, Image, Keyboard, Alert, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { encrypt } from "../../../utils/crypto";
import { AppLoaderContext } from "../../../components/LoaderHOC";
import API_BASE_URL from "../../../config";
import TextInput from '../../../components/TextInput';
import Button from "../../../components/Button";
import Footer from "../../../components/Footer";

const Fatch_Acc_Beneficiary = ({ route, navigation }) => {
  const { showLoader, hideLoader } = useContext(AppLoaderContext);
  const { details, bankName, bankLogo } = route.params || {};
  const scrollRef = useRef();

  const [nickname, setNickname] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const createBeneficiary = async () => {
    if (!nickname) {
      Alert.alert("Error", "Nickname is required");
    } else {
      setLoading(true);
      showLoader();
      try {
        const bearerToken = await AsyncStorage.getItem("token");
        const customerId = await AsyncStorage.getItem("customerId");
        const accountNumber = await AsyncStorage.getItem("accountNumber");

        if (bearerToken) {
          const payload = {
            beneficiaryAlias: nickname,
            beneficiaryName: details.accountTitle,
            accountNumber: encrypt(details.accountNumber),
            beneficiaryBankName: details.bankName || bankName,
            mobileNumber: mobileNumber || "",
            categoryType: "Individual",
            customerId: customerId,
            bankUrl: encrypt(bankLogo),
            bankCode: details.branchCode || "0000",
            ownAccount: encrypt(accountNumber)
          };

          const dto = await axios.post(
            `${API_BASE_URL}/v1/beneficiary/createBeneficiary`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );

          if (dto && dto.data.success && dto.data) {
            navigation.navigate("BeneficiarySuccess", { beneficiaryName: details.accountTitle, bankLogo });
          } else {
            if (dto.data.message) {
              Alert.alert("Error", dto.data.message);
            } else if (dto.errors && dto.errors.length > 0) {
              Alert.alert("Error", dto.errors);
            }
          }
        } else {
          Alert.alert("Error", "Unexpected error occurred. Try again later!");
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 404) {
            Alert.alert("Error", "Server timed out. Try again later!");
          } else if (statusCode === 503) {
            Alert.alert("Error", "Service unavailable. Please try again later.");
          } else if (statusCode === 400) {
            Alert.alert("Error", error.response.data.data.errors[0]);
          } else {
            Alert.alert("Error", error.message);
          }
        } else if (error.request) {
          Alert.alert("Error", "No response from the server. Please check your connection.");
        } else {
          Alert.alert("Error", error.message);
        }
      } finally {
        setLoading(false);
        hideLoader();
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }, [])
  );

  return (
    <SafeAreaView className="h-full flex-1 bg-[#F9FAFC]">
      <View style={{ height: 100 }}>
        <View className="flex-row items-center justify-center w-full h-full">
          <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-5">
            <Entypo name="chevron-left" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-black text-lg font-InterBold">Add Beneficiary</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef}>
        <View className="w-full h-full px-5">
          <Text className="font-InterSemiBold">From Account</Text>

          <View className="bg-white p-3 rounded-lg shadow-md shadow-slate-400 w-full mt-3">
            <View className="d-flex flex-row items-center">
              <Image
                source={{ uri: bankLogo }}
                className=" w-12 h-12 rounded-lg"
                resizeMode='contain'
              />
              <Text className="font-InterSemiBold ml-4">
                {bankName}
              </Text>
            </View>
          </View>

          <View className="mt-6">
            <Text className="font-InterSemiBold">Beneficiary Details</Text>

            <View className="w-full bg-white rounded-lg py-5 px-5 mt-3 shadow-md shadow-slate-400">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-InterRegular text-gray-500">Account Title</Text>
                <Text className="text-sm font-InterSemiBold">{details.accountTitle}</Text>
              </View>

              <View className="my-2.5">
                <View className="border-t border-gray-300" />
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-InterRegular text-gray-500">Bank Name</Text>
                <Text className="text-sm font-InterSemiBold">{details.bankName || bankName}</Text>
              </View>
            </View>
          </View>

          <View className="mt-6">
            <Text className="font-InterSemiBold">Nick Name</Text>
            <TextInput
              className="mt-3 border border-gray-300 rounded-lg font-InterMedium"
              placeholder="Enter your name here"
              placeholderTextColor="#A5A7A8"
              value={nickname}
              onChange={(text) => setNickname(text)}
              onSubmitEditing={Keyboard.dismiss} />
          </View>

          <View className="mt-6">
            <Text className="font-InterSemiBold">Mobile Number (optional)</Text>
            <TextInput
              className="mt-3 border border-gray-300 rounded-lg text-base font-InterMedium"
              placeholder="Enter your mobile number"
              placeholderTextColor="#A5A7A8"
              value={mobileNumber}
              onChange={(text) => setMobileNumber(text)}
              onSubmitEditing={Keyboard.dismiss} />
          </View>

          <Button
            text="Add"
            styles="mt-8 mb-4"
            onPress={createBeneficiary}
            loading={loading}
          />
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor="#F9FAFC" style="dark" />
    </SafeAreaView>
  );
};

export default Fatch_Acc_Beneficiary;
