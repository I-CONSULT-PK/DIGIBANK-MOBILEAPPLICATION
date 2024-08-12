import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import CustomButton from "../../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SetCardPin = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isPinComplete, setIsPinComplete] = useState(false);
  const [isConfirmationStage, setIsConfirmationStage] = useState(false);
  const [confirmationOtp, setConfirmationOtp] = useState(["", "", "",""]);
  const otpInputs = useRef([]);
  const initialOtpRef = useRef(["", "", "", ""]);  // Use ref to store the initial OTP

  useEffect(() => {
    // Focus the first input box when the stage changes
    if (otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, [isConfirmationStage]);

  const handleOtpChange = (index, value, isConfirmation = false) => {
    const targetOtp = isConfirmation ? confirmationOtp : otp;
    const setTargetOtp = isConfirmation ? setConfirmationOtp : setOtp;
    
    const newOtp = [...targetOtp];
    newOtp[index] = value;
    setTargetOtp(newOtp);

    // Check if the PIN is complete
    if (!isConfirmation) {
      setIsPinComplete(newOtp.every((digit) => digit !== ""));
    }

    // Move focus based on input
    if (value === "" && index > 0) {
      otpInputs.current[index - 1].focus();
    } else if (value !== "" && index < targetOtp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleNextPress = () => {
    if (isPinComplete) {
      setIsConfirmationStage(true);
      initialOtpRef.current = [...otp]; // Save the initial OTP
      setOtp(["", "", "", ""]); 
      setConfirmationOtp(["", "", "", ""]); 
    } else {
      Alert.alert("Error", "Please enter all digits of the PIN.");
    }
  };

  const handleConfirmPress = () => {
    // Debugging: Check values of OTPs
    console.log("Original PIN:", initialOtpRef.current.join(''));
    console.log("Confirmation PIN:", confirmationOtp.join(''));

    if (initialOtpRef.current.join('') === confirmationOtp.join('')) {
      navigation.navigate("CardActivated");
    } else {
      Alert.alert("Error", "PINs do not match. Please try again.");
    }
  };

  return (
    <SafeAreaView className="bg-[#f9fafc]" style={{ flex: 1 }}>
      <TouchableOpacity
        className="mt-8 ml-2"
        onPress={() => navigation.navigate("CardActivation")}
      >
        <Entypo name="chevron-left" size={30} color="#090909" />
      </TouchableOpacity>
      <Text className="text-2xl text-center  font-bold">
        Card Activation
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 16,
        }}
      >
        <View className="flex-1 justify-center items-center p-4 shadow-gray-100">
          <View
            className="bg-white p-6 rounded-lg shadow-lg w-full"
            style={styles.container}
          >
            <View className="flex justify-center items-center">
              <Image
                source={require("../../../assets/pin-icon.png")}
              
              />
              <Text className="font-semibold text-base text-center mt-2">
                {isConfirmationStage ? "Set up Card PIN" : "Set up Card PIN"}
              </Text>
              <Text className="font-semibold text-base text-center mt-2 text-cyan-500">
                Your card has been verified
              </Text>
              <View className="mt-6">
                <Text className="font-semibold text-base text-center text-gray-500">
                  {isConfirmationStage
                    ? "Re-enter your PIN"
                    : "Enter Your New PIN*"}
                </Text>
                <View className="flex flex-row items-center mt-2">
                  {(isConfirmationStage ? confirmationOtp : otp).map(
                    (digit, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => (otpInputs.current[index] = ref)}
                        className="border border-gray-300 rounded-xl text-lg text-center mx-1"
                        style={{
                          width: width * 0.14,
                          height: height * 0.08,
                          fontSize: 20,
                          borderRadius: 5,
                        }}
                        maxLength={1}
                        keyboardType="numeric"
                        value={digit}
                        onChangeText={(value) =>
                          handleOtpChange(index, value, isConfirmationStage)
                        }
                      />
                    )
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="p-7">
          {!isConfirmationStage ? (
            <CustomButton text={"Next"} onPress={handleNextPress} />
          ) : (
            <CustomButton text={"Confirm"} onPress={handleConfirmPress} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    elevation: 30,
  },
});

export default SetCardPin;
