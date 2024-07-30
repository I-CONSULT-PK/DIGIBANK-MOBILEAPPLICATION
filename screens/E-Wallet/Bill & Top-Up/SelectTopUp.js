import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { Color } from "../../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import TelenorIcon from "../../../assets/Images/Telenor.svg";
import ZongIcon from "../../../assets/Images/Zong.svg";
import UfoneIcon from "../../../assets/Images/Ufone.svg";
import JazzIcon from "../../../assets/Images/Jazz.svg";
import Warid from "../../../assets/Images/Warid.svg";

const NetworkItem = ({ label, selected, onPress, network }) => {
  const getNetworkIcon = () => {
    switch (network) {
      case "Telenor":
        return <TelenorIcon style={styles.networkIcon} />;
      case "Zong":
        return <ZongIcon style={styles.networkIcon} />;
      case "Ufone":
        return <UfoneIcon style={styles.networkIcon} />;
      case "Jazz":
        return <JazzIcon style={styles.networkIcon} />;
      case "Warid":
        return <Warid style={styles.networkIcon} />;
      default:
        return null;
    }
  };
  useEffect(() => {
    const handleBackPress = () => {
      // Manually navigate to the home screen
      navigation.navigate("BillPaymentTopUp");
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.NetworkItem, selected && styles.selectedNetworkItem]}
    >
      {getNetworkIcon()}
      <Text style={[styles.NetworkLabel, { color: "#A5A7A8" }]}>{label}</Text>
      {selected && <Entypo name="check" size={24} color="green" />}
    </TouchableOpacity>
  );
};

const SelectTopUp = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("PrePaid");
  const [selectedNetwork, setSelectedNetwork] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    // Navigate to the next page directly when a network is selected
    navigation.navigate("TopUp");
  };
  const handleAddMoreClick = () => {
    openOptionsMenu();
  };
  useEffect(() => {
    const handleBackPress = () => {
      // Manually navigate to the home screen
      navigation.navigate("Wallet");
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View className="mb-24">
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              styles.PrePaidOption,
              selectedOption === "PrePaid" && styles.selectedOption,
            ]}
            onPress={() => handleOptionChange("PrePaid")}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === "PrePaid" && styles.selectedOptionText,
              ]}
            >
              Pre-Paid
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              styles.PostPaidOption,
              selectedOption === "PostPaid" && styles.selectedOption,
            ]}
            onPress={() => handleOptionChange("PostPaid")}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === "PostPaid" && styles.selectedOptionText,
              ]}
            >
              Post-Paid
            </Text>
          </TouchableOpacity>
        </View>

        {selectedOption === "PrePaid" && (
          <View>
            <Text style={styles.networkSelectText}>Select Network</Text>
            <View style={{ marginBottom: 20 }}></View>

            <NetworkItem
              label="Telenor"
              selected={selectedNetwork === "Telenor"}
              onPress={() => handleNetworkSelect("Telenor")}
              network="Telenor"
            />

            <NetworkItem
              label="Jazz"
              selected={selectedNetwork === "Jazz"}
              onPress={() => handleNetworkSelect("Jazz")}
              network="Jazz"
            />
            <NetworkItem
              label="Warid"
              selected={selectedNetwork === "Warid"}
              onPress={() => handleNetworkSelect("Warid")}
              network="Warid"
            />
            <NetworkItem
              label="Ufone"
              selected={selectedNetwork === "Ufone"}
              onPress={() => handleNetworkSelect("Ufone")}
              network="Ufone"
            />

            <NetworkItem
              label="Zong"
              selected={selectedNetwork === "Zong"}
              onPress={() => handleNetworkSelect("Zong")}
              network="Zong"
            />
          </View>
        )}

        {selectedOption === "PostPaid" && (
          <View>
            <Text style={styles.networkSelectText}>Select Network</Text>
            <View style={{ marginBottom: 20 }}></View>
            <NetworkItem
              label="Telenor"
              selected={selectedNetwork === "Telenor"}
              onPress={() => handleNetworkSelect("Telenor")}
              network="Telenor"
            />
            <NetworkItem
              label="Jazz"
              selected={selectedNetwork === "Jazz"}
              onPress={() => handleNetworkSelect("Jazz")}
              network="Jazz"
            />
            <NetworkItem
              label="Warid"
              selected={selectedNetwork === "Warid"}
              onPress={() => handleNetworkSelect("Warid")}
              network="Warid"
            />
            <NetworkItem
              label="Ufone"
              selected={selectedNetwork === "Ufone"}
              onPress={() => handleNetworkSelect("Ufone")}
              network="Ufone"
            />
            <NetworkItem
              label="Zong"
              selected={selectedNetwork === "Zong"}
              onPress={() => handleNetworkSelect("Zong")}
              network="Zong"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  headerText: {
    fontFamily: "InterBold",
    fontSize: 24,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  option: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#E0E5E6",
  },
  PrePaidOption: {
    height: 45,
    flex: 0.4,
  },
  PostPaidOption: {
    height: 45,
    flex: 0.4,
  },
  selectedOption: {
    backgroundColor: Color.PrimaryWebOrient,
    borderColor: Color.PrimaryWebOrient,
  },
  selectedOptionText: {
    color: "white",
  },
  optionText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  networkSelectText: {
    fontFamily: "InterMedium",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  NetworkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginLeft: 20,
    width: 310,
    height: 50,
    backgroundColor: "#F4F5F9",
    borderRadius: 10,
    marginBottom: 20,
  },
  NetworkLabel: {
    flex: 1,
    fontSize: 16,
  },
  networkIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    justifyContent: "flex-end",
  },
  selectedNetworkItem: {
    borderColor: "#1EBBD7",
    borderWidth: 2,
  },
});

export default SelectTopUp;
