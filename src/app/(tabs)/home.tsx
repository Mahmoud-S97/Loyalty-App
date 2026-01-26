import React from 'react';
import { Button, Text, View } from 'react-native';
import { router } from 'expo-router';

const HomeScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      <Text>Home {'(Scan Screen)'}</Text>
      <Button onPress={() => {
        router.dismissAll();
        router.replace('/login');
      }} title='Go Back Login'/>
    </View>
  )
}

export default HomeScreen