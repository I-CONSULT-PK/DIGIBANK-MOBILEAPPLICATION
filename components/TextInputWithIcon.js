import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Color } from "../GlobalStyles";

const InputWithIcon = ({ isPassword, value, onChange, placeholder, disable, outlineColor, keyboardType }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View
      style={{
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextInput
        mode="outlined"
        style={{
          flex: 1,
          backgroundColor: "#F4F5F9",
          fontSize: 15,
        }}
        placeholder={placeholder}
        activeOutlineColor="#A5A7A8"
        placeholderTextColor="#A5A7A8"
        theme={{
          fonts: { bodyLarge: { fontFamily: "InterMedium" } },
          roundness: 10,
          colors: {
            outline: "#F4F5F9",
          },
        }}
        secureTextEntry={!showPassword && isPassword}
        value={value}
        disabled={disable}
        onChangeText={onChange}
        outlineColor={outlineColor}
        keyboardType={keyboardType}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{ position: "absolute", right: 10 }}
        >
          <AntDesign
            name={showPassword ? "eye" : "eyeo"}
            size={20}
            color={Color.PrimaryWebOrient}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputWithIcon;
