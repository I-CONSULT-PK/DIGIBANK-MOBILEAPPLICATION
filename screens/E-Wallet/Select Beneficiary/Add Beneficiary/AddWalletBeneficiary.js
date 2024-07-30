import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView,BackHandler } from "react-native";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../../../../components/Button";
import Input from "../../../../components/TextInput";
import { Color } from "../../../../GlobalStyles";

const AddWalletBeneficiary = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedOption, setSelectedOption] = useState(route.params?.selectedOption);
  const [title, setTitle] = useState("Add Beneficiary to your Wallet");

  useEffect(() => {
    if (selectedOption) {
      setTitle(selectedOption);
    }
  }, [selectedOption]);

  const handleBackPress = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const handleBackPress = () => {
      // Manually navigate to the back screen
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleBackPress}>
          <Entypo name="chevron-left" size={30}  style={{
              color: Color.PrimaryWebOrient}} marginTop={20} />
        </TouchableOpacity>
        <View className="justify-start p-5 mt-3">
          <Text className="font-bold text-xl text-center">{title}</Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <Input placeholder={"Account Number / IBAN"} />
        </View>
        <View style={{ marginTop: 40 }}>
          <Input placeholder={"Nickname"} />
        </View>
        <CustomButton
          style={[styles.button]}
          Text={"Save"}
          onPress={() => navigation.navigate("Wallet")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 40,
  },
});

export default AddWalletBeneficiary;
