import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default class App extends React.Component {

  constructor(){
    super();
    this.state ={
      isLoading: true, 
      images: []
    }
    this.loadWallpapers = this.loadWallpapers.bind(this);
  }
 
  loadWallpapers(){
    axios.get('https://api.unsplash.com/photos/random?count=30&client_id=d459dc78ae1bb12d02f348d3d5bc53d41f65c8c8038c508d4d30a13b762d9d75')
    .then(function(response){this.setState({images:response.data, isLoading:false});console.log(response.data);
    }.bind(this))
    .catch((error)=>console.log(error))
    .finally(()=>console.log('request completed'));
  }
  componentDidMount(){
    this.loadWallpapers()
  }
  render(){
    //verifica el estado del state y renderiza a partir de este
    return this.state.isLoading? (
      <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color= "grey" />
        
      </View>
    ):(
      <View style={{flex: 1, backgroundColor: 'black'}}></View>
    )
  }
  


 styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

}
