import * as React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, ImageBackground, View, Image, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Details: { title: string; content: string };
  // Add other routes here
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details: React.FC<Props> = ({ route }) => {
  const { title, content } = route.params;

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('../assets/images/backgroundimg.png')}
        style={styles.background}
      >
        <SafeAreaView>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('@/assets/images/LOGO.png')}
            />
          </View>
          <ScrollView contentContainerStyle={styles.detailsContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.content}>{content}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    alignContent: 'center',
  },
  logo: {
    height: 120,
    width: 265,
    marginLeft: 65,
  },
  detailsContainer: {
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Details;