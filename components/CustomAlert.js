import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import Modal from 'react-native-modal'

import Button from './Button'

const CustomAlert = ({ text, subtext, success, onPress, alertVisible, setAlertVisible }) => {
  useEffect(() => {
    let timer;
    if (alertVisible && !onPress) {
      timer = setTimeout(() => {
        setAlertVisible(false);
      }, 2000); 
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [alertVisible]);

  return (
    <Modal
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', margin: 0 }}
      transparent={true}
      visible={alertVisible}
      animationType="fade"
      onRequestClose={() => setAlertVisible(false)}
      onBackdropPress={() => setAlertVisible(false)}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.5}
    >
      <View className="bg-white p-5 rounded-lg w-11/12 max-w-xs justify-center items-center self-center shadow-md shadow-slate-400">
        {success ? (<Image
          source={require("../assets/check.png")}
          className="w-16 h-16 mb-3"
        />) :
          (<Image
            source={require("../assets/alert-icon.png")}
            className="w-16 h-14 mb-3"
          />)}
        <Text className="text-lg font-InterBold mb-1">{text}</Text>
        <Text className="text-center font-InterMedium text-gray-500 mb-7">
          {subtext}
        </Text>
        <View className="flex-row justify-between w-full px-2">
          <Button
            text="Ok"
            onPress={() => setAlertVisible(false)}
            width="w-full"
            styles="py-3"
          />
        </View>

        {onPress && (<View className="flex-row justify-between w-full px-1">
          <Button
            text="Cancel"
            onPress={() => setAlertVisible(false)}
            width="w-[48%]"
            color="white"
            textStyles="text-gray-700"
            styles="border border-gray-300 py-3"
          />

          <Button
            text="Done"
            onPress={onPress}
            width="w-[48%]"
            styles="py-3"
          />
        </View>)}
      </View>
    </Modal>
  )
}

export default CustomAlert