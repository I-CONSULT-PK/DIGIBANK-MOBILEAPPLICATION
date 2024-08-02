import React from "react";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CongCard = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-cente">
        <View className=" p-3 items-center">
          <Image
           source={require("../../../assets/cong.png")} 
            className="w-26 h-26 mb-4"
          />
          <Text className="text-2xl font-semibold text-cyan-500">
            Congratulations 🎉
          </Text>
          <Text className="text-base font-medium text-gray-500 mt-2">
            Your Credit Card Is Approved
          </Text>
        </View>
      </View>
  );
};

export default CongCard;
