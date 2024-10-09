import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Color } from "../../../GlobalStyles";
import CustomButton from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import API_BASE_URL from "../../../config";
import * as Device from "expo-device";
import * as Application from "expo-application";
import { StatusBar } from "expo-status-bar";

const ManageLoginPin = () => {
  const navigation = useNavigation();
  const [customerId, setCustomerId] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [reenterPinCode, setReenterPinCode] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        const storedCustomerId = await AsyncStorage.getItem("customerId");
        setCustomerId(storedCustomerId || "");
      };

      fetchUserData();
    }, [])
  );

  const isSequential = (pin) => {
    return (
      pin === "1234" ||
      pin === "2345" ||
      pin === "3456" ||
      pin === "4567" ||
      pin === "5678" ||
      pin === "6789" ||
      pin === "0123" ||
      pin === "3210"
    );
  };

  const handleActivatePin = async () => {
    // Validate PIN length and content
    if (pinCode.length !== 4 || isNaN(pinCode)) {
      Alert.alert("Error", "PIN must be exactly 4 digits.");
      return;
    }

    if (isSequential(pinCode)) {
      Alert.alert("Error", "PIN cannot be a sequential number (e.g., 1234).");
      return;
    }

    if (pinCode !== reenterPinCode) {
      Alert.alert("Error", "PIN codes do not match.");
      return;
    }

    // Gather device information
    const deviceName = Device.deviceName || "Unknown Device";
    const deviceType =
      Device.deviceType === Device.DeviceType.PHONE ? "PHONE" : "OTHER";
    const unique =
      Platform.OS === "android"
        ? await Application.getAndroidId()
        : await Application.getIosIdForVendorAsync();
    const osv_osn = `${Device.osName}-${Device.osVersion}`;
    const modelName = Device.modelName || "Unknown Model";
    const manufacture = Device.manufacturer || "Unknown Manufacturer";

    const payload = {
      deviceName,
      deviceType,
      unique,
      osv_osn,
      modelName,
      manufacture,
      devicePin: pinCode,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/devices/deviceRegister/${customerId}`,
        payload
      );

      if (response.data && response.data.success) {
        setPinCode("");
        setReenterPinCode("");

        Alert.alert("Success", "PIN updated successfully", [
          {
            text: "OK",
            onPress: () => {
              setTimeout(() => {
                navigation.navigate("Home");
              }, 1000);
            },
          },
        ]);
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const handlePinCodeChange = (text) => {
    // Allow only numbers and limit to 4 characters
    const sanitizedText = text.replace(/[^0-9]/g, "").slice(0, 4);
    setPinCode(sanitizedText);
  };

  const handleReenterPinCodeChange = (text) => {
    // Allow only numbers and limit to 4 characters
    const sanitizedText = text.replace(/[^0-9]/g, "").slice(0, 4);
    setReenterPinCode(sanitizedText);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFC]">
      <View className="flex-1 justify-between">
        <ScrollView className="flex-grow">
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
              <Text className="text-white text-lg font-bold">
                Create Login PIN
              </Text>
            </View>
          </View>
          <Text className="text-xl font-bold p-5">Create Login PIN</Text>
          <Text className="text-gray-500 px-5 mb-0 mt-0">
            You can now set your login pin. Terms and conditions apply!{"\n"}
            <Text className="text-gray-500 px-5">
              {"\n"}Criteria: Login pin should be numeric, only 4 digits &
              cannot be sequence e.g (1234)
            </Text>
          </Text>
          <View className="mt-4 px-4">
            <View className="bg-white rounded-xl w-full shadow-lg p-6">
              <Text className="text-gray-500 mb-3">Enter PIN Code</Text>
              <TextInput
                placeholder="Enter PIN Code"
                value={pinCode}
                onChange={handlePinCodeChange}
                keyboardType="numeric"
                maxLength={4}
                editable={true}
                onFocus={() => {}}
                onBlur={() => {}}
              />
              <Text className="text-gray-500 mt-5">Re-enter PIN Code</Text>
              <TextInput
                placeholder="Re-enter PIN Code"
                value={reenterPinCode}
                onChange={handleReenterPinCodeChange}
                keyboardType="numeric"
                maxLength={4}
                editable={true}
                onFocus={() => {}}
                onBlur={() => {}}
              />
            </View>
          </View>

          <View className="p-5">
            <CustomButton text="Confirm" onPress={handleActivatePin} />
          </View>
        </ScrollView>
      </View>
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default ManageLoginPin;
