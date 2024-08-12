import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  Switch,
} from "react-native";
import Input from "../../components/TextInput";
import InputWithIcon from "../../components/TextInputWithIcon";
import { Controller, useForm } from "react-hook-form";
import { Color } from "../../GlobalStyles";
import LoaderComponent from "../../components/LoaderComponent";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppLoaderContext } from "../../components/LoaderHOC";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import API_BASE_URL from "../../config";
import * as LocalAuthentication from "expo-local-authentication";
import * as Device from "expo-device";
import { Entypo } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";


const Registration = ({ route }) => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useContext(AppLoaderContext);

  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginPress = () => {
    // Display loader
    showLoader();
    setIsLoading(true);

    // Simulate login process
    setTimeout(async () => {
      // Hide loader
      hideLoader();
      setIsLoading(false);

      navigation.navigate("OTP", {
        userEmail: await AsyncStorage.getItem("userEmail"),
        userNumber: await AsyncStorage.getItem("userMobileNumber"),
      });
    }, 5000);
  };

  // --------------------------------------

  const {
    source,
    email,
    mobileNumber,
    cnic,
    accountNumber,
    firstName,
    lastName,
  } = route.params || {};

  const [main, setMain] = useState(true);
  const [initialForm, setInitialForm] = useState({
    cnic: "",
    mobile: "",
    accountNumber: "",
  });
  const [returnedData, setReturnedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [finalForm, setFinalForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      setMain(true);
    }, [])
  );

  const handleChange = (name, value, setState) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNumericChange = (name, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    handleChange(name, numericValue);
  };

  const handleNext = async () => {
    if (
      initialForm.cnic === "" ||
      initialForm.mobile === "" ||
      initialForm.accountNumber === ""
    ) {
      Alert.alert("Error", "Please enter all the fields");
    } else {
      const registrationData = {
        globalId: {
          cnicNumber: initialForm.cnic,
        },
        account: {
          accountNumber: initialForm.accountNumber,
        },
        customer: {
          mobileNumber: initialForm.mobile,
        },
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/v1/customer/signup`,
          registrationData
        );
        const dto = response.data;

        if (dto && dto.success && dto.data) {
          setReturnedData({
            firstName: dto.data.customer.firstName,
            lastName: dto.data.customer.lastName,
            email: dto.data.email,
          });

          setMain(false);
        } else {
          if (dto.message) {
            Alert.alert("Error", dto.message);
          } else if (dto.errors && dto.errors.length > 0) {
            Alert.alert("Error", dto.errors);
          }
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
    }
  };

  const handleOTP = async () => {
    if (initialForm.mobile === "" || returnedData.email === "") {
      Alert.alert("Error", "Unexpected error occured. Try again later");
    } else {
      const otpData = {
        mobileNumber: initialForm.mobile,
        email: returnedData.email,
        reason: "fund transfer",
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/v1/otp/createOTP`,
          otpData
        );
        const dto = response.data;

        if (dto && dto.success && dto.data) {
          navigation.navigate("OTP_Signup", {
            source: "registration",
            email: returnedData.email,
            mobileNumber: initialForm.mobile,
            cnic: initialForm.cnic,
            accountNumber: initialForm.accountNumber,
            firstName: returnedData.firstName,
            lastName: returnedData.lastName,
          });
        } else {
          if (dto.message) {
            Alert.alert("Error", dto.message);
          } else if (dto.errors && dto.errors.length > 0) {
            Alert.alert("Error", dto.error);
          }
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
    }
  };

  const handleRegister = async () => {
    if (
      finalForm.username === "" ||
      finalForm.password === "" ||
      finalForm.confirmPassword === ""
    ) {
      Alert.alert("Error", "Please enter all the fields");
    } else {
      if (finalForm.password !== finalForm.confirmPassword) {
        Alert.alert("Error", "Password do not match");
      } else {
        const userData = {
          mobileNumber: mobileNumber,
          firstName: firstName,
          lastName: lastName,
          cnic: cnic,
          email: email,
          userName: finalForm.username,
          password: finalForm.password,
          status: "00",
          device: {
            pinHash: "1234",
          },
          accountDto: {
            accountNumber: accountNumber,
          },
        };

        try {
          const response = await axios.post(
            `${API_BASE_URL}/api/devices/signUp`,
            userData
          );
          const dto = response.data;

          if (dto && dto.success && dto.data) {
            Alert.alert("Success", dto.message);

            setTimeout(() => {
              navigation.navigate("Login");
            }, 1000);
          } else {
            if (dto.message) {
              Alert.alert("Error", dto.message);
            } else if (dto.errors && dto.errors.length > 0) {
              Alert.alert("Error", dto.error);
            }
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
      }
    }
  };

  const handleBiometricAuth = async () => {
    try {
      // Check if hardware supports biometrics
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert(
          "Error",
          "Biometric authentication is not supported on this device."
        );
        return;
      }

      // Check if biometric records are enrolled
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        Alert.alert(
          "Error",
          "No biometric records found. Please set up biometrics in your device settings."
        );
        return;
      }

      // Authenticate with biometrics
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Biometrics",
        fallbackLabel: "Enter Passcode",
      });

      if (result.success) {
        Alert.alert("Success", "Biometric authentication successful.");
        await axios.post(`${API_BASE_URL}/api/devices/biometricAuth`, {
          userId: userId,
          authenticated: true,
        });
      } else {
        Alert.alert(
          "Error",
          "Biometric authentication failed. Please try again."
        );
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const [biometricData, setBiometricData] = useState(null);
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware) {
        Alert.alert(
          "Error",
          "Biometric authentication is not available on this device."
        );
      } else if (!isEnrolled) {
        Alert.alert(
          "Error",
          "No biometric authentication is set up on this device."
        );
      }
    };

    checkBiometricSupport();
  }, []);
  
  const toggleSwitch = async () => {
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
          console.log("Biometric Data:");
          console.log("Brand:", Device.brand);
          console.log("Model Name:", Device.modelName);
          console.log("OS Name:", Device.osName);
          console.log("OS Version:", Device.osVersion);
          console.log("Visitor ID:", newVisitorId);
        } else {
          Alert.alert("Authentication failed", result.error);
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      setIsEnabled(false);
      setBiometricData(null);
      setVisitorId(null);

      // Remove the visitor ID from local storage
      await AsyncStorage.removeItem("visitorId");

      // Console log the biometric data reset
      console.log("Biometric Data Reset");
    }
  };

  return (
    <SafeAreaView className="h-full flex-1" style={{backgroundColor: Color.PrimaryWebOrient}}>
      <LinearGradient
        colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row items-center p-4 mt-2">
            <TouchableOpacity
              onPress={() => {
                setMain(true);
                main && navigation.goBack();
              }}
            >
              <Entypo name="chevron-left" size={22} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold ml-4 font-InterSemiBold">
              Register yourself
            </Text>
          </View>

          <View className="flex-1 bg-white mt-2 rounded-t-[30px] px-7 pt-7 shadow-2xl">
            {source === "OTP" ? (
              <View className="flex-1 justify-between">
                <View>
                  <View className="mb-8 w-[80%]">
                    <Text className="text-2xl font-bold font-InterBold">
                      Get started with your account!
                    </Text>
                  </View>

                  <View>
                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">
                        User Name*
                      </Text>
                      <Input
                        placeholder="Enter a username"
                        value={finalForm.username}
                        onChange={(text) =>
                          handleChange("username", text, setFinalForm)
                        }
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">
                        Password*
                      </Text>
                      <InputWithIcon
                        placeholder="Enter a password"
                        isPassword
                        value={finalForm.password}
                        onChange={(text) =>
                          handleChange("password", text, setFinalForm)
                        }
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>

                    <View className="mb-8">
                      <Text className="text-sm mb-2 font-InterMedium">
                        Confirm Password*
                      </Text>
                      <InputWithIcon
                        placeholder="Confirm your password"
                        isPassword
                        value={finalForm.confirmPassword}
                        onChange={(text) =>
                          handleChange("confirmPassword", text, setFinalForm)
                        }
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>
                    <View className="mb-8 d-flex flex-row">
                      <Text
                        className="text-lg font-InterMedium"
                        style={{ color: Color.PrimaryWebOrientTxtColor }}
                      >
                        Set Fingerprint
                      </Text>
                      <Switch
                        className="ml-auto"
                        trackColor={{ false: "#767577", true: "#1DBBD8" }}
                        thumbColor={isEnabled ? "#1DBBD8" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    </View>
                    {biometricData && (
                      <View>
                        <Text>Device Info:</Text>
                        <Text>Brand: {biometricData.brand}</Text>
                        <Text>Model: {biometricData.modelName}</Text>
                        <Text>OS: {biometricData.osName}</Text>
                        <Text>OS Version: {biometricData.osVersion}</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View className="mb-5">
                  <TouchableOpacity
                    className="py-4 rounded-lg mb-4"
                    style={{ backgroundColor: Color.PrimaryWebOrient }}
                    onPress={handleRegister}
                  >
                    <Text className="text-white text-base text-center font-medium font-InterSemiBold">
                      Sign up
                    </Text>
                  </TouchableOpacity>
                  <View className="flex-row justify-center">
                    <Text className="text-sm font-InterRegular">
                      Already have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text
                        className="text-sm font-InterSemiBold"
                        style={{ color: Color.PrimaryWebOrientTxtColor }}
                      >
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : main ? (
              <View className="flex-1 justify-between">
                <View>
                  <View className="mb-8 w-[80%]">
                    <Text className="text-2xl font-bold font-InterBold">
                      Get started with your account!
                    </Text>
                  </View>

                  <View>
                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">
                        CNIC Number*
                      </Text>
                      <Input
                        placeholder="Enter your CNIC"
                        value={initialForm.cnic}
                        onChange={(text) =>
                          handleChange("cnic", text, setInitialForm)
                        }
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>
                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">
                        Mobile Number*
                      </Text>
                      <Input
                        placeholder="Enter your mobile number"
                        value={initialForm.mobile}
                        onChange={(text) =>
                          handleChange("mobile", text, setInitialForm)
                        }
                        onSubmitEditing={Keyboard.dismiss}
                        keyboardType="numeric"
                      />
                    </View>
                    <View className="mb-6">
                      <Text className="text-sm mb-2 font-InterMedium">
                        Account Number*
                      </Text>
                      <Input
                        placeholder="Enter 14 digits Acc No."
                        value={initialForm.accountNumber}
                        onChange={(text) =>
                          handleChange("accountNumber", text, setInitialForm)
                        }
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>
                    <View className="mb-7 d-flex flex-row items-center">
                      <Text
                        className="text-base font-InterMedium"
                        style={{ color: Color.PrimaryWebOrientTxtColor }}
                      >
                        Set Fingerprint
                      </Text>
                      <Switch
                        className="ml-auto"
                        trackColor={{ false: "#767577", true: "#1DBBD8" }}
                        thumbColor={isEnabled ? "#1DBBD8" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    </View>
                    {/* {biometricData && (
                      <View>
                        <Text>Device Info:</Text>
                        <Text>Brand: {biometricData.brand}</Text>
                        <Text>Model: {biometricData.modelName}</Text>
                        <Text>OS: {biometricData.osName}</Text>
                        <Text>OS Version: {biometricData.osVersion}</Text>
                      </View>
                    )} */}
                  </View>
                </View>

                <View className="mb-5">
                  <TouchableOpacity
                    className="py-4 rounded-lg mb-4"
                    style={{ backgroundColor: Color.PrimaryWebOrient }}
                    onPress={handleNext}
                  >
                    <Text className="text-white text-base text-center font-medium font-InterSemiBold">
                      Next
                    </Text>
                  </TouchableOpacity>

                  <View className="flex-row justify-center">
                    <Text className="text-sm font-InterRegular">
                      Already have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text
                        className="text-sm font-InterSemiBold"
                        style={{ color: Color.PrimaryWebOrientTxtColor }}
                      >
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View className="flex-1 justify-between">
                <View>
                  <View className="mb-8 w-[80%]">
                    <Text className="text-2xl font-bold font-InterBold">
                      Get started with your account!
                    </Text>
                  </View>

                  <View>
                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">
                        First Name*
                      </Text>
                      <Input value={returnedData.firstName} disable />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">
                        Last Name*
                      </Text>
                      <Input value={returnedData.lastName} disable />
                    </View>

                    <View className="mb-8">
                      <Text className="text-sm mb-2 font-InterMedium">
                        Email Address*
                      </Text>
                      <Input value={returnedData.email} disable />
                    </View>
                    <View className="mb-8 d-flex flex-row">
                      <Text
                        className="text-lg font-InterMedium"
                        style={{ color: Color.PrimaryWebOrientTxtColor }}
                      >
                        Set Fingerprint
                      </Text>
                      <Switch
                        className="ml-auto"
                        trackColor={{ false: "#767577", true: "#1DBBD8" }}
                        thumbColor={isEnabled ? "#1DBBD8" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    </View>
                    {/* {biometricData && (
                      <View>
                        <Text>Device Info:</Text>
                        <Text>Brand: {biometricData.brand}</Text>
                        <Text>Model: {biometricData.modelName}</Text>
                        <Text>OS: {biometricData.osName}</Text>
                        <Text>OS Version: {biometricData.osVersion}</Text>
                      </View>
                    )} */}
                    
                  </View>
                </View>

                <View className="mb-5">
                  <TouchableOpacity
                    className="py-4 rounded-lg mb-4"
                    style={{ backgroundColor: Color.PrimaryWebOrient }}
                    onPress={handleOTP}
                  >
                    <Text className="text-white text-base text-center font-medium font-InterSemiBold">
                      Next
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="py-4 rounded-lg mb-4"
                    style={{ backgroundColor: Color.PrimaryWebOrient }}
                  >
                    <Text className="text-white text-base text-center font-medium font-InterSemiBold">
                      Bio
                    </Text>
                  </TouchableOpacity>
                  <View className="flex-row justify-center">
                    <Text className="text-sm font-InterRegular">
                      Already have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text
                        className="text-sm font-InterSemiBold"
                        style={{ color: Color.PrimaryWebOrientTxtColor }}
                      >
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>

      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default Registration;
