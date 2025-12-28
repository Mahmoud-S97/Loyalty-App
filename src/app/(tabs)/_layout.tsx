import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabsLayout() {

  return (
      <Tabs screenOptions={{ headerShown: false }} initialRouteName='home'>
        <Tabs.Screen name='wallet' options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='account-balance-wallet' size={24} color={color} />
          )
        }} />
        <Tabs.Screen name='home' options={{
          
          tabBarIcon: ({ color }) => (
            <View style={{ position: 'absolute', bottom: '50%', width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5 }}>
              <MaterialIcons name='home' size={24} color={color} />
            </View>
          )
        }} />
        <Tabs.Screen name='profile' options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='person' size={24} color={color} />
          )
        }} />
      </Tabs>
  );
}
