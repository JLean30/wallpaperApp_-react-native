import React from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator,
  FlatList, Dimensions, Image
} from 'react-native';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
export default class App extends React.Component {

  state = {
    isLoading: true,
    images: []
  }
  loadWallpapers = () => {
    axios.get('https://api.unsplash.com/photos/random?count=30&client_id=d459dc78ae1bb12d02f348d3d5bc53d41f65c8c8038c508d4d30a13b762d9d75')
      .then((response) => {
        this.setState({ images: response.data, isLoading: false }); console.log(response.data.urls.regular);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('request completed'));
  }
  componentDidMount() {
    this.loadWallpapers();
  }
  renderItem = ({ item }) => {
    return (
      <View style={{flex: 1}}>
<View style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor:'black',
        justifyContent:"center",
        alignItems:'center'
      }}>
        <ActivityIndicator color='grey' size='large'/>
      </View>
      <View style={{ height, width }}>
        <Image
          style={{ flex: 1, height: null, width: null }}
          source={{ uri: item.urls.regular }}
        />

      </View>
      </View>
      
      
    )
  }
  render() {
    //verifica el estado del state y renderiza a partir de este
    return this.state.isLoading ? (
      <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="grey" />

      </View>
    ) : (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <FlatList horizontal
            pagingEnabled
            data={this.state.images}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            resizeMode='cover' />
        </View>
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
