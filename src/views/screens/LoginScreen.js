import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState,useContext, } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';
import {PrimaryButton} from '../components/Button';
import { InputField, ErrorMessage } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import axios from 'axios'

export default function LoginScreen({ navigation }) {
 const { setUser } = useContext(AuthenticatedUserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
 
  const formData = {
    email: email,
    password: password
  }
    axios.post('https://620f728dec8b2ee283403045.mockapi.io/api/v1/users', formData, {
  })
  .then( async (response) => {
     await AsyncStorage.setItem('token', "value")
    setUser(response)
  console.log(response)
  })
  // .catch((error) => {
  //  console.log(error)
  // })

      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>
   <StatusBar style='dark-content' />
   <View style={styles.content}>
   <Text style={styles.title}>Login</Text>
   <InputField
       inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='email'
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
  />
  <InputField
       inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='lock'
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
  />
     {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
        <PrimaryButton
          onPress={onLogin}
          title="LOGIN"
        />
     
        <View style={styles.Buttom}>
        {/* <TouchableOpacity
        onPress={()=>{
          navigation.navigate("forget")
        }}
        >
        <Text style={{color:'#fff'}}>
          Forget Password
        </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate("Signup")
        }}
        >
        <Text style={{color:'#fff'}}>
         Create Account
        </Text>
        </TouchableOpacity>
        </View>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e93b81',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  content: {
    position:'relative',
    top:'50%',
    transform:'translateY(-50%)'
  },
  Buttom:{
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  }
});