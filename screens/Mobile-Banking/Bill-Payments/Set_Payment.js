import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from "../../../config";

const Set_Payment = ({ route }) => {
  const navigation = useNavigation();
  const { id, name, image, utilityType, billerName, Consumer, amount } =
    route.params || {};

  // Initialize the state with the amount received from the previous page
  const [inputAmount, setInputAmount] = useState(amount || "");
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;

  const convertDriveUrl = (url) => {
    const fileId = url.match(/d\/(.*?)\//)[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };

  const sendAmount = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const accountNumber = await AsyncStorage.getItem("accountNumber");
  
      if (bearerToken && accountNumber) {
        const response = await axios.post(
          `${API_BASE_URL}/v1/billPayment/payBill?billId=${id}&accountNumber=${accountNumber}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
  
        const dto = response.data;
  
        // Check if the response contains an array of networks
        if (dto && dto.success && dto.data) {
          const { date, referenceNumber, processedAmount } = dto.data; // Extract date, reference number, and processed amount
          
          // Navigate to the next screen and pass the required data
          navigation.navigate("Bill_Payment_Transfer", {
            name,
            image,
            utilityType,
            billerName,
            Consumer,
            amount: processedAmount, // Pass processed amount to next screen
            date, // Pass date to next screen
            referenceNumber, // Pass reference number to next screen
          });
        } else {
          if (dto.message) {
            Alert.alert("Error", dto.message);
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
          Alert.alert("Error", error.response.data.errors[0]);
        } else {
          Alert.alert("Error", error.message);
        }
      } else if (error.request) {
        Alert.alert(
          "Error",
          "No response from the server. Please check your connection."
        );
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };
  

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        {/* Header Section */}
        <View
          className="h-24"
          style={{ backgroundColor: Color.PrimaryWebOrient }}
        >
          <View className="flex-row items-center justify-center h-full">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Enter Amount</Text>
          </View>
        </View>

        {/* From Account Section */}
        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold">From Account</Text>
        </View>

        {/* Main Content */}
        <View className="p-4 shadow-gray-300">
          {/* Account Details Section */}
          <View className="bg-white p-3 rounded-lg shadow-lg w-full">
            <View className="flex flex-row items-center">
              <Image
                source={{ uri: convertDriveUrl(image) }}
                className="mr-1 w-12 h-12"
                resizeMode="contain"
              />
              <View>
                <Text className="text-base font-semibold ml-3">{name}</Text>
                <Text className="text-sm text-gray-500 ml-3 mt-1">
                  {utilityType}{" "}
                  {/* Ensure utilityType is correctly displayed */}
                </Text>
              </View>
            </View>
          </View>

          {/* Consumer Details Section */}
          <View className="mt-4 shadow-gray-300">
            <View className="bg-white p-3 rounded-lg shadow-lg w-full">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-gray-500">Company</Text>
                <Text className="text-sm font-medium">{billerName}</Text>
              </View>
              <View className="my-2">
                <View className="border-t border-gray-300"></View>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-gray-500">Consumer Number</Text>
                <Text className="text-sm font-medium">{Consumer}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Section */}
        <View className="p-4">
          <Text className="text-lg font-semibold"> Amount</Text>
          <TextInput
            className="mt-2 border border-gray-200 rounded-lg p-2"
            placeholder={amount.toString()}
            value={amount} // Bind the state to the TextInput value
            onChangeText={setInputAmount} // Update state on text change
            disabled={true}
          />
          <Text className="text-sm">
            Enter an amount between Rs. 1 and Rs. 10,000
          </Text>
        </View>

        <View className="p-4 mt-6">
          <CustomButton
            text={"Pay Now"}
            onPress={() => {
              sendAmount();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Set_Payment;
