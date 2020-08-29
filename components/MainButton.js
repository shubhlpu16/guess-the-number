import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native'
import colors from '../constants/color'

export default function MainButton(props) {
  let ButtonComponent = TouchableOpacity;
  if(Platform.OS === 'android')
  {
    ButtonComponent = TouchableNativeFeedback;
  }
  return(
    <View style={styles.buttonContainer}>
    <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
    <View style={{...styles.button,...props.style}}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  </ButtonComponent>
</View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontFamily:'open-sans',
    fontSize: 18,
  }
})
