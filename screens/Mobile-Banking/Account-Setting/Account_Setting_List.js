import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import CustomModal from "../../../components/CustomModal";
import Footer from "../../../components/Footer";
import axios from "axios";
import * as Application from "expo-application";
import API_BASE_URL from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const { width } = Dimensions.get("window");

const Account_Setting_List = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const options = [
    { id: 1, title: "Add Account", image: require("../../../assets/Add Account.png"), link: "Add_Account" },
    { id: 2, title: "Manage Login PIN", image: require("../../../assets/Change login pin.png"), link: "ManageLoginPin" },
    { id: 3, title: "Change Password", image: require("../../../assets/Change Password.png"), link: "ChangePassword" },
    { id: 4, title: "Limit Management", image: require("../../../assets/Limit Management.png"), link: "LimitManagement" },
    { id: 5, title: "OTP Preference", image: require("../../../assets/OTP Preference.png"), link: "OTP_Preference" },
    { id: 6, title: "User Activity", image: require("../../../assets/User Activity.png"), link: "UserActivity" },
    { id: 7, title: "Update Profile", image: require("../../../assets/Update Profile.png"), link: "Update_Profile" },
    { id: 8, title: "Change Login PIN", image: require("../../../assets/Change login pin.png"), link: "ChangeLoginPin" },
    { id: 9, title: "De-Activate PIN", image: require("../../../assets/De-Activate Login PIN.png"), link: "DeactivatePin" },
    { id: 10, title: "Enable Biometric", image: require("../../../assets/Bio Registration.png") },
  ];

  const handleManageLoginPin = async () => {
    const deviceId = (await Application.getAndroidId()) || (await Application.getIosIdForVendorAsync());

    try {
      const response = await axios.post(`${API_BASE_URL}/devices/fetchDeviceRegister`, { unique: deviceId });
      
      if (response.data) {
        if (response.data.success) {
          if (response.data.hasCreatedPin) {
            Alert.alert("PIN Status", "A PIN already exists.");
          } else {
            Alert.alert("PIN Status", "No PIN exists.");
          }
        } else {
          // Navigate to ManageLoginPin if response indicates failure
          Alert.alert("Error", "Navigating to Manage Login PIN due to failure.");
          navigation.navigate("ManageLoginPin");
        }
      } else {
        Alert.alert("Error", "No data returned from the server.");
      }
    } catch (error) {
      console.error("Error fetching device data:", error);

      if (error.response) {
        // Check for specific status codes
        if (error.response.status === 404) {
          navigation.navigate("ManageLoginPin");
        } else {
          const errorMessage = error.response.data.message || "Failed to fetch device information.";
          Alert.alert("Error", errorMessage);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        Alert.alert("Error", "No response received from the server.");
      } else {
        console.error("Error:", error.message);
        Alert.alert("Error", "An error occurred while setting up the request.");
      }
    }
  };

  const handleEnableBiometric = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!compatible) {
      Alert.alert("Error", "This device does not support biometric authentication.");
      return;
    }

    if (!isEnrolled) {
      Alert.alert("Error", "No biometrics are enrolled on this device.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to enable biometric",
      fallbackLabel: "Use Passcode",
    });

    if (result.success) {
      try {
        await AsyncStorage.setItem("enableBio", 'true');
        Alert.alert("Success", "Biometric authentication enabled.");
      } catch (error) {
        console.error("Error saving preference:", error);
        Alert.alert("Error", "Failed to save preference.");
      }
    } else {
      Alert.alert("Error", "Biometric authentication failed.");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <View className="h-24" style={{ backgroundColor: Color.PrimaryWebOrient }}>
          <View className="flex-row items-center justify-center h-full">
            <TouchableOpacity onPress={() => navigation.navigate("Home")} className="absolute left-5">
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Settings</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 mt-2">
            <View className="flex-row flex-wrap justify-center">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={
                    option.title === "Enable Biometric"
                      ? handleEnableBiometric
                      : option.link === "ManageLoginPin"
                      ? handleManageLoginPin
                      : () => navigation.navigate(option.link)
                  }
                  className="p-2"
                  style={{ width: (width - 16 * 1.2) / 2 }}
                >
                  <View className="bg-white rounded-lg p-2 shadow-lg shadow-slate-400 flex-row items-center h-[55px]">
                    <Image source={option.image} className="w-8 h-8 mr-2" resizeMode="contain" />
                    <Text className="text-[12px] font-normal flex-shrink flex-grow w-36">{option.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer />
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Enable Biometric"
        message="Do you want to enable your fingerprint?"
        onConfirm={() => {
          setModalVisible(false);
          navigation.navigate("Home");
        }}
        confirmText="Yes"
        cancelText="No"
      />
    </SafeAreaView>
  );
};

export default Account_Setting_List;
