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

const LimitManagement = ({ navigation }) => {
  const [accountData, setAccountData] = useState(null);
  const [dailyLimits, setDailyLimits] = useState({
    transferToOtherBank: undefined,
    transferToDigiBank: undefined,
    transferToOwnAccount: undefined,
    mobilePayments: undefined,
    utilityBills: undefined,
    qrPayments: undefined,
    transactionLimit : undefined,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(5);

  const paymentTypes = [
    { label: "Send Money to Other Banks", limitKey: "transferToOtherBank" },
    { label: "Funds Transfer to Digi-Bank Account", limitKey: "transferToDigiBank" },
    { label: "Funds Transfer to Own Account", limitKey: "transferToOwnAccount" },
    { label: "Mobile Prepaid and Postpaid Payments", limitKey: "mobilePayments" },
    { label: "Utility Bills and Other Payments", limitKey: "utilityBills" },
    { label: "QR Payments", limitKey: "qrPayments" },
  ];

  // Fetch account data
  const fetchAccountData = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/v1/customer/getAccount?accountNumber=zanbeel-e695164`, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      });

      const dto = response.data;

      if (dto.success) {
        setAccountData(dto.data);
        setDailyLimits({
          transferToOtherBank: dto.data.singleDaySendToOtherBankLimit,
          transferToDigiBank: dto.data.singleDayLimit,
          transferToOwnAccount: dto.data.singleDayOwnLimit,
          mobilePayments: dto.data.singleDayTopUpLimit,
          utilityBills: dto.data.singleDayBillPayLimit,
          qrPayments: dto.data.singleDayQRLimit,
        });
      } else {
        Alert.alert("Error", dto.message || "Failed to retrieve account data.");
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        const message = error.response.data.message || "An error occurred. Please try again.";

        if (statusCode === 404) {
          Alert.alert("Error", "Server timed out. Try again later!");
        } else if (statusCode === 503) {
          Alert.alert("Error", "Service unavailable. Please try again later.");
        } else {
          Alert.alert("Error", message);
        }
      } else {
        Alert.alert("Error", "No response from the server. Please check your connection.");
      }
    }
  };

  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc]">
      <View className="h-24" style={{ backgroundColor: Color.PrimaryWebOrient }}>
        <View className="flex-row items-center justify-center h-full">
          <TouchableOpacity onPress={() => navigation.navigate("Account_Setting_List")} className="absolute left-5">
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
          <Text className="text-lg font-semibold text-gray-800">
            Total Authorization (Per Day)
          </Text>
          <Text className="text-lg font-semibold text-gray-800">
            {dailyLimits[payment.limitKey] !== undefined
              ? dailyLimits[payment.limitKey].toLocaleString()
              : "N/A"}
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
          <View className="flex flex-col items-start bg-[#f9fafc] rounded-xl">
            <View className="h-3 bg-cyan-500 rounded-xl w-[66px]" />
          </View>
        </View>
        <View className="flex flex-row items-center justify-between mt-4 w-full">
          <Text className="ml-2 text-md font-medium text-neutral-500">
            Per Transaction - {dailyLimits[payment.limitKey] !== undefined ? (dailyLimits[payment.limitKey] / 5).toLocaleString() : "N/A"}
          </Text>
          <TouchableOpacity
            className="bg-primary w-8 h-8 rounded-full flex items-center justify-center"
            onPress={handleShowModal}
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
        title="Set Count"
        message="Adjust the number of utility bills per day."
        confirmText="Proceed"
        onConfirm={() => {
          // Handle proceed action
        }}
      >
        <View className="flex flex-col items-center px-4 py-3.5 bg-white rounded-xl">
          <View className="flex flex-row justify-between w-full mb-4">
            <Text className="text-md font-medium">Set Count</Text>
            <Text className="text-md font-medium" style={{ color: Color.PrimaryWebOrient }}>
              {sliderValue} Utility Bills / Day
            </Text>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            value={sliderValue}
            onValueChange={(value) => setSliderValue(value)}
            minimumTrackTintColor={Color.PrimaryWebOrient}
            maximumTrackTintColor="#ccc"
            thumbTintColor={Color.PrimaryWebOrient}
          />
          <View className="flex-row justify-between w-full">
            <Text className="text-gray-400 font-bold">0</Text>
            <Text className="text-gray-400 font-bold">{sliderValue}</Text>
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
    height: 40,
  },
});

export default LimitManagement;
