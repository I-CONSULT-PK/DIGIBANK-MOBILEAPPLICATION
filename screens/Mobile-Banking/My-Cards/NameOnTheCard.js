import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Animated,
  BackHandler,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../../components/Footer";
import TextInput from "../../../components/TextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import ListSectionCard from "../../../assets/Images/ListSectionCard.svg";

const NameOnTheCard = () => {
  const navigation = useNavigation();
  const [showMessage, setShowMessage] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initialize animated value

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const handleBackPress = () => {
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const handleConfirmAddress = () => {
    // Show the message and animate it
    setShowMessage(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Navigate to the next screen after a delay
    setTimeout(() => {
      navigation.navigate("CardActivation");
    }, 1000); // 1 second delay
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc] h-full">
      <ScrollView>
        <TouchableOpacity onPress={handleBack} className="mt-5 ml-3">
          <Entypo name="chevron-left" size={30} color="#090909" />
        </TouchableOpacity>
        <Text className="text-2xl text-center mt-5 font-bold">
          Activate Your Card
        </Text>

        {/* Conditionally render the message with fade-in effect */}
        {showMessage && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <View className="flex-row items-center px-12 py-5 bg-emerald-50 rounded-md">
              <Icon
                name="check-circle"
                size={20}
                color="#4CAF50"
                className="mr-2"
              />
              <Text className=" ml-3 text-sm font-semibold text-gray-800 capitalize text-center">
                Your application is approved!
              </Text>
            </View>
          </Animated.View>
        )}

        <View className="flex flex-col px-8 py-7 mt-7 bg-white rounded-xl shadow-lg max-w-md mx-auto">
          <View className="justify-center items-center">
            <ListSectionCard width={300} />
          </View>
          <View>
            <Text className="font-bold text-center">
              Add the address to which we can{"\n"} send your Digi Credit Card
            </Text>
          </View>
          <View className="mt-9">
            <Text className="text-sm font-medium text-zinc-600">
              Name on the Card
            </Text>
            <TextInput className="mt-2" placeholder="Enter Here" />
          </View>

          <View className="mt-6">
            <Text className="text-sm font-medium text-zinc-600">
              Delivery address
            </Text>
            <TextInput className="mt-2" placeholder="Enter Here" />
          </View>
        </View>

        <View className="p-5">
          <Button
            text="Confirm Address"
            width="w-[100%]"
            styles="mb-4 py-4"
            onPress={handleConfirmAddress}
          />
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default NameOnTheCard;
