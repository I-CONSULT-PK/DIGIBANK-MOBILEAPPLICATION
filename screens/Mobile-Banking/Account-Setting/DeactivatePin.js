import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color } from "../../../GlobalStyles";
import CustomButton from "../../../components/Button";
import TextInput from "../../../components/TextInput";

const DeactivatePin = () => {
  const navigation = useNavigation();
  const [emailCode, setEmailCode] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedCustomerId = await AsyncStorage.getItem("customerId");
      setCustomerId(storedCustomerId || "");
    };

    fetchUserData();
  }, []);

  const handleSubmit = () => {
    if (emailCode.length !== 4 || smsCode.length !== 4) {
      Alert.alert("Error", "Please enter valid codes.");
      return;
    }

    Alert.alert("Success", "Codes submitted successfully!");
  };

  const handleResend = () => {
    // Simulate sending codes
    Alert.alert("Resend", "Codes have been resent to your email and phone.");

    // Disable the resend button for 30 seconds
    setIsResendDisabled(true);
    setTimeout(() => {
      setIsResendDisabled(false);
    }, 30000);
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
                De-Activate Login PIN
              </Text>
            </View>
          </View>
          <Text className="text-xl font-bold p-5">De-Activate Login PIN</Text>
          <Text className="text-gray-500 px-5 mb-0 mt-0">
            The first 4 characters of the authentication code have been sent to
            your email address.{"\n"}
            <Text className="text-gray-500 px-5">
              {"\n"}The second 4 characters of the code have been sent to your
              registered mobile number
            </Text>
          </Text>
          <View className="mt-4 px-4">
            <View className="bg-white rounded-xl w-full shadow-lg p-6">
              <Text className="text-gray-500 mb-3">Email Code</Text>
              <TextInput
                placeholder="Enter email code"
                value={emailCode}
                onChangeText={setEmailCode}
                keyboardType="default"
              />
              <Text className="text-gray-500 mt-5 mb-3">SMS Code</Text>
              <TextInput
                placeholder="Enter SMS Code"
                value={smsCode}
                onChangeText={setSmsCode}
                keyboardType="default"
              />
            </View>
          </View>
          <View className="mt-4 flex-row justify-center items-center">
            <Text className="font-InterMedium text-gray-400">
              Did not receive yet?{" "}
            </Text>
            <TouchableOpacity
              onPress={handleResend}
              disabled={isResendDisabled}
            >
              <Text
                className="font-InterSemiBold"
                style={{ color: Color.PrimaryWebOrientTxtColor }}
              >
                Resend OTAC
              </Text>
            </TouchableOpacity>
          </View>
          <View className="p-5">
            <CustomButton text="Confirm" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DeactivatePin;
