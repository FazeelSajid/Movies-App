import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../BottomTabs/Home';
import Favorite from '../BottomTabs/Favorite';
import Explore from '../BottomTabs/Explore';
import Tabs from '../BottomTabs/Tabs';
import Detail from './Detail';

const Stack = createStackNavigator();



const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }} initialRouteName='tab' >
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="tab" component={Tabs} />
    </Stack.Navigator>
  );
};


export default StackNavigator;
