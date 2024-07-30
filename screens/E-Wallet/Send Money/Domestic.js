import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput,BackHandler } from "react-native";
import { TouchableOpacity } from "react-native";
import { Entypo, Feather, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Color } from "../../../GlobalStyles";
import CustomButton from "../../../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Domestic = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedOption, setSelectedOption] = useState();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const [title, setTitle] = useState("Domestic");

  useEffect(() => {
    if (route.params) {
      setSelectedOption(route.params.selectedOption);
      setSelectedPaymentMethod(route.params.selectedPaymentMethod);
      setTitle(route.params.title || "Domestic");
    }
  }, [route.params]);
  const handleBack = () => {
    if (isFocused) {
      // navigation.navigate("Wallet");
      // this.props.navigation.goBack();
      navigation.goBack();
    }
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
        <View style={styles.container}>
          {isFocused && (
            <TouchableOpacity onPress={handleBack}>
              <Entypo
                name="chevron-left"
                size={30}
                color="#090909"
                marginTop={5}
              />
            </TouchableOpacity>
          )}
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>{title}</Text>
            <Text>{selectedPaymentMethod}</Text>
          </View>
          <View style={styles.searchContainer}>
            <TextInput style={styles.input} placeholder="Search" />
            <Feather
              name="search"
              size={20}
              color="black"
              style={{ marginLeft: 1 }}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: "row" }}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <CustomButton Text={"All"} style={{ height: 38 }} />
              </View>
              <View style={styles.button}>
                <CustomButton
                  Text={"Bank Payees"}
                  style={{
                    backgroundColor: "#F4F5F9",
                    height: 38,
                  }}
                  labelStyle={{
                    color: "black",
                    fontSize: 14,
                    letterSpacing: -0.1,
                  }}
                />
              </View>
              <View style={styles.button}>
                <CustomButton
                  Text={"Other Bank Payees"}
                  style={{
                    backgroundColor: "#F4F5F9",
                    height: 38,
                  }}
                  labelStyle={{
                    color: "black",
                    fontSize: 14,
                    letterSpacing: -0.1,
                  }}
                />
              </View>
              <View style={styles.button}>
                <CustomButton
                  Text={"Wallet Transfer"}
                  style={{
                    backgroundColor: "#F4F5F9",
                    height: 38,
                  }}
                  labelStyle={{
                    color: "black",
                    fontSize: 14,
                    letterSpacing: -0.1,
                  }}
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigation.navigate("MyPayess")}
          >
            <View style={styles.menuItem}>
              <Avatar.Image
                source={require("../../../assets/Images/Boy.jpg")}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.menuItemText}>Jackie Robinson</Text>
                <Text style={styles.subMenuItemText}>Inter Branch</Text>
              </View>
              <View
                className="absolute  right-2"
                style={{ flexDirection: "row" }}
              >
                <View
                  className=" rounded-full p-2 h-10 w-10 justify-center items-center"
                  style={{ backgroundColor: Color.PrimaryWebOrient }}
                >
                  <Entypo name="heart-outlined" size={25} color="#fff" />
                </View>
                <View
                  className=" rounded-full p-2 h-10 w-10 justify-center items-center ml-2"
                  style={{ backgroundColor: Color.PrimaryWebOrient }}
                >
                  <FontAwesome5 name="trash" size={20} color="#fff" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("NewAccountAdd")}>
        <View className="flex justify-end items-end m-4 ">
          <View
            className=" rounded-full p-2 h-16 w-16 justify-center items-center"
            style={{ backgroundColor: Color.PrimaryWebOrient }}
          >
            <AntDesign name="adduser" size={40} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: wp("4%"),
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontFamily: "InterBold",
    fontSize: wp("5%"),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F4F5F9",
    borderRadius: wp("2%"),
    padding: wp("2%"),
    marginTop: wp("4%"),
  },
  input: {
    flex: 1,
    fontSize: wp("4%"),
    marginLeft: wp("2%"),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: wp("2%"),
  },
  button: {
    flex: 1,
    marginHorizontal: wp("1%"),
  },
  addAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F4F5F9",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("2%"),
    paddingVertical: wp("1%"),
    marginTop: wp("4%"),
    height: hp("6%"),
  },
  addAccountText: {
    fontFamily: "InterBold",
    fontSize: wp("4%"),
    marginLeft: wp("2%"),
  },
  menuItemContainer: {
    marginTop: wp("4%"),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F5F9",
    borderRadius: wp("2%"),
    padding: wp("2%"),
  },
  avatar: {
    marginRight: wp("2%"),
  },
  menuItemText: {
    fontFamily: "InterBold",
    fontSize: wp("4%"),
  },
  subMenuItemText: {
    fontFamily: "InterMedium",
    fontSize: wp("3.5%"),
    color: "gray",
  },
  chevronIcon: {
    marginLeft: "auto",
  },
  selectedOptionTitle: {
    fontFamily: "InterMedium",
    fontSize: wp("4%"),
    color: "black",
    textAlign: "center",
    marginTop: wp("2%"),
  },
});

export default Domestic;
