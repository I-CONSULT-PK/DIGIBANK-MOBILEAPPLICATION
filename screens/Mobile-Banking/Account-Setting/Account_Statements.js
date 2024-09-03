import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  Modal,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";
const Account_Statements = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const transactions = [
    {
      id: "1",
      date: "27 August 2024",
      description: "1- LINK ATM Cash withdrawal",
      amount: "55,000",
      isCredit: false,
    },
    {
      id: "2",
      date: "29 August 2024",
      description: "Internal Transfer From Account 1006",
      amount: "56,000",
      isCredit: true,
    },
    {
      id: "3",
      date: "30 August 2024",
      description: "1- LINK ATM Cash withdrawal",
      amount: "75,000",
      isCredit: false,
    },
    {
      id: "4",
      date: "31 August 2024",
      description: "1- LINK ATM Cash withdrawal",
      amount: "55,000",
      isCredit: false,
    },
    {
      id: "5",
      date: "29 August 2024",
      description: "Internal Transfer From Account 1006",
      amount: "65,000",
      isCredit: true,
    },
  ];
  const renderTransaction = ({ item }) => (
    <View className=" mb-4">
      <View className="bg-gray-200 p-2 rounded-md mb-2">
        <Text className="text-lg font-semibold">{item.date}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons
            name={
              item.isCredit
                ? "arrow-down-circle-outline"
                : "arrow-up-circle-outline"
            }
            size={24}
            color={item.isCredit ? "green" : "red"}
          />
          <Text className="text-gray-500 text-sm ml-2">{item.description}</Text>
        </View>

        <Text className="text-lg font-bold ml">{item.amount}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-1 bg-gray-100">
          {/* Header */}
          <View className="flex-row items-center justify-between p-3 bg-white">
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              className=" "
              style={{ zIndex: 1 }}
            >
              <Entypo name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
            <View className="absolute left-0 right-0 flex-row justify-center">
              <Text className="text-lg font-bold text-center">
                Account Statement
              </Text>
            </View>
          </View>

          {/* Tabs and Balance Summary */}
          <View className="flex-row justify-between bg-white p-3">
            <View className="flex-row shadow-lg rounded-md shadow-gray-300">
              <TouchableOpacity className="px-4 py-2 bg-primary rounded-l-md">
                <Text className="text-white font-semibold text-base text-center">
                  All
                </Text>
              </TouchableOpacity>
                <View className="flex-row bg-white shadow-gray-300 rounded-r-md">
                    <TouchableOpacity className="px-4 py-2">
                    <Text className="text-black font-semibold text-base text-center">
                        IN
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-4 py-2">
                    <Text className="text-black font-semibold text-base text-center">
                        OUT
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-row space-x-2">
              <View>
                <TouchableOpacity
                  className="p-2 rounded-md bg-primary"
                  onPress={showDatePicker}
                >
                  <Ionicons
                    style={{ color: "white" }}
                    name="calendar-outline"
                    size={24}
                  />
                </TouchableOpacity>

                {show && Platform.OS === "ios" && (
                  <Modal
                    transparent={true}
                    animationType="slide"
                    visible={show}
                    onRequestClose={hideDatePicker}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.3)",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          padding: 20,
                          borderRadius: 10,
                        }}
                      >
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode="date"
                          display="default"
                          onChange={onChange}
                        />
                        <Button onPress={hideDatePicker} title="Done" />
                      </View>
                    </View>
                  </Modal>
                )}

                {show && Platform.OS === "android" && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    onClose={hideDatePicker}
                  />
                )}
              </View>
              <TouchableOpacity className="p-2 rounded-md border border-gray-300 shadow-xl">
                <Ionicons name="download" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-center items-center text-center p-4">
            <View className="bg-blue-500 px-6 py-4 rounded-md bg-primary ">
              <Text className="text-white  font-semibold  text-lg text-center">
                4,925.15
              </Text>
              <Text className="text-white text-sm text-center">
                Opening Balance
              </Text>
            </View>
            <View className="bg-white border  px-6 py-4 border-gray-200  rounded-lg">
              <Text className="text-black font-semibold text-lg text-center">
                4,925.15
              </Text>
              <Text className="text-black  text-sm text-center">
                Closing Balance
              </Text>
            </View>
          </View>

          {/* Transaction List */}
          <FlatList
            renderItem={renderTransaction}
            data={transactions}
            keyExtractor={(item) => item.id}
            className="px-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account_Statements;
