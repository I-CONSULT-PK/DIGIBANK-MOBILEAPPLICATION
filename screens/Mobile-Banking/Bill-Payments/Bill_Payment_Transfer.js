import React, { useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const Bill_Payment_Transfer = ({ route }) => {
  const navigation = useNavigation();
  const { name, image,date, 
    referenceNumber, Consumer, amount } =
    route.params || {};
    const viewShotRef = useRef();

    const convertDriveUrl = (url) => {
      const fileId = url.match(/d\/(.*?)\//)[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
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
                      <Text className="text-black text-lg font-InterBold">Bill Payments</Text>
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
                              <Text className="text-center font-InterBold text-2xl"> {amount}
                              </Text>
                          </View>

                          <View className="items-center justify-center">
                              <Text className="text-center font-InterMedium">Sent to</Text>
                              <Image
                source={{ uri: convertDriveUrl(image) }}// Replace with PTCL logo
                className="w-12 h-12"
                resizeMode="contain"
              />
                              <Text className="font-InterSemiBold text-gray-700">{name}</Text>
                              <Text className="font-InterMedium text-gray-500 mt-0.5">{Consumer}</Text>
                          </View>

                          <View className="mt-6 px-6">
                              <Text className="text-base font-InterBold">Transaction Details</Text>

                              <View className="mt-4">
                                  
                                  <View className="flex-row justify-between mt-1">
                                      <Text className="font-InterMedium text-gray-500">Date / Time:</Text>
                                      <Text className="font-InterSemiBold text-gray-700">{date}</Text>
                                  </View>
                                  <View className="flex-row justify-between mt-1">
                                      <Text className="font-InterMedium text-gray-500">Reference N0:</Text>
                                      <Text className="font-InterSemiBold text-gray-700">{referenceNumber}</Text>
                                  </View>
                              
                              </View>
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
};

export default Bill_Payment_Transfer;
