import React from "react"
import { ScrollView, StyleSheet, SafeAreaView, ImageBackground, View, Image } from "react-native"
// import { DetailsList } from "../components/Trip"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { DetailsList } from "@/components/DeatilsList"
// import styles from "@/styles/explore.styles"

export default function ExpandableInfoScreen() {
  return (
    <SafeAreaProvider>
        <ImageBackground
          source={require('../assets/images/backgroundimg.png')}
          style={{ flex: 1, width: '100%', height: '100%'}}
        >
        
        <SafeAreaView>
            <View style={{alignItems: 'center', alignContent: 'center'}}>
                <Image
                    style={styles.logo}
                    source={require('@/assets/images/LOGO.png')}
                />
            </View>
                <DetailsList
                title="Trip to Texas"
                content="React Native is an open-source mobile application development framework created by Facebook. It allows developers to use React along with native platform capabilities to build mobile applications for iOS and Android."
                content2="React Native works by using JavaScript to control native components. It provides a bridge that allows JavaScript code to communicate with native modules, enabling developers to write code once and run it on multiple platforms."
                content3="Some advantages of using React Native include: 1) Cross-platform development, 2) Faster development time, 3) Large community and ecosystem, 4) Native performance, 5) Hot reloading for quicker iterations, and 6) Ability to use native modules when needed."
                />
        </SafeAreaView>          
      </ImageBackground>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    logo: {
      height: 120,
      width: 265,
      marginLeft: 65
    },
});
