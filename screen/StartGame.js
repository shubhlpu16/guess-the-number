import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Button,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/color'
import DefaultStyles from '../constants/globalStyles'


export default function StartGame(props) {
  const [inputValue,setInputValue]=useState('')
  const [confirmed,setConfirm]=useState(false)
  const [buttonWidth,setButtonWidth]=useState(Dimensions.get('window').width/4)
  const [selectedNumber,setSelectedNumber]=useState()


  useEffect(()=>{
    const updateLayout=()=>{
      setButtonWidth(Dimensions.get('window').width/4)
    }
    Dimensions.addEventListener('change',updateLayout)

    return()=>{
      Dimensions.removeEventListener('change',updateLayout)
    }
  }
)
  const handleInputChange=(inputText)=>{
    setInputValue(inputText.replace(/[^0-9]/g,''))
  }

  const handleReset=()=>{
    setInputValue('')
    setConfirm(false);
  }

  const handleConfirm=async()=>{
    const chosenNumber = parseInt(inputValue)
    if(isNaN(chosenNumber)||chosenNumber<=0||chosenNumber>99)
    {
      Alert.alert('Invalid Number!','Number has to be a number between 1 and 99',
      [{text:'Okay',style:'destructive',onPress:handleReset}])
      return
    }
    setSelectedNumber(chosenNumber)
    setConfirm(true)
    setInputValue('')
    Keyboard.dismiss()

  }
  let confirmedOutput;

  if (confirmed) {
     confirmedOutput = (
       <Card style={styles.summaryContainer}>
         <Text style={DefaultStyles.bodyText}>You selected</Text>
         <NumberContainer>{selectedNumber}</NumberContainer>
         <MainButton onPress={() => props.handleStartGame(selectedNumber)}>
           Start Game
         </MainButton>
       </Card>
     );
   }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={30}>
    <TouchableWithoutFeedback onPress={()=>{
        Keyboard.dismiss()
      }}>
    <View style={styles.screen}>
      <Text style={{...DefaultStyles.title,...styles.title}}> Start a New Game!</Text>
      <Card style={styles.inputBox}>
        <Text style={DefaultStyles.bodyText}>Enter a Number</Text>
        <Input style={styles.input} keyboardType="number-pad" maxLength={2} blurOnSubmit onChangeText={handleInputChange} value={inputValue}/>
        <View style={styles.buttonContainer}>
        <View style={{width:buttonWidth}} >
            <Button title="Reset" color={colors.accent} onPress={handleReset}/>
        </View>
        <View style={{width:buttonWidth}} >
          <Button title="Confirm" color={colors.primary} onPress={handleConfirm}/>
        </View>
        </View>

      </Card>
      {confirmedOutput}
    </View>
  </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding:16,
    alignItems: 'center',
  },
  inputBox:{
    width:'80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    marginBottom: 24
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  number: {
    fontFamily:'open-sans',
  },
  summaryContainer: {
  marginTop: 20,
  alignItems: 'center'
}

})
