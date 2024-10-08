import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert, Image, Keyboard, Platform, TextInput } from "react-native";
import Modal from 'react-native-modal';
import Input from "../../components/TextInput";
import InputWithIcon from "../../components/TextInputWithIcon";
import { Color } from "../../GlobalStyles";
import Button from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from "@expo/vector-icons";
import axios from 'axios';
import API_BASE_URL from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import * as Application from 'expo-application';
import { encrypt } from "../../utils/crypto";

const Login = ({ navigation }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bioEnabled, setBioEnabled] = useState(null);
  const [hasFingerprint, setHasFingerprint] = useState(false);
  const [hasFaceDetection, setHasFaceDetection] = useState(false);
  const [hasBiometrics, setHasBiometrics] = useState(false);
  const [pin, setPin] = useState(Array(pinLength).fill(''));

  const pinLength = 4;
  const inputs = useRef([]);

  const rnBiometrics = new ReactNativeBiometrics();

  const securityImages1 = [
    require('../../assets/security-img-1.png'),
    require('../../assets/security-img-2.png'),
    require('../../assets/security-img-3.png'),
    require('../../assets/security-img-4.png'),
    require('../../assets/security-img-5.png'),
  ];

  const securityImages2 = [
    require('../../assets/security-img-6.png'),
    require('../../assets/security-img-7.png'),
    require('../../assets/security-img-8.png'),
    require('../../assets/security-img-9.png'),
    require('../../assets/security-img-10.png'),
  ];

  const handlePINChange = (text, index) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    const newPin = [...pin];
    newPin[index] = sanitizedText;

    setPin(newPin);

    if (sanitizedText.length === 1 && index < pinLength - 1) {
      inputs.current[index + 1].focus();
    } else if (sanitizedText.length === 0 && index > 0) {
      const prevIndex = index - 1;
      if (inputs.current[prevIndex]) {
        inputs.current[prevIndex].focus();
      }
    }
  };

  useEffect(() => {
    const toggleModal = () => {
      setModalVisible(true);
    };

    setTimeout(() => {
      toggleModal();
    }, 200);
  }, []);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (form.username === '' || form.password === '') {
      console.log(API_BASE_URL);
      Alert.alert('Error', 'Username and password cannot be null');
      return;
    }

    const encryptedPassword = encrypt(form.password);

    const loginData = {
      emailorUsername: form.username,
      password: encryptedPassword
    };

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/v1/customer/login`, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const dto = response.data;

      if (dto && dto.success && dto.data && dto.data.customerId) {
        const customerId = dto.data.customerId.toString();
        const token = dto.data.token.toString();
        const expirationTime = dto.data.expirationTime.toString();

        await AsyncStorage.setItem('customerId', customerId);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('expirationTime', expirationTime);

        navigation.navigate('Home');
      } else {
        const message = dto.message || (dto.errors && dto.errors.length > 0 ? dto.errors.join(", ") : "Unknown error");
        Alert.alert('Error', message);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message || error.message;

        if (statusCode === 404) {
          Alert.alert('Error', 'Server timed out. Try again later!');
        } else if (statusCode === 503) {
          Alert.alert('Error', 'Service unavailable. Please try again later.');
        } else if (statusCode === 400) {
          Alert.alert('Error', errorMessage);
        } else {
          Alert.alert('Error', 'An unexpected error occurred: ' + errorMessage);
        }
      } else if (error.request) {
        // Request was made but no response received
        Alert.alert('Error', 'No response from the server. Please check your connection.');
      } else {
        // Something went wrong in setting up the request
        Alert.alert('Error', 'Error setting up request: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithFingerprint = async () => {
    try {
      const resultObject = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' });
      const { success } = resultObject;

      if (success) {
        const uniqueId =
          Platform.OS === 'android'
            ? await Application.getAndroidId()
            : await Application.getIosIdForVendorAsync();

        try {
          const response = await axios.post(`${API_BASE_URL}/api/devices/loginWithPin?devicePin=&uniquePin=${uniqueId}`, { timeout: 10000 });

          const dto = response.data;

          if (dto && dto.success && dto.data && dto.data.customerId) {
            setModalVisible(false);

            const customerId = dto.data.customerId.toString();
            const token = dto.data.token.toString();
            const expirationTime = dto.data.expirationTime.toString();

            await AsyncStorage.setItem('customerId', customerId);
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('expirationTime', expirationTime);

            navigation.navigate('Home');
          }
          else {
            if (dto.message) {
              Alert.alert('Error', dto.message);
            }
            else if (dto.errors && dto.errors.length > 0) {
              Alert.alert('Error', dto.errors);
            }
          }
        } catch (error) {
          if (error.response) {
            const statusCode = error.response.status;

            if (statusCode === 404) {
              Alert.alert('Error', 'Server timed out. Try again later!');
            } else if (statusCode === 503) {
              Alert.alert('Error', 'Service unavailable. Please try again later.');
            } else if (statusCode === 400) {
              Alert.alert('Error', error.response.data.data.errors[0]);
            } else {
              Alert.alert('Error', error.message);
            }
          } else if (error.request) {
            Alert.alert('Error', 'No response from the server. Please check your connection.');
          } else {
            Alert.alert('Error', error.message);
          }
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Biometrics failed. Try again!');
    }
  };

  const handleLoginWithPin = async () => {
    const enteredPin = pin.join('');

    if (enteredPin.length > 0) {
      const uniqueId =
        Platform.OS === 'android'
          ? await Application.getAndroidId()
          : await Application.getIosIdForVendorAsync();

      try {
        const response = await axios.post(`${API_BASE_URL}/api/devices/loginWithPin?devicePin=${enteredPin}&uniquePin=${uniqueId}`, { timeout: 10000 });

        const dto = response.data;

        if (dto && dto.success && dto.data && dto.data.customerId) {
          setModalVisible(false);

          const customerId = dto.data.customerId.toString();
          const token = dto.data.token.toString();
          const expirationTime = dto.data.expirationTime.toString();

          await AsyncStorage.setItem('customerId', customerId);
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('expirationTime', expirationTime);

          navigation.navigate('Home');
        }
        else {
          if (dto.message) {
            Alert.alert('Error', dto.message);
          }
          else if (dto.errors && dto.errors.length > 0) {
            Alert.alert('Error', dto.errors);
          }
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 404) {
            Alert.alert('Error', 'Server timed out. Try again later!');
          } else if (statusCode === 503) {
            Alert.alert('Error', 'Service unavailable. Please try again later.');
          } else if (statusCode === 400) {
            Alert.alert('Error', error.response.data.data.errors[0]);
          } else {
            Alert.alert('Error', error.message);
          }
        } else if (error.request) {
          Alert.alert('Error', 'No response from the server. Please check your connection.');
        } else {
          Alert.alert('Error', error.message);
        }
      }
    }
    else {
      Alert.alert('Error', 'Please enter your PIN');
    }
  };

  const checkHardwareSupport = async () => {
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject

        if (available && biometryType === BiometryTypes.TouchID) {
          setHasFingerprint(true);
        } else if (available && biometryType === BiometryTypes.FaceID) {
          setHasFaceDetection(true);
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          setHasBiometrics(true);
        }
      });
  };

  useEffect(() => {
    checkHardwareSupport();
  }, []);

  const isBiometricEnabled = async () => {
    const enableBio = await AsyncStorage.getItem('enableBio');
    setBioEnabled(enableBio === 'true' ? true : false);
  };

  const clean = () => {
    setForm((prevForm) => ({ ...prevForm, password: '' }));
  }

  useFocusEffect(
    React.useCallback(() => {
      clean();
      isBiometricEnabled();
    }, [])
  );

  return (
    <SafeAreaView className="h-full flex-1">
      <LinearGradient
        colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row items-center p-4 mt-2">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={24} color="white" />
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
                      <TouchableOpacity
                        onPress={() => navigation.navigate("ForgetUserName")}
                      >
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
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("ForgetPassword", {
                            source: "password",
                          })
                        }
                      >
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

              {/* -----| Security Image Start |----- */}

              {/* <View className="-top-2">
                  <Text className="text-center font-medium text-sm mb-4 font-InterMedium">Select Security Image</Text>
 
                  <View className="flex-row justify-around items-center">
                    {securityImages1.map((image, index) => (
                      <TouchableOpacity
                        key={index}
                        className="p-3 rounded shadow-md shadow-slate-600 justify-center items-center bg-white"
                      >
                        <Image
                          source={image}
                          resizeMode="contain"
                          className="w-6 h-6"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
 
                  <View className="flex-row justify-around items-center mt-3.5">
                    {securityImages2.map((image, index) => (
                      <TouchableOpacity
                        key={index}
                        className="p-3 rounded shadow-md shadow-slate-600 justify-center items-center bg-white"
                      >
                        <Image
                          source={image}
                          resizeMode="contain"
                          className="w-6 h-6"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View> */}

              {/* -----| Security Image End |----- */}

              <View className={`${bioEnabled ? 'mb-2' : 'mb-8'}`}>
                <Button
                  text="Login"
                  width="w-[100%]"
                  styles="mb-4 py-4"
                  onPress={handleLogin}
                  loading={loading}
                />

                <View className="flex-row justify-center">
                  <Text className="text-sm font-InterRegular">
                    Don't have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    <Text
                      className="text-sm font-InterSemiBold"
                      style={{ color: Color.PrimaryWebOrientTxtColor }}
                    >
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Centered Touch ID and Face ID buttons */}
              {bioEnabled && (<View className="flex justify-center items-center mb-2">
                <View className="flex flex-row space-x-4">
                  {/* Touch ID Button */}
                  {hasBiometrics && (<TouchableOpacity
                    className="flex flex-col items-center"
                    onPress={handleLoginWithFingerprint}
                  >
                    <View className="bg-[#1DBBD8] p-3.5 rounded-lg">
                      <Image
                        source={require("../../assets/finger-icon.png")}
                        className="h-12 w-12"
                      />
                    </View>
                    <Text className="mt-2 mb-4 text-center font-sm ">
                      Login with Touch ID
                    </Text>
                  </TouchableOpacity>)}

                  {hasFingerprint && (<TouchableOpacity
                    className="flex flex-col items-center"
                    onPress={handleLoginWithFingerprint}
                  >
                    <View className="bg-[#1DBBD8] p-3.5 rounded-lg">
                      <Image
                        source={require("../../assets/finger-icon.png")}
                        className="h-12 w-12"
                      />
                    </View>
                    <Text className="mt-2 mb-4 text-center font-sm ">
                      Login with Touch ID
                    </Text>
                  </TouchableOpacity>)}

                  {/* Face ID Button */}
                  {hasFaceDetection && (<TouchableOpacity
                    className="flex flex-col items-center"
                    onPress={() => navigation.navigate('CameraScreen')}
                  >
                    <View className="bg-[#1DBBD8] p-3.5 rounded-lg">
                      <Image
                        source={require("../../assets/Face Icon.png")}
                        className="h-12 w-12"
                      />
                    </View>
                    <Text className="mt-2  mb-4 text-center font-sm">
                      Login with Face ID
                    </Text>
                  </TouchableOpacity>)}
                </View>
              </View>)}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />

      {/* <Modal
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', margin: 0 }}
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.5}
      >
          <View className="bg-white p-5 rounded-lg w-11/12 max-w-xs justify-center items-center self-center shadow-md shadow-slate-400">
            <Image
              source={require("../../assets/alerrt-icon.png")}
              className="w-16 h-14 mb-4"
            />
            <Text className="text-lg font-bold mb-2">Alert Notification</Text>
            <Text className="text-center text-gray-500 mb-6">
              Your device is not configured for Face ID. Please configure it
              from settings.
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="flex-1 bg-white border border-gray-300 rounded-lg py-2 mr-2 items-center justify-center"
              >
                <Text className="text-center text-black text-base">Cancel</Text>
              </TouchableOpacity>
              <Button
                text="Ok"
                onPress={() => {
                  setModalVisible(false);
                }}
                width="w-32"
                backgroundColor="#1D4ED8"
                textColor="#FFF"
                fontSize="text-sm"
                styles="mr-4"
              />
            </View>
          </View>
      </Modal> */}

      <Modal
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', margin: 0 }}
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.5}
      >
        <View className="bg-white p-5 rounded-lg w-11/12 max-w-xs justify-center items-center self-center shadow-md shadow-slate-400">
          <View className="mb-5 px-2">
            <Text className="mb-4 text-center font-InterSemiBold">Enter Your {pinLength} Digit PIN</Text>

            <View className="flex-row justify-around items-center w-full self-center -left-1">
              {Array.from({ length: pinLength }).map((_, index) => (
                <TextInput
                  key={index}
                  ref={(input) => inputs.current[index] = input}
                  className="w-12 h-12 text-center text-lg bg-[#F4F5F9] border border-gray-300 rounded-md font-InterSemiBold"
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(text) => handlePINChange(text, index)}
                  returnKeyType={index === pinLength - 1 ? "done" : "next"}
                />
              ))}
            </View>
          </View>

          <View className="border-t border-gray-300 w-[95%] self-center border-dotted mb-2" />

          <TouchableOpacity className="bg-white p-2 shadow-md shadow-slate-300 rounded-full justify-center items-center mb-2.5" onPress={handleLoginWithFingerprint}>
            <Image
              source={require("../../assets/fingerprint-login.png")}
              className="w-14 h-14"
            />
          </TouchableOpacity>
          <Text className="text-center font-InterSemiBold text-gray-700">
            Login with Touch / Face ID
          </Text>

          <View className="flex-row justify-between w-full px-1 mt-6">
            <Button
              text="Cancel"
              onPress={() => setModalVisible(false)}
              width="w-[48%]"
              color="white"
              textStyles="text-gray-700"
              styles="border border-gray-300 py-3"
            />

            <Button
              text="Done"
              onPress={handleLoginWithPin}
              width="w-[48%]"
              styles="py-3"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Login;
