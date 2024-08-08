import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const FingerprintScreen = () => {
  const [fingerprintSupported, setFingerprintSupported] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkForFingerprint();
  }, []);

  const checkForFingerprint = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (hasHardware && isEnrolled) {
        setFingerprintSupported(true);
      } else {
        Alert.alert("Fingerprint not available", "Please set up fingerprint authentication on your device.");
      }
    } catch (error) {
      console.error("Error checking fingerprint support", error);
    }
  };

  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate",
        fallbackLabel: "Use Pin",
      });
      if (result.success) {
        saveVisitorInfo();
      } else {
        Alert.alert("Authentication failed", "Please try again.");
      }
    } catch (error) {
      console.error("Error during authentication", error);
    }
  };

  const saveVisitorInfo = async () => {
    try {
      const visitorId = "visitor123";
      const deviceInfo = {
        model: "Device Model",
        os: "OS Version",
      };

      await AsyncStorage.setItem('visitorId', visitorId);
      await AsyncStorage.setItem('deviceInfo', JSON.stringify(deviceInfo));

      console.log("Visitor ID:", visitorId);
      console.log("Device Info:", deviceInfo);
    } catch (error) {
      console.error("Error saving visitor info", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* Your FingerprintScreen content */}
      <Text className="text-lg font-bold">Fingerprint Authentication</Text>
      <TouchableOpacity
        className="mt-4 p-4 bg-blue-500 rounded"
        onPress={authenticate}
      >
        <Text className="text-white text-center">Authenticate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FingerprintScreen;
