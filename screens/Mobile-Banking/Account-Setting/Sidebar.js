import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, flex } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ToggleSwitch from "rn-toggle-switch";
import { Avatar, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../../../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Sidebar = () => {
  const navigation = useNavigation();
  const Col = ({ numRows, children }) => {
    return <View style={styles[`${numRows}col`]}>{children}</View>;
  };

  const Row = ({ children }) => <View style={styles.row}>{children}</View>;
  const [userData, setUserData] = useState('');
   // Function to fetch data from the API
   const fetchData = async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await fetch("http://192.168.0.196:9096/v1/customer/getCustomer/16");

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Parse the response JSON
        const data = await response.json();

        // Update the state with the fetched data
        setUserData(data);
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.PrimaryWebOrient  }}>
      <ScrollView className="bg-white">
        <LinearGradient
          // Button Linear Gradient
          colors={[Color.PrimaryWebOrient, Color.PrimaryWebOrientLayer2]}
          className="h-70"
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Entypo
              name="chevron-left"
              size={30}
              color="#FFFFFF"
              marginTop={20}
            />
          </TouchableOpacity>

          <View style={styles.app}>
            <Row>
              <Col numRows={2}>
                <Text
                  style={{
                    fontSize: 25,
                    color: "white",
                    marginLeft: 25,
                    marginBottom: 1,
                    fontWeight: "bold",
                  }}
                >
                  Settings
                </Text>
              </Col>
              <Col numRows={2}>
                <View marginLeft={120}>
                  <ToggleSwitch
                    text={{
                      on: "",
                      off: "",
                      activeTextColor: "white",
                      inactiveTextColor: "black",
                    }}
                    textStyle={{ fontWeight: "bold" }}
                    color={{
                      indicator: "white",
                      active: Color.PrimaryWebOrient,
                      inactive: "rgba(247, 247, 247, 1)",
                      activeBorder: Color.PrimaryWebOrient,
                      inactiveBorder: Color.PrimaryWebOrient,
                    }}
                    active={true}
                    disabled={false}
                    width={10}
                    radius={15}
                    onValueChange={(val) => {
                      this.handleToggleSwitch(val);
                    }}
                  />
                </View>
              </Col>
            </Row>
          </View>
          {userData && userData.data && (
          <View className="bg-white rounded-3xl flex-2 m-7 p-1">
            <Avatar.Image
              source={require("../../../assets/Images/ProfileImage.jpg")}
              style={{
                margin: 5,
              }}
            />
            <Text
              style={{
                color: "#000000",
                fontSize: 20,
                fontWeight: "600",
                position: "absolute",
                marginLeft: 80,
                marginTop: 12,
              }}
            >
            {userData.data.firstName}
            
            
            </Text>
            <Text
              style={{
                color: "#868889",
                fontSize: 15,
                fontWeight: "600",
                position: "absolute",
                marginLeft: 82,
                marginTop: 36,
              }}
            >
              {userData.data.mobileNumber}
              
            </Text>
            <Text
              style={{
                color: "#868889",
                fontSize: 13,
                fontWeight: "600",
                position: "absolute",
                marginLeft: 83,
                marginTop: 55,
                justifyContent: flex,
              }}
            >
             {userData.data.email}
             
            </Text>
          </View>
            )}
        </LinearGradient>
        <View>
        <View className=" p-2  justify-center items-center">
          <TouchableOpacity
                // onPress={() => navigation.navigate("NameChange")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="settings"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient,marginRight:8  }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text  className="mr-2" style={{ fontSize: 15, fontWeight: 500 }}>
                    Account Setting
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
            </View>
          <View className=" p-2  justify-center items-center">
            <TouchableOpacity
              // onPress={() => navigation.navigate("NameChange")}
              style={styles.menuItemContainer}
            >
              <Ionicons
                name="gift"
                size={wp("7%")}
                style={{ color: Color.PrimaryWebOrient, marginRight: 8 }}
              />
              <View style={styles.menuItemTextContainer}>
                <Text className="mr-2" style={{ fontSize: 15, fontWeight: 500 }}>
                  My Rewards & Points
                </Text>
              </View>
              <Entypo
                name="chevron-right"
                size={wp("7%")}
                style={{ color: Color.PrimaryWebOrient }}
              />
            </TouchableOpacity>
          </View>      
          <View className=" p-2  justify-center items-center">
          <TouchableOpacity
                // onPress={() => navigation.navigate("NameChange")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="location"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient,marginRight:8  }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text  className="mr-2" style={{ fontSize: 15, fontWeight: 500 }}>
                  Locator
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
            </View>
            <View className=" p-2  justify-center items-center">
          <TouchableOpacity
                // onPress={() => navigation.navigate("NameChange")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="document-text"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient,marginRight:8  }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text  className="mr-2" style={{ fontSize: 15, fontWeight: 500 }}>
                  Manage Request
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
            </View>
          
            <View className=" p-2  justify-center items-center">
          <TouchableOpacity
                // onPress={() => navigation.navigate("NameChange")}
                style={styles.menuItemContainer}
              >
                <Feather
                name="package"
                size={wp("7%")}
                style={{
                  color: Color.PrimaryWebOrient,marginRight:8
                }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text  className="mr-2" style={{ fontSize: 15, fontWeight: 500 }}>
                  My Package
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
            </View>
          
            <View className=" p-2  justify-center items-center">
          <TouchableOpacity
                // onPress={() => navigation.navigate("Card")}
                style={styles.menuItemContainer}
              >
                <Entypo
                  name="credit-card"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient,marginRight:8  }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text  className="mr-2" style={{ fontSize: 15, fontWeight: 500 }}>
                  {/* Active/Deactive Card */}
                  Card Management
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
            </View>
          
          <View>
            <Text
              style={{
                marginLeft: 20,
                marginTop: 20,

                color: "#868889",
                fontWeight: 500,
              }}
            >
              Help
            </Text>
          </View>
          <View className=" p-2  justify-center items-center">
          <TouchableOpacity
                // onPress={() => navigation.navigate("NameChange")}
                style={styles.menuItemContainer}
              >           
            <Entypo
                name="chat"
                size={wp("7%")}
                style={{
                  color: Color.PrimaryWebOrient,marginRight:8 
                }}
              />
                <View style={styles.menuItemTextContainer}>
                  <Text  className="mr-2" style={{ fontSize: 15, fontWeight: 500 }}>
                   Customer Support
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
            </View>
          
            <View className=" p-2  justify-center items-center">
          <TouchableOpacity
                // onPress={() => navigation.navigate("NameChange")}
                style={styles.menuItemContainer}
              >
                <Ionicons
                  name="help"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient,marginRight:8  }}
                />
                <View style={styles.menuItemTextContainer}>
                  <Text  className="mr-2" style={{ fontSize: 15, fontWeight: 500 }}>
                  Help/FAQ 
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={wp("7%")}
                  style={{ color: Color.PrimaryWebOrient }}
                />
              </TouchableOpacity>
            </View>         
        </View>
      </ScrollView>
    </SafeAreaView>
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
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  menuItemTextContainer: {
    flex: 1,
   
  },
  menuItemText: {
    fontSize: wp("3.5%"),
    fontFamily: "InterBold",
    marginRight: wp("3%"),
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
handleToggleSwitch = (value) => {
  console.log(`Toggle switch value: ${value}`);
};

export default Sidebar;
