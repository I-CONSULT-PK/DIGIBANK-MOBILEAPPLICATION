import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions, BackHandler
} from "react-native";
import CustomButton from "./Button";
import { Color } from "../GlobalStyles";
import { Entypo, Feather } from "@expo/vector-icons";
import OTPverificationSvg from "../assets/Images/OTPVerification.svg";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const OTPverification = ({ navigation, route }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedMobileNumber, setSavedMobileNumber] = useState("");
  const [seconds, setSeconds] = useState(60);
  const otpInputs = useRef([]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value === "" && index > 0) {
      // Move forward
      otpInputs.current[index - 1].focus();
    } else if (value !== "" && index < otp.length - 1) {
      // Move backward
      otpInputs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    navigation.navigate("Domestic");
  };
  const handleBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const handleBackPress = () => {
      // Manually navigate to the back screen
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);
  return (
    <>
      <View
        className="h-16 w-max"
        style={{
          backgroundColor: Color.PrimaryWebOrient,
        }}
      >
        <View
          className="flex-row mt-6 "
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleBack}>
            <Entypo name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <View className="mr-2" style={{ alignItems: "flex-end" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
              <Entypo name="home" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex-1 bg-white" style={{ justifyContent: "center" }}>
        <View className="justify-center items-center">
          <View className="justify-center items-center">
            <OTPverificationSvg/>
          </View>
         
        </View>
        <View className="flex justify-center items-center p-4">
          <Text className="font-InterBold text-2xl">OTP Verification</Text>
          <Text className="font-semibold text-sm text-center">
            Please wait while we verify your device via One Time Password
          </Text>
          <Text className="font-semibold text-sm text-center">
            (OTP) sent on your email address
          </Text>
          <Text className="font-semibold text-sm text-center mt-10">
            If you do not receive OTP before the timer runs out,
          </Text>
          <TouchableOpacity>
            <Text
              className="font-semibold text-sm text-center"
              style={{
                color: Color.PrimaryWebOrientTxtColor,
              }}
            >
              Click Resend
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center mt-10">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (otpInputs.current[index] = ref)}
                className="border border-gray-300 rounded-xl  text-lg text-center mx-1.5"
                style={{
                  width: width * 0.13,
                  height: height * 0.07,
                  fontSize: 20,
                  borderRadius: 5,
                }}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(value) => handleOtpChange(index, value)}
              />
            ))}
          </View>
        </View>
        <View className="mt-3" style={{ alignItems: "center" }}>
          <Text
            className=" font-InterSemiBold text-sm"
            style={{
              textAlign: "center",
            }}
          >
            You will Receive code in
          </Text>
          <View
            className="w-32 h-14 mt-1 rounded-lg"
            style={{
              borderWidth: 1,
              borderColor: Color.PrimaryWebOrient,
            }}
          >
            <Text
              className="font-InterSemiBold text-lg mt-3"
              style={{
                textAlign: "center",
                alignItems: "center",
                color: Color.PrimaryWebOrientTxtColor,
              }}
            >
              00:{seconds}
            </Text>
          </View>
        </View>

        <View className="m-4">
          <CustomButton Text={"Verify"} onPress={handleVerify} />
        </View>
        <View
          className="w-11/12  m-3 rounded-lg ml-4"
          style={{
            borderWidth: 1,
            borderColor: Color.PrimaryWebOrient,
            backgroundColor: "#F9F9F9",
            justifyContent: "center",
          }}
        >
          <View
            className="flex-row mt-2 ml-2"
            style={{
              flexDirection: "row",
            }}
          >
            <Feather
              name="info"
              size={20}
              style={{
                color: Color.PrimaryWebOrient,
              }}
            />
            <Text className=" font-InterSemiBold text-sm ml-2">Note:</Text>
          </View>

          <Text className="font-InterSemiBold text-xs  mt-2 ml-2">
            - Please stay on this screen while we verify your OTP
          </Text>
          <Text className="font-InterSemiBold text-xs  mt-2 ml-2 mb-2">
            - Please ensure that your registered email is login on this device
          </Text>
        </View>
      </View>
    </>
  );
};

export default OTPverification;
