import React from 'react';
import {Image} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Stats from './Stats'
const Tab = createMaterialBottomTabNavigator();

var colors = ['#b39ddb','#90caf9','#ce93d8','#ef9a9a'];
function getRandomColor (){
    
    let random = (getRandomColor.number = Math.floor(Math.random()*colors.length)) === getRandomColor.lastNumber ? getRandomColor() : getRandomColor.lastNumber = getRandomColor.number;
    return (random);
};

function RegionalStats() {
      let currColor = colors[getRandomColor()];  

  return (
    <Tab.Navigator
      initialRouteName="Asia"
      activeColor="#263238"
      inactiveColor="#ffebee"
      barStyle={{ backgroundColor: currColor,paddingBottom: 5 }}
      shifting={true}
      labeled={true}
      
      
    >
    <Tab.Screen name="Asia" component={Stats} initialParams={{continent: "Asia"}}  
    options={{tabBarLabel: 'Asia',tabBarIcon: ({ color }) => (
        <Image source={require("../assets/asia-map.png")} style={{width: 40,height: 30}}></Image>), }} />
    <Tab.Screen name="Europe" component={Stats} initialParams={{continent: "Europe"}} options={{tabBarLabel: 'Europe',tabBarIcon: ({ color }) => (
          <Image source={require("../assets/europe-map.png")} style={{width: 25,height: 25}}></Image>), }} />
    <Tab.Screen name="Stats2" component={Stats} initialParams={{continent: "Africa"}} options={{tabBarLabel: 'Africa',tabBarIcon: () => (
        <Image source={require("../assets/africa-map.png")} style={{width: 20,height: 20}}></Image>), }} />
    <Tab.Screen name="Stats3" component={Stats} initialParams={{continent: "Australia%2FOceania"}} options={{tabBarLabel: 'Australia',tabBarIcon: ({ color }) => (
          <Image source={require("../assets/australia-map.png")} style={{width: 30,height: 30}}></Image>), }} />
    <Tab.Screen name="Stats4" component={Stats} initialParams={{continent: "North America"}} options={{tabBarLabel: 'nAmerica',tabBarIcon: ({ color }) => (
          <Image source={require("../assets/north-america-map.png")} style={{width: 30,height: 30}}></Image>), }} />
    <Tab.Screen name="Stats5" component={Stats} initialParams={{continent: "South America"}} options={{tabBarLabel: 'sAmerica' ,tabBarIcon: ({ color }) => (
          <Image source={require("../assets/south-america-map.png")} style={{width: 30,height: 30}}></Image>), }} />
    </Tab.Navigator>
  );
}

export default RegionalStats;