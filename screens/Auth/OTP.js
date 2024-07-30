import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import LoaderComponent from "../../components/LoaderComponent";
import CustomButton from "../../components/Button";
import { Color } from "../../GlobalStyles";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const OTP = ({ navigation, route }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedMobileNumber, setSavedMobileNumber] = useState("");
  const otpInputs = useRef([]);

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

  const handleResend = async (email, mobileNumber) => {
    // try {
    //   console.log("Create OTP Request Data:", {
    //     email,
    //     mobileNumber,
    //   });
    //   if (!mobileNumber) {
    //     Alert.alert("Error", "Mobile Number is required");
    //     return;
    //   }
    //   setSavedEmail(email);
    //   setSavedMobileNumber(mobileNumber);
    //   const createOtpResponse = await fetch(
    //     "http://192.168.0.196:9096/v1/customer/createOTP",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email: userEmail,
    //         mobileNumber: userNumber,
    //         reason: "Verify Mobile Device",
    //       }),
    //     }
    //   );
    //   const responseData = await createOtpResponse.json();
    //   console.log("Create OTP Response:", responseData);
    //   if (responseData.success) {
    //     setTimeout(() => {
    //       Alert.alert("Sent Successfully", "OTP sent to your email address");
    //     }, 2000);
    //   }
    // } catch (error) {
    //   console.error("Error during OTP creation:", error);
    //   Alert.alert("Error", "Failed to send OTP. Please try again.");
    // }
  };

  const handleVerify = async () => {
    //   try {

    //     if (!userNumber) {
    //       Alert.alert("Error", "Mobile Number is required");
    //       return;
    //     }

    //     setIsLoading(true);

    //     const enteredOTP = otp.join("");
    //     console.log("Verify OTP:" + enteredOTP);

    //     const verifyResponse = await fetch(
    //       "http://192.168.0.196:9096/v1/customer/verifyOTP",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           otp: enteredOTP,
    //           email: userEmail,
    //           mobileNumber: userNumber,
    //           reason: "Verify Mobile Device",
    //         }),
    //       }
    //     );

    //     const responseData = await verifyResponse.json();
    //     console.log("Verify OTP Response:", responseData);

    //     if (responseData.success) {
    //       // Alert.alert(
    //       //   "Account Created Successfully",
    //       //   responseData.message || "Success"
    //       // );

    //       if (route.params?.sourceScreen === "ForgetPassword") {
    //         navigation.navigate("NewPassword");
    //       } else {
    navigation.navigate("EntitySelection");
    //       }
    //     } else if (responseData.data && responseData.data.errors) {
    //       Alert.alert("Error", `${responseData.data.errors}`);
    //     } else {
    //       Alert.alert(
    //         "Incorrect OTP",
    //         responseData.message || "Something went wrong during signup"
    //       );
    //     }
    //   } catch (error) {
    //     console.error("Error during OTP verification:", error);
    //     Alert.alert(
    //       "Error",
    //       responseData.message || "Failed to verify OTP. Please try again."
    //     );
    //   } finally {
    //     // Hide loader
    //     setIsLoading(false);
    //   }
    // };

    // useEffect(() => {
    //   const fetchDataFromLocalStorage = async () => {
    //     try {
    //       const savedCustomerInfoString = await AsyncStorage.getItem(
    //         "customerInfo"
    //       );
    //       if (savedCustomerInfoString) {
    //         const savedCustomerInfo = JSON.parse(savedCustomerInfoString);
    //         setUserEmail(savedCustomerInfo.userEmail);
    //         setUserNumber(savedCustomerInfo.userNumber);
    //         setSavedEmail(savedCustomerInfo.userEmail);
    //         setSavedMobileNumber(savedCustomerInfo.userNumber);

    //         if (savedCustomerInfo.userNumber) {
    //           handleResend(
    //             savedCustomerInfo.userEmail,
    //             savedCustomerInfo.userNumber
    //           );
    //         }
    //       }
    //     } catch (error) {
    //       console.error("Error fetching data from local storage:", error);
    //     }
    //   };

    //   fetchDataFromLocalStorage();
    // }, []);
    // useEffect(() => {
    //   const fetchDataFromLocalStorage = async () => {
    //     try {
    //       const savedCustomerInfoString = await AsyncStorage.getItem("customerInfo");
    //       if (savedCustomerInfoString) {
    //         const savedCustomerInfo = JSON.parse(savedCustomerInfoString);
    //         setUserEmail(savedCustomerInfo.userEmail);
    //         setUserNumber(savedCustomerInfo.userNumber);
    //         setSavedEmail(savedCustomerInfo.userEmail);
    //         setSavedMobileNumber(savedCustomerInfo.userNumber);

    //         if (savedCustomerInfo.userNumber) {
    //           handleResend(
    //             savedCustomerInfo.userEmail,
    //             savedCustomerInfo.userNumber
    //           );
    //         }
    //       }
    //     } catch (error) {
    //       console.error("Error fetching data from local storage:", error);
    //     }
    //   };

    //   fetchDataFromLocalStorage();
    // }, []);
    // useEffect(() => {
    //   const timer = setInterval(() => {

    //   }, 5000);

    //   if (userEmail && userNumber) {
    //     handleResend(userEmail, userNumber);
    //   }

    //   return () => {
    //     clearInterval(timer);
    //   };
    // }, [userEmail, userNumber]);
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <LoaderComponent visible={isLoading} />

      <View className="flex justify-center items-center p-4">
        <Text className="font-bold text-2xl">Verification</Text>
        <Text className="font-semibold text-base text-center">
          Enter the code we just sent to you on your Email address
        </Text>
        <View className="flex flex-row items-center mt-10">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpInputs.current[index] = ref)}
              className="border border-gray-300 rounded-xl  text-lg text-center mx-2"
              style={{
                width: width * 0.1,
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

      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={{ fontFamily: "InterMedium", color: "gray" }}>
          Didn't receive a code?
        </Text>
        <TouchableOpacity
          onPress={() => handleResend(savedEmail, savedMobileNumber)}
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

      <View style={{ padding: 16 }}>
        <CustomButton Text={"Verify"} onPress={handleVerify} />
      </View>
    </View>
  );
};

export default OTP;
