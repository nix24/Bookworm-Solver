import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';

import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: `${colors.text}80`,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            height: 60,
          },
          android: {
            backgroundColor: colorScheme === 'dark' ? 'rgba(26, 30, 35, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            borderTopWidth: 0,
            elevation: 0,
            height: 60,
          },
          default: {
            backgroundColor: colorScheme === 'dark' ? 'rgba(26, 30, 35, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            borderTopWidth: 0,
            height: 60,
          },
        }),
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView 
              tint={colorScheme === 'dark' ? 'dark' : 'light'} 
              intensity={80} 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                borderTopWidth: 1,
                borderTopColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }} 
            />
          ) : null
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Solver',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "search" : "search-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "information-circle" : "information-circle-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
