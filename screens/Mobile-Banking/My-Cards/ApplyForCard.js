import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  BackHandler,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../../components/Footer";
import { Color } from "../../../GlobalStyles";
import TextInput from "../../../components/TextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../../config";
import { SelectList } from "react-native-dropdown-select-list";

const ApplyForCard = ({ route }) => {
  const navigation = useNavigation();
  const {} = route.params || {};
  const [selectedOption, setSelectedOption] = useState("Salaried");
  const [EmpName, setEmpName] = useState("");
  const [IbanNumber, setIbanNumber] = useState("");
  const [banks, setBanks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [jobVintage, setJobVintage] = useState(null);
  const [errors, setErrors] = useState({}); // State for managing errors

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const bearerToken = await AsyncStorage.getItem("token");
        if (!bearerToken) {
          Alert.alert("Error", "Token not found. Please login again.");
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/v1/customer/fund/getBanks`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        if (response.data.success && Array.isArray(response.data.data)) {
          const bankList = response.data.data
            .map((bank) => {
              if (bank.bankName) {
                return {
                  key: bank.bankCode, // Use bankCode for the key
                  value: bank.bankName, // Use bankName as the display value
                };
              } else {
                console.warn("Bank entry is missing bankName:", bank);
                return null; // Return null for missing entries
              }
            })
            .filter(Boolean); // Remove null entries

          setBanks(bankList);
        } else {
          Alert.alert("Error", "Unexpected error occurred.");
        }
      } catch (error) {
        console.error(
          "Error fetching banks:",
          error.response ? error.response.data : error.message
        );
        Alert.alert("Error", "An unexpected error occurred.");
      }
    };

    fetchBanks();
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleJobVintageSelect = (option) => {
    setJobVintage(option.label);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    // Validation logic
    const newErrors = {};
    if (!EmpName) newErrors.EmpName = "Please enter your employer name.";
    if (!selectedId) newErrors.selectedId = "Please select your bank.";
    if (!jobVintage) newErrors.jobVintage = "Please select your job vintage.";

    setErrors(newErrors);

    // Check if any error exists
    if (Object.keys(newErrors).length === 0) {
      // No errors, navigate to next screen
      navigation.navigate("CashUpCard", {
        empName: EmpName,
        selectedBankId: selectedId,
        jobVintage: jobVintage,
      });
    } else {
      // Show alert for missing fields
      Alert.alert("Error", "Please fill all required fields.");
    }
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
          <View className="flex-row items-center justify-center w-full mt-10">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
            <Text className="font-InterBold text-2xl">Apply for Card</Text>
          </View>

          <View
            className="flex flex-row justify-center w-4/5 h-18 my-5 mx-auto"
            style={styles.container}
          >
            <TouchableOpacity
              className={`flex-1 p-3 bg-white w-16 h-12 rounded-l-lg ${
                selectedOption === "Salaried"
                  ? "bg-primary shadow-lg"
                  : "shadow-sm"
              }`}
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
              <View className="flex flex-col px-5 py-7 bg-white rounded-xl shadow-lg ">
                <Text className="font-bold">Employment information</Text>
                <Text className="text-sm font-medium text-neutral-500">
                  Required to access your eligibility
                </Text>

                <Text className="mt-9 text-sm font-medium text-zinc-600">
                  Enter your Employer name
                </Text>
                <TextInput
                  className="mt-2"
                  placeholder="Enter Here"
                  value={EmpName}
                  onChange={(text) => setEmpName(text)}
                />
                {errors.EmpName && (
                  <Text className="text-red-500">{errors.EmpName}</Text>
                )}

                <Text className="mt-5 text-sm font-medium text-zinc-600">
                  Select your Bank
                </Text>
                <SelectList
                  setSelected={handleSelect}
                  data={banks}
                  save="key"
                  placeholder="Select your Bank"
                  boxStyles={{ marginTop: 10 }}
                  dropdownStyles={{ borderColor: "gray", borderWidth: 1 }}
                />
                {errors.selectedId && (
                  <Text className="text-red-500">{errors.selectedId}</Text>
                )}

                <Text className="mt-6 text-sm font-medium text-zinc-600">
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
                      onPress={() => handleJobVintageSelect(option)} // Use the new handler
                      style={{
                        backgroundColor:
                          jobVintage === option.label
                            ? Color.PrimaryWebOrient
                            : "white",
                        borderColor:
                          jobVintage === option.label
                            ? Color.PrimaryWebOrient
                            : "gray",
                      }}
                      className="py-2 px-4 border-2 rounded-lg"
                    >
                      <Text
                        style={{
                          color:
                            jobVintage === option.label ? "white" : "black",
                        }}
                        className="text-left"
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.jobVintage && (
                  <Text className="text-red-500">{errors.jobVintage}</Text>
                )}
              </View>

              <View className="p-5 items-center">
                <Button
                  text="Next"
                  width="w-[90%]"
                  styles="mb-4 py-4"
                  onPress={handleNext} // Use the validation handler
                />
              </View>
            </View>
          )}

          {selectedOption === "Self-Employed" && (
            <View>{/* Add similar structure for Self-Employed option */}</View>
          )}
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

export default ApplyForCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 5,
  },
});
