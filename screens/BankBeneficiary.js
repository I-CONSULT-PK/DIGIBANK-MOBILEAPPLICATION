import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/Button";
import { Color } from "../../GlobalStyles";

import { CheckBox, Divider } from "@rneui/themed";

const BankBeneficiary = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [error, setError] = useState(false);

  const navigation = useNavigation();

  const handleCheckBoxPress = (checkboxNumber) => {
    setChecked(false);
    setChecked2(false);
    setChecked3(false);
    setChecked4(false);

    switch (checkboxNumber) {
      case 1:
        setChecked(true);
        break;
      case 2:
        setChecked2(true);
        break;
      case 3:
        setChecked3(true);
        break;
      case 4:
        setChecked4(true);
        break;
      default:
        break;
    }
  };

  const handleNextPress = () => {
    if (!(checked || checked2 || checked3 || checked4)) {
      setError(true);
    } else {
      navigation.navigate("AddBankBeneficiary");
    }
  };

  return (
    <ScrollView className="bg-white">
      <View className="bg-white flex-1">
        <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
          <Entypo
            name="chevron-left"
            size={30}
            style={{
              color: Color.PrimaryWebOrient,
              marginTop: 40,
              marginLeft: 5,
            }}
          />
        </TouchableOpacity>

        <View className="justify-start p-5 mt-5">
          <Text className="font-medium text-2xl ">
           
            Select Your wallet
          </Text>
        </View>
        <View className="flex-1 h-80 w-200 ml-5 mr-5 bg-background  rounded-2xl ">
          <CheckBoxItem
            label="Bank Alfalah"
            checked={checked}
            onPress={() => handleCheckBoxPress(1)}
          />
          <Divider />
          <CheckBoxItem
            label="Meezan Bank"
            checked={checked2}
            onPress={() => handleCheckBoxPress(2)}
          />
          <Divider />
          <CheckBoxItem
            label="United Bank Limited"
            checked={checked3}
            onPress={() => handleCheckBoxPress(3)}
          />
          <Divider />
          <CheckBoxItem
            label="Habib Bank Limited"
            checked={checked4}
            onPress={() => handleCheckBoxPress(4)}
          />
        </View>
        {error && (
          <View className="p-5 mt-2">
            <Text className="text-red-500">Please select a bank</Text>
          </View>
        )}
        <View className="p-5 mt-2">
          <CustomButton Text={"Next"} onPress={handleNextPress} />
        </View>
      </View>
    </ScrollView>
  );
};

const CheckBoxItem = ({ label, checked, onPress }) => {
  return (
    <View style={styles.checkBoxItem}>
      <Text className="font-normal text-base">{label}</Text>
      <CheckBox
        checkedColor={Color.PrimaryWebOrient}
        containerStyle={{ backgroundColor: "#F4F5F9" }}
        checked={checked}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

export default BankBeneficiary;