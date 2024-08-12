import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";

import { Color } from "../../../GlobalStyles";
import SearchBar from "../../../components/SearchBar";
import OptionBox from "../../../components/OptionBox";
import Footer from "../../../components/Footer";

import UBLIcon from "../../../assets/ubl-icon.png";
import HBLIcon from "../../../assets/hbl-icon.png";
import MeezanIcon from "../../../assets/meezan-icon.png";
import AlliedIcon from "../../../assets/allied-icon.png";

const BeneficiaryList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [beneficiaries, setBeneficiaries] = useState([
    {
      id: 1,
      image: UBLIcon,
      text: "Mahrukh",
      subtext: "25678945087986",
      beneficiary: true,
      liked: false,
    },
    {
      id: 2,
      image: HBLIcon,
      text: "Fatima Zafar",
      subtext: "25678945087986",
      beneficiary: true,
      payment: "Rs. 10,000",
      liked: false,
    },
    {
      id: 3,
      image: MeezanIcon,
      text: "Amna Irfan",
      subtext: "25678945087986",
      beneficiary: true,
      payment: "Rs. 10,000",
      liked: false,
    },
    {
      id: 4,
      image: HBLIcon,
      text: "Bushra",
      subtext: "25678945087986",
      beneficiary: true,
      payment: "Rs. 10,000",
      liked: false,
    },
    {
      id: 5,
      image: AlliedIcon,
      text: "Mahrukh",
      subtext: "25678945087986",
      beneficiary: true,
      liked: false,
    },
  ]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleRemoveBeneficiary = (index) => {
    setBeneficiaries((prevBeneficiaries) =>
      prevBeneficiaries.filter((_, i) => i !== index)
    );
  };

  const handleLikeToggle = (id) => {
    setBeneficiaries((prevBeneficiaries) =>
      prevBeneficiaries.map((b) =>
        b.id === id ? { ...b, liked: !b.liked } : b
      )
    );
  };
  const handleNamePress = (id) => {
    navigation.navigate('SendFromAccount', { beneficiaryId: id });
};

  const filteredBeneficiaries = beneficiaries.filter((beneficiary) =>
    beneficiary.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="h-full flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
          style={{ height: "12%" }}
        >
          <View className="flex-row items-center justify-center w-full h-full">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <AntDesign name="arrowleft" size={23} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-semibold text-lg font-InterSemiBold">
              Beneficiary
            </Text>
          </View>
        </LinearGradient>

        <View className="w-full h-full px-6 bg-[#F5F5F5] pb-24">
          <View className="mt-6">
            <SearchBar
              placeholder="Search My Payees"
              onChangeText={handleSearchChange}
              value={searchQuery}
            />
          </View>

          <View className="mt-7">
            <TouchableOpacity className="flex-row items-center">
              <View className="p-3 rounded-lg shadow-lg shadow-gray-500 justify-center items-center bg-[#1DBBD8]">
                <Image
                  source={require("../../../assets/own-account-icon.png")}
                  resizeMode="contain"
                  className="w-7 h-7"
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-InterSemiBold mb-0.5">Own Account</Text>
              </View>
            </TouchableOpacity>

            <View className="my-4 w-full border-b border-gray-300" />

            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => navigation.navigate("BankList")}
            >
              <View className="p-3 rounded-lg shadow-lg shadow-gray-500 justify-center items-center bg-[#1DBBD8]">
                <Image
                  source={require("../../../assets/add-icon.png")}
                  resizeMode="contain"
                  className="w-7 h-7"
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-InterSemiBold mb-0.5">
                  Add New Beneficiary
                </Text>
              </View>
            </TouchableOpacity>

            <View className="my-4 w-full border-b border-gray-300" />

            {filteredBeneficiaries.map((beneficiary) => (
              <React.Fragment key={beneficiary.id}>
                <OptionBox
                  image={beneficiary.image}
                  text={beneficiary.text}
                  subtext={beneficiary.subtext}
                  icon1={beneficiary.liked ? "heart" : "hearto"}
                  icon2="trash-2"
                  iconColor1={beneficiary.liked ? "red" : "darkgray"}
                  iconColor2="darkgray"
                  beneficiary={beneficiary.beneficiary}
                  payment={beneficiary.payment}
                  onPress1={() => handleLikeToggle(beneficiary.id)}
                  onPress2={() => handleRemoveBeneficiary(beneficiary.id)}
                  onPressName={() => handleNamePress(beneficiary.id)}
                />
                <View className="my-5 w-full border-b border-gray-300" />
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default BeneficiaryList;
