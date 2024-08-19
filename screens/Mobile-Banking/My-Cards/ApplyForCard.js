import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  BackHandler,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../../components/Footer";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "../../../components/Button";

const ApplyForCard = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("Salaried");
  const [selected, setSelected] = React.useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const banks = [
    { key: "1", value: "Standard Chartered Bank" },
    { key: "2", value: "HBL (Habib Bank Limited)" },
    { key: "3", value: "UBL (United Bank Limited)" },
    { key: "4", value: "MCB Bank" },
    { key: "5", value: "Bank Alfalah" },
  ];

  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handlePaymentMethodSelect = (selectedPaymentMethod) => {
    if (selectedOption === "Salaried") {
      navigation.navigate("Salaried", {
        selectedOption: selectedOption,
        selectedPaymentMethod: selectedPaymentMethod,
      });
    } else if (selectedOption === "Self-Employed") {
      navigation.navigate("Self-Employed", {
        selectedOption: selectedOption,
        selectedPaymentMethod: selectedPaymentMethod,
      });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const handleBackPress = () => {
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafc] h-full">
      <ScrollView>
        <View>
          <TouchableOpacity onPress={handleBack} className="mt-12 ml-5">
            <Entypo name="chevron-left" size={30} color="#090909" />
          </TouchableOpacity>
          <Text className="text-2xl text-center mt-5 font-bold">
            Apply for Card
          </Text>
          <View className="flex flex-row justify-center w-4/5 h-18 my-5 mx-auto" style={styles.container}>
            <TouchableOpacity
              className={`flex-1 p-3 bg-white w-16 h-12 rounded-l-lg ${
                selectedOption === "Salaried"
                  ? "bg-primary shadow-lg"
                  : "shadow-sm"
              }`}
              style={{}}
              onPress={() => handleOptionChange("Salaried")}
            >
              <Text
                className={`text-center font-bold ${
                  selectedOption === "Salaried" ? "text-white" : "text-black"
                }`}
              >
                Salaried
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 p-3 bg-white w-16 h-12 rounded-r-lg ${
                selectedOption === "Self-Employed"
                  ? "bg-primary shadow-lg"
                  : "shadow-sm"
              }`}
              onPress={() => handleOptionChange("Self-Employed")}
            >
              <Text
                className={`text-center font-bold ${
                  selectedOption === "Self-Employed"
                    ? "text-white"
                    : "text-black"
                }`}
              >
                Self Employed
              </Text>
            </TouchableOpacity>
          </View>

          {selectedOption === "Salaried" && (
            <View>
              <View className="flex flex-col px-5 py-7 bg-white rounded-xl shadow-lg max-w-md mx-auto">
                <View>
                  <Text className="font-bold">Employment information</Text>
                </View>
                <View className="mt-2.5">
                  <Text className="text-sm font-medium text-neutral-500">
                    Required to access your eligibility
                  </Text>
                </View>
                <View className="mt-9">
                  <Text className="text-sm font-medium text-zinc-600">
                    Enter your Employer name
                  </Text>
                  <TextInput className="mt-2" placeholder="Enter Here" />
                </View>

                <View className="mt-5">
                  <Text className="text-sm font-medium text-zinc-600">
                    Select your Bank
                  </Text>
                </View>
                <View>
                  <View className="text-sm font-medium text-zinc-600">
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={banks}
                      save="value"
                      placeholder="Select your Bank"
                      boxStyles={{ marginTop: 10 }}
                      dropdownStyles={{ borderColor: "gray", borderWidth: 1 }}
                    />
                  </View>
                </View>
                <View className="mt-6">
                  <Text className="text-sm font-medium text-zinc-600">
                    Enter your IBAN number
                  </Text>
                  <TextInput className="mt-2" placeholder="Enter Here" />
                </View>

                <View className="mt-7 rounded-lg">
                  <Text className="text-sm font-medium text-zinc-600">
                    Select your Job vintage
                  </Text>

                  <View className="flex-row space-x-2 mt-3">
                    {[
                       { id: 1, label: "0 - 1 years" },
                       { id: 2, label: "1 - 2 years" },
                       { id: 3, label: "> 6 years" },
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
                        className="py-2 px-4 border-2 rounded-lg">
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
              </View>

              <View className="p-5">
                <CustomButton
                  Text={"Next"}
                  onPress={() => navigation.navigate("CashUpCard")}
                />
              </View>
            </View>
          )}

          {selectedOption === "Self-Employed" && (
            <View>
              <View className="flex flex-col px-5 py-7 bg-white rounded-xl shadow-lg max-w-md mx-auto">
                <View>
                  <Text className="font-bold">Employment information</Text>
                </View>
                <View className="mt-2.5">
                  <Text className="text-sm font-medium text-neutral-500">
                    Required to access your eligibility
                  </Text>
                </View>
                <View className="py-1 mt-6">
                  <View>
                    <Text className="text-sm font-medium text-zinc-600">
                      Select your Job type
                    </Text>
                  </View>

                  {/* Container to align radio buttons and labels in a row */}
                  <View className="flex flex-row justify-between mt-2.5">
                    {/* Radio Button for Self Employed */}
                    <View className="flex flex-row items-center gap-3">
                      <TouchableOpacity
                        onPress={() => setSelectedJob("Self Employed")}
                        className="flex items-center justify-center"
                      >
                        <View
                          style={{
                            borderColor:
                              selectedJob === "Self Employed"
                                ? Color.PrimaryWebOrient
                                : "gray",
                            backgroundColor:
                              selectedJob === "Self Employed"
                                ? Color.PrimaryWebOrient
                                : "white",
                          }}
                          className="flex items-center justify-center rounded-full border h-5 w-5"
                        >
                          {selectedJob === "Self Employed" && (
                            <View className="bg-white rounded-full h-3 w-3" />
                          )}
                        </View>
                      </TouchableOpacity>
                      <Text className="text-sm font-medium text-neutral-500">
                        Self Employed
                      </Text>
                    </View>

                    {/* Radio Button for With Organization */}
                    <View className="flex flex-row items-center gap-3">
                      <TouchableOpacity
                        onPress={() => setSelectedJob("With Organization")}
                        className="flex items-center justify-center"
                      >
                        <View
                          style={{
                            borderColor:
                              selectedJob === "With Organization"
                                ? Color.PrimaryWebOrient
                                : "gray",
                            backgroundColor:
                              selectedJob === "With Organization"
                                ? Color.PrimaryWebOrient
                                : "white",
                          }}
                          className="flex items-center justify-center rounded-full border h-5 w-5"
                        >
                          {selectedJob === "With Organization" && (
                            <View className="bg-white rounded-full h-3 w-3" />
                          )}
                        </View>
                      </TouchableOpacity>
                      <Text className="text-sm font-medium text-neutral-500">
                        With Organization
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="mt-4">
                  <Text className="text-sm font-medium text-zinc-600">
                    Enter your Employer name
                  </Text>
                  <TextInput className="mt-2" placeholder="Enter Here" />
                </View>

                <View className="mt-5">
                  <Text className="text-sm font-medium text-zinc-600">
                    Select your Bank
                  </Text>
                </View>
                <View>
                  <View className="text-sm font-medium text-zinc-600">
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={banks}
                      save="value"
                      placeholder="Select your Bank"
                      boxStyles={{ marginTop: 10 }}
                      dropdownStyles={{ borderColor: "gray", borderWidth: 1 }}
                    />
                  </View>
                </View>
                <View className="mt-6">
                  <Text className="text-sm font-medium text-zinc-600">
                    Enter your IBAN number
                  </Text>
                  <TextInput className="mt-2" placeholder="Enter Here" />
                </View>

                

                <View className="mt-7 rounded-lg">
                  <Text className="text-sm font-medium text-zinc-600">
                    Select your Job vintage
                  </Text>

                  <View className="flex-row space-x-2 mt-3">
                    {[
                      { id: 1, label: "0 - 1 years" },
                      { id: 2, label: "1 - 2 years" },
                      { id: 3, label: "5 - 7 years" },
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
              </View>

              <View className="p-5">
                <CustomButton
                  Text={"Next"}
                  onPress={() => navigation.navigate("CashUpCard")}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    elevation: 10,
  },
});


export default ApplyForCard;
