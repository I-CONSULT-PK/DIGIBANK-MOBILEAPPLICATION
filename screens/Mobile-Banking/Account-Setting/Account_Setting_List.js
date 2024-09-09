import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Color } from "../../../GlobalStyles";

const { width } = Dimensions.get("window");

const Account_Setting_List = () => {
  const navigation = useNavigation();
  const options = [
    {
      id: 1,
      title: "Add Account",
      image: require("../../../assets/Add Account.png"),
    },
    {
      id: 2,
      title: "Create Login PIN",
      image: require("../../../assets/Change login pin.png"),
    },
    {
      id: 3,
      title: "Change Password",
      image: require("../../../assets/Change Password.png"),
    },
    {
      id: 4,
      title: "Limit Management",
      image: require("../../../assets/Limit Management.png"),
    },
    {
      id: 5,
      title: "OTP Preference",
      image: require("../../../assets/OTP Preference.png"),
    },
    {
      id: 6,
      title: "User Activity",
      image: require("../../../assets/Add Account.png"),
    },
    {
      id: 7,
      title: "Update Profile",
      image: require("../../../assets/Update Profile.png"),
    },
    {
      id: 8,
      title: "Change Login pin",
      image: require("../../../assets/Change login pin.png"),
    },
    {
      id: 9,
      title: "De-Activate PIN",
      image: require("../../../assets/De-Activate Login PIN.png"),
    },
    {
      id: 10,
      title: "Bio Registration",
      image: require("../../../assets/Bio Registration.png"),
    },
  ];

  // Define a consistent padding value for content alignment
  const horizontalPadding = 16;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <LinearGradient
          colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
          style={{ paddingBottom: 12 }}
        >
          <View className="flex-row items-center px-4 mt-2">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-center font-semibold text-lg flex-1">
              Setting
            </Text>
          </View>
        </LinearGradient>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 mt-2">
            <View className="flex-row flex-wrap">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => console.log(option.title)}
                  className="p-2"
                  style={{ width: (width - horizontalPadding * 1.2) / 2 }}
                >
                  <View className="bg-white rounded-lg p-4 shadow-lg flex-row items-center">
                    <Image
                      source={option.image}
                      className="w-10 h-10 mr-2"
                      resizeMode="contain"
                    />
                    <Text className="text-base font-normal">
                      {option.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Account_Setting_List;
