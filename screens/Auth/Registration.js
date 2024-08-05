import React, { useState, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Input from "../../components/TextInput";
import InputWithIcon from "../../components/TextInputWithIcon";
import { Controller, useForm } from "react-hook-form";
import { Color } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppLoaderContext } from "../../components/LoaderHOC";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios";
import API_BASE_URL from '../../config';

const Registration = ({ route }) => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useContext(AppLoaderContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoginPress = () => {
    showLoader();
    setIsLoading(true);

    setTimeout(async () => {
      hideLoader();
      setIsLoading(false);

      navigation.navigate("OTP", {
        userEmail: await AsyncStorage.getItem("userEmail"),
        userNumber: await AsyncStorage.getItem("userMobileNumber"),
      });
    }, 5000);
  };

  const { source } = route.params || {};

  const [main, setMain] = useState(true);
  const [initialForm, setInitialForm] = useState({
    cnic: '',
    mobile: '',
    accountNumber: '',
  });
  const [returnedData, setReturnedData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (name, value) => {
    setInitialForm({
      ...initialForm,
      [name]: value,
    });
  };

  const handleNext = async () => {
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
      const response = await axios.post(`${API_BASE_URL.IE}v1/customer/signup`, registrationData);
      const { message, data } = response.data;

      if (data) {
        setReturnedData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
        setMain(false);
        setError(null);  
      } else {
        setError(message || 'Data Not Found');
      }
    } catch (error) {
      console.log('Error during registration:', error.response?.data || error.message);
      const serverError = error.response?.data?.message || 'An unexpected error occurred';
      setError(serverError);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row items-center p-4 mt-2">
            <TouchableOpacity onPress={() => {
              setMain(true);
              main && navigation.goBack();
            }}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold ml-4 font-InterSemiBold">Register yourself</Text>
          </View>

          <View className="flex-1 bg-white mt-2 rounded-t-[30px] px-7 pt-7 shadow-2xl">
            {source === 'OTP' ? (
              <View className="flex-1 justify-between">
                <View>
                  <View className="mb-8 w-[80%]">
                    <Text className="text-2xl font-bold font-InterBold">Get started with your account!</Text>
                  </View>

                  <View>
                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">User Name*</Text>
                      <Input placeholder="Enter your username" />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Password*</Text>
                      <InputWithIcon placeholder="Enter your password" isPassword />
                    </View>
                  </View>
                </View>

                <View className="mb-5">
                  <TouchableOpacity className="py-4 rounded-lg mb-4 bg-primary" onPress={handleLoginPress}>
                    <Text className="text-white text-base text-center font-medium font-InterSemiBold">Sign up</Text>
                  </TouchableOpacity>
                  <View className="flex-row justify-center">
                    <Text className="text-sm font-InterRegular">Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                      <Text className="text-sm font-InterSemiBold text-primary">Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : main ? (
              <View className="flex-1 justify-between">
                <View>
                  <View className="mb-8 w-[80%]">
                    <Text className="text-2xl font-bold font-InterBold">Get started with your account!</Text>
                  </View>

                  <View>
                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">CNIC Number*</Text>
                      <Input placeholder="Enter your CNIC" value={initialForm.cnic} onChange={(text) => handleChange('cnic', text)} />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Mobile Number*</Text>
                      <Input placeholder="Enter your mobile number" value={initialForm.mobile} onChange={(text) => handleChange('mobile', text)} />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Account Number*</Text>
                      <Input placeholder="Enter 14 digits Acc No." value={initialForm.accountNumber} onChange={(text) => handleChange('accountNumber', text)} />
                    </View>
                  </View>
                </View>

                <View className="mb-5">
                  <TouchableOpacity className="py-4 rounded-lg mb-4 bg-primary" onPress={handleNext}>
                    <Text className="text-white text-base text-center font-medium font-InterSemiBold">Next</Text>
                  </TouchableOpacity>
                  <View className="flex-row justify-center">
                    <Text className="text-sm font-InterRegular">Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                      <Text className="text-sm font-InterSemiBold text-primary">Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View className="flex-1 justify-between">
                <View>
                  <View className="mb-8 w-[80%]">
                    <Text className="text-2xl font-bold font-InterBold">Get started with your account!</Text>
                  </View>

                  <View>
                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">First Name*</Text>
                      <Input placeholder="Enter your first name" value={returnedData.firstName} />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Last Name*</Text>
                      <Input placeholder="Enter your last name" value={returnedData.lastName} />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Email Address*</Text>
                      <Input placeholder="Enter your email" value={returnedData.email} />
                    </View>
                  </View>
                </View>

                <View className="mb-5">
                  <TouchableOpacity className="py-4 rounded-lg mb-4 bg-primary" onPress={handleNext}>
                    <Text className="text-white text-base text-center font-medium font-InterSemiBold">Next</Text>
                  </TouchableOpacity>
                  <View className="flex-row justify-center">
                    <Text className="text-sm font-InterRegular">Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                      <Text className="text-sm font-InterSemiBold text-primary">Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {error && (
              <View className="absolute bottom-0 left-0 right-0 bg-red-100 p-4 items-center">
                <Text className="text-red-800 text-sm text-center">{error}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Registration;
