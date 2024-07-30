import React ,{ useEffect } from 'react';
import { Text, View, StyleSheet,Color, ScrollView } from 'react-native';
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from "react-hook-form";
import Input from '../../../components/TextInput';
import CustomButton from '../../../components/Button';
const Nic_DateChange = () => {
    const navigation = useNavigation();
    const {
        control,
        // handleSubmit,
        formState: { errors },
      } = useForm();
    
      useEffect(() => {}, []);
    return (
        <ScrollView className="bg-white">
            <View className='bg-white flex-1'>

                <TouchableOpacity onPress={() => navigation.navigate("AccountSetting")}>
                    <Entypo
                        name="chevron-left"
                        size={30}
                        color="#090909"
                        marginTop={40}
                    />
                </TouchableOpacity>
                <View className="justify-center items-center p-3">
                    <Text className="font-InterBold text-2xl"> Change CNIC Date</Text>
                </View>
                <View className="m-5">
                    <View className="justify-between  space-x-3">
                        <Text className="text-sm font-InterMedium text-text-gray">
                            New Expiry Date
                        </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    // placeholder={"eg. Abdul"}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                            name="NewExpiryDate"
                        />
                      
                    </View>
                </View>
                <View className='p-5 mt-2'>
                        <CustomButton Text={'Save'} onPress={() => navigation.navigate("AccountSetting")} />
                    </View>
            </View>
        </ScrollView>
    )
}
export default Nic_DateChange