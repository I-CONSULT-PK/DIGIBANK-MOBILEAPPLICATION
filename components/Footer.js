import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Color } from "../GlobalStyles";
const Footer = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("home");

  return (
    <View className="bg-white py-4 shadow-lg">
      <View className="flex flex-row justify-between items-center mx-4">
        {/* Home */}
        <TouchableOpacity
          className="flex items-center"
          style={{
            borderTopWidth: selected === "home" ? 2 : 0,
            borderColor: Color.PrimaryWebOrient,
            paddingTop: selected === "home" ? 8 : 10,
          }}
          onPress={() => {
            setSelected("home");
            navigation.navigate("Home");
          }}
        >
          <Entypo
            name="home"
            size={30}
            style={{
              color: selected === "home" ? Color.PrimaryWebOrient : "#15161db0",
            }}
          />
          <Text
            className="mt-1 text-xs font-semibold"
            style={{
              color: selected === "home" ? Color.PrimaryWebOrient : "#000",
            }}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Send */}
        <TouchableOpacity
          className="flex items-center"
          style={{
            borderTopWidth: selected === "Send" ? 2 : 0,
            borderColor: Color.PrimaryWebOrient,
            paddingTop: selected === "Send" ? 8 : 10,
          }}
          onPress={() => {
            setSelected("Send");
            // navigation.navigate("CashPoints");
          }}
        >
          <Feather
            name="send"
            size={30}
            style={{
              color: selected === "Send" ? Color.PrimaryWebOrient : "#15161db0",
            }}
          />
          <Text
            className="mt-1 text-xs font-semibold"
            style={{
              color: selected === "Send" ? Color.PrimaryWebOrient : "#000",
            }}
          >
            Send
          </Text>
        </TouchableOpacity>

        {/* QR Code */}
        <TouchableOpacity
          className="flex items-center shadow-2xl border-2 rounded-lg w-14 h-14"
          style={{
            backgroundColor: Color.PrimaryWebOrient,
            borderColor: Color.PrimaryWebOrient,
            paddingTop: 5,
          }}
          onPress={() => {
            setSelected("qrcode");
            navigation.navigate("Scanner");
          }}
        >
          <AntDesign
            name="qrcode"
            size={42}
            style={{
              color: "#fff",
              paddingBottom: 5,
            }}
          />
        </TouchableOpacity>

        {/* Cards  */}
        <TouchableOpacity
          className="flex items-center"
          style={{
            borderTopWidth: selected === "Cards" ? 2 : 0,
            borderColor: Color.PrimaryWebOrient,
            paddingTop: selected === "Cards" ? 8 : 10,
          }}
          onPress={() => {
            setSelected("Cards");
            navigation.navigate("CardManagement");
          }}
        >
          <MaterialCommunityIcons
            name="card-bulleted-outline"
            size={30}
            style={{
              color:
                selected === "Cards" ? Color.PrimaryWebOrient : "#15161db0",
            }}
          />
          <Text
            className="mt-1 text-xs font-semibold"
            style={{
              color: selected === "Cards" ? Color.PrimaryWebOrient : "#000",
            }}
          >
            Cards
          </Text>
        </TouchableOpacity>

        {/* Settings (Account) */}
        <TouchableOpacity
          className="flex items-center"
          style={{
            borderTopWidth: selected === "Settings" ? 2 : 0,
            borderColor: Color.PrimaryWebOrient,
            paddingTop: selected === "Settings" ? 8 : 10,
          }}
          onPress={() => {
            setSelected("account");
            navigation.navigate("Account_Setting_List");
          }}
        >
          <Feather
            name="settings"
            size={30}
            style={{
              color:
                selected === "Settings" ? Color.PrimaryWebOrient : "#15161db0",
            }}
          />
          <Text
            className="mt-1 text-xs font-semibold"
            style={{
              color: selected === "Settings" ? Color.PrimaryWebOrient : "#000",
            }}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
