import {View, Text, StyleSheet,FlatList,Dimensions,Image,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
let id = ''
const Users = () => {
    const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    let tempData = []
    id = await AsyncStorage.getItem("USERID")
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if(res.docs!=[]){
            res.docs.map((item,index)=>{
                tempData.push(item.data())
            })
        }
        setUsers(tempData)
        console.log(JSON.stringify(res.docs[0].data()));
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat App</Text>
      </View>
      <FlatList data={users} renderItem={({item,index})=>{
        return(
            <TouchableOpacity style={styles.userItem} onPress={()=>{navigation.navigate("Chat",{data:item,id:id})}}>
                <Image source={require("../../assests/user.png")} style={{height:50,width:50,marginLeft:10,alignSelf:'center'}} />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
        )
      }} />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'purple',
    fontSize: 20,
    fontWeight: 600,
  },
  userItem:{
    width: Dimensions.get('window').width-50,
    alignSelf:'center',
    marginTop:20,
    flexDirection:'row',
    height:60,
    borderWidth:0.5,
    borderRadius:10,
  },
  name:{
    fontSize:20,
    alignSelf:'center',
    marginLeft:10,
    fontWeight:500,
  }
});
