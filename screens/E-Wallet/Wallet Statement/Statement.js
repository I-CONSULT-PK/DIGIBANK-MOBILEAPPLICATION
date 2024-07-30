import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Statment from "../../../assets/Images/Statment.svg";
import { Avatar } from "react-native-paper";
import { Color } from "../../../GlobalStyles";
import { Divider } from "@rneui/themed";

import { Entypo } from "@expo/vector-icons";
const Statement = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [amount, setAmount] = useState("");
  const [sendBy, setSendBy] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted!");
    console.log("Account Number:", accountNumber);
    console.log("Beneficiary Name:", beneficiaryName);
    console.log("Amount:", amount);
    console.log("Send By:", sendBy);
    console.log("Date:", selectedDate);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            {/* Watermark "zanbeel" */}
            {/* <Text style={styles.watermark}>zanbeel</Text> */}
            <View className="justify-center  h-144 w-50 m-4 rounded-lg items-center mt-2">
              {/* <Avatar.Image
                source={require("../../assets/Images/check-box.png")}
                style={styles.stretch}
              /> */}
              <View className="p-3 ">
                <Text
                  className="font-InterBold text-3xl  text-center"
                  style={{ color: Color.PrimaryWebOrientTxtColor }}
                >
                  Zanbeel
                </Text>
                <Text className=" mt-1 text-center text-base font-semibold">
                  Transaction Successful
                </Text>
                <Text className="text-base text-center font-InterMedium text-text-gray ">
                  17 January 2024 | 10:58 AM{" "}
                </Text>
                <View className="flex-row justify-between mt-4">
                  <View className="mr-5">
                    <Text className="font-semibold text-base">To</Text>
                    <Text className="font-semibold text-base">
                      To Account/IBAN
                    </Text>
                    <Text className="font-semibold text-base">From</Text>
                    <Text className="font-semibold text-base">
                      From Account
                    </Text>
                    <Text className="font-semibold text-base">
                      Transaction Type
                    </Text>
                  </View>
                  <View className="ml-5 ">
                    <Text className="font-semibold text-base text-right">
                      Mir Hamza Khan
                    </Text>
                    <Text className="font-semibold text-base text-right">
                      0738******8269
                    </Text>
                    <Text className="font-semibold text-base text-right">
                      Faizan Ahmed
                    </Text>
                    <Text className="font-semibold text-base text-right">
                      0738******8269
                    </Text>
                    <Text className="font-semibold text-base text-right">
                      Interbranch
                    </Text>
                  </View>
                </View>
                <Divider />
                <View className="flex-row justify-between mt-2 mb-2">
                  <View>
                    <Text className="font-semibold text-base">Amount</Text>
                  </View>
                  <View>
                    <Text className="font-semibold text-base text-right">
                      PKR 10,000
                    </Text>
                  </View>
                </View>
                <Divider />
              </View>
            </View>
            <View className="justify-center items-center mt-2">
              <View className="flex-row justify-between">
                <View className="m-4">
                  <View style={styles.circleContainer}>
                    <Entypo
                      name="download"
                      size={30}
                      style={{
                        color: Color.PrimaryWebOrient,
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.openButton}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text className="font-medium text-sm text-center mt-1">
                      Download
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="m-4">
                  <View style={styles.circleContainer}>
                    <Entypo
                      name="share"
                      size={30}
                      style={{
                        color: Color.PrimaryWebOrient,
                      }}
                    />
                  </View>
                  <Text className="font-medium text-sm text-center mt-1">
                    Whatsapp
                  </Text>
                </View>
                <View className="m-4">
                  <View style={styles.circleContainer}>
                    <Entypo
                      name="save"
                      size={30}
                      style={{
                        color: Color.PrimaryWebOrient,
                      }}
                    />
                  </View>
                  <Text className="font-medium text-sm text-center mt-1">
                    PDF
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.openButtonText}>
          <Statment />{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    // borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 18,
  },
  button: {
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    // color: "white",
    textAlign: "center",
    fontSize: 18,
  },

  openButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "black",
  },
  // watermark: {
  //   position: "absolute",
  //   top: 120,
  //   right: 20,
  //   fontSize: 100,
  //   color: "rgba(0, 0, 0, 0.1)",
  //   transform: [{ rotate: "-45deg" }],
  //   zIndex: 1,
  // },
});

export default Statement;
