import React from 'react';
import { AsyncStorage, Linking, Animated, Platform, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Container, Content, Card, CardItem, Body, Button } from 'native-base';
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
              <Text style={styles.aboutText}>Created by:</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.aboutText}>Jesse Du</Text>
                <Text style={styles.aboutText}>Sean Castrina</Text>
                <Text style={styles.aboutText}>Collin Castrina</Text>
              </Body>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem header>
              <Text style={styles.aboutText}>Developed by:</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.aboutText}>Champion Publishing</Text>
              </Body>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem header>
              <Text style={styles.aboutText}>Find our podcast and learn more:</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={[styles.aboutText, {color: 'blue'}]} onPress={() => Linking.openURL('https://seancastrina.com')}>seancastrina.com</Text>
              </Body>
            </CardItem>
          </Card>
          <Button
              style={{alignSelf: 'center', padding: 10,}}
              onPress={() => {
                  AsyncStorage.removeItem("tutorial");
                  this.props.navigation.navigate("Tutorial");
              }}
          >
              <Text style={[styles.aboutText, {color: 'white'}]}>Revisit Tutorial</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}