import React from 'react'
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
import Footer from "../../../components/Footer";
const Add_Account = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get("window");
    const horizontalPadding = 16;
  return (
    <SafeAreaView className="flex-1">
    <View className="flex-1 bg-white">
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
          <Text className="text-white text-lg font-bold">Add Account</Text>
        </View>
      </View>
      <View className="px-4">
        <View className="mt-6">
          <Text className="text-lg font-semibold">Link Account</Text>
          <TextInput
            className="mt-2 border border-gray-200 rounded-lg p-2"
            placeholder="Account No..."
          />
          
        </View>

        <View className=" mt-6">
          <CustomButton
            text={"Fatch Title"}
            onPress={() => navigation.navigate("")}
          />
        </View>
      </View>
    </View>
    <Footer/>
  </SafeAreaView>
  )
}

export default Add_Account
