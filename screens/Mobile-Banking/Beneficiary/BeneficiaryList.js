import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { Color } from "../../../GlobalStyles";
import API_BASE_URL from '../../../config';
import SearchBar from "../../../components/SearchBar";
import OptionBox from "../../../components/OptionBox";
import EditBeneficiaryModal from '../../../components/EditBeneficiaryModal';
import Footer from "../../../components/Footer";

const BeneficiaryList = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  const { source } = route.params || {};

  useEffect(() => {
    const handleBackPress = () => {
      navigation.navigate("Home");
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const toggleModal = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setIsModalVisible(!isModalVisible);
  };

  const handleModalClose = () => {
    setIsModalVisible(!isModalVisible);
  };

  const fetchBeneficiaries = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      const bearerToken = await AsyncStorage.getItem('token');

      if (customerId && bearerToken) {
        const response = await axios.get(`${API_BASE_URL}/v1/beneficiary/getAllBeneficiary?customerId=${customerId}&flag=false`, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        });

        const dto = response.data;

        if (dto && dto.success && dto.data) {
          const transformedBeneficiaries = dto.data.map(item => ({
            ...item,
            liked: item.flag
          }));

          // Sort beneficiaries first by flag (true first) and within that by id in descending order
          transformedBeneficiaries.sort((a, b) => {
            if (b.flag === a.flag) {
              return b.id - a.id;
            }
            return b.flag - a.flag;
          });

          setBeneficiaries(transformedBeneficiaries);
        } else {
          if (dto.message) {
            Alert.alert('Error', dto.message);
          } else if (dto.errors && dto.errors.length > 0) {
            Alert.alert('Error', dto.errors.join('\n'));
          }
        }
      } else {
        Alert.alert('Error', 'Unexpected error occurred. Try again later!');
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          Alert.alert('Error', 'Server timed out. Try again later!');
        } else if (statusCode === 503) {
          Alert.alert('Error', 'Service unavailable. Please try again later.');
        } else if (statusCode === 400) {
          Alert.alert('Error', error.response.data.data.errors[0]);
        } else {
          Alert.alert('Error', error.message);
        }
      } else if (error.request) {
        Alert.alert('Error', 'No response from the server. Please check your connection.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleUpdateBeneficiary = async (nickname, mobileNumber, beneId, beneficiary) => {
    if (nickname !== beneficiary.beneficiaryAlias || mobileNumber !== beneficiary.mobileNumber) {
      try {
        const bearerToken = await AsyncStorage.getItem('token');
        const customerId = parseInt(await AsyncStorage.getItem('customerId'), 10);

        if (bearerToken && customerId) {
          const updateData = {
            beneficiaryAlias: nickname,
            mobileNumber: mobileNumber,
            beneId: beneId,
            customerId: customerId
          };

          const response = await axios.post(`${API_BASE_URL}/v1/beneficiary/updateBeneficiary`,
            updateData,
            {
              headers: {
                'Authorization': `Bearer ${bearerToken}`
              }
            }
          );

          const dto = response.data;

          if (dto && dto.success && dto.data) {
            fetchBeneficiaries();
            handleModalClose();

            Alert.alert('Success', 'Beneficiary updated successfully');
          }
          else {
            if (dto.message) {
              Alert.alert('Error', dto.message);
            }
            else if (dto.errors && dto.errors.length > 0) {
              Alert.alert('Error', dto.errors);
            }
          }
        } else {
          Alert.alert('Error', 'Unexpected error occured. Try again later!');
        }
      } catch (error) {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 404) {
            Alert.alert('Error', 'Server timed out. Try again later!');
          } else if (statusCode === 503) {
            Alert.alert('Error', 'Service unavailable. Please try again later.');
          } else if (statusCode === 400) {
            Alert.alert('Error', error.response.data.data.errors[0]);
          } else {
            Alert.alert('Error', error.message);
          }
        } else if (error.request) {
          Alert.alert('Error', 'No response from the server. Please check your connection.');
        } else {
          Alert.alert('Error', error.message);
        }
      }
    }
    else {
      handleModalClose();
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchBeneficiaries();
    }, [])
  );

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleRemoveBeneficiary = async (id) => {
    setBeneficiaries((prevBeneficiaries) =>
      prevBeneficiaries.filter(b => b.id !== id)
    );

    try {
      const bearerToken = await AsyncStorage.getItem('token');

      if (bearerToken) {
        const response = await axios.post(`${API_BASE_URL}/v1/beneficiary/deleteBene/${id}`, {}, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        });

        const dto = response.data;

        if (dto && dto.success && dto.data) {
          Alert.alert('Success', 'Beneficiary deleted successfully');
        }
        else {
          if (dto.message) {
            Alert.alert('Error', dto.message);
          }
          else if (dto.errors && dto.errors.length > 0) {
            Alert.alert('Error', dto.errors);
          }
        }
      }
      else {
        Alert.alert('Error', 'Unexpected error occured. Try again later!');
      }
    }
    catch (error) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          Alert.alert('Error', 'Server timed out. Try again later!');
        } else if (statusCode === 503) {
          Alert.alert('Error', 'Service unavailable. Please try again later.');
        } else if (statusCode === 400) {
          Alert.alert('Error', error.response.data.data.errors[0]);
        } else {
          Alert.alert('Error', error.message);
        }
      } else if (error.request) {
        Alert.alert('Error', 'No response from the server. Please check your connection.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleLikeToggle = async (id) => {
    setBeneficiaries((prevBeneficiaries) =>
      prevBeneficiaries.map((b) =>
        b.id === id ? { ...b, liked: !b.liked } : b
      )
    );

    try {
      const bearerToken = await AsyncStorage.getItem('token');
      const customerId = await AsyncStorage.getItem('customerId');

      if (bearerToken && customerId) {
        const response = await axios.post(`${API_BASE_URL}/v1/beneficiary/addToFavourite?beneId=${id}&flag=true&customerId=${customerId}`, {}, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        });

        const dto = response.data;

        if (dto && dto.success && dto.data) {
          fetchBeneficiaries();
        }
        else {
          if (dto.message) {
            Alert.alert('Error', dto.message);
          }
          else if (dto.errors && dto.errors.length > 0) {
            Alert.alert('Error', dto.errors);
          }
        }
      }
      else {
        Alert.alert('Error', 'Unexpected error occured. Try again later!');
      }
    }
    catch (error) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          Alert.alert('Error', 'Server timed out. Try again later!');
        } else if (statusCode === 503) {
          Alert.alert('Error', 'Service unavailable. Please try again later.');
        } else if (statusCode === 400) {
          Alert.alert('Error', error.response.data.data.errors[0]);
        } else {
          Alert.alert('Error', error.message);
        }
      } else if (error.request) {
        Alert.alert('Error', 'No response from the server. Please check your connection.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleNamePress = (id) => {
    navigation.navigate('SendFromAccount', { beneficiaryId: id });
  };

  const filteredBeneficiaries = beneficiaries.filter((beneficiary) =>
    beneficiary.beneficiaryAlias.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="h-full flex-1" style={{ backgroundColor: Color.PrimaryWebOrient }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={{ backgroundColor: Color.PrimaryWebOrient, height: 100 }}>
          <View className="flex-row items-center justify-center w-full h-full">
            <TouchableOpacity
              onPress={() => {
                source === 'beneficiary' && navigation.navigate('Home');
                source === 'payment' && navigation.goBack();
              }}
              className="absolute left-5"
            >
              <Entypo name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-InterBold">
              {source === 'payment' ? 'Payment' : 'Beneficiary'}
            </Text>
          </View>
        </View>

        <View className="w-full h-full px-6 bg-[#F5F5F5] pb-20">
          <View className="mt-6">
            <SearchBar
              placeholder="Search My Payees"
              onChangeText={handleSearchChange}
              value={searchQuery}
            />
          </View>

          <View className="mt-7">
            <TouchableOpacity className="flex-row items-center">
              <View className="p-3 rounded-lg shadow-lg shadow-gray-500 justify-center items-center" style={{ backgroundColor: Color.PrimaryWebOrient }}>
                <Image
                  source={require("../../../assets/own-account-icon.png")}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-InterSemiBold mb-0.5">Own Account</Text>
              </View>
            </TouchableOpacity>

            {source !== 'payment' && (<View className="my-3 w-full border-b border-gray-300" />)}

            {source !== 'payment' && (<TouchableOpacity
              className="flex-row items-center"
              onPress={() => navigation.navigate("BankList")}
            >
              <View className="p-3 rounded-lg shadow-lg shadow-gray-500 justify-center items-center" style={{ backgroundColor: Color.PrimaryWebOrient }}>
                <Image
                  source={require("../../../assets/add-icon.png")}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-InterSemiBold mb-0.5">
                  Add New Beneficiary
                </Text>
              </View>
            </TouchableOpacity>)}

            {source !== 'payment' && (<View className="mt-3 mb-4 w-full border-b border-gray-300" />)}
            {source === 'payment' && (<View className="my-4 w-full border-b border-gray-300" />)}

            {filteredBeneficiaries.map((beneficiary) => (
              <React.Fragment key={beneficiary.id}>
                <OptionBox
                  beneObj={beneficiary}
                  image={{ uri: beneficiary.bankUrl }}
                  text={beneficiary.beneficiaryAlias}
                  subtext={beneficiary.accountNumber}
                  icon1={beneficiary.liked ? "heart" : "hearto"}
                  icon2="trash-2"
                  iconColor1={beneficiary.liked ? "red" : "darkgray"}
                  iconColor2="darkgray"
                  payment={beneficiary.payment}
                  onPress1={() => handleLikeToggle(beneficiary.id)}
                  onPress2={() => handleRemoveBeneficiary(beneficiary.id)}
                  onPressName={() => handleNamePress(beneficiary.id)}
                  toggleModal={() => toggleModal(beneficiary)}
                  beneficiary={true}
                  navigation={navigation}
                  source={source}
                />
                <View className="my-4 w-full border-b border-gray-300" />
              </React.Fragment>
            ))}
          </View>
        </View>

        <EditBeneficiaryModal isModalVisible={isModalVisible} toggleModal={toggleModal} beneficiary={selectedBeneficiary} handleUpdateBeneficiary={handleUpdateBeneficiary} />
      </ScrollView>
      <Footer />
      <StatusBar backgroundColor={Color.PrimaryWebOrient} style="light" />
    </SafeAreaView>
  );
};

export default BeneficiaryList;