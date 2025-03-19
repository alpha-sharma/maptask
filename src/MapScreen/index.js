import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./MapScreen.style";


const MapScreen = () => {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const [locations, setLocations] = useState([]);
  const [update, setUpdate] = useState(false);


  useEffect(() => {
    const loadStoredLocations = async () => {
      const stored = JSON.parse(await AsyncStorage.getItem("locations")) || [];
      setLocations(stored);
    };

    loadStoredLocations();

    const watchId = Geolocation.watchPosition(
      async (pos) => {
        const crd = pos.coords;
        const newPosition = {
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
          timestamp: new Date().toISOString(),
        };

        setPosition(newPosition);

        // Update local storage
        const storedLocations =
          JSON.parse(await AsyncStorage.getItem("locations")) || [];
        storedLocations.push(newPosition);

        await AsyncStorage.setItem(
          "locations",
          JSON.stringify(storedLocations)
        );

        setLocations(storedLocations);
      },
      (err) => console.log(err),
      { enableHighAccuracy: true, distanceFilter: 5 }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  
    const clearLocations = async () => {
      setLocations([]); 
      await AsyncStorage.removeItem("locations");
      setUpdate(prev => !prev); 
    };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={position}
        showsUserLocation={true}
        followsUserLocation={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        <Marker
          title="You are here"
          description="Current Location"
          coordinate={position}
        />
      </MapView>

      <TouchableOpacity
        style={styles.overlayButton}
        onPress={() => clearLocations()}
      >
        <Text style={styles.text}>Clear Stored Locations</Text>
      </TouchableOpacity>
      <View style= {styles.list}>
        <FlatList
          data={locations}
          keyExtractor={(item, index) => index.toString()}
          extraData={update}
          ListHeaderComponent={() => (
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Latitude</Text>
              <Text style={styles.tableHeaderText}>Longitude</Text>
              <Text style={styles.tableHeaderText}>Time</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.latitude.toFixed(6)}</Text>
              <Text style={styles.cell}>{item.longitude.toFixed(6)}</Text>
              <Text style={styles.cell}>
                {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MapScreen;
