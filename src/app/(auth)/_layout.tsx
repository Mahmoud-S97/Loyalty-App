import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {

  return (
      <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="registration" />
        <Stack.Screen name="login" />
      </Stack>
  );
}
