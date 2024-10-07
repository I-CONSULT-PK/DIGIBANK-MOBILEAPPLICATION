import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import axios from "axios";
import API_BASE_URL from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputWithIcon from "../../../components/TextInputWithIcon";
import { encrypt } from "../../../utils/crypto";

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchCustomerIdAndToken = async () => {
      try {
        const storedCustomerId = await AsyncStorage.getItem("customerId");
        const storedToken = await AsyncStorage.getItem("token");
        if (storedCustomerId) setCustomerId(storedCustomerId);
        if (storedToken) setToken(storedToken);
      } catch (error) {
        console.error(
          "Error fetching customer ID or token from storage",
          error
        );
      }
    };

    fetchCustomerIdAndToken();
  }, []);

  const handleChangePassword = async () => {
    // Check if the current password is empty
    if (!currentPassword.trim()) {
      Alert.alert("Current Password Required", "Current password cannot be empty.");
      return;
    }

    // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      Alert.alert("Password Mismatch", "New password and confirm password do not match.");
      return;
    }

    // Check if the new password length is between 8 and 20 characters
    if (newPassword.length < 8 || newPassword.length > 20) {
      Alert.alert("Invalid Password", "Password length must be between 8 and 20 characters.");
      return;
    }

    // Check for alphanumeric criteria
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    if (!hasLetter || !hasNumber) {
      Alert.alert("Invalid Password", "Password should be alphanumeric.");
      return;
    }

    // Optional: Check for special characters (if needed)
    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharacterPattern.test(newPassword)) {
      console.log("Password contains special characters.");
    }

    try {
      const bearerToken = await AsyncStorage.getItem('token');
      const customerId = await AsyncStorage.getItem('customerId');

      if (bearerToken && customerId) {
        const encryptedNewPassword = encrypt(newPassword);
        const encryptedOldPassword = encrypt(currentPassword);

        const payload = {
          newPassword: encryptedNewPassword,
          oldPassword: encryptedOldPassword
        };

        const response = await axios.post(`${API_BASE_URL}/v1/settings/changePassword?customerId=${customerId}`, payload, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        });

        const dto = response.data;

        if (dto && dto.success) {
          Alert.alert("Success", "Password changed successfully.");
          navigation.goBack();
        } else {
          if (dto.message) {
            Alert.alert('Error', dto.message);
          } else if (dto.errors && dto.errors.length > 0) {
            Alert.alert('Error', dto.errors.join('\n'));
          }
        }
      } else {
        Alert.alert('Error', 'Unexpected error occurred. Try again later!');
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          Alert.alert('Error', 'Server timed out. Try again later!');
        } else if (statusCode === 503) {
          Alert.alert('Error', 'Service unavailable. Please try again later.');
        } else if (statusCode === 400) {
          Alert.alert('Error', error.response.data.data.errors[0]);
        } else {
          Alert.alert('Error', error.message);
        }
      } else if (error.request) {
        Alert.alert('Error', 'No response from the server. Please check your connection.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };




  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc]">
      <ScrollView>
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
              Change Password
            </Text>
          </View>
        </View>
        <View className="w-full mt-5 px-4">
          <Text className="text-lg font-semibold text-gray-800">
            Change Password
          </Text>
          <Text className="text-sm font-semibold text-gray-400 mt-2">
            To change your password please submit the following information:
          </Text>
          <Text className="text-sm font-semibold text-gray-600 mt-2">
            Password Criteria:
          </Text>
          <Text className="text-sm font-semibold text-gray-400 mt-1 pl-4">
            1. Password should be alphanumeric
          </Text>
          <Text className="text-sm font-semibold text-gray-400 mt-1 pl-4">
            2. Password length must be between 8 and 20 characters long
          </Text>
        </View>
        <View className="flex flex-col px-8 py-7 mt-4 bg-white rounded-xl shadow-lg max-w-md">
          <View className="mt-1">
            <Text className="text-sm font-medium text-zinc-600">
              Current Password
            </Text>
            <InputWithIcon
              placeholder="Enter your current password"
              isPassword
              value={currentPassword}
              onChange={setCurrentPassword}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View className="mt-6">
            <Text className="text-sm font-medium text-zinc-600">
              New Password
            </Text>
            <InputWithIcon
              placeholder="Enter new password"
              value={newPassword}
              onChange={setNewPassword}
              isPassword
            />
          </View>
          <View className="mt-6">
            <Text className="text-sm font-medium text-zinc-600">
              Confirm Password
            </Text>
            <InputWithIcon
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              isPassword
            />
          </View>
        </View>
        <View className="p-5">
          <Button
            text="Confirm"
            width="w-[100%]"
            styles="mb-4 py-4"
            onPress={handleChangePassword}
          />
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};


export default ChangePassword;
