import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Color } from "../../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as LocalAuthentication from "expo-local-authentication";

const ChooseSecurity = () => {
  const navigation = useNavigation();

  const [hasBio, setHasBio] = useState(true);
  const [hasFaceDetection, setHasFaceDetection] = useState(true);

  const checkHardwareSupport = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  
    if (hasHardware) {
      // Iterate through supported types
      supportedTypes.forEach((type) => {
        if (type === LocalAuthentication.AuthenticationType.FINGERPRINT) {
          setHasBio(true);
        }
        if (type === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION) {
          setHasFaceDetection(true);
        }
      });
    }
  };
  
  useEffect(() => {
    checkHardwareSupport();
  }, []);

  return (
    <SafeAreaView
      className="h-full flex-1"
      style={{ backgroundColor: Color.PrimaryWebOrient }}
    >
      <LinearGradient
        colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
        style={{ flex: 1 }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("StartSection")}>
          <Entypo
            name="chevron-left"
            size={wp("8%")}
            color="#fff"
            marginTop={hp("3%")}
          />
        </TouchableOpacity>
        <View style={{ flexGrow: 1 }}>
          <View className="flex-1 justify-between">
            <View className="flex-1 justify-center items-center">
              <Image
                source={require("../../assets/security.png")}
                resizeMode="contain"
                style={{ width: "45%", height: undefined, aspectRatio: 1 }}
                className="left-2"
              />
              <Text className="text-2xl font-semibold text-center text-white ">
                Enhance Your Security
              </Text>
              <Text className="text-base text-center text-white mt-2 px-8">
                Secure your data with Finger ID or Face ID. Enable these
                features for added protection.
              </Text>
            </View>

            <View>
              <View className="w-full bg-white rounded-t-[30px] py-16 px-2 shadow-2xl">
                <View className=" w-full px-8">
                  {hasBio && (<TouchableOpacity
                    className="flex-row items-center justify-between bg-white border-gray-200 p-4 mb-2 rounded-xl shadow-2xl"
                    onPress={() => navigation.navigate("RegisterFingerPrint")}
                  >
                    <Ionicons name="finger-print" size={28} color="#00C6FF" />
                    <Text className="flex-1 text-base text-left ml-4">
                      Add Fingerprint
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="gray"
                      className="ml-auto"
                    />
                  </TouchableOpacity>)}

                  {hasFaceDetection && (<TouchableOpacity className="flex-row  justify-between bg-white border-gray-200 p-4 mb-2 rounded-lg shadow-inner"
                  onPress={() => navigation.navigate("RegisterFaceDetector")}>
                    <Ionicons name="scan-outline" size={28} color="#00C6FF" />
                    <Text className="flex-1 text-base text-left ml-4">
                      Add Face ID
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="gray"
                      className="ml-auto"
                    />
                  </TouchableOpacity>)}
                </View>
                <View className=" mt-4 px-4">
                  <Button
                    text="Skip"
                    width="w-[100%]"
                    styles=" "
                    onPress={() => navigation.navigate("Login")}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default ChooseSecurity;
