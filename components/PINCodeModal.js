import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import Modal from "react-native-modal";
import Button from './Button';

const PINCodeModal = ({ isModalVisible, toggleModal, pinLength, pin, setPin, source, navigation }) => {
    const inputs = useRef([]);
    const [isConfirmingPIN, setIsConfirmingPIN] = useState(false);
    const [confirmPinInput, setConfirmPinInput] = useState(Array(pinLength).fill(''));

    useEffect(() => {
        setIsConfirmingPIN(false);
        setPin(Array(pinLength).fill(''));
        setConfirmPinInput(Array(pinLength).fill(''));
    }, [isModalVisible]);

    const isSequentialPin = (pinArray) => {
        const pinDigits = pinArray.map(Number);
        const isAscending = pinDigits.every((digit, i) => i === 0 || digit === pinDigits[i - 1] + 1);
        const isDescending = pinDigits.every((digit, i) => i === 0 || digit === pinDigits[i - 1] - 1);
        return isAscending || isDescending;
    };

    const handleChange = (text, index) => {
        const sanitizedText = text.replace(/[^0-9]/g, '');

        if (isConfirmingPIN) {
            const updatedConfirmPin = [...confirmPinInput];
            updatedConfirmPin[index] = sanitizedText;
            setConfirmPinInput(updatedConfirmPin);
        } else {
            const updatedPin = [...pin];
            updatedPin[index] = sanitizedText;
            setPin(updatedPin);
        }

        if (sanitizedText.length === 1 && index < pinLength - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleModalClose = () => {
        toggleModal();
    };

    const handleSave = () => {
        if (isConfirmingPIN) {
            if (confirmPinInput.every((digit) => digit !== '')) {
                if (pin.join('') === confirmPinInput.join('')) {
                    toggleModal();

                    const pinValue = pin.join(''); 
                    
                    if (source === 'fingerprint') {
                        navigation.navigate('RegisterFingerPrint', { pin: pinValue });
                    } else if (source === 'face') {
                        navigation.navigate('RegisterFaceDetector', { pin: pinValue });
                    }
                } else {
                    Alert.alert('Error', 'PINs do not match. Please try again.');
                    setIsConfirmingPIN(false);
                    setConfirmPinInput(Array(pinLength).fill(''));
                }
            } else {
                Alert.alert('Error', 'Please enter all 5 digits of the confirm PIN.');
            }
        } else {
            if (pin.every((digit) => digit !== '')) {
                if (isSequentialPin(pin)) {
                    Alert.alert('Invalid PIN', 'Sequential PINs are not allowed. Please enter a new PIN.');
                    setPin(Array(pinLength).fill(''));
                    inputs.current[0].focus();
                } else {
                    setIsConfirmingPIN(true);
                    inputs.current[0].focus();
                }
            } else {
                Alert.alert('Error', 'Please enter all 5 digits of the PIN.');
            }
        }
    };

    return (
        <Modal
            style={styles.modal}
            isVisible={isModalVisible}
            onBackdropPress={handleModalClose}
            onBackButtonPress={handleModalClose}
            animationOut="slideOutDown"
            backdropTransitionOutTiming={10}
            statusBarTranslucent={true}
            propagateSwipe={true}
            transparent={true}
            onRequestClose={handleModalClose}
            onDismiss={handleModalClose}
        >
            <View className="justify-start px-5 py-6">
                <View className="items-center justify-center">
                    <Text className="text-base font-InterSemiBold">{isConfirmingPIN ? 'Confirm your PIN' : 'Set your PIN'}</Text>
                    <Text className="text-sm font-InterMedium mt-1 text-gray-500">Enter a {pinLength} digits PIN Number</Text>
                </View>

                <View className="flex-row justify-around items-center my-8 mx-2">
                    {Array.from({ length: pinLength }).map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(input) => inputs.current[index] = input}
                            className="w-12 h-12 text-center text-lg bg-[#F4F5F9] border border-gray-300 rounded-md font-InterSemiBold"
                            keyboardType="numeric"
                            maxLength={1}
                            value={isConfirmingPIN ? confirmPinInput[index] : pin[index]}
                            onChangeText={(text) => handleChange(text, index)}
                            returnKeyType={index === pinLength - 1 ? "done" : "next"}
                        />
                    ))}
                </View>

                <Button
                    text={isConfirmingPIN ? 'Save' : 'Next'}
                    width='w-[100%]'
                    styles='my-1 py-4'
                    onPress={handleSave}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 0,
        top: '28%',
        width: '90%',
        alignSelf: 'center',
        elevation: 10,
        borderRadius: 8,
        backgroundColor: 'white'
    }
});

export default PINCodeModal;
