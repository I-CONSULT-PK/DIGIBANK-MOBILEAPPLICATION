// import React, { Component } from 'react';
// import { StyleSheet, View, LogBox } from 'react-native';
// import AnimateLoadingButton from 'react-native-animate-loading-button';
// import { Color } from '../GlobalStyles';

// LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);

// export default class LoadingButton extends Component {
//   render() {
//     const { Text, onPress, nextScreen } = this.props;

//     return (
//       <View style={styles.container}>
//         <AnimateLoadingButton
//           ref={(c) => (this.loadingButton1 = c)}
//           width={300}
//           height={50}
//           title={Text}
//           titleFontSize={16}
//           titleColor="rgb(255,255,255)"
//           backgroundColor={Color.PrimaryWebOrient}
//           borderRadius={10}
//           onPress={() => this._onPressBotton1Handler(onPress, nextScreen)}
//           useNativeDriver={false}
//         />

//         <View style={{ height: 20 }} />
//       </View>
//     );
//   }

//   _onPressBotton1Handler = async (onPress, nextScreen) => {
//     this.loadingButton1.showLoading(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       if (onPress && typeof onPress === 'function') {
//         onPress();
//       }

//       // Navigate to the specified screen
//       if (nextScreen) {
//         this.props.navigation.navigate(nextScreen);
//       }

//     } catch (error) {
//       console.error('Operation failed', error);
//     } finally {
//       this.loadingButton1.showLoading(false);
//     }
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgb(255,255,255)',
//     justifyContent: 'center',
//   },
// });
// import { Button } from "react-native-paper";
// import { Color, } from "../GlobalStyles";
// export default function CustomButton({
//   Text,
//   style,
//   icon,
//   onPress,
//   labelStyle,
//   loading,

// }) {
//   return (
//     <Button
//       loading={loading}
//       mode="contained"
//       style={[
//         {
//           borderRadius: 10,
//           height: 48,
//           justifyContent: "center",
//           backgroundColor: Color.PrimaryWebOrient,
//         },
//         style,
//       ]}
//       className='bg-primary'
//       labelStyle={[
//         {
//           color: "#ffffff",
//           fontFamily: "InterSemiBold",
//           fontSize: 12,
//           letterSpacing: -0.5,
//         },
//         labelStyle,
//       ]}
//       uppercase={false}
//       icon={icon}
//       onPress={onPress}
//     >
//       {Text}
//     </Button>
//   );
// }

// ------------------------------------------------------------------------------------

import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { Color } from "../GlobalStyles";

const Button = ({ text, styles, textStyles, width, onPress, loading, color }) => {
  const backgroundColor = color || Color.PrimaryWebOrient;

  return (
    <TouchableOpacity
      className={`py-3.5 rounded-lg ${width || "w-[100%]"} ${styles} ${
        loading ? "opacity-70" : ""
      }`}
      style={{ backgroundColor: backgroundColor }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        className={`text-base ${
          textStyles || "text-white"
        } font-medium text-center font-InterSemiBold`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
