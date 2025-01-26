import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DetailsListProps {
  title: string;
  content: string;
  content2: string;
  content3: string;
}

export const DetailsList: React.FC<DetailsListProps> = ({ title, content, content2, content3 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.contentBox}>
          <Text style={styles.content}>{content}</Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.content}>{content2}</Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.content}>{content3}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 600,
    backgroundColor: 'rgba(13, 53, 68, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  contentBox: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    color: '#555',
  },
});