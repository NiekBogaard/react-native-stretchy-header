var React= require('react-native');
var {
  Component,
  PropTypes,
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
  PixelRatio,
  Dimensions,
  TouchableHighlight,
  DeviceEventEmitter,
  NavigatorIOS,
}= React;

var device= Dimensions.get('window');
var _= require('lodash');

class ProfileComponent extends React.Component {

  constructor(props: any) {
    super(props);
    this.state= {
      scrollY: new Animated.Value(0),
      avatar: this.props.avatar || require('../assets/avatar.jpg'),
      assets: this.props.assets || {
        'tab1': {'label': 'Label1', 'icon': require('../assets/Stopwatch@1x.png'), 'sence': require('../sences/Sence1')},
        'tab2': {'label': 'Label2', 'icon': require('../assets/Heart@1x.png'), 'sence': require('../sences/Sence2')},
        'tab3': {'label': 'Label3', 'icon': require('../assets/Galleray@1x.png'), 'sence': require('../sences/Sence3')},
      },
      banner: this.props.banner || require('../assets/bg.jpg'),
      activeTab: 'tab1',
      translateX: new Animated.Value(0),
    };
  }

  componentDidMount() {
    // load data from client
    var tabsCount =_.size(this.state.assets),
        tabStartPositionObj ={},
        count =0;
    _.forEach(this.state.assets, (n, key) => {
      tabStartPositionObj[key] = count*device.width/tabsCount;
      count++;
    });
    // generate tabStartPosition state
    this.setState({tabStartPosition: tabStartPositionObj});
    // generate width of the active bar
    this.setState({tabBarWidth: device.width/tabsCount});
  }

  componentWillMount() {
    // load data from server
  }

  _translateX(positionX) {
    Animated.spring(
      this.state.translateX,
      {
        toValue: positionX,
        friction: 8,
      }
    ).start();
  }

  _renderInitialTab(assets) {
    return (assets[_.findKey(assets)].sence);
  }

  _renderTabs(assets) {
    var tabsBarComponents = [];
    _.forEach(this.state.assets, (n, key) => {
      tabsBarComponents.push(
        <TouchableHighlight
          underlayColor={'#bdc3c7'}
          onPress={() => this._onPressTab(key)}
          style={[styles.tab, {
            width: this.state.tabBarWidth,
            backgroundColor: '#ecf0f1',
        }]}>
        <View>
          <Image style={[styles.tabIcon, {
            position: 'absolute',
            left: this.state.tabBarWidth/2 -12,
            top: 10,
          }]} source={assets[key].icon}/>
          <Text style={styles.tabText}>{assets[key].label}</Text>
        </View>
        </TouchableHighlight>);
    })
    return({tabsBarComponents});
  }

  _renderSence(tabNo) {
    this.refs.TabContent.replace({
      component: this.state.assets[tabNo].sence,
    });
  }

  _onPressTab(tabNo) {
    if ( this.state.tabStartPosition.hasOwnProperty(tabNo) ) {
      this._translateX(this.state.tabStartPosition[tabNo]);
      this.setState({activeTab: this.state.tabStartPosition[tabNo]});
      // Switch Content
      this._renderSence(tabNo);
    }else {
      console.log('error occurred');
    }
  }

  render(): ReactElement {
    return (
      <ScrollView
        backgroundColor= {'#bdc3c7'}
        contentContainerStyle= {{marginTop: -40}}
        directionalLockEnabled= {true}
        scrollEventThrottle= {16}
        onScroll= {Animated.event(
          [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
        )}
      >
        <Animated.View style={[styles.container, {
          opacity: this.state.scrollY.interpolate({ inputRange: [-10, 0, 30], outputRange: [1, 1, 0.8]}),
        }]}>
            <Animated.Image
              source={this.state.banner}
              style={[styles.cover, {
                transform: [
                  {
                    scale: this.state.scrollY.interpolate({ inputRange: [-50, -30, 0, 30], outputRange: [1.05, 1, 1, 1]}),
                  },
                ],
              }]}
            />
            <Image
              source={this.state.avatar}
              style={styles.avatar}
            />
        </Animated.View>
        <View style={[styles.tabGroup]}>
          {this._renderTabs(this.state.assets)}
          <Animated.View style={[styles.tabActive, {
            width: this.state.tabBarWidth,
            transform: [
              {translateX: this.state.translateX},
            ]
          }]}></Animated.View>
        </View>
        <NavigatorIOS
          style={styles.wrapper}
          ref="TabContent"
          initialRoute={{
            title: 'My First Route',
            component: this._renderInitialTab(this.state.assets)
          }}
          navigationBarHidden={true}
        />
      </ScrollView>
    )
  }
};

ProfileComponent.propTypes = {
  avatar: React.PropTypes.number,
  assets: React.PropTypes.object,
  banner: React.PropTypes.number,
};

var styles = StyleSheet.create({
  wrapper: {
    height: device.height-250-PixelRatio.getPixelSizeForLayoutSize(30)+40,
  },
  container: {
    height: 250,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  cover: {
    flex: 1,
    width: device.width,
  },
  avatar: {
    position: 'absolute',
    top: 165 - PixelRatio.getPixelSizeForLayoutSize(27),
    left: device.width/2 - PixelRatio.getPixelSizeForLayoutSize(27),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(27),
    width: PixelRatio.getPixelSizeForLayoutSize(54),
    height: PixelRatio.getPixelSizeForLayoutSize(54),
  },
  tabGroup: {
    flexDirection: 'row',
  },
  tab: {
    height: PixelRatio.getPixelSizeForLayoutSize(30),
    borderWidth: 0.5,
    borderColor: '#cccccc',
  },
  tabText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#2c3e50',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(20),
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabActive: {
    position: 'absolute',
    top: PixelRatio.getPixelSizeForLayoutSize(30)-3,
    left: 0,
    height: 3,
    backgroundColor: '#f1c40f',
  },
});

module.exports = ProfileComponent
