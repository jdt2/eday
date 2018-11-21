import React from 'react';
import { AsyncStorage, Image, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Animated, AlertIOS, FlatList, Platform } from 'react-native';
import { Input, Container, Header, Title, Content, Button, Card, CardItem, Text, Body, Left, Right, Icon, Footer, Tabs, Tab, List, ListItem } from "native-base";
import styles from '../../Styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Todo extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [
        'Java', 'Python', 'Javascript'
      ],
      loading: false,
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  async componentWillMount() {
    /* await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    }); */
    this.setState({ loading: true });
  }

  add = (text) => {

    let notEmpty = text.trim().length > 0;

    if (notEmpty) {

      this.setState(
        prevState => {
          let { data } = prevState;
          return {
            data: data.concat(text),
            text: ""
          };
        }
      );
    }
  }

  remove = (i) => {

    this.setState(
      prevState => {
        let data = prevState.data.slice();

        data.splice(i, 1);

        return { data };
      }
    );

  }

  // updateState = 
  showForm = () => {
    
      AlertIOS.prompt(
        'Enter  Text',
        null,
        text => this.add(text)
      );

  }

  render() {
   
    /* if (!this.state.loading) {
      return <Expo.AppLoading />
    } */

    listItems = [];

    for (let i = 0; i < 10; i++) {
      listItems.push(
        <ListItem style={styles.todo}>
          <Icon name="add" type="MaterialIcons" style={{fontSize: 24, color: "#C5E7EA"}} />
          <Input
            
          />
        </ListItem>
      );
    }

    return (
      <Container>
        <Content>
          <List>
            {listItems}
          </List>
        </Content>
      </Container>
    );
  }
}
