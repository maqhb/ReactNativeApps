import React, { Component } from 'react';
import axios from 'axios';

import { View,  ActivityIndicator,Image } from 'react-native';
import { Text } from 'react-native-elements';
import Tab from './Tabs'



class Screen2 extends React.Component{

    constructor(props){
        super(props)

    this.state = {
        country: this.props.route.params.country,
        flag: this.props.route.params.flag,
        error: null,
        loading: false,
        firstDate: null,
        firstDayCases: null,
        totalCases: null,
        activeCases: null,
        recovered: null,
        deaths: null,

        }
        
}
  
componentDidMount() {
    this.makeRemoteRequest();
    
  }

  makeRemoteRequest = () => {
    const url = "https://api.covid19api.com/dayone/country/"+this.state.country+"/status/confirmed";
    this.setState({ loading: true });
    
    axios.get(url)
      .then(res => {
          var st = res.data[0].Date;
        this.setState({
            firstDate: st.substring(0, 10),
            firstDayCases: res.data[0].Cases,
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    axios.get("https://disease.sh/v2/countries/"+this.state.country)
      .then(res => {
          this.setState({
              totalCases: res.data.cases,
              activeCases: res.data.active,
              deaths: res.data.deaths,
              recovered: res.data.recovered,
              loading: false,
          })
      })
      .catch(error => {
        this.setState({ error });
      });

      if(this.state.firstDayCases == null){
        this.setState({firstDayCases: "No Data Found", firstDate: "No Data Found"});
      }

  };


  render(){  

    
    if (this.state.loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        );
      }
       return(
        <>
        <Image source={{ uri: this.state.flag }} 
        style={{width: 100, height: 100,borderRadius: 100,borderWidth: 3,borderColor: 'black',marginLeft: 130,marginTop: 20,marginBottom: 20}}>
        </Image>
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
       <Text h4>{this.state.country}</Text>
       
       </View>
       <View style={{marginTop: 20}}>
       
       <Text style={{marginLeft: 20,marginTop: 5,marginBottom: 5}}>
       <Text style={{fontWeight: "bold"}}> First Case On                 </Text>
             {this.state.firstDate}
            </Text>
            {this.line}
       <View style={{height: 1, width: '90%', backgroundColor: '#CED0CE', marginLeft: '5%', marginBottom: 2}}/> 


       <Text style={{marginLeft: 20,marginTop: 5,marginBottom: 5}}>
       <Text style={{fontWeight: "bold"}}> Cases on First Day       </Text>
           {this.state.firstDayCases}</Text>
       <View style={{height: 1, width: '90%', backgroundColor: '#CED0CE', marginLeft: '5%', marginBottom: 2}}/> 
        
       <Text style={{marginLeft: 20,marginTop: 5,marginBottom: 5}}>
       <Text style={{fontWeight: "bold"}}> Total Cases                    </Text>
           {this.state.totalCases}</Text>
       <View style={{height: 1, width: '90%', backgroundColor: '#CED0CE', marginLeft: '5%', marginBottom: 2}}/> 

       <Text style={{marginLeft: 20,marginTop: 5,marginBottom: 5}}>
       <Text style={{fontWeight: "bold"}}> Active Cases                 </Text>
           {this.state.activeCases}</Text>
       <View style={{height: 1, width: '90%', backgroundColor: '#CED0CE', marginLeft: '5%', marginBottom: 2}}/> 

       <Text style={{marginLeft: 20,marginTop: 5,marginBottom: 5}}>
       <Text style={{fontWeight: "bold"}}> Total Deaths                  </Text>
           {this.state.deaths}</Text>
       <View style={{height: 1, width: '90%', backgroundColor: '#CED0CE', marginLeft: '5%', marginBottom: 2}}/> 
       

       <Text style={{marginLeft: 20,marginTop: 5,marginBottom: 5}}>
       <Text style={{fontWeight: "bold"}}> Recovered                     </Text>
           {this.state.recovered}</Text>
       <View style={{height: 1, width: '90%', backgroundColor: '#CED0CE', marginLeft: '5%', marginBottom: 2}}/> 
       </View>

       
       </>
       )
    }
        
  }
 

  export default Screen2;