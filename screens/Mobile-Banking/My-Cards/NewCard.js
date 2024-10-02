import React, { useState, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";
import API_BASE_URL from "../../../config";
import Button from "../../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppLoaderContext } from "../../../components/LoaderHOC";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const NewCard = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useContext(AppLoaderContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [cardNumber, setCardNumber] = useState("");
  const [maskedCardNumber, setMaskedCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const formatCardNumber = (number) => {
    const cleaned = ("" + number).replace(/\D/g, "");
    // Format card number as XXXX XXXX XXXX XXXX
    const match = cleaned.match(/\d{1,4}/g);
    return match ? match.join(" ") : "";
  };

  const handleCardNumberChange = (text) => {
    setCardNumber(text);
    setMaskedCardNumber(formatCardNumber(text));
  };

  const handleCvvChange = (text) => {
    const cleaned = ("" + text).replace(/\D/g, "");
    if (cleaned.length <= 3) {
      setCardCvv(cleaned);
    }
  };

  const AddCard = async () => {
    if (
      cardNumber === "" ||
      cardHolder === "" ||
      cardCvv === "" ||
      selectedDate === null
    ) {
      Alert.alert("Error", "Please enter all the fields!");
      return;
    }

    showLoader();

    const customerId = await AsyncStorage.getItem("customerId");
    const bearerToken = await AsyncStorage.getItem("token");
    const accountNumber = await AsyncStorage.getItem("accountNumber");
    const payload = {
      cid: customerId,
      accountNumber: accountNumber,
      cardNumber: cardNumber,
      cvv: cardCvv,
      cardHolderName: cardHolder,
      expiryDate: selectedDate,
    };
    console.log(payload);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/v1/customer/card/verifyCard`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const dto = response.data;

      console.log(dto);
      if (dto && dto.success && dto.data) {
        navigation.navigate("CardManagement");
      } else {
        if (dto.message) {
          Alert.alert("Error", dto.message);
        } else if (dto.errors && dto.errors.length > 0) {
          Alert.alert("Error", dto.errors);
        }
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          Alert.alert("Error", "Server timed out. Try again later!");
        } else if (statusCode === 503) {
          Alert.alert("Error", "Service unavailable. Please try again later.");
        } else if (statusCode === 400) {
          Alert.alert("Error", error.response.data.data.errors[0]);
        } else {
          Alert.alert("Error", error.message);
        }
      } else if (error.request) {
        Alert.alert(
          "Error",
          "No response from the server. Please check your connection."
        );
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      hideLoader();
    }
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
            <Text className="text-center font-InterBold text-2xl">
              Add Card
            </Text>
          </View>
          <View className="flex-1 justify-center items-center p-4 shadow-inner">
            <View className="p-6 rounded-lg shadow-lg w-full">
              <Text className="text-lg font-semibold mb-6">
                Please Enter Your Card Details
              </Text>
              <View className="mb-6">
                <Text className="text-sm font-medium mb-2">Card Number</Text>
                <View className="flex-row items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2">
                  <TextInput
                    className="flex-1 bg-gray-100"
                    placeholder="XXXX XXXX XXXX XXXX"
                    keyboardType="numeric"
                    maxLength={19}
                    value={maskedCardNumber}
                    onChangeText={handleCardNumberChange}
                  />
                  <Image
                    source={{
                      uri: "https://img.icons8.com/color/48/000000/mastercard-logo.png",
                    }}
                    className="w-8 h-8 ml-2"
                  />
                </View>
              </View>
              <View className="mb-6">
                <Text className="text-sm font-medium mb-2">
                  Card Holder Name
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                  placeholder="Enter Here"
                  value={cardHolder}
                  onChangeText={(text) => setCardHolder(text)}
                />
              </View>
              <View className="flex-row justify-between">
                <View className="w-40 mr-2">
                  <Text className="text-sm font-medium mb-2">Expiry Date</Text>
                  <View className="w-full h-11 rounded-lg border border-gray-300 justify-center py-2 px-3">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-base text-gray-400 bg-gray-100">
                        {selectedDate
                          ? new Date(selectedDate).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })
                          : "MM/YY"}
                      </Text>
                      <TouchableOpacity onPress={showDatePicker}>
                        <Icon name="calendar" color="black" size={20} />
                      </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                      display="default"
                    />
                  </View>
                </View>
                <View className="w-40 ml-1">
                  <Text className="text-sm font-medium mb-2">CVV</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                    placeholder="***"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                    value={cardCvv}
                    onChangeText={handleCvvChange}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="flex flex-col justify-between">
            <View className="mt-1 flex-1 p-6">
              <Text className="text-[#7D7C93] font-semibold text-sm">
                Card details will be saved for future transactions in an
                encrypted and secure way.
              </Text>
              <Text className="text-[#7D7C93] font-semibold text-sm mt-4">
                To proceed with this transaction, please ensure e-commerce
                transaction is enabled on debit/credit card.
              </Text>
            </View>
            <View className="px-10 mt-16">
              <Button
                text="Add Now"
                width="w-[100%]"
                styles="py-3 px-12"
                onPress={AddCard}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewCard;
