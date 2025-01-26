import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Image, ImageBackground, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { items as airportList } from '../CleanedAirportList';
import styles from '../styles/explore.styles.js';
import * as React from 'react';

const image = require('@/assets/images/backgroundimg.png');

type Airport = typeof airportList[number];

export default function Search() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState('Select Your Airport');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [vacationDescription, setVacationDescription] = useState('');

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelectAirport = (airport: Airport) => {
    setSelectedAirport(airport.name);
    setDropdownVisible(false);
  };

  const handleSearch = () => {
    console.log({
      airport: selectedAirport,
      departureDate,
      arrivalDate,
      vacationDescription,
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center' }}
        >
          <View style={{ alignItems: 'center', alignContent: 'center', padding: 0, marginTop: 100 }}>
            <Image style={styles.logo} source={require('@/assets/images/LOGO.png')} />
          </View>
          <View style={styles.container}>
            {/* Airport Selector */}
            <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
              <Text style={styles.buttonText}>{selectedAirport}</Text>
            </TouchableOpacity>

            {isDropdownVisible && (
              <View style={styles.dropdown}>
                <FlatList
                  data={airportList}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleSelectAirport(item)}
                    >
                      <Text style={styles.dropdownItemText}>
                        {item.name} ({item.code})
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            {/* Departure Date */}
            <TextInput
              style={styles.input}
              placeholder="Departure Date (YYYY-MM-DD)"
              placeholderTextColor="#aaa"
              value={departureDate}
              onChangeText={setDepartureDate}
            />

            {/* Arrival Date */}
            <TextInput
              style={styles.input}
              placeholder="Arrival Date (YYYY-MM-DD)"
              placeholderTextColor="#aaa"
              value={arrivalDate}
              onChangeText={setArrivalDate}
            />

            {/* Vacation Description */}
            <TextInput
              style={styles.textArea}
              placeholder="Vacation Descriptions..."
              placeholderTextColor="#aaa"
              multiline
              value={vacationDescription}
              onChangeText={setVacationDescription}
            />

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
