import React from 'react';
import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

const LoginScreen = () => {

  return (
    <View>
      <Text>Login Screen</Text>
        <Button onPress={() => router.navigate('/home')} title='Login' />
        <Button onPress={() => router.replace('/registration')} title='Sign Up' />
    </View>
  )
}

export default LoginScreen;