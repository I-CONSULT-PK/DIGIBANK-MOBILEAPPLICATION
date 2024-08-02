import React from 'react'
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";

const StartSection = ({navigation}) => {
    return (
        <SafeAreaView className="flex-1 h-full">
            <LinearGradient
                colors={['#1DBBD8', '#8EEDFF']}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ height: "100%" }}>

                    <View className="flex flex-col justify-between h-full">

                        <View className="w-full flex justify-center items-center mt-2">
                            <Image source={require('../../assets/logo.png')} resizeMode='contain' className="w-40 h-40 left-2" />
                        </View>

                        <View>
                            <View className="w-full flex justify-center items-center">
                                <Image source={require('../../assets/mobile.png')} resizeMode='contain' className="w-[340px] h-[340px]" />
                            </View>

                            <View className="w-full bg-white rounded-t-3xl py-8">
                                <View className="px-16">
                                    <Text className="text-center text-2xl font-InterBold">Welcome in Digi-Bank</Text>
                                    <Text className="text-center text-base font-InterRegular text-gray-500 mt-4">Get sending, spending and saving with your contactless card.</Text>
                                </View>

                                <View className="mt-10 flex flex-row justify-between px-16">
                                    <TouchableOpacity className="border border-solid border-primary py-3 px-8 rounded-lg" onPress={() => navigation.navigate("Login")}>
                                        <Text className="text-base font-InterMedium text-primary">Login</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity className="py-3 px-12 bg-[#1DBBD8] rounded-lg" onPress={() => navigation.navigate("SignUp")}>
                                        <Text className="text-base font-InterMedium text-white">Get Started</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                    
                </ScrollView>
            </LinearGradient>

            <StatusBar backgroundColor="#1DBBD8" style="light" />
        </SafeAreaView>
    )
}

export default StartSection