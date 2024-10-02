import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import Footer from "../../../components/Footer";
import Profile from "../../../assets/Images/ProfileIcon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TextInput from "../../../components/TextInput";
import API_BASE_URL from "../../../config";
import { StatusBar } from "expo-status-bar";

const UpdateProfile = () => {
  const navigation = useNavigation();
  const [accountNumber, setAccountNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [existingMobileNumber, setExistingMobileNumber] = useState("");
  const [existingEmail, setExistingEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const storedAccountNumber = await AsyncStorage.getItem("accountNumber");
      const storedMobileNumber = await AsyncStorage.getItem("mobileNumber");
      const storedEmail = await AsyncStorage.getItem("email");
      const storedCustomerId = await AsyncStorage.getItem("customerId");
      const storedFirstName = await AsyncStorage.getItem("firstName");
      const storedLastName = await AsyncStorage.getItem("lastName");

      setAccountNumber(storedAccountNumber || "");
      setMobileNumber(storedMobileNumber || "");
      setExistingMobileNumber(storedMobileNumber || "");
      setEmail(storedEmail || "");
      setExistingEmail(storedEmail || "");
      setCustomerId(storedCustomerId || "");
      setFirstName(storedFirstName || "");
      setLastName(storedLastName || "");
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!mobileNumber || !email) {
      Alert.alert("Error", "Mobile number and email cannot be empty");
      return;
    }
  
    if (mobileNumber.length !== 12) {
      Alert.alert("Error", "Mobile number must be exactly 12 digits long");
      return;
    }
  
    const updateData = {
      clientNo: customerId, 
      mobileNumber,
      email
    };
  
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/settings/updateProfile`, updateData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log("Received response from API:", response.data);
      
      if (response.data.success) {
        Alert.alert("Success", "Profile updated successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
          },
        ]);
      } else {
        Alert.alert("Error", response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error.message);
      Alert.alert("Error", "Error updating profile: " + (error.response ? error.response.data.message : error.message));
    }
  };
  
  
  
  
  
  return (
    <SafeAreaView className="flex-1">
      <View className="h-24" style={{ backgroundColor: Color.PrimaryWebOrient }}>
        <View className="flex-row items-center justify-center h-full">
          <TouchableOpacity
            onPress={() => navigation.navigate("Account_Setting_List")}
            className="absolute left-5"
          >
            <Entypo name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Update Profile</Text>
        </View>
      </View>
      <ScrollView>
        <View className="flex-1 bg-gray-100">
          <View className="items-center mt-6">
            <View className="relative">
              <Image source={Profile} className="w-24 h-24 rounded-full" />
              <TouchableOpacity className="absolute bottom-0 right-0 p-2 rounded-full">
                <MaterialIcons name="camera-alt" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-xl font-semibold mt-2">
              {firstName} {lastName}
            </Text>
          </View>

          <View className="bg-white p-4 rounded-lg mx-6 mt-6 shadow-md">
            <View className="mb-4">
              <Text className="text-gray-500">Account</Text>
              <View className="flex-row justify-between items-center bg-gray-100 p-1 rounded-md mt-1">
                <TextInput
                  value={accountNumber}
                  editable={false}
                  className="text-black flex-1"
                />
                <TouchableOpacity>
                  <MaterialIcons
                    name="content-copy"
                    size={20}
                    color={Color.PrimaryWebOrient}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-500">Mobile Number</Text>
              <TextInput
                value={mobileNumber}
                onChange={setMobileNumber}
                placeholder="Enter new mobile number"
                keyboardType="numeric"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-500">Carrier</Text>
              <TextInput label="Carrier" placeholder="Enter Carrier" />
            </View>

            <View>
              <Text className="text-gray-500">Email</Text>
              <TextInput
                value={email}
                onChange={setEmail}
                placeholder="Enter new email"
              />
            </View>
          </View>
        </View>
        <View className="p-4">
          <Button
            text="Update Changes"
            width="w-[100%]"
            styles="py-4"
            onPress={handleUpdate}
          />
        </View>
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default UpdateProfile;
