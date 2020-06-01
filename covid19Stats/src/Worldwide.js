import React, { Component } from 'react';
import { View, Image,TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RowText from './RowComponent'


class Worldwide extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          newConfirmed: null,
          newDeaths: null,
          activeCases: null,
          totalConfirmed: null,
          totalDeaths: null,
          totalRecovered: null,
        };
    
        
      }

      componentDidMount() {
        this.makeRemoteRequest();
      }
    
      makeRemoteRequest = () => {
        const url = `https://disease.sh/v2/all?yesterday=false`;
        this.setState({ loading: true });
    
        axios.get(url)
          .then(res => {
            this.setState({
                newConfirmed: res.data.todayCases,
                newDeaths: res.data.todayDeaths,
                activeCases: res.data.active,
                totalConfirmed: res.data.cases,
                totalDeaths: res.data.deaths,
                totalRecovered: res.data.recovered,
                error: res.error || null,
                loading: false,
              });
            
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      };

  
      render() {
        if (this.state.loading) {
          return (
            <>
            
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'white' }}>
                 <Image style={{alignSelf: 'center',height: 160,width: 160}} source={require('../assets/loading.gif')}></Image>
            </View>
            </>
          );
        }
        return (
            <>
        <View style={{ marginTop: 5,width: "100%",flexDirection: 'row',justifyContent: 'space-between'}}>
        <Icon name="arrow-left" size={30} color="#40c4ff" style={{marginLeft: 10}} onPress={() => this.props.navigation.goBack()} />
        <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
              <Image source={require('../assets/menu.png')}  style={{marginRight: 15,height: 30,width: 30}}></Image>
              </TouchableOpacity>
      </View>
      
        <View style={{ alignItems: 'center',marginTop: 20}}>
        <Image source={{uri: "https://www.globe.gov/globe-gov-home-portlet/images/learn-earth-system/learn-earth-system-clean.png"}} 
        style={{width: 100, height: 100,marginLeft: 10,marginTop: 10}}
        ></Image>
        </View>
        <View style={{ alignItems: 'center'}}>
        <Text h4>Global Summary </Text>
        </View>
        
        
        <View style={{marginTop: 20,marginLeft: 20}}>
          <RowText text="Cases Today" value={this.state.newConfirmed} styles={{marginLeft: 100}}></RowText>
          <RowText text="Deaths Today" value={this.state.newDeaths} styles={{marginLeft: 94}}></RowText>
          <RowText text="Active Today" value={this.state.activeCases} styles={{marginLeft: 97}}></RowText>
          <RowText text="Cases" value={this.state.totalConfirmed} styles={{marginLeft: 142}}></RowText>
          <RowText text="Deaths" value={this.state.totalDeaths} styles={{marginLeft: 135}}></RowText>
          <RowText text="Recovered" value={this.state.totalRecovered} styles={{marginLeft: 108}}></RowText>
        </View>
        </>
        )

}
}

export default Worldwide;