import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Color } from "../../GlobalStyles";
import * as LocalAuthentication from "expo-local-authentication";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const RegisterFingerPrint = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [biometricData, setBiometricData] = useState(null);
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      //   if (!hasHardware) {
      //     Alert.alert(
      //       "Error",
      //       "Biometric authentication is not available on this device."
      //     );
      //   } else if (!isEnrolled) {
      //     Alert.alert(
      //       "Error",
      //       "No biometric authentication is set up on this device."
      //     );
      //   }
    };

    checkBiometricSupport();
  }, []);
  const enableBiometricAccess = async () => {
    if (!isEnabled) {
      try {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          const newVisitorId = uuidv4(); // Generate a new unique ID
          setVisitorId(newVisitorId); // Set the visitor ID in state

          // Store the visitor ID locally
          await AsyncStorage.setItem("visitorId", newVisitorId);

          setIsEnabled(true);
          setBiometricData({
            brand: Device.brand,
            modelName: Device.modelName,
            osName: Device.osName,
            osVersion: Device.osVersion,
            visitorId: newVisitorId,
          });

          // Console log the device and biometric info
          console.log("Biometric Data:", {
            brand: Device.brand,
            modelName: Device.modelName,
            osName: Device.osName,
            osVersion: Device.osVersion,
            visitorId: newVisitorId,
          });

          // Navigate to Login page after successful authentication
          navigation.navigate("Login");
        } else {
          Alert.alert("Authentication failed", result.error);
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <SafeAreaView className="h-full flex-1">
      <TouchableOpacity onPress={() => navigation.navigate("ChooseSecurity")}>
        <Entypo
          name="chevron-left"
          size={wp("8%")}
          color="#000"
          marginTop={hp("5%")}
        />
      </TouchableOpacity>
      <View className="flex-1 justify-between">
        <View className="flex-1 justify-center items-center -top-14">
          <Text className="text-2xl font-semibold text-center ">
            Enable biometric Access
          </Text>
          <Text className="text-base text-center mt-2 mb-4 px-8">
            Login quickly and securely with the fingerprint stored on this
            device.
          </Text>
          <Image
            source={require("../../assets/Shape.png")}
            resizeMode="contain"
            style={{ width: "45%", height: undefined, aspectRatio: 1 }}
            className="mt-4"
          />
          <View className=" mt-10 px-4">
            <Button
              text="Enable Biometric Access"
              width="w-[100%]"
              styles="px-5"
              onPress={enableBiometricAccess}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterFingerPrint;
