import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Color } from "../../../GlobalStyles";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../../config";
import Footer from "../../../components/Footer";

export default function UserActivity({ navigation }) {
  // Changed to UserActivity
  const [days, setDays] = useState("10");
  const [userActivity, setUserActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const bearerToken = await AsyncStorage.getItem("token");
      const customerId = await AsyncStorage.getItem("customerId");
      fetchUserActivity(customerId, bearerToken);
    };

    fetchData();
  }, [days]);

  const fetchUserActivity = async (customerId, bearerToken) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/v1/userActivity/getUserActivity?customerId=${customerId}&days=${days}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

      const activities = response.data.data
        .filter((item) => {
          const activityDateParts = item.activityDate.split(" ")[0].split("-");
          const activityDate = new Date(
            `${activityDateParts[2]}-${activityDateParts[1]}-${activityDateParts[0]}`
          );
          return activityDate >= cutoffDate;
        })
        .map((item) => ({
          id: item.activityDate,
          date: item.activityDate.split(" ")[0],
          amount: item.pkr || "0.00",
          loggedTime: item.activityDate.split(" ")[1],
          activityDate: item.activityDate,
        }));

      activities.sort((a, b) => new Date(b.date) - new Date(a.date));

      setUserActivity(activities);
    } catch (error) {
      console.error("Error during API call:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to fetch user activity"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-lg p-4 mb-2">
      <View className="bg-gray-200 h-18">
        <Text className="text-lg font-bold mb-1">Trans. Date: {item.date}</Text>
      </View>
      <Text className="text-xl text-green-600 mb-1">PKR {item.amount}</Text>
      <Text className="text-xs text-gray-600">
        User Logged In on {item.activityDate}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <View
        className="h-24"
        style={{ backgroundColor: Color.PrimaryWebOrient }}
      >
        <View className="flex-row items-center justify-center h-full">
          <TouchableOpacity
            onPress={() => navigation.navigate("Account_Setting_List")}
            className="absolute left-5"
          >
            <Entypo name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">User Activity</Text>
        </View>
      </View>
      <StatusBar style="auto" />

      <View className="flex-row justify-center mt-5 mb-5">
        {["10", "20", "30"].map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setDays(day)}
            className={`flex-1 p-3 rounded-lg mx-3 ${
              days === day ? "bg-primary shadow-lg" : "bg-white shadow-sm"
            }`}
          >
            <Text
              className={`text-center font-bold ${
                days === day ? "text-white" : "text-black"
              }`}
            >
              {day} Days
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-1">
        {loading ? (
          <Text className="text-center text-gray-600">Loading...</Text>
        ) : (
          <FlatList
            data={userActivity}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle="px-4"
          />
        )}
      </View>

      <Footer />
    </View>
  );
}
