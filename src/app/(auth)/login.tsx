import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const LoginScreen = () => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Login Screen</Text>
        <Button onPress={() => router.navigate('/home')} title='Login' />
        <Button onPress={() => router.replace('/registration')} title='Sign Up' />
    </View>
  )
}

export default LoginScreen;