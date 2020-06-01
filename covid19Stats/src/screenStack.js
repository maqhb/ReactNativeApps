
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Image,TouchableOpacity} from 'react-native';
import Home from './countriesList';
import ByCountry from './countryDetails';
import Wordwide from './Worldwide';
import Stats from './Stats';


const Stack = createStackNavigator();
class screenStack extends Component {


  render() {
    return(
    
  <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Covid 19 Statistics' ,headerRight: () => (
              <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
              <Image source={require('../assets/menu.png')}  style={{marginRight: 15,height: 30,width: 30}}></Image>
              </TouchableOpacity>
          ), headerTitleAlign: 'center',headerTintColor: '#40c4ff' }} />

      <Stack.Screen name="ByCountry" component={ByCountry} options={{ title: ' Country Summary',headerShown: false }} />
      <Stack.Screen name="Worldwide" component={Wordwide} options={{ title: 'Worldwide' }} />
      <Stack.Screen name="RegStats" component={Stats} options={{ title: 'Regional Stats' }} />
      
  </Stack.Navigator>
  
    );
  }
}

export default screenStack;