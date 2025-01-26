import { Image, StyleSheet, Platform, SafeAreaView, View, Button, ImageBackground } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { router } from 'expo-router';

const image = require('@/assets/images/backgroundimg.png'); 

export default function HomeScreen() {
  return (
    <SafeAreaProvider style={{backgroundColor: 'white'}}>
      <ImageBackground
          source={image}
          resizeMode="cover"
          style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center' }}
        >
      <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center', alignContent: 'center', padding: 50}}>
          <Image
            style={styles.logo}
            source={require('@/assets/images/LOGO.png')}
          />
          <Image
            style={styles.slogan}
            source={require('@/assets/images/Slogan.png')}
          />
        </View>
        <View style={styles.button}>

          <Button
            onPress={() => router.push('./search')}
            title="Get Started"
            color="white"
          />
        </View>
      </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 120,
    width: 265,
    marginLeft: 65
  },
  slogan: {
    height: 84,
    width: 250,
    // marginTop: 20,
  },
  button: {
    backgroundColor: '#1140FF', // Background color of the button
    borderRadius: 6, // Rounded corners
    padding: 5, // Padding around the button
    margin: 40,
    marginBottom: 75, // Space around the button
  },
});
