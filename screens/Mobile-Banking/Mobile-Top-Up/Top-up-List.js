import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import OptionBox from "../../../components/OptionBox";
import Jazz from "../../../assets/Jazz.png";
import Telenor from "../../../assets/Telenor.png";
import Ufone from "../../../assets/Ufone.png";
import Zong from "../../../assets/Zong.png";
import Footer from "../../../components/Footer";

const Top_up_List = () => {
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

        <View className=" px-4 mt-8">
          <OptionBox
            // image={{ uri: bank.bankLogo }}
            image={Jazz}
            text="Jazz"
            icon1="arrowright"
            iconColor1={Color.PrimaryWebOrient}
            onPress1={() => navigation.navigate("Add_Biller")}
          />
          <View className="my-3 w-full border-b border-gray-300" />

          <OptionBox
            // image={{ uri: bank.bankLogo }}
            image={Telenor}
            text="Telenor"
            icon1="arrowright"
            iconColor1={Color.PrimaryWebOrient}
            onPress1={() => navigation.navigate("")}
          />
          <View className="my-3 w-full border-b border-gray-300" />
          <OptionBox
            image={Ufone}
            text="Ufone"
            icon1="arrowright"
            iconColor1={Color.PrimaryWebOrient}
            onPress1={() => navigation.navigate("")}
          />
          <View className="my-3 w-full border-b border-gray-300" />
          <OptionBox
            image={Zong}
            text="Zong"
            icon1="arrowright"
            iconColor1={Color.PrimaryWebOrient}
            onPress1={() => navigation.navigate("")}
          />
          <View className="my-3 w-full border-b border-gray-300" />
        </View>
      </View>
      <Footer/>
    </SafeAreaView>
  );
};

export default Top_up_List;
