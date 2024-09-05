import React, { useState, useEffect } from "react";
import { Text, View, ScrollView,FlatList, TouchableOpacity, BackHandler } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { List, Divider } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Color } from "../../../GlobalStyles";
const History = () => {
  const navigation = useNavigation();
  const transactions = [
    { id: '1', date: '27 August 2024', description: '1- LINK ATM Cash withdrawal', amount: '55,000', isCredit: false },
    { id: '2', date: '29 August 2024', description: 'Internal Funds Transfer From Account 1006987888 To 5658974689', amount: '55,000', isCredit: true },
    { id: '3', date: '27 August 2024', description: '1- LINK ATM Cash withdrawal', amount: '55,000', isCredit: false },
    { id: '4', date: '27 August 2024', description: '1- LINK ATM Cash withdrawal', amount: '55,000', isCredit: false },
    { id: '5', date: '29 August 2024', description: 'Internal Funds Transfer From Account 1006987888 To 5658974689', amount: '55,000', isCredit: true },
  ];
  const renderTransaction = ({ item }) => (
    <View className="flex-row justify-between items-center p-4 bg-white my-1 rounded-md">
      <View>
        <Text className="text-gray-600 font-bold">{item.date}</Text>
        <Text className="text-gray-500 text-sm">{item.description}</Text>
      </View>
      <View className="flex-row items-center">
        <Ionicons 
          name={item.isCredit ? 'arrow-down-circle-outline' : 'arrow-up-circle-outline'} 
          size={24} 
          color={item.isCredit ? 'green' : 'red'} 
        />
        <Text className="ml-2 text-lg font-bold">{item.amount}</Text>
      </View>
    </View>
  );
  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 bg-white">
        <Ionicons name="chevron-back-outline" size={24} color="black" />
        <Text className="text-lg font-bold">Account Statement</Text>
        <Ionicons name="download-outline" size={24} color="black" />
      </View>

      {/* Tabs and Balance Summary */}
      <View className="flex-row justify-around bg-white p-2">
        <TouchableOpacity className="px-4 py-2 bg-blue-500 rounded-full">
          <Text className="text-white text-sm">All</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2">
          <Text className="text-gray-600 text-sm">IN</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2">
          <Text className="text-gray-600 text-sm">OUT</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-2 bg-white rounded-full">
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between p-4">
        <View className="bg-blue-500 p-4 rounded-lg">
          <Text className="text-white text-lg">4,925.15</Text>
          <Text className="text-white text-sm">Opening Balance</Text>
        </View>
        <View className="bg-white border border-gray-300 p-4 rounded-lg">
          <Text className="text-gray-600 text-lg">4,925.15</Text>
          <Text className="text-gray-600 text-sm">Closing Balance</Text>
        </View>
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        className="px-4"
      />
    </View>


  );
};
export default History;
