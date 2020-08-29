import React,{useState,useEffect,useRef} from 'react';
import {View,Text,StyleSheet,Alert,FlatList,Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import MainButton from '../components/MainButton'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import DefaultStyles from '../constants/globalStyles'



const generateRandomNumber=(min,max,exlude) =>{
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndnum = Math.floor(Math.random() * (max - min))+min;
  if(rndnum===exlude){
    return generateRandomNumber(max,min,exlude)
  }
  return rndnum;
}

export default function Game(props) {
  const [initialGuess,setInitialGuess]=useState(generateRandomNumber(1,100,props.userChoice))
  const [currentGuess,setCurrentGuess]=useState(initialGuess)
  const [guessArray,setGuessArray]=useState([initialGuess.toString()])
  const [availableWidth,setAvailableWidth]=useState(Dimensions.get('window').width)
  const [availableHeight,setAvailableHeight]=useState(Dimensions.get('window').height)
  const currentLow=useRef(1)
  const currentHigh=useRef(100)
  const {userChoice,handleGameOver}=props

  useEffect(()=>{
    const updateLayout=()=>{
      setAvailableHeight(Dimensions.get('window').height)
      setAvailableWidth(Dimensions.get('window').width)
    }

    Dimensions.addEventListener('change',updateLayout)

    return()=>{
      Dimensions.removeEventListener('change',updateLayout)
    }
  })
  useEffect(()=>{
    if(currentGuess===userChoice){
      handleGameOver(guessArray.length)
    }
  },[currentGuess,userChoice,handleGameOver])

  const handleGuess=direction=>{
    if((direction==='lower' && currentGuess<props.userChoice) ||(direction==='greater' && currentGuess>props.userChoice))
    {
      Alert.alert('Don\'t lie!','You know that this is wrong ...',[{text:'Sorry!',style:'cancel'}])
      return
    }
    else if(direction==='lower'){
      currentHigh.current=currentGuess
    }
    else{
      currentLow.current=currentGuess+1;
    }

    const nextGuess=generateRandomNumber(currentLow.current, currentHigh.current,currentGuess)
    setCurrentGuess(nextGuess)
    setGuessArray(currentGuesses=>[nextGuess.toString(),...currentGuesses])

  }

  renderListItem=(numOfRounds,itemData)=>(
    <View style={styles.listItem}>
      <Text style={DefaultStyles.title}>#{numOfRounds-itemData.index}</Text>
      <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
    </View>
  )

  let listContainerStyle=styles.listContainer;

  if(availableWidth<350) {
    listContainerStyle=styles.listContainerBig;
  }

  if(availableHeight<500)
  {
    return (
      <View style={styles.screen}>
       <Text>Opponent's Guess</Text>
       <View style={styles.control}>
      <MainButton  onPress={handleGuess.bind(this,'lower')} >
        <Ionicons name="md-remove" size={20} color="white"/>
      </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
      <MainButton  onPress={handleGuess.bind(this,'greater')} >
        <Ionicons name="md-add" size={20} color="white"/>
      </MainButton>
      </View>
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={guessArray}
          renderItem={renderListItem.bind(this, guessArray.length)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          />
      </View>
    </View>
    )
  }
  return(
    <View style={styles.screen}>
     <Text>Opponent's Guess</Text>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card style={styles.buttonContainer}>
    <MainButton  onPress={handleGuess.bind(this,'lower')} ><Ionicons name="md-remove" size={20} color="white"/></MainButton>
    <MainButton  onPress={handleGuess.bind(this,'greater')} ><Ionicons name="md-add" size={20} color="white"/></MainButton>
    </Card>
    <View style={listContainerStyle}>
      {/* <ScrollView contentContainerStyle={styles.list}>
      {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
      </ScrollView> */}
      <FlatList
        keyExtractor={item => item}
        data={guessArray}
        renderItem={renderListItem.bind(this, guessArray.length)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        />
    </View>
  </View>
  )

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: Dimensions.get('window').height>600? 20:5,
  width: 300,
  maxWidth: '90%'
},
listContainer: {
    flex: 1,
    width: '60%',
  },
  listContainerBig:{
    flex: 1,
    width:'80%'
  },
  control: {
    flexDirection: 'row',
    width: Dimensions.get('window').width*0.6,
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  ,
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
