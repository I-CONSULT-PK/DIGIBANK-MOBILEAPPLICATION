import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import CustomButton from "../../../components/Button";
import Footer from "../../../components/Footer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../../config";

const Packages = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;
  const [selectedId, setSelectedId] = useState(null);

  const [networks, setNetworks] = useState([]);
  const [packages, setPackages] = useState([]);

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

          // Log the response to check data structure
          // console.log("API Response:", response.data);

          // Check if the response contains an array of networks
          if (
            response &&
            response.data.success &&
            Array.isArray(response.data.data)
          ) {
            setNetworks(response.data.data); // Update state with network data
          } else {
            Alert.alert("Error", "Unexpected response from server");
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
      }
    };

    fetchNetwork();
  }, []);
  const convertDriveUrl = (url) => {
    const fileId = url.match(/d\/(.*?)\//)[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };
  const handlePress = () => {
    // Handle link press here, e.g., open a URL
  };

  const getAllPackges = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");

      if (bearerToken) {
        const response = await axios.post(
          `${API_BASE_URL}/v1/topup/getPackages`,
          {},
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        const dto = response.data;
        // console.log(dto)
        if (dto && dto.success && dto.data) {
          setPackages(dto.data);
        } else {
          if (dto.message) {
            Alert.alert("Error", dto.message);
          } else if (dto.errors && dto.errors.length > 0) {
            Alert.alert("Error", dto.errors);
          }
        }
      } else {
        Alert.alert("Error", "Unexpected error occured. Try again later!");
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

  useEffect(() => {
    getAllPackges();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[F5F5F5]">
        {/* Header Section */}
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
            <Text className="text-white text-lg font-bold">Mobile Top Ups</Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="p-4">
          <View className="shadow-gray-300 p-2 flex-row justify-around items-center w-full bg-white">
            <ScrollView
              className="pt-1 mx-2"
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {networks.map((network, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-white p-2 ml-2 rounded-lg shadow-lg shadow-gray-300"
                >
                  <View className="flex flex-row items-center">
                    <Image
                      source={{ uri: convertDriveUrl(network.iconUrl) }}
                      className="mr-1 w-12 h-12"
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <ScrollView
            className="pt-1 mx-2"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row space-x-2 mt-3">
              {[
                { id: 1, label: "All" },
                { id: 2, label: "Call" },
                { id: 3, label: "Data" },
                { id: 4, label: "Hybrid" },
              ].map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleSelect(option.id)}
                  style={{
                    backgroundColor:
                      selectedId === option.id
                        ? Color.PrimaryWebOrient
                        : "white",
                    borderColor:
                      selectedId === option.id
                        ? Color.PrimaryWebOrient
                        : "white",
                  }}
                  className="py-2 px-4 h-12 border-2 rounded-lg"
                >
                  <Text
                    style={{
                      color: selectedId === option.id ? "white" : "black",
                    }}
                    className="text-left font-InterSemiBold"
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <ScrollView
            className="mt-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 250 }}
          >
            {packages && packages.length > 0 ? (
              packages.map((pkg, index) => (
                <View
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 p-4 mt-4 shadow-sm"
                >
                  {/* Package Content */}
                  <View className="flex-row justify-between items-center mb-4">
                    <View>
                      <Text className="text-lg font-semibold text-black">
                        {pkg.pkgName}
                      </Text>
                      <Text className="text-sm text-gray-500 mt-1">
                        {pkg.validityDays} Days
                      </Text>
                    </View>
                    <View
                      className="rounded-md px-4 py-2"
                      style={{ backgroundColor: Color.PrimaryWebOrient }}
                    >
                      <Text className="text-white font-semibold">
                        Rs. {pkg.price}
                      </Text>
                    </View>
                  </View>

                  {/* Minutes and Data Details */}
                  <View className="flex-row justify-between">
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-black">
                        {pkg.onNetMints} Min
                      </Text>
                      <Text className="text-sm text-gray-500">On-net Mins</Text>
                    </View>
                    <View className="w-px bg-gray-200 mx-4" />
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-black">
                        {pkg.offNetMints} Min
                      </Text>
                      <Text className="text-sm text-gray-500">
                        Off-net Mins
                      </Text>
                    </View>
                  </View>
                  <View className="my-3 w-full border-b border-gray-300" />
                  <View className="flex-row justify-between mb-6">
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-black">
                        {pkg.smsCount} SMS
                      </Text>
                      <Text className="text-sm text-gray-500">SMS</Text>
                      <Text className="text-sm text-gray-500">NetworkId: {pkg.networkId}</Text>
                    </View>
                    <View className="w-px bg-gray-200 mx-4" />
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-black">
                        {pkg.totalGBs} GB
                      </Text>
                      <Text className="text-sm text-gray-500">Data</Text>
                      <Text className="text-sm text-gray-500">PackagesID: {pkg.pkgId}</Text>
                    </View>
                  </View>

                  {/* Buy Now Button */}
                  <View className="mt-6">
                    <CustomButton
                      text={"Next"}
                      onPress={() =>
                        navigation.navigate("Fatch_Details_Top_up", {
                          price: pkg.price,
                          name: pkg.pkgId,
                          id: pkg.pkgId
                        })
                      }
                    />
                  </View>
                </View>
              ))
            ) : (
              <Text>No packages available</Text> 
            )}
          </ScrollView>
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default Packages;
