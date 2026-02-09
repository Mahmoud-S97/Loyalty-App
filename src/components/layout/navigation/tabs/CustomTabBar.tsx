import React, { JSX, useRef } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, useColorScheme, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { CurvedTabBarBackground } from "./CurvedTabBarBackground";
import { getScreenHeight, getScreenWidth } from "@/utils";
import { APP_COLORS, shadowStyle } from "@/constants/theme";
import { LOCAL_IMAGES } from "@/constants/images";
import AppText from "@/components/ui/content/AppText";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { cn } from '@/lib/nativeWindCSS/cn';

const CustomTabBar = ({ state, navigation, descriptors }: BottomTabBarProps): JSX.Element => {
  const scheme = useColorScheme();

  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const rotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const animateBrandOnce = () => {

    rotateAnimation.setValue(0);
    scaleAnimation.setValue(1);

    Animated.parallel([
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1.90,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        })
      ])
    ]).start();
  };

  return (
    <View testID='CustomTabBar:View' className="w-full absolute bottom-0 left-0 right-0">
      <View style={StyleSheet.absoluteFill}>
        <CurvedTabBarBackground />
      </View>
      <View testID='CustomTabBar:ContainerView' className="w-full h-[64px] flex-row justify-between items-center">
        {state.routes.map((route: any, index: number) => {
          if (route.name === "home") return <View key={route.key} className="flex-0 w-0" />;

          const isFocused = state.index === index;
          const icon =
            route.name === "wallet" ?
              "wallet" : 'person'

          return (
            <TouchableOpacity
              testID={`CustomTabBar:Tab-${route.name}`}
              activeOpacity={0.8}
              key={route.key}
              className="flex-1 items-center justify-center"
              onPress={() => {
                Haptics.selectionAsync();
                navigation.navigate(route.name);
              }}
            >
              <Ionicons
                name={isFocused ? icon : `${icon}-outline`}
                size={28}
                color={isFocused ? APP_COLORS.primary : APP_COLORS.neutral[700]}
              />
              <AppText className={cn('text-xs text-neutral-700 dark:text-neutral-700', { 'text-primary dark:text-primary': isFocused })}>{`app.${route.name}`}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        testID='CustomTabBar:CircleButton'
        activeOpacity={0.9}
        style={shadowStyle(scheme)}
        className={`w-[64px] h-[64px] absolute -top-[32px] self-center items-center justify-center rounded-full bg-neutral-500 ${state.index === 0 && 'bg-primary'}`}
        onPress={() => {
          animateBrandOnce();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          navigation.navigate("home");
        }}
      >
        <Animated.Image source={LOCAL_IMAGES.LOGO_TRANS} className="w-[50px] h-[50px]" style={{ transform: [{ rotate: rotation }, { scale: scaleAnimation }] }} />
      </TouchableOpacity>
    </View>
  );
}

export default CustomTabBar;