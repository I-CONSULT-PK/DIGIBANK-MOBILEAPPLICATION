import React from "react";
import { ScrollView, Text, View, StyleSheet,TouchableOpacity, } from "react-native";
import FBR from "../../../assets/Images/FBR.svg";
import SindhPolice from "../../../assets/Images/SindhPolice.svg";
import Ufone from "../../../assets/Images/Ufone";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const GovtOptions = [
  { label: "FBR", icon: <FBR style={{ top: 7 }} /> },
  { label: "FBR Income Tax", icon: <FBR style={{ top: 6 }} /> },
  { label: "Telenor Prepaid", icon: <FBR style={{ top: 6 }} /> },
  { label: "Sindh Police", icon: <SindhPolice style={{ top: 6 }} /> },
  //   { label: "Punjab Police", icon: <PunjabPolice style={{ top: 6 }} /> },
  //   { label: "Zong Postpaid", icon: <FBR style={{ top: 6 }} /> },
  { label: "Ufone Prepaid", icon: <Ufone style={{ top: 6 }} /> },
  { label: "Ufone Postpaid", icon: <Ufone style={{ top: 6 }} /> },
];

const Govt = () => {
  const navigation = useNavigation();

  const handleOptionSelect = (selectedOption) => {
    navigation.navigate("AddWalletBeneficiary", { selectedOption });
  };
  return (
    <ScrollView className="mb-20">
      <View className="bg-white flex-1">
        {GovtOptions.map((option, index) => (
          <TouchableOpacity
          key={index}
          onPress={() => handleOptionSelect(option.label)}
        >
          <View key={index} className="w-200 h-14 m-4 bg-background rounded">
            <View className="flex-row justify-between ml-2 mt-2 items-center">
              <View className="flex-row items-center">
                {option.icon}
                <Text className="font-Normal text-base px-1 mt-1 text-slate-500">
                  {option.label}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 10 }} />
            <Divider style={{ width: "100%", flex: 1, top: "20%" }} />
          </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollViewContent: {
    padding: "5%",
  },
});

export default Govt;
