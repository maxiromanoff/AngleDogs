import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';
import HomeScreen from './home_screen';
import SettingScreen from './setting_screen';

const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={routes.HOME_SCREEN}>
      <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={routes.SETTING_SCREEN} component={SettingScreen} />
    </Stack.Navigator>
  )
}

export default AppContainer;
