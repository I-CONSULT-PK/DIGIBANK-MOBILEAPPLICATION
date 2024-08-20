import React from 'react'
import { View, TouchableOpacity, TextInput } from 'react-native'
import Feather from '@expo/vector-icons/Feather';

import { Color } from '../GlobalStyles';

const SearchBar = ({ placeholder, onChangeText, value }) => {
    return (
        <View className="relative">
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className="px-4 py-3 rounded-lg bg-white shadow-md shadow-gray-200 font-InterRegular pr-10"
                style={{ paddingRight: 40 }}
            />
            <TouchableOpacity
                className="absolute right-0 top-0 bottom-0 justify-center items-center pr-3"
                style={{ width: 40, height: '100%' }}
            >
                <Feather name="search" size={20} color={Color.PrimaryWebOrient} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar