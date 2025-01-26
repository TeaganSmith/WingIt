import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Use this for iOS/Android compatibility
import { DatePickerModal } from 'react-native-paper-dates';
import airports from '../airports_formatted.js';
import Autocomplete from 'react-native-autocomplete-input';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from '../styles/explore.styles.js';

const image = require('@/assets/images/backgroundimg.png');

export default function Search() {
  const [query, setQuery] = useState(''); // User's search input
  const [selectedAirport, setSelectedAirport] = useState('Select Your Airport'); // Final selected airport
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]); // Filtered airport suggestions
  const [departureDate, setDepartureDate] = useState<Date | null>(null); // For departure date
  const [returnDate, setReturnDate] = useState<Date | null>(null); // For return date
  const [isDeparturePickerOpen, setDeparturePickerOpen] = useState(false);
  const [isReturnPickerOpen, setReturnPickerOpen] = useState(false);
  const [description, setDescription] = useState(''); // For description input

  // Function to handle user input and filter the airports
  interface Airport {
    name: string;
    city: string;
    code: string;
  }

  const filterAirports = (text: string): void => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = airports.filter(
        (airport: Airport) =>
          airport.name.toLowerCase().includes(text.toLowerCase()) ||
          airport.city.toLowerCase().includes(text.toLowerCase()) ||
          airport.code.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAirports(filtered.slice(0, 10)); // Show top 10 matches
    } else {
      setFilteredAirports([]); // Clear suggestions if query is empty
    }
  };

  interface HandleSelectAirportProps {
    city: string;
    code: string;
    name: string;
  }

  const handleSelectAirport = (airport: HandleSelectAirportProps): void => {
    setQuery(`${airport.city} (${airport.code})`); // Update input with city and code
    setSelectedAirport(airport.name); // Save full airport name
    setFilteredAirports([]); // Hide suggestions
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.background}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('@/assets/images/LOGO.png')} />
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

            

            {/* Departure and Return Dates Row */}
            <View style={styles.row}>
                {/* Departure Date */}
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setDeparturePickerOpen(true)}
                >
                  <Text style={styles.inputText}>
                    {departureDate ? departureDate.toDateString() : 'Departure'}
                  </Text>
                </TouchableOpacity>
                <DatePickerModal
                  locale="en" // Add locale property
                  mode="single"
                  visible={isDeparturePickerOpen}
                  onDismiss={() => setDeparturePickerOpen(false)}
                  date={departureDate || new Date()}
                  onConfirm={(date) => {
                    setDeparturePickerOpen(false);
                    setDepartureDate(date.date ? new Date(date.date) : null);
                  }}
                />

                {/* Return Date */}
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setReturnPickerOpen(true)}
                >
                  <Text style={styles.inputText}>
                    {returnDate ? returnDate.toDateString() : 'Return'}
                  </Text>
                <DatePickerModal
                  locale="en" // Add locale property
                  mode="single"
                  visible={isReturnPickerOpen}
                  onDismiss={() => setReturnPickerOpen(false)}
                  date={returnDate || new Date()}
                  onConfirm={(date) => {
                    setReturnPickerOpen(false);
                    setReturnDate(date.date ? new Date(date.date) : null);
                  }}
                />
                </TouchableOpacity>
              </View>

              {/* Form*/}
              <View style={styles.container}>
                <TextInput
                style={styles.descriptionInput}
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder="Enter description"
                multiline={true}
              />

              {/* Search Button */}
              <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </SafeAreaProvider>
  );
}
