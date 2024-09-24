import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
  Dimensions,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import CustomButton from "../../../components/Button";
import Footer from "../../../components/Footer";

const Add_Biller = ({ route }) => {
  const navigation = useNavigation();
  const { networkName, networkLogo } = route.params || {};
  const [number, setNumber] = useState(null);
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;
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
            <Text className="text-white text-lg font-bold">Mobile Top ups</Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1  p-4">
          {/* Upper Section */}
          <View className="shadow-gray-300">
            <Text className="text-base font-semibold ml-3">Add Biller</Text>
            <View className="bg-white p-3 rounded-lg shadow-lg w-full">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: networkLogo }}
                  className="mr-1 w-12 h-12"
                  resizeMode="contain"
                />
                {/* Main container with text and icon */}
                <View className="flex-1 flex-row justify-between items-center">
                  <View>
                    <Text className="text-base font-semibold ml-3">
                      {networkName}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <ScrollView>
            {/* Bottom Section */}
            <View className="mt-6">
              <Text className="text-lg font-semibold">Select Contact</Text>
              <TextInput
                className="mt-2 border border-gray-200 rounded-lg p-2"
                placeholder="Enter Your Number..."
                value={number}
                onChange={(text) => setNumber(text)}
                onSubmitEditing={Keyboard.dismiss}
                keyboardType='numeric'
              />
            </View>

            <View className=" mt-6">
              <CustomButton
                text={"Next"}
                onPress={() =>
                  navigation.navigate("Fatch_Details_Top_up", {
                    networkName,
                    networkLogo,
                    number,
                  })
                }
              />
            </View>
          </ScrollView>
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default Add_Biller;
