import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import CustomButton from "../../../components/Button";
import { CheckBox, Divider } from '@rneui/themed';
import TextInput from '../../../components/TextInput';
import { Color } from '../../../GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
const Language = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);

    const navigation = useNavigation();

    const handleCheckBoxPress = (checkboxNumber) => {
        // Reset all checkboxes to false
        setChecked(false);
        setChecked2(false);
        setChecked3(false);
        setChecked4(false);

        // Set the clicked checkbox to true
        switch (checkboxNumber) {
            case 1:
                setChecked(true);
                break;
            case 2:
                setChecked2(true);
                break;
            case 3:
                setChecked3(true);
                break;
            case 4:
                setChecked4(true);
                break;
            default:
                break;
        }
    };

    const handleContinue = () => {
        // Check if at least one checkbox is selected
        if (!(checked || checked2 || checked3 || checked4)) {
            Alert.alert("Error", "Please select at least one language.");
        } else {
            // Proceed with the navigation
            navigation.navigate("AccountSetting");
        }
    };

    return (
        <SafeAreaView>
            <ScrollView >
                <View className='bg-white flex-1'>
                    <TouchableOpacity onPress={() => navigation.navigate("AccountSetting")}>
                        <Entypo
                            name="chevron-left"
                            size={30}
                            color="#090909"
                            marginTop={25}
                        />
                    </TouchableOpacity>
                    <View className="justify-center items-center p-3">
                        <Text className="font-InterBold text-2xl">Language</Text>
                    </View>
                    <View style={styles.Search}>
                        <View
                            className="justify-center items-center p-3 mt-8"
                            style={
                                clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
                            }
                        >
                            <TextInput
                                style={styles.input}
                                placeholder="Search"
                                value={searchPhrase}
                                onChangeText={setSearchPhrase}
                            />
                            <Feather
                                name="search"
                                size={25}
                                color="#0F98B0"
                                style={{ color: Color.PrimaryWebOrient }}
                                left={2}
                            />
                        </View>

                        {clicked && (
                            <View>
                                <Button
                                    title="Cancel"
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        setClicked(false);
                                    }}
                                ></Button>
                            </View>
                        )}
                    </View>
                    <View className="justify-start  p-5  mt-5">
                        <Text className="font-semibold text-2xl "> Select Languages</Text>
                    </View>
                    <View className="flex-1  w-200  ml-3 mr-3 bg-background  rounded-2xl ">
                        <CheckBoxItem
                            label="English"
                            checked={checked}
                            onPress={() => handleCheckBoxPress(1)}
                        />
                        <Divider />
                        <CheckBoxItem
                            label="Urdu"
                            checked={checked2}
                            onPress={() => handleCheckBoxPress(2)}
                        />
                        <Divider />
                        <CheckBoxItem
                            label="Arabic"
                            checked={checked3}
                            onPress={() => handleCheckBoxPress(3)}
                        />
                        <Divider />
                        <CheckBoxItem
                            label="Sindhi"
                            checked={checked4}
                            onPress={() => handleCheckBoxPress(4)}
                        />
                    </View>
                    <View className='p-5 mt-2'>
                        <CustomButton Text={'Back'} onPress={handleContinue} />
                        {/* <CustomButton Text={'Continue'} onPress={handleContinue} /> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const CheckBoxItem = ({ label, checked, onPress }) => {
    return (
        <TouchableOpacity style={styles.checkBoxItem} onPress={onPress}>
            <Text className="font-medium text-2xl">{label}</Text>
            <CheckBox
                checkedColor='#1EBBD7'
                containerStyle={{ backgroundColor: '#F4F5F9' }}
                checked={checked}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    Search: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#F4F5F9",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "90%",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 17,
        marginLeft: 5,
        width: "95%",
    },
    checkBoxItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
});

export default Language;
