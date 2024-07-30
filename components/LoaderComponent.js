import React from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../GlobalStyles";

const LoaderComponent = ({ visible }) => {
  if (!visible) {
    return null;
  }

  const pulseValue = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(pulseValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(pulseValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const pulse = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loaderContent}>
        <View style={styles.logoContainer}>
          <Animated.Text
            style={[styles.logo, { transform: [{ scale: pulse }] }]}
          >
            Z
          </Animated.Text>
          <Text style={styles.secureBanking}>Secure Banking</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  loaderContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: wp("5%"),
    alignItems: "center",
    height: hp("20%"),
    width: wp("35%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: hp("11%"),
    color: Color.PrimaryWebOrientTxtColor,
    bottom: hp("1%"),
    fontFamily: "InterSemiBold",
  },
  secureBanking: {
    fontSize: hp("1.8%"),
    color: Color.PrimaryWebOrientTxtColor,
    fontFamily: "InterBold",
    bottom: hp("1%"),
    textAlign: "center",
  },
});

export default LoaderComponent;
