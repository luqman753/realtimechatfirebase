import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import Users from './tabs/Users';
import Setting from './tabs/Setting';
const Main = () => {
    const [selectedTab, setSelectedTab] = useState(true);

  return (
    <View style={styles.container}>
        {selectedTab ? <Users/> : <Setting/>}
        <View style={styles.bottomTab} >
            <TouchableOpacity style={styles.tab} onPress={()=>setSelectedTab(true)}>
                <Icon name="people-outline" size={30} color={selectedTab?"white":"gray"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={()=>setSelectedTab(false)}>
                <Icon name="settings-outline" size={30} color={!selectedTab?"white":"gray"} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    bottomTab:{
        position:'absolute',
        bottom:0,
        backgroundColor:"#32768D",
        width:"100%",
        height:70,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    tab:{
        opacity:"50%",
        height:"90%",
        justifyContent:'center',
        alignItems:'center',

    }
})