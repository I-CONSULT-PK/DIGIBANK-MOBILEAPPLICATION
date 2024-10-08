import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import Footer from "../../../components/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from "../../../config";

const Device_Management = () => {
  const navigation = useNavigation();
  const [device, setdevice] = useState([]);

  useEffect(() => {
    const fetchDeviceManagement = async () => {
      try {
        const bearerToken = await AsyncStorage.getItem("token");
        const customerId = await AsyncStorage.getItem("customerId");

        if (bearerToken) {
          const dto = await axios.get(
            `${API_BASE_URL}/api/devices/fetchDeviceRegister?customerId=${customerId}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );

          if (dto && dto.data.success && dto.data) {
            setdevice(dto.data.data);
          } else {
            if (dto.message) {
              Alert.alert("Error", dto.message);
            } else if (dto.errors && dto.errors.length > 0) {
              Alert.alert("Error", dto.errors);
            }
          }
        } else {
          Alert.alert("Error", "Unexpected error occurred. Try again later!");
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 404) {
            Alert.alert("Error", "Server timed out. Try again later!");
          } else if (statusCode === 503) {
            Alert.alert(
              "Error",
              "Service unavailable. Please try again later."
            );
          } else if (statusCode === 400) {
            Alert.alert("Error", error.response.data.data.errors[0]);
          } else {
            Alert.alert("Error", error.message);
          }
        } else if (error.request) {
          Alert.alert(
            "Error",
            "No response from the server. Please check your connection."
          );
        } else {
          Alert.alert("Error", error.message);
        }
      }
    };

    fetchDeviceManagement();
  }, []);

  const handleDeleteDevice = async (deviceId) => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      if (bearerToken) {
        const response = await axios.delete(
          `${API_BASE_URL}/api/devices/delete/${deviceId}`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        if (response.data.success) {
          Alert.alert("Success", "Device deleted successfully");
          setdevice((prevDevices) =>
            prevDevices.filter((device) => device.deviceId !== deviceId)
          );
        } else {
          Alert.alert("Error", response.data.message || "Failed to delete device");
        }
      } else {
        Alert.alert("Error", "Authorization failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete device. Try again later.");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        {/* Header Section */}
        <View
          className="h-24"
          style={{ backgroundColor: Color.PrimaryWebOrient }}
        >
          <View className="flex-row items-center justify-center h-full">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">
              Device Management
            </Text>
          </View>
        </View>
        <ScrollView>
          <View className="flex-1 p-4">
            {device
              .sort((a, b) => (a.pinStatus === "ACTIVE" ? -1 : 1)) // Sort devices to put "ACTIVE" devices first
              .map((item, index) => (
                <View key={index} className="mt-6">
                  <View className="w-full bg-white rounded-lg py-5 px-5 mt-4 shadow-md shadow-slate-400">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-[15px] font-InterRegular text-gray-500">
                        Device Status
                      </Text>
                      <Text
                        className={`text-[15px] font-InterSemiBold ${
                          item.pinStatus === "ACTIVE"
                            ? "text-cyan-500"
                            : "text-red-500"
                        }`}
                      >
                        {item.pinStatus}
                      </Text>
                    </View>

                    <View className="my-2.5">
                      <View className="border-t border-gray-300" />
                    </View>

                    <View className="flex-row justify-between items-center">
                      <Text className="text-[15px] font-InterRegular text-gray-500">
                        Device Name
                      </Text>
                      <Text className="text-[15px] font-InterSemiBold">
                        {item.deviceName ? item.deviceName : "Unknown"}
                      </Text>
                    </View>

                    <View className="my-2.5">
                      <View className="border-t border-gray-300" />
                    </View>

                    <View className="flex-row justify-between items-center">
                      <Text className="text-[15px] font-InterRegular text-gray-500">
                        Tagging Date
                      </Text>
                      <Text className="text-[15px] font-InterSemiBold">
                        {new Date(item.dateAndTime).toLocaleDateString()}
                      </Text>
                    </View>

                    {/* Show Delete button for INACTIVE devices */}
                    {item.pinStatus === "INACTIVE" && (
                      <TouchableOpacity
                        onPress={() => handleDeleteDevice(item.deviceId)}
                        className="mt-4 bg-[#ffb7b7] p-3 rounded-md"
                      >
                        <Text className="text-red-600 text-center font-bold">
                        Remove this device
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default Device_Management;
