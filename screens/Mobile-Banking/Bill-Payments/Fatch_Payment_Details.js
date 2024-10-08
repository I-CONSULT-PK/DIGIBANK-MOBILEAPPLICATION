import React, { useState } from "react";
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from "../../../config";

const Fatch_Payment_Details = ({ route }) => {
  const navigation = useNavigation();
  const { serviceCode, name, image, utilityType, } = route.params || {};

  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;

  const [Consumer, setConsumer] = useState([]);

  const convertDriveUrl = (url) => {
    const fileId = url.match(/d\/(.*?)\//)[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };

  const fetchConsumer = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const accountNumber = await AsyncStorage.getItem("accountNumber");
  
      if (bearerToken && accountNumber) {
        const response = await axios.get(
          `${API_BASE_URL}/v1/billpayment/getBillDetails?consumerNumber=${Consumer}&serviceCode=${serviceCode}&utilityType=${utilityType}`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
  
        const dto = response.data;
  
        if (dto && dto.success && dto.data && dto.data.bill) {
          const { amount, amountDueAfterDueDate, dueDate } = dto.data.bill; // Extracting values from bill
          const billerName = dto.data.billerName;
          const id = dto.data.bill.id;
  
          // Convert dueDate to a Date object
          const dueDateObj = new Date(dueDate);
  
          // Get the current date
          const currentDate = new Date();
  
          // Determine the correct amount to use
          const paymentAmount =
            currentDate > dueDateObj ? amountDueAfterDueDate : amount;
  
          // Navigate to the next screen with the correct amount
          navigation.navigate("Set_Payment", {
            serviceCode,
            id,
            name,
            image,
            amount: paymentAmount, 
            billerName,
            Consumer,
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
            <Text className="text-white text-lg font-bold">
              Add Bill Payment
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1  p-4">
          {/* Upper Section */}
          <View className="shadow-gray-100">
            <View className="bg-white p-3 rounded-lg shadow-lg w-full">
              <View className="flex flex-row items-center">
                <Image  
                  source={{ uri: convertDriveUrl(image) }}
                  className="mr-1 w-12 h-12"
                  resizeMode="contain"
                />
                <View>
                  <Text className="text-base font-semibold ml-3">{name}</Text>
                  <Text className="text-sm text-gray-300 ml-3 mt-1">
                   {serviceCode}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Section */}
          <View className="mt-6">
            <Text className="text-lg font-semibold">Enter Consumer Number</Text>
            <TextInput
              className="mt-2 border border-gray-200 rounded-lg p-2"
              placeholder="Account number/IBAN"
              value={Consumer}
              onChange={(text) => setConsumer(text) }
            />
          </View>

          <View className=" mt-6">
            <CustomButton text={"Next"}
            onPress={() => {
              fetchConsumer();
            }}/>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default Fatch_Payment_Details;
