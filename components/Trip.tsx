import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native"



type ExpandableInfoProps = {

  title: string;

  content: string;

  onPress: () => void;

};

type FlightSlice = {
  origin_iata: string;
  destination_iata: string;
  departing_at: string;
  arriving_at: string;
  slice_duration: string;
};

type FlightOffer = {
  offer_id: string;
  total_price: string;
  currency: string;
  slices: FlightSlice[];
  airline_name: string;
};

type HotelPrice = {
  currency: string;
  total: string;
  variations: {
    average: {
      total: string;
    };
    changes: Array<{
      startDate: string;
      endDate: string;
      base: string;
      total?: string;
    }>;
  };
};

type HotelOffer = {
  hotel_name: string;
  hotel_id: string;
  price: HotelPrice;
  check_in: string;
  check_out: string;
};

type Experience = {
  name: string;
  description: string;
  price: string;
  currency: string;
  latitude: number;
  longitude: number;
  url: string;
};

type Destination = {
  city_name: string;
  airport_code: string;
  description: string;
  attractions: string[];
  flight_offers: FlightOffer[];
  hotel_offers: HotelOffer[];
  matched_experiences: Experience[];
};


export const ExpandableInfo: React.FC<ExpandableInfoProps> = ({ title, content }) => {

  return (
    <View style={styles.container}>
        <TouchableOpacity
            // onPress={}
        >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>
                {content}
            </Text>
        </TouchableOpacity>
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: 'rgba(13, 53, 68, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: 17,
    padding: 10,
    fontWeight: "bold",
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
  },
  content: {
    fontSize: 14,
    padding: 10,
    color: 'white',
  },
})

