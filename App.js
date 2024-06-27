import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './app/Navigators/BottomTabs/Tabs';
import { Provider } from 'react-redux';
import { persistor, store } from './app/Redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import StackNavigator from './app/Navigators/Stack/Stack';


const App = () => {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor} >
      <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
    </GestureHandlerRootView>
    </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})


//  favourites, explore