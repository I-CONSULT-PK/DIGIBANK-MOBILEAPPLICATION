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
    accountTitle: "",
    accountNumber: "",
    accountType: "",
  });
  const [language, setLanguage] = useState("en");

  const navigation = useNavigation();

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const accountTitle =
          (await AsyncStorage.getItem("accountTitle")) || "Name";
        const accountNumber =
          (await AsyncStorage.getItem("accountNumber")) || "1234567890";
        const accountType =
          (await AsyncStorage.getItem("accountType")) || "N/A";

        setUserDetails({
          accountTitle,
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
    const logoutTitle =
      language === "en"
        ? enData.translations.menuItems.find(
            (menuItem) => menuItem.title === "Logout"
          )?.title
        : urData.translations.menuItems.find(
            (menuItem) => menuItem.title === "لاگ آؤٹ"
          )?.title;

    if (item.title === logoutTitle) {
      try {
        // Retrieve all keys
        const keys = await AsyncStorage.getAllKeys();

        // Filter out the 'selectedMethod' key
        const keysToRemove = keys.filter((key) => key !== "otpDeliveryMethod");

        // Remove all keys except 'selectedMethod'
        await AsyncStorage.multiRemove(keysToRemove);

        // Navigate to Login
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error clearing storage", error);
      }
    } else if (
      item.title ===
      translations.menuItems.find(
        (menuItem) => menuItem.title === "Change Language"
      )?.title
    ) {
      // Navigate to the SelectLanguage screen
      navigation.navigate("SelectLanguage");
    } else if (
      item.title ===
      translations.menuItems.find(
        (menuItem) => menuItem.title === "Device Management"
      )?.title
    ) {
      // Navigate to the DeviceManagement screen
      navigation.navigate("DeviceManagement");
    } else {
    }
  };

  // Select translations and icon mappings based on current language
  const { translations, iconMapping } = language === "en" ? enData : urData;
  const menuItems = translations.menuItems;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#dcdcdc",
          }}
        >
          <View
            style={{
              flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "#a0a0a0",
                fontSize: 18,
                flex: 1,
                textAlign: I18nManager.isRTL ? "right" : "left",
              }}
            >
              {translations.welcome}
            </Text>
          </View>

          <View
            style={{
              flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 4 }}>
              {`${userDetails.accountTitle || ""} `.trim() || "User Name"}
            </Text>
            <Entypo
              name="chevron-right"
              size={20}
              color={Color.PrimaryWebOrient}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: Color.PrimaryWebOrient }}>
              A/C No: {userDetails.accountNumber || "N/A"}
            </Text>
            <TouchableOpacity
              onPress={() => Clipboard.setString(userDetails.accountNumber)}
            >
              <Ionicons name="copy" size={20} style={{ marginLeft: 12 }} />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "#a0a0a0" }}>
            {userDetails.accountType || "N/A"}
          </Text>
          <View
            style={{
              flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            {Object.keys(languageOptions).map((lang) => (
              <TouchableOpacity
                key={lang}
                style={{
                  padding: 12,
                  marginTop: 12,
                  backgroundColor:
                    language === lang ? Color.PrimaryWebOrient : "white",
                  borderRadius: 8,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 100,
                }}
                onPress={() => handleLanguageSelect(lang)}
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
            key={index}
            style={{
              flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}
            onPress={() => handlePress(item)}
          >
            <Ionicons
              name={iconMapping[item.icon]}
              size={24}
              color={Color.Text}
              style={{ marginHorizontal: 10, color: Color.PrimaryWebOrient }}
            />
            <Text style={{ fontSize: 16, flex: 1 }}>{item.title}</Text>
            <Entypo
              name="chevron-right"
              size={24}
              color={Color.PrimaryWebOrient}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sidebar;
