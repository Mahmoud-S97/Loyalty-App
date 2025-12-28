import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home {'(Scan Screen)'}</Text>
      <Button onPress={() => router.replace('/login')} title='Go Back Login'/>
    </View>
  )
}

export default HomeScreen