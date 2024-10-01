import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { Color } from "../../GlobalStyles";
import Button from "../../components/Button";

const StartSection = ({ navigation }) => {
  return (
    <SafeAreaView
      className="h-full flex-1"
      style={{ backgroundColor: Color.PrimaryWebOrient }}
    >
      <LinearGradient
        colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
        style={{ flex: 1 }}
      >
        <View style={{ flexGrow: 1 }}>
          <View className="flex-1 justify-between">
            <View className="flex-1 justify-center items-center">
              <Image
                source={require("../../assets/logo.png")}
                resizeMode="contain"
                style={{ width: "45%", height: undefined, aspectRatio: 1 }}
                className="left-2"
              />
            </View>

            <View>
              <View className="flex justify-center items-center">
                <Image
                  source={require("../../assets/iPhone.png")}
                  resizeMode="contain"
                  style={{ width: "80%", height: undefined, aspectRatio: 1 }}
                />
              </View>

              <View className="w-full bg-white rounded-t-[30px] py-6 px-8 shadow-2xl">
                <View className="mb-4">
                  <Text className="text-center text-2xl font-bold font-InterBold">
                    Welcome to Digi-Bank
                  </Text>
                  <Text className="text-center text-base text-gray-500 mt-3 font-InterRegular">
                    Get sending, spending, and saving with your contactless
                    card.
                  </Text>
                </View>

                <View className="flex-row justify-between mt-4 mb-2">
                  <TouchableOpacity
                    className="border border-primary py-3.5 w-[35%] rounded-lg"
                    style={{ border: Color.PrimaryWebOrient }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text
                      className="text-base font-medium text-center font-InterSemiBold"
                      style={{ color: Color.PrimaryWebOrientTxtColor }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>

                  <Button
                    text="Get Started"
                    onPress={() => {
                      navigation.navigate("Registration");
                    }}
                    width="w-[60%]"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default StartSection;
