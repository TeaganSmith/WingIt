import React from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
  Image,
  Text,
  ActivityIndicator
} from "react-native";
import { useRoute, useSearchParams, useState, useEffect } from "@react-navigation/core"; // Use React Navigation
import { ExpandableInfo } from "../components/Trip";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Define the structure of the itinerary object
type Destination = {
  city_name: string;
  airport_code: string;
  description: string;
  flight_offers?: any[];
  hotel_offers?: any[];
  matched_experiences?: any[];
};
export default function ItinerariesPage() {
  const { itinerary_id, destinations } = useSearchParams();
  const [itinerary, setItinerary] = useState(null);
  const parsedDestinations = destinations ? JSON.parse(destinations) : [];

  useEffect(() => {
    if (itinerary_id) {
      // Poll for full itinerary
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/get-itinerary/${itinerary_id}`);
          if (response.ok) {
            const data = await response.json();
            if (data.status === "complete") {
              setItinerary(data.full_itinerary);
              clearInterval(interval); // Stop polling once the full itinerary is ready
            }
          }
        } catch (err) {
          console.error("Error fetching itinerary:", err);
        }
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [itinerary_id]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/images/backgroundimg.png")} style={styles.background}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            {parsedDestinations.map((dest: Destination, index: number) => (
            <ExpandableInfo
              key={index}
              title={`Trip to ${dest.city_name}`}
              content={`City Code: ${dest.airport_code}\nDescription: ${dest.description}`}
              onPress={() => {}}
            />
            ))}
            {!itinerary ? (
            <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
            ) : (
            itinerary.destinations.map((dest: Destination, index: number) => (
              <ExpandableInfo
                key={index}
                title={`Detailed Trip to ${dest.city_name}`}
                content={`Flight Offers: ${dest.flight_offers?.length ?? 0}\nHotel Offers: ${dest.hotel_offers?.length ?? 0}\nExperiences: ${dest.matched_experiences?.length ?? 0}`}
                onPress={() => {}}
              />
            ))
            )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 120,
    width: 265,
    marginTop: 15,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    marginBottom: 100,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  noDataText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

