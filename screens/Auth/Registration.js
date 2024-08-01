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
import AntDesign from '@expo/vector-icons/AntDesign';

const Registration = () => {
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

  const [main, setMain] = useState(true);

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

    <SafeAreaView className="flex-1 h-full">
      <LinearGradient
        colors={['#1DBBD8', '#8EEDFF']}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>

          <View className="w-full flex flex-row justify-start items-center pl-5 mt-4">
            <TouchableOpacity onPress={() => {
              setMain(true);
              main === true && navigation.goBack();
            }}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-InterMedium text-base ml-4">Sign-Up</Text>
          </View>

          <View className="w-full h-full bg-white mt-5 rounded-t-3xl">

            {main ? (<View className="flex flex-col justify-between h-[75%]">
              <View>
                <View className="pl-12 pr-32 py-10">
                  <Text className="text-2xl font-InterBold">Get started with your account!</Text>
                </View>

                <View className="px-10">
                  <View>
                    <Text className="text-sm font-InterRegular mb-2">First Name*</Text>
                    <Input placeholder="Enter your first name" />
                  </View>

                  <View className="mt-5">
                    <Text className="text-sm font-InterRegular mb-2">Last Name*</Text>
                    <Input placeholder="Enter your last name" />
                  </View>

                  <View className="mt-5">
                    <Text className="text-sm font-InterRegular mb-2">Email Address*</Text>
                    <Input placeholder="Enter your email" />
                  </View>
                </View>
              </View>

              <View className="px-10">
                <TouchableOpacity className="py-3 px-12 bg-[#1DBBD8] rounded-lg" onPress={() => setMain(false)}>
                  <Text className="text-base text-center font-InterMedium text-white">Next</Text>
                </TouchableOpacity>
              </View>
            </View>) : (
                <View className="flex flex-col justify-between h-[75%]">
                  <View>
                    <View className="pl-12 pr-32 py-10">
                      <Text className="text-2xl font-InterBold">Get started with your account!</Text>
                    </View>

                    <View className="px-10">
                      <View>
                        <Text className="text-sm font-InterRegular mb-2">CNIC Number*</Text>
                        <Input placeholder="Enter your CNIC" />
                      </View>

                      <View className="mt-5">
                        <Text className="text-sm font-InterRegular mb-2">Mobile Number*</Text>
                        <Input placeholder="Enter your mobile number" />
                      </View>

                      <View className="mt-5">
                        <Text className="text-sm font-InterRegular mb-2">Account Number*</Text>
                        <Input placeholder="Enter 14 digits Acc No." />
                      </View>
                    </View>
                  </View>

                  <View className="px-10">
                    <TouchableOpacity className="py-3 px-12 bg-[#1DBBD8] rounded-lg">
                      <Text className="text-base text-center font-InterMedium text-white">Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

          </View>

        </ScrollView>
      </LinearGradient>
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