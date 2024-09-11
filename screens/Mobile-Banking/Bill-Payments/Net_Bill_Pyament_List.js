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
import SearchBar from "../../../components/SearchBar";
import OptionBox from "../../../components/OptionBox";
import Qubee from "../../../assets/Qubee.png";
import Ptcl from "../..//../assets/Ptcl-Bill.png"
import WiTribe from "../../../assets/Wi-tribe.png"
const Net_Bill_Pyament_List = () => {
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
            <Text className="text-white text-lg font-bold">
              Internet Payments
            </Text>
          </View>
        </View>
        <View className="px-4">
          <View className=" py-2">
            <SearchBar placeholder="Select Company" />
          </View>
          <View className="mt-8">
            <OptionBox
              // image={{ uri: bank.bankLogo }}
              image={Qubee}
              text="Qubee"
              icon1="arrowright"
              iconColor1={Color.PrimaryWebOrient}
              onPress1={()=>navigation.navigate("Fatch_Payment_Details") }
            />
            <View className="my-3 w-full border-b border-gray-300" />

            <OptionBox
              // image={{ uri: bank.bankLogo }}
              image={WiTribe}
              text="Wi-tribe"
              icon1="arrowright"
              iconColor1={Color.PrimaryWebOrient}
            />
            <View className="my-3 w-full border-b border-gray-300" />

            <OptionBox
              // image={{ uri: bank.bankLogo }}
              image={Ptcl}
              text="PTCL EVO Prepaid"
              icon1="arrowright"
              iconColor1={Color.PrimaryWebOrient}
            />
            <View className="my-3 w-full border-b border-gray-300" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Net_Bill_Pyament_List;
