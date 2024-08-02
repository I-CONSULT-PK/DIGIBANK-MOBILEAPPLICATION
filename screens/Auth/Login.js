
import React, { useState, useContext } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  TextInput,
  Image,
  KeyboardAvoidingView,
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

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import API_BASE_URL from '../../config';

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
    const loginData = {
      emailorUsername: form.username,
      password: form.password,
      imageVerificationId: 3
    };

    try {
      const response = await axios.post(`${API_BASE_URL.SITE}/v1/customer/login`, loginData);
      const { message, data } = response.data;

      if (message === 'Invalid Password or Security Image') {
        console.log('Message:', message);
        Alert.alert('Login Failed', 'Please check your credentials and try again.');
      }
      else {
        console.log('Message:', message);
        console.log('Data:', data);
        navigation.navigate('Home')
      }  
    } catch (error) {
      console.log('Error logging in:', error);
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
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

  return (
    // <ScrollView style={{ backgroundColor: "white" }}>
    //   <View className="justify-center items-center py-5">
    //     <MainImage style={{ width: sw - 9, height: sh - 550 }} />
    //     <Text className="font-InterBold text-3xl">Welcome</Text>
    //     <Text className="font-InterMedium text-center text-text-gray text-sm">
    //       to the future bank where you can{" "}
    //       <Text style={{ color: Color.PrimaryWebOrientTxtColor }}>
    //         Add, Manage & Track
    //       </Text>{" "}
    //       your all financial account only in one app
    //     </Text>
    //     <Text className="text-text-gray font-InterMedium text-center text-base mt-4">
    //       Select login options
    //     </Text>
    //     <View className="flex-row justify-between mt-6">
    //       <TouchableOpacity>
    //         <View className="flex-row justify-between items-center">
    //           {/* <View style={[styles.circleContainer, { marginRight: 10 }]}>
    //             <Entypo
    //               name="mail"
    //               size={40}
    //               style={{
    //                 color: Color.PrimaryWebOrient,
    //               }}
    //             />
    //           </View> */}
    //           <TouchableOpacity
    //             onPress={() =>
    //               Alert.alert(
    //                 "Popup",
    //                 "Place your finger on your phone fingerprint sensor"
    //               )
    //             }
    //           >
    //             <View
    //               className="rounded-full w-16 h-16 bg-gray-300 flex justify-center items-center"
    //               style={{ backgroundColor: "#f4f5f9" }}
    //             >
    //               <Entypo
    //                 name="fingerprint"
    //                 size={40}
    //                 style={{
    //                   color: Color.PrimaryWebOrient,
    //                 }}
    //               />
    //             </View>
    //           </TouchableOpacity>
    //         </View>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    //   <View className="m-3">
    //     <View className="mb-5">
    //       <Input
    //         placeholder="Email or UserName"
    //         keyboardType="email-address"
    //         value={emailorUsername}
    //         onChange={(text) => setEmail(text)}
    //       />
    //     </View>
    //     <View className="mb-2">
    //       <InputWithIcon
    //         isPassword={true}
    //         value={password}
    //         onChange={(text) => setPassword(text)}
    //         placeholder="Password"
    //       />
    //     </View>
    //   </View>
    //   <CustomButton className="m-2" Text={"Login"} onPress={handleLogin} />
    //   <PinCode
    //     visible={pinCodeModalVisible}
    //     onClose={() => setPinCodeModalVisible(false)}
    //   />

    //   <View className="m-3 mt-2  flex justify-center items-center">
    //     <Text
    //       onPress={() => navigation.navigate("ForgetPassword")}
    //       style={{
    //         fontFamily: "InterSemiBold",
    //         color: Color.PrimaryWebOrientTxtColor,
    //       }}
    //     >
    //       Forget Password?
    //     </Text>
    //   </View>
    //   <View className="items-center">
    //     <Text className="text-text-gray" style={{ fontFamily: "InterMedium" }}>
    //       Don’t have an account?{" "}
    //       <Text
    //         onPress={() => navigation.navigate("Registration")}
    //         style={{
    //           fontFamily: "InterSemiBold",
    //           color: Color.PrimaryWebOrientTxtColor,
    //         }}
    //       >
    //         Sign up
    //       </Text>
    //     </Text>
    //   </View>
    // </ScrollView>

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
            <Text className="text-white font-semibold text-lg ml-4 font-InterSemiBold">Login</Text>
          </View>

          <View className="flex-1 bg-white mt-2 rounded-t-[30px] px-7 pt-7 shadow-2xl">
            <View className="flex-1 justify-between">
              <View>
                <View className="mb-8 w-[80%]">
                  <Text className="text-2xl font-bold leading-8 font-InterBold">Get started with DigiBank!</Text>
                </View>

                <View>
                  <View>
                    <Text className="text-sm mb-2 font-InterMedium">User Name*</Text>
                    <Input placeholder="Enter your username" value={form.username} onChange={(text) => handleChange('username', text)} />
                    <View className="items-end mt-2">
                      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword', { source: 'username' })}>
                        <Text className="text-xs underline font-InterSemiBold" style={{color: Color.PrimaryWebOrientTxtColor}}>Forgot Username?</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="mt-1">
                    <Text className="text-sm mb-2 font-InterMedium">Password*</Text>
                    <InputWithIcon placeholder="Enter your password" isPassword value={form.password} onChange={(text) => handleChange('password', text)} />
                    <View className="items-end mt-2">
                      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword', { source: 'password' })}>
                        <Text className="text-xs underline font-InterSemiBold" style={{color: Color.PrimaryWebOrientTxtColor}}>Forgot Password?</Text>
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

              <View className="mb-5">
                <TouchableOpacity className="py-4 rounded-lg mb-4" style={{backgroundColor: Color.PrimaryWebOrient}} onPress={handleLogin}>
                  <Text className="text-white text-base text-center font-medium font-InterSemiBold">Login</Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                  <Text className="text-sm font-InterRegular">Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text className="text-sm font-InterSemiBold" style={{color: Color.PrimaryWebOrientTxtColor}}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
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
