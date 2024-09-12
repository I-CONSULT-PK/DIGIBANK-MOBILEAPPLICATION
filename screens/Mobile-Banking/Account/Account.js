import React,{useState} from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Color } from "../../../GlobalStyles";
import { Entypo } from "@expo/vector-icons";
import Button from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-elements";

const AccountCard = ({
  name,
  accountNumber,
  iban,
  branchName,
  branchCode,
  isFavorite,
}) => {
    const [isFavorite1, setIsFavorite1] = useState(false); // default value set to false

    const toggleFavorite = () => {
      setIsFavorite1(!isFavorite1); // toggle between true and false
    };
  return (
    <View className="bg-white rounded-lg border border-gray-200 p-4 my-2 shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center">
      <Text className="text-lg font-semibold text-black">{name}</Text>
      <TouchableOpacity onPress={toggleFavorite}>
        <FontAwesome
          name={isFavorite1 ? "star" : "star-o"} // Corrected state usage
          size={20}
          color={isFavorite1 ? "#F4C724" : "#B0B0B0"} // Corrected state usage
        />
      </TouchableOpacity>
    </View>

      {/* Account Details */}
      <View className="mt-2 flex-row justify-between">
        <Text className="text-sm text-gray-500">Account Number:</Text>
        <Text className="text-sm font-bold text-black">{accountNumber}</Text>
      </View>
      <Divider className="mt-1"/>
      <View className="mt-2 flex-row justify-between mb-1">
        <Text className="text-sm text-gray-500">IBAN:</Text>
        <Text className="text-sm font-bold text-black">{iban}</Text>
      </View>
      <Divider/>
      <View className="mt-2 flex-row justify-between mb-1">
        <Text className="text-sm text-gray-500">Branch Name:</Text>
        <Text className="text-sm font-bold text-black">{branchName}</Text>
      </View>
      <Divider/>
      <View className="mt-1 flex-row justify-between mb-1">
        <Text className="text-sm text-gray-500">Branch Code:</Text>
        <Text className="text-sm font-bold text-black">{branchCode}</Text>
      </View>

      {/* Share Button */}
      <TouchableOpacity className="bg-cyan-100 rounded-lg py-2 mt-4 flex-row justify-center items-center">
        <FontAwesome name="share-alt" size={18} />
        <Text className=" font-InterSemiBold ml-2">Share Details</Text>
      </TouchableOpacity>

    </View>
  );
};

const Account = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="h-full flex-1">
      <LinearGradient
        colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row  items-center justify-center p-4  mt-2">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Account</Text>
          </View>
          <View className="py-4 px-6 mb-4">
            <Text className="text-center text-white text-2xl font-bold">
              PKR 10,000
            </Text>

            <View className="flex items-center justify-center mt-4">
              <TouchableOpacity className="bg-white rounded-lg py-2 flex-row justify-center items-center w-32">
                <Text className="text-cyan-500 font-bold">+ Add Account</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-1 bg-white mt-2 rounded-t-[30px] px-7 pt-7 shadow-2xl">
            <View className="flex-1 justify-between">
              <View className="p-1">
                {/* Account Cards */}
                <AccountCard
                  name="Mirza Uraib"
                  accountNumber="25678945087986"
                  iban="HU98DIGI25678945087986"
                  branchName="DHA Branch, Karachi"
                  branchCode="589"
                  isFavorite={true}
                />
                <AccountCard
                  name="Mirza Uraib"
                  accountNumber="25678945087986"
                  iban="HU98DIGI25678945087986"
                  branchName="DHA Branch, Karachi"
                  branchCode="589"
                  isFavorite={false}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Account;
