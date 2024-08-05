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
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { Color } from "../../GlobalStyles";

const { width, height } = Dimensions.get("window");

const OTP = ({ navigation, route }) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const otpInputs = useRef([]);

  useEffect(() => {
    if (route.params) {
      const { email, mobileNumber, sourceScreen } = route.params;
      console.log("OTP Screen Route Params:", {
        email,
        mobileNumber,
        sourceScreen,
      });
      setUserEmail(email || "");
      setUserNumber(mobileNumber || "");

      if (email && mobileNumber) {
        handleResend(email, mobileNumber);
      }
    }
  }, [route.params]);

  const handleOtpChange = (index, value) => {
    const sanitizedValue = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = sanitizedValue;
    setOtp(newOtp);
    console.log("Sanitized OTP State Updated:", newOtp);

    if (sanitizedValue === "" && index > 0) {
      otpInputs.current[index - 1]?.focus();
    } else if (sanitizedValue !== "" && index < otp.length - 1) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleResend = async (email, mobileNumber) => {
    try {
      setIsResendDisabled(true);
      console.log("Create OTP Request Data:", { email, mobileNumber });

      const response = await axios.post(
        "http://192.168.0.153:8080/v1/otp/createOTP",
        {
          email,
          mobileNumber,
          reason: "Verify Mobile Device",
        }
      );

      const responseData = response.data;
      console.log("Create OTP Response:", responseData);

      if (responseData.success) {
        Alert.alert("Sent Successfully", "OTP sent to your email address");
      } else {
        Alert.alert(
          "Error",
          responseData.message || "Failed to send OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during OTP creation:", error);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    } finally {
      setIsResendDisabled(false);
    }
  };

  const handleVerify = async () => {
    try {
      if (!userNumber || !userEmail) {
        Alert.alert("Error", "Mobile Number and Email are required");
        return;
      }
  
      setIsLoading(true);
      const enteredOTP = otp.join(""); 
      console.log("Entered OTP:", enteredOTP);
  
      const payload = {
        mobileNumber: userNumber,   
        email: userEmail,          
        emailOtp: enteredOTP,      
      };
      console.log("Payload being sent:", JSON.stringify(payload));
  
      const response = await axios.post(
        "http://192.168.0.153:8080/v1/otp/verifyOTP",
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const responseData = response.data;
      if (responseData.success) {
        navigation.navigate("PasswordChange", {
          cnic: route.params.cnic,
          accountNumber: route.params.accountNumber,
          sourceScreen: route.params.sourceScreen,
        });
      } else {
        const errors = responseData.data?.errors || [];
        Alert.alert(
          "Error",
          errors.length ? errors.join(", ") : responseData.message || "Something went wrong during OTP verification"
        );
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      Alert.alert("Error", "Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  
  
  
  

  return (
    <SafeAreaView className="h-full flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-row items-center p-4 mt-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-black font-semibold text-lg ml-4 font-InterSemiBold">
            OTP
          </Text>
        </View>

        <View className="flex-1 mt-4 px-4 justify-center -top-14">
          <View className="bg-white rounded-xl w-full shadow-xl shadow-slate-500 px-5 pt-5 pb-4">
            <View className="mb-6">
              <Text className="text-sm mb-4 font-InterMedium">
                Enter Your OTP*
              </Text>
              <View className="flex-row justify-between items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <TextInput
                    key={index}
                    ref={(input) => (otpInputs.current[index] = input)}
                    className="w-12 h-12 text-center text-xl bg-[#F4F5F9] border border-gray-300 rounded-md font-InterSemiBold"
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => handleOtpChange(index, text)}
                    value={otp[index]}
                    returnKeyType={index === 4 ? "done" : "next"}
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
                <Text className="text-slate-500">( *****@mail.com )</Text> Enter
                code here to verify your identity
              </Text>
            </View>

            <TouchableOpacity
              className="py-3 rounded-lg mb-4"
              style={{ backgroundColor: Color.PrimaryWebOrient }}
              onPress={handleVerify}
            >
              <Text className="text-white text-base text-center font-medium font-InterSemiBold">
                Verify
              </Text>
            </TouchableOpacity>

            <View style={{ padding: 16, alignItems: "center" }}>
              <Text style={{ fontFamily: "InterMedium", color: "gray" }}>
                Didn't receive a code?
              </Text>
              <TouchableOpacity
                onPress={() => handleResend(userEmail, userNumber)}
                disabled={isResendDisabled}
              >
                <Text
                  style={{
                    fontFamily: "InterSemiBold",
                    color: Color.PrimaryWebOrientTxtColor,
                  }}
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
