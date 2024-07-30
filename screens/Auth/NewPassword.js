import React, { useState, useContext } from 'react'
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Color } from "../../GlobalStyles";
import Choice from "../../assets/Images/NewPassword.svg";
import CustomButton from "../../components/Button";
import Input from "../../components/TextInput";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

const ForgetPassword = () => {
    const navigation = useNavigation();
    const screenHeight = Dimensions.get("window").height;
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.PrimaryWebOrientLayer2 }}>
            <ScrollView style={styles.container}>
                <LinearGradient
                    colors={[Color.PrimaryWebOrientLayer2, Color.PrimaryWebOrientLayer2]}
                    style={[styles.linearGradient, { height: screenHeight }]}
                >
                    <Choice
                        fill={Color.PrimaryWebOrient}
                        style={{ alignSelf: "center", marginTop: 5 }}
                    />
                    <View style={styles.roundedContainer}>

                        <View className="justify-center text-center">
                            <Text className="font-InterBold text-center text-2xl">New Password</Text>
                            <Text className="text-sm text-center mt-3 font-InterMedium text-text-gray">
                                Enter New Password to Access your Account
                            </Text>
                        </View>

                        <View className="mt-5">
                            <View className="space-y-1 ">
                                <Text className="text-sm ml-2 font-InterMedium text-text-gray">
                                    Enter New Password
                                </Text>
                                <Input
                                    placeholder="Enter New Password"
                                    secureTextEntry
                                    control={control}
                                    name="newPassword"
                                    rules={{ required: true }}
                                />
                            </View>
                        </View>
                        <View className="mt-3">
                            <View className="space-y-1 ">
                                <Text className="text-sm ml-2 font-InterMedium text-text-gray">
                                    Retype Password
                                </Text>
                                <Input
                                    placeholder="Retype Password"
                                    secureTextEntry
                                    control={control}
                                    name="retypePassword"
                                    rules={{ required: true }}
                                />
                            </View>
                            <View style={{ margin: 8 }}>
                                <CustomButton Text={"Reset"} onPress={() => navigation.navigate("Login")} />
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
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
