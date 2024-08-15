import React, { useState, useContext, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  TextInput,
  Modal,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Input from "../../components/TextInput";
import InputWithIcon from "../../components/TextInputWithIcon";
import { Color } from "../../GlobalStyles";
import { Entypo } from "@expo/vector-icons";
import CustomButton from "../../components/Button";
import { AppLoaderContext } from "../../components/LoaderHOC";
import PinCode from "./PinCode";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import API_BASE_URL from "../../config";
import * as LocalAuthentication from "expo-local-authentication";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { FaceDetector } from 'react-native-vision-camera';

const Login = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("mobile");
  const sw = Dimensions.get("screen").width;
  const sh = Dimensions.get("screen").height;
  const [emailorUsername, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showLoader, hideLoader } = useContext(AppLoaderContext);
  const [pinCodeModalVisible, setPinCodeModalVisible] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [biometricData, setBiometricData] = useState(null);
  const [visitorId, setVisitorId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [faces, setFaces] = useState([]);
  const devices = useCameraDevices();
  const device = devices.back;

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const facesDetected = FaceDetector.detectFaces(frame);
    setFaces(facesDetected);
  }, []);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (form.username === "" || form.password === "") {
      Alert.alert("Error", "Username and password can not be null");
    } else {
      setLoading(true);
      const loginData = {
        emailorUsername: form.username,
        password: form.password,
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/v1/customer/login`,
          loginData
        );
        const dto = response.data;

        if (dto && dto.success && dto.data && dto.data.customerId) {
          const customerId = dto.data.customerId.toString();
          const token = dto.data.token.toString();
          const expirationTime = dto.data.expirationTime.toString();

          await AsyncStorage.setItem("customerId", customerId);
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("expirationTime", expirationTime);

          navigation.navigate("Home");
        } else {
          if (dto.message) {
            Alert.alert("Error", dto.message);
          } else if (dto.errors && dto.errors.length > 0) {
            Alert.alert("Error", dto.errors);
          }
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 404) {
            Alert.alert("Error", "Server timed out. Try again later!");
          } else if (statusCode === 503) {
            Alert.alert("Error", "Service unavailable. Please try again later.");
          } else if (statusCode === 400) {
            Alert.alert("Error", error.response.data.data.errors[0]);
          } else {
            Alert.alert("Error", error.message);
          }
        } else if (error.request) {
          Alert.alert("Error", "No response from the server. Please check your connection.");
        } else {
          Alert.alert("Error", error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePress = async () => {
    if (!isEnabled) {
      try {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          const newVisitorId = uuidv4();
          setVisitorId(newVisitorId);
          await AsyncStorage.setItem("visitorId", newVisitorId);

          setIsEnabled(true);
          setBiometricData({
            brand: Device.brand,
            modelName: Device.modelName,
            osName: Device.osName,
            osVersion: Device.osVersion,
            visitorId: newVisitorId,
          });

          navigation.navigate("Home");
        } else {
          Alert.alert("Authentication failed", result.error);
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      setIsEnabled(false);
      setBiometricData(null);
      setVisitorId(null);
      await AsyncStorage.removeItem("visitorId");
      console.log("Biometric Data Reset");
    }
  };

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware) {
        Alert.alert("Error", "Biometric authentication is not available on this device.");
      } else if (!isEnrolled) {
        Alert.alert("Error", "No biometric authentication is set up on this device.");
      }
    };

    checkBiometricSupport();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!device) {
    return <Text>Loading camera...</Text>;
  }

  return (
    <SafeAreaView className="h-full flex-1" style={{ backgroundColor: Color.PrimaryWebOrient }}>
      <LinearGradient colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row items-center p-4 mt-2">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={22} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-semibold text-lg ml-4 font-InterSemiBold">
              Login
            </Text>
          </View>

          <View className="flex-1 bg-white mt-2 rounded-t-[30px] px-7 pt-7 shadow-2xl">
            <View className="flex-1 justify-between">
              <View>
                <View className="mb-8 w-[80%]">
                  <Text className="text-2xl font-bold leading-8 font-InterBold">
                    Get started with DigiBank!
                  </Text>
                </View>

                <View>
                  <View>
                    <Text className="text-sm mb-2 font-InterMedium">
                      User Name*
                    </Text>
                    <Input
                      placeholder="Enter your username"
                      value={form.username}
                      onChange={(text) => handleChange("username", text)}
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <View className="items-end mt-2">
                      <TouchableOpacity onPress={() => navigation.navigate("ForgetUserName")}>
                        <Text
                          className="text-xs underline font-InterSemiBold"
                          style={{ color: Color.PrimaryWebOrientTxtColor }}
                        >
                          Forgot Username?
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="mt-1 mb-4">
                    <Text className="text-sm mb-2 font-InterMedium">
                      Password*
                    </Text>
                    <InputWithIcon
                      placeholder="Enter your password"
                      isPassword
                      value={form.password}
                      onChange={(text) => handleChange("password", text)}
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <View className="items-end mt-2">
                      <TouchableOpacity onPress={() =>
                        navigation.navigate("ForgetPassword", { source: "password" })
                      }>
                        <Text
                          className="text-xs underline font-InterSemiBold"
                          style={{ color: Color.PrimaryWebOrientTxtColor }}
                        >
                          Forgot Password?
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View className="mb-2">
                <CustomButton
                  text="Login"
                  width="w-[100%]"
                  styles="mb-4 py-4"
                  onPress={handleLogin}
                />

                <View className="flex-row justify-center">
                  <Text className="text-sm font-InterRegular">
                    Don't have an account?{" "}
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text
                      className="text-sm font-InterSemiBold"
                      style={{ color: Color.PrimaryWebOrientTxtColor }}
                    >
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex justify-center items-center">
                <View className="flex flex-row space-x-4">
                  {/* Touch ID Button */}
                  <TouchableOpacity onPress={() => handlePress()}>
                    <View className="p-4 bg-gray-200 rounded-full">
                      <Image
                        source={require("../../assets/icons/touch-id.png")}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                  </TouchableOpacity>
                  {/* Face ID Button */}
                  <TouchableOpacity onPress={() => handlePress()}>
                    <View className="p-4 bg-gray-200 rounded-full">
                      <Image
                        source={require("../../assets/icons/face-id.png")}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <Modal visible={pinCodeModalVisible} transparent animationType="slide">
          <PinCode
            onClose={() => setPinCodeModalVisible(false)}
          />
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Add any custom styles here
});

export default Login;
