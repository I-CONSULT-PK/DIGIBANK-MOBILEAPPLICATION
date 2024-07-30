import { React, useState } from "react";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import FrontDebitCard from "../../../assets/Images/FrontDebitCard.svg";
import BackDebitCard from "../../../assets/Images/BackDebitCard.svg";
import { Color } from "../../../GlobalStyles";
const Card = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const navigation = useNavigation();
  const Col = ({ numRows, children }) => {
    return <View style={styles[`${numRows}col`]}>{children}</View>;
  };

  const Row = ({ children }) => <View style={styles.row}>{children}</View>;

  return (
    <ScrollView className="bg-white">
      <TouchableOpacity onPress={() => navigation.navigate("Sidebar")}>
        <Entypo
          name="chevron-left"
          size={30}
          color="#090909"
          marginTop={50}
          marginLeft={20}
        />
      </TouchableOpacity>
      <View style={styles.app}>
        <Row>
          <Col numRows={2}>
            <Text
              style={{
                fontSize: 23,
                color: "#090909",
                marginLeft: 25,
                marginTop: 20,
                fontWeight: "bold",
                width: 250,
              }}
            >
              Card Active / Deactive
            </Text>
          </Col>
          <Col numRows={2}>
            <View style={styles.container}>
              <Switch
                trackColor={{ false: "#767577", true: Color.PrimaryWebOrient }}
                thumbColor={isEnabled ? "white" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{
                  transform: [{ scaleX: 1.5 }, { scaleY: 1.2 }],
                  marginLeft: 90,
                  marginTop: 10,
                }}
              />
            </View>
          </Col>
        </Row>
      </View>
      <View>
        <FrontDebitCard
          style={{
            marginTop: 30,
            alignSelf: "center",
          }}
        />
      </View>
      <View>
        <BackDebitCard
          style={{
            marginTop: 30,
            alignSelf: "center",
          }}
        />
      </View>
      <View
        style={{
          width: 600,
          height: 1,
          backgroundColor: "#868889",
          marginTop: 10,
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View className="bg-white rounded-full p-2 h-11 w-11 justify-center items-center">
          <IconButton icon="history" color="#1EBBD7" />
        </View>
        <Text
          style={{
            color: Color.PrimaryWebOrient,
            fontSize: 15,
            fontWeight: 500,
          }}
          className="text-primary"
        >
          View transaction
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Entypo
            name="chevron-right"
            size={30}
            color="#090909"
            marginLeft={170}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: 600,
          height: 1,
          backgroundColor: "#868889",
          marginTop: 10,
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View className="bg-white rounded-full p-2 h-11 w-11 justify-center items-center">
          <IconButton icon="credit-card" />
        </View>
        <Text
          style={{
            color: Color.PrimaryWebOrient,
            fontSize: 15,
            fontWeight: 500,
          }}
          className="text-primary"
        >
          Replace Card
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Entypo
            name="chevron-right"
            size={30}
            color="#090909"
            marginLeft={192}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: 600,
          height: 1,
          backgroundColor: "#868889",
          marginTop: 10,
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View className="bg-white rounded-full p-2 h-11 w-11 justify-center items-center">
          <IconButton icon="lock" color="#1EBBD7" />
        </View>
        <Text
          style={{
            color: Color.PrimaryWebOrient,
            fontSize: 15,
            fontWeight: 500,
          }}
          className="text-primary"
        >
          Manage PIN
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Entypo
            name="chevron-right"
            size={30}
            color="#090909"
            marginLeft={200}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: 600,
          height: 1,
          backgroundColor: "#868889",
          marginTop: 10,
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ flex: 1, paddingHorizontal: 5 }}>
            <View style={styles.menuItem}>
              <Entypo
                name="mail"
                size={25}
                style={{
                  color: Color.PrimaryWebOrient,
                }}
                marginTop={13}
                marginLeft={1}
              />
              <Text style={styles.menuText1}>Accounts</Text>
            </View>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 5 }}>
            <View style={styles.menuItem}>
              <Entypo
                name="credit-card"
                size={25}
                style={{
                  color: Color.PrimaryWebOrient,
                }}
                marginTop={18}
                marginLeft={10}
              />
              <Text style={styles.menuText2}>Make a Transfer</Text>
            </View>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 5 }}>
            <View style={styles.menuItem}>
              <Entypo
                name="document"
                size={25}
                style={{
                  color: Color.PrimaryWebOrient,
                }}
                marginTop={10}
                marginLeft={19}
              />
              <Text style={styles.menuText3}>Pay a Bill</Text>
            </View>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 5 }}>
            <View style={styles.menuItem}>
              <Entypo
                name="wallet"
                size={25}
                style={{
                  color: Color.PrimaryWebOrient,
                }}
                marginTop={16}
                marginLeft={15}
              />
              <Text style={styles.menuText4}>Check Deposit</Text>
            </View>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 5 }}>
            <View style={styles.menuItem}>
              <Entypo
                name="dots-three-horizontal"
                size={25}
                style={{
                  color: Color.PrimaryWebOrient,
                }}
                marginTop={14}
              />
              <Text style={styles.menuText5}>More</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchInput: {
    marginLeft: 2,
  },
  switchLabel: {
    marginLeft: 2,
  },
  menuItem: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 2,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText1: {
    fontSize: 10,
    fontWeight: 500,
    color: "#000000",
    marginBottom: 8,
    textAlign: "center",
    width: 100,
  },
  menuText2: {
    fontSize: 10,
    fontWeight: 500,
    color: "#000000",
    marginBottom: 12,
    textAlign: "center",
    marginLeft: 10,
    width: 89,
  },
  menuText3: {
    fontSize: 10,
    fontWeight: 500,
    color: "#000000",
    marginBottom: 6,
    textAlign: "center",
    marginLeft: 18,
    width: 50,
  },
  menuText4: {
    fontSize: 10,
    fontWeight: 500,
    color: "#000000",
    marginBottom: 11,
    textAlign: "center",
    marginLeft: 17,
    width: 100,
  },
  menuText5: {
    fontSize: 10,
    fontWeight: 500,
    color: "#000000",
    marginBottom: 10,
    textAlign: "center",
    width: 100,
  },

  row: { flexDirection: "row" },
  "1col": {
    borderWidth: 1,
    flex: 1,
  },
  "2col": {
    // borderWidth: 1,
    flex: 2,
  },
});
export default Card;
