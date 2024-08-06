import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import CashUpCardSvg from "../../../assets/Images/CashUpCardSvg.svg";
import CustomButton from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import TextInput from "../../../components/TextInput";
import { SelectList } from "react-native-dropdown-select-list";
import { Color } from "../../../GlobalStyles";
import { CheckBox } from "react-native-elements";
import Footer from "../../../components/Footer";

const AvailCashonCreditCard = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = useState(false);

  const Repayment = [
    { key: "1", value: "48 Months" },
    { key: "2", value: "54 Months" },
    { key: "3", value: "68 Months" },
    { key: "4", value: "124 Months" },
    { key: "5", value: "135 Months" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc]">
      <ScrollView className="flex-1">
        <View className="flex-1">
          <View className="flex flex-col overflow-hidden gap-4 pt-16 pl-6 bg-cyan-500">
            <TouchableOpacity onPress={() => navigation.navigate("SelectCards")}>
              <Entypo name="chevron-left" size={30} color="white" />
            </TouchableOpacity>
            <View className="flex flex-row items-center mt-8">
              <Text className="text-3xl font-semibold text-black">
                {"Avail Cash on\n"}
                <Text className="text-3xl font-bold text-white">
                {"Credit Card"}
                </Text>
               
              </Text>
              <CashUpCardSvg style={{ marginLeft: 40 }} />
            </View>
          </View>
        </View>
        <View className="w-auto mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
          <View className="mt-9">
            <Text className="text-sm font-medium text-zinc-600">
              Loan Amount (multiples of 100)
            </Text>
            <TextInput
              className="mt-2"
              placeholder="1000"
              keyboardType="numeric"
            />
          </View>

          <View className="mt-6">
            <Text className="text-sm font-medium text-zinc-600">
              Repayment Period
            </Text>
            <SelectList
              setSelected={setSelectedOption}
              data={Repayment}
              save="value"
              placeholder="Select Repayment Period"
              boxStyles={{ marginTop: 10 }}
              dropdownStyles={{ borderColor: "gray", borderWidth: 1 }}
            />
          </View>
          <Text className="text-sm font-medium text-zinc-600 text-center mt-5">
            Calculation overflow
          </Text>
          <View
            className="w-auto mx-auto p-6  rounded-xl shadow-lg mt-6"
            style={{ backgroundColor: Color.PrimaryWebOrient }}
          >
            <View className="p-3 bg-white rounded-xl shadow-lg">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-sm font-medium">Monthly Installment</Text>
                <TextInput
                  style={{
                    fontSize: 14,
                    backgroundColor: Color.PrimaryWebOrient,
                    borderRadius: 4,
                    paddingHorizontal: 8,
                    color: "#000",
                  }}
                  className="ml-7"
                  placeholder="80 PKR"
                />
              </View>
            </View>
            <View className="p-3 bg-white rounded-xl shadow-lg mt-3">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-sm font-medium">
                  Total Amount {"\n"}Payable
                </Text>
                <TextInput
                  style={{
                    fontSize: 14,
                    backgroundColor: Color.PrimaryWebOrient,
                    borderRadius: 4,
                    paddingHorizontal: 8,
                    color: "#000",
                  }}
                  className="ml-7"
                  placeholder="980 PKR"
                />
              </View>
            </View>
            <View className="p-3 bg-white rounded-xl shadow-lg mt-3">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-sm font-medium">
                  Total Interest {"\n"}Payable (0.8% pm)
                </Text>
                <TextInput
                  style={{
                    fontSize: 14,
                    backgroundColor: Color.PrimaryWebOrient,
                    borderRadius: 4,
                  }}
                  className="ml-7"
                  placeholder="80 PKR"
                />
              </View>
            </View>
            <View className="p-3 bg-white rounded-xl shadow-lg mt-3">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-sm font-medium">One Time</Text>
                <TextInput
                  style={{
                    fontSize: 14,
                    backgroundColor: Color.PrimaryWebOrient,
                    borderRadius: 4,
                  }}
                  className="ml-7"
                  placeholder="980 PKR"
                />
              </View>
            </View>
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
            text="Apply"
            onPress={() => {
              if (checked)
                navigation.navigate("BeneficiaryAccountDetails");
            }}
            disabled={!checked}
            styles={`mt-4`}
            textStyles={`text-base text-center font-medium ${
              !checked ? "text-gray-500" : "text-white"
            }`}
          />
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default AvailCashonCreditCard;
