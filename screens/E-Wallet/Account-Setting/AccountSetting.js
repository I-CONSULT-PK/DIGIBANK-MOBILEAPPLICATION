import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Divider } from "@rneui/themed";
import { Color } from "../../../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AccountSetting = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState("");

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <ScrollView>
        <View className="bg-white flex-1">
          <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
            <Entypo
              name="chevron-left"
              size={wp("8%")}
              color="#090909"
              marginTop={hp("2%")}
            />
          </TouchableOpacity>
          <View className="justify-center items-center">
            <Text className="font-InterBold text-3xl ">Account Setting</Text>
          </View>
          {userData && userData.data && (
            <View className="h-24 w-200 m-3  bg-background  rounded-2xl">
              <View className="m-3 flex-row">
                <Avatar.Image
                  source={require("../../../assets/Images/Boy.jpg")}
                  style={styles.stretch}
                />
                <View>
                  <Text className="font-InterBold text-2xl mt-3 ml-3 ">
                    {userData.data.firstName} {userData.data.lastName}
                  </Text>
                  <Text className="ml-3 text-base font-InterMedium text-text-gray ">
                    {userData.data.email}
                  </Text>
                </View>
              </View>
            </View>
          )}
          <View className=" flex-1 w-200  ml-3 mr-3 mt-6 ">
            <View className="m-3">
              <TouchableOpacity
                onPress={() => navigation.navigate("NameChange")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="text-outline"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrientLayer2 }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemText}>
                    Change Name
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("5.5%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => navigation.navigate("PasswordChange")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="lock-closed"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrientLayer2 }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemText}>
                    Change Password
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("5.5%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => navigation.navigate("EmailChange")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="mail"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrientLayer2 }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemText}>
                    Change Email
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("5.5%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => navigation.navigate("MobNoChange")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="phone-portrait"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrientLayer2 }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemText}>
                    Change Mobile No
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("5.5%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => navigation.navigate("Nic_DateChange")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="calendar"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrientLayer2 }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemText}>
                    CNIC Expiry Date
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("5.5%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => navigation.navigate("Language")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="language"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrientLayer2 }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemText}>
                    Change Language
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("5.5%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="exit"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrientLayer2 }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemText}>
                    Exit
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("5.5%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
              <Divider />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  stretch: {
    marginTop: 5,
    marginLeft: 10,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemText: {
    fontSize: wp("4.5%"),
    fontFamily: "InterBold",
    marginLeft: wp("2%"),
  },
});

export default AccountSetting;