import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, Image } from "react-native";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import Footer from "../../../components/Footer";
import CustomButton from "../../../components/Button";
import TextInput from "../../../components/TextInput";

const BeneficiaryAccountDetails = () => {
  const [checked, setChecked] = useState(false);

  const navigation = useNavigation();
  return (
    <SafeAreaView className=" bg-[#f9fafc]" style={{ flex: 1 }}>
      <ScrollView>
        <View className=" flex-1">
          <TouchableOpacity onPress={() => navigation.navigate("AvailCashonCreditCard")}>
            <Entypo
              name="chevron-left"
              size={30}
              color="black"
              className="mt-5"
            />
          </TouchableOpacity>
          <View className="justify-center items-center">
            <Text className="font-InterBold text-2xl ">Easy Cash</Text>
          </View>
          <View>
            <View className="flex-1 justify-center items-center p-4 shadow-gray-100">
              <View className="bg-white p-6 rounded-lg shadow-lg w-full">
                <Text className="text-lg font-semibold mb-1">
                  beneficiary account details
                </Text>
                <Text className="text-sm text-gray-500 mb-4">
                  Required to access your eligiblity
                </Text>

                <Text className="text-sm  mb-2 ">
                  Enter IBAN number (24 digit)
                </Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 ">
                  <Text className="text-base text-gray-500 mr-2 ">RUB |</Text>
                  <TextInput
                    className="flex-1"
                    placeholder="50,000"
                    keyboardType="numeric"
                  />
                </View>
                <Text className="text-sm  mb-2 ">
                  Confirm IBAN number (24 digit)
                </Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 ">
                  <Text className="text-base text-gray-500 mr-2 ">RUB |</Text>
                  <TextInput
                    className="flex-1"
                    placeholder="50,000"
                    keyboardType="numeric"
                  />
                </View>
                <Text className="text-sm  mb-2  mt-4">Bank Name</Text>
                <TextInput
                    className="flex-1"
                    placeholder="Bank Name"
                   
                  />
                <Text className="text-sm  mb-2  mt-4">
                  beneficiary Name
                </Text>
                  <TextInput
                    className="flex-1"
                    placeholder="Alias Name"
                    
                  />
              </View>
            </View>
            <View className="px-10 mt-5">
          <View className="flex flex-row items-center">
            <CheckBox
              checked={checked}
              onPress={() => setChecked(!checked)}
              containerStyle={{ padding: 0, margin: 0 }}
            />
            <Text className="text-gray-700 mb-2">
              I have read through the{" "}
              <TouchableOpacity>
                <Text className="underline text-gray-700 font-bold ml-1">
                  KFS Statement
                </Text>
              </TouchableOpacity>
            </Text>
          </View>

          <CustomButton
            text="Proceed"
            onPress={() => {
              if (checked)
                navigation.navigate("Summary");
            }}
            disabled={!checked}
            styles={`mt-4`}
            textStyles={`text-base text-center font-medium ${
              !checked ? "text-gray-500" : "text-white"
            }`}
          />
        </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default BeneficiaryAccountDetails;
