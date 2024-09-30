import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import CashUpContainer from "../../../assets/Images/CashUpContainer.png";
import Button from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import CashUpCardSvg from "../../../assets/Images/CashUpCardSvg.svg";

import API_BASE_URL from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CashUpCard = ({ route }) => {
  const navigation = useNavigation();
  const { ibanNumber, selectedBankId, jobVintage, empName, price } =
    route.params;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  const ApplyCardRequst = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const accountNumber = await AsyncStorage.getItem("accountNumber");

      if (!bearerToken) {
        Alert.alert("Error", "Authentication token not found");
        return;
      }

      const payload = {
        accountNumber: accountNumber,
        cardHolderName: empName,
        ibanCode: accountNumber,
        bankId: selectedBankId,
        employerName: empName,
        jobVintage: jobVintage,
        income: price,
      };

      const response = await axios.post(
        `${API_BASE_URL}/v1/customer/card/cardApprovalRequest`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      const dto = response.data;

      if (dto && dto.data.success && dto.data) {
        // console.log(dto);
        navigation.navigate("CongCard");
      } else {
        if (dto.message) {
          Alert.alert("Error", dto.message);
        } else if (dto.errors && dto.errors.length > 0) {
          Alert.alert("Error", dto.errors);
        }
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          Alert.alert("Error", "Server timed out. Try again later!");
        } else if (statusCode === 503) {
          Alert.alert("Error", "Service unavailable. Please try again later.");
        } else if (statusCode === 400) {
          Alert.alert("Error", error.response.data.data.errors[0]);
        } else {
          Alert.alert("Error", error.message);
        }
      } else if (error.request) {
        Alert.alert(
          "Error",
          "No response from the server. Please check your connection."
        );
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc]">
      <ScrollView className="flex-1">
        <View className="flex-1">
          <View className="flex flex-col overflow-hidden gap-4 pt-16 pl-6 bg-cyan-500">
            <View className="flex items-center p-2.5 rounded-md bg-white bg-opacity-66 h-10 w-10 justify-center">
              <Ionicons
                name="close"
                size={20}
                color="black"
                onPress={() => navigation.navigate("ApplyForCard")}
              />
            </View>
            <View className="flex flex-row items-center mt-8">
              <Text className="text-3xl font-semibold text-black">
                {"Get your\n"}
                <Text className="text-3xl font-bold text-white">
                  {"CashUp Card\n"}
                </Text>
                {"Insured"}
              </Text>
              <CashUpCardSvg style={{ marginLeft: 40 }} />
            </View>
          </View>
        </View>
        <View className="flex flex-col pl-12">
        <Text className="text-base font-semibold  mt-5 text-red-600">
                  Optional
                </Text>
        </View>
       
        {/* Container for Credit Shield Plus with Image */}
        <View className="relative mt-5">
          <Image
            source={CashUpContainer}
            className="w-96 h-40 object-cover mx-auto"
            style={{ resizeMode: "contain" }}
          />
          
          <View className="absolute inset-0 flex flex-col justify-center items-center p-5">
            <View className="w-full px-4">
              <Entypo name="credit-card" size={20} style={{ marginLeft: 20 }} />
              <View className="flex flex-row items-center justify-between  mt-2">
                <Text className="text-base font-semibold ml-5">
                  Credit Shield Plus
                </Text>
                <Checkbox
                  status={
                    selectedOption === "Credit Shield Plus"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => handleSelect("Credit Shield Plus")}
                  color="green"
                  uncheckedColor="gray"
                  style={{ transform: [{ scale: 0.75 }] }}
                />
              </View>
              <View className="text-center ml-7 mt-3 w-72">
                <Text className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet consectetur. Ornare lorem velit
                  ultrices blandit nunc nunc viverra vel. Fringilla turpis mi
                  cum ut.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Container for Accident Shield */}
        <View className="relative mt-5">
          <Image
            source={CashUpContainer}
            className="w-96 h-40 object-cover mx-auto "
            style={{ resizeMode: "contain" }}
          />
          <View className="absolute inset-0 flex flex-col justify-center items-center p-5 ">
            <View className="w-full px-4">
              <Entypo name="credit-card" size={20} style={{ marginLeft: 20 }} />
              <View className="flex flex-row items-center justify-between ">
                <Text className="text-base font-semibold ml-5">
                  Accident Shield
                </Text>
                <Checkbox
                  status={
                    selectedOption === "Accident Shield"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => handleSelect("Accident Shield")}
                  color="green"
                  uncheckedColor="gray"
                  style={{ transform: [{ scale: 0.75 }] }}
                />
              </View>
              <View className="text-center ml-7 mt-3 w-72">
                <Text className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet consectetur. Ornare lorem velit
                  ultrices blandit nunc nunc viverra vel. Fringilla turpis mi
                  cum ut.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="p-5">
        <Button
          text="Confirm"
          width="w-[100%]"
          styles="mb-4 py-4"
          onPress={() => {
            ApplyCardRequst();
           
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CashUpCard;
