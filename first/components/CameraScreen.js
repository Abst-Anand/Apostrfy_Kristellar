import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';


const CameraScreen = () => {
    const cameraRef = useRef(null);
    const [isCameraReady, setCameraReady] = useState(false);

    const takePicture = async () => {
        if (cameraRef.current && isCameraReady) {
            try {
                const options = { quality: 0.5, base64: true };
                const data = await cameraRef.current.takePictureAsync(options);
                console.log(data.uri);
            } catch (error) {
                console.error('Failed to take picture:', error);
                Alert.alert('Error', 'Failed to take picture. Please try again.');
            }
        }
    };

    const handleCameraError = () => {
        Alert.alert(
            'Camera Error',
            'Failed to open the camera. Please make sure your device has a working camera and the necessary permissions are granted.'
        );
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                onCameraReady={() => setCameraReady(true)}
                captureAudio={false}
                onError={handleCameraError}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                    <Text style={styles.captureButtonText}>Take Picture</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    captureButton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    captureButtonText: {
        fontSize: 16,
        color: '#000',
    },
});

export default CameraScreen;
