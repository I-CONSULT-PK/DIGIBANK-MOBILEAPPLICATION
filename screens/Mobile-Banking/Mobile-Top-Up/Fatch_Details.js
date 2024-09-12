import React from "react";
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
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
import Footer from "../../../components/Footer";
import Packages from './Packages';
const Fatch_Details = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
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
            <Text className="text-white text-lg font-bold">
              Mobile Top up
            </Text>
          </View>
        </View>
        <View className="flex-1  p-4">
          {/* Upper Section */}
          <View className="shadow-gray-100">
            <View className="bg-white p-3 rounded-lg shadow-lg w-full">
              <View className="flex flex-row items-center">
                <Image
                  source={require("../../../assets/Jazz.png")}
                  className="mr-1 w-12 h-12"
                  resizeMode="contain"
                />

                {/* Main container with text and icon */}
                <View className="flex-1 flex-row justify-between items-center">
                  <View>
                    <Text className="text-base font-semibold ml-3">
                      Ahmad Khan
                    </Text>
                    <Text className="text-sm text-gray-300 ml-3 mt-1">
                      0300 5689546
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
            <View className="mt-4 shadow-gray-300">
              <View className="bg-white p-3 rounded-lg shadow-lg w-full">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-gray-500">Telecom</Text>
                  <Text className="text-sm font-medium">Jazz </Text>
                </View>
                <View className="my-2">
                  <View className="border-t border-gray-300"></View>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-gray-500">Package Name</Text>
                  <Text className="text-sm font-medium">Monthly Social Pack</Text>
                </View>
              </View>
            </View>

          {/* Bottom Section */}
          <View className="mt-6">
            <Text className="text-lg font-semibold">Package Amount</Text>
            <TextInput
              className="mt-2 border border-gray-200 rounded-lg p-2"
              placeholder="Amount.."
            />
          </View>  
          <View className=" mt-6">
            <CustomButton
              text={"Pay Now"}
              onPress={() => navigation.navigate("To_Up_Transfer")}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Fatch_Details;
