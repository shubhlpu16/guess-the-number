import React from 'react';
import {View,StyleSheet} from 'react-native'

export default function Card(props) {
  return (
    <View style={{...styles.card,...props.style}}>
      {props.children}
      </View>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width:0,
      height:2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    elevation:8,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  }
})
