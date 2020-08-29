import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import * as font from 'expo-font';
import {AppLoading} from 'expo';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Header from './components/Header'
import StartGame from './screen/StartGame'
import Game from './screen/Game'
import GameOver from './screen/GameOver'

const fetchFonts = () =>{
  return font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
export default function App() {
  const [userNumber,setUserNumber]=useState()
  const [rounds,setRounds]=useState(0)
  const [dataLoaded,setDataLoaded]=useState(false)

  if(!dataLoaded)
  {
    return<AppLoading startAsync={fetchFonts} onFinish={()=>setDataLoaded(true)}/>
  }
  const handleUserNumber=(num)=>{
    setUserNumber(num)
    setRounds(0)
  }

  const handleGameOver=num=>{
    setRounds(num)
  }
  const handleNewGame=()=>{
    setUserNumber()
    setRounds(0)
  }
  let GameView=<StartGame handleStartGame={handleUserNumber}/>
  if(userNumber && rounds<=0)
  {
    GameView=<Game userChoice={userNumber} handleGameOver={handleGameOver}/>
  }
  else if(rounds>0){
    GameView=<GameOver rounds={rounds} userNumber={userNumber} handleNewGame={handleNewGame}/>
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Guess The Number"/>
      {GameView}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
