import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Clipboard,
  I18nManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color } from "../../../GlobalStyles";

// Import translation and icon mapping files
import { enData } from "./translations/en";
import { urData } from "./translations/ur";

// Define your language options
const languageOptions = {
  en: "English",
  ur: "اردو",
  // Add more languages here
};

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    accountType: "",
  });
  const [language, setLanguage] = useState("en");

  const navigation = useNavigation();

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const firstName = (await AsyncStorage.getItem("firstName")) || "User";
        const lastName = (await AsyncStorage.getItem("lastName")) || "Name";
        const accountNumber =
          (await AsyncStorage.getItem("accountNumber")) || "1234567890";
        const accountType =
          (await AsyncStorage.getItem("accountType")) || "N/A";

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

  const handleLanguageSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    I18nManager.forceRTL(selectedLanguage === "ur");
  };

  const handlePress = async (item) => {
    const logoutTitle = language === "en"
      ? enData.translations.menuItems.find(menuItem => menuItem.title === "Logout").title
      : urData.translations.menuItems.find(menuItem => menuItem.title === "لاگ آؤٹ").title;

    if (item.title === logoutTitle) {
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
    } else if (item.title === translations.menuItems.find(menuItem => menuItem.title === "Change Language").title) {
      // Navigate to the SelectLanguage screen
      navigation.navigate("SelectLanguage");
    } else {
      console.log(item.title);
    }
  };

  // Select translations and icon mappings based on current language
  const { translations, iconMapping } = language === "en" ? enData : urData;
  const menuItems = translations.menuItems;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="px-5 border-b border-gray-300">
          <View
            className={`flex-row items-center justify-between ${
              I18nManager.isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Text
              className={`text-gray-500 text-lg flex-1 ${
                I18nManager.isRTL ? "text-right" : "text-left"
              }`}
            >
              {translations.welcome}
            </Text>
          </View>

          <View
            className={`flex-row items-center justify-between ${
              I18nManager.isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Text className="font-bold text-2xl mb-1">
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
          <View className="flex flex-row items-center py-1">
            <Text className=" mb-0" style={{ color: Color.PrimaryWebOrient }}>
              A/C No: {userDetails.accountNumber || "N/A"}
            </Text>
            <TouchableOpacity onPress={() => Clipboard.setString(userDetails.accountNumber)}>
              <View className="ml-3 text-black">
                <Ionicons name="copy" size={20} />
              </View>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-500">
            {userDetails.accountType || "N/A"}
          </Text>
          <View
            className={`flex-row items-center justify-center mb-4 ${
              I18nManager.isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {Object.keys(languageOptions).map((lang) => (
              <TouchableOpacity
                key={lang}
                className={`p-3 mt-3 ${
                  language === lang ? "bg-primary" : "bg-white"
                } rounded-l-lg flex-1`}
                onPress={() => handleLanguageSelect(lang)}
                style={{
                  width: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: language === lang ? "white" : "black",
                  }}
                >
                  {languageOptions[lang]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            className={`flex-row items-center py-3 px-5 ${
              I18nManager.isRTL ? "flex-row-reverse" : ""
            }`}
            key={index}
            onPress={() => handlePress(item)}
          >
            <Ionicons
              name={iconMapping[item.icon]}
              size={24}
              color={Color.Text}
              style={{ marginHorizontal: 10, color: Color.PrimaryWebOrient }}
            />
            <Text className="text-md flex-1">{item.title}</Text>
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

export default Sidebar;
