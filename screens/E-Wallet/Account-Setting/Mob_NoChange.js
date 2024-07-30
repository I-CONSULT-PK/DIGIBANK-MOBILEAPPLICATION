import React ,{ useState, useEffect } from 'react';
import { Text, View,TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from "react-hook-form";
import Input from '../../../components/TextInput';
import CustomButton from '../../../components/Button';
const MobNoChange = () => {
    const navigation = useNavigation();
    const {
        control,
        formState: { errors },
      } = useForm();
    
      const [apiData, setApiData] = useState({
        success: false,
        message: '',
        data: {
          id: null,
          mobileNumber: '',       
        },
      });

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://192.168.0.196:9096/v1/customer/getCustomer/16');   
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setApiData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, []);
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
                    <Text className="font-InterBold text-2xl"> Change Mobile No</Text>
                </View>
                <View className="m-4">
                    <View className="justify-between  space-x-1">
                        <Text className="text-sm font-InterMedium text-text-gray">
                            Old Number
                        </Text>
                        <TextInput
                        editable={false}
                        className="bg-[#F4F5F9] text-[15px] h-14 m-1 p-2  rounded-md outline-1 "
                            value={apiData.data.mobileNumber}
                            onChangeText={(text) => {
                                setApiData((prevData) => ({
                                    ...prevData,
                                    data: { ...prevData.data, mobileNumber: text },
                                }));
                            }}
                        
                        />
                        {errors.OldNumber && (
                            <Text className="text-red-500">This is required.</Text>
                        )}
                    </View>
                    <View className="justify-between  space-x-1 mt-3">
                        <Text className="text-sm font-InterMedium text-text-gray">
                            New Number
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
                            name="NewNumber"
                        />
                        {errors.NewNumber && (
                            <Text className="text-red-500">This is required.</Text>
                        )}
                    </View>
                    <View className="justify-between  space-x-2 mt-3">
                        <Text className="text-sm font-InterMedium text-text-gray">
                            Retype New Number
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
                            name="RetypeNewNumber"
                        />
                        {errors.RetypeNewNumber && (
                            <Text className="text-red-500">This is required.</Text>
                        )}
                    </View>
                    <View className='p-5 mt-2'>
                        <CustomButton Text={'Save'} onPress={() => navigation.navigate("AccountSetting")} />
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}
export default MobNoChange