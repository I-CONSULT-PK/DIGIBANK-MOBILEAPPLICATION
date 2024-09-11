import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../GlobalStyles";
import { createStackNavigator } from "@react-navigation/stack";
import Send from "../../assets/Images/Send.svg";
import Receive from "../../assets/Images/Receive.svg";
import History from "../../assets/Images/History.svg";
import MobileTopup from "../../assets/Images/MobileTopup.svg";
import DownloadContainer from "../../assets/Images/DownloadContainer.svg";
import Bell from "../../assets/Images/Bell.svg";
import Filter from "../../assets/Images/Filter.svg";
import { Divider } from "@rneui/themed";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import QrScan from "../../assets/Images/QrScan.svg";
import { Entypo } from "@expo/vector-icons";
import AddMore from "../../assets/Images/AddMore.svg";
// import BeneficiaryOption from "./Select Beneficiary/BeneficiaryOption";
import Statment from "../../assets/Images/Statment.svg";
import Statement from "../E-Wallet/Wallet Statement/Statement";
import Download from "../../assets/Images/Download.svg";
import DownloadFile from "../E-Wallet/Wallet Statement/DownloadFile";
import Footer from "../../components/Footer";
const Stack = createStackNavigator();

const PersonalWallet = () => {
  const navigation = useNavigation();
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [isStatementVisible, setIsStatementVisible] = useState(false);

  const handleQrCodePress = () => {
    setShowQrCode(!showQrCode);
  };
  const openOptionsMenu = () => {
    setIsOptionsMenuVisible(true);
  };

  const closeOptionsMenu = () => {
    setIsOptionsMenuVisible(false);
  };

  const handleAddMoreClick = () => {
    navigation.navigate("Domestic", { title: "My Payees" });
  };
  useEffect(() => {
    const handleBackPress = () => {
      // Manually navigate to the back screen
      navigation.navigate("EntitySelection");
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const [userData, setUserData] = useState("");
  // const fetchData = async () => {
  //   try {
  //     // Make a GET request to the API endpoint
  //     const response = await fetch("http://192.168.0.196:9096/v1/customer/getCustomer/16");

  //     // Check if the request was successful (status code 200)
  //     if (response.ok) {
  //       // Parse the response JSON
  //       const data = await response.json();

  //       // Update the state with the fetched data
  //       setUserData(data);
  //     } else {
  //       console.error(`Error: ${response.status} - ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // // useEffect to fetch data when the component mounts
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <TouchableWithoutFeedback onPress={() => setIsOptionsMenuVisible(false)}>
      <View
        style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
      >
        {/* {userData && userData.data && ( */}
        <LinearGradient
          className="h-32 relative"
          colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
        >
          <View className="flex-row items-center absolute mt-14">
            <Image
              className="w-14 h-14 ml-3 rounded-xl"
              source={require("../../assets/Images/ProfileIcon.png")}
            />
            <View className="ml-4">
              {/* <Text className="text-mid"> {userData.data.firstName} {userData.data.lastName}</Text> */}
              <Text className="text-mid text-white">Nadeem Ahmed</Text>
              <Text className="text-mid mt-2 text-white">
                Good evening Dear user
              </Text>
            </View>
          </View>
          <View className="flex-row absolute top-16 right-1 p-2">
            <Bell className="mb-1" />
            <View className="ml-3 ">
              <Filter onPress={() => navigation.navigate("")} />
            </View>
          </View>
        </LinearGradient>

        <View className="flex flex-row items-center mb-1">
          <Text
            className="w-30 left-4 h-6"
            style={{
              color: Color.PrimaryWebOrient,
            }}
          >
            Personal Balance
          </Text>

          <Text className="ml-8 h-10 w-15 mt-3.5">Savings</Text>
        </View>

        <View className="fixed left-4 bottom-1  flex flex-row items-center">
          <Text className="font-bold text-4xl mr-3">$76,862.34</Text>
          <Text className="text-green-500 text-xs mt-3 mr-1">2.5% ^</Text>
        </View>

        <View className="flex-row space-x-3  justify-between  mx-7">
          <TouchableOpacity onPress={() => navigation.navigate("SendMoney")}>
            <View
              className="h-20 w-24  bg-opacity-25 rounded-lg mb-4"
              style={{
                backgroundColor: "rgba(31, 128, 242, 0.27)",
              }}
            >
              <Send style={{ marginTop: hp("1.5%"), marginLeft: wp("7.%") }} />
              <Text
                className="mt-1 ml-8"
                style={{
                  color: "#185194",
                }}
              >
                Send
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Receive")}>
            <View
              className="h-20 w-24  bg-opacity-25 rounded-lg mb-4"
              style={{
                backgroundColor: "rgba(48, 191, 253, 0.31)",
              }}
            >
              <Receive
                style={{ marginTop: hp("1.5%"), marginLeft: wp("7%") }}
              />
              <Text
                className="mt-1 ml-6"
                style={{
                  color: "#26A3D9",
                }}
              >
                Receive
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("History")}>
            <View
              className="h-20 w-24  bg-opacity-25 rounded-lg mb-4"
              style={{
                backgroundColor: "rgba(14, 233, 115, 0.26)",
              }}
            >
              <History
                style={{ marginTop: hp("1.5%"), marginLeft: wp("7%") }}
              />
              <Text
                className="mt-1 ml-6"
                style={{
                  color: "#32B06C",
                }}
              >
                History
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("BillPaymentListing")}
        >
          <View
            className="flex-row space-x-2 rounded-xl justify-between mx-7 relative"
            style={{
              backgroundColor: Color.PrimaryWebOrient,
            }}
          >
            <View className="w-36 h-12 rounded-xl overflow-hidden">
              <View className="flex-row items-center">
                <View className="justify-center items-center">
                  <MobileTopup left={10} top={7} />
                </View>
                <Text className="ml-4 mt-3 text-white font-semibold">
                  Bills & Topup
                </Text>
              </View>
            </View>
            <View
              className="absolute w-12 h-12 bg-white rounded-full border-2 flex justify-center items-center right-0 -mr-3"
              style={{
                borderColor: Color.PrimaryWebOrient,
              }}
            >
              <View className="w-7 h-10 rounded-full flex justify-center items-center">
                <Entypo
                  name="chevron-right"
                  size={24}
                  style={{
                    color: Color.PrimaryWebOrient,
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <Text className="mt-4 ml-5 text-xl">My Payees</Text>
        <View>
          <View className="flex-row justify-between mx-4">
            <Image
              style={styles.gridItem}
              source={require("../../assets/group-342.png")}
            />

            <TouchableOpacity onPress={handleAddMoreClick}>
              <View className="rounded-full justify-center items-center mt-6">
                <AddMore on />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* {isOptionsMenuVisible && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 2,
            }}
          >
            <View style={{ flex: 1, pointerEvents: "none" }}></View>
            <BeneficiaryOption />
            <Domestic />
          </View>
        )} */}

        <Text
          className="mt-7 ml-4 text-xl text-left"
          style={{
            color: Color.labelColorLightPrimary,
          }}
        >
          Transaction
        </Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          stickyHeaderIndices={[]}
        >
          <View>
            <View className="flex-row justify-between items-center ">
              <Text className="font-bold text-xl  ml-2 ">$5,934</Text>

              <View className="flex-row">
                <TouchableOpacity onPress={() => setIsStatementVisible(true)}>
                  <Statement />
                </TouchableOpacity>
                <Download />
              </View>
            </View>
            <View className="flex-row mb-2 ">
              <Text
                className="text-3xs  left-2 "
                style={{
                  color: Color.colorDarkgray_200,
                }}
              >
                Send by
              </Text>
              <Text
                style={{
                  color: Color.colorSkyblue_100,
                }}
                className="text-3xs left-3 "
              >
                Stripe
              </Text>
            </View>

            <Divider />
          </View>
          <View className="flex-row justify-between items-center  mt-3">
            <Text className="font-bold text-xl  ml-2 ">$3,650</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => setIsStatementVisible(true)}>
                <Statement />
              </TouchableOpacity>
              <Download />
            </View>
          </View>
          <View className="flex-row mb-2 ">
            <Text
              className="text-3xs  left-2 "
              style={{
                color: Color.colorDarkgray_200,
              }}
            >
              Send by
            </Text>
            <Text style={{ color: "#0B75C1" }} className="text-3xs left-3 ">
              Apply Pay
            </Text>
          </View>
          <Divider />

          <View className="flex-row justify-between items-center  mt-3">
            <Text className="font-bold text-xl  ml-2 ">$1,300</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => setIsStatementVisible(true)}>
                <Statement />
              </TouchableOpacity>
              <Download />
            </View>
          </View>
          <View className="flex-row mb-2 ">
            <Text
              className="text-3xs  left-2 "
              style={{
                color: Color.colorDarkgray_200,
              }}
            >
              Send by
            </Text>
            <Text
              style={{
                color: "#F79E1B",
              }}
              className="text-3xs left-3 "
            >
              Jazz Cash
            </Text>
          </View>
          <Divider />
          <View className="flex-row justify-between items-center  mt-3">
            <Text className="font-bold text-xl  ml-2 ">$5,934</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => setIsStatementVisible(true)}>
                <Statement />
              </TouchableOpacity>
              <Download />
            </View>
          </View>
          <View className="flex-row mb-2 ">
            <Text
              className="text-3xs  left-2 "
              style={{
                color: Color.colorDarkgray_200,
              }}
            >
              Send by
            </Text>
            <Text
              style={{
                color: "#76089D",
              }}
              className="text-3xs left-3 "
            >
              Meezan Bank
            </Text>
          </View>
          <Divider />
          <View className="flex-row justify-between items-center  mt-3">
            <Text className="font-bold text-xl  ml-2 ">$3,853</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => setIsStatementVisible(true)}>
                <Statement />
              </TouchableOpacity>
              <Download />
            </View>
          </View>
          <View className="flex-row mb-2 ">
            <Text
              className="text-3xs  left-2 "
              style={{
                color: Color.colorDarkgray_200,
              }}
            >
              Send by
            </Text>
            <Text
              style={{
                color: "#F79E1B",
              }}
              className="text-3xs left-3 "
            >
              Jazz Cash
            </Text>
          </View>
          <Divider />
          <View className="flex-row justify-between items-center  mt-3">
            <Text className="font-bold text-xl  ml-2 ">$9,860</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => setIsStatementVisible(true)}>
                <Statement />
              </TouchableOpacity>
              <Download />
            </View>
          </View>
          <View className="flex-row mb-2 ">
            <Text
              className="text-3xs  left-2 "
              style={{
                color: Color.colorDarkgray_200,
              }}
            >
              Send by
            </Text>
            <Text
              style={{
                color: Color.colorSkyblue_100,
              }}
              className="text-3xs left-3 "
            >
              Stripe
            </Text>
          </View>
          <Divider />
          <View className="flex-row justify-between items-center  mt-3">
            <Text className="font-bold text-xl  ml-2 ">$1,600</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => setIsStatementVisible(true)}>
                <Statement />
              </TouchableOpacity>
              <Download />
            </View>
          </View>
          <View className="flex-row mb-2 ">
            <Text
              className="text-3xs  left-2 "
              style={{
                color: Color.colorDarkgray_200,
              }}
            >
              Send by
            </Text>
            <Text
              style={{
                color: "#76089D",
              }}
              className="text-3xs left-3 "
            >
              Meezan Bank
            </Text>
          </View>
        </ScrollView>
        {/*  FixedFooter  */}
        <Footer />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: wp("4%"),
  },

  gridItem: {
    top: hp("2%"),
    height: hp("8%"),
    width: wp("65%"),
    right: wp("2%"),
  },
  transactionTitle: {},
  transactionItem: {},
  transactionAmount: {},
});

export default PersonalWallet;
