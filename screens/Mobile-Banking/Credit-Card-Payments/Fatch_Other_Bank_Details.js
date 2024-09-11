import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";

const Fatch_Other_Bank_Details = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;
  const [selected, setSelected] = useState("");
  const purpose = [
    { key: "1", value: "HBL" },
    { key: "2", value: "JS Bank" },
    { key: "3", value: "Meezan Bank" },
    { key: "4", value: "MCB" },
  ];

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        {/* Header Section */}
        <View
          className="h-24"
          style={{ backgroundColor: Color.PrimaryWebOrient }}
        >
          <View className="flex-row items-center justify-center h-full">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">
              Add Credit Card Payment
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1  p-4">
          {/* Upper Section */}
          <View className="shadow-gray-300">
            <View className="bg-white p-3 rounded-lg shadow-lg w-full">
              <View className="flex flex-row items-center">
                <Image
                  source={require("../../../assets/Other-Bank-ColorIcon.png")}
                  className="mr-1 w-12 h-12"
                  resizeMode="contain"
                />

                {/* Main container with text and icon */}
                <View className="flex-1 flex-row justify-between items-center">
                  <View>
                    <Text className="text-base font-semibold ml-3">
                      Other Bank
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <ScrollView>
            {/* Bottom Section */}
            <View className="mt-6">
              <Text className="text-lg font-semibold">Enter Card Number</Text>
              <TextInput
                className="mt-2 border border-gray-200 rounded-lg p-2"
                placeholder=""
              />
            </View>
            <View className="justify-center mt-6 ">
              <Text className="text-lg font-semibold mb-2 ">Select Bank</Text>
              <SelectList
                setSelected={(val) => setSelected(val)}
                data={purpose}
                save="value"
                placeholder="Select Bank"
                boxStyles={{
                  borderColor: "gray",
                  borderWidth: 1,
                }}
                dropdownStyles={{
                  borderColor: "gray",
                  borderWidth: 1,
                }}
              />
            </View>

            <View className=" mt-6">
              <CustomButton
                text={"Next"}
                onPress={() => navigation.navigate("Set_Card_Payment")}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Fatch_Other_Bank_Details;
