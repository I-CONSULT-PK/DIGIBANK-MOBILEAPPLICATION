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
import OptionBox from "../../../components/OptionBox";
import Top_up from "../../../assets/Top-up.png";
import Packages from "../../../assets/Packages.png";
import Footer from "../../../components/Footer";

const SelectOption_Top_up = () => {
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
            <Text className="text-white text-lg font-bold">Mobile Top ups</Text>
          </View>
        </View>
        <View className="px-2 mt-4">
          <Text className="text-lg font-semibold">Select Option</Text>
        </View>
        <View className=" px-4 mt-8">
          <OptionBox
            image={Top_up}
            text="Mobile Top up"
            subtext="Prepaid | Postpaid"
            icon1="arrowright"
            iconColor1={Color.PrimaryWebOrient}
            onPress1={() => navigation.navigate("Top_up_List")}
          />
          <View className="my-3 w-full border-b border-gray-300" />

          <OptionBox
            image={Packages}
            text="Mobile Packages"
            subtext="Subscribe to telecome Packages"
            icon1="arrowright"
            iconColor1={Color.PrimaryWebOrient}
            onPress1={() => navigation.navigate("Mobile_Packages")}
          />
          <View className="my-3 w-full border-b border-gray-300" />
        </View>
      </View>
      <Footer/>
    </SafeAreaView>
  );
};

export default SelectOption_Top_up;
