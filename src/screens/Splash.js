import {StyleSheet, Image,Text, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  const navigation = useNavigation();
  const checkLogin = async()=>{
   const id = await AsyncStorage.getItem("USERID");
   if(id!=null){
    navigation.navigate("Main")
   }
   else{
    navigation.navigate("Login");
   }
  }
  setTimeout(() => {
    checkLogin();
  }, 3000);
  return (
    <View style={styles.container}>
      <Image source={require("../assests/chattinglogo.png")} style={{height:"70%",width:"100%"}} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor:"#32768D",
  },
  text:{
    fontSize:30,
    color:"white",
    fontWeight:'500',
  }
});
