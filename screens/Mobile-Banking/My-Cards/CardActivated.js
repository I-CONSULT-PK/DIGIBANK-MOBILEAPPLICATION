import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CardActivatedDoneBlue from "../../../assets/CardActivatedDoneBlue.png"; 
import CustomButton from "../../../components/Button";

const CardActivated = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="p-6 items-center">
        <Image source={CardActivatedDoneBlue} className="w-26 h-26 mb-4" />
        <Text className="text-2xl font-bold">Congratulations 🎉</Text>
       
        <Text className="text-base  text-gray-500 mt-10 text-center">
          Your card is now active and ready to use. Enjoy seamless transactions,
          manage your finances, and access exclusive offers with Digi Bank.
          Happy banking!
        </Text>
        {/* <View className="p-5">
          <CustomButton
            Text={"Next"}
            onPress={() => navigation.navigate("CardActivated")}
          />
        </View> */}
      </View>
    </View>
  );
};

export default CardActivated;
