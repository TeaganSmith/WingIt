import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native"


interface ExpandableInfoProps {
  title: string
  content: string
}

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

