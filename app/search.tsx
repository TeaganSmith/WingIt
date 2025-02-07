// search.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { StyleSheet } from "react-native";
import airports from "../airports_formatted.js";
import { SafeAreaProvider } from "react-native-safe-area-context";
import styles from "../styles/explore.styles.js";
import { useNavigation } from '@react-navigation/core'; // Import useNavigation from @react-navigation/core

interface Airport {
  name: string;
  city: string;
  code: string;
}

const SearchScreen: React.FC = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [query, setQuery] = useState<string>(""); // User's search input
  const [selectedAirport, setSelectedAirport] = useState<string>(""); // Selected airport code
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]); // Filtered airport suggestions

  const [departureDate, setDepartureDate] = useState<Date | null>(null); // Departure date
  const [returnDate, setReturnDate] = useState<Date | null>(null); // Return date
  const [isDeparturePickerOpen, setIsDeparturePickerOpen] = useState<boolean>(false); // State for departure picker
  const [isReturnPickerOpen, setIsReturnPickerOpen] = useState<boolean>(false); // State for return picker
  const [userInput, setUserInput] = useState<string>(""); // Additional user input
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state


  // Function to handle user input and filter the airports
  interface Airport {
    name: string;
    city: string;
    code: string;
  }

  // Filter airports based on the query
  const filterAirports = (text: string): void => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = airports.filter(
        (airport: Airport) =>
          airport.name.toLowerCase().includes(text.toLowerCase()) ||
          airport.city.toLowerCase().includes(text.toLowerCase()) ||
          airport.code.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAirports(filtered.slice(0, 10)); // Limit to top 10 results
    } else {
      setFilteredAirports([]); // Clear suggestions if no query
    }
  };

  // Handle selecting an airport from the suggestions
  const handleSelectAirport = (airport: Airport): void => {
    setQuery(`${airport.city} (${airport.code})`); // Update input field
    setSelectedAirport(airport.code); // Save airport code
    setFilteredAirports([]); // Clear suggestions
  };

  // Handle search submission
  const handleSearch = async (): Promise<void> => {
    console.log("Search button clicked"); // Debugging statement
    if (!selectedAirport) {
      Alert.alert("Error", "Please select an airport.");
      return;
    }
    if (!departureDate || !returnDate) {
      Alert.alert("Error", "Please select both departure and return dates.");
      return;
    }

    try {
      setIsLoading(true); // Show loading indicator
      console.log("Preparing payload...");

      // Format dates as YYYY-MM-DD
      const checkInDateStr = departureDate
        ? departureDate.toISOString().split("T")[0]
        : "";
      const checkOutDateStr = returnDate
        ? returnDate.toISOString().split("T")[0]
        : "";

      const payload = {
        user_input: userInput,
        origin_code: selectedAirport,
        check_in_date: checkInDateStr,
        check_out_date: checkOutDateStr,
      };

      console.log("Payload:", payload); // Debug payload

      // Replace '127.0.0.1' with your computer's local IP if using a physical device
      const response = await fetch("http://127.0.0.1:5000/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Fetch response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Network response was not ok:", response.status, errorText);
        Alert.alert("Error", "Failed to generate itinerary.");
        return;
      }

      const itineraryResponse = await response.json();
      console.log("Received itinerary:", itineraryResponse);

      // Extract destinations
      const destinations = itineraryResponse.itinerary.destinations;

      // Navigate to Itinerary screen with destinations as JSON string
      navigation.navigate('Itinerary', { destinations: JSON.stringify(destinations) });
    } catch (err) {
      console.error("Error during search:", err);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, ...localStyles }}>
        <ImageBackground
          source={require("@/assets/images/backgroundimg.png")}
          resizeMode="cover"
          style={localStyles.background}
        >
          {/* Logo */}
          <View style={localStyles.logoContainer}>
            <Image
              style={localStyles.logo}
              source={require("@/assets/images/LOGO.png")}
            />
          </View>

          {/* Form */}
          <View style={styles.container}>
            {/* Autocomplete Airport Selector */}
            <View style={styles.autocompleteContainer}>
              <TextInput
                style={styles.input}
                value={query}
                onChangeText={(text) => filterAirports(text)}
                placeholder="Type airport name, city, or code"
                placeholderTextColor="#000" 
              />
              {filteredAirports.length > 0 && (
                <FlatList
                  data={filteredAirports}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleSelectAirport(item)}
                    >
                      <Text style={styles.dropdownItemText}>
                        {item.city} ({item.code}) - {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>


            {/* Selected Airport */}
            <Text style={styles.selectedAirport}>
              Selected Airport: {selectedAirport || "None"}
            </Text>


            {/* Departure and Return Dates */}
            <View style={styles.row}>
              {/* Departure Date Picker */}
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setIsDeparturePickerOpen(true)}
              >
                <Text style={styles.inputText}>
                  {departureDate
                    ? departureDate.toDateString()
                    : "Select Departure Date"}
                </Text>
              </TouchableOpacity>
              <DatePickerModal
                locale="en"
                mode="single"
                visible={isDeparturePickerOpen}
                onDismiss={() => setIsDeparturePickerOpen(false)}
                date={departureDate || new Date()}
                onConfirm={(params) => {
                  if (params.date) {
                    setDepartureDate(new Date(params.date)); // Set the selected date
                  }
                  setIsDeparturePickerOpen(false); // Close the picker
                }}
              />

              {/* Return Date Picker */}
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setIsReturnPickerOpen(true)}
              >
                <Text style={styles.inputText}>
                  {returnDate ? returnDate.toDateString() : "Select Return Date"}
                </Text>

              </TouchableOpacity>
              <DatePickerModal
                locale="en"
                mode="single"
                visible={isReturnPickerOpen}
                onDismiss={() => setIsReturnPickerOpen(false)}
                date={returnDate || new Date()}
                onConfirm={(params) => {
                  if (params.date) {
                    setReturnDate(new Date(params.date)); // Set the selected date
                  }
                  setIsReturnPickerOpen(false); // Close the picker
                }}
              />
            </View>


            {/* User Input */}
            <TextInput
              style={styles.input}
              value={userInput}
              onChangeText={(text) => setUserInput(text)}
              placeholder="Enter your travel preferences"
            />

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {/* Loading Indicator */}
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const localStyles = StyleSheet.create({
  logo: {
    height: 120,
    width: 265,
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 15, // Added horizontal padding for better layout
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  destinationContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background for readability
    padding: 10,
    borderRadius: 10,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  offerContainer: {
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  offerText: {
    color: '#fff',
    fontSize: 14,
  },
  sliceContainer: {
    marginTop: 5,
    paddingLeft: 10,
  },
  sliceText: {
    color: '#ddd',
    fontSize: 12,
  },
  hotelContainer: {
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  hotelText: {
    color: '#fff',
    fontSize: 14,
  },
  experienceContainer: {
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  experienceText: {
    color: '#fff',
    fontSize: 14,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default SearchScreen;

