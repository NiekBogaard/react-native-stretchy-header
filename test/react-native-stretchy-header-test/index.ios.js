/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ListView,
} = React;

var ProfileComponent =require('react-native-profile-component');

/*** customized avatar, icons, banner ***/
const avatar = require('./assets/Cute-Girl-HD-Wallpapers.jpg');
const assets = {
  'tab1': {'label': 'My Quest', 'icon': require('./assets/santaclaus@1x.png'), 'sence': require('./app/views/Sence1')},
  'tab2': {'label': 'Collection', 'icon': require('./assets/gift_box@1x.png'), 'sence': require('./app/views/Sence2')},
  'tab3': {'label': 'PhotoBooth', 'icon': require('./assets/tree@1x.png'), 'sence': require('./app/views/Sence3')},
};
const banner = require('./assets/Christmas-Banners.jpg');

class ProfileComponentTest extends React.Component {
  constructor(props: any) {
    super(props);
    this.state= {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(['row 1', 'row 2']),
    })
  }

  render() {
    return (
      <ProfileComponent
        avatar ={avatar}
        assets ={assets}
        banner ={banner}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  shimmer: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('ProfileComponentTest', () => ProfileComponentTest);
