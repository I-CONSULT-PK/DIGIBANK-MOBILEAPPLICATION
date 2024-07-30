import React, { useEffect, } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/TextInput";
import CustomButton from "../../../components/Button";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const TopUp = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {}, []);

  const onSubmit = (data) => {
    const amountValue = parseInt(data.amount, 10);
  
    if (amountValue >= 80 && amountValue <= 10000) {
      // If the amount is within the valid range, navigate to the "Wallet" screen
      console.log("Navigating to Wallet");
      navigation.navigate("Wallet");
    } else {
      // Handle error or show a message to the user
      console.error("Amount is not within the valid range.");
    }
  };
  
  const handleAddMoreClick = () => {
    openOptionsMenu();
  };
  useEffect(() => {
    const handleBackPress = () => {
      // Manually navigate to the home screen
      navigation.navigate("Wallet");
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);
  useEffect(() => {
    const handleBackPress = () => {
      // Manually navigate to the home screen
      navigation.navigate("Wallet");
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("BillPaymentTopUp")}>
        <Entypo
          name="chevron-left"
          size={30}
          color="black"
          marginTop={50}
          marginLeft={20}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bills & Top-Up</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text className="text-lg font-bold text-black text-center">
          Mirza Uraib
        </Text>

        <Text className="font-InterRegular text-base text-white m-3 text-center">
          Available Balance:
        </Text>
        <Text className="text-3xl font-bold text-black  text-center">
          $76,862.34
        </Text>
      </View>
      <View>
        <View className="justify-between space-x-3 m-5 mb-2">
          <Text className="text-sm font-semibold text-black mb-3">
            Enter Contact
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={"Mobile Number"}
                value={value}
                onChange={onChange}
              />
            )}
            name="selectContact"
          />
          <Entypo
            name="keyboard"
            color="#BABABA"
            size={27}
            bottom={40}
            left={260}
          />
        </View>
        <View className="justify-between space-x-3 m-5 mt-1">
          <Text className="text-sm font-semibold text-black">Amount</Text>
          <Ionicons
            name="information-circle"
            color="#BABABA"
            size={12}
            bottom={14}
            left={43}
          />
          <Controller
            control={control}
            rules={{
              required: true,
              validate: {
                lessThan80: (value) => parseInt(value, 10) >= 80,
                moreThan10000: (value) => parseInt(value, 10) <= 10000,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={"Enter Amount"}
                value={value}
                onChange={onChange}
                keyboardType="numeric"
                style={{
                  color: errors.selectContact
                    ? "red"
                    : value < 80 || value > 10000
                    ? "grey"
                    : "black",
                }}
              />
            )}
            name="amount"
          />
          {errors.amount && (
            <Text className="text-red-500">
              {errors.amount.type === "lessThan80" && "Minimum amount is 80."}
              {errors.amount.type === "moreThan10000" &&
                "Maximum amount is 10,000."}
            </Text>
          )}

          <View className="flex-row items-center justify-center mt-2">
            <Text className="text-slate-400 text-center font-medium">
              Minimum:
            </Text>
            <Text className="text-center font-medium">80</Text>
            <View className="flex-row items-center justify-center">
              <Text className="text-slate-400 text-center ml-16 font-medium">
                Maximum:
              </Text>
              <Text className="text-center font-medium">10,000</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="p-5 mt-2">
        <CustomButton Text={"Next"} onPress={() => navigation.navigate("Home")} 
        // {handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: screenWidth,
    height: screenHeight,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  headerText: {
    fontFamily: "InterBold",
    fontSize: 24,
  },
  infoContainer: {
    backgroundColor: "#1EBBD7",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default TopUp;
