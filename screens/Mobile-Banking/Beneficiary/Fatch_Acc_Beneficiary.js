import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, Image, } from "react-native";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
import { Entypo } from "@expo/vector-icons";

import { Divider } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

const Fatch_Acc_Beneficiary = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className=" bg-[#f9fafc]" style={{ flex: 1 }}>
      <ScrollView>
        <View className=" flex-1">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo
              name="chevron-left"
              size={wp("8%")}
              color="#090909"
              marginTop={hp("2%")}
            />
          </TouchableOpacity>
          <View className="justify-center items-center">
            <Text className="font-InterBold text-2xl ">Send Money</Text>
          </View>
        </View>
        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold ">From Account</Text>
        </View>
        <View className="flex-1 justify-center items-center p-4 shadow-gray-100">
          <View className="bg-white p-3 rounded-lg shadow-lg w-full">
            <View className="d-flex flex-row  items-center">
              <Image
                source={require("../../../assets/ubi_icon.png")}
                className=" mr-1"
              />
              <Text className="text-lg font-semibold ml-3">
                United Bank Limited
              </Text>
            </View>
          </View>
        </View>
        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold ">Confirm Following Beneficiary Details</Text>
        </View>
        <View className="flex-1 justify-center items-center p-4 shadow-gray-100">
          <View className="bg-white p-3 rounded-lg shadow-lg w-full">
            <View className=" flex-row items-center justify-between">
              <Text className="text-sm text-gray-500">Account Title</Text>
              <Text className="text-sm font-medium  ">Mahrukh Zafar</Text>
            </View>
            <View className="my-2">
                <View className="border-t border-gray-300" >
              </View>
            </View>
            <View className=" flex-row items-center justify-between">
              <Text className="text-sm text-gray-500">Bank Name </Text>
              <Text className="text-sm font-medium  ">United Bank Limited</Text>
            </View>
          </View>
        </View>

        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold">Nick Name</Text>
          <TextInput
            className="mt-2 border border-gray-200 rounded-lg"
            placeholder="Enter your name here"
          />
        </View>
        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold">
            Mobile Number (optional)
          </Text>
          <TextInput
            className="mt-2 border border-gray-200 rounded-lg"
            placeholder="Enter your mobile number"
          />
        </View>
        <View className="px-6 mt-8">
          <CustomButton text={"Add"} onPress={() => navigation.navigate("SendFromAccount")}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Fatch_Acc_Beneficiary;
