import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import Footer from "../../../components/Footer";
import Profile from "../../../assets/Images/ProfileIcon.png";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Update_Profile = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 ">
      <View
        className="h-24"
        style={{ backgroundColor: Color.PrimaryWebOrient }}
      >
        <View className="flex-row items-center justify-center h-full">
          <TouchableOpacity
            onPress={() => navigation.navigate("Account_Setting_List")}
            className="absolute left-5"
          >
            <Entypo name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Update Profile</Text>
        </View>
      </View>
      <ScrollView>
        <View className="flex-1 bg-gray-100">
          {/* Profile Picture */}
          <View className="items-center mt-6">
            <View className="relative">
              <Image
                source={Profile} // Replace with actual image URI
                className="w-24 h-24 rounded-full"
              />
              <TouchableOpacity className="absolute bottom-0 right-0  p-2 rounded-full">
                <MaterialIcons name="camera-alt" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-xl font-semibold mt-2">Mirza Uraib</Text>
          </View>

          {/* Account Info Section */}
          <View className="bg-white p-4 rounded-lg mx-6 mt-6 shadow-md">
            <View className="mb-4">
              <Text className="text-gray-500">Account</Text>
              <View className="flex-row justify-between items-center bg-gray-100 p-3 rounded-md mt-1">
                <TextInput
                  selectTextOnFocus={true} // This allows users to select and copy text easily
                  className="text-black flex-1"
                />
                <TouchableOpacity>
                  <MaterialIcons
                    name="content-copy"
                    size={20}
                    color={Color.PrimaryWebOrient}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-500">Mobile Number</Text>
              <View className="flex-row justify-between items-center bg-gray-100 p-3 rounded-md mt-1">
                <TextInput
                  selectTextOnFocus={true} // This allows users to select and copy text easily
                  className="text-black flex-1"
                />
                <TouchableOpacity>
                  <FontAwesome
                    name="pencil"
                    size={20}
                    color={Color.PrimaryWebOrient}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-500">Carrier</Text>
              <View className="bg-gray-100 p-3 rounded-md mt-1">
                <TextInput
                  selectTextOnFocus={true} // This allows users to select and copy text easily
                  className="text-black "
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-500">Email</Text>
              <View className="flex-row justify-between items-center bg-gray-100 p-3 rounded-md mt-1">
                <TextInput
                  selectTextOnFocus={true} // This allows users to select and copy text easily
                  className="text-black "
                />
                <TouchableOpacity>
                  <FontAwesome
                    name="pencil"
                    size={20}
                    color={Color.PrimaryWebOrient}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View className="p-4">
          <Button text="Update Changes" width="w-[100%]" styles="py-4" />
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default Update_Profile;
