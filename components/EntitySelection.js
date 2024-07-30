import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Choice from "../assets/Images/Choice.svg";
import { Color } from "../GlobalStyles";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import LoaderComponent from "./LoaderComponent";
const EntitySelection = () => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get("window").height;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBankAccountPress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Home");
    }, 1000);
  };

  const handleWalletPress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Wallet");
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.PrimaryWebOrient }}>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
          style={[styles.linearGradient, { height: screenHeight }]}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: "#fff",
              marginBottom: 10,
            }}
          >
             Hey Nadeem 
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "white",
              margin: 2,
            }}
          >
            Add, Manage & Track your all financial account only in one app
          </Text>
          <Choice
            fill={Color.PrimaryWebOrient}
            style={{ alignSelf: "center", marginTop:5 }}
          />
          <View style={styles.roundedContainer}>
            <Text style={[styles.optionText, { fontWeight: "600" }]}>
              Select an option to continue
            </Text>
            <View className="space-x-5" style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedOption === "BankAccount" && styles.selectedOption,
                ]}
                onPress={handleBankAccountPress}
              >
                <FontAwesome
                  name="bank"
                  size={70}
                  style={{
                    color: Color.PrimaryWebOrient,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    textAlign: "center",
                    marginTop: "10%",
                  }}
                >
                  Bank Account
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedOption === "Wallet" && styles.selectedOption,
                ]}
                onPress={handleWalletPress}
              >
                <Entypo
                  name="wallet"
                  size={70}
                  style={{
                    color: Color.PrimaryWebOrient,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    textAlign: "center",
                    marginTop: "10%",
                  }}
                >
                  Wallet Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
      <LoaderComponent visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  linearGradient: {
    width: "100%",
  },
  roundedContainer: {
    backgroundColor: "#fff",
    height: 0.7 * Dimensions.get("window").height,
    width: "100%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    alignSelf: "center",
    top: "8%",
  },

  optionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#868889",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  optionButton: {
    backgroundColor: "#F4F5F9",
    borderRadius: 10,
    padding: 25,
    width: "48%",
    flexDirection: "column",
    alignItems: "center",
    right: "4%",
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: "10%",
  },
  selectedOption: {
    borderColor: Color.PrimaryWebOrient,
    borderWidth: 2,
  },
});

export default EntitySelection;