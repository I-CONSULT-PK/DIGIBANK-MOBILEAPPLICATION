import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import LoaderComponent from "../../components/LoaderComponent";
import CustomButton from "../../components/Button";
import { Color } from "../../GlobalStyles";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
import Input from "../../components/TextInput";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import API_BASE_URL from "../../config";

import Button from "../../components/Button";

const OTP = ({ navigation, route }) => {
  // const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedMobileNumber, setSavedMobileNumber] = useState("");
  const otpInputs = useRef([]);

  // ---------------------------------------------------

  const {
    source,
    email,
    mobileNumber,
    cnic,
    accountNumber,
    firstName,
    lastName,
  } = route.params || {};

  const otpLength = 4;
  const inputs = useRef([]);

  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [loading, setLoading] = useState(false);

  const handleChange = (text, index) => {
    const sanitizedText = text.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = sanitizedText;

    setOtp(newOtp);

    if (sanitizedText.length === 1 && index < otpLength - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const maskEmail = (email, visibleChars = 3) => {
    if (!email || !email.includes("@")) return email;

    const [localPart, domain] = email.split("@");
    const maskedLength = Math.max(0, localPart.length - visibleChars);
    const maskedLocalPart = `${localPart.slice(0, visibleChars)}${"*".repeat(
      maskedLength
    )}`;

    return `${maskedLocalPart}@${domain}`;
  };

  const verifyOTP = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length > 0) {
      setLoading(true);

      const otpDeliveryMethod = await AsyncStorage.getItem("otpDeliveryMethod");

      const otpData = {
        mobileNumber: mobileNumber,
        email: email,
        emailOtp: enteredOtp,
        deliveryPreference: otpDeliveryMethod ? otpDeliveryMethod : "EMAIL",
      };

      console.log(otpData)

      try {
        const response = await axios.post(
          `${API_BASE_URL}/v1/otp/verifyOTP`,
          otpData
        );
        const dto = response.data;

        if (dto && dto.success) {
          source === "username" && navigation.navigate("Login");
          source === "password" &&
            navigation.navigate("NewPassword", {
              cnic: cnic,
              accountNumber: accountNumber,
            });
          source === "registration" &&
            navigation.navigate("SignUp", {
              source: "OTP",
              email: email,
              mobileNumber: mobileNumber,
              cnic: cnic,
              accountNumber: accountNumber,
              firstName: firstName,
              lastName: lastName,
            });
        } else {
          if (dto.message) {
            Alert.alert("Error", dto.message);
          } else if (dto.errors && dto.errors.length > 0) {
            Alert.alert("Error", dto.error);
          }
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 404) {
            Alert.alert("Error", "Server timed out. Try again later!");
          } else if (statusCode === 503) {
            Alert.alert(
              "Error",
              "Service unavailable. Please try again later."
            );
          } else if (statusCode === 400) {
            Alert.alert("Error", error.response.data.data.errors[0]);
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
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResend = async (email, mobileNumber) => {
    setIsResendDisabled(true);

    try {
      const otpDeliveryMethod = await AsyncStorage.getItem("otpDeliveryMethod");

      const otpData = {
        mobileNumber: mobileNumber,
        email: email,
        reason: "verify mobile device",
        deliveryPreference: otpDeliveryMethod ? otpDeliveryMethod : "EMAIL",
      };

      const response = await axios.post(
        `${API_BASE_URL}/v1/otp/createOTP`,
        otpData
      );
      const dto = response.data;

      if (!dto.success) {
        if (dto.message) {
          Alert.alert("Error", dto.message);
        } else if (dto.errors && dto.errors.length > 0) {
          Alert.alert("Error", dto.error);
        }
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
        Alert.alert(
          "Error",
          "No response from the server. Please check your connection."
        );
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsResendDisabled(false);
    }
  };

  return (
    <SafeAreaView className="h-full flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-row items-center p-4 mt-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-black font-semibold text-lg ml-4 font-InterSemiBold">
            OTP
          </Text>
        </View>

        <View className="flex-1 mt-4 px-4 justify-center -top-14">
          <View className="bg-white rounded-xl w-full shadow-xl shadow-slate-500 px-5 pt-5 pb-4">
            <View className="mb-5">
              <Text className="text-sm mb-5 font-InterMedium">
                Enter Your OTP*
              </Text>

              <View className="flex-row justify-around items-center">
                {Array.from({ length: otpLength }).map((_, index) => (
                  <TextInput
                    key={index}
                    ref={(input) => (inputs.current[index] = input)}
                    className="w-12 h-12 text-center text-lg bg-[#F4F5F9] border border-gray-300 rounded-md font-InterSemiBold"
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={(text) => handleChange(text, index)}
                    returnKeyType={index === otpLength - 1 ? "done" : "next"}
                  />
                ))}
              </View>
            </View>

            <View className="px-2 mb-7">
              <Text
                className="text-sm font-InterMedium"
                style={{ color: Color.PrimaryWebOrientTxtColor }}
              >
                We have sent a code to{" "}
                <Text className="text-slate-500">
                  ({maskEmail(email) || "******@mail.com"})
                </Text>{" "}
                Enter code here to verify your identity
              </Text>
            </View>

            <Button
              text="Verify"
              width="w-[100%]"
              styles="mb-4 py-4"
              onPress={verifyOTP}
              // onPress={() => source === 'registration' && navigation.navigate('SignUp', { source: 'OTP'})}
              loading={loading}
            />

            <View className="mt-1 mb-2 flex-row justify-center items-center">
              <Text className="font-InterMedium text-gray-400">
                Didn't receive a code?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => handleResend(email, mobileNumber)}
                disabled={isResendDisabled}
              >
                <Text
                  className="font-InterSemiBold"
                  style={{ color: Color.PrimaryWebOrientTxtColor }}
                >
                  RESEND
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#ffffff" style="dark" />
    </SafeAreaView>
  );
};

export default OTP;
