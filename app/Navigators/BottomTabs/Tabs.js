import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import Favorite from './Favorite'
import Explore from './Explore'
import { Icon } from 'react-native-paper'
import { COLORS } from '../../components/globe/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ExploreStackNavigator, FavoriteStackNavigator, HomeStackNavigator } from '../Stack/Stack'


const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={({route})=>{
        return{
            tabBarActiveTintColor: COLORS.primary3,
            tabBarInactiveTintColor: COLORS.fontColor1,
            headerShown: false,
            
            tabBarStyle : {
                backgroundColor: COLORS.primary1,
                borderColor: COLORS.primary2
                // color: COLORS.fontColor1
            },
            // headerShown: false,
            headerBackgroundContainerStyle :{
                backgroundColor: COLORS.primary1
            },
            headerTitleAlign: 'center',
            headerTintColor: COLORS.fontColor1,
            headerStyle :{
                backgroundColor: COLORS.bgColor
            },
            headerTitle : ()=> {
                if (route.name === 'home') {
                    return <Text style={styles.headerStyle}>Home</Text>
                }
                else if (route.name === 'explore') {
                    return <Text style={styles.headerStyle}>Explore</Text>
                }
                else {
                    return <Text style={styles.headerStyle}>Favorite</Text>
                }
            }
            ,tabBarIcon: ({focused, color, size})=>{
                let iconName;

                if (route.name === 'home') {
                    iconName = focused ? 'home' : 'home-roof'
                }
                else if (route.name === 'explore') {
                    iconName = focused? 'atom' : 'atom'
                }
                else {
                    iconName = focused? 'cards-heart' : 'cards-heart-outline'
                }
                return <Icon source={iconName} size={size} color={color}  />
            }
        }
    }} >
      <Tab.Screen name="home" component={Home} /> 
      <Tab.Screen name="explore" component={Explore} /> 
      <Tab.Screen name="favorite" component={Favorite} /> 
    </Tab.Navigator>
  )
}

export default Tabs

const styles = StyleSheet.create({
    headerStyle: {color: COLORS.fontColor1, fontWeight: '500',fontSize: wp('5%') }
})