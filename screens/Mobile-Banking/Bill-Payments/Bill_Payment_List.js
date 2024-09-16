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

const Bill_Payment_List = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;
  const options = [
    {
      id: 1,
      title: "Electricity",
      image: require("../../../assets/Electricity.png"),
      link: "AddAccountScreen",
    },
    {
      id: 2,
      title: "Gas",
      image: require("../../../assets/Gas.png"),
      link: "CreatePinScreen",
    },
    {
      id: 3,
      title: "Internet",
      image: require("../../../assets/Internet.png"),
      link: "Net_Bill_Pyament_List",
    },
    {
      id: 4,
      title: "PTCL",
      image: require("../../../assets/PTCL.png"),
      link: "LimitManagementScreen",
    },
    {
      id: 5,
      title: "Water",
      image: require("../../../assets/water.png"),
      link: "OTP_Preference",
    },
    {
      id: 6,
      title: "Credit Card",
      image: require("../../../assets/Credit Card.png"),
      link: "Card_Payment_List",
    },
  ];
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
            <Text className="text-white text-lg font-bold">Bill Payments</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 mt-2">
            <View className="px-4 py-2">
              <Text className="text-base font-InterSemiBold">Select Bill Type</Text>
            </View>
            <View className="flex-row flex-wrap justify-center">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => navigation.navigate(option.link)}
                  className="p-2"
                  style={{ width: (width - horizontalPadding * 1.2) / 2 }}
                >
                  <View className="bg-white rounded-lg p-2 shadow-lg  shadow-slate-400 flex-row items-center h-[55px]">
                    <Image
                      source={option.image}
                      className="w-8 h-8 mr-2"
                      resizeMode="contain"
                    />
                    <Text className="text-[12px] font-normal flex-shrink flex-grow w-36">
                      {option.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Bill_Payment_List;
