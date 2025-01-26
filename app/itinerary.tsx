import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, ImageBackground, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
import { ExpandableInfo } from '../components/Trip';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const title = 'pulled from flask'

const Itinerary = () => {

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
            <ExpandableInfo
              title="Trip to Bahamas"
              content="React Native is an open-source mobile application development framework created by Facebook. It allows developers to use React along with native platform capabilities to build mobile applications for iOS and Android."
              onPress={() => { router.push({
                pathname: './details',
                params: { title }
              })}}
            />
            <ExpandableInfo
              title="Trip to Dallas"
              content="React Native works by using JavaScript to control native components. It provides a bridge that allows JavaScript code to communicate with native modules, enabling developers to write code once and run it on multiple platforms."
              // onPress={() => navigation.navigate('Details', { title: 'Trip to Dallas', content: 'React Native works by using JavaScript to control native components. It provides a bridge that allows JavaScript code to communicate with native modules, enabling developers to write code once and run it on multiple platforms.' })}
            />
            <ExpandableInfo
              title="Trip to Fuji"
              content="Some advantages of using React Native include: 1) Cross-platform development, 2) Faster development time, 3) Large community and ecosystem, 4) Native performance, 5) Hot reloading for quicker iterations, and 6) Ability to use native modules when needed."
              // onPress={() => navigation.navigate('Details', { title: 'Trip to Fuji', content: 'Some advantages of using React Native include: 1) Cross-platform development, 2) Faster development time, 3) Large community and ecosystem, 4) Native performance, 5) Hot reloading for quicker iterations, and 6) Ability to use native modules when needed.' })}
            />
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
    marginLeft: 65,
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
});

export default Itinerary;
