import React, { useState, useContext,useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  TextInput,
  Modal,
  Image,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Input from "../../components/TextInput";
import InputWithIcon from "../../components/TextInputWithIcon";
import MainImage from "../../assets/Images/MainImage.svg";
import { Color } from "../../GlobalStyles";
import { Entypo } from "@expo/vector-icons";
import CustomButton from "../../components/Button";
import { AppLoaderContext } from "../../components/LoaderHOC";
import PinCode from "./PinCode";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import API_BASE_URL from '../../config';
import * as LocalAuthentication from 'expo-local-authentication'; // Import for Expo
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'; // If you are using UUID for visitor ID generation
 
const Login = ({ navigation }) => {
  
  const [selectedOption, setSelectedOption] = useState("mobile");
  const sw = Dimensions.get("screen").width;
  const sh = Dimensions.get("screen").height;
  const [emailorUsername, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showLoader, hideLoader } = useContext(AppLoaderContext);
  const [pinCodeModalVisible, setPinCodeModalVisible] = useState(false);
  // const handleLogin = async () => {
  //   // // New Work
  //   // // Validate email and password
  //   // if (!emailorUsername || !password) {
  //   //   Alert.alert("Validation Error", "Please enter both email and password");
  //   //   return;
  //   // }
 
  //   // try {
  //   //   const apiUrl = "http://192.168.0.196:9096/v1/customer/login";
  //   //   showLoader();
  //   //   const response = await fetch(apiUrl, {
  //   //     method: "POST",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     body: JSON.stringify({
  //   //       emailorUsername,
  //   //       password,
  //   //     }),
  //   //   });
 
  //   //   const data = await response.json();
 
  //   //   if (response.ok && data.success) {
  //   //     // Successful login
  //   //     console.log("Login successful", data);
 
  //   //     // Navigate to the next screen
  //   // navigation.navigate("OTP");
  //   //   } else {
  //   //     // Failed login, display error message
  //   //     Alert.alert(
  //   //       "Login Failed",
  //   //       data.message || "Invalid email or password"
  //   //     );
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Login error", error.message);
  //   //   Alert.alert("Error", "An error occurred. Please try again later.");
  //   // } finally {
  //   //   // Hide loader
  //   //   hideLoader();
  //   // }
  //   setPinCodeModalVisible(true);
  // };
 
  // --------------------------------------------------
 
  const [form, setForm] = useState({ username: '', password: '' });
 
  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
 
  const handleLogin = async () => {
    if (form.username === '' || form.password === '') {
      Alert.alert('Error', 'Username and password cannot be null');
      return;
    }
  
    const loginData = {
      emailorUsername: form.username,
      password: form.password
    };
  
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/customer/login`, loginData, { timeout: 10000 });
      const dto = response.data;
  
      if (dto && dto.success && dto.data && dto.data.customerId) {
        const customerId = dto.data.customerId.toString();
        const token = dto.data.token.toString();
        const expirationTime = dto.data.expirationTime.toString();
  
        await AsyncStorage.setItem('customerId', customerId);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('expirationTime', expirationTime);
  
        navigation.navigate('Home');
      } else {
        const message = dto.message || (dto.errors && dto.errors.length > 0 ? dto.errors.join(", ") : "Unknown error");
        Alert.alert('Error', message);
      }
    } catch (error) {
      console.error("Login error:", error); // Log detailed error
  
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message || error.message;
  
        if (statusCode === 404) {
          Alert.alert('Error', 'Server timed out. Try again later!');
        } else if (statusCode === 503) {
          Alert.alert('Error', 'Service unavailable. Please try again later.');
        } else if (statusCode === 400) {
          Alert.alert('Error', errorMessage);
        } else {
          Alert.alert('Error', 'An unexpected error occurred: ' + errorMessage);
        }
      } else if (error.request) {
        // Request was made but no response received
        Alert.alert('Error', 'No response from the server. Please check your connection.');
      } else {
        // Something went wrong in setting up the request
        Alert.alert('Error', 'Error setting up request: ' + error.message);
      }
    }
  };
  
  
 
  const securityImages1 = [
    require('../../assets/security-img-1.png'),
    require('../../assets/security-img-2.png'),
    require('../../assets/security-img-3.png'),
    require('../../assets/security-img-4.png'),
    require('../../assets/security-img-5.png'),
  ];
 
  const securityImages2 = [
    require('../../assets/security-img-6.png'),
    require('../../assets/security-img-7.png'),
    require('../../assets/security-img-8.png'),
    require('../../assets/security-img-9.png'),
    require('../../assets/security-img-10.png'),
  ];

    const [isEnabled, setIsEnabled] = useState(false);
    const [biometricData, setBiometricData] = useState(null);
    const [visitorId, setVisitorId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    
  
    useEffect(() => {
      const checkBiometricSupport = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
 
        // if (!hasHardware) {
        //   Alert.alert(
        //     "Error",
        //     "Biometric authentication is not available on this device."
        //   );
        // } else if (!isEnrolled) {
        //   Alert.alert(
        //     "Error",
        //     "No biometric authentication is set up on this device."
        //   );
        // }
      };
  
      checkBiometricSupport();
    }, []);
  const handlePress = async () => {
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

          navigation.navigate('Home');
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
    <SafeAreaView className="h-full flex-1">
      <LinearGradient
        colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row items-center p-4 mt-2">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-semibold text-lg ml-4 font-InterSemiBold">
              Login
            </Text>
          </View>

          <View className="flex-1 bg-white mt-2 rounded-t-[30px] px-7 pt-7 shadow-2xl">
            <View className="flex-1 justify-between">
              <View>
                <View className="mb-8 w-[80%]">
                  <Text className="text-2xl font-bold leading-8 font-InterBold">
                    Get started with DigiBank!
                  </Text>
                </View>

                <View>
                  <View>
                    <Text className="text-sm mb-2 font-InterMedium">
                      User Name*
                    </Text>
                    <Input
                      placeholder="Enter your username"
                      value={form.username}
                      onChange={(text) => handleChange("username", text)}
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <View className="items-end mt-2">
                      <TouchableOpacity
                        onPress={() => navigation.navigate("ForgetUserName")}
                      >
                        <Text
                          className="text-xs underline font-InterSemiBold"
                          style={{ color: Color.PrimaryWebOrientTxtColor }}
                        >
                          Forgot Username?
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="mt-1 mb-4">
                    <Text className="text-sm mb-2 font-InterMedium">
                      Password*
                    </Text>
                    <InputWithIcon
                      placeholder="Enter your password"
                      isPassword
                      value={form.password}
                      onChange={(text) => handleChange("password", text)}
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <View className="items-end mt-2">
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("ForgetPassword", {
                            source: "password",
                          })
                        }
                      >
                        <Text
                          className="text-xs underline font-InterSemiBold"
                          style={{ color: Color.PrimaryWebOrientTxtColor }}
                        >
                          Forgot Password?
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* -----| Security Image Start |----- */}

              {/* <View className="-top-2">
                  <Text className="text-center font-medium text-sm mb-4 font-InterMedium">Select Security Image</Text>
 
                  <View className="flex-row justify-around items-center">
                    {securityImages1.map((image, index) => (
                      <TouchableOpacity
                        key={index}
                        className="p-3 rounded shadow-md shadow-slate-600 justify-center items-center bg-white"
                      >
                        <Image
                          source={image}
                          resizeMode="contain"
                          className="w-6 h-6"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
 
                  <View className="flex-row justify-around items-center mt-3.5">
                    {securityImages2.map((image, index) => (
                      <TouchableOpacity
                        key={index}
                        className="p-3 rounded shadow-md shadow-slate-600 justify-center items-center bg-white"
                      >
                        <Image
                          source={image}
                          resizeMode="contain"
                          className="w-6 h-6"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View> */}

              {/* -----| Security Image End |----- */}

              <View className="mb-2">
                <CustomButton
                  text="Login"
                  width="w-[100%]"
                  styles="mb-4 py-4"
                  // onPress={handleLogin}
                  onPress={() => navigation.navigate("Home")}
                />

                <View className="flex-row justify-center">
                  <Text className="text-sm font-InterRegular">
                    Don't have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    <Text
                      className="text-sm font-InterSemiBold"
                      style={{ color: Color.PrimaryWebOrientTxtColor }}
                    >
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Centered Touch ID and Face ID buttons */}
              <View className="flex justify-center items-center ">
                <View className="flex flex-row space-x-4">
                  {/* Touch ID Button */}
                  <TouchableOpacity
                    className="flex flex-col items-center"
                    onPress={handlePress}
                  >
                    <View className="bg-[#1DBBD8] p-4 rounded-lg">
                      <Image
                        source={require("../../assets/finger-icon.png")}
                        className="h-12 w-12"
                      />
                    </View>
                    <Text className="mt-2 mb-4 text-center font-sm ">
                      Login with Touch ID
                    </Text>
                  </TouchableOpacity>

                  {/* Face ID Button */}
                  <TouchableOpacity
                    className="flex flex-col items-center"
                    onPress={() => setModalVisible(true)}
                  >
                    <View className="bg-[#1DBBD8] p-4 rounded-lg">
                      <Image
                        source={require("../../assets/Face Icon.png")}
                        className="h-12 w-12"
                      />
                    </View>
                    <Text className="mt-2  mb-4 text-center font-sm">
                      Login with Face ID
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <View className="bg-white p-5 rounded-lg w-11/12 max-w-xs justify-center items-center ">
            <Image
              source={require("../../assets/alerrt-icon.png")} 
              className="w-16 h-14 mb-4"
            />
            <Text className="text-lg font-bold mb-2">Alert Notification</Text>
            <Text className="text-center text-gray-500 mb-6">
              Your device is not configured for Face ID. Please configure it
              from settings.
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="flex-1 bg-white border border-gray-300 rounded-lg py-2 mr-2 items-center justify-center"
              >
                <Text className="text-center text-black text-base">Cancel</Text>
              </TouchableOpacity>
              <CustomButton
                text="Ok"
                onPress={() => {
                  setModalVisible(false);
                }}
                width="w-32"
                backgroundColor="#1D4ED8"
                textColor="#FFF"
                fontSize="text-sm"
                styles="mr-4"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  loader: {
    width: wp("20%"),
    height: wp("20%"),
  },
});
 
export default Login;
 