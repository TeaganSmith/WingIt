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





