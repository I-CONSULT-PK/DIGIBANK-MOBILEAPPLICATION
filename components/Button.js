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
import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";
import { Color } from "../GlobalStyles";

const Button = ({ text, styles, textStyles, width, onPress, loading }) => {
  return (
    <TouchableOpacity
      className={`py-3.5 rounded-lg ${width || "w-[100%]"} ${styles} ${
        loading && "opacity-90"
      }`}
      style={{ backgroundColor: Color.PrimaryWebOrient }}
      onPress={onPress}
      disabled={loading}
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

Button.propTypes = {
  text: PropTypes.string.isRequired,
  styles: PropTypes.string,
  textStyles: PropTypes.string,
  width: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Button;

