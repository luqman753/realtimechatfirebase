import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const registeruser = () => {
    if(name=='' || email=='' || password=='' || mobile=='' || password=='' || confirmPassword==''){
      return Alert.alert("Please Fill All Fields")
    }
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
      })
      .then(res => {
        console.log('Created Successfully');
        Alert.alert("Signup Successfully: "+ name)
        setName('');
        setEmail('');
        setPassword('');
        setMobile('');
        setConfirmPassword('');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        style={styles.textInput}
        placeholder="Enter Your Name"
      />
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.textInput}
        placeholder="Email"
      />
      <TextInput
        value={mobile}
        onChangeText={text => setMobile(text)}
        style={styles.textInput}
        placeholder="Mobile No."
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.textInput}
        placeholder="Password"
      />
      <TextInput
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        style={styles.textInput}
        placeholder="Confirm Password"
      />
      <TouchableOpacity
        style={styles.Signup}
        onPress={() => {
          registeruser();
        }}>
        <Text style={styles.SignupText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Or Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

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
