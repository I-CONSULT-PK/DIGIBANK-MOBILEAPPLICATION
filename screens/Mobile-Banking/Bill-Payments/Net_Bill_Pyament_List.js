import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Alert, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import SearchBar from "../../../components/SearchBar";
import OptionBox from "../../../components/OptionBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from "../../../config";

const Net_Bill_Payment_List = ({ route }) => {
  const navigation = useNavigation();
  const [billers, setBillers] = useState([]);

  const { name } = route.params || {};

  useEffect(() => {
    const fetchBillPaymentList = async () => {
      try {
        const bearerToken = await AsyncStorage.getItem("token");

        if (bearerToken) {
          const response = await axios.get(
            `${API_BASE_URL}/v1/billpayment/getBillers?utilityType=${name}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );

          const dto = response.data;

          if (dto && dto.success && dto.data) {
            setBillers(dto.data);
            // console.log(dto.data)
          } else {
            if (dto.message) {
              Alert.alert("Error", dto.message);
            } else if (dto.errors && dto.errors.length > 0) {
              Alert.alert("Error", dto.errors.join("\n"));
            }
          }
        } else {
          Alert.alert("Error", "Unexpected error occurred. Try again later!");
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 404) {
            Alert.alert("Error", "Server timed out. Try again later!");
          } else if (statusCode === 503) {
            Alert.alert(
              "Error",
              "Service unavailable. Please try again later."
            );
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

    fetchBillPaymentList();
  }, []);

  // Helper function to convert Google Drive URL to direct image link
  const convertDriveUrl = (url) => {
    const fileId = url.match(/d\/(.*?)\//)[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <View
          className="h-24"
          style={{ backgroundColor: Color.PrimaryWebOrient }}
        >
          <View className="flex-row items-center justify-center h-full">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">
              Internet Payments
            </Text>
          </View>
        </View>
        <View className="px-4">
          <View className=" py-2">
            <SearchBar placeholder="Select Company" />
          </View>
          <View className="mt-8">
            <ScrollView>
              {billers.map((biller, index) => (
                <React.Fragment key={index}>
                  <OptionBox
                    key={biller.id}
                    image={{ uri: convertDriveUrl(biller.iconUrl) }}
                    text={biller.name}
                    icon1="arrowright"
                    iconColor1={Color.PrimaryWebOrient}
                    onPress1={() =>
                      navigation.navigate("Fatch_Payment_Details", {
                        serviceCode: biller.serviceCode,
                        utilityType: name,
                        name: biller.name,
                        image: biller.iconUrl,
                      })
                    }
                  />
                  <View className="my-3 w-full border-b border-gray-300" />
                </React.Fragment>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
    
  );
};

export default Net_Bill_Payment_List;
