
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, ImageBackground, View, Image, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { StackNavigationProp } from '@react-navigation/stack';
import { ExpandableInfo } from '../components/Trip';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type RootStackParamList = {
  Details: { title: string; content: string };
};


type Destination = {
  city_name: string;
  airport_code: string;
  description: string;
};

const Itinerary = () => {
  const navigation = useNavigation() as StackNavigationProp<RootStackParamList>;

  const [destinations, setDestinations] = useState<Destination[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch destinations JSON dynamically
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/generate-itinerary');
        //  // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setDestinations(data.destinations);
        } else {
          console.error('Failed to fetch destinations');
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  

const Itinerary = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('../assets/images/backgroundimg.png')}
        style={{ flex: 1, width: '100%', height: '100%' }}
      >
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{ alignItems: 'center', alignContent: 'center' }}>
              <Image
                style={styles.logo}
                source={require('@/assets/images/LOGO.png')}
              />
            </View>

          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 120,
    width: 265,
    marginBottom: 20,

  },
  scrollViewContent: {
    paddingVertical: 20,
  },
});

export default Itinerary;
