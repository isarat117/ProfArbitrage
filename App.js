import React, { useState } from 'react';
import { SafeAreaView, FlatList, Text, View,StyleSheet,TextInput,Linking ,useWindowDimensions ,ScrollView, AppRegistry } from 'react-native';

import ScanCoins from './views/ScanCoins';
import CoinDetails from './views/CoinDetails';
import Options from './views/Options';
import SetApiKeys from './views/SetApiKeys';
import SetLanguage from './views/SetLanguage';

import { NavigationContainer } from '@react-navigation/native';
import {  createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'
import { getWord } from './src/languages';


const Stack = createStackNavigator()


const Tabs = createBottomTabNavigator()

const TabsScreen =()=> {
  
  return(
  <Tabs.Navigator
 
  
  screenOptions={({route})=> ({
    headerShown: false,
  
    tabBarIcon: ({focused, color,size})=>{
      let iconName
      if(route.name=='ScanCoins'){
        iconName = focused
        ? 'home'
        : 'home-outline'
      }else if (route.name=='CoinDetails'){
        iconName = focused
        ? 'search'
        : 'search-outline'
      }
      return <Ionicons name={iconName} size={size} color={color}  />
    },
    })}
    
  >
    <Tabs.Screen 
    name='ScanCoins' 
    component={ScanCoins} 
    
    options={{
      tabBarActiveTintColor:"#461959",
      tabBarInactiveBackgroundColor:'#000',
      tabBarActiveBackgroundColor:'#000',
      tabBarLabel: ({focused}) => <Text style={{ fontSize: 13, color: focused ? "#461959" : "gray" }}>{getWord('word25')} </Text> ,
    }}/>

    <Tabs.Screen 
    name='CoinDetails'
     component={CoinDetails}
     options={{
      tabBarActiveBackgroundColor:'#000',
      tabBarInactiveBackgroundColor:'#000',
      tabBarActiveTintColor:"#461959",
      tabBarLabel: ({focused}) => <Text style={{ fontSize: 13, color: focused ? "#461959" : "gray" }}>{getWord('word26')} </Text> ,
    }}/>

  </Tabs.Navigator>
  )
}



const App = () => {

  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>

        <Stack.Screen name="Tabs"  component={TabsScreen}/>
        <Stack.Screen name="Options"  component={Options}/>
        <Stack.Screen name="SetApiKeys"  component={SetApiKeys}/>
        <Stack.Screen name="SetLanguage"  component={SetLanguage}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
 
};


export default App;
