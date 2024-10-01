import React, { useState } from "react";
import {
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
import Footer from "../../../components/Footer";
import Packages from "./Packages";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../../config";
const Fatch_Details = ({ route }) => {
  const navigation = useNavigation();
  const { networkLogo, networkName, number, price } = route.params || {};
  const [amount, setAmount] = useState(price ? price.toString() : "");
   const [number1, setNumber1] = useState(null);
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;

  const handleAmountChange = (text) => {
    // Optional validation to only allow numeric input
    if (!isNaN(text)) {
      setAmount(text); // set amount only if it's a valid number
    }
  };
  const formatActionDate = (dateString) => {
    const date = new Date(dateString);

    // Get day, month, year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Determine AM or PM suffix
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${day}:${month}:${year} - ${hours}:${minutes} ${ampm}`;
  };

  const sendAmount = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const accountNumber = await AsyncStorage.getItem("accountNumber");

      if (bearerToken && accountNumber) {
        const response = await axios.post(
          `${API_BASE_URL}/v1/topup/topUp?phoneNumber=${number}&carrier=${networkName}&amount=${amount}&plan=PREPAID&accountNumber=${accountNumber}`,
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
          const actionDate = formatActionDate(dto.data.data.transactionDate);

          navigation.navigate("To_Up_Transfer", {
            networkName,
            networkLogo,
            number,
            amount,
            actionDate,
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
            <Text className="text-white text-lg font-bold">Mobile Top up</Text>
          </View>
        </View>
        <View className="flex-1  p-4">
          {/* Upper Section */}
          <View className="shadow-gray-100">
            <View className="bg-white p-3 rounded-lg shadow-lg w-full">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: networkLogo }}
                  className="mr-1 w-12 h-12"
                  resizeMode="contain"
                />

                {/* Main container with text and icon */}
                <View className="flex-1 flex-row justify-between items-center">
                  <View>
                    <Text className="text-base font-semibold ml-3">
                      {networkName}
                    </Text>
                    <Text className="text-sm text-gray-300 ml-3 mt-1">
                      {number}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Section */}
          <View className="mt-6">
            <Text className="text-lg font-semibold">Package Amount</Text>
            <TextInput
              className="mt-2 border border-gray-200 rounded-lg p-2"
              placeholder="Amount.."
              value={amount} // already a string from state
              onChange={handleAmountChange} // update state on typing
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          {/* {amount && (
            <View className="mt-6">
              <Text className="text-lg font-semibold">Enter Mobile No</Text>
              <TextInput
                className="mt-2 border border-gray-200 rounded-lg p-2"
                placeholder="Enter Number.. "
                value={number1} 
                onChangeText={(text) => setNumber1(text)} 
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
          )} */}


          <View className="mt-6">
            <CustomButton text={"Pay Now"} onPress={sendAmount} />
          </View>
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default Fatch_Details;
