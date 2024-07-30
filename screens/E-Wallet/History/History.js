import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { List, Divider } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Color } from "../../../GlobalStyles";
const History = () => {
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [endDateVisible, setEndDateVisible] = useState(false);
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const handlePress = () => setExpanded(!expanded);
  const handlePress1 = () => setExpanded1(!expanded1);

  const showStartDatePicker = () => setStartDateVisible(true);
  const hideStartDatePicker = () => setStartDateVisible(false);
  const handleStartDateConfirm = (date) => {
    setSelectedStartDate(date.toISOString());
    hideStartDatePicker();
  };
  const showEndDatePicker = () => setEndDateVisible(true);
  const hideEndDatePicker = () => setEndDateVisible(false);
  const handleEndDateConfirm = (date) => {
    setSelectedEndDate(date.toISOString());
    hideEndDatePicker();
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
    <ScrollView className="bg-white">
      <View className="bg-white flex-1">
        <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
          <Entypo
            name="chevron-left"
            size={30}
            color="#090909"
            marginTop={30}
          />
        </TouchableOpacity>
        <View className="justify-center items-center p-3">
          <Text className="font-InterBold text-3xl">History</Text>
        </View>
        <View  className="h-11 ml-5 mr-5 " style={{ flexDirection: "row", justifyContent: "space-between" , backgroundColor:Color.PrimaryWebOrientLayer2 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 7,
                color: "white",
                marginLeft:6,
              }}
            >
              Start Date
            </Text>
            <TouchableOpacity onPress={showStartDatePicker}>
              <Icon marginLeft={5} name="calendar" color="white" size={20} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 7,
                marginLeft: 5,
              }}
            >
              {selectedStartDate
                ? new Date(selectedStartDate).toDateString()
                : "Select Date"}
            </Text>
            <DateTimePickerModal
              isVisible={startDateVisible}
              mode="date"
              onConfirm={handleStartDateConfirm}
              onCancel={hideStartDatePicker}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 7,
                color: "white",
                marginRight:4,
              }}
            >
              End Date
            </Text>
            <TouchableOpacity onPress={showEndDatePicker}>
              <Icon marginRight={5} name="calendar" color="white" size={20} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 7,
                marginRight: 11,
              }}
            >
              {selectedEndDate
                ? new Date(selectedEndDate).toDateString()
                : "Select Date"}
            </Text>
            <DateTimePickerModal
              isVisible={endDateVisible}
              mode="date"
              onConfirm={handleEndDateConfirm}
              onCancel={hideEndDatePicker}
            />
          </View>
        </View>
        <View className=" bg-background h-28  w-200 rounded-2xl m-5 flex-1 justify-center ">
          <View className="flex-row justify-between ">
            <Text className="font-InterRegular text-base text-text-gray m-2 ml-3">
              Current Balance
            </Text>
          </View>
          <View className="flex-[1] justify-center items-center">
            <View className="flex-row items-baseline ">
              <Text className="text-base"style={{ color:Color.PrimaryWebOrientTxtColor}}>RS.</Text>
              <View className="flex-row items-baseline">
                <Text className="font-InterMedium text-5xl "style={{ color:Color.PrimaryWebOrientTxtColor}}>
                  25,000
                </Text>
                <Text className="text-base "style={{ color:Color.PrimaryWebOrientTxtColor}}>.00</Text>
              </View>
            </View>
          </View>
        </View>
        <List.Section className="bg-background ml-5 mr-5">
          <List.Accordion
            className=" font-InterRegular  m-0 text-base bg-background "
            title="Thu, 05-10-23"
            left={(props) => <List.Icon {...props} />}
            expanded={expanded}
            onPress={handlePress}
          >
            <View className="p-1">
              <Text className="text-left rtl:text-right font-medium ">
                ATM Cash Withdrawl-Surjani-Town-Karchi STAN (892008)
              </Text>
            </View>

            <View className="flex-[1] justify-end items-end mr-2">
              <View className="flex-row items-baseline  m-5 ">
                <Text className="text-base text-green-500">RS.</Text>
                <View className="flex-row items-baseline">
                  <Text className="font-InterMedium text-4xl text-green-500">
                    5,000
                  </Text>
                  <Text className="text-base text-green-500">.00</Text>
                </View>
              </View>
            </View>
            <Divider />
            <View className="p-1">
              <Text className=" rtl:text-right font-medium mt-2">
                Money Recived from HAMZA KHAN-XXXX0852 STAN(657274)
              </Text>
            </View>

            <View className="flex-[1] justify-end items-end mr-2">
              <View className="flex-row items-baseline  m-5 ">
                <Text className="text-base text-red-700">RS.</Text>
                <View className="flex-row items-baseline">
                  <Text className="font-InterMedium text-4xl text-red-700">
                    25,000
                  </Text>
                  <Text className="text-base text-red-700">.00</Text>
                </View>
              </View>
            </View>
          </List.Accordion>
        </List.Section>
        <List.Section className="bg-background ml-5 mr-5">
          <List.Accordion
            className=" font-InterRegular  text-base bg-background "
            title="Fri, 06-10-23"
            left={(props) => <List.Icon {...props} />}
            expanded={expanded1}
            onPress={handlePress1}
          >
            <View className="p-1">
              <Text className="text-left rtl:text-right font-medium">
                Money Recived from M.Ali-XXXX0852 STAN (657274)
              </Text>
            </View>

            <View className="flex-[1] justify-end items-end mr-2">
              <View className="flex-row items-baseline  m-5 ">
                <Text className="text-base text-red-700">RS.</Text>
                <View className="flex-row items-baseline">
                  <Text className="font-InterMedium text-4xl text-red-700">
                    9,750
                  </Text>
                  <Text className="text-base text-red-700">.00</Text>
                </View>
              </View>
            </View>
          </List.Accordion>
        </List.Section>
      </View>
    </ScrollView>
  );
};
export default History;
