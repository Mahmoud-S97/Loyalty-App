import React from 'react';
import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

const RigestrationScreen = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SignUp Screeen</Text>
      <Button title='Login' onPress={() => router.replace('/login')} />
    </View>
  )
}

export default RigestrationScreen;