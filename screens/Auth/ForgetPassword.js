import React, { useState, useContext } from "react";
import { ScrollView, Text, View, Alert, TouchableOpacity, SafeAreaView, Keyboard } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AppLoaderContext } from "../../components/LoaderHOC";
import TextInput from "../../components/TextInput";
import { StatusBar } from "expo-status-bar";
import API_BASE_URL from "../../config";
import { Entypo } from "@expo/vector-icons";
import Button from "../../components/Button"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgetPassword = ({ route }) => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useContext(AppLoaderContext);
  const { source } = route.params || {};
  
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    cnic: '',
    accountNumber: ''
  });

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleForgotPassword = async () => {
    if (form.cnic === '' || form.accountNumber === '') {
      Alert.alert('Error', 'CNIC and Account Number cannot be null');
      return;
    }
  
    setLoading(true);
    const data = {
      accountNumber: form.accountNumber.trim(),
      cnic: form.cnic.trim(),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/v1/customer/forgetUser`, data);
      const dto = response.data;
  
      const otpDeliveryMethod = await AsyncStorage.getItem('otpDeliveryMethod');
      
      if (dto && dto.success && dto.data) {
        const otpData = {
          mobileNumber: dto.data.mobileNumber,
          email: dto.data.email,
          reason: 'forget password',  
          deliveryPreference: otpDeliveryMethod ? otpDeliveryMethod : "EMAIL"
        };
  
        await handleOTP(otpData, dto.data); 
      } else {
        handleError(dto);
      }
    } catch (error) {
      console.log("Error details:", error.response ? error.response.data : error.message);
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOTP = async (otpData, userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/otp/createOTP`, otpData);
      const dto1 = response.data;

      if (dto1 && dto1.success && dto1.data) {
        navigation.navigate("OTP", {
          email: userData.email,
          mobileNumber: otpData.mobileNumber,
          cnic: form.cnic,
          accountNumber: form.accountNumber,
          source: 'password'
        });
      } else {
        if (dto1.message) {
          Alert.alert("Error", dto1.message);
        } else if (dto1.errors && dto1.errors.length > 0) {
          Alert.alert("Error", dto1.errors.join(", "));
        }
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleError = (dto) => {
    if (dto.message) {
      Alert.alert('Error', dto.message);
    } else if (dto.errors && dto.errors.length > 0) {
      Alert.alert('Error', dto.errors.join(", "));
    }
  };

  const handleAxiosError = (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      console.log("Response data:", error.response.data); 

      if (statusCode === 404) {
        Alert.alert('Error', 'Server timed out. Try again later!');
      } else if (statusCode === 503) {
        Alert.alert('Error', 'Service unavailable. Please try again later.');
      } else if (statusCode === 400) {
        Alert.alert('Error', error.response.data.data.errors[0]);
      } else {
        Alert.alert('Error', error.message);
      }
    } else if (error.request) {
      Alert.alert('Error', 'No response from the server. Please check your connection.');
    } else {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-row items-center p-4 mt-7">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-black font-semibold text-lg ml-4">
            Forgot password
          </Text>
        </View>

        <View className="flex-1 mt-4 px-4">
          <View className="bg-white rounded-xl shadow-xl shadow-slate-500 px-5 pt-6 pb-4">
            <View className="mb-5">
              <Text className="text-sm mb-2 font-InterMedium">CNIC Number*</Text>
              <TextInput placeholder="Enter your CNIC" value={form.cnic} onChange={(text) => handleChange('cnic', text)} onSubmitEditing={Keyboard.dismiss} />
            </View>

            <View className="mb-6">
              <Text className="text-sm mb-2 font-InterMedium">Account Number*</Text>
              <TextInput placeholder="Enter 14 digits Acc No." value={form.accountNumber} onChange={(text) => handleChange('accountNumber', text)} onSubmitEditing={Keyboard.dismiss} />
            </View>

            <View className="mt-3 mb-1">
              <Button
                text='Next'
                width='w-[100%]'
                styles='mb-4 py-4'
                onPress={handleForgotPassword}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#ffffff" style="dark" />
    </SafeAreaView>
  );
};

export default ForgetPassword;
