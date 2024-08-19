import React, { useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, Image, Keyboard, Alert } from "react-native";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TextInput from "../../../components/TextInput";
import CustomButton from '../../../components/Button';
import { Entypo } from "@expo/vector-icons";
import API_BASE_URL from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Footer from '../../../components/Footer';

const Add_Beneficiary = ({ route }) => {
  const navigation = useNavigation();
  const { bankName, bankLogo } = route.params || {};

  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchLocalAccountDetails = async () => {
    if (accountNumber === '') {
      Alert.alert('Error', 'Please provide a valid Account number / IBAN');
    }
    else {
      setLoading(true);

      try {
        const bearerToken = await AsyncStorage.getItem('token');

        if (bearerToken) {
          const dto = await axios.get(
            `${API_BASE_URL}/v1/beneficiary/getLocalAccountTitle?senderAccountNumber=${accountNumber}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );

          if (dto && dto.data.success && dto.data) {
            navigation.navigate('Fatch_Acc_Beneficiary', { details: dto.data.data, bankName, bankLogo })
          }
          else {
            if (dto.data.message) {
              Alert.alert('Error', dto.data.message);
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
  };

  return (
    <SafeAreaView className=" bg-[#f9fafc]" style={{ flex: 1 }}>
      <ScrollView>

        <View className="d-flex flex-row justify-center mt-8">
          <TouchableOpacity
            className=" ml-2 absolute left-2"
            onPress={() => navigation.goBack()}
          >
            <Entypo name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
          <View className=" ">
            <Text className="font-InterBold text-2xl text-center">Send Money</Text>
          </View>
        </View>
        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold">Personal Details</Text>
        </View>
        <View className="flex-1 justify-center items-center p-4 shadow-gray-100">
          <View className="bg-white p-3 rounded-lg shadow-lg w-full">
            <View className="d-flex flex-row  items-center">
              <Image
                source={{ uri: bankLogo }}
                className=" mr-1 w-12 h-12"
                resizeMode='contain'
              />
              <Text className="text-lg font-semibold ml-3">
                {bankName}
              </Text>
            </View>
          </View>
        </View>
        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold">Account Number / IBAN</Text>
          <TextInput
            className="mt-2 border border-gray-200 rounded-lg"
            placeholder="Account number/IBAN"
            value={accountNumber}
            onChange={(text) => setAccountNumber(text)}
            onSubmitEditing={Keyboard.dismiss} />
        </View>
        <View className="px-6 mt-8">
          <CustomButton
            text={'Add'}
            onPress={() => { 
              bankName === 'DIGI Bank' && fetchLocalAccountDetails();
            }}
            loading={loading} />
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor='#f9fafc' style="dark" />
    </SafeAreaView>
  );
}

export default Add_Beneficiary
