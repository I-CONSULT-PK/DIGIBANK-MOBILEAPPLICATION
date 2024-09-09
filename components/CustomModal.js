import React from "react";
import { View, Text, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../components/Button"; 

const CustomModal = ({
  visible,
  onClose,
  title,
  children,
  onConfirm,
  confirmText,
  onCancel,
  cancelText,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.70)', 
          paddingBottom: insets.bottom,
        }}
      >
        <View className="w-4/5 bg-white rounded-xl p-4">
          {title && <Text className="text-lg font-bold mb-2">{title}</Text>}
          <View className="mb-4">{children}</View>
          <View className="flex-row justify-end">
            {onCancel && (
              <Button
                text={cancelText || "Cancel"}
                styles="bg-gray-300 rounded px-4 py-2 mr-2"
                textStyles="text-white font-bold"
                onPress={onCancel}
              />
            )}
            {onConfirm && (
              <Button
                text={confirmText || "Confirm"}
                styles="bg-blue-500 rounded px-4 py-2"
                textStyles="text-white font-bold"
                onPress={onConfirm}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
