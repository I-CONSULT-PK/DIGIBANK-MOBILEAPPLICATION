import React, { useState } from "react";
import { Text, View, ScrollView, SafeAreaView, Image } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import CashUpContainer from "../../../assets/Images/CashUpContainer.png";
import Button from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import CashUpCardSvg from "../../../assets/Images/CashUpCardSvg.svg";

const CashUpCard = () => {
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc]">
      <ScrollView className="flex-1">
        <View className="flex-1">
          <View className="flex flex-col overflow-hidden gap-4 pt-16 pl-6 bg-cyan-500">
            <View className="flex items-center p-2.5 rounded-md bg-white bg-opacity-66 h-10 w-10 justify-center">
              <Ionicons name="close" size={20} color="black" onPress={() => navigation.navigate("ApplyForCard")} />
            </View>
            <View className="flex flex-row items-center mt-8">
              <Text className="text-3xl font-semibold text-black">
                {"Get your\n"}
                <Text className="text-3xl font-bold text-white">
                  {"CashUp Card\n"}
                </Text>
                {"Insured"}
              </Text>
              <CashUpCardSvg style={{ marginLeft: 40 }} />
            </View>
          </View>
        </View>

        {/* Container for Credit Shield Plus with Image */}
        <View className="relative mt-5">
          <Image
            source={CashUpContainer}
            className="w-96 h-40 object-cover mx-auto"
            style={{ resizeMode: "contain" }}
          />
          <View className="absolute inset-0 flex flex-col justify-center items-center p-5">
            <View className="w-full px-4">
              <Entypo name="credit-card" size={20} style={{ marginLeft: 20 }} />
              <View className="flex flex-row items-center justify-between mb-2 mt-2">
                <Text className="text-base font-semibold ml-5">
                  Credit Shield Plus
                </Text>
                <Checkbox
                  status={
                    selectedOption === "Credit Shield Plus"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => handleSelect("Credit Shield Plus")}
                  color="green"
                  uncheckedColor="gray"
                  style={{ transform: [{ scale: 0.75 }] }}
                />
              </View>
              <View className="text-center ml-7 mt-5 w-72">
                <Text className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet consectetur. Ornare lorem velit
                  ultrices blandit nunc nunc viverra vel. Fringilla turpis mi
                  cum ut.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Container for Accident Shield */}
        <View className="relative mt-5">
          <Image
            source={CashUpContainer}
            className="w-96 h-40 object-cover mx-auto "
            style={{ resizeMode: "contain" }}
          />
          <View className="absolute inset-0 flex flex-col justify-center items-center p-5 ">
            <View className="w-full px-4">
              <Entypo name="credit-card" size={20} style={{ marginLeft: 20 }} />
              <View className="flex flex-row items-center justify-between mb-2">
                <Text className="text-base font-semibold ml-5">
                  Accident Shield
                </Text>
                <Checkbox
                  status={
                    selectedOption === "Accident Shield"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => handleSelect("Accident Shield")}
                  color="green"
                  uncheckedColor="gray"
                  style={{ transform: [{ scale: 0.75 }] }}
                />
              </View>
              <View className="text-center ml-7 mt-5 w-72">
                <Text className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet consectetur. Ornare lorem velit
                  ultrices blandit nunc nunc viverra vel. Fringilla turpis mi
                  cum ut.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="p-5">
        <Button
          text='Confirm'
          width='w-[100%]'
          styles='mb-4 py-4'
          onPress={() => navigation.navigate("CongCard")}
        />
      </View>
    </SafeAreaView>
  );
};

export default CashUpCard;
