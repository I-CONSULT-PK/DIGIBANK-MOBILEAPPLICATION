import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
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
import CustomModal from "../../../components/CustomModal";
import CustomAlert from "../../../components/CustomAlert"; // Import CustomAlert
import * as Application from "expo-application";

const DeactivatePin = () => {
  const navigation = useNavigation();
  const [emailCode, setEmailCode] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpDeliveryMethod, setOtpDeliveryMethod] = useState("EMAIL");
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSubtext, setAlertSubtext] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const id =
          Platform.OS === "android"
            ? await Application.getAndroidId()
            : await Application.getIosIdForVendorAsync();

        setDeviceId(id);
      } catch (error) {
        console.error("Failed to get device ID", error);
      }
    };

    fetchDeviceId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        const storedCustomerId = await AsyncStorage.getItem("customerId");
        setCustomerId(storedCustomerId || "");
        const method =
          (await AsyncStorage.getItem("otpDeliveryMethod")) || "EMAIL";
        setOtpDeliveryMethod(method);
        await sendOTP();
      };

      fetchUserData();
    }, [])
  );

  const sendOTP = async () => {
    const mobileNumber = await AsyncStorage.getItem("mobileNumber");
    const email = await AsyncStorage.getItem("email");

    if (!mobileNumber || !email) {
      showAlert("Error", "Unexpected error occurred. Please try again later.", false);
      return;
    }

    setOtpLoading(true);

    const otpData = {
      mobileNumber: mobileNumber,
      email: email,
      reason: "verify mobile device",
      deliveryPreference: otpDeliveryMethod,
    };

    console.log("OTP request data:", otpData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/v1/otp/createOTP`,
        otpData
      );
      const dto = response.data;

      if (dto && dto.success) {
        showAlert("Success", "OTP has been sent successfully.", true);
      } else {
        showAlert("Error", dto.message || "Failed to send OTP.", false);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setOtpLoading(false);
    }
  };

  const showAlert = (text, subtext, success) => {
    setAlertText(text);
    setAlertSubtext(subtext);
    setAlertSuccess(success);
    setAlertVisible(true);
  };

  const handleError = (error) => {
    console.log(error);
    if (error.response) {
      showAlert("Error", error.response.data.message || "Something went wrong.", false);
    } else if (error.request) {
      showAlert("Error", "No response from the server. Please check your connection.", false);
    } else {
      showAlert("Error", error.message, false);
    }
  };

  const handleResend = async () => {
    setIsResendDisabled(true);
    await sendOTP();
    setIsResendDisabled(false);
  };

  const verifyOTP = async () => {
    if (
      (otpDeliveryMethod === "EMAIL" && emailCode.length > 0) ||
      (otpDeliveryMethod === "SMS" && smsCode.length > 0)
    ) {
      setOtpLoading(true);
      const email = await AsyncStorage.getItem("email");
      const mobileNumber = await AsyncStorage.getItem("mobileNumber");

      const otpData = {
        mobileNumber: mobileNumber,
        email: email,
        emailOtp: otpDeliveryMethod === "EMAIL" ? emailCode : "",
        smsOtp: otpDeliveryMethod === "SMS" ? smsCode : "",
        deliveryPreference: otpDeliveryMethod,
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/v1/otp/verifyOTP`,
          otpData
        );
        const dto = response.data;

        if (dto && dto.success) {
          setModalVisible(true);
        } else {
          showAlert("Error", dto.message || "OTP verification failed.", false);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setOtpLoading(false);
      }
    } else {
      showAlert("Error", "Please enter the required code.", false);
    }
  };

  const handleDeactivatePin = async () => {
    if (!customerId || !deviceId) {
      showAlert("Error", "Customer ID or Device ID is missing.", false);
      return;
    }

    const deactivateData = {
      customerId: customerId,
      unique: deviceId,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/v1/settings/deactivate-pin`,
        deactivateData
      );
      const dto = response.data;

      if (dto && dto.success) {
        showAlert("Success", "Your PIN has been deactivated.", true);
        setModalVisible(false);
        navigation.navigate("Home");
      } else {
        showAlert("Error", dto.message || "Failed to deactivate PIN.", false);
      }
    } catch (error) {
      handleError(error);
    }
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
              registered mobile number.
            </Text>
          </Text>
          <View className="mt-4 px-4">
            <View className="bg-white rounded-xl w-full shadow-lg p-6">
              {otpDeliveryMethod === "EMAIL" && (
                <>
                  <Text className="text-gray-500 mb-3">Email Code</Text>
                  <TextInput
                    placeholder="Enter email code"
                    value={emailCode}
                    onChange={setEmailCode}
                    keyboardType="default"
                  />
                </>
              )}
              {otpDeliveryMethod === "SMS" && (
                <>
                  <Text className="text-gray-500 mb-3">SMS Code</Text>
                  <TextInput
                    placeholder="Enter SMS Code"
                    value={smsCode}
                    onChange={setSmsCode}
                    keyboardType="default"
                  />
                </>
              )}
              {otpDeliveryMethod === "BOTH" && (
                <>
                  <Text className="text-gray-500 mb-3">Email Code</Text>
                  <TextInput
                    placeholder="Enter email code"
                    value={emailCode}
                    onChange={setEmailCode}
                    keyboardType="default"
                  />
                  <Text className="text-gray-500 mt-5 mb-3">SMS Code</Text>
                  <TextInput
                    placeholder="Enter SMS Code"
                    value={smsCode}
                    onChange={setSmsCode}
                    keyboardType="default"
                  />
                </>
              )}
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
            <CustomButton text="Confirm" onPress={verifyOTP} />
          </View>
        </ScrollView>
      </View>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Deactivate PIN"
        message="Do you want to deactivate your PIN?"
        onConfirm={handleDeactivatePin}
        confirmText="Confirm"
        cancelText="Cancel"
      />
      <CustomAlert
        text={alertText}
        subtext={alertSubtext}
        success={alertSuccess}
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
      />
    </SafeAreaView>
  );
};

export default DeactivatePin;
