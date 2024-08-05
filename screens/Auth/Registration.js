import React, { useState, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppLoaderContext } from "../../components/LoaderHOC";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios";

const Registration = ({ route }) => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useContext(AppLoaderContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      // Display loader
      showLoader();
      setIsLoading(true);
      console.log("Form Data:", formData);
      const signupResponse = await fetch(
        "http://192.168.0.196:9096/v1/customer/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const signupData = await signupResponse.json();
      console.log(signupData);

      if (signupData.success) {
        // Save email and mobile number to local storage
        await AsyncStorage.setItem("userEmail", formData.email);
        await AsyncStorage.setItem("userMobileNumber", formData.mobileNumber);
        // Hide loader
        hideLoader();
        setIsLoading(false);

        // Navigating to OTP Screen
        handleLoginPress();
      } else {
        // Hide loader
        hideLoader();
        setIsLoading(false);

        Alert.alert(
          "Signup Failed",
          signupData.message || "Something went wrong during signup"
        );
      }
    } catch (error) {
      // Hide loader
      hideLoader();
      setIsLoading(false);

      console.error("Signup Error:", error);

      let errorMessage = "An error occurred. Please try again later.";

      if (error instanceof SyntaxError) {
        errorMessage = "Invalid response from the server.";
      } else if (error && error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Error", errorMessage);
    }
  };

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

  const { source } = route.params || {};

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

  const handleChange = (name, value) => {
    setInitialForm({
      ...initialForm,
      [name]: value,
    });
  };

  const handleNext = async () => {
    try {
      // const response = await axios.post(`${API_BASE_URL.SITE}/v1/customer/register`, {
      //   cnic: initialForm.cnic,
      //   mobile: initialForm.mobile,
      //   accountNumber: initialForm.accountNumber,
      // });

      // const { firstName, lastName, email, message } = response.data;

      // setReturnedData({
      //   firstName,
      //   lastName,
      //   email,
      // });

      // console.log('Message:', message);
      setMain(false);
    } catch (error) {
      console.log('Error during registration:', error);
      Alert.alert('Invalid Details', 'Please check your details and try again.');
    }
  };

  return (
    // <TouchableWithoutFeedback>
    //   <View className="bg-white" style={{ flex: 1 }}>
    //     <View className="justify-center items-center space-y-4 h-52">
    //       <Text
    //         className="font-InterBold text-5xl"
    //         style={{ color: Color.PrimaryWebOrientTxtColor }}
    //       >
    //         Zanbeel
    //       </Text>
    //       <Text className="text-2xl font-InterMedium text-text-gray">
    //         Sign up to continue
    //       </Text>
    //     </View>
    //     <ScrollView
    //       className="bg-white p-2 mb-5"
    //       style={{ flex: 1 }}
    //       contentContainerStyle={styles.scrollViewContent}
    //       stickyHeaderIndices={[1]}
    //     >
    //       <View className="space-y-5 mb-5">
    //         <View className="space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             First Name
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Input
    //                 placeholder="Abdul"
    //                 value={value}
    //                 onChange={onChange}
    //               />
    //             )}
    //             name="firstName"
    //           />
    //           {errors.firstName && (
    //             <Text className="text-red-500">This is required.</Text>
    //           )}
    //         </View>
    //         <View className="space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             Last Name
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Input
    //                 placeholder="Basit"
    //                 value={value}
    //                 onChange={onChange}
    //               />
    //             )}
    //             name="lastName"
    //           />
    //           {errors.lastName && (
    //             <Text className="text-red-500">This is required.</Text>
    //           )}
    //         </View>
    //         <View className="space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             Mobile Number
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //               minLength: 12,
    //               maxLength: 12,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Input
    //                 placeholder="92xxxxxxxxxx"
    //                 value={value}
    //                 onChange={onChange}
    //               />
    //             )}
    //             name="mobileNumber"
    //           />
    //           {errors.mobileNumber && (
    //             <Text className="text-red-500">
    //             {errors.accountNumber.type === "required"
    //               ? "This is required."
    //               : "Invalid format or length (must be 12 characters)."}
    //           </Text>              )}
    //         </View>
    //         <View className="space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             CNIC
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //               minLength: 13,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Input
    //                 placeholder="xxxxx-xxxxxxx-x"
    //                 value={value}
    //                 onChange={onChange}
    //               />
    //             )}
    //             name="cnic"
    //           />
    //           {errors.cnic && (
    //             <Text className="text-red-500">
    //             {errors.accountNumber.type === "required"
    //               ? "This is required."
    //               : "Invalid format or length (min: 13 characters)."}
    //           </Text>
    //           )}
    //         </View>
    //         <View className="space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             Account Number
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //               minLength: 14,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Input
    //                 placeholder="PK36SCBL0000001123456702"
    //                 value={value}
    //                 onChange={onChange}
    //               />
    //             )}
    //             name="accountNumber"
    //           />
    //           {errors.accountNumber && (
    //             <Text className="text-red-500">
    //               {errors.accountNumber.type === "required"
    //                 ? "This is required."
    //                 : "Invalid format or length (min: 14 characters)."}
    //             </Text>
    //           )}
    //         </View>
    //         <View className="space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             Email
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Input
    //                 placeholder="abc@xyz.com"
    //                 value={value}
    //                 onChange={onChange}
    //               />
    //             )}
    //             name="email"
    //           />
    //           {errors.email && (
    //             <Text className="text-red-500">This is required.</Text>
    //           )}
    //         </View>
    //         <View className="space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             Password
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //               minLength: 10,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <InputWithIcon
    //                 isPassword={true}
    //                 value={value}
    //                 onChange={onChange}
    //                 placeholder="Password"
    //               />
    //             )}
    //             name="password"
    //           />
    //           {errors.password && (
    //             <Text className="text-red-500">
    //           {errors.password.type === "required"
    //             ? "This is required."
    //             : "Invalid format or length (min: 8 characters)."}
    //         </Text>
    //           )}
    //         </View>
    //         <View className="space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             User Name
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //               minLength: 6,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Input
    //                 placeholder="Basit123"
    //                 value={value}
    //                 onChange={onChange}
    //               />
    //             )}
    //             name="userName"
    //           />
    //           {errors.userName && (
    //             <Text className="text-red-500">
    //               {errors.userName.type === "required"
    //                 ? "This is required."
    //                 : "Invalid length (must be 6 characters)."}
    //             </Text>
    //           )}
    //         </View>
    //         <View className="space-y-1">
    //           <Text className="text-sm font-InterMedium text-text-gray">
    //             Security Picture
    //           </Text>
    //           <Controller
    //             control={control}
    //             rules={{
    //               required: true,
    //             }}
    //             render={({ field: { onChange, onBlur, value } }) => (
    //               <Input
    //                 placeholder="Pet Name"
    //                 value={value}
    //                 onChange={onChange}
    //               />
    //             )}
    //             name="securityPicture"
    //           />
    //           {errors.securityPicture && (
    //             <Text className="text-red-500">This is required.</Text>
    //           )}
    //         </View>
    //       </View>
    //       <View style={{ margin: 20 }}>
    //         <CustomButton Text="Sign up" onPress={handleSubmit(onSubmit)} />
    //       </View>

    //       <View className="p-4 items-center">
    //         <Text
    //           className="font-InterMedium"
    //           style={{ color: Color.primaryOrientTextColorGray }}
    //           onPress={handleLoginPress}
    //         >
    //           Already have an account? {""}
    //           <Text
    //             onPress={() => navigation.navigate("Login")}
    //             className="font-InterSemiBold"
    //             style={{ color: Color.PrimaryWebOrientTxtColor }}
    //           >
    //             Login Now
    //           </Text>
    //         </Text>
    //       </View>
    //     </ScrollView>
    //   </View>
    // </TouchableWithoutFeedback>

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
                      <Input placeholder="Enter your username" />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Password*</Text>
                      <InputWithIcon placeholder="Enter your password" isPassword />
                    </View>
                  </View>
                </View>

                <View className="mb-5">
                  <TouchableOpacity className="py-4 rounded-lg mb-4" style={{ backgroundColor: Color.PrimaryWebOrient }}>
                    <Text className="text-white text-base text-center font-medium font-InterSemiBold">Sign up</Text>
                  </TouchableOpacity>
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
                      <Input placeholder="Enter your CNIC" value={initialForm.cnic} onChange={(text) => handleChange('cnic', text)} />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Mobile Number*</Text>
                      <Input placeholder="Enter your mobile number" value={initialForm.mobile} onChange={(text) => handleChange('mobile', text)} />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Account Number*</Text>
                      <Input placeholder="Enter 14 digits Acc No." value={initialForm.accountNumber} onChange={(text) => handleChange('accountNumber', text)} />
                    </View>
                  </View>
                </View>

                <View className="mb-5">
                  <TouchableOpacity className="py-4 rounded-lg mb-4" style={{ backgroundColor: Color.PrimaryWebOrient }} onPress={handleNext}>
                    <Text className="text-white text-base text-center font-medium font-InterSemiBold">Next</Text>
                  </TouchableOpacity>
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
                      <Input placeholder="Enter your first name" value={returnedData.firstName} />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Last Name*</Text>
                      <Input placeholder="Enter your last name" value={returnedData.lastName} />
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm mb-2 font-InterMedium">Email Address*</Text>
                      <Input placeholder="Enter your email" value={returnedData.email} />
                    </View>
                  </View>
                </View>

                <View className="mb-5">
                  <TouchableOpacity className="py-4 rounded-lg mb-4" style={{ backgroundColor: Color.PrimaryWebOrient }} onPress={() => navigation.navigate('OTP', { source: 'registration' })}>
                    <Text className="text-white text-base text-center font-medium font-InterSemiBold">Next</Text>
                  </TouchableOpacity>
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

      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollViewContent: {
    padding: "1%",
  },
  loader: {
    width: wp("20%"),
    height: wp("20%"),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
});

export default Registration;