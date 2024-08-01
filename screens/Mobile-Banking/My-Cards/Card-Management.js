import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, Image, TextInput } from "react-native";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Avatar, List, Divider } from "react-native-paper";
import ListSectionCard from "../../../assets/ListSectionCard.svg";
import { Color } from "../../../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ButtonGroup } from "react-native-elements";
const CardManagement = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const handlePress2 = () => setExpanded2(!expanded2);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ["Debit Card", "Credit Card"];

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handlePress1 = () => setExpanded1(!expanded1);
  return (
    <SafeAreaView className=" bg-[#f9fafc]" style={{ flex: 1 }}>
      <ScrollView>
        <View className=" flex-1">
          <TouchableOpacity onPress={() => navigation.navigate("")}>
            <Entypo
              name="chevron-left"
              size={wp("8%")}
              color="#090909"
              marginTop={hp("2%")}
            />
          </TouchableOpacity>
          <View className="justify-center items-center">
            <Text className="font-InterBold text-2xl ">Cards</Text>
          </View>
          <View className="mt-2">
            <ButtonGroup
              onPress={(index) => setSelectedIndex(index)}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={(className = "mb-4")}
              buttonStyle={(className = "p-2")}
              selectedButtonStyle={styles.selectedButton}
              textStyle={(className = "text-lg")}
              innerBorderStyle={{ width: 0 }}
            />
            <List.Section className="bg-white rounded-xl ml-5 mr-5">
              <List.Accordion
                className="font-InterRegular m-0 text-base bg-white"
                title={
                  <View className="flex flex-row items-center">
                    <Image
                      source={require("../../../assets/visa.png")}
                      className="w-110 h-10 mr-1"
                    />
                    <View className="flex flex-col ml-4">
                      <Text className="text-lg font-semibold text-gray-800">
                        Credit Card
                      </Text>
                      <Text className="text-xs font-medium text-neutral-500">
                        5669996****7989
                      </Text>
                    </View>
                  </View>
                }
                left={(props) => <List.Icon {...props} />}
                expanded={expanded}
                onPress={handlePress}
              >
                {/* The content inside the Accordion */}
                <View className="justify-center items-center mr-8">
                  <ListSectionCard width={400} />
                </View>
                <View className=" p-4 mr-2">
                  <View className="flex-row items-center justify-between ">
                    <Switch
                      trackColor={{ false: "#767577", true: "#1DBBD8" }}
                      thumbColor={isEnabled ? "#1DBBD8" : "#f4f3f4"}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                    <Text className="text-sm font-medium ">
                      Deactivate Your Card
                    </Text>
                  </View>
                  <Divider />
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-xs text-gray-500">Card Holder</Text>
                    <Text className="text-sm font-medium  ">Mirza Uraib</Text>
                  </View>
                  <Divider />
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-xs text-gray-500">Expire</Text>
                    <Text className="text-sm font-medium  ">12/31</Text>
                  </View>
                  <Divider />
                  <View className=" mb-2 flex-row items-center justify-between">
                    <Text className="text-xs text-gray-500">Card Number</Text>
                    <Text className="text-sm font-medium ">
                      0123 4567 8910 1112
                    </Text>
                  </View>
                </View>
              </List.Accordion>
            </List.Section>
          </View>
          <View>
            <List.Section className="bg-white rounded-xl ml-5 mr-5">
              <List.Accordion
                className="font-InterRegular m-0 text-base bg-white"
                title={
                  <View className="flex flex-row items-center">
                    <Image
                      source={require("../../../assets/visa.png")}
                      className="w-110 h-10 mr-1"
                    />
                    <View className="flex flex-col ml-4">
                      <Text className="text-lg font-semibold text-gray-800">
                        Credit Card
                      </Text>
                      <Text className="text-xs font-medium text-neutral-500">
                        5669996****7989
                      </Text>
                    </View>
                  </View>
                }
                left={(props) => <List.Icon {...props} />}
                expanded={expanded2}
                onPress={handlePress2}
              >
                {/* The content inside the Accordion */}
                <View className="justify-center items-center mr-8">
                  <ListSectionCard width={400} />
                </View>
                <View className=" p-4 mr-2">
                  <View className="flex-row items-center justify-between ">
                    <Switch
                      trackColor={{ false: "#767577", true: "#1DBBD8" }}
                      thumbColor={isEnabled ? "#1DBBD8" : "#f4f3f4"}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                    <Text className="text-sm font-medium ">
                      Deactivate Your Card
                    </Text>
                  </View>
                  <Divider />
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-xs text-gray-500">Card Holder</Text>
                    <Text className="text-sm font-medium  ">Mirza Uraib</Text>
                  </View>
                  <Divider />
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-xs text-gray-500">Expire</Text>
                    <Text className="text-sm font-medium  ">12/31</Text>
                  </View>
                  <Divider />
                  <View className=" mb-2 mt-2 flex-row items-center justify-between">
                    <Text className="text-xs text-gray-500">Card Number</Text>
                    <Text className="text-sm font-medium ">
                      0123 4567 8910 1112
                    </Text>
                  </View>
                </View>
              </List.Accordion>
            </List.Section>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  selectedButton: {
    backgroundColor: "#1DBBD8",
  },
});

export default CardManagement;
