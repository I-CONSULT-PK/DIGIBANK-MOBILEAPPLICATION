import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color } from "../GlobalStyles";
import Button from "./Button";

const { width } = Dimensions.get("window");

const CustomModal = ({
  visible,
  onClose,
  title,
  message,
  onConfirm,
  confirmText,
  cancelText,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          className="flex-1 justify-center items-center pb-[env(safe-area-inset-bottom)]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <TouchableWithoutFeedback>
            <View
              className="bg-white p-5 rounded-lg shadow-lg w-[80%]"
              style={{ marginBottom: insets.bottom }}
            >
              <Text className="text-xl font-bold mb-3 text-center">
                {title}
              </Text>
              <Text className="text-gray-600 mb-4 text-center">{message}</Text>
              {children}
              <View className="flex-row justify-between mt-4">
                <Button
                  width="w-[48%]"
                  styles="px-4"
                  onPress={onClose}
                  text={cancelText || "Cancel"}
                  color="red"
                />

                <Button
                  width="w-[48%]"
                  styles="px-4"
                  onPress={onConfirm}
                  text={confirmText || "Proceed"}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
