import React from "react";
import { ScrollView, Text, View, StyleSheet,  TouchableOpacity,
} from "react-native";
import Ptcl from "../../../assets/Images/Ptcl.svg";
import KE from "../../../assets/Images/KE.svg";
import { Divider } from "@rneui/themed";
import SuiGas from "../../../assets/Images/SuiGas.svg";
import { useNavigation } from "@react-navigation/native";

const UtilityOptions = [
  { label: "SSGC", icon: <SuiGas style={{ top: 7 }} /> },
  { label: "PTCL  LandLine", icon: <Ptcl style={{ top: 6 }} /> },
  { label: "PTCL  Vfone", icon: <Ptcl style={{ top: 6 }} /> },
  { label: "PTCL  Defaulter", icon: <Ptcl style={{ top: 6 }} /> },
  //   { label: "Zong Prepaid", icon: <Zong style={{ top: 6 }} /> },
  { label: "KE", icon: <KE style={{ top: 6 }} /> },
  { label: "SSGC", icon: <SuiGas style={{ top: 7 }} /> },
  //   { label: "Ufone Postpaid", icon: <Ufone style={{ top: 6 }} /> },
];

const Utility = () => {
  const navigation = useNavigation();
  const handleOptionSelect = (selectedOption) => {
    navigation.navigate("AddWalletBeneficiary", { selectedOption });
  };
  return (
    <ScrollView>
      <View className="bg-white flex-1 mb-20">
        {UtilityOptions.map((option, index) => (
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

export default Utility;
