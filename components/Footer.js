import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
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

        {/* Cash Points */}
        <TouchableOpacity
          className="flex items-center"
          style={{
            borderTopWidth: selected === "cashpoints" ? 2 : 0,
            borderColor: Color.PrimaryWebOrient,
            paddingTop: selected === "cashpoints" ? 8 : 10,
          }}
          onPress={() => {
            setSelected("cashpoints");
            // Replace with your actual navigation target
            // navigation.navigate("CashPoints");
          }}
        >
          <Feather
            name="map-pin"
            size={30}
            style={{
              color:
                selected === "cashpoints"
                  ? Color.PrimaryWebOrient
                  : "#15161db0",
            }}
          />
          <Text
            className="mt-1 text-xs font-semibold"
            style={{
              color:
                selected === "cashpoints" ? Color.PrimaryWebOrient : "#000",
            }}
          >
            Cash Points
          </Text>
        </TouchableOpacity>

        {/* QR Code */}
        <TouchableOpacity
          className="flex items-center justify-center shadow-2xl border-2 rounded-lg w-14 h-14 "
          style={{
            backgroundColor: Color.PrimaryWebOrient,
            borderColor: Color.PrimaryWebOrient,
            paddingVertical: selected === "qrcode" ? 5 : 5,
          }}
          onPress={() => {
            setSelected("qrcode");
            // Replace with your actual navigation target
            navigation.navigate("Scanner");
          }}
        >
          <AntDesign
            name="qrcode"
            size={42}
            style={{
              color: "#fff",
              textAlign: "center",
               // Center the icon horizontally
            }}
          />
        </TouchableOpacity>

        {/* Promotion */}
        <TouchableOpacity
          className="flex items-center"
          style={{
            borderTopWidth: selected === "promotion" ? 2 : 0,
            borderColor: Color.PrimaryWebOrient,
            paddingTop: selected === "promotion" ? 8 : 10,
          }}
          onPress={() => {
            setSelected("promotion");
            // Replace with your actual navigation target
            // navigation.navigate("Promotion");
          }}
        >
          <MaterialCommunityIcons
            name="bullhorn-variant-outline"
            size={30}
            style={{
              color:
                selected === "promotion" ? Color.PrimaryWebOrient : "#15161db0",
            }}
          />
          <Text
            className="mt-1 text-xs font-semibold"
            style={{
              color: selected === "promotion" ? Color.PrimaryWebOrient : "#000",
            }}
          >
            Promotion
          </Text>
        </TouchableOpacity>

        {/* Account */}
        <TouchableOpacity
          className="flex items-center"
          style={{
            borderTopWidth: selected === "account" ? 2 : 0,
            borderColor: Color.PrimaryWebOrient,
            paddingTop: selected === "account" ? 8 : 10,
          }}
          onPress={() => {
            setSelected("account");
            // Replace with your actual navigation target
            // navigation.navigate("Account");
          }}
        >
          <FontAwesome
            name="user"
            size={30}
            style={{
              color:
                selected === "account" ? Color.PrimaryWebOrient : "#15161db0",
            }}
          />
          <Text
            className="mt-1 text-xs font-semibold"
            style={{
              color: selected === "account" ? Color.PrimaryWebOrient : "#000",
            }}
          >
            Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
