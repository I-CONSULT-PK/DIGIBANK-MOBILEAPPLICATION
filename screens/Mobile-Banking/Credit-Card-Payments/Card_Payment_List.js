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
import Digi_bank  from "../../../assets/digi-bank.png";
import Other_bank  from "../../../assets/Other-bank.png";

const Card_Payment_List = () => {
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
              Credit Card Payments
            </Text>
          </View>
        </View>
        <View className="px-4">
          
          <View className="mt-8">
            <OptionBox
              // image={{ uri: bank.bankLogo }}
              image={Digi_bank}
              text="Digi-Bank"
              icon1="arrowright"
              iconColor1={Color.PrimaryWebOrient}
              onPress1={() => navigation.navigate("Fatch_Bank_Details")}
            />
            <View className="my-3 w-full border-b border-gray-300" />

            <OptionBox
              // image={{ uri: bank.bankLogo }}
              image={Other_bank}
              text="Other Bank"
              icon1="arrowright"
              iconColor1={Color.PrimaryWebOrient}
              onPress1={() => navigation.navigate("Fatch_Other_Bank_Details")}
            />
            <View className="my-3 w-full border-b border-gray-300" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Card_Payment_List;
