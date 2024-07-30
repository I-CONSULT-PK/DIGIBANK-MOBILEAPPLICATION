import React, { useState, useContext } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Input from "../../components/TextInput";
import InputWithIcon from "../../components/TextInputWithIcon";
import MainImage from "../../assets/Images/MainImage.svg";
import { Color } from "../../GlobalStyles";
import { Entypo } from "@expo/vector-icons";
import CustomButton from "../../components/Button";
import { AppLoaderContext } from "../../components/LoaderHOC";
import PinCode from "./PinCode";

const Login = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("mobile");
  const sw = Dimensions.get("screen").width;
  const sh = Dimensions.get("screen").height;
  const [emailorUsername, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showLoader, hideLoader } = useContext(AppLoaderContext);
  const [pinCodeModalVisible, setPinCodeModalVisible] = useState(false);
  const handleLogin = async () => {
    // // New Work
    // // Validate email and password
    // if (!emailorUsername || !password) {
    //   Alert.alert("Validation Error", "Please enter both email and password");
    //   return;
    // }

    // try {
    //   const apiUrl = "http://192.168.0.196:9096/v1/customer/login";
    //   showLoader();
    //   const response = await fetch(apiUrl, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       emailorUsername,
    //       password,
    //     }),
    //   });

    //   const data = await response.json();

    //   if (response.ok && data.success) {
    //     // Successful login
    //     console.log("Login successful", data);

    //     // Navigate to the next screen
    // navigation.navigate("OTP");
    //   } else {
    //     // Failed login, display error message
    //     Alert.alert(
    //       "Login Failed",
    //       data.message || "Invalid email or password"
    //     );
    //   }
    // } catch (error) {
    //   console.error("Login error", error.message);
    //   Alert.alert("Error", "An error occurred. Please try again later.");
    // } finally {
    //   // Hide loader
    //   hideLoader();
    // }
    setPinCodeModalVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View className="justify-center items-center py-5">
        <MainImage style={{ width: sw - 9, height: sh - 550 }} />
        <Text className="font-InterBold text-3xl">Welcome</Text>
        <Text className="font-InterMedium text-center text-text-gray text-sm">
          to the future bank where you can{" "}
          <Text style={{ color: Color.PrimaryWebOrientTxtColor }}>
            Add, Manage & Track
          </Text>{" "}
          your all financial account only in one app
        </Text>
        <Text className="text-text-gray font-InterMedium text-center text-base mt-4">
          Select login options
        </Text>
        <View className="flex-row justify-between mt-6">
          <TouchableOpacity>
            <View className="flex-row justify-between items-center">
              {/* <View style={[styles.circleContainer, { marginRight: 10 }]}>
                <Entypo
                  name="mail"
                  size={40}
                  style={{
                    color: Color.PrimaryWebOrient,
                  }}
                />
              </View> */}
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Popup",
                    "Place your finger on your phone fingerprint sensor"
                  )
                }
              >
                <View
                  className="rounded-full w-16 h-16 bg-gray-300 flex justify-center items-center"
                  style={{ backgroundColor: "#f4f5f9" }}
                >
                  <Entypo
                    name="fingerprint"
                    size={40}
                    style={{
                      color: Color.PrimaryWebOrient,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="m-3">
        <View className="mb-5">
          <Input
            placeholder="Email or UserName"
            keyboardType="email-address"
            value={emailorUsername}
            onChange={(text) => setEmail(text)}
          />
        </View>
        <View className="mb-2">
          <InputWithIcon
            isPassword={true}
            value={password}
            onChange={(text) => setPassword(text)}
            placeholder="Password"
          />
        </View>
      </View>
      <CustomButton className="m-2" Text={"Login"} onPress={handleLogin} />
      <PinCode
        visible={pinCodeModalVisible}
        onClose={() => setPinCodeModalVisible(false)}
      />

      <View className="m-3 mt-2  flex justify-center items-center">
        <Text
          onPress={() => navigation.navigate("ForgetPassword")}
          style={{
            fontFamily: "InterSemiBold",
            color: Color.PrimaryWebOrientTxtColor,
          }}
        >
          Forget Password?
        </Text>
      </View>
      <View className="items-center">
        <Text className="text-text-gray" style={{ fontFamily: "InterMedium" }}>
          Don’t have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Registration")}
            style={{
              fontFamily: "InterSemiBold",
              color: Color.PrimaryWebOrientTxtColor,
            }}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: wp("20%"),
    height: wp("20%"),
  },
});

export default Login;