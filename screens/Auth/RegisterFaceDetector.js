import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";

const RegisterFaceDetector = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="h-full flex-1 bg-white">
      <TouchableOpacity onPress={() => navigation.navigate("ChooseSecurity")}>
        <Entypo
          name="chevron-left"
          size={wp("8%")}
          color="#000"
          marginTop={hp("5%")}
        />
      </TouchableOpacity>
      <View className="flex-1 justify-between">
        <View className="flex-1 justify-center items-center -top-14">
          <Text className="text-2xl font-semibold text-center ">
          Let’s verify your identity
          </Text>
          <Text className="text-base text-center mt-2 mb-4 px-8">
          We’re required by law to verify your identity before we can use your money.
          </Text>
          <Image
            source={require("../../assets/facedetector.png")}
            resizeMode="contain"
            style={{ width: "60%", height: undefined, aspectRatio: 1 }}
            className="mt-2"
          />
          <View className=" mt-10 px-4">
            <Button
              text="Enable Face ID Access"
              width="w-[100%]"
              styles="px-5"
            />
          </View>
        </View>
      </View>
      <StatusBar backgroundColor='#ffffff' style="dark" />
    </SafeAreaView>
  )
}

export default RegisterFaceDetector
