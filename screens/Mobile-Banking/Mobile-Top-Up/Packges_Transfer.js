import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import Footer from "../../../components/Footer";

const Packges_Transfer = ({ route }) => {
  const navigation = useNavigation();
  const { dto } = route.params || {};

  // Destructure the required properties from dto
  const {
    data: {
      "Network Name ": networkName,
      date,
      mobileNumber,
      transactionId,
      "package details": packageDetails = {},
    } = {},
    message, // Top-level message
  } = dto || {}; // Safely access dto

  // Destructure pkgName and price from packageDetails
  const { pkgName, price } = packageDetails;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <View className="h-24">
          <View className="flex-row items-center justify-center h-full">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} />
            </TouchableOpacity>
            <Text className="text-lg font-bold">Card Payment</Text>
          </View>
        </View>

        <View className="flex-1 items-center justify-center">
          {/* Card Container */}
          <View className="w-10/12 mt-4 bg-white rounded-lg p-6 shadow-xl shadow-slate-300">
            {/* Success Icon */}
            <View className="items-center w-full mb-4 absolute -top-7 left-5">
              <Image
                source={require("../../../assets/check.png")}
                className="w-16 h-16"
                resizeMode="contain"
              />
            </View>

            {/* Transfer Successful Message */}
            <Text className="text-green-500 text-center text-lg font-semibold mt-5">
            {message || 'No message provided'} </Text>
            <Text className="text-gray-500 text-lg text-center">{pkgName || 'N/A'}</Text>
            

            {/* Amount */}
            <Text className="text-black text-center text-4xl font-bold my-4">
              {price !== undefined ? price : 'N/A'}
            </Text>

            {/* Recipient Section */}
            <Text className="text-black text-center font-semibold mt-2">
              {networkName}
            </Text>
            <Text className="text-gray-500 text-center">{mobileNumber}</Text>

            {/* Transaction Details */}
            <View className="mt-6">
              <Text className="text-black font-bold">Transaction Details</Text>
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-500">Date / Time:</Text>
                <Text className="text-black ml-4">{date}</Text>
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-500">Transaction ID (TID):</Text>
                <Text className="text-black">{transactionId}</Text>
              </View>
            </View>
            <Divider className="mt-4" />

            {/* Icons Row */}
            <View className="flex-row justify-around mt-4">
              {/* QR Code Icon */}
              <TouchableOpacity>
                <Image
                  source={require("../../../assets/done.png")}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Share Icon */}
              <TouchableOpacity>
                <Image
                  source={require("../../../assets/Screenshort.png")}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Done Icon */}
              <TouchableOpacity>
                <Image
                  source={require("../../../assets/share.png")}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default Packges_Transfer;
