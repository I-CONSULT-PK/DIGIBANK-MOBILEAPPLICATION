import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as FileSystem from 'expo-file-system';
import { color } from "@rneui/base/dist";
import Download from "../../../assets/Images/Download.svg";


const Downloads = () => {
  const handleDownload = async () => {
 
const DownloadFile = () => {
  const handleDownload = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + '.TXT'; // File path in device's local storage
      await FileSystem.downloadAsync(
        'https://www.dwsamplefiles.com/download-txt-sample-files/#google_vignette', // URL of the file to download
        fileUri // Local file path to save the downloaded file
      );
      Alert.alert('Download Complete', 'The file has been downloaded s unsucessfully.');
    } catch (error) {
      Alert.alert('Download Error', 'Failed to download the file. Please try again later.');
      console.error('Error downloading file:', error);
    }
  }; 

  const handleShare = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'Task Compilation Document.TXT';
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert('Share Error', 'Failed to share the file. Please try again later.');
      console.error('Error sharing file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDownload}>
        <View style={styles.button}>
          <Text style={styles.buttonText}><Download /></Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

  },


});
  }}
export default Downloads;
