import React,{useEffect,useState} from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from "../../../config";

const Bill_Payment_List = ({  route } ) => {
  const { name} = route.params || {};
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;

  const [UtilityBillList, setUtilityBillList] = useState([]);

  useEffect(() => {
    const fetchUtilityBillList = async () => {
      try {
        const bearerToken = await AsyncStorage.getItem('token');

        if (bearerToken) {
          const response = await axios.get(`${API_BASE_URL}/v1/billpayment/getUtilityTypes`, {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          });

          const dto = response.data;

          if (dto && dto.success && dto.data) {
            setUtilityBillList(dto.data); // Set the utility bill list from the API response
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

    fetchUtilityBillList();
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
            <Text className="text-white text-lg font-bold">Bill Payments</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 mt-2">
            <View className="px-4 py-2">
              <Text className="text-base font-InterSemiBold">Select Bill Type</Text>
            </View>
            <View className="flex-row flex-wrap justify-center">
              {UtilityBillList.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate("Net_Bill_Pyament_List", { name: option.name })} // Adjust the screen name accordingly
                  className="p-2"
                  style={{ width: (width - horizontalPadding * 1.2) / 2 }}
                >
                  <View className="bg-white rounded-lg p-2 shadow-lg  shadow-slate-400 flex-row items-center h-[55px]">
                    <Image
                      source={{ uri: convertDriveUrl(option.iconUrl) }} // Using the image URL from API
                      className="w-8 h-8 mr-2"
                      resizeMode="contain"
                    />
                    <Text className="text-[12px] font-normal flex-shrink flex-grow w-36">
                      {option.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default Bill_Payment_List;
