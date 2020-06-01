import React, { Component } from 'react';
import { View, FlatList,Image,StyleSheet,TouchableOpacity} from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RowText from './RowComponent'

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 5,
    },
    item: {
      flex: 1,
      backgroundColor: '#90caf9',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5,
    },
    title: {
      fontSize: 24,
      color: 'white',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 6
    },
    values: {
        
        
    },
    valueColor: {
        width: 10,
        height: 10,
        borderRadius: 20
    },
    
  });

class Stats extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          continent: this.props.route.params.continent,
          countries: null,
          data: null,
        };
        this.cont = this.state.continent;

      }

      componentDidMount() {
        this.getRegionCountries();
        
      }
    
      getRegionCountries = () => {
        const url = `https://disease.sh/v2/continents/`+this.state.continent;
        this.setState({ loading: true });
    
        this.array = [];
        axios.get(url)
          .then(res => {
            this.setState({
                countries: res.data.countries,
                error: res.error || null,
              }
              );
              if(res.data.countries != null){
              const url1 = `https://disease.sh/v2/countries/{,`+res.data.countries+`}?yesterday=false`;
              

              axios.get(url1)
              .then(res => {
                  this.setState({  
                    data: res.data,
                    loading: false,
                });
              }
    
              )
            }
          }).catch(error => {
            this.setState({ error, loading: false });
          });
        
         
          
      };


   

  
      render() {
        
        if (this.state.loading==true || this.state.data == null) {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'white' }}>
                 <Image style={{alignSelf: 'center',height: 160,width: 160}} source={require('../assets/loading.gif')}></Image>
              </View>
          );
        }
        if(this.state.continent=="Australia%2FOceania"){
            this.cont = "Australia/Oceania";
    }

        if(this.state.data != null){
        return (
            <>
        <View style={{ marginTop: 5,width: "100%",flexDirection: 'row',justifyContent: 'space-between'}}>
        <Icon name="arrow-left" size={30} color="#40c4ff" style={{marginLeft: 10}} onPress={() => this.props.navigation.navigate("Home")} />
        <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
              <Image source={require('../assets/menu.png')}  style={{marginRight: 15,height: 30,width: 30}}></Image>
              </TouchableOpacity>
      </View>
        <View style={{alignItems: 'center',justifyContent: 'center'}}>
        <Text h4>{this.cont}</Text>
        </View>
        <FlatList  data={this.state.data}
        keyExtractor={(item,index) => { return index.toString()}}
        renderItem={({ item,index }) => (
        <View style={styles.item}>
        <Text style={styles.title}>{item.country}</Text>
        <View style={styles.values}>
        <RowText text="Cases" value={item.cases} styles={{marginLeft: 100}} showLine={false}></RowText>
        <RowText text="Active" value={item.active} styles={{marginLeft: 100}} showLine={false}></RowText>
        <RowText text="Deaths" value={item.deaths} styles={{marginLeft: 96}} showLine={false}></RowText>
        <RowText text="Recovered" value={item.recovered} styles={{marginLeft: 70}} showLine={false}></RowText>
        <RowText text="Cases Today" value={item.todayCases} styles={{marginLeft: 56}} showLine={false}></RowText>
        <RowText text="Deaths Today" value={item.todayDeaths} styles={{marginLeft: 50}} showLine={false}></RowText>
        <RowText text="Tests" value={item.tests} styles={{marginLeft: 105}} showLine={false}></RowText>
        </View>
      </View>
          )}
    // }        
        />
        
        </>

        )
        }

}
}

export default Stats;