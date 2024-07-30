import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, BackHandler } from "react-native";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import Bank from "../../../assets/Images/bank.svg";
import AddBank from "../../../assets/Images/AddBank.svg";
import Remittence from "../../../assets/Images/Remittence.svg";
import Paypal from "../../../assets/Images/Paypal.svg";
import WorldRemit from "../../../assets/Images/WorldRemit.svg";
import RiaMoneyTransfer from "../../../assets/Images/RiaMoneyTransfer.svg";
import { Color } from "../../../GlobalStyles";
import { Fontisto } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SendMoney = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("Domestic");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handlePaymentMethodSelect = (selectedPaymentMethod) => {
    if (selectedOption === "Domestic") {
      navigation.navigate("Domestic", {
        selectedOption: selectedOption,
        selectedPaymentMethod: selectedPaymentMethod,
      });
    } else if (selectedOption === "International") {
      navigation.navigate("International", {
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
      // Manually navigate to the back screen
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);
  

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleBack}>
          <Entypo
            name="chevron-left"
            size={wp("7%")}
            style={{
              color: Color.PrimaryWebOrient,
            }}
            marginTop={hp("5%")}
            marginLeft={wp("2%")}
          />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Send Money to</Text>
        </View>

        <View className="flex flex-row justify-center w-100 h-24 my-3"
>
          <TouchableOpacity
            style={[
              styles.option,
              styles.domesticOption,
              selectedOption === "Domestic" && styles.selectedOption,
            ]}
            onPress={() => handleOptionChange("Domestic")}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === "Domestic" && styles.selectedOptionText,
              ]}
            >
              Domestic
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              styles.internationalOption,
              selectedOption === "International" && styles.selectedOption,
            ]}
            onPress={() => handleOptionChange("International")}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === "International" && styles.selectedOptionText,
              ]}
            >
              International
            </Text>
          </TouchableOpacity>
        </View>

        {selectedOption === "Domestic" && (
          <View>
            <Text style={styles.optionTitle}>Select Payment Method</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Domestic")}>
              <PaymentMethodItem
                icon={<Bank fill={Color.PrimaryWebOrient} />}
                text="Bank"
                onPress={() => handlePaymentMethodSelect("Bank")}
              />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={() => navigation.navigate("Domestic")}>
              <PaymentMethodItem
                icon={<AddBank fill={Color.PrimaryWebOrient} />}
                text="Other Bank"
                onPress={() => navigation.navigate("Home")}
              />
            </TouchableOpacity>
            <Divider style={{ marginBottom: hp("1.5%") }} />
            <TouchableOpacity onPress={() => navigation.navigate("Domestic")}>
              <PaymentMethodItem
                icon={
                  <FontAwesome
                    name="id-card"
                    size={20}
                    style={{ color: Color.PrimaryWebOrient }}
                  />
                }
                text="ID Pay"
                onPress={() => navigation.navigate("Home")}
              />
            </TouchableOpacity>
            <Divider style={{ ...styles.divider1, marginTop: hp("2%") }} />
            <TouchableOpacity onPress={() => navigation.navigate("Domestic")}>
              <PaymentMethodItem
                icon={
                  <Image
                    source={require("../../../assets/Images/Raast.png")}
                    style={{ width: wp("7%"), height: hp("4.5%") }}
                  />
                }
                text="Raast"
                onPress={() => navigation.navigate("Home")}
              />
            </TouchableOpacity>
            <Divider style={{ ...styles.divider1, marginTop: hp("1%") }} />
          </View>
        )}

        {selectedOption === "International" && (
          <View>
            <Text style={styles.optionTitle}>Select Payment Method</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Domestic")}>
              <PaymentMethodItem
                icon={<Remittence fill={Color.PrimaryWebOrient} />}
                text="Bank"
                size={13}
                onPress={() => handlePaymentMethodSelect("Bank")}
              />
            </TouchableOpacity>
            <Divider />
            <PaymentMethodItem
              icon={<Paypal fill={Color.PrimaryWebOrient} />}
              text="Paypal"
              onPress={() => navigation.navigate("Home")}
            />
            <Divider style={{ ...styles.divider }} />
            <PaymentMethodItem
              icon={
                <Fontisto
                  name="world"
                  size={30}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              }
              text="MoneyGram"
              onPress={() => navigation.navigate("Home")}
            />
            <Divider style={{ ...styles.divider }} />
            <PaymentMethodItem
              icon={<WorldRemit fill={Color.PrimaryWebOrient} />}
              text="WorldRemit"
              onPress={() => navigation.navigate("Home")}
            />
            <Divider />
            <PaymentMethodItem
              icon={<RiaMoneyTransfer fill={Color.PrimaryWebOrient} />}
              text="Ria Money Transfer"
              onPress={() => navigation.navigate("Home")}
            />
            <Divider style={{ ...styles.divider }} />
          </View>
        )}
      </View>
      <View></View>
    </ScrollView>
  );
};

const PaymentMethodItem = ({ icon, text, onPress }) => {
  return (
    <View style={styles.paymentMethodItem}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.paymentMethodText}>{text}</Text>
      <View style={styles.rightIconContainer}>
        <TouchableOpacity onPress={onPress}>
          <Entypo
            name="chevron-right"
            size={wp("7%")}
            style={{ color: Color.PrimaryWebOrient, marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: wp("10%"),
  },
  headerText: {
    fontFamily: "InterBold",
    fontSize: wp("5%"),
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp("2%"),
  },
  option: {
    flex: 1,
    padding: wp("3%"),
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#E0E5E6",
  },
  domesticOption: {
    height: hp("6%"),
    flex: 0.4,
  },
  internationalOption: {
    height: hp("6%"),
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
  optionTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  paymentMethodItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  iconContainer: {
    backgroundColor: "white",
    padding: wp("2%"),
    marginRight: wp("2%"),
  },
  paymentMethodText: {
    fontSize: wp("4%"),
  },
  divider: {
    marginTop: hp("1%"),
  },
  divider1: {
    marginBottom: hp("2%"),
  },
  rightIconContainer: {
    marginLeft: "auto",
  },
});

export default SendMoney;
