import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView,  BackHandler, } from "react-native";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../../../GlobalStyles";
import { Divider } from "@rneui/themed";
import { Avatar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Transfer = () => {
  const handleBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const handleBackPress = () => {
      // Manually navigate to the back screen
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView className=" bg-white ">
        <View className=" bg-white flex-1">
          <TouchableOpacity onPress={handleBack}>
            <Entypo
              name="chevron-left"
              size={30}
              color="#090909"
              marginTop={20}
            />
          </TouchableOpacity>
          {/* <View className="justify-center items-center p-3">
                        <Text className="font-InterBold text-3xl">Transfer</Text>
                    </View> */}
          <View className="justify-center  h-144 w-50 m-4 bg-background rounded-lg items-center mt-2">
            <Avatar.Image
              source={require("../../../assets/Images/check-box.png")}
              style={styles.stretch}
            />
            <View className="p-3 ">
              <Text
                className="font-InterBold text-3xl  text-center"
                style={{ color: Color.PrimaryWebOrientTxtColor }}
              >
                Zanbeel
              </Text>
              <Text className=" mt-1 text-center text-base font-semibold">
                Transaction Successful
              </Text>
              <Text className="text-base text-center font-InterMedium text-text-gray ">
                17 January 2024 | 10:58 AM{" "}
              </Text>
              <View className="flex-row justify-between mt-4">
                <View className="mr-5">
                  <Text className="font-semibold text-base">To</Text>
                  <Text className="font-semibold text-base">
                    To Account/IBAN
                  </Text>
                  <Text className="font-semibold text-base">From</Text>
                  <Text className="font-semibold text-base">From Account</Text>
                  <Text className="font-semibold text-base">
                    Transaction Type
                  </Text>
                </View>
                <View className="ml-5">
                  <Text className="font-semibold text-base text-right">
                    Mir Hamza Khan
                  </Text>
                  <Text className="font-semibold text-base text-right">
                    0738******8269
                  </Text>
                  <Text className="font-semibold text-base text-right">
                    Faizan Ahmed
                  </Text>
                  <Text className="font-semibold text-base text-right">
                    0738******8269
                  </Text>
                  <Text className="font-semibold text-base text-right">
                    Interbranch
                  </Text>
                </View>
              </View>
              <Divider />
              <View className="flex-row justify-between mt-2 mb-2">
                <View>
                  <Text className="font-semibold text-base">Amount</Text>
                </View>
                <View>
                  <Text className="font-semibold text-base text-right">
                    PKR 10,000
                  </Text>
                </View>
              </View>
              <Divider />
            </View>
          </View>
          <View className="justify-center items-center mt-2">
            <View className="flex-row justify-between">
              <View className="m-4">
                <View style={styles.circleContainer}>
                  <Entypo
                    name="download"
                    size={30}
                    style={{
                      color: Color.PrimaryWebOrient,
                    }}
                  />
                </View>
                <Text className="font-medium text-sm text-center mt-1">
                  Download
                </Text>
              </View>
              <View className="m-4">
                <View style={styles.circleContainer}>
                  <Entypo
                    name="share"
                    size={30}
                    style={{
                      color: Color.PrimaryWebOrient,
                    }}
                  />
                </View>
                <Text className="font-medium text-sm text-center mt-1">
                  Whatsapp
                </Text>
              </View>
              <View className="m-4">
                <View style={styles.circleContainer}>
                  <Entypo
                    name="save"
                    size={30}
                    style={{
                      color: Color.PrimaryWebOrient,
                    }}
                  />
                </View>
                <Text className="font-medium text-sm text-center mt-1">
                  PDF
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  stretch: {
    marginTop: -30,
  },
  circleContainer: {
    top: hp("0.5%"),
    marginBottom: hp("0.005%"),
    borderRadius: wp("50%"),
    width: wp("16%"),
    height: wp("16%"),
    backgroundColor: "#f4f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Transfer;
