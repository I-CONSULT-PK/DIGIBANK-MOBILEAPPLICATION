import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import CashUpContainer from "../../../assets/Images/CashUpContainer.png";
import CustomButton from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import Footer from "../../../components/Footer";
import { Color } from "../../../GlobalStyles";

const Summary = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc]">
      <ScrollView className="flex-1">
        <View className="flex-row items-center justify-center w-full mt-10">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute left-5"
          >
            <Entypo name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
          <Text className="font-InterBold text-2xl">Easy Cash</Text>
        </View>
        <View className="bg-white p-6 rounded-lg shadow-lg w-11/12 mt-7 mx-auto">
          <View className="relative mt-5">
            <Image
              source={CashUpContainer}
              className="w-80 h-40 object-cover mx-auto"
              style={{ resizeMode: "contain" }}
            />
            <View className="absolute inset-0 flex flex-col justify-center items-center p-4">
              <View className="w-full px-2">
                <Entypo
                  name="credit-card"
                  size={20}
                  style={{ marginLeft: 10 }}
                />
                <View className="flex flex-row items-center justify-between mb-2">
                  <Text className="text-base font-semibold text-gray-500">
                    from
                  </Text>
                  <Checkbox
                    status={
                      selectedOption === "Credit Shield Plus"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleSelect("Credit Shield Plus")}
                    color="green"
                    uncheckedColor="gray"
                    style={{ transform: [{ scale: 0.75 }] }}
                  />
                </View>
                <Text className="text-base font-semibold text-gray-500">
                  XXXX-xXXX-XX25
                </Text>
                <View className="text-center mt-2 w-64">
                  <Text className="text-gray-500">cash up - Platinum</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="relative mt-5">
            <Image
              source={CashUpContainer}
              className="w-80 h-40 object-cover mx-auto"
              style={{ resizeMode: "contain" }}
            />
            <View className="absolute inset-0 flex flex-col justify-center items-center p-4">
              <View className="w-full px-2">
                <Entypo
                  name="credit-card"
                  size={20}
                  style={{ marginLeft: 10 }}
                />
                <View className="flex flex-row items-center justify-between mb-2">
                  <Text className="text-base font-semibold text-gray-500">
                    from
                  </Text>
                  <Checkbox
                    status={
                      selectedOption === "Accident Shield"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleSelect("Accident Shield")}
                    color="green"
                    uncheckedColor="gray"
                    style={{ transform: [{ scale: 0.75 }] }}
                  />
                </View>
                <Text className="text-base font-semibold text-gray-500">
                  XXXX-xXXX-XXXX-XXXX-XX85
                </Text>
                <View className="text-center mt-2 w-64">
                  <Text className="text-gray-500">fatima Zafar</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="px-10 mt-5">
          <View className="flex flex-row items-center">
            <CheckBox
              checked={checked}
              onPress={() => setChecked(!checked)}
              containerStyle={{ padding: 0, margin: 0 }}
            />
            <Text className="text-gray-700 mb-2">
              I have read through the{" "}
              <TouchableOpacity>
                <Text className="underline text-gray-700 font-bold ml-1">
                  KFS Statement
                </Text>
              </TouchableOpacity>
            </Text>
          </View>

          <CustomButton
            text="Send 8000 PKR"
            onPress={() => setModalVisible(true)}
            disabled={!checked}
            styles={`mt-4`}
            textStyles={`text-base text-center font-medium ${
              !checked ? "text-gray-500" : "text-white"
            }`}
          />
        </View>
      </ScrollView>
      <Footer />

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <View className="bg-white p-5 rounded-lg w-11/12 max-w-xs">
            <Text className="text-xl font-semibold mb-4 text-center">
              Please Confirm?
            </Text>

            <Text className="text-sm text-gray-500 text-center mb-4">
              {"Thank you for setting up an easy cash of\n"}
              <Text className="text-sm font-semibold text-black">
                {"90,000 PKR\n"}
              </Text>
            </Text>
            <Text className="text-base mb-4 text-center">
              Are you sure you want to send 8000 PKR?
            </Text>

            <View className="flex-row justify-between">
              <CustomButton
                text="Do it Later"
                onPress={() => {
                  setModalVisible(false);
                }}
                width="w-32"
                backgroundColor="#FFF"
                textColor="#1D4ED8"
                fontSize="text-sm"
                borderColor={Color.PrimaryWebOrient}
              />
              <CustomButton
                text="Confirm"
                onPress={() => {
                  setModalVisible(false);
                }}
                width="w-32"
                backgroundColor="#1D4ED8"
                textColor="#FFF"
                fontSize="text-sm"
                styles="mr-4"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Summary;
