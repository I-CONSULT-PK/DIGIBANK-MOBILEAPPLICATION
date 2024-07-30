import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Button,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { scan } from "../../assets/scan.png";


const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(
      `Bar Code Whit Type ${type} and data ${Linking.openURL(
        `${data}`
      )}has been Scanned!`
    );
  };

  const goBack = () => {
    navigation.goBack();
  };
  const goForward = () => {
    navigation.goForward();
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Image style={styles.qr} source={require("../../assets/scan.png")} />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}

      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="md-arrow-back" size={44} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButtonn}>
        <Ionicons name="qr-code-outline" size={44} color="white" 
        onPress={() => navigation.navigate("MyQRCode")}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  qr: {
    height: "50%",
    width: "75%",
    left: 50,
    justifyContent: "center",
    zIndex: 1,
  },

  backButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  qrButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
  scanAgainButton: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  backButtonn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },


  // layerTop: {
  //   flex: 1,
  //   backgroundColor: opacity
  // },
  // layerCenter: {
  //   flex: 1,
  //   flexDirection: 'row'
  // },
  // layerLeft: {
  //   flex: 1,
  //   backgroundColor: opacity
  // },
  // focused: {
  //   flex: 10,

  // },
  // layerRight: {
  //   flex: 1,
  //   backgroundColor: opacity
  // },
  // layerBottom: {
  //   flex: 1,
  //   backgroundColor: opacity
  // },
});

export default Scanner;
