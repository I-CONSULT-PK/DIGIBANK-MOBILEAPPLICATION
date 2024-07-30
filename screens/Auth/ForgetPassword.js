import React, { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  Alert,
  StyleSheet,
} from "react-native";
import Input from "../../components/TextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Choice from "../../assets/Images/forgetPassword.svg";
import CustomButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { Color } from "../../GlobalStyles";
import LoaderComponent from "../../components/LoaderComponent";
import { AppLoaderContext } from "../../components/LoaderHOC";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgetPassword = () => {
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

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Color.PrimaryWebOrientLayer2 }}
    >
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={[Color.PrimaryWebOrientLayer2, Color.PrimaryWebOrientLayer2]}
          style={[styles.linearGradient, { height: screenHeight }]}
        >
          <Choice
            fill={Color.PrimaryWebOrient}
            style={{ alignSelf: "center", marginTop: 5 }}
          />
          <View style={styles.roundedContainer}>
            <View className="justify-center text-center">
              <Text className="font-InterBold text-center text-2xl">
                Forget Password
              </Text>
              <Text className="text-sm text-center mt-3 font-InterMedium text-text-gray">
                Enter your CNIC and Account number below
              </Text>
            </View>
            <View className="space-y-1">
              <Text className="text-sm font-InterMedium text-text-gray">
                CNIC
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="xxxxx-xxxxxxx-x"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="cnic"
              />
              {errors.cnic && (
                <Text className="text-red-500">This is required.</Text>
              )}
            </View>
            <View className="mt-3 space-y-1">
              <Text className="text-sm font-InterMedium text-text-gray">
                Enter Account No
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="PK36SCBL0000001123456702"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
                name="accountNumber"
              />
              {errors.accountNumber && (
                <Text className="text-red-500">This is required.</Text>
              )}
            </View>
            <View style={{ margin: 8 }}>
              <CustomButton Text={"Next"} onPress={handleSubmit(handleNext)} />
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
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
