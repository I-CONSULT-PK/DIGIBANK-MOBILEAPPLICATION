import React, { useRef, useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../GlobalStyles";
import * as LocalAuthentication from "expo-local-authentication";
import CustomButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const PinCode = ({ visible, onClose }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinInputs = useRef([]);
  const navigation = useNavigation();
  const checkBiometricAvailability = async () => {
    try {
      const biometricTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      return (
        biometricTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        ) ||
        biometricTypes.includes(
          LocalAuthentication.AuthenticationType.FINGERPRINT
        )
      );
    } catch (error) {
      console.error("Biometric authentication check failed:", error);
      return false;
    }
  };

  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value === "" && index > 0) {
      // Move forward
      pinInputs.current[index - 1].focus();
    } else if (value !== "" && index < pin.length - 1) {
      // Move backward
      pinInputs.current[index + 1].focus();
    }
  };
  const handleProceed = () => {
    navigation.navigate("OTP");
  };
  const handleForget = () => {
    navigation.navigate("ForgetPassword");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        className="flex flex-1 bg-black justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        {/* Modal content */}
        <View className="bg-white rounded-lg  m-5">
          <TouchableOpacity
            className="absolute top-5 right-5 z-10"
            onPress={onClose}
          >
            <Text
              className=" text-2xl"
              style={{ color: Color.PrimaryWebOrientTxtColor }}
            >
              ✕
            </Text>
          </TouchableOpacity>
          <View className="p-3 mt-12">
            <Text
              className="font-bold text-6xl text-center mb-3"
              style={{ color: Color.PrimaryWebOrientTxtColor }}
            >
              Zanbeel
            </Text>
            <Text className="text-center text-xl font-semibold">
              Enter your 4 digits Pin
            </Text>
            <View className="flex flex-row justify-center items-center mt-10">
              {pin.map((digit, index) => (
                <React.Fragment key={index}>
                  <TextInput
                    ref={(ref) => (pinInputs.current[index] = ref)}
                    className="h-16 w-16 border border-gray-300 rounded-xl border-2 text-center mr-5"
                    maxLength={1}
                    keyboardType="numeric"
                    value={digit}
                    onChangeText={(value) => handlePinChange(index, value)}
                  />
                </React.Fragment>
              ))}
            </View>
            <View className=" mt-10">
              <CustomButton text={"Proceed"} onPress={handleProceed} />
            </View>
            <View className="flex flex-row justify-between">
              <View>
                <CustomButton
                  className="rounded-2xl w-32 mt-6"
                  Text="Forget Pin"
                  onPress={handleForget}
                  style={{
                    backgroundColor: "white",
                    borderColor: Color.PrimaryWebOrient,
                    borderWidth: 1,
                  }}
                  labelStyle={{ color: Color.PrimaryWebOrient }}
                />
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity={1}
                  className="items-center rounded-lg p-4"
                  style={{ color: Color.PrimaryWebOrient }}
                  onPress={() =>
                    Alert.alert(
                      "Popup",
                      "Place your finger on your phone fingerprint sensor"
                    )
                  }
                >
                  <View
                    className="rounded-full w-16 h-16 flex justify-center items-center"
                    style={{ backgroundColor: "#f4f5f9" }}
                  >
                    <Entypo
                      name="fingerprint"
                      size={40}
                      style={{ color: Color.PrimaryWebOrientTxtColor }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PinCode;