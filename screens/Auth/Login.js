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
 
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
 
  // const handleLogin = async () => {
  //   if (form.username === '' || form.password === '') {
  //     Alert.alert('Error', 'Username and password can not be null')
  //   }
  //   else {
  //     const loginData = {
  //       emailorUsername: form.username,
  //       password: form.password
  //     };
 
  //     try {
  //       const response = await axios.post(`${API_BASE_URL}/v1/customer/login`, loginData);
  //       const dto = response.data;
 
  //       if (dto && dto.success && dto.data && dto.data.customerId) {
  //         const customerId = dto.data.customerId.toString();
  //         const token = dto.data.token.toString();
  //         const expirationTime = dto.data.expirationTime.toString();
 
  //         await AsyncStorage.setItem('customerId', customerId);
  //         await AsyncStorage.setItem('token', token);
  //         await AsyncStorage.setItem('expirationTime', expirationTime);
 
  //         navigation.navigate('Home');
  //       }
  //       else {
  //         if (dto.message) {
  //           Alert.alert('Error', dto.message);
  //         }
  //         else if (dto.errors && dto.errors.length > 0) {
  //           Alert.alert('Error', dto.errors);
  //         }
  //       }
  //     } catch (error) {
  //       if (error.response) {
  //         const statusCode = error.response.status;
 
  //         if (statusCode === 404) {
  //           Alert.alert('Error', 'Server timed out. Try again later!');
  //         } else if (statusCode === 503) {
  //           Alert.alert('Error', 'Service unavailable. Please try again later.');
  //         } else if (statusCode === 400) {
  //           Alert.alert('Error', error.response.data.data.errors[0]);
  //         } else {
  //           Alert.alert('Error', error.message);
  //         }
  //       } else if (error.request) {
  //         Alert.alert('Error', 'No response from the server. Please check your connection.');
  //       } else {
  //         Alert.alert('Error', error.message);
  //       }
  //     }
  //   }
  // };
 
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
                    <Input placeholder="Enter your username" value={form.username} onChange={(text) => handleChange('username', text)} onSubmitEditing={Keyboard.dismiss} />
                    <View className="items-end mt-2">
                      <TouchableOpacity onPress={() => navigation.navigate('ForgetUserName')}>
                        <Text className="text-xs underline font-InterSemiBold" style={{ color: Color.PrimaryWebOrientTxtColor }}>Forgot Username?</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
 
                  <View className="mt-1 mb-8">
                    <Text className="text-sm mb-2 font-InterMedium">Password*</Text>
                    <InputWithIcon placeholder="Enter your password" isPassword value={form.password} onChange={(text) => handleChange('password', text)} onSubmitEditing={Keyboard.dismiss} />
                    <View className="items-end mt-2">
                      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword', { source: 'password' })}>
                        <Text className="text-xs underline font-InterSemiBold" style={{ color: Color.PrimaryWebOrientTxtColor }}>Forgot Password?</Text>
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
                <CustomButton
                  text='Login'
                  width='w-[100%]'
                  styles='mb-4 py-4'
                  onPress={() => navigation.navigate('Home')}
                
                />

                <View className="flex-row justify-center">
                  <Text className="text-sm font-InterRegular">Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text className="text-sm font-InterSemiBold" style={{ color: Color.PrimaryWebOrientTxtColor }}>Sign up</Text>
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
 
