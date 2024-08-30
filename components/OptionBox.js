import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const OptionBox = ({ beneObj, image, text, subtext, payment, icon1, icon2, onPress1, onPress2, iconColor1, iconColor2, beneficiary, toggleModal, navigation, source }) => {
    return (
        <View className="flex-row justify-between items-center">
            {(source === 'payment' || source === 'dashboard') ? (
                <TouchableOpacity className="flex-row items-center flex-1" onPress={() => navigation.navigate('SendFromAccount', { beneObj })}>
                    <View className="p-1.5 rounded-lg shadow-md shadow-gray-300 justify-center items-center bg-white">
                        <Image
                            source={image}
                            resizeMode="contain"
                            className="w-10 h-10"
                        />
                    </View>
                    <View className="ml-4 flex-1">
                        <Text className="font-InterSemiBold mb-0.5">{text}</Text>
                        {subtext && (<Text className="font-InterMedium text-xs text-gray-400">
                            {subtext}
                        </Text>)}
                    </View>
                </TouchableOpacity>) 
                : beneficiary ? (
                    <View className="flex-row items-center flex-1">
                        <TouchableOpacity className="p-0 rounded-lg shadow-md shadow-gray-300 justify-center items-center bg-white relative" onPress={toggleModal}>
                            <Image
                                source={image}
                                resizeMode="contain"
                                className="w-12 h-12"
                            />
                            <View className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md shadow-gray-400">
                                <Feather name="edit-2" size={11.5} color="black" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="ml-3 flex-1" onPress={() => navigation.navigate('SendFromAccount', { beneObj })}>
                            <Text className="font-InterSemiBold mb-0.5">{text}</Text>
                            {subtext && (<Text className="font-InterMedium text-xs text-gray-400">
                                {subtext}
                            </Text>)}
                            {payment && (
                                <View className="flex-row mt-1 flex-1 items-center">
                                    <Text className="font-InterRegular text-[11px] text-gray-400">Last Payment: </Text>
                                    <View className="bg-gray-300 rounded-full px-2 justify-center">
                                        <Text className="font-InterRegular text-[10px] text-gray-500">{payment}</Text>
                                    </View>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                <TouchableOpacity className="flex-row items-center flex-1" onPress={onPress1}>
                    <View className="p-1.5 rounded-lg shadow-md shadow-gray-300 justify-center items-center bg-white">
                        <Image
                            source={image}
                            resizeMode="contain"
                            className="w-10 h-10"
                        />
                    </View>
                    <View className="ml-4 flex-1">
                        <Text className="font-InterSemiBold mb-0.5">{text}</Text>
                        {subtext && (<Text className="font-InterMedium text-xs text-gray-400">
                            {subtext}
                        </Text>)}
                    </View>
                </TouchableOpacity>)}

            {(source !== 'payment' && source !== 'dashboard') && icon1 && <TouchableOpacity className="ml-2 p-2 rounded-full shadow-md shadow-gray-300 justify-center items-center bg-white" onPress={onPress1}>
                <AntDesign name={icon1} size={icon2 ? 19 : 20} color={iconColor1} />
            </TouchableOpacity>}

            {(source !== 'payment' && source !== 'dashboard') && icon2 && <TouchableOpacity className="ml-2 p-2 rounded-full shadow-md shadow-gray-300 justify-center items-center bg-white" onPress={onPress2}>
                <Feather name={icon2} size={icon2 ? 19 : 20} color={iconColor2} />
            </TouchableOpacity>}
        </View>
    )
}

export default OptionBox
