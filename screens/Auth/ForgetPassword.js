import React, { useState, useContext } from "react";
import { ScrollView, Text, View, Alert, TouchableOpacity, SafeAreaView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AppLoaderContext } from "../../components/LoaderHOC";
import axios from "axios";
import CustomButton from "../../components/Button";
import Input from "../../components/TextInput";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";

const ForgetPassword = ({ route }) => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useContext(AppLoaderContext);
  const { control, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm();
  const { source } = route.params || {};
  const [isEditable, setIsEditable] = useState(true);
  const [serverData, setServerData] = useState(null);
  const [showInputFields, setShowInputFields] = useState(true); 

  // Function to handle API request
  const handleAPIRequest = async (data) => {
    try {
      showLoader();

      const url = 'http://192.168.0.153:8080/v1/customer/forgetUser';
      console.log("Constructed URL:", url); // Log the URL

      // Send POST request to the server
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" }
      });

      // Extract data from the response
      const { success, message, data: responseData } = response.data;

      if (success) {
        // Process successful response
        setServerData(responseData);
        setValue("firstName", responseData.firstName || "");
        setValue("lastName", responseData.lastName || "");
        setValue("email", responseData.email || "");
        setValue("mobileNumber", responseData.mobileNumber || "");
        setIsEditable(false); 
        setShowInputFields(false); 

        // Navigate to OTP screen with email, mobile number, cnic, and account number
        navigation.navigate("OTP", {
          email: responseData.email,
          mobileNumber: responseData.mobileNumber,
          cnic: data.cnic,
          accountNumber: data.accountNumber,
          sourceScreen: source,
        });
        
      } else {
        Alert.alert("Error", message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Axios error:", error);

      if (error.response) {
        console.error("Error Data:", error.response.data);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }

      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to fetch user information. Please try again."
      );
    } finally {
      hideLoader();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-row items-center p-4 mt-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-black font-semibold text-lg ml-4">
            {source === "password" ? "Forgot Password" : "Forgot Username"}
          </Text>
        </View>

        <View className="flex-1 mt-4 px-4">
          <View className="bg-white rounded-xl shadow-xl shadow-slate-500 px-5 pt-5 pb-4">
            {showInputFields && (
              <>
                <View className="mb-5">
                  <Text className="text-sm mb-2 font-InterMedium">CNIC Number*</Text>
                  <Controller
                    control={control}
                    name="cnic"
                    rules={{ required: "CNIC Number is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Enter your CNIC"
                        onChange={(text) => {
                          onChange(text);
                          clearErrors("cnic");
                        }}
                        onBlur={onBlur}
                        value={value}
                        editable={isEditable}
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    )}
                  />
                  {errors.cnic && (
                    <Text className="text-red-500">{errors.cnic.message}</Text>
                  )}
                </View>

                <View className="mb-6">
                  <Text className="text-sm mb-2 font-InterMedium">Account Number*</Text>
                  <Controller
                    control={control}
                    name="accountNumber"
                    rules={{ required: "Account Number is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Enter 14 digits Acc No."
                        onChange={(text) => {
                          onChange(text);
                          clearErrors("accountNumber");
                        }}
                        onBlur={onBlur}
                        value={value}
                        editable={isEditable}
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    )}
                  />
                  {errors.accountNumber && (
                    <Text className="text-red-500">
                      {errors.accountNumber.message}
                    </Text>
                  )}
                </View>
              </>
            )}

            {/* Fields for displaying server data */}
            {!showInputFields && serverData && (
              <>
                <View className="mb-5">
                  <Text className="text-sm mb-2 font-InterMedium">Email</Text>
                  <Input
                    value={serverData.email || ""}
                    editable={false} 
                    className="border border-gray-300 rounded-md px-3 py-2 bg-gray-200"
                  />
                </View>

                <View className="mb-5">
                  <Text className="text-sm mb-2 font-InterMedium">Mobile Number</Text>
                  <Input
                    value={serverData.mobileNumber || ""}
                    editable={false} 
                    className="border border-gray-300 rounded-md px-3 py-2 bg-gray-200"
                  />
                </View>
              </>
            )}

            <View className="m-5">
              <CustomButton
                Text="Next"
                onPress={handleSubmit(handleAPIRequest)}
                className="bg-blue-500 text-white rounded-md px-4 py-2"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#ffffff" style="dark" />
    </SafeAreaView>
  );
};

export default ForgetPassword;
