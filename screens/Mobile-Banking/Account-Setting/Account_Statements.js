import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  Modal,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import API_BASE_URL from "./../../../config/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account_Statements = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [statement, setStatement] = useState({});
  const [filter, setFilter] = useState("All");

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

  const renderTransaction = ({ item }) => {
    const isCredit = item.creditAmt > 0;
    const amount = isCredit ? item.creditAmt : item.debitAmt;

    return (
      <View className="mb-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center w-[70%]">
            <Ionicons
              name={
                isCredit
                  ? "arrow-down-circle-outline"
                  : "arrow-up-circle-outline"
              }
              size={24}
              color={isCredit ? "#3bcb01" : "#fe3105"}
            />
            <Text className="text-gray-500 text-sm ml-2">
              {item.description}
            </Text>
          </View>

          <Text
            className="text-lg font-bold ml"
            style={{ color: isCredit ? "#3bcb01" : "#fe3105" }}
          >
            {amount}
          </Text>
        </View>
      </View>
    );
  };

  // Helper function to group transactions by date
  const groupByDate = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const date = transaction.transactionDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {});
  };

  const fetchUserTransaction = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const accountNumber = await AsyncStorage.getItem("accountNumber");

      if (bearerToken && accountNumber) {
        const response = await axios.get(
          `${API_BASE_URL}/v1/customer/fund/generateStatement?accountNumber=${accountNumber}&startDate=2024-09-01&endDate=2024-09-26&statementType=mini`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        const dto = response.data;

        if (dto && dto.success && dto.data) {
          const groupedTransactions = groupByDate(
            dto.data.transactionList.data
          );
          setStatement(groupedTransactions);
        } else {
          if (dto.message) {
            Alert.alert("Error", dto.message);
          } else if (dto.errors && dto.errors.length > 0) {
            Alert.alert("Error", dto.errors.join("\n"));
          }
        }
      } else {
        Alert.alert("Error", "Unexpected error occurred. Try again later!");
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
    }
  };

  useEffect(() => {
    fetchUserTransaction();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  const filterDatesWithTransactions = (groupedTransactions = {}) => {
    return Object.keys(groupedTransactions)
      .filter((date) => {
        const filteredTransactions = filterTransactions(
          groupedTransactions[date]
        );
        return filteredTransactions.length > 0;
      })
      .sort((a, b) => new Date(b) - new Date(a)); // Sort dates in descending order
  };

  const filterTransactions = (transactions = []) => {
    switch (filter) {
      case "IN":
        return transactions.filter((transaction) => transaction.creditAmt > 0);
      case "OUT":
        return transactions.filter((transaction) => transaction.debitAmt > 0);
      default:
        return transactions;
    }
  };

  const renderHeader = () => (
    <View>
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
          <TouchableOpacity
            className={`px-4 py-2 ${
              filter === "All" ? "bg-primary" : "bg-white"
            } rounded-l-md`}
            onPress={() => setFilter("All")}
          >
            <Text
              className={`${
                filter === "All" ? "text-white" : "text-black"
              } font-semibold text-base text-center`}
            >
              All
            </Text>
          </TouchableOpacity>
          <View className="flex-row shadow-gray-300">
            <TouchableOpacity
              className={`px-4 py-2 ${
                filter === "IN" ? "bg-primary" : "bg-white"
              }`}
              onPress={() => setFilter("IN")}
            >
              <Text
                className={`${
                  filter === "IN" ? "text-white" : "text-black"
                }  font-semibold text-base text-center`}
              >
                IN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-4 py-2 ${
                filter === "OUT" ? "bg-primary" : "bg-white"
              } rounded-r-md`}
              onPress={() => setFilter("OUT")}
            >
              <Text
                className={`${
                  filter === "OUT" ? "text-white" : "text-black"
                }  font-semibold text-base text-center`}
              >
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
    </View>
  );

  return (
    <SafeAreaView>
      {statement ? (
        <FlatList
          data={filterDatesWithTransactions(statement)}
          renderItem={({ item: date }) => (
            <View key={date} className="-top-3">
              <View className="bg-gray-200 p-2 rounded-md my-4 mx-5">
                <Text className="text-lg font-semibold">
                  {formatDate(date)}
                </Text>
              </View>
              <FlatList
                renderItem={renderTransaction}
                data={filterTransactions(statement[date])} // Filter transactions for that specific date
                keyExtractor={(item) => item.transactionId}
                className="px-4"
              />
            </View>
          )}
          keyExtractor={(item) => item}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

export default Account_Statements;
