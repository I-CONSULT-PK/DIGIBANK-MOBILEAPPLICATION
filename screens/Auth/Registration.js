import React, { useState, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Input from "../../components/TextInput";
import InputWithIcon from "../../components/TextInputWithIcon";
import CustomButton from "../../components/Button";
import { Controller, useForm } from "react-hook-form";
import { Color } from "../../GlobalStyles";
import LoaderComponent from "../../components/LoaderComponent";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppLoaderContext } from "../../components/LoaderHOC";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios";
import API_BASE_URL from '../../config';

import Button from "../../components/Button";

const Registration = ({ route }) => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useContext(AppLoaderContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginPress = () => {
    // Display loader
    showLoader();
    setIsLoading(true);

    // Simulate login process
    setTimeout(async () => {
      // Hide loader
      hideLoader();
      setIsLoading(false);

      navigation.navigate("OTP", {
        userEmail: await AsyncStorage.getItem("userEmail"),
        userNumber: await AsyncStorage.getItem("userMobileNumber"),
      });
    }, 5000);
  };

  // --------------------------------------

  const { source, email, mobileNumber, cnic, accountNumber, firstName, lastName } = route.params || {};

  const [main, setMain] = useState(true);
  const [initialForm, setInitialForm] = useState({
    cnic: '',
    mobile: '',
    accountNumber: '',
  });
  const [returnedData, setReturnedData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [finalForm, setFinalForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [nextLoading, setNextLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setMain(true);
    }, [])
  );

  const handleChange = (name, value, setState) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNumericChange = (name, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    handleChange(name, numericValue);
  };

  const handleNext = async () => {
    if (initialForm.cnic === '' || initialForm.mobile === '' || initialForm.accountNumber === '') {
      Alert.alert('Error', 'Please enter all the fields')
    }

    else {
      setNextLoading(true);

      const registrationData = {
        globalId: {
          cnicNumber: initialForm.cnic,
        },
        account: {
          accountNumber: initialForm.accountNumber,
        },
        customer: {
          mobileNumber: initialForm.mobile,
        },
      };

      try {
        const response = await axios.post(`${API_BASE_URL}/v1/customer/signup`, registrationData);
        const dto = response.data;

        if (dto && dto.success && dto.data) {
          setReturnedData({
            firstName: dto.data.customer.firstName,
            lastName: dto.data.customer.lastName,
            email: dto.data.email,
          });

          setMain(false);
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
      } finally {
        setNextLoading(false);
      }
    }
  };

  const handleOTP = async () => {
    if (initialForm.mobile === '' || returnedData.email === '') {
      Alert.alert('Error', 'Unexpected error occured. Try again later')
    }
    else {
      setOtpLoading(true);

      const otpData = {
        mobileNumber: initialForm.mobile,
        email: returnedData.email,
        reason: 'fund transfer'
      };

      try {
        const response = await axios.post(`${API_BASE_URL}/v1/otp/createOTP`, otpData);
        const dto = response.data;

        if (dto && dto.success && dto.data) {
          navigation.navigate('OTP', { source: 'registration', email: returnedData.email, mobileNumber: initialForm.mobile, cnic: initialForm.cnic, accountNumber: initialForm.accountNumber, firstName: returnedData.firstName, lastName: returnedData.lastName });
        }
        else {
          if (dto.message) {
            Alert.alert('Error', dto.message);
          }
          else if (dto.errors && dto.errors.length > 0) {
            Alert.alert('Error', dto.error);
          }
        }
      }
      catch (error) {
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
      } finally {
        setOtpLoading(false);
      }
    }
  }

  const handleRegister = async () => {
    if (finalForm.username === '' || finalForm.password === '' || finalForm.confirmPassword === '') {
      Alert.alert('Error', 'Please enter all the fields');
    }
    else {
      if (finalForm.password !== finalForm.confirmPassword) {
        Alert.alert('Error', 'Password do not match');
      }
      else {
        setRegisterLoading(true);

        const userData = {
          mobileNumber: mobileNumber,
          firstName: firstName,
          lastName: lastName,
          cnic: cnic,
          email: email,
          userName: finalForm.username,
          password: finalForm.password,
          status: "00",
          device: {
            pinHash: "1234"
          },
          accountDto: {
            accountNumber: accountNumber
          }
        }

        try {
          const response = await axios.post(`${API_BASE_URL}/api/devices/signUp`, userData);
          const dto = response.data;

          if (dto && dto.success && dto.data) {
            Alert.alert('Success', dto.message);

            setTimeout(() => {
              navigation.navigate('Login');
            }, 1000);
          }
          else {
            if (dto.message) {
              Alert.alert('Error', dto.message);
            }
            else if (dto.errors && dto.errors.length > 0) {
              Alert.alert('Error', dto.error);
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
        } finally {
          setRegisterLoading(false);
        }
      }
    }
  }

  return (
    <SafeAreaView className="h-full flex-1">
      <LinearGradient
        colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row items-center p-4 mt-2">
            <TouchableOpacity onPress={() => {
              setMain(true);
              main && navigation.goBack();
            }}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold ml-4 font-InterSemiBold">Register yourself</Text>
          </View>

          <View className="flex-1 bg-white mt-2 rounded-t-[30px] px-7 pt-7 shadow-2xl">
            {source === 'OTP' ? (
              <View className="flex-1 justify-between">
                <View>
                  <View className="mb-8 w-[80%]">
                    <Text className="text-2xl font-bold font-InterBold">Get started with your account!</Text>
                  </View>

                  <View>
                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">User Name*</Text>
                      <Input placeholder="Enter a username" value={finalForm.username} onChange={(text) => handleChange('username', text, setFinalForm)} onSubmitEditing={Keyboard.dismiss} />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Password*</Text>
                      <InputWithIcon placeholder="Enter a password" isPassword value={finalForm.password} onChange={(text) => handleChange('password', text, setFinalForm)} onSubmitEditing={Keyboard.dismiss} />
                    </View>

                    <View className="mb-9">
                      <Text className="text-sm mb-2 font-InterMedium">Confirm Password*</Text>
                      <InputWithIcon placeholder="Confirm your password" isPassword value={finalForm.confirmPassword} onChange={(text) => handleChange('confirmPassword', text, setFinalForm)} onSubmitEditing={Keyboard.dismiss} />
                    </View>
                  </View>
                </View>

                <View className="mb-5">
                  <Button
                    text='Sign up'
                    width='w-[100%]'
                    styles='mb-4 py-4'
                    onPress={handleRegister}
                    loading={registerLoading}
                  />

                  <View className="flex-row justify-center">
                    <Text className="text-sm font-InterRegular">Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                      <Text className="text-sm font-InterSemiBold" style={{ color: Color.PrimaryWebOrientTxtColor }}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : main ? (
              <View className="flex-1 justify-between">
                <View>
                  <View className="mb-8 w-[80%]">
                    <Text className="text-2xl font-bold font-InterBold">Get started with your account!</Text>
                  </View>

                  <View>
                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">CNIC Number*</Text>
                      <Input placeholder="Enter your CNIC" value={initialForm.cnic} onChange={(text) => handleChange('cnic', text, setInitialForm)} onSubmitEditing={Keyboard.dismiss} />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Mobile Number*</Text>
                      <Input placeholder="Enter your mobile number" value={initialForm.mobile} onChange={(text) => handleChange('mobile', text, setInitialForm)} onSubmitEditing={Keyboard.dismiss} keyboardType='numeric' />
                    </View>

                    <View className="mb-9">
                      <Text className="text-sm mb-2 font-InterMedium">Account Number*</Text>
                      <Input placeholder="Enter 14 digits Acc No." value={initialForm.accountNumber} onChange={(text) => handleChange('accountNumber', text, setInitialForm)} onSubmitEditing={Keyboard.dismiss} />
                    </View>
                  </View>
                </View>

                <View className="mb-5">
                  <Button
                    text='Next'
                    width='w-[100%]'
                    styles='mb-4 py-4'
                    onPress={handleNext}
                    loading={nextLoading}
                  />

                  <View className="flex-row justify-center">
                    <Text className="text-sm font-InterRegular">Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                      <Text className="text-sm font-InterSemiBold" style={{ color: Color.PrimaryWebOrientTxtColor }}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View className="flex-1 justify-between">
                <View>
                  <View className="mb-8 w-[80%]">
                    <Text className="text-2xl font-bold font-InterBold">Get started with your account!</Text>
                  </View>

                  <View>
                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">First Name*</Text>
                      <Input value={returnedData.firstName} disable />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Last Name*</Text>
                      <Input value={returnedData.lastName} disable />
                    </View>

                    <View className="mb-9">
                      <Text className="text-sm mb-2 font-InterMedium">Email Address*</Text>
                      <Input value={returnedData.email} disable />
                    </View>
                  </View>
                </View>

                <View className="mb-5">
                  <Button
                    text='Next'
                    width='w-[100%]'
                    styles='mb-4 py-4'
                    onPress={handleOTP}
                    loading={otpLoading}
                  />

                  <View className="flex-row justify-center">
                    <Text className="text-sm font-InterRegular">Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                      <Text className="text-sm font-InterSemiBold" style={{ color: Color.PrimaryWebOrientTxtColor }}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Registration;
