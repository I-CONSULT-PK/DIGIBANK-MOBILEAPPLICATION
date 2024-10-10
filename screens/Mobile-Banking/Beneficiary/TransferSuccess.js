import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from "expo-status-bar";
import { Entypo } from '@expo/vector-icons'
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import { Color } from "../../../GlobalStyles";

const TransferSuccess = ({ navigation, route }) => {
    const { amount, beneObj, currency, dateTime, ref, bankCharges } = route.params || {};
    const viewShotRef = useRef();

    const maskAccountNumber = (accountNumber) => {
        if (accountNumber && accountNumber.length > 4) {
            const last4Digits = accountNumber.slice(-4);
            const maskedNumber = "*".repeat(accountNumber.length - 4) + last4Digits;
            return maskedNumber;
        }
        return accountNumber;
    };

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);

        // Extracting date components
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        // Extracting time components
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        return `${day} ${month}, ${year} ${hours}:${minutes} ${ampm}`;
    };

    // Function to share the receipt
    const shareReceipt = async () => {
        try {
            // Introduce a delay of 500ms (or adjust as needed) to allow button press effects to complete
            setTimeout(async () => {
                // Capture the view as an image
                const uri = await viewShotRef.current.capture();

                // Request permission to access the media library
                const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status === 'granted') {
                    // Save the image to the media library
                    const asset = await MediaLibrary.createAssetAsync(uri);

                    // Share the captured image
                    await Sharing.shareAsync(asset.uri);
                } else {
                    console.error("Media library permissions not granted");
                }
            }, 500); // Delay in milliseconds
        } catch (error) {
            console.error("Error sharing receipt:", error);
        }
    };

    // Function to save the screenshot to gallery
    const saveScreenshot = async () => {
        try {
            // Introduce a delay of 500ms (or adjust as needed) to allow button press effects to complete
            setTimeout(async () => {
                // Capture the view as an image
                const uri = await viewShotRef.current.capture();

                // Request permission to access the media library
                const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status === 'granted') {
                    // Save the image to the media library
                    await MediaLibrary.createAssetAsync(uri);
                    Alert.alert('Success', 'Screenshot saved to gallery');
                } else {
                    console.error("Media library permissions not granted");
                }
            }, 500); // Delay in milliseconds
        } catch (error) {
            console.error("Error saving screenshot:", error);
        }
    };

    return (
        <SafeAreaView className="h-full flex-1 bg-[#F9FAFC]">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ height: 80 }}>
                    <View className="flex-row items-center justify-center w-full h-full">
                        <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-5">
                            <Entypo name="chevron-left" size={25} color="black" />
                        </TouchableOpacity>
                        <Text className="text-black text-lg font-InterBold">Payment</Text>
                    </View>
                </View>

                <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1 }}>
                    <View className="flex flex-col bg-white rounded-lg py-5 w-[90%] m-auto mt-7 shadow-md shadow-slate-400">
                        <View className="shadow-md shadow-slate-400 bg-white rounded-full p-2 absolute left-[37%] -top-10 items-center justify-center">
                            <Image source={require('../../../assets/check.png')} resizeMode='contain' className="w-18 h-18" />
                        </View>
                        <View className="mt-9">
                            <Text className="text-lg font-InterBold text-center text-green-500">
                                Transfer Successful
                            </Text>
                            <Text className="text-center font-InterMedium text-gray-500">
                                Your transaction was successful
                            </Text>

                            <View className="mt-6 mb-4 px-3">
                                <Text className="text-center font-InterBold text-2xl">{currency} {amount}</Text>
                            </View>

                            <View className="items-center justify-center">
                                <Text className="text-center font-InterMedium">Sent to</Text>
                                <Image source={{ uri: beneObj.bankUrl }} resizeMode='contain' className="w-14 h-14 my-1.5 rounded-lg" />
                                <Text className="font-InterSemiBold text-gray-700">{beneObj.beneficiaryName}</Text>
                                <Text className="font-InterSemiBold text-gray-500 mt-0.5">{maskAccountNumber(beneObj.accountNumber)}</Text>
                            </View>

                            <View className="mt-6 px-6">
                                <Text className="text-base font-InterBold">Transaction Details</Text>

                                <View className="mt-4">
                                    <View className="flex-row justify-between">
                                        <Text className="font-InterMedium text-gray-500">Payment:</Text>
                                        <Text className="font-InterMedium text-gray-700">{currency} {amount}</Text>
                                    </View>
                                    <View className="flex-row justify-between mt-1">
                                        <Text className="font-InterMedium text-gray-500">Date / Time:</Text>
                                        <Text className="font-InterMedium text-gray-700">{formatDateTime(dateTime)}</Text>
                                    </View>
                                    <View className="flex-row justify-between mt-1">
                                        <Text className="font-InterMedium text-gray-500">Transaction ID:</Text>
                                        <Text className="font-InterMedium text-gray-700">{ref}</Text>
                                    </View>
                                    <View className="flex-row justify-between mt-1">
                                        <Text className="font-InterMedium text-gray-500">Fee:</Text>
                                        <Text className="font-InterMedium text-gray-700">{currency} {bankCharges}</Text>
                                    </View>
                                </View>
                            </View>

                            <View className="border-t border-gray-400 border-dashed self-center w-[90%] my-5" />

                            <View className="flex-row justify-between px-6">
                                <Text className="text-base font-InterSemiBold">TOTAL</Text>
                                <Text className="text-base font-InterSemiBold" style={{ color: Color.PrimaryWebOrient }}>{currency} {amount + bankCharges}</Text>
                            </View>

                            <View className="mt-6 flex-row justify-between px-10">
                                <TouchableOpacity onPress={saveScreenshot}>
                                    <Image source={require('../../../assets/screenshot-icon.png')} resizeMode='contain' className="w-6 h-6" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={shareReceipt}>
                                    <Image source={require('../../../assets/share-icon.png')} resizeMode='contain' className="w-6 h-6" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                    <Image source={require('../../../assets/tick-icon.png')} resizeMode='contain' className="w-6 h-6" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ViewShot>
            </ScrollView>

            <StatusBar backgroundColor="#F9FAFC" style="dark" />
        </SafeAreaView>
    )
}

export default TransferSuccess