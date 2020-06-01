import React from 'react';
import axios from 'axios';

import { View,Image,TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RowText from './RowComponent'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
  


async componentDidMount() {
    this.makeRemoteRequest();
    await sleep(1000);
    this.setState({loading: false})
  }

  makeRemoteRequest = () => {
    const url = "https://api.covid19api.com/dayone/country/"+this.state.country+"/status/confirmed";
    this.setState({ loading: true });
    
    axios.get("https://disease.sh/v2/countries/"+this.state.country)
      .then(res => {
          this.setState({
              totalCases: res.data.cases,
              activeCases: res.data.active,
              deaths: res.data.deaths,
              recovered: res.data.recovered,
              
          })
      })
      .catch(error => {
        this.setState({ error });
      });

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

    
      
      if(this.state.firstDayCases == null){
        this.setState({firstDayCases: 
          "No Data Found", firstDate: "No Data Found"});
      }

  };


  render(){  

    
    if (this.state.loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'white' }}>
                 <Image style={{alignSelf: 'center',height: 160,width: 160}} source={require('../assets/loading.gif')}></Image>
              </View>
        );
      }
       return(
        <>
        <View style={{ marginTop: 5,width: "100%",flexDirection: 'row',justifyContent: 'space-between'}}>
        <Icon name="arrow-left" size={30} color="#40c4ff" style={{marginLeft: 10}} onPress={() => this.props.navigation.goBack()} />
        <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
              <Image source={require('../assets/menu.png')}  style={{marginRight: 15,height: 30,width: 30}}></Image>
              </TouchableOpacity>
      </View>
        <View style={{alignItems: 'center'}}>
        <Image source={{ uri: this.state.flag }} 
        style={{width: 150, height: 100,borderWidth: 3,borderColor: 'black',marginTop: 20,marginBottom: 20}}>
        </Image>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
       <Text h4>{this.state.country}</Text>
       
       </View>
       <View style={{marginTop: 20}}>
       

       <RowText text="First Case On" value={this.state.firstDate} styles={{marginLeft: 100}}></RowText>
       <RowText text="Cases on First Day" value={this.state.firstDayCases} styles={{marginLeft: 62}}></RowText>
       <RowText text="Total Cases" value={this.state.totalCases} styles={{marginLeft: 110}}></RowText>
       <RowText text="Active Cases" value={this.state.activeCases} styles={{marginLeft: 100}}></RowText>
       <RowText text="Total Deaths" value={this.state.deaths} styles={{marginLeft: 105}}></RowText>
       <RowText text="Recovered" value={this.state.recovered} styles={{marginLeft: 116}}></RowText>

       </View>

       
       </>
       )
    }
        
  }
 

  export default Screen2;