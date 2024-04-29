import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import JanelaPrincipal from '../Pages/JanelaPrincipal';
import JanelaFipe from '../Pages/JanelaFipe';

const MainStack = createStackNavigator();

const MainStackNavigator = () => (
  <MainStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#0c0636',
        borderBottomWidth: 0.3, 
        borderBottomColor: 'white', 
      },
      headerTintColor: '#059b9a',
    }}
  >
    <MainStack.Screen
      name="Consulta FIPE KAD"
      component={JanelaPrincipal}
      options={{
        headerLeft: () => null,
      }}
    />
    <MainStack.Screen name="JanelaFipe" component={JanelaFipe} />
  </MainStack.Navigator>
);

export default MainStackNavigator;
