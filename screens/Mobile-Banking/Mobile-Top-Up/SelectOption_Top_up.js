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

const SelectOption_Top_up = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;
  return(
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
    </View>
  </SafeAreaView>
  )
};

export default SelectOption_Top_up;
