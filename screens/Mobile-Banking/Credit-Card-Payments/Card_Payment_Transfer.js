import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import { Divider } from "react-native-paper";
import Footer from "../../../components/Footer";
const Card_Payment_Transfer = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const horizontalPadding = 16;
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <View
          className="h-24"
          //   style={{ backgroundColor: Color.PrimaryWebOrient }}
        >
          <View className="flex-row items-center justify-center h-full">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} />
            </TouchableOpacity>
            <Text className=" text-lg font-bold">Card Payment</Text>
          </View>
        </View>

        <View className="flex-1 items-center justify-cente">
          {/* Card Container */}
          <View className="w-10/12 mt-4 bg-white rounded-lg p-6 shadow-xl item-center shadow-slate-300">
            {/* Success Icon */}
            <View className="items-center w-full mb-4 absolute -top-7 left-5">
              <Image
                source={require("../../../assets/check.png")} // Replace with your check icon
                className="w-16 h-16"
                resizeMode="contain"
              />
            </View>

            {/* Transfer Successful Message */}
            <Text className="text-green-500 text-center text-lg font-semibold mt-5">
              Transfer Successful
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Your transaction was successful
            </Text>

            {/* Amount */}
            <Text className="text-black text-center text-4xl font-bold my-4">
              Rs. 16,058
            </Text>

            {/* Recipient Section */}
            <Text className="text-gray-500 text-center">Send to</Text>
            <View className="flex-row justify-center items-center mt-4">
              <Image
                source={require("../../../assets/digi-bank.png")} // Replace with PTCL logo
                className="w-12 h-12"
                resizeMode="contain"
              />
            </View>
            <Text className="text-black text-center font-semibold mt-2">
              Muhammad Hamza
            </Text>
            <Text className="text-gray-500 text-center">************9876</Text>

            {/* Transaction Details */}
            <View className="mt-6">
              <Text className="text-black font-bold">Transaction Details</Text>
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-500">Date / Time:</Text>
                <Text className="text-black ml-4">9 June, 2024 12:35 PM</Text>
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-500">Transaction ID (TID):</Text>
                <Text className="text-black">878895</Text>
              </View>
            </View>
            <Divider className="mt-4" />

            {/* Icons Row */}
            <View className="flex-row justify-around mt-4">
              {/* QR Code Icon */}
              <TouchableOpacity>
                <View>
                  <Image
                    source={require("../../../assets/done.png")} // Replace with QR Code icon
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* Share Icon */}
              <TouchableOpacity>
                <View>
                  <Image
                    source={require("../../../assets/Screenshort.png")} // Replace with Share icon
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* Done Icon */}
              <TouchableOpacity>
                <View>
                  <Image
                    source={require("../../../assets/share.png")} // Replace with Done icon
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Footer/>
    </SafeAreaView>
  );
};

export default Card_Payment_Transfer;
