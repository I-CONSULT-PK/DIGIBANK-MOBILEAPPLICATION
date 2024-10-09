import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import Footer from "../../../components/Footer";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../../components/Button";
const SuccessfullFeedback = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          className="h-24"
          style={{ backgroundColor: Color.PrimaryWebOrient }}
        >
          <View className="flex-row items-center justify-center h-full">
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">
              Feedback
            </Text>
          </View>
        </View>
        <View className="flex flex-col bg-white rounded-lg p-5 w-10/12 m-auto mt-16 items-center shadow-lg shadow-gray-300">
          <View className="items-center">
            <View className="shadow-lg shadow-gray-300 bg-white rounded-full w-[90px] h-[90px] absolute -top-16" />
            <View className="shadow-md shadow-slate-400 bg-white rounded-full p-2 absolute -top-16 items-center justify-center">
              <Image
                source={require("../../../assets/check.png")}
                resizeMode="contain"
                className="w-18 h-18"
              />
            </View>
          </View>
          <View className="mt-10">
            <Text className="text-lg font-bold text-center mb-5">
              Your Feedback Has Been Sent Successfully
            </Text>
            <Text className="text-md text-black font-InterSemiBold  text-center mb-2">
              16 September 2024 | 05:06 PM
            </Text>
            <Text className="text-sm text-gray-600 text-center mb-5">
              Thanks! Your feedback is valuable and helps us provide you a
              better experience
            </Text>
          </View>
          <View className="w-full">
            <CustomButton text="Done" width="auto" styles="py-4" />
          </View>
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default SuccessfullFeedback;
