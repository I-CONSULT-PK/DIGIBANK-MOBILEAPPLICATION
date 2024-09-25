import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import OptionBox from "../../../components/OptionBox";
import Footer from "../../../components/Footer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../../config";

const Top_up_List = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const bearerToken = await AsyncStorage.getItem("token");

        if (bearerToken) {
          const response = await axios.get(`${API_BASE_URL}/v1/network/all`, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          });

          // Log the response to see the structure
          // console.log("API Response:", response.data);

          // Check if the response contains an array of networks
          if (response && response.data.success && Array.isArray(response.data.data)) {
            setNetworks(response.data.data); // Ensure data is an array
          } else {
            Alert.alert("Error", "Unexpected response from server");
          }
        } else {
          Alert.alert("Error", "Unexpected error occurred. Try again later!");
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchNetwork();
  }, []);

  const handleError = (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 404) {
        Alert.alert("Error", "Server timed out. Try again later!");
      } else if (statusCode === 503) {
        Alert.alert("Error", "Service unavailable. Please try again later.");
      } else if (statusCode === 400) {
        Alert.alert("Error", error.response.data.errors[0]);
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
  };

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
            <Text className="text-white text-lg font-bold">Mobile Top ups</Text>
          </View>
        </View>

        <View className="px-4 mt-8">
          {/* Dynamic Network List */}
          {Array.isArray(networks) && networks.length > 0 ? (
            networks.map((network, index) => (
              <React.Fragment key={index}>
                <OptionBox
                  image={{ uri: convertDriveUrl(network.iconUrl) }} // Convert Google Drive link to a direct link
                  text={network.name}
                  icon1="arrowright"
                  iconColor1={Color.PrimaryWebOrient}
                  onPress1={() => {
                    navigation.navigate("Add_Biller", {
                      networkName: network.name,
                      networkLogo: convertDriveUrl(network.iconUrl),
                    });
                  }}
                />
                <View className="my-3 w-full border-b border-gray-300" />
              </React.Fragment>
            ))
          ) : (
            <Text>No networks available</Text>
          )}
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default Top_up_List;
