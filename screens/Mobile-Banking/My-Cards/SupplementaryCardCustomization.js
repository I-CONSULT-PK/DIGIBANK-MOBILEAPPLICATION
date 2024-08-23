import { Text, View, Image } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import TextInput from "../../../components/TextInput";
import ListSectionCard from "../../../assets/ListSectionCard.svg";

import Button from "../../../components/Button";

const SupplementaryCardCustomization = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1  bg-[#f9fafc]">
      <ScrollView>
        <View>
          <View className="flex-row items-center justify-center w-full mt-10">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
            <Text className="font-InterBold text-2xl">Supplementary Card</Text>
          </View>
        </View>
        <View className="flex-1 justify-center items-center shadow-gray-200">
          <View className="w-11/12 max-w-md p-5 py-7 bg-white rounded-xl shadow-lg mt-4">
            <Text className="font-bold text-2xl">
              Personalize Your Supplementary card
            </Text>
            <ListSectionCard width={330} />
            <View className="mt-4">
              <Text className="text-sm font-medium text-zinc-600">
                Name On The Card
              </Text>
              <TextInput className="mt-2" placeholder="Ahmed Ali" />
            </View>
            <View className="mt-4">
              <Text className="text-sm font-medium text-zinc-600">
                Delivery address
              </Text>
              <TextInput
                className="mt-2"
                placeholder="Village, Sheikh.Moh, Haji Abad"
              />
            </View>
          </View>
        </View>
        <View className="px-10 mt-14">
          <Button
            text="Confirm and proceed "
            width="w-[100%]"
            styles="mb-4 py-3"
            onPress={() => navigation.navigate("SupplementaryCardLimitSplit")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupplementaryCardCustomization;
