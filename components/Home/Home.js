import React from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../../Styles';

const quotes = [{
  message: 'Stop focusing on dumb shit. Don’t be afraid to break things. Don’t be romantic. Don’t take the time to breathe. Don’t aim for perfect. And whatever you do, keep moving.',
  author: 'Gary Vaynerchuk',
}, {
  message: 'Make it simple. Make it memorable. Make it inviting to look at. Make it fun to read.',
  author: 'Gary Vaynerchuck',
}, {
  message: `Don't quit. Never give up trying to build the world you can see, even if others can't see it. Listen to your drum and your drum only. It's the one that makes the sweetest sound.`,
  author: 'Simon Sinek',
}, {
  message: 'If you have the opportunity to do amazing things in your life, I strongly encourage you to invite someone to join you.',
  author: 'Simon Sinek',
}, {
  message: `I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'`,
  author: 'Muhammad Ali',
}];

export default class Home extends React.Component {
	static navigationOptions = ({navigation}) => {
    return {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => {
        <Image
          source={require('../../assets/icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      },
      headerTitle: 'Home',
    };
  };
  
  constructor(props) {
    super(props);
    const min = 0;
    const max = 4;
    this.state = {
      random: parseInt(min+Math.random() * (max-min)),
      quote: null,
    };
  }
  
  componentDidMount() {
    this.getQuote();
  }

  getQuote = async () => {
    try {
      let response = await fetch(
        "http://quotes.rest/qod",
        {
          "Accept": "applications/json",
          "Content-Type": "applications/json",
        }
      );
      let responseJson = response.json().then((data) => {
        this.setState({quote: data.contents.quotes[0]});
      });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    /* alert(JSON.stringify(currQuote)); */
    let currQuote = "";
    let currAuthor = "";
    if(this.state.quote == null) {
      currQuote = "Loading...";
    } else {
      /* alert(JSON.stringify(this.state.quote)); */
      currQuote = this.state.quote.quote;
      currAuthor = this.state.quote.author;
    }

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.whole}>
            <Image source={require('../../assets/begin_quote.png')} style={{width: 30, height: 20}}/>
            <Text style={styles.quote}>
              {/*Innovation distinguishes between a leader and a follower*/}
              {currQuote}
            </Text>
            {/*<Image source={require('./assets/end_quote.png')} style={{width: 30, height: 20}}/>*/}
          </View>
          <Text style={styles.from}>
            {/* Steve Jobs */}
            {currAuthor}
          </Text>
        </View>
      </View>
    );
  }
}