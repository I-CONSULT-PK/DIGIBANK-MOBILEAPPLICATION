import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../GlobalStyles";

const Footer = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("home");
  return (
    <View className="bg-white py-4">
      <View className="flex flex-row justify-between items-center mx-4">
        {/* Home */}
        <TouchableOpacity
          className={`flex items-center ${
            selected === "home" ? "border-t-2 border-primary" : ""
          }`}
          onPress={() => {
            setSelected("home");
            // navigation.navigate("Home");
          }}
        >
          <Entypo
            name="home"
            size={30}
            style={{
              color: selected === "home" ? Color.PrimaryWebOrient : "#000",
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
          className={`flex items-center ${
            selected === "send" ? "border-t-2 border-primary" : ""
          }`}
          onPress={() => {
            setSelected("send");
            // navigation.navigate("Send");
          }}
        >
          <Entypo
            name="paper-plane"
            size={30}
            style={{
              color: selected === "send" ? Color.PrimaryWebOrient : "#000",
            }}
          />
          <Text
            className="mt-1 text-xs font-semibold"
            style={{
              color: selected === "send" ? Color.PrimaryWebOrient : "#000",
            }}
          >
            Send
          </Text>
        </TouchableOpacity>

        {/* Cards */}
        <TouchableOpacity
          className={`flex items-center ${
            selected === "cards" ? "border-t-2 border-primary" : ""
          }`}
          onPress={() => {
            setSelected("cards");
            // navigation.navigate("ApplyForCard");
          }}
        >
          <Entypo
            name="credit-card"
            size={30}
            style={{
              color: selected === "cards" ? Color.PrimaryWebOrient : "#000",
            }}
          />
          <Text
            className="mt-1 text-xs font-semibold"
            style={{
              color: selected === "cards" ? Color.PrimaryWebOrient : "#000",
            }}
          >
            Cards
          </Text>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          className={`flex items-center ${
            selected === "settings" ? "border-t-2 border-primary" : ""
          }`}
          onPress={() => {
            setSelected("settings");
            // navigation.navigate("Settings");
          }}
        >
          <Entypo
            name="cog"
            size={30}
            style={{
              color: selected === "settings" ? Color.PrimaryWebOrient : "#000",
            }}
          />
          <Text
            className="mt-1 text-xs font-semibold"
            style={{
              color: selected === "settings" ? Color.PrimaryWebOrient : "#000",
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
