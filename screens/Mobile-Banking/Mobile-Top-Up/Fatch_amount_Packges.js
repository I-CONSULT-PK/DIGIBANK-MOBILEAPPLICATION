import React, { useState } from "react";
import {
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
import Footer from "../../../components/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from "../../../config";

const Fatch_amount_Packges = ({ route }) => {
  const navigation = useNavigation();
  const { networkName, number, price, fromPackage, id } = route.params || {};
  const [amount, setAmount] = useState(price ? price.toString() : "");
  const [number1, setNumber1] = useState("");

  const handleAmountChange = (text) => {
    if (!isNaN(text) && !fromPackage) {
      setAmount(text);
    }
  };

  const subscribePackage = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const accountNumber = await AsyncStorage.getItem("accountNumber");
      const trimmedNumber = number1.trim(); // Trim whitespace

      // console.log("Account Number:", accountNumber);
      // console.log("Mobile Number:", trimmedNumber);
      // console.log("amount:", amount);

      if (bearerToken && accountNumber) {
        const response = await axios.post(
          `${API_BASE_URL}/v1/topup/packageTransaction?packageId=${id}&accountNumber=${accountNumber}&mobileNumber=${trimmedNumber}`,

          {},
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        console.log("API Response:", response.data);

        const dto = response.data;
        if (dto && dto.success && dto.data) {
          navigation.navigate("Packges_Transfer", { dto });
        } else {
          Alert.alert("Error", dto.message || "An unexpected error occurred.");
        }
      } else {
        Alert.alert("Error", "Unexpected error occurred. Try again later!");
      }
    } catch (error) {
      console.log("Error Object:", error);
      // Existing error handling...
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100} // Adjust based on your header height
      >
        <View className="flex-1 bg-white">
          {/* Header */}
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
              <Text className="text-white text-lg font-bold">
                Mobile Top up
              </Text>
            </View>
          </View>

          {/* Content */}
          <View className="flex-1 p-4">
            {/* Package Amount Input */}
            <View className="mt-6">
              <Text className="text-lg font-semibold">Package Amount</Text>
              <TextInput
                className="mt-2 border border-gray-200 rounded-lg p-2"
                placeholder="Amount.."
                value={amount}
                onChange={handleAmountChange} // Corrected to onChangeText
                onSubmitEditing={Keyboard.dismiss}
                editable={!fromPackage}
              />
            </View>

            {/* Mobile Number Input */}

            <View className="mt-6">
              <Text className="text-lg font-semibold">Enter Mobile No</Text>
              <TextInput
                className="mt-2 border border-gray-200 rounded-lg p-2"
                placeholder="Enter Number.. "
                value={number} // set value for the number field
                onChange={(text) => setNumber1(text)} // handle number changes
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>

            {/* Pay Now Button */}
            <View className="mt-6">
              <CustomButton
                text="Pay Now"
                onPress={() => {
                  subscribePackage();
                }}
              />
            </View>
          </View>

          {/* Footer */}
          <Footer />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Fatch_amount_Packges;
