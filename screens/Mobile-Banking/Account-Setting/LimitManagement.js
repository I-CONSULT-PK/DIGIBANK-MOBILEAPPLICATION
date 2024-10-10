import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
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
import CustomAlert from "../../../components/CustomAlert";

const LimitManagement = ({ navigation }) => {
  const [accountData, setAccountData] = useState(null);
  const [dailyLimits, setDailyLimits] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [maxLimit, setMaxLimit] = useState(0);
  const [progressData, setProgressData] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
const [alertText, setAlertText] = useState("");
const [alertSubtext, setAlertSubtext] = useState("");
const [alertSuccess, setAlertSuccess] = useState(null);

  const [alertObj, setAlertObj] = useState({
    text: "",
    subtext: "",
    success: null,
    onPress: null,
  });

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
        { headers: { Authorization: `Bearer ${bearerToken}` } }
      );

      if (response.data.success) {
        setAccountData(response.data.data);
        setDailyLimits({
          transferToOtherBank:
            response.data.data.singleDaySendToOtherBankLimit || 0,
          transferToDigiBank: response.data.data.singleDayLimit || 0,
          transferToOwnAccount: response.data.data.singleDayOwnLimit || 0,
          mobilePayments: response.data.data.singleDayTopUpLimit || 0,
          utilityBills: response.data.data.singleDayBillPayLimit || 0,
          qrPayments: response.data.data.singleDayQRLimit || 0,
        });
      } else {
        Alert.alert(
          "Error",
          response.data.message || "Failed to retrieve account data."
        );
      }
    } catch (error) {
      console.error("Fetch Account Data Error:", error);
      Alert.alert("Error", "Failed to fetch account data. Please try again.");
    }
  };

  const fetchProgressData = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const accountNumber = await AsyncStorage.getItem("accountNumber");

      const response = await axios.get(
        `${API_BASE_URL}/v1/account/limits?accountNumber=zanbeel-9447e65`,
        { headers: { Authorization: `Bearer ${bearerToken}` } }
      );

      if (response.data.success) {
        const data = response.data.data;

        const calculateProgress = (availed, remaining) => {
          return remaining > 0
            ? ((availed / remaining) * 100).toFixed(2)
            : "0.00";
        };

        const newProgressData = {
          transferToOtherBank: {
            maxLimit:
              data.remainingSendToOtherBankLimit +
                data.availedSendToOtherBankLimit || 0,
            usedLimit: data.availedSendToOtherBankLimit || 0,
            percentage: calculateProgress(
              data.availedSendToOtherBankLimit,
              data.remainingSendToOtherBankLimit
            ),
          },
          transferToDigiBank: {
            maxLimit:
              data.remainingDigiBankLimit + data.availedDigiBankLimit || 0,
            usedLimit: data.availedDigiBankLimit || 0,
            percentage: calculateProgress(
              data.availedDigiBankLimit,
              data.remainingDigiBankLimit
            ),
          },
          transferToOwnAccount: {
            maxLimit: data.remainingOwnLimit + data.availedOwnLimit || 0,
            usedLimit: data.availedOwnLimit || 0,
            percentage: calculateProgress(
              data.availedOwnLimit,
              data.remainingOwnLimit
            ),
          },
          mobilePayments: {
            maxLimit: data.remainingTopUpLimit + data.availedTopUpLimit || 0,
            usedLimit: data.availedTopUpLimit || 0,
            percentage: calculateProgress(
              data.availedTopUpLimit,
              data.remainingTopUpLimit
            ),
          },
          utilityBills: {
            maxLimit:
              data.remainingBillPayLimit + data.availedBillPayLimit || 0,
            usedLimit: data.availedBillPayLimit || 0,
            percentage: calculateProgress(
              data.availedBillPayLimit,
              data.remainingBillPayLimit
            ),
          },
          qrPayments: {
            maxLimit: data.remainingQRLimit + data.availedQRLimit || 0,
            usedLimit: data.availedQRLimit || 0,
            percentage: calculateProgress(
              data.availedQRLimit,
              data.remainingQRLimit
            ),
          },
        };

        // console.log("Progress Data:", newProgressData);
        setProgressData(newProgressData);
      } else {
        Alert.alert(
          "Error",
          response.data.message || "Failed to retrieve progress data."
        );
      }
    } catch (error) {
      console.error("Fetch Progress Data Error:", error);
      Alert.alert(
        "Error",
        "Failed to retrieve progress data. Please try again."
      );
    }
  };
  const handleShowModal = (paymentType) => {
    const selected = paymentTypes.find(
      (payment) => payment.label === paymentType
    );

    if (selected) {
      setSelectedPayment(selected); // Store the whole object
      setSliderValue(dailyLimits[selected.limitKey] || allowedValues[0]);
      setMaxLimit(allowedValues[allowedValues.length - 1]);
      setModalVisible(true);
    } else {
      console.error("Selected payment type not found:", paymentType);
    }
  };

  const handleCloseModal = () => setModalVisible(false);

  const handleSliderValueChange = (value) => {
    const closestValue = allowedValues.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    setSliderValue(closestValue);
  };

  const handleConfirmLimitChange = async () => {
    try {
      const accountNumber = await AsyncStorage.getItem("accountNumber");
      const customerId = await AsyncStorage.getItem("customerId");
      const bearerToken = await AsyncStorage.getItem("token");
  
      const selectedLimitKey = selectedPayment?.limitKey;
  
      if (!selectedLimitKey) {
        setAlertObj({
          text: "Error",
          subtext: "Invalid payment type selected.",
          success: false,
        });
        setAlertVisible(true);
        return;
      }
  
      const limitTypeMap = {
        transferToOtherBank: "sendtootherbank",
        transferToDigiBank: "singleday",
        transferToOwnAccount: "owntransfer",
        mobilePayments: "topup",
        utilityBills: "billpay",
        qrPayments: "qrpay",
      };
  
      const limitType = limitTypeMap[selectedLimitKey];
  
      if (sliderValue > maxLimit) {
        setAlertObj({
          text: "Error",
          subtext: `The limit cannot exceed ${maxLimit.toLocaleString()}.`,
          success: false,
        });
        setAlertVisible(true);
        return;
      }
  
      const response = await axios.put(
        `${API_BASE_URL}/v1/settings/setDailyLimit?accountNumber=${accountNumber}&customerId=${customerId}&limitValue=${sliderValue}&limitType=${limitType}`,
        null,
        { headers: { Authorization: `Bearer ${bearerToken}` } }
      );
  
      if (response.data.success) {
        setAlertObj({
          text: "Success",
          subtext: `Daily limit updated successfully for ${selectedPayment.label}.`,
          success: true,
        });
        setAlertVisible(true);
        fetchAccountData();
        fetchProgressData();
      } else {
        setAlertObj({
          text: "Error",
          subtext: response.data.message || "Failed to update limit.",
          success: false,
        });
        setAlertVisible(true);
      }
    } catch (error) {
      console.error("Confirm Limit Change Error:", error);
      setAlertObj({
        text: "Error",
        subtext: "Failed to update limit. Please try again.",
        success: false,
      });
      setAlertVisible(true);
    } finally {
      handleCloseModal();
    }
  };
  
  

  useEffect(() => {
    fetchAccountData();
    fetchProgressData();
  }, []);

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
        {paymentTypes.map((payment, index) => {
          const limitKey = payment.limitKey;
          const usedLimit = progressData[limitKey]?.usedLimit || 0;
          const maxLimit = progressData[limitKey]?.maxLimit || 0;
          const percentage = maxLimit > 0 ? (usedLimit / maxLimit) * 100 : 0;

          return (
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
                      {dailyLimits[limitKey]?.toLocaleString() || "Loading..."}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between w-full">
                    <Text className="text-xs font-medium text-neutral-500">
                      Availed
                    </Text>
                    <Text className="text-xs font-medium text-neutral-500">
                      Remaining
                    </Text>
                  </View>
                  <View className="flex flex-col mt-3 w-full rounded-xl relative">
                    <ProgressBar
                      className="h-2.5 rounded-full"
                      progress={percentage}
                      color={Color.PrimaryWebOrient}
                    />
                  </View>
                  <View className="flex flex-row justify-between w-full">
                    <Text className="text-xs font-medium text-neutral-500">
                      {usedLimit.toLocaleString()}
                    </Text>
                    <Text className="text-xs font-medium text-neutral-500">
                      {maxLimit.toLocaleString()}
                    </Text>
                  </View>

                  <View className="flex flex-row items-center justify-between mt-4 w-full">
                    <Text className="ml-2 text-md font-medium text-neutral-500">
                      Per Transaction -{" "}
                      {dailyLimits[limitKey]
                        ? (dailyLimits[limitKey] / 5).toLocaleString()
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
          );
        })}
      </ScrollView>

      <CustomModal
        visible={modalVisible}
        onClose={handleCloseModal}
        title={selectedPayment?.label || "Limit Management"} // Ensure this is a string
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
              {dailyLimits[selectedPayment?.limitKey]?.toLocaleString() || "0"}
            </Text>
          </View>
          <View className="flex-row justify-between w-full">
            <Text className="text-gray-400 font-bold">Min</Text>
            <Text className="text-gray-400 font-bold">Max</Text>
          </View>
          <Slider
            style={{ width: "100%" }}
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
              {dailyLimits[selectedPayment?.limitKey]?.toLocaleString() || "0"}
            </Text>
            <Text className="text-gray-400 font-bold">
              {sliderValue.toLocaleString()}
            </Text>
          </View>
        </View>
      </CustomModal>

      <CustomAlert
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
        text={alertObj.text}
        subtext={alertObj.subtext}
        success={alertObj.success}
        onPress={alertObj.onPress}
      />
      <Footer />
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default LimitManagement;
