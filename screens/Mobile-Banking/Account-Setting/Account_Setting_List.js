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
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";

const { width } = Dimensions.get("window");

const Account_Setting_List = () => {
  const navigation = useNavigation();
  const options = [
    {
      id: 1,
      title: "Add Account",
      image: require("../../../assets/Add Account.png"),
      link: "Add_Account",
    },
    {
      id: 2,
      title: "Create Login PIN",
      image: require("../../../assets/Change login pin.png"),
      link: "CreatePinScreen",
    },
    {
      id: 3,
      title: "Change Password",
      image: require("../../../assets/Change Password.png"),
      link: "ChangePassword",
    },
    {
      id: 4,
      title: "Limit Management",
      image: require("../../../assets/Limit Management.png"),
      link: "LimitManagement",
    },
    {
      id: 5,
      title: "OTP Preference",
      image: require("../../../assets/OTP Preference.png"),
      link: "OTP_Preference",
    },
    {
      id: 6,
      title: "User Activity",
      image: require("../../../assets/User Activity.png"),
      link: "UserActivityScreen",
    },
    {
      id: 7,
      title: "Update Profile",
      image: require("../../../assets/Update Profile.png"),
      link: "Update_Profile",
    },
    {
      id: 8,
      title: "Change Login pin",
      image: require("../../../assets/Change login pin.png"),
      link: "ChangeLoginPinScreen",
    },
    {
      id: 9,
      title: "De-Activate PIN",
      image: require("../../../assets/De-Activate Login PIN.png"),
      link: "DeactivatePin",
    },
    {
      id: 10,
      title: "Enable Biometric ",
      image: require("../../../assets/Bio Registration.png"),
      link: "ChooseSecurity",
    },
  ];

  const horizontalPadding = 16;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <View
          className="h-24"
          style={{ backgroundColor: Color.PrimaryWebOrient }}
        >
          <View className="flex-row items-center justify-center h-full">
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">Settings</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 mt-2">
            <View className="flex-row flex-wrap justify-center">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => navigation.navigate(option.link)}
                  className="p-2"
                  style={{ width: (width - horizontalPadding * 1.2) / 2 }}
                >
                  <View className="bg-white rounded-lg p-2 shadow-lg  shadow-slate-400 flex-row items-center h-[55px]">
                    <Image
                      source={option.image}
                      className="w-8 h-8 mr-2"
                      resizeMode="contain"
                    />
                    <Text className="text-[12px] font-normal flex-shrink flex-grow w-36">
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
