import React, {useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, BackHandler} from 'react-native';
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import CustomButton from "../../../../components/Button";
import Input from '../../../../components/TextInput';
import { Color } from "../../../../GlobalStyles";

const AddBankBeneficiary = () => {
  const navigation = useNavigation();
  const handleBack = () => {
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
      <TouchableOpacity onPress={handleBack}>
        <Entypo
          name="chevron-left"
          size={30}
          style={{
            color: Color.PrimaryWebOrient}}
          marginTop={40}
        />
      </TouchableOpacity>
      <View className="justify-start p-5 mt-5">
          <Text className="font-medium text-xl "> Add Beneficiary to your Bank</Text>
        </View>
        
        <View style={{ marginTop: 40 }}>
          <Input placeholder={"Account Number / IBAN"} />
        </View>
        <View style={{ marginTop: 40 }}>
          <Input placeholder={"Nickname"} />
        </View>
        <CustomButton style={[styles.button]}
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
      backgroundColor: 'white',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    button: {
        marginTop: 40,
      },
  });

export default AddBankBeneficiary;
