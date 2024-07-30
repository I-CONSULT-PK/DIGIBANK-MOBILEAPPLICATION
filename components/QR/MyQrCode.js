import React from "react";
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, } from "react-native";
import MyQrCodeImage from "../../assets/Images/MyQRCode.png";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const MyQrCodeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.qrCodeImage}
        source={MyQrCodeImage}
        resizeMode="contain"
      />
      <Text className="font-Medium text-lg">Scan to Transfer</Text>
      <TouchableOpacity style={styles.backButton} >
        <Ionicons name="md-arrow-back" size={44} color="black" 
        onPress={() => navigation.navigate("Wallet")}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qrCodeImage: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.5,
  },
  backButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
});

export default MyQrCodeScreen;
