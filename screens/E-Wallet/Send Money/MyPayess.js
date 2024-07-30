import React, { useEffect, useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import Input from "../../../components/TextInput";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "../../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MyPayess = () => {
  const navigation = useNavigation();
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
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "0010298700567" }];

  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <TouchableOpacity onPress={handleBack}>
            <Entypo
              name="chevron-left"
              size={wp("7%")}
              color="#090909"
              marginTop={hp("1%")}
            />
          </TouchableOpacity>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Payee Payment</Text>
          </View>
          <View className="m-3" style={styles.avatarContainer}>
            <View style={styles.avatarContent}>
              <Avatar.Image
                source={require("../../../assets/Images/Boy.jpg")}
                style={styles.avatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>Jackie Robinson</Text>
                <Text style={styles.accountText}>Account: 00111008510994</Text>
                <Text style={styles.bankText}>Bank: Zanbeel</Text>
              </View>
            </View>
          </View>
          <View className="m-3" style={styles.inputContainer}>
            <Text style={styles.labelText}>From Account</Text>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              placeholder="Select Your Account"
            />
          </View>
          <View className="m-3" style={styles.inputContainer}>
            <Text style={styles.labelText}>Amount</Text>
            <Controller
              control={control}
              rules={{ required: true }}
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
              <Text style={styles.errorText}>This is required.</Text>
            )}
            <Text className="m-1" style={styles.limitText}>
              Total Transaction Limit PKR 250,000.
            </Text>
          </View>
          <View className="m-3" style={styles.buttonContainer}>
            <CustomButton
              Text={"Send"}
              onPress={() => navigation.navigate("Transfer")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontFamily: "InterBold",
    fontSize: wp("5%"),
  },
  avatarContainer: {
    marginVertical: hp("1%"),
    padding: wp("1%"),
    backgroundColor: "#F4F5F9",
    borderRadius: wp("2%"),
  },
  avatarContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: wp("1%"),
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontFamily: "InterBold",
    fontSize: wp("4%"),
    marginBottom: hp("0.5%"),
  },
  accountText: {
    fontFamily: "InterMedium",
    fontSize: wp("3.5%"),
    color: "gray",
  },
  bankText: {
    fontFamily: "InterMedium",
    fontSize: wp("3.5%"),
    color: "gray",
  },
  inputContainer: {
    marginBottom: hp("2%"),
  },
  labelText: {
    fontSize: wp("4%"),
    fontFamily: "InterMedium",
    marginBottom: hp("0.5%"),
  },
  errorText: {
    color: "red",
    fontSize: wp("3%"),
  },
  limitText: {
    fontSize: wp("3%"),
    fontFamily: "InterMedium",
    marginTop: hp("0.5%"),
  },
  buttonContainer: {
    marginTop: hp("2%"),
  },
});

export default MyPayess;
