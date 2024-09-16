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
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
const Set_Payment = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;
  return (
    <SafeAreaView className="flex-1">
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="h-24" style={{ backgroundColor: Color.PrimaryWebOrient }}>
        <View className="flex-row items-center justify-center h-full">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute left-5"
          >
            <Entypo name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Enter Amount</Text>
        </View>
      </View>
  
      {/* From Account Section */}
      <View className="px-6 mt-4">
        <Text className="text-lg font-semibold">From Account</Text>
      </View>
  
      {/* Main Content */}
      <View className=" p-4 shadow-gray-300">
        {/* Account Details Section */}
        <View className="bg-white p-3 rounded-lg shadow-lg w-full">
          <View className="flex flex-row items-center">
            <Image
              source={require("../../../assets/Qubee.png")}
              className="mr-1 w-12 h-12"
              resizeMode="contain"
            />
            <View>
              <Text className="text-base font-semibold ml-3">Internet</Text>
              <Text className="text-sm text-gray-300 ml-3 mt-1">
                PTCL EVO Postpaid
              </Text>
            </View>
          </View>
        </View>
  
        {/* Available Balance Section */}
        <View className="px-2 mt-4">
          <Text className="text-lg font-semibold">Available balance Rs.20,000</Text>
        </View>
  
        {/* Consumer Details Section */}
        <View className="mt-4 shadow-gray-300">
          <View className="bg-white p-3 rounded-lg shadow-lg w-full">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-500">Company</Text>
              <Text className="text-sm font-medium">PTCL EVO Postpaid</Text>
            </View>
            <View className="my-2">
              <View className="border-t border-gray-300"></View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-500">Consumer Number</Text>
              <Text className="text-sm font-medium">03115565907</Text>
            </View>
          </View>
        </View>
      </View>
  
      {/* Bottom Section */}
      <View className="p-4">
        <Text className="text-lg font-semibold">Enter Amount</Text>
        <TextInput
          className="mt-2 border border-gray-200 rounded-lg p-2"
          placeholder="0.00"
        />
        <Text className="text-sm">Enter an amount between Rs. 1 and Rs. 10,000</Text>
      </View>
      <View className="p-4 mt-6">
            <CustomButton text={"Pay Now"}
            onPress={()=>navigation.navigate("Bill_Payment_Transfer") }/>
          </View>
    </View>
  </SafeAreaView>
  
  );
};

export default Set_Payment;
