import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import Modal from "react-native-modal";
import Button from './Button';

const PINCodeModal = ({ isModalVisible, toggleModal, otpLength, otp, setOtp, source, navigation }) => {
    const inputs = useRef([]);
    const [confirmPIN, setConfirmPIN] = useState(false);
    const [confirmOtp, setConfirmOtp] = useState(Array(otpLength).fill(''));

    useEffect(() => {
        setConfirmPIN(false);
        setOtp(Array(otpLength).fill(''));
        setConfirmOtp(Array(otpLength).fill(''));
    }, [isModalVisible]);

    const handleChange = (text, index) => {
        const sanitizedText = text.replace(/[^0-9]/g, '');

        if (confirmPIN) {
            // Update the confirmOtp array
            const newConfirmOtp = [...confirmOtp];
            newConfirmOtp[index] = sanitizedText;
            setConfirmOtp(newConfirmOtp);
        } else {
            // Update the otp array
            const newOtp = [...otp];
            newOtp[index] = sanitizedText;
            setOtp(newOtp);
        }

        if (sanitizedText.length === 1 && index < otpLength - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleModalClose = () => {
        toggleModal();
    };

    const handleSave = () => {
        if (confirmPIN) {
            if (confirmOtp.every((digit) => digit !== '')) {
                if (otp.join('') === confirmOtp.join('')) {
                    Alert.alert('Success', 'Your PIN has been set successfully.');
                    toggleModal();
    
                    setTimeout(() => {
                        source === 'fingerprint' && navigation.navigate('RegisterFingerPrint');
                        source === 'face' && navigation.navigate('RegisterFaceDetector');
                    }, 1200);
                } else {
                    Alert.alert('Error', 'PINs do not match. Please try again.');
                    setConfirmPIN(false);
                    setConfirmOtp(Array(otpLength).fill(''));
                }
            } else {
                Alert.alert('Error', 'Please enter all 5 digits of the confirm PIN.');
            }
        } else {
            if (otp.every((digit) => digit !== '')) {
                setConfirmPIN(true);
                inputs.current[0].focus();
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
                    <Text className="text-base font-InterSemiBold">{confirmPIN ? 'Confirm your PIN' : 'Set your PIN'}</Text>
                    <Text className="text-sm font-InterMedium mt-1 text-gray-500">Enter a 5 digits PIN Number</Text>
                </View>

                <View className="flex-row justify-around items-center my-8">
                    {Array.from({ length: otpLength }).map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(input) => inputs.current[index] = input}
                            className="w-12 h-12 text-center text-xl bg-[#F4F5F9] border border-gray-300 rounded-md font-InterSemiBold"
                            keyboardType="numeric"
                            maxLength={1}
                            value={confirmPIN ? confirmOtp[index] : otp[index]}
                            onChangeText={(text) => handleChange(text, index)}
                            returnKeyType={index === otpLength - 1 ? "done" : "next"}
                        />
                    ))}
                </View>

                <Button
                    text={confirmPIN ? 'Save' : 'Next'}
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
