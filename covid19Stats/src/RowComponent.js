import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

class RowText extends Component{
    render(){
        var mt=2;
        if(this.props.showLine!=false){
        var line =<View style={{height: 1, width: '90%', backgroundColor: '#CED0CE', marginBottom: 2}}/> 
        mt=5;
        }
    return (
      <>
      <View style={{marginTop: mt,marginBottom: mt,flexDirection: 'row',justifyContent: 'flex-start'}}>
              <Text style={{fontWeight: "bold",marginLeft: 30}}>
              {this.props.text} </Text>
              <Text style={this.props.styles} > {this.props.value} </Text>
          </View>
          {line}
          </>
    )
  }
  }

  export default RowText;