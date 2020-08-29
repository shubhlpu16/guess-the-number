import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,Image,Dimensions,ScrollView} from 'react-native'
import MainButton from '../components/MainButton'
import colors from '../constants/color'
import DefaultStyles from '../constants/globalStyles'

export default function GameOver(props){
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
   const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

   useEffect(() => {
       const updateLayout = () => {
           setAvailableDeviceWidth(Dimensions.get('window').width);
           setAvailableDeviceHeight(Dimensions.get('window').height);
   };

   Dimensions.addEventListener('change', updateLayout);

   return () => {
           Dimensions.removeEventListener('change', updateLayout);
       };
   });
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.screen}>
      <Text style={{...DefaultStyles.title,...styles.resultText}}>The Game is Over!</Text>
        <View style={{...styles.imageContainer,
            width:availableDeviceWidth*0.7,
          height:availableDeviceWidth*0.7,
        borderRadius:availableDeviceWidth*0.7/2,
      marginVertical:availableDeviceWidth/30}}>
      <Image
         source={require('../assets/success.png')}
         style={styles.image} />
      </View>
      <View style={styles.resultContainer}>
      <Text style={{...DefaultStyles.bodyText,...styles.resultText}}>Your phone needed
         <Text style={styles.highlight}>
          {''} {props.rounds} {''}
          </Text>
          rounds to guess the number
           <Text style={styles.highlight}>
             {''} {props.userNumber}
           </Text>
           </Text>

    </View>
    <View style={styles.button}>
      <MainButton  onPress={props.handleNewGame}>New Game</MainButton>
    </View>
  </View>
</ScrollView>
  )
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height/40,
    alignItems: 'center',
    paddingVertical: 10
  },
  button:{
    marginTop: Dimensions.get('window').height/60
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    overflow: 'hidden',
    alignItems: 'center'
  },
  resultContainer: {
    marginHorizontal: 20,
    marginVertical: Dimensions.get('window').height/80,
  },
  highlight: {
    color: colors.primary,
    fontFamily:'open-sans-bold',
  },
  resultText: {
    textAlign:'center',
    fontSize: Dimensions.get('window').height<400?16:20,

  }
})
