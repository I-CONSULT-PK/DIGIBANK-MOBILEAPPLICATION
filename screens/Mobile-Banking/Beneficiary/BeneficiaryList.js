import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { Color } from "../../../GlobalStyles";
import API_BASE_URL from '../../../config';
import SearchBar from "../../../components/SearchBar";
import OptionBox from "../../../components/OptionBox";
import Footer from "../../../components/Footer";

import UBLIcon from "../../../assets/ubl-icon.png";
import HBLIcon from "../../../assets/hbl-icon.png";
import MeezanIcon from "../../../assets/meezan-icon.png";
import AlliedIcon from "../../../assets/allied-icon.png";

const BeneficiaryList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [beneficiaries, setBeneficiaries] = useState([
  //   {
  //     id: 1,
  //     image: UBLIcon,
  //     text: "Mahrukh",
  //     subtext: "25678945087986",
  //     beneficiary: true,
  //     liked: false,
  //   },
  //   {
  //     id: 2,
  //     image: HBLIcon,
  //     text: "Fatima Zafar",
  //     subtext: "25678945087986",
  //     beneficiary: true,
  //     payment: "Rs. 10,000",
  //     liked: false,
  //   },
  //   {
  //     id: 3,
  //     image: MeezanIcon,
  //     text: "Amna Irfan",
  //     subtext: "25678945087986",
  //     beneficiary: true,
  //     payment: "Rs. 10,000",
  //     liked: false,
  //   },
  //   {
  //     id: 4,
  //     image: HBLIcon,
  //     text: "Bushra",
  //     subtext: "25678945087986",
  //     beneficiary: true,
  //     payment: "Rs. 10,000",
  //     liked: false,
  //   },
  //   {
  //     id: 5,
  //     image: AlliedIcon,
  //     text: "Mahrukh",
  //     subtext: "25678945087986",
  //     beneficiary: true,
  //     liked: false,
  //   },
  // ]);
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const customerId = await AsyncStorage.getItem('customerId');
        const bearerToken = await AsyncStorage.getItem('token');

        if (customerId && bearerToken) {
          const dto = await axios.get(`${API_BASE_URL}/v1/beneficiary/getAllBeneficiary/${customerId}`, {
            headers: {
              'Authorization': `Bearer ${bearerToken}`
            }
          });

          if (dto && dto.data[0].success && dto.data) {
            const transformedBeneficiaries = dto.data.map(item => ({
              id: item.data.id,
              text: item.data.beneficiaryAlias || 'Unknown',
              subtext: item.data.accountNumber,
              beneficiary: true,
              liked: false,
            }));

            setBeneficiaries(transformedBeneficiaries);
          }
          else {
            if (dto.message) {
              Alert.alert('Error', dto.message);
            }
            else if (dto.errors && dto.errors.length > 0) {
              Alert.alert('Error', dto.errors);
            }
          }

        } else {
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
      }
    };

    fetchBeneficiaries();
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleRemoveBeneficiary = (id) => {
    setBeneficiaries((prevBeneficiaries) =>
      prevBeneficiaries.filter(b => b.id !== id)
    );
  };

  const handleLikeToggle = (id) => {
    setBeneficiaries((prevBeneficiaries) =>
      prevBeneficiaries.map((b) =>
        b.id === id ? { ...b, liked: !b.liked } : b
      )
    );
  };

  const handleNamePress = (id) => {
    navigation.navigate('SendFromAccount', { beneficiaryId: id });
  };

  const filteredBeneficiaries = beneficiaries.filter((beneficiary) =>
    beneficiary.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="h-full flex-1" style={{ backgroundColor: Color.PrimaryWebOrient }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={{ backgroundColor: Color.PrimaryWebOrient, height: 100 }}>
          <View className="flex-row items-center justify-center w-full h-full">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-semibold text-lg font-InterSemiBold">
              Beneficiary
            </Text>
          </View>
        </View>

        <View className="w-full h-full px-6 bg-[#F5F5F5] pb-20">
          <View className="mt-6">
            <SearchBar
              placeholder="Search My Payees"
              onChangeText={handleSearchChange}
              value={searchQuery}
            />
          </View>

          <View className="mt-7">
            <TouchableOpacity className="flex-row items-center">
              <View className="p-3 rounded-lg shadow-lg shadow-gray-500 justify-center items-center" style={{ backgroundColor: Color.PrimaryWebOrient }}>
                <Image
                  source={require("../../../assets/own-account-icon.png")}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-InterSemiBold mb-0.5">Own Account</Text>
              </View>
            </TouchableOpacity>

            <View className="my-3 w-full border-b border-gray-300" />

            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => navigation.navigate("BankList")}
            >
              <View className="p-3 rounded-lg shadow-lg shadow-gray-500 justify-center items-center" style={{ backgroundColor: Color.PrimaryWebOrient }}>
                <Image
                  source={require("../../../assets/add-icon.png")}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-InterSemiBold mb-0.5">
                  Add New Beneficiary
                </Text>
              </View>
            </TouchableOpacity>

            <View className="mt-3 mb-4 w-full border-b border-gray-300" />

            {filteredBeneficiaries.map((beneficiary) => (
              <React.Fragment key={beneficiary.id}>
                <OptionBox
                  image={beneficiary.image}
                  text={beneficiary.text}
                  subtext={beneficiary.subtext}
                  icon1={beneficiary.liked ? "heart" : "hearto"}
                  icon2="trash-2"
                  iconColor1={beneficiary.liked ? "red" : "darkgray"}
                  iconColor2="darkgray"
                  beneficiary={beneficiary.beneficiary}
                  payment={beneficiary.payment}
                  onPress1={() => handleLikeToggle(beneficiary.id)}
                  onPress2={() => handleRemoveBeneficiary(beneficiary.id)}
                  onPressName={() => handleNamePress(beneficiary.id)}
                />
                <View className="my-4 w-full border-b border-gray-300" />
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

export default BeneficiaryList;