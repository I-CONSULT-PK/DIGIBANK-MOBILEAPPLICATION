import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather';

import { Color } from '../GlobalStyles';

const OptionBox = ({ image, text, subtext, icon1, icon2,onPress1 }) => {
    return (
        <View className="flex-row justify-between items-center">
            <View className="flex-row items-center flex-1">
                <View className="p-3 rounded-lg shadow-lg shadow-gray-500 justify-center items-center bg-white">
                    <Image
                        source={image}
                        resizeMode="contain"
                        className="w-7 h-7"
                    />
                </View>
                <View className="ml-4 flex-1">
                    <Text className="font-InterSemiBold mb-0.5">{text}</Text>
                    <Text className="font-InterMedium text-xs text-gray-400">
                        {subtext}
                    </Text>
                </View>
            </View>
            {icon1 && <TouchableOpacity className="ml-2 p-2 rounded-full shadow-lg shadow-gray-500 justify-center items-center bg-white" onPress={onPress1}>
                <Feather name={icon1} size={22} color={Color.PrimaryWebOrient} />
            </TouchableOpacity>}
        </View>
    )
}

export default OptionBox