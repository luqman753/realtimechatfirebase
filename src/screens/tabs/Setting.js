import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = () => {
  const navigation = useNavigation()
  const deleteItem = async ()=>{
    console.log("hello")
    await AsyncStorage.removeItem("NAME")
    await AsyncStorage.removeItem("EMAIL");
    await AsyncStorage.removeItem("USERID");
    navigation.navigate("Login")
  }
  return (
    <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-end'}}>
      <TouchableOpacity style={{height:40,width:100,backgroundColor:"#32768D"}} onPress={deleteItem}>
        <Text style={{color:'white'}}>Log OUt</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({})