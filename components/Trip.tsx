import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface ExpandableInfoProps {
  title: string;
  content: string;
  onPress?: () => void;
}

export const ExpandableInfo: React.FC<ExpandableInfoProps> = ({ title, content, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contentBox}>
        <Text style={styles.content}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentBox: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  content: {
    fontSize: 14,
    color: '#555',
  },
});

