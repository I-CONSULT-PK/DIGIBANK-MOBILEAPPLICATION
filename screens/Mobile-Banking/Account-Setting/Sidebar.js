import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Clipboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color } from "../../../GlobalStyles";

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
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    accountType: "",
  });

  const navigation = useNavigation();

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const firstName = (await AsyncStorage.getItem("firstName")) || "User";
        const lastName = (await AsyncStorage.getItem("lastName")) || "Name";
        const accountNumber =
          (await AsyncStorage.getItem("accountNumber")) || "1234567890";
        const accountType =
          (await AsyncStorage.getItem("accountType")) || "Checking";

        setUserDetails({
          firstName,
          lastName,
          accountNumber,
          accountType,
        });
      } catch (error) {
        console.error("Error loading user details from AsyncStorage", error);
      }
    };

    loadUserDetails();
  }, []);

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
