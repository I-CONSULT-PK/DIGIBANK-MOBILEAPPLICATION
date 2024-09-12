import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import CustomButton from "../../../components/Button";
import Footer from "../../../components/Footer";

const Packages = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
  };
  const handlePress = () => {
    // Handle link press here, e.g., open a URL
  };
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
        <ScrollView>
          {/* Main Content */}
          <View className=" p-4">
            <View className="shadow-gray-300  p-2 flex-row justify-around items-center w-full bg-white">
              <TouchableOpacity className="bg-white p-2 rounded-lg shadow-lg shadow-gray-300">
                <View className="flex flex-row items-center">
                  <Image
                    source={require("../../../assets/Jazz.png")}
                    className="mr-1 w-12 h-12"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-2 rounded-lg shadow-lg shadow-gray-300">
                <View className="flex flex-row items-center">
                  <Image
                    source={require("../../../assets/Telenor.png")}
                    className="mr-1 w-12 h-12"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-2 rounded-lg shadow-lg shadow-gray-300">
                <View className="flex flex-row items-center">
                  <Image
                    source={require("../../../assets/Ufone.png")}
                    className="mr-1 w-12 h-12"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-2 rounded-lg shadow-lg shadow-gray-300">
                <View className="flex flex-row items-center">
                  <Image
                    source={require("../../../assets/Zong.png")}
                    className="mr-1 w-12 h-12"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
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
                    className="py-2 px-4 border-2 rounded-lg"
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
            <View className="bg-white rounded-lg border border-gray-200 p-4 mt-4 shadow-sm">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-lg font-semibold text-black">
                    Monthly Social Pack
                  </Text>
                  <Text className="text-sm text-gray-500 mt-1">30 Days</Text>
                </View>
                <View
                  className="rounded-md px-4 py-2"
                  style={{ backgroundColor: Color.PrimaryWebOrient }}
                >
                  <Text className="text-white font-semibold">Rs. 1,565</Text>
                </View>
              </View>

              {/* Minutes and Data Details */}
              <View className="flex-row justify-between ">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">3000 Min</Text>
                  <Text className="text-sm text-gray-500">On-net Mins</Text>
                </View>
                <View className="w-px bg-gray-200 mx-4" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">500 Min</Text>
                  <Text className="text-sm text-gray-500">Off-net Mins</Text>
                </View>
              </View>
              <View className="my-3 w-full border-b border-gray-300" />
              <View className="flex-row justify-between mb-6">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">3000 Min</Text>
                  <Text className="text-sm text-gray-500">SMS</Text>
                </View>
                <View className="w-px bg-gray-200 mx-4" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">50 GBs</Text>
                  <Text className="text-sm text-gray-500">Data</Text>
                </View>
              </View>

              {/* Buy Now Button */}
              <View className=" mt-6">
                <CustomButton
                  text={"Next"}
                  onPress={() => navigation.navigate("Fatch_Details_Top_up")}
                />
              </View>
            </View>
            <View className="bg-white rounded-lg border border-gray-200 p-4 mt-4 shadow-sm">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-lg font-semibold text-black">
                    Weekly Social Pack
                  </Text>
                  <Text className="text-sm text-gray-500 mt-1">30 Days</Text>
                </View>
                <View
                  className=" rounded-md px-4 py-2"
                  style={{ backgroundColor: Color.PrimaryWebOrient }}
                >
                  <Text className="text-white font-semibold">Rs. 1,565</Text>
                </View>
              </View>

              {/* Minutes and Data Details */}
              <View className="flex-row justify-between ">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">3000 Min</Text>
                  <Text className="text-sm text-gray-500">On-net Mins</Text>
                </View>
                <View className="w-px bg-gray-200 mx-4" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">500 Min</Text>
                  <Text className="text-sm text-gray-500">Off-net Mins</Text>
                </View>
              </View>
              <View className="my-3 w-full border-b border-gray-300" />
              <View className="flex-row justify-between mb-6">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">3000 Min</Text>
                  <Text className="text-sm text-gray-500">SMS</Text>
                </View>
                <View className="w-px bg-gray-200 mx-4" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">50 GBs</Text>
                  <Text className="text-sm text-gray-500">Data</Text>
                </View>
              </View>

              {/* Buy Now Button */}
              <View className=" mt-6">
                <CustomButton
                  text={"Next"}
                  onPress={() => navigation.navigate("Fatch_Details_Top_up")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer/>
    </SafeAreaView>
  );
};

export default Packages;
