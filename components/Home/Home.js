import React from 'react';
import { Animated, Platform, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Container, Content } from 'native-base';
import styles from '../../Styles';
import LottieView from 'lottie-react-native';
import {AdMobBanner} from 'expo';

/* const quotes = [{
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
}]; */

export default class Home extends React.Component {
	static navigationOptions = ({navigation}) => {
    return {
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
      fadeAnim: new Animated.Value(0),
      slideUpQuote: new Animated.Value(300),
      slideUpAuthor: new Animated.Value(400),
    };
  }
  
  componentDidMount() {
    this.getQuote();
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 2000,
      }
    ).start();

    Animated.timing(
      this.state.slideUpQuote,
      {
        toValue: 0,
        duration: 2000,
      }
    ).start();

    Animated.timing(
      this.state.slideUpAuthor,
      {
        toValue: 0,
        duration: 2300,
      }
    ).start();
  }

  getQuote = async () => {
    try {
      let response = await fetch(
        "http://quotes.rest/qod",
        {
          "Accept": "application/json",
          "Content-Type": "application/json",
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
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Animated.View style={[styles.content, {opacity: this.state.fadeAnim}]}>
            <Animated.View style={[styles.whole, {
              transform: [
                {
                  translateY: this.state.slideUpQuote
                }
              ],
              marginTop: 15,
            }]}>
              <Image source={require('../../assets/begin_quote.png')} style={{width: 30, height: 20}}/>
              <Text style={styles.quote}>
                {currQuote}
              </Text>
            </Animated.View>
            <Animated.Text style={[styles.from, {
              transform: [
                {
                  translateY: this.state.slideUpAuthor
                }
              ],
              marginBottom: 15,
            }]}>
              {currAuthor}
            </Animated.Text>
          </Animated.View>

          {/* Ads */}
          <AdMobBanner
            style={{position: 'absolute', bottom: 0}}
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-7973916379677731/6156957851"
            testDeviceID="EMULATOR"
            onAdFailedToLoad={error => console.error(error)}
          />
        </Content>
      </Container>
    );
  }
}