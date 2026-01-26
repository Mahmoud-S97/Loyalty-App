import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomTabBar from '@/components/layout/navigation/tabs/CustomTabBar';

export default function TabsLayout() {

  return (
    <Tabs screenOptions={{ headerShown: false }} initialRouteName='home' tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name='home' />
      <Tabs.Screen name='wallet' />
      <Tabs.Screen name='account' />
    </Tabs>
  );
}
