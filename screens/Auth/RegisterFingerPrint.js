import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import API_BASE_URL from '../../config/index';
import ReactNativeBiometrics from 'react-native-biometrics';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterFingerPrint = ({ route }) => {
  const navigation = useNavigation();
  const rnBiometrics = new ReactNativeBiometrics();

  const { pin, customerId } = route.params || {};
  const [key, setKey] = useState(null);

  const getDeviceTypeString = (deviceType) => {
    switch (deviceType) {
      case Device.DeviceType.PHONE:
        return 'Phone';
      case Device.DeviceType.TABLET:
        return 'Tablet';
      case Device.DeviceType.TV:
        return 'TV';
      case Device.DeviceType.DESKTOP:
        return 'Desktop';
      case Device.DeviceType.UNKNOWN:
      default:
        return 'Unknown';
    }
  };

  const enableBiometricAccess = async () => {
    try {
      const resultObject = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' });
      const { success } = resultObject;

      if (success) {
        let publicKey = key;

        const resultObject = await rnBiometrics.biometricKeysExist();
        const { keysExist } = resultObject;

        if (!keysExist) {
          const createKeyResult = await rnBiometrics.createKeys();
          publicKey = createKeyResult.publicKey; 
          setKey(publicKey); 
        }

        const deviceName = Device.deviceName;
        const deviceType = Device.deviceType;
        const uniqueId =
          Platform.OS === 'android'
            ? await Application.getAndroidId()
            : await Application.getIosIdForVendorAsync();
        const osn = Device.osName;
        const osv = Device.osVersion;
        const modelName = Device.modelName;
        const manufacturer = Device.manufacturer;

        const payload = {
          deviceName: deviceName,
          deviceType: getDeviceTypeString(deviceType),
          unique: uniqueId,
          osv_osn: osn + "-" + osv,
          modelName: modelName,
          manufacture: manufacturer,
          devicePin: pin,
          publicKey: publicKey
        };

        try {
          const response = await axios.post(`${API_BASE_URL}/api/devices/deviceRegister/${customerId}`, payload);

          const dto = response.data;

          if (dto && dto.success && dto.data) {
            const deviceTableId = dto.data.toString();
            await AsyncStorage.setItem('deviceTableId', deviceTableId);

            Alert.alert("Success", dto.message);

            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }, 1000);
          }
          else {
            if (dto.message) {
              Alert.alert('Error', dto.message);
            }
            else if (dto.errors && dto.errors.length > 0) {
              Alert.alert('Error', dto.errors);
            }
          }
        } catch (error) {
          if (error.response) {
            const statusCode = error.response.status;

            if (statusCode === 404) {
              Alert.alert('Error', 'Server timed out. Try again later!');
            } else if (statusCode === 503) {
              Alert.alert('Error', 'Service unavailable. Please try again later.');
            } else if (statusCode === 400) {
              Alert.alert('Error', error.response.data.data.errors[0]);
            } else {
              Alert.alert('Error', error.message);
            }
          } else if (error.request) {
            Alert.alert('Error', 'No response from the server. Please check your connection.');
          } else {
            Alert.alert('Error', error.message);
          }
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Biometrics failed. Try again!');
    }
  };

  return (
    <SafeAreaView className="h-full flex-1 bg-white">
      <TouchableOpacity onPress={() => navigation.navigate("ChooseSecurity")}>
        <Entypo
          name="chevron-left"
          size={wp("8%")}
          color="#000"
          marginTop={hp("5%")}
        />
      </TouchableOpacity>
      <View className="flex-1 justify-between">
        <View className="flex-1 justify-center items-center -top-14">
          <Text className="text-2xl font-semibold text-center ">
            Enable biometric Access
          </Text>
          <Text className="text-base text-center mt-2 mb-4 px-8">
            Login quickly and securely with the fingerprint stored on this
            device.
          </Text>
          <Image
            source={require("../../assets/Shape.png")}
            resizeMode="contain"
            style={{ width: "45%", height: undefined, aspectRatio: 1 }}
            className="mt-4"
          />
          <View className=" mt-10 px-4">
            <Button
              text="Enable Biometric Access"
              width="w-[100%]"
              styles="px-5"
              onPress={enableBiometricAccess}
            />
          </View>
        </View>
      </View>
      <StatusBar backgroundColor="#ffffff" style="dark" />
    </SafeAreaView>
  );
};

export default RegisterFingerPrint;
