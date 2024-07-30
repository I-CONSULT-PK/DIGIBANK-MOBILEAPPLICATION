import React from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Telenor from "../../../assets/Images/Telenor.svg";
import Zong from "../../../assets/Images/Zong.svg";
import Jazz from "../../../assets/Images/Jazz.svg";
import { useNavigation } from "@react-navigation/native";

import { Divider } from "@rneui/themed";

const MobileBundlesOptions = [
  { label: "Prepaid MBB Monthly 100GB", icon: <Zong style={{ top: 7 }} /> },
  { label: "Monthly Whatsapp", icon: <Telenor style={{ top: 6 }} /> },
  { label: "Weekly premium ", icon: <Jazz style={{ top: 6 }} /> },
  { label: "Data 1hr", icon: <Jazz style={{ top: 6 }} /> },
  { label: "Call Day Night", icon: <Zong style={{ top: 6 }} /> },
  { label: "Social media Packege", icon: <Telenor style={{ top: 6 }} /> },
  //   { label: "SnapChat unlimited", icon: <Telenor style={{ top: 7 }} /> },
  //   { label: "Ufone Postpaid", icon: <Ufone style={{ top: 6 }} /> },
];

const MobileBundles = () => {
  const navigation = useNavigation();

  const handleOptionSelect = (selectedOption) => {
    navigation.navigate("AddWalletBeneficiary", { selectedOption });
  };
  return (
    <ScrollView>
      <View className="bg-white flex-1 mb-20">
        {MobileBundlesOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionSelect(option.label)}
          >
            <View key={index} className="w-200 h-14 m-4 bg-background rounded">
              <View className="flex-row justify-between ml-2 mt-2 items-center">
                <View className="flex-row items-center">
                  {option.icon}
                  <Text className="font-Normal text-base px-4 mt-1 text-slate-500">
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
    padding: "1%",
  },
});

export default MobileBundles;
