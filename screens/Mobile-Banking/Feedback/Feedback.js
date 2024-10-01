import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import Footer from "../../../components/Footer";
import { StatusBar } from "expo-status-bar";
import TextInput from "../../../components/TextInput"; 
import Button from "../../../components/Button"; 

const Feedback = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(3.5);
  const [suggestion, setSuggestion] = useState("");

  const renderStars = () =>
    [...Array(5)].map((_, index) => (
      <TouchableOpacity key={index + 1} onPress={() => setRating(index + 1)}>
        <Ionicons
          name={index < rating ? "star" : "star-outline"}
          size={32}
          color={index < rating ? "#FFD700" : "#D3D3D3"}
        />
      </TouchableOpacity>
    ));

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
              Digi-Bank Complaints
            </Text>
          </View>
        </View>
        <View className="flex flex-col bg-white rounded-lg p-5 w-10/12 m-auto mt-16 items-center shadow-lg shadow-gray-300">
          <View className="items-center">
            <View className="shadow-lg shadow-gray-300 bg-white rounded-full w-[90px] h-[90px] absolute -top-16" />
            <View className="bg-yellow-400 rounded-full p-3 mb-5 w-18 h-18 absolute -top-14 z-10">
              <Ionicons name="star" size={48} color="#ffffff" />
            </View>
          </View>
          <View className="mt-10">
            <Text className="text-lg font-bold text-center mb-5">
              Please Rate Your Experience With Digi-Bank
            </Text>
            <View className="flex-row justify-center mb-5">
              {renderStars()}
            </View>
            <Text className="text-sm text-gray-600 text-center mb-2">
              Share your suggestion below to help us improve your experience
            </Text>
            <TextInput
              placeholder="Enter Here"
              value={suggestion}
              onChange={setSuggestion}
              className=" rounded-md p-2 w-72 text-base mb-5"
              multiline
            />
          </View>
          <View className="w-full">
            <Button text="Send Now" width="auto" styles="py-4" />
          </View>
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default Feedback;
