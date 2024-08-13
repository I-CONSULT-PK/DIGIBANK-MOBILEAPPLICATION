import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

import { Color } from '../../../GlobalStyles';
import SearchBar from '../../../components/SearchBar';
import OptionBox from '../../../components/OptionBox';
import Footer from '../../../components/Footer';

import UBLLogo from '../../../assets/ubl-logo.png';
import AlliedLogo from '../../../assets/allied-logo.png';
import MCBLogo from '../../../assets/mcb-logo.png';
import HBLLogo from '../../../assets/hbl-logo.png';
import MeezanLogo from '../../../assets/meezan-logo.png';
import HabibMetroLogo from '../../../assets/habib-metro-logo.png';
import SoneriLogo from '../../../assets/soneri-logo.png';

const BankList = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const banks = [
        {
            image: UBLLogo,
            text: 'United Bank Limited',
        },
        {
            image: AlliedLogo,
            text: 'Allied Bank Limited',
        },
        {
            image: MCBLogo,
            text: 'MCB Bank',
        },
        {
            image: HBLLogo,
            text: 'Habib Bank Limited',
        },
        {
            image: MeezanLogo,
            text: 'Meezan Bank',
        },
        {
            image: HabibMetroLogo,
            text: 'Habib Metropolitan Bank Limited',
        },
        {
            image: SoneriLogo,
            text: 'Soneri Bank',
        }
    ];

    const filteredBanks = banks.filter(bank =>
        bank.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <SafeAreaView className="h-full flex-1" style={{backgroundColor: Color.PrimaryWebOrient}}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <LinearGradient
                    colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
                    style={{ height: 100 }}>
                    <View className="flex-row items-center justify-center w-full h-full">
                        <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-5">
                            <Entypo name="chevron-left" size={23} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white font-semibold text-lg font-InterSemiBold">Select Bank</Text>
                    </View>
                </LinearGradient>

                <View className="w-full h-full px-6 bg-[#F5F5F5] pb-10">
                    <View className="mt-6">
                        <SearchBar 
                            placeholder='Search bank name'
                            onChangeText={setSearchQuery}
                            value={searchQuery} />
                    </View>

                    <View className="mt-7">

                    {filteredBanks.map((bank, index) => (
                            <React.Fragment key={index}>
                                <OptionBox
                                    image={bank.image}
                                    text={bank.text}
                                    icon1='arrowright'
                                    iconColor1={Color.PrimaryWebOrient}
                                    onPress1={() => {navigation.navigate('Add_Beneficiary')}}
                                />
                                <View className="my-4 w-full border-b border-gray-300" />
                            </React.Fragment>
                        ))}

                    </View>
                </View>
            </ScrollView>
            <Footer />
            <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
        </SafeAreaView>
    )
}

export default BankList