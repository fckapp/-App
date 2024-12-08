// /src/navigation/AppNavigation.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, SafeAreaView } from 'react-native';

import { LoginPage } from '../pages/login/index.js';

const Stack = createNativeStackNavigator();

return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Stack.Navigator>
            <LoginPage />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );