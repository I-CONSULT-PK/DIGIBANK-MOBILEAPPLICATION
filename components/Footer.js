// import React, { useState } from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import { Color } from "../GlobalStyles";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { Feather, Fontisto } from "@expo/vector-icons";
// import QrScan from "../assets/Images/QrScan.svg";
// import { useNavigation } from "@react-navigation/native";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// const Footer = () => {
//   const navigation = useNavigation();
//   const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);

//   const handleQrCodePress = () => {
//     setShowQrCode(!showQrCode);
//   };

//   const closeOptionsMenu = () => {
//     setIsOptionsMenuVisible(false);
//   };

//   return (
//     <LinearGradient
//       colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
//       style={{
//         left: 0,
//         right: 0,
//         borderTopWidth: 1,
//         color: "#fff",
//         borderTopColor: "#E1E1E1",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <View className="h-14 flex flex-row items-center justify-center">
//         <View className="flex flex-row justify-center space-x-7">
//           <View className=" items-center">
//             <Ionicons
//               name="chatbox-ellipses-outline"
//               style={{ color: '#fff' }}
//               size={27}
//             />
//             <Text className="font-InterMedium ">Chat</Text>
//           </View>
//           <View className=" items-center">
//             <Fontisto
//               name="shopping-sale"
//               style={{ color: '#fff' }}
//               size={27}
//             />
//             <Text className="font-InterMedium ">Discount</Text>
//           </View>
//         </View>

//         <View className="items-center justify-center">
//           <TouchableOpacity
//             className="shadow-2xl border-2 bg-white rounded-full w-20 h-20 bottom-4"
//             onPress={() => navigation.navigate("Scanner")}
//             style={{
//               borderColor: Color.PrimaryWebOrient,
//               margin: 10,
//             }}
//           >
//             <View className="items-center">
//               <QrScan
//                 fill={Color.PrimaryWebOrient}
//                 color={Color.PrimaryWebOrient}
//                 background
//                 style={{
//                   top: hp("1.8%"),
//                 }}
//               />
//             </View>
//           </TouchableOpacity>

//           {isOptionsMenuVisible && (
//             <View
//               style={{
//                 ...StyleSheet.absoluteFillObject,
//                 backgroundColor: "rgba(0, 0, 0, 0.5)",
//                 zIndex: 2,
//                 padding: 10,
//               }}
//             >
//               <View style={{ flex: 1 }}>
//                 {/* <BeneficiaryOption /> */}
//               </View>
//             </View>
//           )}
//         </View>

//         <View className="flex flex-row justify-center space-x-7">
//         <View className="items-center justify-center">
//                         <Ionicons
//                             name="settings"
//                             style={{ color: '#fff' }}
//                             onPress={() => navigation.navigate("Sidebar")}
//                             size={27}
//                         />
//                         <Text className="font-InterMedium ">Setting</Text>
//                     </View>
//                     <View className=" items-center justify-end ">
//                         <Feather
//                             name="power"
//                             style={{ color: '#fff' }}
//                             onPress={() => navigation.navigate("Login")}
//                             size={27}
//                         />
//                         <Text className="font-InterMedium ">Logout</Text>
//                     </View>
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// export default Footer;
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../GlobalStyles";

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-white py-4">
      <View className="flex flex-row justify-between items-center mx-4">
        {/* Home */}
        <TouchableOpacity className="flex items-center">
          <Entypo
            name="home"
            size={30}
            style={{ color: Color.PrimaryWebOrient }}
          />
          <Text
            className=" mt-1 text-xs font-semibold"
            style={{ color: Color.PrimaryWebOrient }}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Send */}
        <TouchableOpacity className="flex items-center">
          <Entypo name="paper-plane" size={30} />
          <Text className=" mt-1 text-xs font-semibold">Send</Text>
        </TouchableOpacity>

        {/* Cards */}
        <TouchableOpacity
          className="flex items-center"
          onPress={() => navigation.navigate("ApplyForCard")}
        >
          <Entypo name="credit-card" size={30} />
          <Text className=" mt-1 text-xs font-semibold">Cards</Text>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity className="flex items-center">
          <Entypo name="cog" size={30} />
          <Text className=" mt-1 text-xs font-semibold">Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
