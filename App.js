import React from 'react';
import AppContainer from './src/modules/AppContainer';
import { NavigationContainer } from '@react-navigation/native';

import { Context } from './src/context';
import store from './src/store';

const App = () => {
  return (
    <Context.Provider value={store}>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
