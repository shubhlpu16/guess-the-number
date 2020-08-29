import React from 'react';
import {Text,View,StyleSheet,Platform} from 'react-native'
import colors from '../constants/color'

export default function Header(props) {
  return(
    <View style={{...styles.headerBase,...Platform.select({ios:styles.headerIOS,android:styles.headerAndroid})}}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBase:{
    paddingTop: 36,
    width: '100%',
    height: 90,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerIOS:{
    backgroundColor:'white',
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
  },
  headerAndroid:{
    backgroundColor:colors.primary,
  },
  title:{
    color: Platform.OS==='android' ?'white' :colors.primary,
    fontSize: 18,
    fontFamily:'open-sans-bold'
  }
})
