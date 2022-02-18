import React,{useContext} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
export default function HomeScreen() {
    const { user } = useContext(AuthenticatedUserContext);
  return (
    <View style={styles.container}>
      <Text>The current user login is </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
