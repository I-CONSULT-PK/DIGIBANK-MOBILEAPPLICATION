import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../../../components/Button";
import { Divider } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../../../components/Footer";

const OTP_Preference = () => {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState("sms");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const mobile = await AsyncStorage.getItem("mobileNumber");
      const userEmail = await AsyncStorage.getItem("email");
      const method = await AsyncStorage.getItem("otpDeliveryMethod");

      setMobileNumber(mobile || "");
      setEmail(userEmail || "");
      setSelectedMethod(method || "sms"); // Default to "sms" if nothing is stored
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      // Save selected method locally
      await AsyncStorage.setItem("otpDeliveryMethod", selectedMethod);
      Alert.alert("Success", "Setting saved successfully!");

      setTimeout(() => {
        navigation.navigate("Home");
      }, 2000);
    } catch (error) {
      console.error("Error saving delivery method:", error);
      Alert.alert("Error", "Failed to save delivery method. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between">
        <ScrollView className="flex-grow">
          <View className="flex-row items-center justify-between p-3 bg-white">
            <TouchableOpacity
              onPress={() => navigation.navigate("Account_Setting_List")}
              style={{ zIndex: 1 }}
            >
              <Entypo name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
            <View className="absolute left-0 right-0 flex-row justify-center">
              <Text className="text-lg font-bold text-center">
                OTP Preference
              </Text>
            </View>
          </View>
          <View className="mt-4 px-4">
            <View className="bg-white rounded-xl w-full shadow-xl shadow-slate-300 px-5 pt-6 pb-4">
              <Text className="text-lg font-semibold">Select a method</Text>
              <Text className="text-gray-500 mb-4">
                Pick a method to receive your OTP.
              </Text>

              <TouchableWithoutFeedback
                onPress={() => setSelectedMethod("sms")}
              >
                <View className="flex-row items-center mb-2">
                  <Image
                    source={require("../../../assets/sms.png")}
                    resizeMode="contain"
                    className="w-10 h-10"
                  />
                  <Text className="ml-4 text-base font-medium">
                    Get your OTP through SMS
                  </Text>
                  <Checkbox
                    value={selectedMethod === "sms"}
                    onValueChange={() => setSelectedMethod("sms")}
                    color={selectedMethod === "sms" ? "#1DBBD8" : undefined}
                    style={{ marginLeft: "auto" }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <Divider />
              <TouchableWithoutFeedback
                onPress={() => setSelectedMethod("email")}
              >
                <View className="flex-row items-center mt-2 mb-2">
                  <Image
                    source={require("../../../assets/mail.png")}
                    resizeMode="contain"
                    className="w-10 h-10"
                  />
                  <Text className="ml-4 text-base font-medium">
                    Get your OTP through email
                  </Text>
                  <Checkbox
                    value={selectedMethod === "email"}
                    onValueChange={() => setSelectedMethod("email")}
                    color={selectedMethod === "email" ? "#1DBBD8" : undefined}
                    style={{ marginLeft: "auto" }}
                  />
                </View>
              </TouchableWithoutFeedback>

              <Divider />

              <TouchableWithoutFeedback
                onPress={() => setSelectedMethod("both")}
              >
                <View className="flex-row items-center mt-2">
                  <View className="flex-row w-[80%]">
                    <Image
                      source={require("../../../assets/both_OTP.png")}
                      resizeMode="contain"
                      className="w-10 h-10"
                    />
                    <Text className="ml-4 text-base font-medium">
                      Receive your OTP through both text message or email
                    </Text>
                  </View>
                  <Checkbox
                    value={selectedMethod === "both"}
                    onValueChange={() => setSelectedMethod("both")}
                    color={selectedMethod === "both" ? "#1DBBD8" : undefined}
                    style={{ marginLeft: "auto" }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
        <View className="p-4">
          <Button
            text="Save"
            width="w-[100%]"
            styles="py-4"
            onPress={handleSave}
          />
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default OTP_Preference;
