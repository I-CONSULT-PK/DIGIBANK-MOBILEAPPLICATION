import React, { useState, useContext } from "react";
import { ScrollView, Text, View, Alert, TouchableOpacity, SafeAreaView, Keyboard } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AppLoaderContext } from "../../components/LoaderHOC";
import axios from "axios";
import CustomButton from "../../components/Button";
import Input from "../../components/TextInput";
import  { StatusBar } from "expo-status-bar";
import API_BASE_URL from "../../config";
import { Entypo } from "@expo/vector-icons";

import Button from "../../components/Button";

const ForgetUserName = ({ route }) => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useContext(AppLoaderContext);
  const { control, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm();
  const [isEditable, setIsEditable] = useState(true);
  const [serverData, setServerData] = useState(null);

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

  const handleForgotUsername = async () => {
    if (form.cnic === '' || form.accountNumber === '') {
      Alert.alert('Error', 'CNIC and Account Number can not be null');
    }
    else {
      setLoading(true);

      const data = {
        accountNumber: form.accountNumber,
        cnic: form.cnic
      };

      try {
        const response = await axios.post(`${API_BASE_URL}/v1/customer/forgetUser`, data);
        const dto = response.data;

        if (dto && dto.success && dto.data) {
          const otpData = {
            mobileNumber: dto.data.mobileNumber,
            email: dto.data.email,
            reason: 'verify mobile device'
          };

          const response1 = await axios.post(`${API_BASE_URL}/v1/otp/createOTP`, otpData);
          const dto1 = response1.data;

          if (dto1 && dto1.success && dto1.data) {
            navigation.navigate("OTP", {
              email: dto.data.email,
              mobileNumber: dto.data.mobileNumber,
              source: 'username'
            });
          }
          else {
            if (dto1.message) {
              Alert.alert('Error', dto1.message);
            }
            else if (dto1.errors && dto1.errors.length > 0) {
              Alert.alert('Error', dto1.error);
            }
          }
        }
        else {
          if (dto.message) {
            Alert.alert('Error', dto.message);
          }
          else if (dto.errors && dto.errors.length > 0) {
            Alert.alert('Error', dto.errors);
          }
        }
      }
      catch (error) {
        if (error.response) {
          const statusCode = error.response.status;

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
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <SafeAreaView className="h-full flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View className="flex-row items-center p-4 mt-7">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-black font-semibold text-lg ml-4 font-InterSemiBold">Forgot username</Text>
        </View>

        <View className="flex-1 mt-4 px-4">
          <View className="bg-white rounded-xl w-full shadow-xl shadow-slate-500 px-5 pt-6 pb-4">

            <View className="mb-5">
              <Text className="text-sm mb-2 font-InterMedium">CNIC Number*</Text>
              <Input placeholder="Enter your CNIC" value={form.cnic} onChange={(text) => handleChange('cnic', text)} onSubmitEditing={Keyboard.dismiss} />
            </View>

            <View className="mb-6">
              <Text className="text-sm mb-2 font-InterMedium">Account Number*</Text>
              <Input placeholder="Enter 14 digits Acc No." value={form.accountNumber} onChange={(text) => handleChange('accountNumber', text)} onSubmitEditing={Keyboard.dismiss} />
            </View>

            <View className="mt-3 mb-1">
              <Button
                text='Next'
                width='w-[100%]'
                styles='mb-4 py-4'
                onPress={handleForgotUsername}
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

export default ForgetUserName;