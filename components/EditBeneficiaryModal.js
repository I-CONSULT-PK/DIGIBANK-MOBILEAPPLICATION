import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import Modal from "react-native-modal";
import AntDesign from '@expo/vector-icons/AntDesign';

import { Color } from "../GlobalStyles";
import Input from "./TextInput";
import Button from "./Button";

const EditBeneficiaryModal = ({ isModalVisible, toggleModal, beneficiary, handleUpdateBeneficiary }) => {
    const [nickname, setNickname] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    useEffect(() => {
        if (beneficiary) {
            setNickname(beneficiary.beneficiaryAlias || '');
            setMobileNumber(beneficiary.mobileNumber || '');
        }
    }, [beneficiary]);

    const handleModalClose = () => {
        toggleModal();
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
                <View className="flex-row items-center justify-center">
                    <AntDesign name="edit" size={22} color={Color.PrimaryWebOrientTxtColor} />
                    <Text className="text-base font-InterSemiBold ml-2">Edit Details</Text>
                </View>

                <View className="w-full border-b-[1px] border-cyan-200 my-3" />

                <View className="mt-2">
                    <Text className="text-sm mb-2 font-InterMedium">Nick Name</Text>
                    <Input
                        placeholder="Enter a nickname"
                        value={nickname}
                        onChange={(text) => setNickname(text)}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                </View>

                <View className="mt-5">
                    <Text className="text-sm mb-2 font-InterMedium">Mobile Number</Text>
                    <Input
                        placeholder="Enter mobile number"
                        value={mobileNumber}
                        onChange={(text) => setMobileNumber(text)}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                </View>

                <View className="mt-5">
                    <Button
                        text="Save"
                        width="w-[100%]"
                        styles="py-4"
                        onPress={() => handleUpdateBeneficiary(nickname, mobileNumber, beneficiary.id, beneficiary)}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 0,
        top: '22%',
        width: '90%',
        alignSelf: 'center',
        elevation: 10,
        borderRadius: 8,
        backgroundColor: 'white'
    }
})


export default EditBeneficiaryModal