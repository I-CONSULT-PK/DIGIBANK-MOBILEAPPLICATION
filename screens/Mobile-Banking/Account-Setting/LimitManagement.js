import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Slider from "@react-native-community/slider";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import Footer from "../../../components/Footer";
import CustomModal from "../../../components/CustomModal";
import axios from "axios";
import API_BASE_URL from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar } from "react-native-paper";
const LimitManagement = ({ navigation }) => {
  const [accountData, setAccountData] = useState(null);
  const [dailyLimits, setDailyLimits] = useState({
    transferToOtherBank: 0,
    transferToDigiBank: 0,
    transferToOwnAccount: 0,
    mobilePayments: 0,
    utilityBills: 0,
    qrPayments: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [maxLimit, setMaxLimit] = useState(0);

  const allowedValues = [50000, 100000, 250000, 500000, 1000000];

  const paymentTypes = [
    { label: "Send Money to Other Banks", limitKey: "transferToOtherBank" },
    {
      label: "Funds Transfer to Digi-Bank Account",
      limitKey: "transferToDigiBank",
    },
    {
      label: "Funds Transfer to Own Account",
      limitKey: "transferToOwnAccount",
    },
    {
      label: "Mobile Prepaid and Postpaid Payments",
      limitKey: "mobilePayments",
    },
    { label: "Utility Bills and Other Payments", limitKey: "utilityBills" },
    { label: "QR Payments", limitKey: "qrPayments" },
  ];

  const fetchAccountData = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const accountNumber = await AsyncStorage.getItem("accountNumber");

      if (!bearerToken || !accountNumber) {
        Alert.alert("Error", "Invalid authentication. Please log in again.");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/v1/customer/getAccount?accountNumber=${accountNumber}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      const dto = response.data;

      if (dto.success) {
        setAccountData(dto.data);
        setDailyLimits({
          transferToOtherBank: dto.data.singleDaySendToOtherBankLimit || 0,
          transferToDigiBank: dto.data.singleDayLimit || 0,
          transferToOwnAccount: dto.data.singleDayOwnLimit || 0,
          mobilePayments: dto.data.singleDayTopUpLimit || 0,
          utilityBills: dto.data.singleDayBillPayLimit || 0,
          qrPayments: dto.data.singleDayQRLimit || 0,
        });
      } else {
        Alert.alert("Error", dto.message || "Failed to retrieve account data.");
      }
    } catch (error) {
      console.error("Fetch Account Data Error:", error);
      if (error.response) {
        const statusCode = error.response.status;
        const message =
          error.response.data.message || "An error occurred. Please try again.";

        if (statusCode === 404) {
          Alert.alert("Error", "Server timed out. Try again later!");
        } else if (statusCode === 503) {
          Alert.alert("Error", "Service unavailable. Please try again later.");
        } else {
          Alert.alert("Error", message);
        }
      } else {
        Alert.alert(
          "Error",
          "No response from the server. Please check your connection."
        );
      }
    }
  };

  const handleShowModal = (paymentType) => {
    const selected = paymentTypes.find(
      (payment) => payment.label === paymentType
    );
    setSelectedPayment(paymentType);
    setSliderValue(dailyLimits[selected.limitKey] || allowedValues[0]);
    setMaxLimit(allowedValues[allowedValues.length - 1]);
    setModalVisible(true);
  };

  const handleCloseModal = () => setModalVisible(false);

  const limitTypeMap = {
    transferToOtherBank: "sendtootherbank",
    transferToDigiBank: "singleday",
    transferToOwnAccount: "owntransfer",
    mobilePayments: "topup",
    utilityBills: "billpay",
    qrPayments: "qrpay",
  };

  const handleSliderValueChange = (value) => {
    const closestValue = allowedValues.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
    setSliderValue(closestValue);
  };

  const handleConfirmLimitChange = async () => {
    try {
      const accountNumber = await AsyncStorage.getItem("accountNumber");
      const customerId = await AsyncStorage.getItem("customerId");
      const bearerToken = await AsyncStorage.getItem("token");

      const selectedLimitKey = paymentTypes.find(
        (payment) => payment.label === selectedPayment
      )?.limitKey;

      if (!selectedLimitKey) {
        Alert.alert("Error", "Invalid payment type selected.");
        return;
      }

      const limitType = limitTypeMap[selectedLimitKey];

      if (sliderValue > maxLimit) {
        Alert.alert(
          "Error",
          `The limit cannot exceed ${maxLimit.toLocaleString()}.`
        );
        return;
      }

      const response = await axios.put(
        `${API_BASE_URL}/v1/settings/setDailyLimit?accountNumber=${accountNumber}&customerId=${customerId}&limitValue=${sliderValue}&limitType=${limitType}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert(
          "Success",
          `Daily limit updated successfully for ${selectedPayment}.`
        );
        fetchAccountData();
      } else {
        Alert.alert(
          "Error",
          response.data.message || "Failed to update limit."
        );
      }
    } catch (error) {
      console.error("Confirm Limit Change Error:", error);
      if (error.response) {
        Alert.alert(
          "Error",
          `Failed to update limit: ${
            error.response.data.message || "Server error"
          }`
        );
      } else {
        Alert.alert("Error", "Failed to update limit. Please try again.");
      }
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  const selectedLimitKey = paymentTypes.find(
    (payment) => payment.label === selectedPayment
  )?.limitKey;

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc]">
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
          <Text className="text-white text-lg font-bold">Limit Management</Text>
        </View>
      </View>

      <ScrollView>
        {paymentTypes.map((payment, index) => (
          <View key={index} className="w-full mt-5 px-4">
            <Text className="text-base font-semibold text-gray-800">
              {payment.label}
            </Text>
            <View className="z-10 p-4">
              <View className="flex items-center px-4 py-3.5 bg-white rounded-xl">
                <View className="flex flex-row justify-between w-full">
                  <Text className="text-base font-semibold text-gray-800">
                    Total Authorization (Per Day)
                  </Text>
                  <Text className="text-base font-semibold text-gray-800">
                    {dailyLimits[payment.limitKey] !== undefined
                      ? dailyLimits[payment.limitKey].toLocaleString()
                      : "Loading..."}
                  </Text>
                </View>
                <View className="flex flex-row justify-between w-full">
                  <Text className="text-xs font-medium text-neutral-500 flex-1 text-left">
                    Availed
                  </Text>
                  <Text className="text-xs font-medium text-neutral-500 flex-1 text-right">
                    Remaining
                  </Text>
                </View>
                <View className="flex flex-col mt-3 w-full rounded-xl">
                  <ProgressBar
                    className="h-2.5 rounded-full"
                    progress={0.5}
                    color={Color.PrimaryWebOrient}
                  />
                </View>
                <View className="flex flex-row items-center justify-between mt-4 w-full">
                  <Text className="ml-2 text-md font-medium text-neutral-500">
                    Per Transaction -
                    {dailyLimits[payment.limitKey] !== undefined
                      ? (dailyLimits[payment.limitKey] / 5).toLocaleString()
                      : "Loading..."}
                  </Text>
                  <TouchableOpacity
                    className="bg-primary w-8 h-8 rounded-full flex items-center justify-center"
                    onPress={() => handleShowModal(payment.label)}
                  >
                    <Entypo name="edit" size={17} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <CustomModal
        visible={modalVisible}
        onClose={handleCloseModal}
        title={selectedPayment}
        confirmText="Proceed"
        onConfirm={handleConfirmLimitChange}
      >
        <View className="flex flex-col items-center px-5 bg-white rounded-xl">
          <View className="flex flex-row justify-between w-full mb-4">
            <Text className="text-md font-medium text-gray-500">
              Total Authorized (Per Day)
            </Text>
            <Text
              className="text-md font-medium"
              style={{ color: Color.PrimaryWebOrient }}
            >
              {dailyLimits[selectedLimitKey] !== undefined
                ? dailyLimits[selectedLimitKey].toLocaleString()
                : "Loading..."}
            </Text>
          </View>
          <View className="flex-row justify-between w-full">
            <Text className="text-gray-400 font-bold">Min</Text>
            <Text className="text-gray-400 font-bold">Max</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={allowedValues[0]}
            maximumValue={allowedValues[allowedValues.length - 1]}
            step={1}
            value={sliderValue}
            onValueChange={handleSliderValueChange}
            minimumTrackTintColor={Color.PrimaryWebOrient}
            maximumTrackTintColor="#ccc"
            thumbTintColor={Color.PrimaryWebOrient}
          />
          <View className="flex-row justify-between w-full">
            <Text className="text-gray-400 font-bold">
              {dailyLimits[selectedLimitKey] !== undefined
                ? dailyLimits[selectedLimitKey].toLocaleString()
                : "Loading..."}
            </Text>
            <Text className="text-gray-400 font-bold">
              {sliderValue.toLocaleString()}
            </Text>
          </View>
        </View>
      </CustomModal>
      <Footer />
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: "100%",
  },
});

export default LimitManagement;
