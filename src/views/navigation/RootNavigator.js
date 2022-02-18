import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator,Text } from 'react-native';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';


const Stack = createStackNavigator();
export default function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);
  
  useEffect( async()=>{
// Token from localstorage
    const authenticatedToken = await AsyncStorage.getItem('token')

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer value'
    }

        try {
          if( authenticatedToken == null){
             setIsLoading(false)
            setUser(null)
          }else{
              await  axios.post('https://620f728dec8b2ee283403045.mockapi.io/api/v1/users', {
          headers: headers
      })
      .then( async (response) => {
        setUser(response)
        setIsLoading(false)
      console.log(response)
      }) 
          }

    }
      catch (error) {
          console.log(error);
          setUser(null)
    }
  },[])
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    return (
      <NavigationContainer>
        {user ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }