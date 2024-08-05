import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Input from "../../../components/TextInput";
import CustomButton from "../../../components/Button";

const PasswordChange = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [userCnic, setUserCnic] = useState("");
    const [userAccountNumber, setUserAccountNumber] = useState("");
  
    const { accountNumber, cnic, sourceScreen } = route.params || {};
  
    const {
      control,
      handleSubmit,
      formState: { errors },
      setError,
    } = useForm();
  
    useEffect(() => {
      if (route.params) {
        const { accountNumber, cnic } = route.params;
        setUserCnic(cnic || "");
        setUserAccountNumber(accountNumber || "");
      }
    }, [route.params]);
  
    const onSubmit = async (data) => {
      if (data.NewPassword !== data.RetypeNewPassword) {
        setError("RetypeNewPassword", {
          type: "manual",
          message: "Passwords do not match.",
        });
        return;
      }
  
      const payload = {
        accountNumber: userAccountNumber,
        cnic: userCnic,
        password: data.RetypeNewPassword,
      };
  
      try {
        const response = await axios.post(
          "http://192.168.0.153:8080/v1/customer/forgetPassword",
          payload
        );
  
        if (response.data.success) {
          navigation.navigate("Login");
        } else {
          Alert.alert(
            "Error",
            response.data.message || "Failed to change password. Please try again."
          );
        }
      } catch (error) {
        Alert.alert("Error", "Failed to change password. Please try again.");
      }
    };
  
    return (
      <ScrollView className="bg-white">
        <View className="bg-white flex-1">
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Entypo name="chevron-left" size={30} color="#090909" marginTop={40} />
          </TouchableOpacity>
          <View className="justify-center items-center p-3">
            <Text className="font-InterBold text-3xl">Change Password</Text>
          </View>
          <View className="m-5">
            <View className="justify-between space-x-1 mt-5">
              <Text className="text-sm font-InterMedium text-text-gray">New Password</Text>
              <Controller
                control={control}
                rules={{ required: "New Password is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input secureTextEntry={true} value={value} onChange={onChange} onBlur={onBlur} />
                )}
                name="NewPassword"
              />
              {errors.NewPassword && (
                <Text className="text-red-500">{errors.NewPassword.message}</Text>
              )}
            </View>
            <View className="justify-between space-x-1 mt-5">
              <Text className="text-sm font-InterMedium text-text-gray">Retype New Password</Text>
              <Controller
                control={control}
                rules={{ required: "Retype New Password is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input secureTextEntry={true} value={value} onChange={onChange} onBlur={onBlur} />
                )}
                name="RetypeNewPassword"
              />
              {errors.RetypeNewPassword && (
                <Text className="text-red-500">{errors.RetypeNewPassword.message}</Text>
              )}
            </View>
            <View className="p-5 mt-2">
              <CustomButton Text={"Save"} onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  
  export default PasswordChange;
  
