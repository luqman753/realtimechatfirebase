import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false)
  const loginHandler = () => {
    setVisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        if (res.docs !== []) {
          console.log(JSON.stringify(res.docs[0].data()));
          gotoNext(res.docs[0].data().name,res.docs[0].data().email,res.docs[0].data().userId);
          setVisible(false)
        }
      })
      .catch(err => {
        console.log(err);
        setVisible(false)
        Alert.alert("User Not Found")
      });
  };
  const gotoNext = async(name,email,userId)=>{
    await AsyncStorage.setItem("NAME",name);
    await AsyncStorage.setItem("EMAIL",email);
    await AsyncStorage.setItem("USERID",userId)
    navigation.navigate("Main")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Here</Text>
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.textInput}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.textInput}
        placeholder="Password"
      />
      <TouchableOpacity
        style={styles.Signup}
        onPress={() => {
          loginHandler();
        }}>
        <Text style={styles.SignupText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.loginText}>Or Signup</Text>
      </TouchableOpacity>
      <Loader visible={visible} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    marginBottom: '15%',
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    height: 50,
    width: '80%',
    padding: 10,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
    borderRadius: 15,
  },
  Signup: {
    backgroundColor: '#32768D',
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
  SignupText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  login: {
    height: 30,
    width: '80%',
    marginTop: 20,
  },
  loginText: {
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: '500',
    alignSelf: 'flex-end',
  },
});
