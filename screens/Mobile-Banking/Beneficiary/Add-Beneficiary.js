import React, { useState, useEffect } from 'react'
import { Text, View, Image, Keyboard, Alert, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import API_BASE_URL from '../../../config';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

const Add_Beneficiary = ({ route, navigation }) => {
  const { bankName, bankLogo, shortBank } = route.params || {};

  const [accountNumber, setAccountNumber] = useState('');
  const [userBankName, setUserBankName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserBank = async () => {
      const bankName = await AsyncStorage.getItem('bankName');
      setUserBankName(bankName);
    };

    getUserBank();
  }, []);

  const fetchLocalAccountDetails = async () => {
    if (accountNumber === '') {
      Alert.alert('Error', 'Please provide a valid Account number / IBAN');
    }
    else {
      setLoading(true);

      try {
        const bearerToken = await AsyncStorage.getItem('token');

        if (bearerToken) {
          const response = await axios.get(
            `${API_BASE_URL}/v1/beneficiary/getLocalAccountTitle?senderAccountNumber=${accountNumber}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );

          const dto = response.data;

          if (dto && dto.success && dto.data) {
            navigation.navigate('Fatch_Acc_Beneficiary', { details: dto.data, bankName, bankLogo });
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
        else {
          Alert.alert('Error', 'Unexpected error occured. Try again later!');
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 404) {
            Alert.alert('Error', 'Server timed out. Try again later!');
          } else if (statusCode === 503) {
            Alert.alert('Error', 'Service unavailable. Please try again later.');
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
  };

  const fetchOtherAccountDetails = async () => {
    if (accountNumber === '') {
      Alert.alert('Error', 'Please provide a valid Account number / IBAN');
    }
    else {
      setLoading(true);

      try {
        const bearerToken = await AsyncStorage.getItem('token');

        if (bearerToken) {
          const response = await axios.get(
            `${API_BASE_URL}/v1/beneficiary/getAccount?accountNumber=${accountNumber}&bankName=${shortBank}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );

          const dto = response.data;

          if (dto && dto.success && dto.data) {
            navigation.navigate('Fatch_Acc_Beneficiary', { details: dto.data, bankName, bankLogo });
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
        else {
          Alert.alert('Error', 'Unexpected error occured. Try again later!');
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 404) {
            Alert.alert('Error', 'Server timed out. Try again later!');
          } else if (statusCode === 503) {
            Alert.alert('Error', 'Service unavailable. Please try again later.');
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
  };

  return (
    <SafeAreaView className="h-full flex-1 bg-[#F9FAFC]">
      <View style={{ height: 100 }}>
        <View className="flex-row items-center justify-center w-full h-full">
          <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-5">
            <Entypo name="chevron-left" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-black text-lg font-InterBold">Add Beneficiary</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full h-full px-5">
          <Text className="font-InterSemiBold">Personal Details</Text>

          <View className="bg-white p-3 rounded-lg shadow-md shadow-slate-400 w-full mt-3">
            <View className="d-flex flex-row items-center">
              <Image
                source={{ uri: bankLogo }}
                className="w-12 h-12 rounded-lg"
                resizeMode='contain'
              />
              <Text className="font-InterSemiBold ml-4">
                {bankName}
              </Text>
            </View>
          </View>

          <View className="mt-6">
            <Text className="font-InterSemiBold">Account Number / IBAN</Text>
            <TextInput
              className="mt-3 border border-gray-300 rounded-lg text-base font-InterMedium"
              placeholder="Account number / IBAN"
              placeholderTextColor="#A5A7A8"
              value={accountNumber}
              onChange={(text) => setAccountNumber(text)}
              onSubmitEditing={Keyboard.dismiss} />
          </View>

          <Button
            text="Add"
            styles="mt-8 mb-4"
            onPress={() => {
              bankName === userBankName ? fetchLocalAccountDetails() : fetchOtherAccountDetails();
            }}
            loading={loading}
          />
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor="#F9FAFC" style="dark" />
    </SafeAreaView>
  );
}

export default Add_Beneficiary
