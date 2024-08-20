import React from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../../../components/Button";

const SupplementaryCardLimitSplit = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1  bg-[#f9fafc]">
      <View className="flex-1 items-center justify-center p-5 bg-white">
        <Text className="text-2xl font-bold text-center mb-2 px-3">
          Do You Want To Set Credit Card
        </Text>
        <Text className="text-base text-center text-gray-600 px-5 mb-6">
          Lorem ipsum dolor sit amet consectetur. Ornare lorem velit ultrices
          blandit sit amet consectetur. Ornare lorem velit ultrices blandit
        </Text>
        <Image
          source={require("../../../assets/SupplementaryCardLimitSpli.png")} // Replace with your image path
          className="w-40 h-40 mb-5"
        />
        <View className=" mt-5">
          <Button
            text='SPLT LIMIT'
            width='w-[100%]'
            styles='py-3 px-14'
            onPress={() => navigation.navigate("SelectApplyOptionCard")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SupplementaryCardLimitSplit;
