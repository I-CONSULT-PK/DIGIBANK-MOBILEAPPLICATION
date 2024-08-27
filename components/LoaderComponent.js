import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { Color } from "../GlobalStyles"; // Ensure this color matches #076fe5 from your CSS

const { height } = Dimensions.get("window"); // Get screen height

const LoaderComponent = ({ visible }) => {
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animatedValue3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    // Define the animation for all boxes
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animatedValue1, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue2, {
            toValue: 1,
            duration: 800,
            delay: 320, // Staggered delay for the second box
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue3, {
            toValue: 1,
            duration: 800,
            delay: 640, // Staggered delay for the third box
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(animatedValue1, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue2, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue3, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animation.start();

    // Cleanup animation on unmount
    return () => animation.stop();
  }, [visible]);

  const getTransform = (animatedValue) => ({
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.2, 1],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, -8, 0],
        }),
      },
    ],
  });

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.whiteContainer}>
        <View style={styles.loaderWrapper}>
          <Animated.View
            style={[styles.loader, getTransform(animatedValue1)]}
          />
          <Animated.View
            style={[
              styles.loader,
              {
                marginLeft: 7,
              },
              getTransform(animatedValue2),
            ]}
          />
          <Animated.View
            style={[
              styles.loader,
              {
                marginLeft: 7,
              },
              getTransform(animatedValue3),
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  whiteContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "25%",
    height: height * 0.12,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    position: "relative",
  },
  loaderWrapper: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -16 }],
  },
  loader: {
    width: 9,
    height: 32,
    backgroundColor: Color.PrimaryWebOrient,
  },
});

export default LoaderComponent;
