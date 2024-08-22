import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Color } from "../../../GlobalStyles";
import { CheckBox } from "react-native-elements";

const SupplementaryCard = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedJob, setSelectedJob] = useState("");
  const [checked, setChecked] = useState(false);
  const handleSelect = (id) => {
    setSelectedId(id);
  };
  const handlePress = () => {
    // Handle link press here, e.g., open a URL
  };

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
            <View>
              <Text className="font-bold text-lg">Just a few details</Text>
            </View>
            <View className="mt-2.5 ">
              <Text className="text-sm font-medium text-neutral-500">
                To access your eligibility of your Supplementary card holder.
              </Text>
              <View className="mt-4">
                <Text className="font-bold text-lg">
                  Who are you applying for?
                </Text>
                <View className="flex-row space-x-2 mt-3">
                  {[
                    { id: 1, label: "Sibling" },
                    { id: 2, label: "Parent" },
                    { id: 3, label: "Spouse" },
                    { id: 4, label: "Child" },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      onPress={() => handleSelect(option.id)}
                      style={{
                        backgroundColor:
                          selectedId === option.id
                            ? Color.PrimaryWebOrient
                            : "white",
                        borderColor:
                          selectedId === option.id
                            ? Color.PrimaryWebOrient
                            : "gray",
                      }}
                      className="py-2 px-4 border-2 rounded-lg"
                    >
                      <Text
                        style={{
                          color: selectedId === option.id ? "white" : "black",
                        }}
                        className="text-left"
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View>
                <View className="py-1 mt-4">
                  <View className="">
                    <Text className="text-sm font-medium text-zinc-600">
                      Are You A PAK Resident ?
                    </Text>
                  </View>

                  {/* Container to align radio buttons and labels in a row */}
                  <View className="flex flex-row justify-between mt-2.5">
                    {/* Radio Button for Self Employed */}
                    <View className="flex flex-row items-center gap-3">
                      <TouchableOpacity
                        onPress={() => setSelectedJob("PAK Resident")}
                        className="flex items-center justify-center"
                      >
                        <View
                          style={{
                            borderColor:
                              selectedJob === "PAK Resident"
                                ? Color.PrimaryWebOrient
                                : "gray",
                            backgroundColor:
                              selectedJob === "PAK Resident"
                                ? Color.PrimaryWebOrient
                                : "white",
                          }}
                          className="flex items-center justify-center rounded-full border h-5 w-5"
                        >
                          {selectedJob === "PAK Resident" && (
                            <View className="bg-white rounded-full h-3 w-3" />
                          )}
                        </View>
                      </TouchableOpacity>
                      <Text className="text-sm font-medium text-neutral-500">
                        PAK Resident
                      </Text>
                    </View>

                    {/* Radio Button for With Organization */}
                    <View className="flex flex-row items-center gap-3">
                      <TouchableOpacity
                        onPress={() => setSelectedJob("Non Resident")}
                        className="flex items-center justify-center"
                      >
                        <View
                          style={{
                            borderColor:
                              selectedJob === "Non Resident"
                                ? Color.PrimaryWebOrient
                                : "gray",
                            backgroundColor:
                              selectedJob === "Non Resident"
                                ? Color.PrimaryWebOrient
                                : "white",
                          }}
                          className="flex items-center justify-center rounded-full border h-5 w-5"
                        >
                          {selectedJob === "Non Resident" && (
                            <View className="bg-white rounded-full h-3 w-3" />
                          )}
                        </View>
                      </TouchableOpacity>
                      <Text className="text-sm font-medium text-neutral-500">
                        Non Resident
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="justify-between">
                  <View className="py-1 mt-4">
                    <Text className="text-base font-semibold mb-2">
                      Verify your Supplementary’s ID
                    </Text>
                    <TouchableOpacity className="flex-row items-center border  border-cyan-300 rounded-lg bg-cyan-50 p-4">
                      <Image
                        source={require("../../../assets/apply-card.png")}
                        className="w-10 h-10 mr-3"
                      />
                      <View>
                        <Text className="text-lg text-black font-semibold ">
                          Upload Your National ID
                        </Text>
                        <Text className="text-sm text-gray-500">
                          Max file size is 5MB (JPEG, PNG, PDF)
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="px-10 mt-14">
          <View className="flex flex-row items-center">
            <CheckBox
              checked={checked}
              onPress={() => setChecked(!checked)}
              containerclassName="p-0 m-0"
            />
            <Text className="text-gray-700">
              I have read through the{" "}
              <TouchableOpacity onPress={handlePress}>
                <Text className="underline text-gray-700 font-bold ml-1">
                  KFS Statement
                </Text>
              </TouchableOpacity>
            </Text>
          </View>

          <TouchableOpacity
            className="py-3 rounded-lg mt-4"
            style={{
              backgroundColor: checked ? Color.PrimaryWebOrient : "#D9D9D9",
            }}
            onPress={() => {
              if (checked)
                navigation.navigate("SupplementaryCardCustomization");
            }}
            disabled={!checked}
          >
            <Text
              className={`text-base text-center font-medium ${
                checked ? "text-white" : "text-gray-500"
              }`}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupplementaryCard;
