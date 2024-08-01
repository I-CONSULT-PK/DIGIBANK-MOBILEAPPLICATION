import React, { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Input from "../../components/TextInput";
import { LinearGradient } from "expo-linear-gradient";
import Choice from "../../assets/Images/forgetPassword.svg";
import CustomButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { Color } from "../../GlobalStyles";
import LoaderComponent from "../../components/LoaderComponent";
import { AppLoaderContext } from "../../components/LoaderHOC";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';

const ForgetPassword = ({ route }) => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get("window").height;
  const { showLoader, hideLoader } = useContext(AppLoaderContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNext = async (data) => {
    try {
      showLoader();

      const url = `http://192.168.0.196:9096/v1/customer/getCustomer/2?cnic=${data.cnic}&accountNumber=${data.accountNumber}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      console.log("Server response:", result);

      if (result.success) {
        if (result.data && result.data.id) {
          hideLoader();

          // Save customer information in local storage
          const customerInfo = {
            customerId: result.data.id,
            userNumber: result.data.mobileNumber,
            userEmail: result.data.email,
          };

          await AsyncStorage.setItem("customerInfo", JSON.stringify(customerInfo));

          navigation.navigate("OTP", {
            sourceScreen: "ForgetPassword",
            destinationScreen: "NewPassword",
          });
        } else {
          Alert.alert("Error", "Customer ID not found in the server response");
        }
      } else {
        const errorMessageToShow = result.message || result.error;
        Alert.alert("Error", errorMessageToShow);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert(
        "Error",
        "Failed to fetch user information. Please try again."
      );
    } finally {
      setTimeout(() => {
        hideLoader();
      }, 3000);
    }
  };

  const { source } = route.params;

  return (
    // <SafeAreaView
    //   style={{ flex: 1, backgroundColor: Color.PrimaryWebOrientLayer2 }}
    // >
    //   <ScrollView style={styles.container}>
    //     <LinearGradient
    //       colors={[Color.PrimaryWebOrientLayer2, Color.PrimaryWebOrientLayer2]}
    //       style={[styles.linearGradient, { height: screenHeight }]}
    //     >
    //       <Choice
    //         fill={Color.PrimaryWebOrient}
    //         style={{ alignSelf: "center", marginTop: 5 }}
    //       />
    //       <View style={styles.roundedContainer}>
    //         <View className="justify-center text-center">
    //           <Text className="font-InterBold text-center text-2xl">
    //             Forget Password
    //           </Text>
    //           <Text className="text-sm text-center mt-3 font-InterMedium text-text-gray">
    //             Enter your CNIC and Account number below
    //           </Text>
    //         </View>
    //         <View className="space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             CNIC
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Input
    //                 placeholder="xxxxx-xxxxxxx-x"
    //                 value={value}
    //                 onChange={onChange}
    //                 onBlur={onBlur}
    //               />
    //             )}
    //             name="cnic"
    //           />
    //           {errors.cnic && (
    //             <Text className="text-red-500">This is required.</Text>
    //           )}
    //         </View>
    //         <View className="mt-3 space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             Enter Account No
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Input
    //                 placeholder="PK36SCBL0000001123456702"
    //                 value={value}
    //                 onChange={onChange}
    //                 onBlur={onBlur}
    //               />
    //             )}
    //             name="accountNumber"
    //           />
    //           {errors.accountNumber && (
    //             <Text className="text-red-500">This is required.</Text>
    //           )}
    //         </View>
    //         <View style={{ margin: 8 }}>
    //           <CustomButton Text={"Next"} onPress={handleSubmit(handleNext)} />
    //         </View>
    //       </View>
    //     </LinearGradient>
    //   </ScrollView>
    // </SafeAreaView>

    <SafeAreaView className="h-full flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        <View className="flex-row items-center p-4 mt-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-black font-semibold text-lg ml-4 font-InterSemiBold">{source === 'username' ? 'Forgot username' : 'Forgot password'}</Text>
        </View>

        <View className="flex-1 mt-4 px-4">
          <View className="bg-white rounded-xl w-full shadow-xl shadow-slate-500 px-5 pt-5 pb-4">

            <View className="mb-5">
              <Text className="text-sm mb-2 font-InterMedium">CNIC Number*</Text>
              <Input placeholder="Enter your CNIC" />
            </View>

            <View className="mb-6">
              <Text className="text-sm mb-2 font-InterMedium">Account Number*</Text>
              <Input placeholder="Enter 14 digits Acc No." />
            </View>

            <View className="px-2 mb-7">
              <Text className="text-sm font-InterMedium text-[#1DBBD8]">A verification code will be sent to email address linked with this account number.</Text>
            </View>

            <TouchableOpacity className="bg-[#1DBBD8] py-3 rounded-lg mb-4" onPress={() => navigation.navigate("OTP", { source: source })}>
              <Text className="text-white text-base text-center font-medium font-InterSemiBold">Next</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#ffffff" style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  linearGradient: {
    width: "100%",
  },
  roundedContainer: {
    backgroundColor: "#fff",
    height: 0.9 * Dimensions.get("window").height,
    width: "100%",
    borderRadius: 20,
    padding: 20,
    alignSelf: "center",
    top: "5%",
  },
});

export default ForgetPassword;
