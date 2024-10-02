import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
import Footer from "../../../components/Footer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../../config";
import { StatusBar } from "expo-status-bar";

const Add_Account = () => {
  const navigation = useNavigation();
  const [accountNumber, setAccountNumber] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [accountType, setAccountType] = useState("");
  const [ibanCode, setIbanCode] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setAccountNumber("");
      setAccountTitle("");
      setAccountType("");
      setIbanCode("");
      setIsFetched(false);
    }, [])
  );

  const handleFetchTitle = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        const customerId = await AsyncStorage.getItem("customerId");

        if (!token || !customerId) {
            Alert.alert("Error", "Missing account information. Please log in again.");
            return;
        }

        const url = `${API_BASE_URL}/v1/account/getAccount?customerId=${customerId}&accountNumber=${accountNumber}`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            const data = response.data.data;
            if (data) {
                setAccountTitle(data.accountTitle || "N/A");
                setAccountType(data.accountType || "N/A");
                setIbanCode(data.ibanCode || "N/A");
                setIsFetched(true); 
            } else {
                Alert.alert("Error", response.data.message);
            }
        } else {
            Alert.alert("Error", `Unexpected response: ${response.status}`);
        }
    } catch (error) {
        setIsFetched(false); 
        if (error.response) {
            const serverMessage = error.response.data.message || "An unexpected error occurred.";
            Alert.alert("Error", serverMessage);
        } else {
            Alert.alert("Error", error.message || "An unexpected error occurred.");
        }
    }
};


const handleAddAccount = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const customerId = await AsyncStorage.getItem("customerId");

    if (!token || !customerId) {
      Alert.alert("Error", "Missing account information. Please log in again.");
      return;
    }

    const url = `${API_BASE_URL}/v1/account/addAccount`;

    const accountData = {
      customer: {
        id: customerId, 
      },
      accountNumber: accountNumber,
      accountTitle: accountTitle,
      accountType: accountType,
      ibanCode: ibanCode,
    };

    const response = await axios.post(url, accountData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      Alert.alert("Success", "Account added successfully!");
      navigation.navigate("Account");
    } else {
      Alert.alert("Error", `Unexpected response: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      const serverMessage = error.response.data.message || "An unexpected error occurred.";
      Alert.alert("Error", serverMessage);
    } else {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    }
  }
};



  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <View
          className="h-24"
          style={{ backgroundColor: Color.PrimaryWebOrient }}
        >
          <View className="flex-row items-center justify-center h-full">
            <TouchableOpacity
              onPress={() => navigation.navigate("Account_Setting_List")}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Add Account</Text>
          </View>
        </View>
        <View className="flex-1 p-4">
          <View className="bg-white p-3 rounded-lg shadow-lg w-full">
            <View className="px-4">
              {!isFetched && (
                <Text className="text-lg font-semibold">Link Account</Text>
              )}

              {!isFetched && (
                <TextInput
                  placeholder="Account No..."
                  value={accountNumber}
                  onChange={setAccountNumber}
                  keyboardType="default"
                />
              )}
              {!isFetched && (
                <View className="mt-6">
                  <CustomButton text="Fetch Title" onPress={handleFetchTitle} />
                </View>
              )}
              {isFetched && (
                <View className="p-4 bg-white">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-gray-500">Account Title</Text>
                    <Text className="text-sm font-medium">{accountTitle}</Text>
                  </View>
                  <View className="my-2 border-t border-gray-300" />
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-gray-500">
                      Account Number
                    </Text>
                    <Text className="text-sm font-medium">{accountNumber}</Text>
                  </View>
                  <View className="my-2 border-t border-gray-300" />
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-gray-500">Account Type</Text>
                    <Text className="text-sm font-medium">{accountType}</Text>
                  </View>
                  <View className="my-2 border-t border-gray-300" />
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-gray-500">Iban Number</Text>
                    <Text className="text-sm font-medium">{ibanCode}</Text>
                  </View>
                  <View className="mt-6">
                    <CustomButton
                      text="Add Account"
                      onPress={handleAddAccount}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      <Footer />
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />

    </SafeAreaView>
  );
};

export default Add_Account;
