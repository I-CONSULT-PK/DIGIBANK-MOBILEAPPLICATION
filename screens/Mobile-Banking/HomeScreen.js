// import { LinearGradient } from "expo-linear-gradient";
// import React, { useState, useEffect } from "react";
// import {
//   Dimensions,
//   FlatList,
//   ScrollView,
//   Text,
//   View,
//   StyleSheet,
//   BackHandler,
//   TouchableWithoutFeedback,
//   Alert,
// } from "react-native";
// import { Color } from "../../GlobalStyles";
// import { SafeAreaView } from "react-native-safe-area-context";
// import BellIcon from "../../assets/Images/BellIcon.svg";
// import { Avatar } from "react-native-paper";
// import BillPayments from "../../assets/Images/BillPayments.svg";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import UserAddIcon from "../../assets/Images/UserAddIcon.svg";
// import { useNavigation } from "@react-navigation/native";
// import { TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { Entypo, FontAwesome } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";
// import ChipIcon from "../../assets/Images/ChipIcon.svg";
// import MasterCardLogo from "../../assets/Images/MasterCardLogo.svg";
// import WifiPaymentIcon from "../../assets/Images/WifiPaymentIcon.svg";
// import Footer from "../../components/Footer";

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const w = Dimensions.get("screen").width;
//   const h = Dimensions.get("screen").height;
//   const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);
//   const [isStarDefaulted, setIsStarDefaulted] = useState(true);

//   const handleAddNewClick = () => {
//     navigation.navigate("NewAccountAdd");
//   };
//   useEffect(() => {
//     const handleBackPress = () => {
//       // Manually navigate to the back screen
//       navigation.goBack();
//       return true;
//     };

//     BackHandler.addEventListener("hardwareBackPress", handleBackPress);

//     return () => {
//       BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
//     };
//   }, []);
//   // const [headingText,setHeadingText] = useState('25,000');
//   // const changeHeadingText = () =>{
//   //   setHeadingText('----')
//   // }
//   const [showText, setShowText] = useState(true);

//   const toggleTextVisibility = () => {
//     setShowText(!showText);
//   };

//   const toggleStarVisibility = () => {
//     const message = isStarDefaulted
//       ? "Account set defaulted"
//       : "Account is not defaulted";
//     Toast.show({
//       type: "info",
//       text1: "Success",
//       text2: message,
//       position: "bottom",
//       visibilityTime: 1000,
//       autoHide: true,
//     });
//     setIsStarDefaulted(!isStarDefaulted);
//   };

//   const Item = ({ title }) => (
//     <View className="mr-3 bg-background w-20 h-36 space-y-2 justify-center items-center rounded-xl">
//       <UserAddIcon />
//       <Text className="font-InterMedium text-xs">{title}</Text>
//     </View>
//   );
//   const [userData, setUserData] = useState("");
//   const fetchData = async () => {
//     try {
//       // Make a GET request to the API endpoint
//       const response = await fetch(
//         "http://192.168.0.196:9096/v1/customer/getCustomer/16"
//       );

//       // Check if the request was successful (status code 200)
//       if (response.ok) {
//         // Parse the response JSON
//         const data = await response.json();

//         // Update the state with the fetched data
//         setUserData(data);
//       } else {
//         console.error(`Error: ${response.status} - ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   // useEffect to fetch data when the component mounts
//   useEffect(() => {
//     fetchData();
//   }, []);
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: Color.PrimaryWebOrient }}>
//       <TouchableWithoutFeedback onPress={() => setIsOptionsMenuVisible(false)}>
//         <View style={{ flex: 1 }}>
//           <ScrollView className="bg-white">
//             <LinearGradient
//               // Button Linear Gradient
//               colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
//               className="h-72"
//             >
//               <View className="flex-1 p-6 space-y-7">
//                 <View className="flex-row justify-between items-center">
//                   {userData && userData.data && (
//                     <View className="flex-row justify-center items-center space-x-3 ">
//                       <Avatar.Image
//                         source={require("../../assets/Images/ProfileImage.jpg")}
//                       />
//                       <Text
//                         className="text-white font-InterMedium text-base"
//                         onPress={() => navigation.navigate("Sidebar")}
//                       >
//                         {userData.data.firstName} {userData.data.lastName}
//                       </Text>
//                     </View>
//                   )}
//                   <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <View className="bg-white rounded-full p-2 h-11 w-11 justify-center items-center">
//                       <BellIcon
//                         icon="bell"
//                         color="#1EBBD7"
//                         onPress={() => console.log("Bell pressed")}
//                       />
//                     </View>
//                     {/* <View className="bg-white rounded-full p-2 h-11 w-11 justify-center items-center ml-2">
//                       <IconButton
//                         icon="cog"
//                         color="#1EBBD7"
//                         onPress={() => navigation.navigate("Sidebar")}
//                       />
//                     </View> */}
//                   </View>
//                 </View>
//                 <View className="bg-white rounded-2xl p-3 flex-1 justify-center space-y-4">
//                   <View className="flex-row justify-between flex-[1]">
//                     <Text className="font-InterRegular text-base text-text-gray">
//                       Your balance is
//                     </Text>
//                     <View className="flex-row space-x-3 justify-center items-center">
//                       <TouchableOpacity
//                         className="h-8"
//                         onPress={toggleStarVisibility}
//                       >
//                         <FontAwesome
//                           name={isStarDefaulted ? "star" : "star-o"}
//                           style={{
//                             color: Color.PrimaryWebOrient,
//                           }}
//                           size={wp("8%")}
//                         />
//                       </TouchableOpacity>
//                       <Toast ref={(ref) => Toast.setRef(ref)} />
//                     </View>
//                   </View>
//                   <View className="items-center ">
//                     <Text className="text-xl text-text-gray">Mir Hamza</Text>
//                   </View>
//                   <View className="items-center flex-[1] ">
//                     <View className="flex-row items-baseline space-x-1 ">
//                       <Text className="text-base">RS.</Text>
//                       <View className="flex-row  items-baseline mb-2">
//                         <Text className="font-InterMedium  text-4xl">
//                           {showText ? "------" : "25,000"}
//                         </Text>
//                         <Text className="text-base">.00</Text>
//                       </View>
//                     </View>
//                     <Text className="text-text-gray font-InterRegular text-base tracking-widest">
//                       Account:{showText ? "----" : "9745 2205 0762"}
//                     </Text>
//                   </View>
//                   <View className="items-end flex-[1]">
//                     <TouchableOpacity onPress={toggleTextVisibility}>
//                       {/* < icon="eye"
//                     iconColor="#1EBBD7"
//                   />    */}
//                       <TouchableOpacity
//                         className="h-20"
//                         onPress={toggleTextVisibility}
//                       >
//                         <Icon
//                           name={showText ? "eye-slash" : "eye"}
//                           style={{
//                             color: Color.PrimaryWebOrientLayer2,
//                           }}
//                           size={wp("8%")}
//                         />
//                       </TouchableOpacity>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </LinearGradient>

//             <View className="space-y-6">
//               <View className="flex-row space-x-3 p-2">
//                 <FlatList
//                   data={MENU}
//                   renderItem={({ item }) => (
//                     <View style={{ flex: 1 }}>
//                       <View
//                         className="Menus bg-background"
//                         style={styles.menus}
//                       >
//                         <TouchableOpacity
//                           onPress={() => navigation.navigate("SendMoney")}
//                         >
//                           {item.title === "Send Money" && (
//                             <FontAwesome
//                               name="send"
//                               size={40}
//                               style={{
//                                 color: Color.PrimaryWebOrient,
//                               }}
//                             />
//                           )}
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           onPress={() =>
//                             navigation.navigate("BillPaymentListing")
//                           }
//                         >
//                           {item.title === "Bill Payments" && (
//                             <BillPayments fill={Color.PrimaryWebOrient} />
//                           )}
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           onPress={() =>
//                             navigation.navigate("BillPaymentTopUp")
//                           }
//                         >
//                           {item.title === "Mobile Topup" && (
//                             <Entypo
//                               name="mobile"
//                               size={40}
//                               style={{
//                                 color: Color.PrimaryWebOrient,
//                               }}
//                             />
//                           )}
//                         </TouchableOpacity>
//                         <TouchableOpacity>
//                           {item.title === "More" && (
//                             <Entypo
//                               name="menu"
//                               size={40}
//                               style={{
//                                 color: Color.PrimaryWebOrient,
//                               }}
//                             />
//                           )}
//                         </TouchableOpacity>

//                         <Text className="font-InterMedium text-xs mt-1">
//                           {item.title}
//                         </Text>
//                       </View>
//                     </View>
//                   )}
//                   keyExtractor={(item) => item.title}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
//                 />
//               </View>

//               <View className="space-y-6">
//                 {/* <Text
//             className="font-InterSemiBold text-base"
//             onPress={() => navigation.navigate("Card")}
//           >
//             Your Cards
//           </Text> */}
//                 <TouchableOpacity
//                 // onPress={() => navigation.navigate("Card")}
//                 >
//                   <Text className="font-InterSemiBold text-base ml-2">
//                     Your Cards
//                   </Text>
//                 </TouchableOpacity>
//                 {/* Card component */}

//                 <View className="justify-center items-center m-3">
//                   <LinearGradient
//                     colors={[
//                       Color.PrimaryWebOrientLayer2,
//                       Color.PrimaryWebOrient,
//                     ]}
//                     className="w-96 h-56 rounded-3xl shadow-xl"
//                     start={{ x: 0.8, y: 0.1 }}
//                   >
//                     <View className="w-full p-4">
//                       <View className="flex flex-row items-start">
//                         <Text
//                           className="font-InterBlack text-7xl"
//                           style={{
//                             color: Color.PrimaryWebOrient,
//                           }}
//                         >
//                           Z
//                         </Text>

//                         <View className="ml-2 flex flex-row">
//                           <View>
//                             <Text className="text-lg text-white font-bold">
//                               Zanbeel
//                             </Text>
//                             <Text className="text-lg text-white">
//                               Secure Banking
//                             </Text>
//                           </View>
//                           <View className="flex-grow" />
//                           <View className="mr-9">
//                             <MasterCardLogo />
//                           </View>
//                         </View>
//                       </View>
//                       <View className="flex flex-row space-x-3 mb-2">
//                         <ChipIcon />
//                         <View className="mt-2">
//                           <Text className="text-center text-2xl font-semibold text-white">
//                             5667 8899 4576 7865
//                           </Text>
//                         </View>
//                         <View className="mt-2 left-4">
//                           <WifiPaymentIcon />
//                         </View>
//                       </View>

//                       <View className="flex flex-row justify-between">
//                         <View className="flex items-center">
//                           <Text className="text-xs text-white">VALID FROM</Text>
//                           <Text className="text-lg font-semibold text-white">
//                             08/23
//                           </Text>
//                         </View>
//                         <View className="flex items-center">
//                           <Text className="text-xs text-white">VALID THRU</Text>
//                           <Text className="text-lg font-semibold text-white">
//                             08/28
//                           </Text>
//                         </View>
//                       </View>
//                       <View className="mb-2">
//                         <Text className="text-center text-2xl font-semibold text-white">
//                           M I R H A M Z A
//                         </Text>
//                       </View>
//                     </View>
//                   </LinearGradient>
//                 </View>
//               </View>
//               <View className="space-y-3 p-2 bottom-8">
//                 <Text className="font-InterSemiBold text-base">Send Again</Text>
//                 <View className="flex-row space-x-3">
//                   <TouchableOpacity onPress={handleAddNewClick}>
//                     <View
//                       className=" w-20 h-36 space-y-2 justify-center items-center rounded-xl"
//                       style={{ backgroundColor: Color.PrimaryWebOrient }}
//                     >
//                       <UserAddIcon />
//                       <Text className="font-InterMedium text-xs text-white">
//                         Add New
//                       </Text>
//                     </View>
//                   </TouchableOpacity>

//                   <FlatList
//                     data={DATA}
//                     renderItem={({ item }) => <Item title={item.title} />}
//                     keyExtractor={(item) => item.id}
//                     horizontal={true}
//                     showsHorizontalScrollIndicator={false}
//                   />
//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//           {/* Fixed footer */}
//           <Footer />
//         </View>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
//   {
//     id: "58694a0f-3d3a1-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
//   {
//     id: "58694a0f-3da61-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
//   {
//     id: "58694a0f-3da11-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
// ];
// const MENU = [
//   {
//     title: "Send Money",
//     icon: "send",
//   },
//   {
//     title: "Bill Payments",
//     icon: "file-text-o",
//   },
//   {
//     title: "Mobile Topup",
//     icon: "mobile",
//   },
//   {
//     title: "More",
//     icon: "bars",
//   },
// ];
// const styles = StyleSheet.create({
//   icon: {
//     height: 10,
//   },
//   menus: {
//     height: 100,
//     width: 95,
//     paddingVertical: 4,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 8,
//     marginTop: 30,
//   },
// });

// export default HomeScreen;

import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  Modal,
  Animated,
  Easing,
  TextInput,
} from "react-native";
import { Color } from "../../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Avatar, List, Divider } from "react-native-paper";
import NewCard from "../../assets/Images/NewCard.svg";
import Statment from "../../assets/Images/Statment.svg";
import Utility from "../../assets/Images/UtilityPay.svg";
import QR from "../../assets/Images/QR.svg";
import Discount from "../../assets/Images/Discount.svg";
import Topup from "../../assets/Images/Top-Up.svg";
import Cards from "../../assets/Images/Cards.svg";
import Payment from "../../assets/Images/Payment.svg";
import Account from "../../assets/Images/Account.svg";
import Transfer from "../../assets/Images/Transfer.svg";
import Beneficiary from "../../assets/Images/Beneficiary.svg";
import ListSectionCard from "../../assets/Images/ListSectionCard.svg";
import Footer from "../../components/Footer";
import Sidebar from "./Account-Setting/Sidebar";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-300)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarVisible ? 0 : -300,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.timing(modalAnim, {
      toValue: isSidebarVisible ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isSidebarVisible]);

  const handlePress = () => setExpanded(!expanded);
  const handlePress1 = () => setExpanded1(!expanded1);

  return (
    <SafeAreaView style={styles.container} className="h-full bg-[#f9fafc]">
      <Modal
        transparent={true}
        animationType="none"
        visible={isSidebarVisible}
        onRequestClose={toggleSidebar}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.sidebarContainer,
              {
                transform: [
                  {
                    translateX: sidebarAnim,
                  },
                ],
              },
            ]}
          >
            <Sidebar />
          </Animated.View>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: modalAnim,
              },
            ]}
          >
            <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />
          </Animated.View>
        </View>
      </Modal>
      <View className="flex flex-row items-center justify-between px-4 pt-6 pb-3">
        {/* Menu Icon */}
        <Entypo
          name="menu"
          size={30}
          style={{ color: Color.PrimaryWebOrient }}
          onPress={toggleSidebar}
        />

        {/* Avatar Image */}
        <View className="w-16 h-16 flex items-center justify-center">
          <Avatar.Image
            source={require("../../assets/Images/profile-icon.png")}
          />
        </View>

        {/* User Info */}
        <View className="flex flex-col justify-center text-lg font-semibold text-gray-800 mr-20">
          <Text className="text-slate-500 text-sm mb-0">welcome</Text>
          <Text className="font-bold text-lg mb-0">Mirza Uraib khan</Text>
        </View>

        {/* Notification Bell */}
        <Entypo
          name="bell"
          size={30}
          style={{ color: Color.PrimaryWebOrient }}
        />
      </View>
      <ScrollView>
        <View className="justify-center items-center">
          <NewCard width={400} />
        </View>

        <View className="flex flex-col px-5 pt-5">
          <Text className="font-bold text-black text-lg">Activity</Text>
        </View>
        <View className="flex justify-center items-center">
          <View className="flex flex-col justify-center items-center">
            {/* First Row */}
            <View className="flex-row justify-between mb-4">
              <TouchableOpacity>
                <View
                  className="w-24 h-24 bg-white m-2.5 rounded-lg flex justify-center items-center"
                  style={styles.box}
                >
                  <Transfer style={styles.icon} />
                  <Text className="text-center font-semibold">Transfer</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  className="w-24 h-24 bg-white m-2.5 rounded-lg flex justify-center items-center"
                  style={[
                    styles.box,
                    { backgroundColor: Color.PrimaryWebOrient },
                  ]}
                >
                  <Payment style={styles.icon} />
                  <Text className="text-center font-semibold text-white">
                    Payment
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  className="w-24 h-24 bg-white m-2.5 rounded-lg flex justify-center items-center"
                  style={styles.box}
                >
                  <Beneficiary style={styles.icon} />
                  <Text className="text-center font-semibold">Beneficiary</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Second Row */}
            <View className="flex-row justify-between mb-4">
              <TouchableOpacity
                onPress={() => navigation.navigate("SelectCards")}
              >
                <View
                  className="w-24 h-24 bg-white m-2.5 rounded-lg flex justify-center items-center"
                  style={styles.box}
                >
                  <Cards style={styles.icon} />
                  <Text className="text-center font-semibold">Cards</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  className="w-24 h-24 bg-white m-2.5 rounded-lg flex justify-center items-center"
                  style={styles.box}
                >
                  <Topup style={styles.icon} />
                  <Text className="text-center font-semibold">Top up</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  className="w-24 h-24 bg-white m-2.5 rounded-lg flex justify-center items-center"
                  style={styles.box}
                >
                  <Account style={styles.icon} />
                  <Text className="text-center font-semibold"> Accounts</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Third Row */}
            <View className="flex-row justify-between mb-4">
              <TouchableOpacity>
                <View
                  className="w-24 h-24 bg-white m-2.5 rounded-lg flex justify-center items-center"
                  style={styles.box}
                >
                  <QR style={styles.icon} />
                  <Text className="text-center font-semibold">QR Payments</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  className="w-24 h-24 bg-white m-2.5 rounded-lg flex justify-center items-center"
                  style={styles.box}
                >
                  <Utility style={styles.icon} />
                  <Text className="text-center font-semibold">Utilty Pay</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  className="w-24 h-24 bg-white m-2.5 rounded-lg flex justify-center items-center"
                  style={styles.box}
                >
                  <Statment style={styles.icon} />
                  <Text className="text-center font-semibold">Statment</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* Fourth Row */}
            <View className="flex-row justify-between mb-4">
              <TouchableOpacity>
                <View
                  className="w-24 h-24 bg-white m-2.5 rounded-lg flex justify-center items-center"
                  style={styles.box}
                >
                  <Discount style={styles.icon} />
                  <Text className="text-center font-semibold">Discount</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex-row justify-between px-5">
          <Text className="text-base font-semibold text-black">My Payees</Text>
          <Text className="text-xs font-medium text-gray-800 underline">
            View All
          </Text>
        </View>
        <ScrollView
          className="pt-1"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View className="w-24 h-36 bg-white m-2 rounded-lg shadow-lg justify-center items-center">
            <View
              className="w-20 h-20 bg-primary mt-3 rounded-lg shadow-lg justify-center items-center"
              style={{ backgroundColor: "#3b82f6" }}
            >
              <Text className="text-center text-4xl text-white font-bold">
                M
              </Text>
            </View>
            <View className="font-medium">
              <Text className="text-sm text-center font-bold mt-1">Maha</Text>
              <Text className="text-xs text-gray-600 font-semibold">
                Meezan Bank
              </Text>
            </View>
          </View>
          <View className="w-24 h-36 bg-white m-2 rounded-lg shadow-lg justify-center items-center">
            <View
              className="w-20 h-20 bg-primary mt-3 rounded-lg shadow-lg justify-center items-center"
              style={{ backgroundColor: "#FECC81" }}
            >
              <Text className="text-center font text-3xl text-white font-bold">
                F
              </Text>
            </View>
            <View className="font-medium">
              <Text className="text-sm text-center font-bold mt-1">Faiz</Text>
              <Text className="text-xs text-center text-gray-600 font-semibold">
                Bank Alfalah
              </Text>
            </View>
          </View>
          <View className="w-24 h-36 bg-white m-2 rounded-lg shadow-lg justify-center items-center">
            <View
              className="w-20 h-20 bg-primary mt-3 rounded-lg shadow-lg justify-center items-center"
              style={{ backgroundColor: "#9683E4" }}
            >
              <Text className="text-center font text-3xl text-white font-bold">
                B
              </Text>
            </View>
            <View className="font-medium">
              <Text className="text-sm text-center font-bold mt-1">Bushra</Text>
              <Text className="text-xs text-center text-gray-600 font-semibold">
                Bank Alfalah
              </Text>
            </View>
          </View>
          <View className="w-24 h-36 bg-white m-2 rounded-lg shadow-lg justify-center items-center">
            <View
              className="w-20 h-20 bg-primary mt-3 rounded-lg shadow-lg justify-center items-center"
              style={{ backgroundColor: "#5CCAA9" }}
            >
              <Text className="text-center font text-3xl text-white font-bold">
                T
              </Text>
            </View>
            <View className="font-medium">
              <Text className="text-sm text-center font-bold mt-1">Tasbih</Text>
              <Text className="text-xs text-center text-gray-600 font-semibold">
                Bank HBL
              </Text>
            </View>
          </View>
          <View className="w-24 h-36 bg-white m-2 rounded-lg shadow-lg justify-center items-center">
            <View
              className="w-20 h-20 bg-primary mt-3 rounded-lg shadow-lg justify-center items-center"
              style={{ backgroundColor: Color.PrimaryWebOrient }}
            >
              <Text className="text-center font text-3xl text-white font-bold">
                A
              </Text>
            </View>
            <View className="font-medium">
              <Text className="text-sm text-center font-bold mt-1">
                Abdullah
              </Text>
              <Text className="text-xs text-center text-gray-600 font-semibold">
                Askari Bank
              </Text>
            </View>
          </View>
        </ScrollView>
        <View className="flex-row justify-between px-5 mt-5">
          <Text className="text-base font-semibold text-black">Quick Pay</Text>
          <Text className="text-xs font-medium text-gray-800 underline">
            View All
          </Text>
        </View>
        <ScrollView
          className="pt-1"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View className="m-2">
            <View
              className="w-20 h-20 bg-primary  rounded-lg shadow-lg justify-center items-center"
              style={{ backgroundColor: Color.PrimaryWebOrient }}
            >
              <Text className="text-center text-4xl text-white font-bold">
                F
              </Text>
            </View>
            <View className="font-medium">
              <Text className="text-sm text-center font-bold mt-1">Fatima</Text>
            </View>
          </View>
          <View className="m-2">
            <View
              className="w-20 h-20 bg-primary  rounded-lg shadow-lg justify-center items-center"
              style={{ backgroundColor: "#20798C" }}
            >
              <Text className="text-center font text-3xl text-white font-bold">
                B
              </Text>
            </View>
            <View className="font-medium">
              <Text className="text-sm text-center font-bold mt-1">Bisma</Text>
            </View>
          </View>
          <View className="m-2">
            <View
              className="w-20 h-20 bg-primary  rounded-lg shadow-lg justify-center items-center"
              style={{ backgroundColor: "#2E76B7" }}
            >
              <Text className="text-center font text-3xl text-white font-bold">
                S
              </Text>
            </View>
            <View className="font-medium">
              <Text className="text-sm text-center font-bold mt-1">Sameer</Text>
            </View>
          </View>
          <View className="m-2">
            <View
              className="w-20 h-20 bg-primary  rounded-lg shadow-lg justify-center items-center"
              style={{ backgroundColor: "#9683E4" }}
            >
              <Text className="text-center font text-3xl text-white font-bold">
                A
              </Text>
            </View>
            <View className="font-medium">
              <Text className="text-sm text-center font-bold mt-1">Amina</Text>
            </View>
          </View>
          <View className="m-2">
            <View
              className="w-20 h-20 bg-primary  rounded-lg shadow-lg justify-center items-center"
              style={{ backgroundColor: "#E983CC" }}
            >
              <Text className="text-center font text-3xl text-white font-bold">
                S
              </Text>
            </View>
            <View className="font-medium">
              <Text className="text-sm text-center font-bold mt-1">Sidra</Text>
            </View>
          </View>
        </ScrollView>
        <View className="px-5 mt-5">
          <Text className="text-base font-semibold text-black">Credit Cards</Text>
        </View>
        <List.Section className="bg-white rounded-lg ml-5 mr-5">
          <List.Accordion
            className="font-InterRegular m-0 text-base bg-white"
            title={
              <View className="flex flex-row items-center">
                <Entypo
                  name="credit-card"
                  size={30}
                  className="mr-1"
                  style={{ color: Color.PrimaryWebOrient }}
                />
                <View className="flex flex-col ml-4">
                  <Text className="text-sm font-semibold text-gray-800">
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

            <Divider />
            {/* Add more sections here if needed */}
          </List.Accordion>
        </List.Section>

        <List.Section className="bg-white rounded-lg ml-5 mr-5">
          <List.Accordion
            className="font-InterRegular m-0 text-base bg-white"
            title={
              <View className="flex flex-row items-center">
                <Entypo
                  name="credit-card"
                  size={30}
                  className="mr-1"
                  style={{ color: Color.PrimaryWebOrient }}
                />
                <View className="flex flex-col ml-4">
                  <Text className="text-sm font-semibold text-gray-800">
                    Credit Card
                  </Text>
                  <Text className="text-xs font-medium text-neutral-500">
                    5669996****7989
                  </Text>
                </View>
              </View>
            }
            left={(props) => <List.Icon {...props} />}
            expanded={expanded1}
            onPress={handlePress1}
          >
            <View className="justify-center items-center mr-8">
              <ListSectionCard width={400} />
            </View>
          </List.Accordion>
        </List.Section>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  box: {
    shadowColor: "#000",
    elevation: 10,
  },
  icon: {
    marginBottom: 8,
    color: Color.PrimaryWebOrient,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
  },
  sidebarContainer: {
    width: "70%",
    backgroundColor: "#f9fafc",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
export default HomeScreen;
