import React from 'react';
import { Linking, Animated, Platform, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import styles from '../../Styles';
import LottieView from 'lottie-react-native';

export default class About extends React.Component {
	static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'About',
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
  }

  render() {

    return (
      <Container>
        <Content>
          <Card transparent>
            <CardItem header>
              <Text>Created by:</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Jesse Du</Text>
                <Text>Sean Castrina</Text>
                <Text>Collin Castrina</Text>
              </Body>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem header>
              <Text>Developed by:</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Champion Publishing</Text>
              </Body>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem header>
              <Text>Find our podcast and learn more:</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://seancastrina.com')}>seancastrina.com</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}