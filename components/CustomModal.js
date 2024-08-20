import React from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import Modal from "react-native-modal";
import AntDesign from '@expo/vector-icons/AntDesign';

import Input from "../components/TextInput";

const CustomModal = ({ isModalVisible, toggleModal }) => {
    const handleModalClose = () => {
        toggleModal();
    };

    return (
        <View>
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
                <View className="justify-start px-5 pt-6 pb-8">
                    <View className="flex-row items-center justify-center">
                        <AntDesign name="edit" size={22} color="black" />
                        <Text className="text-base font-InterSemiBold ml-3">Edit Details</Text>
                    </View>

                    <View className="w-full border-b-[1px] border-cyan-300 my-4" />

                    <View className="mt-2">
                        <Text className="text-sm mb-2 font-InterMedium">
                            Nick Name
                        </Text>
                        <Input
                            placeholder="Enter your username"
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    </View>

                    <View className="mt-4">
                        <Text className="text-sm mb-2 font-InterMedium">
                            Mobile Number
                        </Text>
                        <Input
                            placeholder="Enter your username"
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    </View>

                </View>
            </Modal>
        </View>
    )
}

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
})


export default CustomModal