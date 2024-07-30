import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  Button,
  TextInput,
  Pressable,
  BackHandler,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../../GlobalStyles";
import CustomButton from "../../../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import Input from "../../../components/TextInput";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

const NewAccountAdd = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState("");
  const [name, setName] = useState("");
  const [showNameContainer, setShowNameContainer] = useState(false);
  const [fetchTitleDisabled, setFetchTitleDisabled] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const data = [
    { key: "1", value: "0010298700567" },
    { key: "2", value: "0010298536567" },
  ];

  const data1 = [
    { key: "1", value: "Bank Alfalah" },
    { key: "2", value: "Meezan Bank" },
    { key: "3", value: "Bank Al Habib" },
    { key: "4", value: "HBL Bank" },
  ];
  const {
    control,
    // handleSubmit,
    formState: { errors },
  } = useForm();
  const handleFetchTitleClick = () => {
    setName("Abdul Rehman");
    setShowNameContainer(true);
    setFetchTitleDisabled(true);
  };
  const handleSubmit = () => {
    setShowConfirmation(true);
  };
  const handleBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const handleBackPress = () => {
      // Manually navigate to the back screen
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View className="bg-white flex-1">
          <TouchableOpacity onPress={handleBack}>
            <Entypo
              name="chevron-left"
              size={30}
              color="#090909"
              marginTop={15}
            />
          </TouchableOpacity>
          <View className="justify-center items-center p-1">
            <Text className="font-InterBold text-3xl">Enter New Account</Text>
          </View>
          {!showNameContainer && (
            <>
              <View className="m-3 ">
                <Text className="text-sm  mb-2 font-InterMedium text-text-gray">
                  From Account
                </Text>
                <SelectList
                  data={data}
                  setSelected={(val) => setSelected(val)}
                  save="value"
                  placeholder="0010298700567"
                />
              </View>
              <View className="m-3 ">
                <Text className="text-sm  mb-2 font-InterMedium text-text-gray">
                  Select Bank
                </Text>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={data1}
                  save="value"
                  placeholder="Select Your Bank"
                />
              </View>
            </>
          )}
          <View className="m-3">
            <Text className="text-sm mb-2 font-InterMedium text-text-gray ">
              Account Number
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder={"Enter Account Number/IBAN"}
                  value={value}
                  onChange={onChange}
                />
              )}
              name="NewAccount"
            />
            {errors.firstName && (
              <Text className="text-red-500">This is required.</Text>
            )}
          </View>
          {/* <View className="m-3">
                <Text className="text-sm mb-2 font-InterMedium text-text-gray ">Amount</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder={"Enter Amount"}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                    name="Amount"
                />
                {errors.firstName && (
                    <Text className="text-red-500">This is required.</Text>
                )}
                <Text className=" mt-1 text-sm font-InterMedium">Total Transaction Limit PKR 250,000.</Text>
            </View> */}
          {!showNameContainer && (
            <>
              <View className="p-5 mt-2">
                <CustomButton
                  Text={"Fetch Title"}
                  onPress={handleFetchTitleClick}
                  disabled={fetchTitleDisabled}
                  style={{
                    backgroundColor: fetchTitleDisabled
                      ? "gray"
                      : Color.PrimaryWebOrient,
                  }}
                />
              </View>
            </>
          )}
          {showNameContainer && (
            <View className="m-4">
              <Text className="text-sm mb-2 font-InterMedium text-text-gray">
                Account Title
              </Text>
              <View className="bg-[#F4F5F9] text-[15px] h-14 p-2 rounded-md outline-1">
                <View>
                  <Text className="text-lg mt-2 font-InterMedium text-gray-400">
                    {name}
                  </Text>
                </View>
              </View>
              <View className="mt-5">
                <Text className="text-sm  mb-2 font-InterMedium text-text-gray">
                  Name
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder={"Alias"}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                  name="Alias"
                />
              </View>
              <View className="p-5 mt-2">
                <CustomButton Text={"Submit"} onPress={handleSubmit} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      {showConfirmation && (
        <View
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-25"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View className="bg-white p-5 rounded-lg">
            <Text className="text-lg mb-4">
              You are about to create Zanbeel payee of the acount title Abdul
              Rehman having account number 02563256952 and alias A Rehman. Do
              you want to continue?
            </Text>
            <View className="flex flex-row justify-center space-x-28">
              <Pressable
                className="px-4 py-2 rounded-md text-white"
                onPress={() => {
                  setShowConfirmation(false);
                }}
              >
                <Text
                  className="font-InterMedium text-lg"
                  style={{
                    color: Color.PrimaryWebOrient,
                  }}
                >
                  NO
                </Text>
              </Pressable>
              <Pressable
                className="px-4 py-2 rounded-md text-white"
                onPress={() => setShowConfirmation(false)}
              >
                <Text
                  className="font-InterMedium text-lg"
                  style={{
                    color: Color.PrimaryWebOrient,
                  }}
                  onPress={() => navigation.navigate("OTPverification")}
                >
                  YES
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NewAccountAdd;