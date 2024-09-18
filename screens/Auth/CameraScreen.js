// import React, { useEffect, useRef, useState } from 'react';
// import { StyleSheet, Text, View, Animated, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { StatusBar } from "expo-status-bar";
// import { Camera, useCameraDevice, useFrameProcessor, useCameraPermission } from 'react-native-vision-camera';
// import { useFaceDetector } from 'react-native-vision-camera-face-detector';
// import { Worklets } from 'react-native-worklets-core';
// import { Entypo } from '@expo/vector-icons';
// import RNFS from 'react-native-fs';
// import LottieView from 'lottie-react-native';
// import axios from 'axios';

// import { Color } from "../../GlobalStyles";

// export default function App({ navigation }) {
//   const [frameWidth, setFrameWidth] = useState(0);
//   const [frameHeight, setFrameHeight] = useState(0);
//   const [progress, setProgress] = useState(new Animated.Value(0));
//   const [faceDetected, setFaceDetected] = useState(false);
//   const [message, setMessage] = useState("Scanning in progress...");
//   const [scanning, setScanning] = useState(true);
//   const [status, setStatus] = useState(false);
//   const [result, setResult] = useState('');
//   const [flag, setFlag] = useState(false);

//   const [scannerAnimation] = useState(new Animated.Value(0));
//   const cameraRef = useRef(null);

//   const faceDetectionOptions = useRef({
//     mode: 'accurate',
//     detectLandmarks: true,
//     runClassifications: true,
//     trackingEnabled: true,
//     performanceMode: 'fast'
//   }).current;

//   const device = useCameraDevice('front');
//   const { hasPermission, requestPermission } = useCameraPermission();
//   const { detectFaces } = useFaceDetector(faceDetectionOptions);

//   // Function to animate the progress bar to a specific value
//   const animateProgress = (toValue, duration = 5000) => {
//     return Animated.timing(progress, {
//       toValue, // Animate to the provided value
//       duration, // Set the duration dynamically
//       useNativeDriver: false, // Can't use native driver for width animation
//     });
//   };

//   // Function to start progress animation up to 75%
//   const startProgressTo75 = () => {
//     animateProgress(75, 3750).start(); // Animate to 75% in 75% of the time (75% of 5000ms)
//   };

//   // Function to complete the progress from 75% to 100%
//   const completeProgress = () => {
//     animateProgress(100, 1250).start(); // Remaining 25% of time (1250ms)
//   };

//   useEffect(() => {
//     if (!hasPermission) {
//       requestPermission();
//     }

//     return () => {
//       setFaceDetected(false);
//     };
//   }, [hasPermission, requestPermission]);

//   // Send image to API
//   const sendImageToAPI = async (base64Image) => {
//     try {
//       startProgressTo75();

//       const response = await axios.post('http://192.168.0.160:5000/check-liveness', {
//         image: base64Image,
//       });
//       console.log('Image uploaded successfully:', response.data);

//       if (response.data.results.length > 0) {
//         setMessage('The Image is ' + response.data.results[0].liveness);
//         setStatus(true);
//         setResult(response.data.results[0].liveness);

//         if (response.data.results[0].liveness === 'real' || response.data.results[0].liveness === 'Real') {
//           setTimeout(() => {
//             setFlag(true);
//           }, 2000);
//         }
//         else {
//           setTimeout(() => {
//             setMessage('Try again!');
//             setStatus(false);
//           }, 3000);
//         }
//       } else {
//         setMessage('Try again!');
//         setStatus(false);
//       }
//     } catch (error) {
//       setMessage('Try again!');
//       setStatus(false);
//       console.log('Error uploading image:', error);
//     } finally {
//       setScanning(false);
//       setTimeout(() => {
//         completeProgress();
//       }, 100);
//     }
//   };

//   useEffect(() => {
//     if (flag) {
//       setTimeout(() => {
//         navigation.navigate('Home'); // Navigate to the "Home" screen
//       }, 1500); // Wait for 2 seconds before navigating
//     }
//   }, [flag]);

//   const captureImage = async () => {
//     try {
//       if (cameraRef.current) {
//         const photo = await cameraRef.current.takePhoto({
//           qualityPrioritization: 'balance',
//           skipProcessing: false,
//         });

//         if (photo.path) {
//           const base64Image = await RNFS.readFile(photo.path, 'base64');
//           console.log('Base64 Image:', base64Image);
//           console.log('Captured image URI:', photo.path);

//           await sendImageToAPI(base64Image);
//         } else {
//           console.warn('Photo path is undefined.');
//         }
//       } else {
//         console.warn('Camera ref is null.');
//       }
//     } catch (error) {
//       setMessage("Try again!");
//       setStatus(false);
//       console.log('Error capturing photo:', error);
//     }
//   };

//   useEffect(() => {
//     if (faceDetected) {
//       // Stop the scanner animation when a face is detected
//       Animated.timing(scannerAnimation, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();

//       // Capture the image after a face is detected
//       captureImage();
//     } else {
//       // Start the scanner animation when scanning
//       Animated.loop(
//         Animated.timing(scannerAnimation, {
//           toValue: 1,
//           duration: 1500,
//           useNativeDriver: true,
//         })
//       ).start();
//     }
//   }, [faceDetected]);

//   const handleDetectedFaces = Worklets.createRunOnJS((faces) => {
//     if (faces.length > 0 && !faceDetected) {
//       const face = faces[0];
//       const { bounds } = face;

//       // Calculate the center of the face
//       const faceCenterX = bounds.x + (bounds.width / 2);
//       const faceCenterY = bounds.y + (bounds.height / 2);

//       // Calculate the center of the camera frame
//       const frameCenterX = frameWidth / 2;
//       const frameCenterY = (frameHeight / 2) * 0.7; // Adjust this value to move the target slightly upwards

//       // Check if the face center is within a specific distance from the frame center
//       const distance = Math.sqrt(Math.pow(faceCenterX - frameCenterX, 2) + Math.pow(faceCenterY - frameCenterY, 2));
//       const maxDistance = frameWidth / 4; // Adjust this value as needed

//       if (distance <= maxDistance) {
//         // Face is centered and within the specified area
//         setTimeout(() => setFaceDetected(true), 500); // Stop further face detection

//         // Convert face data to JSON string
//         const faceDataJson = JSON.stringify(faces);

//         // Encode JSON string to base64
//         const faceDataBase64 = base64.encode(faceDataJson);
//         console.log('Face data in base64:', faceDataBase64);
//       }
//     }
//   });

//   const frameProcessor = useFrameProcessor((frame) => {
//     'worklet';
//     try {
//       const faces = detectFaces(frame);
//       handleDetectedFaces(faces, frame);
//     } catch (error) {
//       console.log("Error in frame processing:", error);
//     }
//   }, [handleDetectedFaces, faceDetected]);

//   // Scanner overlay animation
//   const scannerTransform = scannerAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [-180, 100], // Adjust this value based on your design
//   });

//   const progressInterpolate = progress.interpolate({
//     inputRange: [0, 100],
//     outputRange: ['0%', '100%'], // Convert progress value to percentage
//   });

//   const retryScan = () => {
//     // Reset the states
//     setFaceDetected(false);
//     setMessage("Scanning in progress...");
//     setScanning(true);

//     // Reset the progress bar to 0
//     setProgress(new Animated.Value(0)); // Reset the progress animation

//     // Restart the scanner animation
//     Animated.loop(
//       Animated.timing(scannerAnimation, {
//         toValue: 1,
//         duration: 1500,
//         useNativeDriver: true,
//       })
//     ).start();
//   };

//   if (!device || !hasPermission) {
//     return (
//       <View className="flex-1 justify-center items-center px-4">
//         <Text className="font-InterSemiBold text-lg">
//           {device ? 'Requesting camera permissions...' : 'No camera device available'}
//         </Text>
//       </View>
//     );
//   };

//   if (flag) {
//     return (
//       <>
//         <View className="flex-1 justify-center items-center px-4 bg-white">
//           <LottieView
//             source={require('../../assets/checkmark.json')} // Path to your Lottie JSON file
//             style={styles.lottieAnimation}
//             autoPlay
//             loop={false} // Set to false to play the animation only once
//           />
//           <Text className="text-lg font-InterBold text-center mt-8" style={{ color: Color.PrimaryWebOrient }}>Success! Your identity has been confirmed.</Text>
//         </View>

//         <StatusBar backgroundColor="white" style="dark" />
//       </>
//     );
//   }

//   return (
//     <View className="flex-1 justify-center items-center"
//       onLayout={(event) => {
//         const { width, height } = event.nativeEvent.layout;
//         setFrameWidth(width);
//         setFrameHeight(height);
//       }}>

//       <Image source={require('../../assets/test.png')} className="w-full h-full absolute top-0 z-10" resizeMode='cover' />

//       <View className="w-full absolute z-10 top-12 px-5">
//         <View className="flex-row items-center justify-center">
//           <TouchableOpacity className="absolute left-0" onPress={() => navigation.goBack()}>
//             <Entypo name="chevron-left" size={26} color="white" />
//           </TouchableOpacity>

//           <Text className="font-InterBold text-white text-lg left-1">Let's verify your identity</Text>
//         </View>

//         <View className="mt-8">
//           <Text className="font-InterMedium text-white text-base text-center">Experience the Future of Face Detection with Effortless Precision on Your Mobile</Text>
//         </View>
//       </View>

//       <Camera
//         ref={cameraRef}
//         photo={true}
//         style={StyleSheet.absoluteFill}
//         device={device}
//         frameProcessor={frameProcessor}
//         frameProcessorFps={5}
//         isActive={true}
//       />

//       <Image source={require('../../assets/face.png')} tintColor={"white"} className="w-96 h-96 z-10 -top-5" resizeMode='contain' />

//       {!faceDetected && (
//         <Animated.View className="z-10" style={[styles.scannerOverlay, { transform: [{ translateY: scannerTransform }] }]}>
//           <View style={styles.scannerLine} />
//         </Animated.View>
//       )}

//       <View className="w-full px-12 items-center justify-center absolute bottom-[15%] z-10">
//         <Text className="font-InterMedium text-white text-base text-center">Place your face in the oval, start scanning automatically</Text>
//       </View>

//       <View className="w-full absolute bottom-5 px-5 z-10">
//         <View className="w-full bg-white shadow-lg h-16 rounded-full justify-center items-center flex-row overflow-hidden">
//           <Animated.View style={[styles.progressBar, { width: progressInterpolate }]} />

//           <View className="flex-row items-center w-[75%] justify-center">
//             <Image source={require('../../assets/face-id.png')} resizeMode='contain' className="w-7 h-7" />
//             <Text className="font-InterSemiBold ml-1.5">{message}</Text>
//           </View>

//           <View>
//             {scanning && (
//               <ActivityIndicator color={Color.PrimaryWebOrient} />
//             )}

//             {!scanning && status && (
//               <>
//                 {(result === 'real' || result === "Real") && (
//                   <Image
//                     source={require('../../assets/checked.png')}
//                     tintColor="white"
//                     resizeMode='contain'
//                     className="w-5 h-5"
//                   />
//                 )}
//                 {(result === 'spoof' || result === 'Spoof') && (
//                   <Image
//                     source={require('../../assets/cross.png')}
//                     tintColor="white"
//                     resizeMode='contain'
//                     className="w-5 h-5"
//                   />
//                 )}
//               </>
//             )}

//             {(!scanning && !status) && (
//               <TouchableOpacity className="justify-center items-center w-7 h-7 rounded-full bg-white" onPress={retryScan}>
//                 <Image source={require('../../assets/play.png')} tintColor={Color.PrimaryWebOrient} resizeMode='contain' className="w-4 h-4" />
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         {/* <View style={styles.progressBarContainer}>
//           <Animated.View style={[styles.progressBar, { width: progressInterpolate }]} />
//         </View> */}
//       </View>

//       <StatusBar backgroundColor="transparent" style="dark" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   scannerOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scannerLine: {
//     width: '52%',
//     height: 3,
//     backgroundColor: Color.PrimaryWebOrient,
//   },
//   // progressBarContainer: {
//   //   height: 10,
//   //   width: '100%',
//   //   backgroundColor: '#e0e0e0',
//   //   borderRadius: 5,
//   //   overflow: 'hidden',
//   //   marginTop: 10,
//   // },
//   // progressBar: {
//   //   height: '100%',
//   //   backgroundColor: Color.PrimaryWebOrient,
//   // },
//   progressBar: {
//     position: 'absolute',
//     left: 0,
//     height: '100%',
//     backgroundColor: Color.PrimaryWebOrient
//   },
//   lottieAnimation: {
//     width: 150,
//     height: 150,
//   },
// });

import React from 'react'
import { View, Text } from 'react-native'

const CameraScreen = () => {
  return (
    <View>
      <Text>CameraScreen</Text>
    </View>
  )
}

export default CameraScreen