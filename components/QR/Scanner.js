import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyQrCodeImage from "../../assets/Images/MyQRCode.png";
import TextInput from "../TextInput";
import Button from "../Button";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [recieveMoney, setReceiveMoney] = useState(false);
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("staticQR");

  const [hasPermissionn, setHasPermissionn] = useState(null);
  const [torchOn, setTorchOn] = useState(false);

  // Request permission for camera access
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermissionn(status === "granted");
    })();
  }, []);

  // Toggle the torch
  const toggleTorch = async () => {
    if (hasPermissionn) {
      setTorchOn(!torchOn);
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar Code with type ${type} and data ${data} has been scanned!`);
    // You can navigate or handle the scanned data here
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const toggleTab = () => {
    setReceiveMoney(!recieveMoney);
  };

  const openGallery = async () => {
    // Ask for permission to access the gallery
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri); // You can use the selected image URI here
      // Handle the selected image (e.g., upload it or display it)
    }
  };

  return (
    <SafeAreaView className=" bg-[#f9fafc]" style={{ flex: 1 }}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Digi Bank QR Code</Text>
        <TouchableOpacity>
          <Text className="text-sm text-gray-600">Help</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Selection */}
      <View className="flex-row justify-around bg-white py-2">
        <TouchableOpacity onPress={toggleTab}>
          <Text
            className={`${
              recieveMoney
                ? "text-gray-500"
                : "text-primary  border-b-2 border-primary  font-semibold"
            }`}
          >
            Pay or Send Money
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTab}>
          <Text
            className={`${
              !recieveMoney
                ? "text-gray-500"
                : "text-primary  border-b-2 border-primary font-semibold"
            }`}
          >
            Receive Money
          </Text>
        </TouchableOpacity>
      </View>

      {!recieveMoney ? (
        <>
          <View className="bg-black justify-around items-center py-4">
            <Text className="text-white text-base mt-1 ">
              {" "}
              Scan any of the folling QR Codes{" "}
            </Text>
            <Text className="text-white text-base mt-1 font-semibold ">
              Digi Bank | VISA | MasterCard | Raast
            </Text>
          </View>

          {/* Scanner Area */}
          <View className="flex-1 items-center justify-center bg-gray-200">
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: "100%", width: "100%" }}
            />
            <Image
              source={require("../../assets/scan.png")}
              className="absolute h-56 w-56"
            />
          </View>

          {/* Bottom Menu */}
          <View className="bg-black flex-row justify-around items-center py-4">
            <TouchableOpacity onPress={toggleTorch} className="items-center">
              <Ionicons
                name={torchOn ? "flashlight" : "flashlight-outline"}
                size={30}
                color="white"
              />
              <Text className="text-white text-xs mt-1">
                {torchOn ? "Torch On" : "Torch Off"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" onPress={openGallery}>
              <Ionicons name="image" size={30} color="white" />
              <Text className="text-white text-xs mt-1">Scan from Gallery</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 bg-white items-center px-4 py-6">
          {/* Tab Navigation */}
          <View className="flex-row bg-gray-100 rounded-full  mb-6">
            <TouchableOpacity
              className={`flex-1 items-center py-2 rounded-full ${
                selectedTab === "staticQR" ? "bg-primary" : "bg-transparent"
              }`}
              onPress={() => setSelectedTab("staticQR")}
            >
              <Text
                className={`text-sm ${
                  selectedTab === "staticQR" ? "text-white" : "text-black"
                }`}
              >
                My Static QR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 items-center py-2 rounded-full ${
                selectedTab === "createQR" ? "bg-primary" : "bg-transparent"
              }`}
              onPress={() => setSelectedTab("createQR")}
            >
              <Text
                className={`text-sm ${
                  selectedTab === "createQR" ? "text-white" : "text-black"
                }`}
              >
                Create QR
              </Text>
            </TouchableOpacity>
          </View>

          {selectedTab === "staticQR" && (
            <>
              {/* QR Code Area */}
              <Text className="text-lg font-bold">Your Digi Bank QR</Text>
              <Text className="text-center text-gray-500 mt-2">
                Share this QR Code with sender or they can scan it from your
                phone to receive money through RAAST
              </Text>

              <View className="my-6">
                <Image source={MyQrCodeImage} className="w-48 h-48" />
              </View>

              <Text className="text-lg font-semibold">ZAFAR HUSSAIN</Text>
              <Text className="text-gray-500">MSISDN: ******1120</Text>

              {/* Buttons */}
              <View className="flex-row justify-around mt-8 w-full">
                <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full px-4 py-2">
                  <Ionicons name="download-outline" size={20} color="black" />
                  <Text className="ml-2 text-black">Save to Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full px-4 py-2">
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color="black"
                  />
                  <Text className="ml-2 text-black">Share QR Code</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {selectedTab === "createQR" && (
            <View className="flex-1 items-center justify-center">
              <View className=" items-center justify-center -top-10">
                <Text className="text-lg font-bold">
                  Create your custom Digi Bank QR
                </Text>
                <Text className="text-center text-gray-500 mt-2">
                  Enter amount below to create a custom QR for any amount you
                  want.
                </Text>
              </View>

              <View className="mt-2">
                <TextInput
                  placeholder="Enter Amount Here..."
                  keyboardType="numeric"
                  className="border border-gray-300 p-3 rounded-md"
                  width="w-[90%]"
                />
              </View>

              <Button
                text="Generate QR Now"
                width="w-[70%]"
                styles="py-3 px-4 mt-8 mx-auto"
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScannerScreen;
