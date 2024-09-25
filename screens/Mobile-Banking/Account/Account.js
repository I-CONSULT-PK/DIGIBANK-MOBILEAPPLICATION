import React, { useEffect, useState, useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { Color } from "../../../GlobalStyles";
import { Entypo } from "@expo/vector-icons";
import Button from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../../config";

const AccountCard = ({
  name,
  accountNumber,
  iban,
  branchName,
  branchCode,
  accountBalance,
  isFavorite,
  onSelect,
  isDefault // New prop to check if it's the default account
}) => {
  const [isFavorite1, setIsFavorite1] = useState(isFavorite || false);

  const toggleFavorite = () => {
    setIsFavorite1(!isFavorite1);
  };

  return (
    <View className="bg-white rounded-lg border border-gray-200 p-4 my-2 shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-black">{name}</Text>
        <TouchableOpacity onPress={() => onSelect(accountNumber)}>
          <FontAwesome
            name={isDefault ? "star" : "star-o"} // Yellow star if default
            size={20}
            color={isDefault ? "#F4C724" : "#B0B0B0"} // Change color based on default
          />
        </TouchableOpacity>
      </View>

      {/* Account Details */}
      <View className="mt-2 flex-row justify-between">
        <Text className="text-sm text-gray-500">Account Number:</Text>
        <Text className="text-sm font-bold text-black">{accountNumber}</Text>
      </View>
      <Divider className="mt-1" />
      <View className="mt-2 flex-row justify-between mb-1">
        <Text className="text-sm text-gray-500">Balance:</Text>
        <Text className="text-sm font-bold text-black">PKR {accountBalance}</Text>
      </View>
      <Divider />
      <View className="mt-2 flex-row justify-between mb-1">
        <Text className="text-sm text-gray-500">Branch Name:</Text>
        <Text className="text-sm font-bold text-black">{branchName || "N/A"}</Text>
      </View>
      <Divider />
      <View className="mt-1 flex-row justify-between mb-1">
        <Text className="text-sm text-gray-500">IBAN:</Text>
        <Text className="text-sm font-bold text-black">{iban || "N/A"}</Text>
      </View>

      {/* Select Account Button */}
      <TouchableOpacity
        onPress={() => onSelect(accountNumber)} // Call the passed function with the account number
        className="bg-cyan-100 rounded-lg py-2 mt-4 flex-row justify-center items-center"
      >
        <FontAwesome name="share-alt" size={18} />
        <Text className=" font-InterSemiBold ml-2">Set as Default Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const Account = () => {
  const navigation = useNavigation();
  const [accountData, setAccountData] = useState([]);
  const [defaultAccount, setDefaultAccount] = useState(null);

  const fetchLocalAccountDetails = async () => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const customerId = await AsyncStorage.getItem("customerId");
  
      if (bearerToken && customerId) {
        const response = await axios.get(
          `${API_BASE_URL}/v1/customer/dashboard?customerId=${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
  
        if (response && response.data.success && response.data) {
          const { accountList } = response.data.data;
  
          // Set default account from the fetched data
          const defaultAccountData = accountList.find(account => account.defaultAccount);
          if (defaultAccountData) {
            setDefaultAccount(defaultAccountData.accountNumber);
          }
  
          // Sort the accountList to put the favorite account on top
          const sortedAccountList = accountList.sort(
            (a, b) => b.defaultAccount - a.defaultAccount
          );
          setAccountData(sortedAccountList);
        } else {
          Alert.alert("Error", response.data.message || "Failed to fetch data");
        }
      } else {
        Alert.alert("Error", "Unexpected error occurred. Try again later!");
      }
    } catch (error) {
      // ... (existing error handling remains unchanged)
    }
  };
  

  const setAccountDefault = async (accountNo) => {
    try {
      const bearerToken = await AsyncStorage.getItem("token");
      const customerId = await AsyncStorage.getItem("customerId");

      if (bearerToken && customerId) {
        // Update existing default account if any
        if (defaultAccount) {
          // Call API to unset the current default account
          await axios.get(
            `${API_BASE_URL}/v1/customer/setdefaultaccount?customerId=${customerId}&accountNumber=${defaultAccount}&defaultAccount=false`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );
        }

        const response = await axios.get(
          `${API_BASE_URL}/v1/customer/setdefaultaccount?customerId=${customerId}&accountNumber=${accountNo}&defaultAccount=true`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        const dto = response.data;

        if (dto && dto.success && dto.data) {
          console.log(dto);
          setDefaultAccount(accountNo); // Update the default account state
          Alert.alert("Success", "Default account set successfully.");
          // Optionally, refresh account data or update UI
        } else {
          Alert.alert("Error", response.data.message || "Failed to fetch data");
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
        } else {
          Alert.alert("Error", error.response.data.data.errors[0]);
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
    fetchLocalAccountDetails();
  }, []);

  return (
    <SafeAreaView className="h-full flex-1">
      <LinearGradient
        colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row items-center justify-center p-4 mt-2">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Account</Text>
          </View>
          <View className="py-4 px-6 mb-4">
            <Text className="text-center text-white text-2xl font-bold">
              PKR {accountData[0]?.accountBalance || 0}
            </Text>

            <View className="flex items-center justify-center mt-4">
              <TouchableOpacity className="bg-white rounded-lg py-2 flex-row justify-center items-center w-32">
                <Text className="text-cyan-500 font-bold">+ Add Account</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-1 bg-white mt-2 rounded-t-[30px] px-7 pt-7 shadow-2xl">
            <View className="flex-1 justify-between">
              <View className="p-1">
                {/* Account Cards */}
                {accountData.map((account, index) => (
                  <AccountCard
                    key={index}
                    name={account.accountType}
                    accountNumber={account.accountNumber}
                    accountBalance={account.accountBalance}
                    iban={account.ibanCode}
                    branchName={"DHA Branch, Karachi"} // Placeholder as the data doesn't have a branch name
                    branchCode={"589"} // Placeholder for now
                    isFavorite={account.defaultAccount}
                    onSelect={setAccountDefault} // Pass the function here
                    isDefault={account.accountNumber === defaultAccount} // Pass if it's the default account
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Account;
