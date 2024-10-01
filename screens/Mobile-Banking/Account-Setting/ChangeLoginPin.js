import React, { useState, useRef, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../../components/Button";
import Footer from "../../../components/Footer";
import API_BASE_URL from "../../../config";
import { TextInput } from "react-native-paper";

const otpLength = 4;

const ChangeLoginPin = () => {
  const navigation = useNavigation();
  const [oldPin, setOldPin] = useState(Array(otpLength).fill(""));
  const [newPin, setNewPin] = useState(Array(otpLength).fill(""));
  const [confirmPin, setConfirmPin] = useState(Array(otpLength).fill(""));
  const inputs = useRef([]);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const fetchCustomerId = async () => {
      const id = await AsyncStorage.getItem("customerId");
      setCustomerId(id);
    };
    fetchCustomerId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setOldPin(Array(otpLength).fill(""));
      setNewPin(Array(otpLength).fill(""));
      setConfirmPin(Array(otpLength).fill(""));
    }, [])
  );

  const handleOldPinChange = (text, index) => {
    const sanitizedText = text.replace(/[^0-9]/g, "");
    const newOldPin = [...oldPin];
    newOldPin[index] = sanitizedText;
    setOldPin(newOldPin);
    focusNextInput(sanitizedText, index, 0);
  };

  const handleNewPinChange = (text, index) => {
    const sanitizedText = text.replace(/[^0-9]/g, "");
    const newNewPin = [...newPin];
    newNewPin[index] = sanitizedText;
    setNewPin(newNewPin);
    focusNextInput(sanitizedText, index, otpLength);
  };

  const handleConfirmPinChange = (text, index) => {
    const sanitizedText = text.replace(/[^0-9]/g, "");
    const newConfirmPin = [...confirmPin];
    newConfirmPin[index] = sanitizedText;
    setConfirmPin(newConfirmPin);
    focusNextInput(sanitizedText, index, otpLength * 2);
  };

  const focusNextInput = (text, index, offset) => {
    if (text.length === 1) {
      const nextIndex = index + 1;
      if (inputs.current[nextIndex + offset]) {
        inputs.current[nextIndex + offset].focus();
      }
    } else if (text.length === 0 && index > 0) {
      const prevIndex = index - 1;
      if (inputs.current[prevIndex + offset]) {
        inputs.current[prevIndex + offset].focus();
      }
    }
  };

  const handleConfirm = async () => {
    const oldPinString = oldPin.join("");
    const newPinString = newPin.join("");
    const confirmPinString = confirmPin.join("");
  
    // Check if all input fields are filled
    if (oldPinString.length !== otpLength || newPinString.length !== otpLength || confirmPinString.length !== otpLength) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    // Check if new PINs match
    if (newPinString !== confirmPinString) {
      Alert.alert("Error", "New PINs do not match.");
      return;
    }
  
    // Check if old PIN and new PIN are the same
    if (oldPinString === newPinString) {
      Alert.alert("Error", "Old PIN and New PIN cannot be the same.");
      return;
    }
  
    if (!customerId) {
      Alert.alert("Error", "Customer ID is missing.");
      return;
    }
  
    try {
      const response = await axios.put(
        `${API_BASE_URL}/v1/settings/updateDevicePin/${customerId}`,
        {
          oldPin: oldPinString,
          devicePin: newPinString,
        },
        {
          headers: {
            'Content-Type': 'application/json', 
          }
        }
      );
  
      if (response.status === 200) {
        Alert.alert("Success", "PIN updated successfully", [
          {
            text: "OK",
            onPress: () => {
              setTimeout(() => {
                navigation.navigate("Home"); 
              }, 1000);
            }
          }
        ]);
        setOldPin(Array(otpLength).fill(""));
        setNewPin(Array(otpLength).fill(""));
        setConfirmPin(Array(otpLength).fill(""));
      } else {
        Alert.alert("Error", "Failed to update PIN");
      }
    } catch (error) {
      console.error("Error updating PIN:", error);
      Alert.alert("Error", "Error updating PIN: " + (error.response?.data?.message || error.message));
    }
  };
  
  
  

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFC]">
      <View className="flex-1 justify-between">
        <ScrollView className="flex-grow">
          <View className="h-24 bg-primary">
            <View className="flex-row items-center justify-center h-full">
              <TouchableOpacity
                onPress={() => navigation.navigate("Account_Setting_List")}
                className="absolute left-5"
              >
                <Entypo name="chevron-left" size={25} color="white" />
              </TouchableOpacity>
              <Text className="text-white text-lg font-bold">Change Login PIN</Text>
            </View>
          </View>

          <Text className="text-xl font-bold p-5 text-center">Change Login PIN</Text>

          <View className="bg-white rounded-xl shadow-lg shadow-gray-300 py-6 px-4 mt-1 mx-8">
            <Text className="font-semibold text-center text-gray-500">Enter Old PIN</Text>
            <View className="flex-row justify-around items-center mt-2">
              {oldPin.map((_, index) => (
                <TextInput
                  key={index}
                  ref={(input) => (inputs.current[index] = input)}
                  className="w-14 h-12 text-center text-lg bg-[#F4F5F9] rounded-md font-InterSemiBold"
                  keyboardType="numeric"
                  maxLength={1}
                  value={oldPin[index]}
                  onChangeText={(text) => handleOldPinChange(text, index)}
                  returnKeyType={index === otpLength - 1 ? "done" : "next"}
                />
              ))}
            </View>

            <Text className="font-semibold text-center text-gray-500 mt-8">Enter New PIN</Text>
            <View className="flex-row justify-around items-center mt-2">
              {newPin.map((_, index) => (
                <TextInput
                  key={index}
                  ref={(input) => (inputs.current[index + otpLength] = input)}
                  className="w-14 h-12 text-center text-lg bg-[#F4F5F9] rounded-md font-InterSemiBold"
                  keyboardType="numeric"
                  maxLength={1}
                  value={newPin[index]}
                  onChangeText={(text) => handleNewPinChange(text, index)}
                  returnKeyType={index === otpLength - 1 ? "done" : "next"}
                />
              ))}
            </View>

            <Text className="font-semibold text-center text-gray-500 mt-8">Confirm New PIN</Text>
            <View className="flex-row justify-around items-center mt-2">
              {confirmPin.map((_, index) => (
                <TextInput
                  key={index}
                  ref={(input) => (inputs.current[index + otpLength * 2] = input)}
                  className="w-14 h-12 text-center text-lg bg-[#F4F5F9] rounded-md font-InterSemiBold"
                  keyboardType="numeric"
                  maxLength={1}
                  value={confirmPin[index]}
                  onChangeText={(text) => handleConfirmPinChange(text, index)}
                  returnKeyType={index === otpLength - 1 ? "done" : "next"}
                />
              ))}
            </View>
          </View>

          <View className="p-5">
            <CustomButton text="Confirm" onPress={handleConfirm} />
          </View>
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default ChangeLoginPin;
