import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import axios from 'axios';

class countriesList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          data: [],
          error: null,
          selectedItem: null,
          flag: null,
        };
    
        this.response = [];
      }
    
      
    
      componentDidMount() {
        this.API();
      }
    
      API = () => {
        const url = `https://disease.sh/v2/countries`;
        this.setState({ loading: true });
        axios.get(url)
          .then(res => {
            this.setState({
                data: res.data,
                loading: false,
              });
            
            this.response = res.data;
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
          
      };
    
    
      line = () => {
        return (
          <View
            style={{ height: 1, width: '90%',backgroundColor: '#CED0CE',marginLeft: '5%', }}
          />
        );
      };
    
      nextS(selectedCountry,selectedFlag){
        this.props.navigation.navigate("ByCountry",{country: selectedCountry,flag: selectedFlag});
      }
    
      search = text => {
        this.setState({
          value: text,
        });
        const newData = this.response.filter(item => {
            const itemData = `${item.country.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData)>-1;
          });
          this.setState({
            data: newData,
          });
        };
      
    
      searchBar = () => {
        return (
          <SearchBar
            placeholder="Search"
            darkTheme
            onChangeText={text => this.search(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        );
      };

      render(){
          
        if (this.state.loading) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
              </View>
            );
          }
          return (
            
              <View style={{ flex: 1 }}>
              <FlatList
                data={this.state.data}
                keyExtractor={(item,index) => {         
                  return index.toString()}}
                  keyboardShouldPersistTaps="always"
                renderItem={({ item,index }) => (
                  <ListItem
                  key={item.id}
                    leftAvatar={{size:"medium", source:  { uri: `${item.countryInfo.flag}` } }}              
                    title={`${item.country}`}
                    chevron
                    onPress={()=> {this.nextS(item.country,item.countryInfo.flag)}}
                  />
                )}
                ItemSeparatorComponent={this.line}
                ListHeaderComponent={this.searchBar}
              />
            </View>
        )
        }
    }

    export default countriesList