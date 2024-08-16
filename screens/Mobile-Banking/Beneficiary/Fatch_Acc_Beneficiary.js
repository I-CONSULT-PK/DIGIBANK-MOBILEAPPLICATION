import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, Image, Keyboard, Alert } from "react-native";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../../config";
import { Divider } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Footer from "../../../components/Footer";

const Fatch_Acc_Beneficiary = ({ route }) => {
  const navigation = useNavigation();
  const { details, bankName, bankLogo } = route.params || {};

  const [nickname, setNickname] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const createBeneficiary = async () => {
    if (!nickname) {
      Alert.alert('Error', 'Nickname is required');
    }
    else {
      setLoading(true);
      try {
        const bearerToken = await AsyncStorage.getItem('token');
        const customerId = await AsyncStorage.getItem('customerId');

        if (bearerToken) {
          const payload = {
            beneficiaryAlias: nickname,
            beneficiaryName: details.accountTitle,
            accountType: "Current",
            accountNumber: details.accountNumber,
            beneficiaryBankName: details.bankName,
            mobileNumber: mobileNumber || '',
            categoryType: "Individual",
            customerId: customerId,
            bankUrl: bankLogo,
          };

          const dto = await axios.post(
            `${API_BASE_URL}/v1/beneficiary/createBeneficiary`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );

          if (dto && dto.data.success && dto.data) {
            Alert.alert('Success', 'Beneficiary created successfully');
            navigation.navigate('BeneficiaryList')
          }
          else {
            if (dto.data.message) {
              Alert.alert('Error', dto.data.message);
            }
            else if (dto.errors && dto.errors.length > 0) {
              Alert.alert('Error', dto.errors);
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
          <Text className="text-lg font-semibold ">From Account</Text>
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
          <Text className="text-lg font-semibold ">Confirm Following Beneficiary Details</Text>
        </View>
        <View className="flex-1 justify-center items-center p-4 shadow-gray-100">
          <View className="bg-white p-3 rounded-lg shadow-lg w-full">
            <View className=" flex-row items-center justify-between">
              <Text className="text-sm text-gray-500">Account Title</Text>
              <Text className="text-sm font-medium  ">{details.accountTitle}</Text>
            </View>
            <View className="my-2">
              <View className="border-t border-gray-300" >
              </View>
            </View>
            <View className=" flex-row items-center justify-between">
              <Text className="text-sm text-gray-500">Bank Name </Text>
              <Text className="text-sm font-medium  ">{details.bankName}</Text>
            </View>
          </View>
        </View>

        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold">Nick Name</Text>
          <TextInput
            className="mt-2 border border-gray-200 rounded-lg"
            placeholder="Enter your name here"
            value={nickname}
            onChange={(text) => setNickname(text)}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold">
            Mobile Number (optional)
          </Text>
          <TextInput
            className="mt-2 border border-gray-200 rounded-lg"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(text) => setMobileNumber(text)}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <View className="px-6 mt-8">
          <CustomButton text="Add" onPress={createBeneficiary} loading={loading} />
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default Fatch_Acc_Beneficiary;
