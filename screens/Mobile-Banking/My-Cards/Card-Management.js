import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Text,
  View,
  Image,
  Alert,
  Switch,
  ImageBackground,
} from "react-native";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import API_BASE_URL from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

const CardManagement = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Credit Card");
  const backgroundImage = require("../../../assets/Images/Cards.png");

  const fetchCardData = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const accountNumber = await AsyncStorage.getItem("accountNumber");
      
      if (!bearerToken) {
        Alert.alert("Error", "Authentication token not found");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/v1/customer/card/fetchCardById/${accountNumber}`,
        { 
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        const updatedCards = response.data.data.map((card) => ({
          ...card,
          isCreditCard: card.isCreditCard === true,
        }));
        setCards(updatedCards);
      } else {
        Alert.alert("Error", "Unexpected response format");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      let message = "Error occurred";

      if (statusCode === 404) message = "Server not found. Please try again later.";
      else if (statusCode === 503) message = "Service unavailable. Please try again later.";
      else if (statusCode === 400) message = error.response.data.message || "Bad request. Please check your input.";
      Alert.alert("Error", message);
    } else if (error.request) {
      Alert.alert("Error", "No response from the server. Please check your connection.");
    } else {
      Alert.alert("Error", `Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const maskCardNumber = (number) => {
    return number.replace(/(.{4})/g, "$1  ").trim();
  };

  const renderNoDataMessage = (type) => (
    <View className="p-5 justify-center items-center">
      <Text className="text-gray-500 text-lg">No {type} Cards Found</Text>
    </View>
  );

  const handleToggle = async (card) => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const accountNumber = await AsyncStorage.getItem("accountNumber");
  
      // Log the payload being sent to the API
    //   console.log("Updating card status with payload:", {
    //     cardNumber: card.cardNumber,
    //     accountNumber: accountNumber,
    //     status: !card.isActive, 
    //   }
    // );
  
      const response = await axios.patch(
        `${API_BASE_URL}/v1/customer/card/updateCardStatus`,
        {},
        {
          params: {
            cardNumber: card.cardNumber, 
            accountNumber: accountNumber,
            status: !card.isActive,
          },
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
  
      if (response.data.success) {
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.cardNumber === card.cardNumber ? { ...c, isActive: !c.isActive } : c
          )
        );
        Alert.alert("Success", `Card is now ${!card.isActive ? "active" : "deactivated"}.`);
      } else {
        const errorMessage = response.data.message || "Failed to update card status.";
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      console.log("Error in handleToggle:", error.response ? error.response.data : error);
      const errorMessage = error.response?.data?.message || "An unknown error occurred.";
      Alert.alert("Error", errorMessage);
    }
  };
  

  const renderCardSection = (card, isExpanded, onPress) => {
    const cardDetails = [
      {
        label: "Card Number",
        value: maskCardNumber(card.cardNumber),
      },
      {
        label: "Card Holder",
        value: card.cardHolderName,
      },
      {
        label: "Expiry",
        value: card.expiryDate,
      },
    ];

    return (
      <List.AccordionGroup style={styles.accordionGroup} key={card.cardId}>
        <List.Accordion
          id={card.cardId}
          key={card.cardId}
          className="font-InterRegular m-0 text-base bg-white mb-3 mt-4"
          style={styles.accordion}
          title={
            <View className="flex flex-row items-center">
              <Image
                source={require("../../../assets/visa.png")}
                className="w-110 h-10 mr-1"
              />
              <View className="flex flex-col ml-4">
                <Text className="text-lg font-semibold text-gray-800">
                  {card.cardHolderName}
                </Text>
                <Text className="text-xs font-medium text-neutral-500">
                  {maskCardNumber(card.cardNumber)}
                </Text>
              </View>
            </View>
          }
          left={(props) => <List.Icon {...props} />}
          expanded={isExpanded}
          onPress={onPress}
        >
          <View className="justify-center items-center px-10 mt-3">
            <ImageBackground
              source={backgroundImage}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            >
              <View className="flex-1 items-center px-5 py-16 mt-10">
                <Text className="text-black text-2xl font-semibold mb-4">
                  {maskCardNumber(card.cardNumber)}
                </Text>
                <View className="flex-row justify-between w-full mb-4">
                  <Text className="text-black text-md font-semibold">
                    {card.expiryDate}
                  </Text>
                  <Text className="text-black text-md font-semibold">
                    CVV: {card.cvv}
                  </Text>
                </View>
                <Text className="text-black text-xl">
                  {card.cardHolderName}
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View className="p-4 mr-2">
            {card.isCreditCard ? null : (
              <View className="flex-row items-center justify-between">
                <Switch
                  trackColor={{ false: "#767577", true: "#1DBBD8" }}
                  thumbColor={card.isActive ? "#1DBBD8" : "#f4f3f4"}
                  onValueChange={() => handleToggle(card)}
                  value={card.isActive}
                />
                <Text className="text-sm font-medium">
                  Deactivate Your Card
                </Text>
              </View>
            )}
            <View className="my-2">
              <View className="border-t border-gray-300"></View>
            </View>
            {cardDetails.map((detail, index) => (
              <View
                key={index}
                className={`mb-2 flex-row items-center justify-between ${
                  index < cardDetails.length - 1 ? "my-2" : ""
                }`}
              >
                <Text className="text-xs text-gray-500">{detail.label}</Text>
                <Text className="text-sm font-medium">{detail.value}</Text>
              </View>
            ))}
          </View>
        </List.Accordion>
      </List.AccordionGroup>
    );
  };

  return (
    <SafeAreaView className="bg-[#f9fafc]" style={{ flex: 1 }}>
      <ScrollView>
        <View className="flex-1">
          <View className="relative w-full mt-10">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
              style={{ zIndex: 1 }}
            >
              <Entypo name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
            <Text className="text-center font-InterBold text-2xl">Cards</Text>
          </View>
          <View className="mt-2">
            <View className="flex flex-row justify-center w-4/5 h-18 my-5 mx-auto">
              <TouchableOpacity
                className={`flex-1 p-3 bg-white w-16 h-12 rounded-l-lg ${
                  selectedOption === "Credit Card"
                    ? "bg-primary shadow-lg"
                    : "shadow-sm"
                }`}
                onPress={() => setSelectedOption("Credit Card")}
              >
                <Text
                  className={`text-center font-bold ${
                    selectedOption === "Credit Card"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Credit Card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 p-3 bg-white w-16 h-12 rounded-r-lg  ${
                  selectedOption === "Debit Card"
                    ? "bg-primary shadow-lg"
                    : "shadow-sm"
                }`}
                onPress={() => setSelectedOption("Debit Card")}
              >
                <Text
                  className={`text-center font-bold ${
                    selectedOption === "Debit Card"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Debit Card
                </Text>
              </TouchableOpacity>
            </View>

            {/* Credit Card Section */}
            <List.Section className="bg-white rounded-xl ml-5 mr-5 mt-0">
              {selectedOption === "Credit Card" ? (
                cards.filter((card) => card.isCreditCard).length > 0 ? (
                  cards
                    .filter((card) => card.isCreditCard)
                    .map((card) =>
                      renderCardSection(card, expanded, setExpanded)
                    )
                ) : (
                  renderNoDataMessage("Credit")
                )
              ) : (
                <View></View>
              )}
            </List.Section>

            {/* Debit Card Section */}
            <List.Section className="bg-white rounded-xl ml-5 mr-5 mt-[-10px]">
              {selectedOption === "Debit Card" ? (
                cards.filter((card) => !card.isCreditCard).length > 0 ? (
                  cards
                    .filter((card) => !card.isCreditCard)
                    .map((card) =>
                      renderCardSection(card, expanded2, setExpanded2)
                    )
                ) : (
                  renderNoDataMessage("Debit")
                )
              ) : (
                <View></View>
              )}
            </List.Section>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#f9fafc" style="light" />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  accordion: {
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
  },
  imageBackground: {
    width: wp("85%"),
    height: hp("30%"),
    borderRadius: 16,
  },
  imageStyle: {
    borderRadius: 16,
  },
  accordionGroup: {
    backgroundColor: "transparent",
  },
});

export default CardManagement;
