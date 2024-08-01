import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, Image,TextInput } from "react-native";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const NewCard = () => {
  const navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };


  return (
    <SafeAreaView className=" bg-[#f9fafc]" style={{ flex: 1 }}>
      <ScrollView>
        <View className=" flex-1">
          <TouchableOpacity onPress={() => navigation.navigate("SelectCards")}>
            <Entypo
              name="chevron-left"
              size={wp("8%")}
              color="#090909"
              marginTop={hp("2%")}
            />
          </TouchableOpacity>
          <View className="justify-center items-center">
            <Text className="font-InterBold text-2xl ">Add Card</Text>
          </View>

          <View className="flex-1 justify-center items-center p-4  shadow-inner">
            <View className=" p-6 rounded-lg shadow-lg w-full">
              <Text className="text-lg font-semibold mb-6">
                Please Enter Your Card Details
              </Text>
              <View className="mb-6">
                <Text className="text-sm font-medium mb-2">Card Number</Text>
                <View className="flex-row items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2">
                  <TextInput
                    className="flex-1 bg-gray-100"
                    placeholder="XXXX XXXX XXXX XXXX"
                    keyboardType="numeric"
                    maxLength={30}
                  ></TextInput>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/color/48/000000/mastercard-logo.png",
                    }}
                    className="w-8 h-8 ml-2"
                  />
                </View>
              </View>
              <View className="mb-6">
                <Text className="text-sm font-medium mb-2">
                  Card Holder Name
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                  placeholder="Enter Here"
                />
              </View>
              <View className="flex-row justify-between">
                <View className="w-40 mr-2">
                  <Text className="text-sm font-medium mb-2">Expiry Date</Text>

                  <View className="w-full h-11 rounded-lg border border-gray-300 justify-center py-2 px-3">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-base text-gray-400 bg-gray-100">
                        {selectedDate
                          ? new Date(selectedDate).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })
                          : "MM/YY"}
                      </Text>

                      <TouchableOpacity onPress={showDatePicker}>
                        <Icon name="calendar" color="black" size={20} />
                      </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                      display="default"
                    />
                  </View>
                </View>
                <View className="w-40 ml-1">
                  <Text className="text-sm font-medium mb-2">CVV</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2 back bg-gray-100"
                    placeholder="****"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="flex flex-col justify-between ">
            <View className="mt-1 flex-1 p-6">
              <Text className="text-[#7D7C93] font-semibold text-sm">
                Card details will be saved for future transaction in an
                encrypted and secure way.
              </Text>
              <Text className="text-[#7D7C93] font-semibold text-sm mt-4">
                To proceed with this transaction, please ensure e-commerce
                transaction in enable on debit/credit card.
              </Text>
            </View>
            <View className="px-10 mt-16">
              <TouchableOpacity className="py-3 px-12 bg-[#1DBBD8] rounded-lg">
                <Text className="text-base text-center font-InterMedium text-white">
                Add Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default NewCard;
