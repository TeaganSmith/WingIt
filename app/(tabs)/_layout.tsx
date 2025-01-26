import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Image, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { items as airportList } from 'Z:/TAMUHacks/WingIt/CleanedAirportList';
import styles from 'Z:/TAMUHacks/WingIt/styles/explore.styles.js';
import { Searchbar } from 'react-native-paper';
import * as React from 'react';

const image = require('@/assets/images/image.png');

type Airport = typeof airportList[number];

export default function TabTwoScreen() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState('Select Your Airport');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAirports, setFilteredAirports] = useState(airportList);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelectAirport = (airport: Airport) => {
    setSelectedAirport(airport.name);
    setDropdownVisible(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Filter the airport list based on the query
    if (query.trim() === '') {
      setFilteredAirports(airportList); // Reset to the full list if query is empty
    } else {
      const lowerQuery = query.toLowerCase();
      const results = airportList.filter((airport) =>
        airport.name.toLowerCase().includes(lowerQuery) || airport.code.toLowerCase().includes(lowerQuery)
      );
      setFilteredAirports(results);
    }
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
            <Image style={styles.logo} source={require('@/assets/images/LOGO_1.png')} />
          </View>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
              <Text style={styles.buttonText}>{selectedAirport}</Text>
            </TouchableOpacity>

            {isDropdownVisible && (
              <View style={styles.dropdown}>
                {/* Searchbar Component */}
                <Searchbar
                  placeholder="Search for an airport..."
                  onChangeText={handleSearch}
                  value={searchQuery}
                  style={styles.searchBar} // Add a style to customize the search bar appearance
                />
                {/* Filtered Airport List */}
                <FlatList
                  data={filteredAirports}
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
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
