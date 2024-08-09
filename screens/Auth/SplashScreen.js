// import React, { useEffect } from "react";
// import { Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Color } from "../../GlobalStyles";

// const SplashScreen = ({ navigation }) => {
//   useEffect(() => {
//     setTimeout(() => {
//       AsyncStorage.multiGet(["user_email", "user_pass"]).then((values) => {
//         const userEmail = values[0][1];
//         const userPass = values[1][1];

//         if (userEmail === null && userPass === null) {
//           navigation.replace("Auth");
//         } else if (userEmail === userEmail && userPass === userPass) {
//           navigation.replace("EntitySelection");
//         } else {
//           navigation.replace("Auth");
//         }
//       });
//     }, 1000);
//   }, []);

//   return (
//     <LinearGradient
//       className="flex-1 justify-center items-center"
//       colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
//     >
//       <Text
//         className="font-InterBlack  -m-14"
//         style={{ fontSize: 267, color: Color.PrimaryWebOrientTxtColor }}
//       >
//         Z
//       </Text>
//       <Text className="font-medium text-white text-xl">
//         Ultimate Banking Solution
//       </Text>
//     </LinearGradient>
//   );
// };

// export default SplashScreen;

import React, { useEffect } from "react";
import { View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Color } from "../../GlobalStyles";
import { StatusBar } from "expo-status-bar";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.multiGet(["user_email", "user_pass"]).then((values) => {
        const userEmail = values[0][1];
        const userPass = values[1][1];

        if (userEmail === null && userPass === null) {
          navigation.replace("Auth");
        } else if (userEmail && userPass) {
          navigation.replace("EntitySelection");
        } else {
          navigation.replace("Auth");
        }
      });
    }, 1000);
  }, [navigation]);

  return (
    <>
      <View className="flex-1 bg-primary h-full items-center justify-center">
        <Image
          source={require("../../assets/splash.png")}
          resizeMode="cover"
          className="w-full h-full"
        />
      </View>
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </>
  );
};

export default SplashScreen;
