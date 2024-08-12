import React, { useState, useContext } from 'react'
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Keyboard
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color } from "../../GlobalStyles";
import Choice from "../../assets/Images/NewPassword.svg";
import CustomButton from "../../components/Button";
import InputWithIcon from "../../components/TextInputWithIcon";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';

import Button from '../../components/Button';

const ForgetPassword = ({ route }) => {
    const navigation = useNavigation();
    const screenHeight = Dimensions.get("window").height;
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { cnic, accountNumber } = route.params || {};

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleChangePassword = async () => {
        if (form.password === '' || form.confirmPassword === '') {
            Alert.alert('Error', 'Password can not be null');
        }
        else {
            if (form.password !== form.confirmPassword) {
                Alert.alert('Error', 'Password do not match');
            }
            else {
                setLoading(true);

                const data = {
                    accountNumber: accountNumber,
                    cnic: cnic,
                    password: form.password,
                }

                try {
                    const response = await axios.post(`${API_BASE_URL}/v1/customer/forgetPassword`, data);
                    const dto = response.data;

                    if (dto && dto.success && dto.data) {
                        navigation.navigate("Login");
                    }
                    else {
                        if (dto.message) {
                            Alert.alert('Error', dto.message);
                        }
                        else if (dto.errors && dto.errors.length > 0) {
                            Alert.alert('Error', dto.errors);
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
                }
                finally {
                    setLoading(false);
                }
            }
        }
    };

    return (
        // <SafeAreaView style={{ flex: 1, backgroundColor: Color.PrimaryWebOrientLayer2 }}>
        //     <ScrollView style={styles.container}>
        //         <LinearGradient
        //             colors={[Color.PrimaryWebOrientLayer2, Color.PrimaryWebOrientLayer2]}
        //             style={[styles.linearGradient, { height: screenHeight }]}
        //         >
        //             <Choice
        //                 fill={Color.PrimaryWebOrient}
        //                 style={{ alignSelf: "center", marginTop: 5 }}
        //             />
        //             <View style={styles.roundedContainer}>

        //                 <View className="justify-center text-center">
        //                     <Text className="font-InterBold text-center text-2xl">New Password</Text>
        //                     <Text className="text-sm text-center mt-3 font-InterMedium text-text-gray">
        //                         Enter New Password to Access your Account
        //                     </Text>
        //                 </View>

        //                 <View className="mt-5">
        //                     <View className="space-y-1 ">
        //                         <Text className="text-sm ml-2 font-InterMedium text-text-gray">
        //                             Enter New Password
        //                         </Text>
        //                         <Input
        //                             placeholder="Enter New Password"
        //                             secureTextEntry
        //                             control={control}
        //                             name="newPassword"
        //                             rules={{ required: true }}
        //                         />
        //                     </View>
        //                 </View>
        //                 <View className="mt-3">
        //                     <View className="space-y-1 ">
        //                         <Text className="text-sm ml-2 font-InterMedium text-text-gray">
        //                             Retype Password
        //                         </Text>
        //                         <Input
        //                             placeholder="Retype Password"
        //                             secureTextEntry
        //                             control={control}
        //                             name="retypePassword"
        //                             rules={{ required: true }}
        //                         />
        //                     </View>
        //                     <View style={{ margin: 8 }}>
        //                         <CustomButton text={"Reset"} onPress={() => navigation.navigate("Login")} />
        //                     </View>
        //                 </View>
        //             </View>
        //         </LinearGradient>
        //     </ScrollView>
        // </SafeAreaView>

        <SafeAreaView className="h-full flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View className="flex-row items-center p-4 mt-2">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={20} color="black" />
                    </TouchableOpacity>
                    <Text className="text-black font-semibold text-lg ml-4 font-InterSemiBold">Change password</Text>
                </View>

                <View className="flex-1 mt-4 px-4">
                    <View className="bg-white rounded-xl w-full shadow-xl shadow-slate-500 px-5 pt-6 pb-4">

                        <View className="mb-5">
                            <Text className="text-sm mb-2 font-InterMedium">New Password*</Text>
                            <InputWithIcon placeholder="Enter new password" isPassword value={form.password} onChange={(text) => handleChange('password', text)} onSubmitEditing={Keyboard.dismiss} />
                        </View>

                        <View className="mb-7">
                            <Text className="text-sm mb-2 font-InterMedium">Confirm Password*</Text>
                            <InputWithIcon placeholder="Confirm your password" isPassword value={form.confirmPassword} onChange={(text) => handleChange('confirmPassword', text)} onSubmitEditing={Keyboard.dismiss} />
                        </View>

                        <Button
                            text='Change Password'
                            width='w-[100%]'
                            styles='mb-4 py-4'
                            onPress={handleChangePassword}
                            loading={loading}
                        />
                    </View>
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#ffffff" style="dark" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    linearGradient: {
        width: "100%",
    },
    roundedContainer: {
        backgroundColor: "#fff",
        height: 0.9 * Dimensions.get("window").height,
        width: "100%",
        borderRadius: 20,
        padding: 20,
        alignSelf: "center",
        top: "5%",
    },
})

export default ForgetPassword;
