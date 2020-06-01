import React, { Component } from 'react';
import { View, FlatList,Image,TouchableOpacity } from 'react-native';
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
            return itemData.includes(textData);
          });
          this.setState({
            data: newData,
          });
        };
      
    
      searchBar = () => {
        return (
          <SearchBar
            placeholder="Search"
            inputContainerStyle={{backgroundColor: 'white'}}
            inputStyle={{backgroundColor: 'white'}}
            onChangeText={text => this.search(text)}
            autoCorrect={false}
            value={this.state.value}
            round
          />
        );
      };

      render(){
          
        if (this.state.loading) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'white' }}>
                 <Image style={{alignSelf: 'center',height: 160,width: 160}} source={require('../assets/loading.gif')}></Image>
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
                    leftAvatar={{size:"small",rounded:false, source:  { uri: `${item.countryInfo.flag}` } }}              
                    title={`${item.country}`}
                    chevron
                    onPress={()=> {this.nextS(item.country,item.countryInfo.flag)}}
                  />
                )}
                ItemSeparatorComponent={this.line}
                ListHeaderComponent={this.searchBar}
                stickyHeaderIndices={[0]}
              />
            </View>
        )
        }
    }

    export default countriesList