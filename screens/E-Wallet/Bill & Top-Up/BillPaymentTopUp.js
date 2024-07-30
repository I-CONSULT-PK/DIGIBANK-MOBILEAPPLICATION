import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  Keyboard,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Feather } from "@expo/vector-icons";
import SelectTopUp from "../Bill & Top-Up/SelectTopUp";
import All from "../Bill & Top-Up/All";
import Utility from "../Bill & Top-Up/Utility";
import MobileBundles from "../Bill & Top-Up/MobileBundles";
import Govt from "../Bill & Top-Up/Govt";
import { Color } from "../../../GlobalStyles";

const BillPaymentTopUp = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}) => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("All");
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
  const renderOptionsContent = () => {
    switch (selectedOption) {
      case "All":
        return <All />;
      case "Utility":
        return <Utility />;
      case "Mobile Topup":
        return <SelectTopUp />;
      case "Mobile Bundle":
        return <MobileBundles />;
      case "Govt":
        return <Govt />;
      default:
        return null;
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity onPress={handleBack}>
        <Entypo
          name="chevron-left"
          size={30}
          style={{
            color: Color.PrimaryWebOrient,
            marginTop: 40,
          }}
        />
      </TouchableOpacity>
      <View
        style={{ justifyContent: "center", alignItems: "center", padding: 3 }}
      >
        <Text style={{ fontFamily: "InterBold", fontSize: 20, margin: 4 }}>
          Bills Payment
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={
            clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
          }
        >
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
          />
          <Feather
            name="search"
            size={20}
            style={{ color: Color.PrimaryWebOrient }}
          />
        </View>
        {clicked && (
          <View>
            <Button
              title="Cancel"
              onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
              }}
            />
          </View>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row", padding: 4 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 4,
          }}
        >
          {["All", "Utility", "Mobile Topup", "Mobile Bundle", "Govt"].map(
            (option) => (
              <TouchableOpacity
                key={option}
                onPress={() => handleOptionClick(option)}
              >
                <Text
                  style={{
                    color:
                      selectedOption === option
                        ? Color.PrimaryWebOrient
                        : "black",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginRight: 10,
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </ScrollView>
      <ScrollView>{renderOptionsContent()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#F4F5F9",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});

export default BillPaymentTopUp;
