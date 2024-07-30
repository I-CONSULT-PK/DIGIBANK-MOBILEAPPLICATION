import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,BackHandler
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Ptcl from "../../../assets/Images/Ptcl.svg";
import { Divider } from "@rneui/themed";
import Telenor from "../../../assets/Images/Telenor.svg";
import Zong from "../../../assets/Images/Zong.svg";
import Jazz from "../../../assets/Images/Jazz.svg";
import SuiGas from "../../../assets/Images/SuiGas.svg";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Color } from "../../../GlobalStyles";
const BillPaymentListing = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}) => {
  const navigation = useNavigation();
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
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
    <TouchableWithoutFeedback onPress={() => setIsOptionsMenuVisible(false)}>
      <View className="bg-white flex-1">
        <TouchableOpacity onPress={handleBack}>
          <Entypo
            name="chevron-left"
            size={30}
            style={{
              color: Color.PrimaryWebOrient,
            }}
            marginTop={40}
          />
        </TouchableOpacity>
        <View className="justify-center items-center p-3">
          <Text className="font-InterBold text-2xl">Bills Payment</Text>
        </View>
        <View style={styles.Search}>
          <View
            className="justify-center items-center p-3 mt-8"
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
              color="#0F98B0"
              style={{ color: Color.PrimaryWebOrient }}
              left={2}
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
              ></Button>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("BillPaymentTopUp")}
        >
          <View className="flex-row h-12 w-190 m-3 bg-background rounded items-center mt-6">
            <Ionicons
              name="add-circle"
              style={{ color: Color.PrimaryWebOrient }}
              size={30}
              left={2}
            />

            <Text className="font-InterBold text-base px-5">
              Add Bills & Mobile Number
            </Text>
          </View>
        </TouchableOpacity>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollViewContent}
          stickyHeaderIndices={[3]}
        >
          {/* PTCL HOME Content */}
          <View className="w-200 h-16 m-3 bg-background rounded">
            <View className="flex-row justify-between ml-2 mt-2 items-center">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Ptcl style={{ top: 6 }} />
                <View>
                  <Text className="font-InterBold text-base px-4 mt-1">
                    PTCL Home
                  </Text>
                  <Text  className="px-4 text-slate-400">PTCL Landline</Text>
                </View>
              </View>
              <View className="flex-row">
                <Ionicons
                  name="star"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={19}
                />
                <Ionicons
                  name="trash"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={13}
                />
                <Ionicons
                  name="pencil"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={5}
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }} />
            <Divider style={{ width: "100%", flex: 2 }} />
          </View>
          {/* My Telenor Content */}
          <View className="w-200 h-16 m-3 bg-background rounded mt-3">
            <View className="flex-row justify-between ml-2 mt-2 items-center">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Telenor style={{ top: 3, left: 9 }} />
                <View>
                  <Text className="font-InterBold text-base px-5 mt-1">
                    My Telenor
                  </Text>
                  <Text  className="px-4 text-slate-400">Telenor Prepaid</Text>
                </View>
              </View>
              <View className="flex-row">
                <Ionicons
                  name="star"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={19}
                />
                <Ionicons
                  name="trash"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={13}
                />
                <Ionicons
                  name="pencil"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={5}
                />
              </View>
              
            </View>
            <View style={{ marginVertical: 10 }} />
            <Divider style={{ width: "100%", flex: 2 }} />
            <Divider style={{ width: "100%", flex: 2 }} />
          </View>
          {/* Zong Content */}
          <View className="w-200 h-16 m-3 bg-background rounded mt-3">
            <View className="flex-row justify-between ml-2 mt-2 items-center">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Zong style={{ top: 3 }} />
                <View>
                  <Text className="font-InterBold text-base px-5 mt-1">
                    A Rehman Zong
                  </Text>
                  <Text  className="px-4 text-slate-400">Zong Prepaid</Text>
                </View>
              </View>
              <View className="flex-row">
                <Ionicons
                  name="star"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={19}
                />
                <Ionicons
                  name="trash"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={13}
                />
                <Ionicons
                  name="pencil"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={5}
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }} />
            <Divider style={{ width: "100%", flex: 2 }} />
          </View>
          {/* Jazz Content */}
          <View className="w-200 h-16 m-3 bg-background rounded mt-3">
            <View className="flex-row justify-between ml-2 mt-2 items-center">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Jazz style={{ top: 3 }} />
                <View>
                  <Text className="font-InterBold text-base px-5 mt-1">
                    M Faizan Jazz
                  </Text>
                  <Text  className="px-4 text-slate-400">Jazz Prepaid</Text>
                </View>
              </View>
              <View className="flex-row">
                <Ionicons
                  name="star"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={19}
                />
                <Ionicons
                  name="trash"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={13}
                />
                <Ionicons
                  name="pencil"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={5}
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }} />
            <Divider style={{ width: "100%", flex: 2 }} />
          </View>
          {/* Gas Bill  Content */}
          <View className="w-200 h-16 m-3 bg-background rounded mt-3">
            <View className="flex-row justify-between ml-2 mt-2 items-center">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <SuiGas style={{ top: 3 }} />
                <View>
                  <Text className="font-InterBold text-base px-5 mt-1">
                    Uraib SSGC
                  </Text>
                  <Text  className="px-4 text-slate-400">SSGC Bill</Text>
                </View>
              </View>
              <View className="flex-row">
                <Ionicons
                  name="star"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={19}
                />
                <Ionicons
                  name="trash"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={13}
                />
                <Ionicons
                  name="pencil"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={5}
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }} />
            <Divider style={{ width: "100%", flex: 2 }} />
          </View>
          {/* My Telenor Content */}
          <View className="w-200 h-16 m-3 bg-background rounded mt-3">
            <View className="flex-row justify-between ml-2 mt-2 items-center">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Telenor style={{ top: 3, left: 9 }} />
                <View>
                  <Text className="font-InterBold text-base px-5 mt-1">
                    Taha Telenor
                  </Text>
                  <Text  className="px-4 text-slate-400">Telenor Postpaid</Text>
                </View>
              </View>
              <View className="flex-row">
                <Ionicons
                  name="star"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={19}
                />
                <Ionicons
                  name="trash"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={13}
                />
                <Ionicons
                  name="pencil"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={5}
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }} />
            <Divider style={{ width: "100%", flex: 2 }} />
          </View>
          {/* Jazz Content */}
          <View className="w-200 h-16 m-3 bg-background rounded mt-3">
            <View className="flex-row justify-between ml-2 mt-2 items-center">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Jazz style={{ top: 3 }} />
                <View>
                  <Text className="font-InterBold text-base px-5 mt-1">
                    Khizar Jazz
                  </Text>
                  <Text  className="px-4 text-slate-400">Jazz Postpaid</Text>
                </View>
              </View>
              <View className="flex-row">
                <Ionicons
                  name="star"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={19}
                />
                <Ionicons
                  name="trash"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={13}
                />
                <Ionicons
                  name="pencil"
                  size={20}
                  style={{ color: Color.PrimaryWebOrient }}
                  right={5}
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }} />
            <Divider style={{ width: "100%", flex: 2 }} />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Search: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
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
  scrollViewContent: {
    padding: "1%",
  },
});

export default BillPaymentListing;
