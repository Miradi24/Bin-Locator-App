//Miradi Ombala Nyembo
//x19446812
//Bin Locator Application 

// Import necessary libraries for React Native application
// React is the core library for building user interfaces
// useState and useEffect are React hooks for state and lifecycle management
// react-native-maps is used for integrating Google Maps in React Native
// expo-location provides access to the device's GPS location
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
    // State variables to hold user location and error messages
    const [location, setLocation] = useState(null); // Stores the user's current location
    const [errorMsg, setErrorMsg] = useState(null); // Stores any error messages related to GPS access

    // useEffect is used to request GPS permissions and fetch the user's location when the app loads
    useEffect(() => {
        (async () => {
            // Request permissions to access the user's location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied.'); // Handle denied permissions
                return;
            }

            // Fetch the user's current GPS coordinates
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords); // Store the fetched location in state
        })();
    }, []);

    // Display a message while fetching location or in case of an error
    let text = 'Fetching location...';
    if (errorMsg) {
        text = errorMsg; // Display error message if permissions are denied
    } else if (location) {
        text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`; // Show the user's GPS coordinates
    }

    return (
        <View style={styles.container}>
            {/* Application header with a green background and title */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Bin Locator Application</Text>
            </View>

            {/* Display the map with the user's location */}
            <MapView
                style={styles.map}
                region={
                    location
                        ? {
                            latitude: location.latitude, // Center map on user's latitude
                            longitude: location.longitude, // Center map on user's longitude
                            latitudeDelta: 0.01, // Controls map zoom level
                            longitudeDelta: 0.01,
                        }
                        : {
                            latitude: 53.3498, // Default latitude (e.g., Dublin)
                            longitude: -6.2603, // Default longitude
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }
                }
            >
                {/* Add a marker to indicate the user's location */}
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude, // Marker latitude
                            longitude: location.longitude, // Marker longitude
                        }}
                        title="Your Location" // Title displayed when marker is tapped
                    />
                )}
            </MapView>

            {/* Display the user's GPS coordinates below the map */}
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>{text}</Text>
            </View>
        </View>
    );
}

// Define styles for the application components
const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures the app fills the entire screen
    },
    header: {
        height: 60,
        backgroundColor: '#4CAF50', // Green background color for the header
        justifyContent: 'center', // Center the text vertically
        alignItems: 'center', // Center the text horizontally
    },
    headerText: {
        color: 'white', // White text color
        fontSize: 18, // Font size for the header text
        fontWeight: 'bold', // Make the text bold
    },
    map: {
        flex: 1, // Map component fills the remaining screen space
    },
    infoBox: {
        padding: 10,
        backgroundColor: '#f8f8f8', // Light gray background for the info box
        alignItems: 'center', // Center the text horizontally
    },
    infoText: {
        fontSize: 14, // Font size for the GPS text
        color: '#333', // Dark gray text color
    },
});
