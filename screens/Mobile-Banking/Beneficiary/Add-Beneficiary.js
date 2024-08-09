import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, Image } from "react-native";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TextInput  from "../../../components/TextInput";
import CustomButton  from '../../../components/Button';
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Footer from '../../../components/Footer';

const Add_Beneficiary = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView className=" bg-[#f9fafc]" style={{ flex: 1 }}>
      <ScrollView>
       
        <View className="d-flex flex-row justify-center mt-8">
          <TouchableOpacity
          className=" ml-2 absolute left-2" 
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
          <View className=" ">
            <Text className="font-InterBold text-2xl text-center">Send Money</Text>
          </View>
        </View>
        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold ">Personal Details</Text>
        </View>
        <View className="flex-1 justify-center items-center p-4 shadow-gray-100">
          <View className="bg-white p-3 rounded-lg shadow-lg w-full">
            <View className="d-flex flex-row  items-center">
              <Image
                source={require("../../../assets/ubi_icon.png")}
                className=" mr-1"
              />
              <Text className="text-lg font-semibold ml-3">
                United Bank Limited
              </Text>
            </View>
          </View>
        </View>
        <View className="px-6 mt-4">
          <Text className="text-lg font-semibold">Account Number / IBAN</Text>
          <TextInput className="mt-2 border border-gray-200 rounded-lg" placeholder="Account number/IBAN" />
        </View>
        <View className="px-6 mt-8">
          <CustomButton
          text={'Add'}
          onPress={() => navigation.navigate("Fatch_Acc_Beneficiary")}/>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

export default Add_Beneficiary
