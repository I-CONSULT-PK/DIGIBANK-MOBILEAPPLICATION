import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Color } from "../../../GlobalStyles";
import API_BASE_URL from "../../../config";

// Define menu items
const menuItems = [
  { title: "Person Management", icon: "person" },
  { title: "Transfer", icon: "swap-horizontal" },
  { title: "Scan to Pay", icon: "qr-code" },
  { title: "Utilities", icon: "cog" },
  { title: "Quick Loan", icon: "cash" },
  { title: "Statement", icon: "document-text" },
  { title: "Self Top-Up", icon: "cash" },
  { title: "Locator", icon: "location-outline" },
  { title: "Contact Us", icon: "chatbubbles-outline" },
  { title: "Refer", icon: "people" },
  { title: "Logout", icon: "log-out" },
];

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      if (!bearerToken) {
        Alert.alert("Error", "Authentication token not found");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/v1/customer/fetchUserDetails?userId=190`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setUserDetails({
          firstName: response.data.data.firstName || "User",
          lastName: response.data.data.lastName || "Name",
          accountNumber: response.data.data.accountNumber || "N/A",
          accountType: response.data.data.accountType || "N/A",
        });
      } else {
        Alert.alert("Error", "Unexpected response format");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        const statusCode = error.response.status;

        if (statusCode === 400) {
          // Bad Request
          const message = error.response.data.message || "Bad request";
          Alert.alert("Error", `Bad Request: ${message}`);
        } else if (statusCode === 401) {
          // Unauthorized
          Alert.alert(
            "Error",
            "Unauthorized: Please check your authentication token"
          );
        } else if (statusCode === 403) {
          // Forbidden
          Alert.alert(
            "Error",
            "Forbidden: You do not have permission to access this resource"
          );
        } else if (statusCode === 404) {
          // Not Found
          Alert.alert(
            "Error",
            "Not Found: The requested resource could not be found"
          );
        } else if (statusCode === 500) {
          // Internal Server Error
          Alert.alert(
            "Error",
            "Server Error: Something went wrong on the server"
          );
        } else {
          // Other status codes
          Alert.alert("Error", `Error ${statusCode}: ${error.message}`);
        }
      } else if (error.request) {
        // Request was made but no response was received
        Alert.alert(
          "Error",
          "No response from the server. Please check your connection."
        );
      } else {
        // Something happened while setting up the request
        Alert.alert("Error", `Error: ${error.message}`);
      }
    }
  };

  const handlePress = async (item) => {
    if (item.title === "Logout") {
      try {
        // Retrieve and log all keys and their values
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);

        console.log("Local Storage before clearing:");
        items.forEach(([key, value]) => {
          console.log(`Key: ${key}, Value: ${value}`);
        });

        // Clear local storage
        await AsyncStorage.clear();

        // Log clear confirmation
        console.log("Local Storage has been cleared.");

        navigation.navigate("Login");
      } catch (error) {
        console.error("Error clearing storage", error);
      }
    } else {
      console.log(item.title);
    }
  };

  // Handle copying text to clipboard

  return (
    <SafeAreaView className="h-full bg-[#f9fafc]">
      <ScrollView>
        <View className="py-5 px-5 border-b border-gray-300">
          <Text className="text-slate-500 text-lg mb-0">Welcome</Text>
          <View className="flex-row items-center justify-between">
            <Text className="font-bold text-2xl mb-0">
              {`${userDetails.firstName || ""} ${
                userDetails.lastName || ""
              }`.trim() || "User"}
            </Text>
            <Entypo
              name="chevron-right"
              size={20}
              style={{ color: Color.PrimaryWebOrient }}
            />
          </View>
          <View className="flex flex-row items-center py-1 ">
            <Text className=" mb-0" style={{ color: Color.PrimaryWebOrient }}>
              A/C No: {userDetails.accountNumber || "N/A"}
            </Text>
            <TouchableOpacity>
              <Ionicons
                name="copy"
                size={20}
                style={[styles.icon, { color: "black" }]}
              />
            </TouchableOpacity>
          </View>
          <Text className="text-slate-500 mb-0">
            {userDetails.accountType || "N/A"}
          </Text>
        </View>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            className="flex flex-row items-center py-3.5 px-5"
            key={index}
            onPress={() => handlePress(item)}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={Color.Text}
              style={styles.icon}
            />
            <Text className="flex-1 text-md">{item.title}</Text>
            <Entypo
              name="chevron-right"
              size={24}
              style={{ color: Color.PrimaryWebOrient }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  icon: {
    marginHorizontal: 10,
    color: Color.PrimaryWebOrient,
  },
});

export default Sidebar;
