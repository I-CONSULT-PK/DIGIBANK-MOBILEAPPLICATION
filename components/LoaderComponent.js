import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';

const LoaderComponent = ({ visible }) => {
  if (!visible) {
    return null;
  }

  const bounceValue1 = useRef(new Animated.Value(0)).current;
  const bounceValue2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(bounceValue1, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue2, {
            toValue: 1,
            duration: 800,
            delay: 320,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(bounceValue1, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue2, {
            toValue: 0,
            duration: 800,
            delay: 320,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animate());
    };

    animate();
  }, [bounceValue1, bounceValue2]);

  const animatedStyle1 = {
    transform: [
      { translateY: bounceValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8],
      })},
      { scaleY: bounceValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.25],
      })},
    ],
    opacity: bounceValue1.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [0.75, 1, 0.75],
    }),
  };

  const animatedStyle2 = {
    transform: [
      { translateY: bounceValue2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8],
      })},
      { scaleY: bounceValue2.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.25],
      })},
    ],
    opacity: bounceValue2.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [0.75, 1, 0.75],
    }),
  };

  return (
    <View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={[{ backgroundColor: 'black', width: 13.6 }, animatedStyle1]}
      />
      <Animated.View
        style={[{ backgroundColor: 'black', width: 13.6, position: 'absolute', top: 0, left: 20 }, animatedStyle2]}
      />
    </View>
  );
};

export default LoaderComponent;
