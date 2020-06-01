import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Search from './src/screenStack.js';
import RegionalStats from './src/Tabs';
import Worldwide from './src/Worldwide';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor: '#bbdefb'}}>
      <Drawer.Screen name="Home" component={Search} options={{ drawerLabel: 'Search',drawerIcon: ()=>(
         <Icon name="magnify" size={30}   />
       ) }}/>
      <Drawer.Screen name="Worldwide"  component={Worldwide} options={{ drawerLabel: 'Worldwide',title: "Global Summary",drawerIcon: ()=>(
         <Icon name="earth" size={30}   />
       )  }} />
      <Drawer.Screen name="Stats" component={RegionalStats} options={{ drawerLabel: 'Stats',drawerIcon: ()=>(
         <Icon name="chart-areaspline" size={30}   />
       )  }} />
    </Drawer.Navigator>
      
    </NavigationContainer>
  );
};

export default App;
