import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { Color } from '../../../GlobalStyles';
import { decrypt } from '../../../utils/crypto';
import API_BASE_URL from '../../../config';
import SearchBar from '../../../components/SearchBar';
import OptionBox from '../../../components/OptionBox';
import Footer from '../../../components/Footer';

const BankList = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [banks, setBanks] = useState([]);

  const { source } = route.params || {};

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const bearerToken = await AsyncStorage.getItem('token');

        if (bearerToken) {
          const response = await axios.get(`${API_BASE_URL}/v1/customer/fund/getBanks`, {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          });

          const dto = response.data;

          if (dto && dto.success && dto.data) {
            const decryptedBanks = response.data.data.map(bank => ({
              ...bank,
              bankLogo: decrypt(bank.bankLogo),
            }));
            setBanks(decryptedBanks);
          } else {
            if (dto.message) {
              Alert.alert("Error", dto.message);
            } else if (dto.errors && dto.errors.length > 0) {
              Alert.alert("Error", dto.errors.join("\n"));
            }
          }
        } else {
          Alert.alert('Error', 'Unexpected error occurred. Try again later!');
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
      }
    };

    fetchBanks();
  }, []);

  const filteredBanks = banks.filter(bank =>
    bank.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="h-full flex-1" style={{ backgroundColor: Color.PrimaryWebOrient }}>
      <View style={{ backgroundColor: Color.PrimaryWebOrient, height: 100 }}>
        <View className="flex-row items-center justify-center w-full h-full">
          <TouchableOpacity onPress={() => source === 'dashboard' ? navigation.navigate('Home') : navigation.goBack()} className="absolute left-5">
            <Entypo name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-InterBold">Select Bank</Text>
        </View>
      </View>

      <View className="pt-6 pb-2 px-6 bg-[#F9FAFC]">
        <SearchBar
          placeholder='Search Bank Name'
          onChangeText={setSearchQuery}
          value={searchQuery} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full h-full px-6 bg-[#F9FAFC] pb-10">
          <View className="mt-6">
            {filteredBanks.map((bank, index) => (
              <React.Fragment key={index}>
                <OptionBox
                  image={{ uri: bank.bankLogo }}
                  text={bank.bankName}
                  icon1='arrowright'
                  iconColor1={Color.PrimaryWebOrient}
                  onPress1={() => { navigation.navigate('Add_Beneficiary', { bankName: bank.bankName, bankLogo: bank.bankLogo, shortBank: bank.shortBank }) }}
                />
                <View className="my-3 w-full border-b border-gray-300" />
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default BankList;
