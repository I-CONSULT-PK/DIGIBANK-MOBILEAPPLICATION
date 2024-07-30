import React, { useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { Color } from "../../../GlobalStyles";
const Receive = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const handleBackPress = () => {
          // Manually navigate to the back screen
          navigation.goBack();
          return true;
        };
    
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        };
      }, []);
    return (
        <ScrollView className="bg-white">
            <View className="bg-white flex-1">
                <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
                    <Entypo
                        name="chevron-left"
                        size={30}
                        color="#090909"
                        marginTop={30}
                    />
                </TouchableOpacity>
                <View className="justify-center items-center p-3">
                    <Text className="font-InterBold text-2xl">Receive</Text>
                    <View>
                        <Text className="font-InterRegular  text-text-gray mt-5">
                            <Text className="font-InterMedium text-xl  mr-2"style={{ color:Color.PrimaryWebOrientTxtColor}}>Rs.375.000 </Text> 
                            incoming limit left this month
                        </Text>
                    </View>
                    
                </View>
                <View className="ml-5 py-2">
                    <Text className="font-semibold  text-lg " >Receive local transfers</Text>
                </View>
                <View className="flex-1  w-100  ml-5 mr-5 bg-background  rounded-2xl ">
                    <View className=" justify-start m-5 ">
                        <Text className="font-InterRegular text-base text-text-gray ">
                            My wallet account number
                        </Text>
                        <Text className=" font-semibold text-lg mt-1">0900786021</Text>
                        <View className="flex-row justify-start mt-3 ">
                            <Icon name='copy'  style={{ color: Color.PrimaryWebOrientLayer2}} size={30}/>
                        <Text className="font-InterMedium text-xl  ml-3"style={{ color:Color.PrimaryWebOrientTxtColor}}>Copy </Text> 
                        </View>
                        
                    </View>
                </View>
                <View className="ml-5  py-2">
                    <Text className="font-semibold  text-lg " >Receive international transfers</Text>
                </View>
                <View className="flex-1  w-100  ml-5 mr-5 bg-background  rounded-2xl ">
                    <View className=" justify-start m-5 ">
                        <Text className="font-InterRegular text-base text-text-gray ">
                            My wallet IBAN number
                        </Text>
                        <Text className=" font-semibold text-lg mt-1">PK61 WALLET 000 0031 2122 3878</Text>
                        <View className="flex-row justify-start mt-3 ">
                            <Icon name='copy' style={{ color: Color.PrimaryWebOrientLayer2}}  size={30}/>
                        <Text className="font-InterMedium text-xl ml-3"style={{ color:Color.PrimaryWebOrientTxtColor}}>Copy </Text> 
                        </View>
                        
                    </View>
                </View>
                
            </View>
        </ScrollView>
    )
}

export default Receive