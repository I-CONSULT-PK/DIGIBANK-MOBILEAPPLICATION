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
const Fatch_Bank_Details = () => {
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
              Credit Card Payments
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1  p-4">
          {/* Upper Section */}
          <View className="shadow-gray-100">
            <View className="bg-white p-3 rounded-lg shadow-lg w-full">
              <View className="flex flex-row items-center">
                <Image
                  source={require("../../../assets/digi-bank.png")}
                  className="mr-1 w-12 h-12"
                  resizeMode="contain"
                />

                {/* Main container with text and icon */}
                <View className="flex-1 flex-row justify-between items-center">
                  <View>
                    <Text className="text-base font-semibold ml-3">
                      Digi-Bank Credit Card
                    </Text>
                    <Text className="text-sm text-gray-300 ml-3 mt-1">
                      0328648925697
                    </Text>
                  </View>

                  {/* Aligning the icon to the right */}
                  <AntDesign
                    name="down"
                    size={25}
                    color="bg-primery"
                    className="mr-3"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Section */}
          <View className="mt-6">
            <Text className="text-lg font-semibold">Credit Card</Text>
            <TextInput
              className="mt-2 border border-gray-200 rounded-lg p-2"
              placeholder=""
            />
          </View>
          <View className="mt-4">
            <Text className="text-lg font-semibold">CNIC</Text>
            <TextInput
              className="mt-2 border border-gray-200 rounded-lg p-2"
              placeholder="48987-7698989-8"
            />
          </View>

          <View className=" mt-6">
            <CustomButton
              text={"Next"}
              onPress={() => navigation.navigate("Set_Card_Payment")}
            />
          </View>
        </View>
      </View>
      <Footer/>
    </SafeAreaView>
  );
};

export default Fatch_Bank_Details;
