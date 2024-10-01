import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';

const BeneficiarySuccess = ({ route, navigation }) => {
    const { beneficiaryName, bankLogo } = route.params || {};

    useEffect(() => {
        const handleNavigation = () => navigation.navigate('BeneficiaryList');

        setTimeout(() => {
            handleNavigation();
        }, 3000);
    }, []);

    return (
        <View className="h-full flex-1 bg-[#F9FAFC]">
            <View className="flex-1 justify-center items-center -top-5">
                <View>
                    <Image source={require('../../../assets/success.png')} resizeMode='contain' />
                </View>

                <View className="px-5 mt-14">
                    <Text className="text-2xl font-InterBold text-center">Beneficiary Added Successfully</Text>
                </View>

                <View className="mt-16 shadow-md shadow-slate-400">
                    <Image source={{ uri: bankLogo }} resizeMode='contain' className="w-14 h-14 rounded-lg" />
                </View>

                <View className="mt-3 items-center justify-center">
                    <Text className="font-InterMedium">You have successfully added</Text>
                    <Text className="text-primary font-InterBold">{beneficiaryName}</Text>
                    <Text className="font-InterMedium">as a beneficiary</Text>
                </View>
            </View>

            <StatusBar backgroundColor="#F9FAFC" style="dark" />
        </View>
    )
}

export default BeneficiarySuccess