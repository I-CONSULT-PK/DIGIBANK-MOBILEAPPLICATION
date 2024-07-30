import React from "react";
import {
  ScrollView,
  Text,
  View,
  
  TouchableOpacity,
} from "react-native";
import Telenor from "../../../assets/Images/Telenor.svg";
import Zong from "../../../assets/Images/Zong.svg";
import Jazz from "../../../assets/Images/Jazz.svg";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const BillPaymentOptions = [
  { label: "Jazz Prepaid", icon: <Jazz style={{ top: 7 }} /> },
  { label: "Jazz Postpaid", icon: <Jazz style={{ top: 6 }} /> },
  { label: "Telenor Prepaid", icon: <Telenor style={{ top: 6 }} /> },
  { label: "Telenor Postpaid", icon: <Telenor style={{ top: 6 }} /> },
  { label: "Zong Prepaid", icon: <Zong style={{ top: 6 }} /> },
  { label: "Zong Postpaid", icon: <Zong style={{ top: 6 }} /> },
];

const All = () => {
  const navigation = useNavigation();

  const handleOptionSelect = (selectedOption) => {
    navigation.navigate("AddWalletBeneficiary", { selectedOption });
  };

  return (
    <ScrollView className="mb-10">
      <View className="bg-white">
        {BillPaymentOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionSelect(option.label)}
          >
            <View key={index} className="w-200   m-4 bg-background rounded">
              <View className="flex-row justify-between ml-2  items-center">
                <View className="flex-row items-center">
                  {option.icon}
                  <Text className="font-Normal text-base px-4 mt-2 text-slate-500">
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

export default All;
