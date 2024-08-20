import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import ListSectionCard from "../../../assets/Images/ListSectionCard.svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import Button from "../../../components/Button";

const CardActivation = () => {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
          <TouchableOpacity
           onPress={() => navigation.goBack()}
          >
            <Entypo
              name="chevron-left"
              size={wp("8%")}
              color="#090909"
              marginTop={hp("2%")}
            />
          </TouchableOpacity>
          <View className="justify-center items-center">
            <Text className="font-InterBold text-2xl ">Card Activation</Text>
          </View>
          <View>
            <View className="flex-1 justify-center items-center p-4 shadow-gray-100">
              <View
                className="bg-white p-6 rounded-lg shadow-lg w-full"
                style={styles.container}
              >
                <ListSectionCard width={300} />
                <Text className="text-lg font-semibold mb-1 text-center">
                  Expiry Date
                </Text>
                <Text className="text-sm text-gray-500 mb-4 text-center">
                  Make sure you type it exactly as on card
                </Text>

                <TouchableOpacity onPress={showDatePicker}>
                  <View className="flex flex-row gap-3 justify-center items-center text-3xl font-medium text-gray-800 whitespace-nowrap">
                    <View className="flex justify-center items-center px-4 py-4 bg-cyan-50 rounded-lg border border-cyan-500 border-solid min-h-[64px] w-[101px]">
                      <Text className="text-center text-xl">
                        {selectedDate.toLocaleString("default", {
                          month: "short",
                        })}
                      </Text>
                    </View>
                    <View className="leading-none">
                      <Text className="text-5xl font-light leading-none">
                        /
                      </Text>
                    </View>
                    <View className="flex justify-center items-center px-4 py-4 bg-cyan-50 rounded-lg border border-cyan-500 border-solid min-h-[64px] w-[101px]">
                      <Text className="text-center text-xl">
                        {selectedDate.getFullYear()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </View>
          </View>
          <View className="px-10 mt-16">
            <Button
              text='Next'
              width='w-[100%]'
              styles='py-3 px-12'
              onPress={() => navigation.navigate("SetCardPin")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    elevation: 30,
  },
});
export default CardActivation;
