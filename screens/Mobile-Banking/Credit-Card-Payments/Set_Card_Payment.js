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
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
const Set_Card_Payment = () => {
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
            <Text className="text-white text-lg font-bold">Enter Amount</Text>
          </View>
        </View>
        <ScrollView>
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
                  source={require("../../../assets/digi-bank.png")}
                  className="mr-1 w-12 h-12"
                  resizeMode="contain"
                />
                <View>
                  <Text className="text-base font-semibold ml-3">
                    Ahmed Khan
                  </Text>
                  <Text className="text-sm text-gray-300 ml-3 mt-1">
                    0312564789032
                  </Text>
                </View>
              </View>
            </View>

            {/* Consumer Details Section */}
            <View className="mt-4 shadow-gray-300">
              <View className="bg-white p-3 rounded-lg shadow-lg w-full">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-gray-500">Card Title</Text>
                  <Text className="text-sm font-medium">Muhammad Hamza </Text>
                </View>
                <View className="my-2">
                  <View className="border-t border-gray-300"></View>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-gray-500">Dua Date</Text>
                  <Text className="text-sm font-medium">06/09/2024</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Section */}
          <View className="p-4">
            <Text className="text-lg font-semibold">
              Credit Card Bill Payments
            </Text>
            <TextInput
              className="mt-2 border border-gray-200 rounded-lg p-2"
              placeholder="0.00"
            />
          </View>
          <View className="flex-row justify-around items-center mt-4 p-2">
            {/* Statement Balance Box */}
            <TouchableOpacity className="flex-1 bg-sky-200 border border-sky-300 rounded-lg mx-1 p-2 h-20 justify-center items-center">
              <Text className="text-base font-bold text-center">263890</Text>
              {/* <AntDesign name="checkcircle" size={20} color="#00ADEF" /> */}
              <Text className="text-center text-xs text-gray-500 mt-1">
                Statement Balance
              </Text>
            </TouchableOpacity>

            {/* Min. Amount Due Box */}
            <TouchableOpacity className="flex-1 bg-white border border-gray-300 rounded-lg mx-1 p-2 h-20 justify-center items-center">
              <Text className="text-base font-bold text-black text-center">
                0
              </Text>
              <Text className="text-center text-xs text-gray-500 mt-1">
                Min. Amount Due
              </Text>
            </TouchableOpacity>

            {/* Other Amount Box */}
            <TouchableOpacity className="flex-1 bg-white border border-gray-300 rounded-lg mx-1 p-2 h-20 justify-center items-center">
              <Text className="text-base font-bold text-black text-center">
                Other
              </Text>
              <Text className="text-center text-xs text-gray-500 mt-1">
                Amount
              </Text>
            </TouchableOpacity>
          </View>
          <View className="p-4 mt-6">
            <CustomButton
              text={"Pay Now"}
              onPress={() => navigation.navigate("Card_Payment_Transfer")}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Set_Card_Payment;
