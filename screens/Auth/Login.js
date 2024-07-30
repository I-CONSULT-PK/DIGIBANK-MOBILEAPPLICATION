import React, { useState, useContext } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  TextInput
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
import AntDesign from '@expo/vector-icons/AntDesign';

const Login = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("mobile");
  const sw = Dimensions.get("screen").width;
  const sh = Dimensions.get("screen").height;
  const [emailorUsername, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showLoader, hideLoader } = useContext(AppLoaderContext);
  const [pinCodeModalVisible, setPinCodeModalVisible] = useState(false);
  const handleLogin = async () => {
    // // New Work
    // // Validate email and password
    // if (!emailorUsername || !password) {
    //   Alert.alert("Validation Error", "Please enter both email and password");
    //   return;
    // }

    // try {
    //   const apiUrl = "http://192.168.0.196:9096/v1/customer/login";
    //   showLoader();
    //   const response = await fetch(apiUrl, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       emailorUsername,
    //       password,
    //     }),
    //   });

    //   const data = await response.json();

    //   if (response.ok && data.success) {
    //     // Successful login
    //     console.log("Login successful", data);

    //     // Navigate to the next screen
    // navigation.navigate("OTP");
    //   } else {
    //     // Failed login, display error message
    //     Alert.alert(
    //       "Login Failed",
    //       data.message || "Invalid email or password"
    //     );
    //   }
    // } catch (error) {
    //   console.error("Login error", error.message);
    //   Alert.alert("Error", "An error occurred. Please try again later.");
    // } finally {
    //   // Hide loader
    //   hideLoader();
    // }
    setPinCodeModalVisible(true);
  };

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

    <SafeAreaView className="flex-1 h-full">
      <LinearGradient
        colors={['#1DBBD8', '#8EEDFF']}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ height: "100%" }}>

          <View className="w-full flex flex-row justify-start items-center pl-5 mt-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-InterMedium text-base ml-4">Login</Text>
          </View>

          <View className="w-full h-full bg-white mt-5 rounded-t-3xl">

            <View className="flex flex-col justify-between h-[80%]">
              <View>
                <View className="pl-12 pr-32 py-10">
                  <Text className="text-2xl font-InterBold">Get started with your account!</Text>
                </View>

                <View className="px-10">
                  <View>
                    <Text className="text-sm font-InterRegular mb-2">User Name*</Text>
                    <Input placeholder="Enter your username" />
                    <View className="flex flex-row justify-end">
                      <TouchableOpacity><Text className="text-right mt-3 text-xs text-[#1DBBD8] underline">Forgot Username?</Text></TouchableOpacity>
                    </View>
                  </View>

                  <View className="mt-1">
                    <Text className="text-sm font-InterRegular mb-2">Password*</Text>
                    <Input placeholder="Enter your password" />
                    <View className="flex flex-row justify-end">
                      <TouchableOpacity><Text className="text-right mt-3 text-xs text-[#1DBBD8] underline">Forgot Password?</Text></TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View className="px-10">
                <TouchableOpacity className="py-3 px-12 bg-[#1DBBD8] rounded-lg">
                  <Text className="text-base text-center font-InterMedium text-white">Login</Text>
                </TouchableOpacity>
                <View className="flex-row justify-center mt-3">
                  <Text className="text-center font-InterRegular">Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text className="text-blue-500 font-InterRegular">Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>

        </ScrollView>
      </LinearGradient>
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