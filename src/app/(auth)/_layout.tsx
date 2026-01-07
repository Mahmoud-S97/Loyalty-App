import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {

  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='intro' />
        <Stack.Screen name="registration" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="reset-password" />
      </Stack>
  );
}
