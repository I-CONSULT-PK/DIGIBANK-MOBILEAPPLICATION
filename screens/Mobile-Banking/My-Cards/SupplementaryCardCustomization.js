import { Text, View, Image } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import TextInput from "../../../components/TextInput";
import ListSectionCard from "../../../assets/ListSectionCard.svg";

const SupplementaryCardCustomization = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1  bg-[#f9fafc]">
      <ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("SelectApplyOptionCard")}
            className="mt-9 ml-5"
          >
            <Entypo name="chevron-left" size={30} color="#090909" />
          </TouchableOpacity>
          <Text className="text-2xl text-center  font-bold">
            Supplementary Card
          </Text>
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
          <TouchableOpacity
            className="py-3 px-12 bg-[#1DBBD8] rounded-lg"
            onPress={() => navigation.navigate("SupplementaryCardLimitSplit")} >
            <Text className="text-base text-center font-InterMedium text-white">
            Confirm and proceed 
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupplementaryCardCustomization;
