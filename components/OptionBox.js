import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const OptionBox = ({ 
    image, text, subtext, payment, icon1, icon2, 
    onPress1, onPress2, iconColor1, iconColor2, 
    beneficiary, onPressName 
}) => {
    return (
        <View className="flex-row justify-between items-center">
            <View className="flex-row items-center flex-1">
                {beneficiary ? (
                    <TouchableOpacity 
                        className="p-2 rounded-lg shadow-lg shadow-gray-500 justify-center items-center bg-white relative"
                        onPress={onPressName}
                    >
                        <Image
                            source={image}
                            resizeMode="contain"
                            className="w-9 h-9"
                        />
                        <View className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-lg shadow-gray-400">
                            <Feather name="edit-2" size={11.5} color="black" />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View className="p-3 rounded-lg shadow-lg shadow-gray-500 justify-center items-center bg-white">
                        <Image
                            source={image}
                            resizeMode="contain"
                            className="w-7 h-7"
                        />
                    </View>
                )}
                <View className={`${beneficiary ? 'ml-3' : 'ml-4'} flex-1`}>
                    <TouchableOpacity onPress={onPressName}>
                        <Text className="font-InterSemiBold mb-0.5">{text}</Text>
                    </TouchableOpacity>
                    {subtext && (
                        <Text className="font-InterMedium text-xs text-gray-400">
                            {subtext}
                        </Text>
                    )}
                    {payment && (
                        <View className="flex-row mt-1 flex-1 items-center">
                            <Text className="font-InterRegular text-[11px] text-gray-400">Last Payment: </Text>
                            <View className="bg-gray-300 rounded-full px-2 justify-center">
                                <Text className="font-InterRegular text-[10px] text-gray-500">{payment}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
            {icon1 && (
                <TouchableOpacity 
                    className="ml-2 p-2 rounded-full shadow-lg shadow-gray-500 justify-center items-center bg-white" 
                    onPress={onPress1}
                >
                    <AntDesign name={icon1} size={icon2 ? 19 : 20} color={iconColor1} />
                </TouchableOpacity>
            )}
            {icon2 && (
                <TouchableOpacity 
                    className="ml-2 p-2 rounded-full shadow-lg shadow-gray-500 justify-center items-center bg-white" 
                    onPress={onPress2}
                >
                    <Feather name={icon2} size={icon2 ? 19 : 20} color={iconColor2} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default OptionBox;
