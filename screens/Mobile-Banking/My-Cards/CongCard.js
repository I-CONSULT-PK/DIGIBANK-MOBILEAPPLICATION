import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CongCard = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("NameOnTheCard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center">
      <View className="p-3 items-center">
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
