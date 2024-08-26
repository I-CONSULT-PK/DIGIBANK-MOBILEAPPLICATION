import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, Image, TextInput } from "react-native";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SelectApplyOptionCard = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className=" bg-[#f9fafc]" style={{ flex: 1 }}>
      <ScrollView>
        <View className=" flex-1">
        <View className="flex-row items-center justify-center w-full mt-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-5"
        >
          <Entypo name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
        <Text className="font-InterBold text-2xl">Cards</Text>
      </View>
          <View className="p-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("ApplyCard")}
              className="flex-row items-center justify-between bg-white p-4 mb-2 rounded-lg shadow-inner"
            >
              <View className="flex-row items-center">
                <Image
                  source={require("../../../assets/card-management.png")}
                  className="w-6 h-6 mr-3"
                />
                <Text className=" text-lg text-black font-InterSemiBold">
                  Apply Your Card
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("SupplementaryCard")}
              className="flex-row items-center justify-between bg-white p-4 mb-2 rounded-lg shadow-inner"
            >
              <View className="flex-row items-center">
                <Image
                  source={require("../../../assets/card-management.png")}
                  className="w-6 h-6 mr-3"
                />
                <Text className=" text-lg text-black font-InterSemiBold">
                  Apply Supplementary Card
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectApplyOptionCard;
