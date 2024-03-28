import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';

const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => console.error(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      {userLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
            title="You are here"
            description="This is your current location"
          />
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapPage;
