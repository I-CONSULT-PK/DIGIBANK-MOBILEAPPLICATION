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
  const options = [
    {
      label: "PKR 1,000,000 Daily",
      limit: "PKR 1,000,000",
      limitType: "billpay",
    },
    {
      label: "PKR 500,000 Daily",
      limit: "PKR 500,000",
      limitType: "owntransfer",
    },
    { label: "PKR 250,000 Daily", limit: "PKR 250,000", limitType: "topup" },
    { label: "PKR 0 Daily", limit: "PKR 0", limitType: "singleday" },
  ];

  const sliderValueMapping = {
    "Send Money to Other Banks": 1000000,
    "Funds Transfer to Digi-Bank Account": 1000000,
    "Funds Transfer to Own Account": 1000000,
    "Funds Transfer to Post Paid": 50000,
    "Utility Bills and Other Payments": 50000,
    "Funds Transfer to QR Payments": 50000,
  };

  const maxSliderValueMapping = {
    "Send Money to Other Banks": 1000000,
    "Funds Transfer to Digi-Bank Account": 1000000,
    "Funds Transfer to Own Account": 1000000,
    "Funds Transfer to Post Paid": 50000,
    "Utility Bills and Other Payments": 50000,
    "Funds Transfer to QR Payments": 50000,
  };
  const allowedValues = {
    digiBank: [100000, 500000, 1000000],
    otherBank: [100000, 500000, 1000000],
    ownAccount: [100000, 500000, 1000000],
    postpaidOtherPaymentsQR: [10000, 25000, 50000],
  };
  const allowedValuesForSpecificSections = [10000, 25000, 50000];
  const handleSliderChange = (value) => {
    const specificType =
      modalTitle === "Digi Bank" ||
      modalTitle === "Other Bank" ||
      modalTitle === "Own Account"
        ? allowedValues.digiBank
        : allowedValues.postpaidOtherPaymentsQR;

    const closestValue = specificType.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    setSliderValue(closestValue);
  };

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [maxSliderValue, setMaxSliderValue] = useState(1000000);
  const [accountNumber, setAccountNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [modalTitle, setModalTitle] = useState("Total Authorized (Per Day)");

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const accountNum = await AsyncStorage.getItem("accountNumber");
        const customerID = await AsyncStorage.getItem("customerId");
        setAccountNumber(accountNum);
        setCustomerId(customerID);
      } catch (error) {
        console.error("Failed to fetch account details", error);
      }
    };

    fetchAccountDetails();
  }, []);

  const handleShowModal = (title) => {
    setModalTitle(title);
    setSliderValue(0);
    setMaxSliderValue(maxSliderValueMapping[title] || 1000000); // Set maximum slider value based on title
    setModalVisible(true);
  };

  const handleCloseModal = () => setModalVisible(false);

  const handleProceed = async () => {
    try {
      const limitValue = selectedOption.limit
        .replace("PKR ", "")
        .replace(/,/g, ""); // Extract numeric value
      const limitType = selectedOption.limitType;

      const url = `${API_BASE_URL}/v1/settings/setDailyLimit?accountNumber=${accountNumber}&customerId=${customerId}&limitValue=${limitValue}&limitType=${limitType}`;

      const response = await axios.get(url);

      if (response.data.success) {
        Alert.alert("Success", "Daily limit updated successfully", [
          { text: "OK", onPress: () => navigation.navigate("Home") },
        ]);
      } else {
        Alert.alert("Error", response.data.message || "Failed to update limit");
      }
    } catch (error) {
      console.error(
        "Error updating daily limit:",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        "Error",
        "Error updating daily limit: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
    handleCloseModal();
  };

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
        {/* Each section for editing limits */}
        <View className="w-full mt-5 px-4">
          <Text className="text-base font-semibold text-gray-800">
            Send Money to Other Banks
          </Text>
        </View>
        <View className="z-10 p-4">
          <View className="flex items-center px-4 py-3.5 bg-white rounded-xl">
            <View className="flex flex-row justify-between w-full">
              <Text className="text-lg font-semibold text-gray-800">
                Total Authorization(Per Day)
              </Text>
              <Text className="text-lg font-semibold text-gray-800">
                1,000,000
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
            <View className="flex-row justify-between w-full mt-3">
              <Text className="text-xs text-gray-500">{sliderValue}</Text>
              <Text className="text-xs text-gray-500">1,000,000.00</Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-4 w-full">
              <View className="flex flex-row items-center">
                <Text className="ml-2 text-md font-medium text-neutral-500">
                  Per Transaction-No Limit
                </Text>
              </View>
              <TouchableOpacity
                className="bg-primary w-8 h-8 rounded-full flex items-center justify-center"
                onPress={() => handleShowModal("Send Money to Other Banks")}
              >
                <Entypo name="edit" size={17} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Repeat the above for other sections with appropriate titles */}
        <View className="w-full mt-5 px-4">
          <Text className="text-base font-semibold text-gray-800">
            Funds Transfer to Digi-Bank Account
          </Text>
        </View>
        <View className="z-10 p-4">
          <View className="flex items-center px-4 py-3.5 bg-white rounded-xl">
            <View className="flex flex-row justify-between w-full">
              <Text className="text-lg font-semibold text-gray-800">
                Total Authorization(Per Day)
              </Text>
              <Text className="text-lg font-semibold text-gray-800">
                1,000,000
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
            <View className="flex-row justify-between w-full mt-3">
              <Text className="text-xs text-gray-500">{sliderValue}</Text>
              <Text className="text-xs text-gray-500">1,000,000.00</Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-4 w-full">
              <View className="flex flex-row items-center">
                <Text className="ml-2 text-md font-medium text-neutral-500">
                  Per Transaction-No Limit
                </Text>
              </View>
              <TouchableOpacity
                className="bg-primary w-8 h-8 rounded-full flex items-center justify-center"
                onPress={() =>
                  handleShowModal("Funds Transfer to Digi-Bank Account")
                }
              >
                <Entypo name="edit" size={17} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="w-full mt-5 px-4">
          <Text className="text-base font-semibold text-gray-800">
            Funds Transfer to Own Account
          </Text>
        </View>
        <View className="z-10 p-4">
          <View className="flex items-center px-4 py-3.5 bg-white rounded-xl">
            <View className="flex flex-row justify-between w-full">
              <Text className="text-lg font-semibold text-gray-800">
                Total Authorization(Per Day)
              </Text>
              <Text className="text-lg font-semibold text-gray-800">
                1,000,000
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
            <View className="flex-row justify-between w-full mt-3">
              <Text className="text-xs text-gray-500">{sliderValue}</Text>
              <Text className="text-xs text-gray-500">1,000,000.00</Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-4 w-full">
              <View className="flex flex-row items-center">
                <Text className="ml-2 text-md font-medium text-neutral-500">
                  Per Transaction-No Limit
                </Text>
              </View>
              <TouchableOpacity
                className="bg-primary w-8 h-8 rounded-full flex items-center justify-center"
                onPress={() => handleShowModal("Funds Transfer to Own Account")}
              >
                <Entypo name="edit" size={17} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="w-full mt-5 px-4">
          <Text className="text-base font-semibold text-gray-800">
            Funds Transfer to Post Paid
          </Text>
        </View>
        <View className="z-10 p-4">
          <View className="flex items-center px-4 py-3.5 bg-white rounded-xl">
            <View className="flex flex-row justify-between w-full">
              <Text className="text-lg font-semibold text-gray-800">
                Total Authorization(Per Day)
              </Text>
              <Text className="text-lg font-semibold text-gray-800">
                1,000,000
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
              <View className="flex-row justify-between w-full mt-3">
                <Text className="text-xs text-gray-500">{sliderValue}</Text>
                <Text className="text-xs text-gray-500">50,000.00</Text>
              </View>
            </View>
            <View className="flex flex-row items-center justify-between mt-4 w-full">
              <View className="flex flex-row items-center">
                <Text className="ml-2 text-md font-medium text-neutral-500">
                  Per Transaction-No Limit
                </Text>
              </View>
              <TouchableOpacity
                className="bg-primary w-8 h-8 rounded-full flex items-center justify-center"
                onPress={() => handleShowModal("Funds Transfer to Post Paid")}
              >
                <Entypo name="edit" size={17} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="w-full mt-5 px-4">
          <Text className="text-base font-semibold text-gray-800">
            Utility Bills and Other Payments
          </Text>
        </View>
        <View className="z-10 p-4">
          <View className="flex items-center px-4 py-3.5 bg-white rounded-xl">
            <View className="flex flex-row justify-between w-full">
              <Text className="text-lg font-semibold text-gray-800">
                Total Authorization(Per Day)
              </Text>
              <Text className="text-lg font-semibold text-gray-800">
                1,000,000
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
            <View className="flex-row justify-between w-full mt-3">
              <Text className="text-xs text-gray-500">{sliderValue}</Text>
              <Text className="text-xs text-gray-500">50,000.00</Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-4 w-full">
              <View className="flex flex-row items-center">
                <Text className="ml-2 text-md font-medium text-neutral-500">
                  Per Transaction-No Limit
                </Text>
              </View>
              <TouchableOpacity
                className="bg-primary w-8 h-8 rounded-full flex items-center justify-center"
                onPress={() =>
                  handleShowModal("Utility Bills and Other Payments")
                }
              >
                <Entypo name="edit" size={17} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="w-full mt-5 px-4">
          <Text className="text-base font-semibold text-gray-800">
            Funds Transfer to QR Payments
          </Text>
        </View>
        <View className="z-10 p-4">
          <View className="flex items-center px-4 py-3.5 bg-white rounded-xl">
            <View className="flex flex-row justify-between w-full">
              <Text className="text-lg font-semibold text-gray-800">
                Total Authorization(Per Day)
              </Text>
              <Text className="text-lg font-semibold text-gray-800">
                1,000,000
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
            <View className="flex-row justify-between w-full mt-3">
              <Text className="text-xs text-gray-500">{sliderValue}</Text>
              <Text className="text-xs text-gray-500">50,000.00</Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-4 w-full">
              <View className="flex flex-row items-center">
                <Text className="ml-2 text-md font-medium text-neutral-500">
                  Per Transaction-No Limit
                </Text>
              </View>
              <TouchableOpacity
                className="bg-primary w-8 h-8 rounded-full flex items-center justify-center"
                onPress={() =>
                  handleShowModal(" Funds Transfer to QR Payments")
                }
              >
                <Entypo name="edit" size={17} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Modal */}
        <CustomModal
          visible={modalVisible}
          onClose={handleCloseModal}
          title={modalTitle}
          message="Adjust the limit for this option."
          confirmText="Proceed"
          onConfirm={handleProceed}
        >
          <View className="flex flex-col items-center w-full">
            <View className="flex-row justify-between w-full mt-3">
              <Text className="text-xs text-gray-500">Min</Text>
              <Text className="text-xs text-gray-500">Max</Text>
            </View>

            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={
                modalTitle === "Digi Bank" ||
                modalTitle === "Other Bank" ||
                modalTitle === "Own Account"
                  ? 100000
                  : 10000
              }
              maximumValue={
                modalTitle === "Digi Bank" ||
                modalTitle === "Other Bank" ||
                modalTitle === "Own Account"
                  ? 1000000
                  : 50000
              }
              step={1}
              value={sliderValue}
              onValueChange={handleSliderChange}
            />

            <Text className="text-center mt-2">{sliderValue}</Text>
          </View>
        </CustomModal>
      </ScrollView>

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
