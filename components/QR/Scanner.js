import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Share,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyQrCodeImage from "../../assets/Images/MyQRCode.png";
import TextInput from "../TextInput";
import Button from "../Button";
import * as ImagePicker from "expo-image-picker";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from "../../config";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const ScannerScreen = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [recieveMoney, setReceiveMoney] = useState(false);
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("staticQR");

  const [hasPermissionn, setHasPermissionn] = useState(null);
  const [torchOn, setTorchOn] = useState(false);

  const qrCodeRef = useRef();

  const fetchUserDetails = async () => {
    try {
      const customerId = await AsyncStorage.getItem("customerId");
      const bearerToken = await AsyncStorage.getItem("token");

      if (customerId && bearerToken) {
        const response = await axios.get(
          `${API_BASE_URL}/v1/customer/fetchUserDetails?userId=${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        const dto = response.data;

        if (dto && dto.success && dto.data) {
          setUserDetails(dto.data);
        } else {
          if (dto.message) {
            Alert.alert("Error", dto.message);
          } else if (dto.errors && dto.errors.length > 0) {
            Alert.alert("Error", dto.errors.join("\n"));
          }
        }
      } else {
        Alert.alert("Error", "Unexpected error occurred. Try again later!");
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          Alert.alert("Error", "Server timed out. Try again later!");
        } else if (statusCode === 503) {
          Alert.alert("Error", "Service unavailable. Please try again later.");
        } else if (statusCode === 400) {
          Alert.alert("Error", error.response.data.data.errors[0]);
        } else {
          Alert.alert("Error", error.message);
        }
      } else if (error.request) {
        Alert.alert(
          "Error",
          "No response from the server. Please check your connection."
        );
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  // Request permission for camera access
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermissionn(status === "granted");
    })();
    fetchUserDetails();
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

    try {
      // Parse the scanned data as JSON
      const accountData = JSON.parse(data);

      // Check if the parsed data has the necessary fields
      if (
        accountData.accountNumber &&
        accountData.beneficiaryName &&
        accountData.bankUrl
      ) {
        // Navigate to the next screen with the data
        navigation.navigate("SendFromAccount", { beneObj: accountData });
      } else {
        alert("Invalid QR Code data");
      }
    } catch (error) {
      alert("Failed to parse QR Code");
    }
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

  // const ScannerScreen = () => {
  //   const qrCodeRef = useRef();

  //   const saveQrToGallery = async () => {
  //     try {
  //       // Request permission to save to gallery
  //       const { status } = await MediaLibrary.requestPermissionsAsync();
  //       if (status !== "granted") {
  //         Alert.alert(
  //           "Permission required",
  //           "You need to grant gallery permissions to save the QR code."
  //         );
  //         return;
  //       }

  //       // Capture the QR code view as an image
  //       const uri = await qrCodeRef.current.capture();

  //       // Save the file to the gallery
  //       const asset = await MediaLibrary.createAssetAsync(uri);
  //       await MediaLibrary.createAlbumAsync("QRCode", asset, false);

  //       Alert.alert("Success", "QR code saved to gallery!");
  //     } catch (error) {
  //       Alert.alert("Error", "Failed to save QR code: " + error.message);
  //       console.log(error.message);
  //     }
  //   };
  // }

  const saveQrToGallery = async () => {
    try {
      // Request permission to access the media library
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "You need to grant gallery permissions to save the QR code."
        );
        return;
      }

      // Capture the view
      const uri = await qrCodeRef.current.capture();

      // Save the file to the gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("QRCode", asset, false);

      Alert.alert("Success", "QR code saved to gallery!");
    } catch (error) {
      Alert.alert("Success", "QR code saved to gallery!");
    }
  };

  const shareQrCode = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "You need to grant gallery permissions to share the QR code."
        );
        return;
      }

      const uri = await qrCodeRef.current.capture();
      console.log("Captured URI:", uri);

      await Share.share({
        url: uri,
        message: "Here is my QR code!",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share QR code: " + error.message);
      console.log("Error:", error.message);
    }
  };

  const accountData = {
    accountNumber: userDetails && userDetails.accountNumber,
    beneficiaryName:
      userDetails && userDetails.firstName + " " + userDetails.lastName,
    bankUrl: userDetails && userDetails.bankImage,
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
          <View className="flex-row bg-gray-100 rounded-full mb-6">
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
              <ViewShot
                ref={qrCodeRef}
                options={{ format: "png", quality: 0.9 }}
              >
                <View className="items-center bg-white">
                  <Text className="text-lg font-bold">Your Digi Bank QR</Text>
                  <Text className="text-center text-gray-500 mt-2 px-6 mb-6">
                    Share this QR Code with the sender or they can scan it from
                    your phone to receive money through QR Scan
                  </Text>
                  <QRCode value={JSON.stringify(accountData)} size={200} />
                  <Text className="text-lg font-semibold mt-4">
                    {userDetails &&
                      userDetails.firstName + " " + userDetails.lastName}
                  </Text>
                  <Text className="text-gray-500 mb-2">
                    {userDetails && userDetails.accountNumber}
                  </Text>
                </View>
              </ViewShot>

              {/* Buttons */}
              <View className="flex-row justify-around mt-8 w-full">
                <TouchableOpacity
                  className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full px-4 py-2"
                  onPress={saveQrToGallery}
                >
                  <Ionicons name="download-outline" size={20} color="black" />
                  <Text className="ml-2 text-black">Save to Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={shareQrCode}
                  className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full px-4 py-2"
                >
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
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1"
            >
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
              >
                <View className="flex-1 items-center justify-center -top-8">
                  <View className="items-center justify-center">
                    <Text className="text-lg font-bold">
                      Create your custom Digi Bank QR
                    </Text>
                    <Text className="text-center text-gray-500 mt-2">
                      Enter amount below to create a custom QR for any amount
                      you want.
                    </Text>
                  </View>

                  <View className="mt-2">
                    <TextInput
                      placeholder="Enter Amount Here."
                      keyboardType="numeric"
                      className="border border-gray-300 p-3 w-40 rounded-md mb-5 mt-5"
                    />
                  </View>

                  <Button text="Generate QR Now" styles="p-5" />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScannerScreen;
