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
  const [searchText, setSearchText] = useState('');
  const [filteredAirports, setFilteredAirports] = useState(airportList);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    if (!isDropdownVisible) {
      setSearchText(''); // Reset search text when reopening the dropdown
      setFilteredAirports(airportList); // Reset the filtered list
    }
  };

  const handleSelectAirport = (airport: Airport) => {
    setSelectedAirport(airport.name);
    setDropdownVisible(false);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = airportList.filter((airport) =>
      airport.name.toLowerCase().includes(text.toLowerCase()) || 
      airport.code.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredAirports(filtered);
  };

  return (
    <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
            source={image}
            resizeMode="cover"
            style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center' }}
            >
            <View style={{alignItems: 'center', alignContent: 'center', padding: 0, marginTop: 100}}>
                <Image
                style={styles.logo}
                source={require('@/assets/images/LOGO.png')}
                />
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
                <Text style={styles.buttonText}>{selectedAirport}</Text>
                </TouchableOpacity>

                {isDropdownVisible && (
                <View style={styles.dropdown}>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search for an airport"
                      value={searchText}
                      onChangeText={handleSearch}
                    />
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
