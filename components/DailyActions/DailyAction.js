import React from 'react';
import { AsyncStorage, Image, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Animated, AlertIOS, FlatList, Platform, Keyboard } from 'react-native';
import { Input, Container, Header, Title, Content, Button, Card, CardItem, Text, Body, Left, Right, Icon, Footer, Tabs, Tab, List, ListItem, CheckBox } from "native-base";
import styles from '../../Styles';
/* import CheckBox from './../util/CheckBox'; */
import { Agenda } from 'react-native-calendars';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import {AdMobBanner} from 'expo';

export default class DailyAction extends React.Component {

    static navigationOptions = ({navigation}) => {

        return {
          headerTitle: 'Daily Actions',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            currText: [],
            data: [],
            todoActivated: [],
            items: {},
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        try {
            await AsyncStorage.getItem("todo").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({data: parsed});
                } else {
                    this.setState({data: []});
                }
            }).done();

            // now we get the actions that are activated
            await AsyncStorage.getItem("todoActivated").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({"todoActivated": parsed});
                } else {
                    this.setState({"todoActivated": []});
                }
            }).done();
        } catch (error) {
            alert(error);
        }
    }

    handleInput(text, i) {
        let temp = this.state.currText;
        temp[i] = text;
        this.setState({currText: temp});
    }

    add = (i) => {

        let notEmpty = this.state.currText[i] && this.state.currText[i].trim().length > 0;

        if (notEmpty) {            

            this.setState(
                prevState => {
                    let { data, currText } = prevState;
                    data[i] = currText[i];
                    AsyncStorage.setItem("todo", JSON.stringify(data));
                    return {
                        data: data,
                    };
                }
            );
        }
    }

    activateItem(i) {
        let temp = this.state.todoActivated;
        if(temp[i] == true) {
            temp[i] = false;
        } else {
            temp[i] = true;
        }
        this.setState({todoActivated: temp});
        AsyncStorage.setItem("todoActivated", JSON.stringify(temp));
    }

    // get last empty item
    lastEmpty() {
        for(let i = 0; i < this.state.data.length; i++) {
            if(this.state.data[i] == null) {
                return i;
            }
        }
        // none of them are null, so return the next index
        return this.state.data.length;
    }

    renderDailyActions() {

        listItems = [];

        for (let i = 0; i <= this.state.data.length; i++) {
            if(i == this.lastEmpty()) {
                listItems.push(
                    <ListItem key={i} style={styles.todo}>
                        <Icon name="add" type="MaterialIcons" style={{fontSize: 24, color: "#C5E7EA"}} />
                        <Input
                            placeholder="Enter your daily action"
                            placeholderTextColor="#88B8C3"
                            onChangeText={(text) => {
                                this.handleInput(text, i);
                            }}
                            onSubmitEditing={() => {
                                this.add(i);
                            }}
                            onBlur={() => {
                                this.add(i);
                            }}
                        />
                    </ListItem>
                );
            } else if(this.state.data[i] != null) {
                listItems.push(
                    <ListItem key={i} style={styles.todo}>
                    <CheckBox key={i} checked={this.state.todoActivated[i]} style={{color: "#3FB0B9"}} onPress={() => {
                        this.activateItem(i);
                    }} />
                    { !this.state.todoActivated[i] ?
                        <Input
                        defaultValue={this.state.data[i]}
                        style={styles.todoTextBox}
                        onChangeText={(text) => {
                            this.handleInput(text, i);
                        }}
                        onSubmitEditing={() => {
                            this.add(i);
                        }}
                        onBlur={() => {
                            this.add(i);
                        }}
                        /> : <Body style={{alignItems: "flex-start"}}><Text style={[styles.todoTextBox, {color: "#88B8C3"}]}>
                        {this.state.data[i]}
                        </Text></Body>
                    }
                    <Right>
                        <Button
                        transparent
                        rounded
                        large
                        onPress={() => {
                            this.props.navigation.navigate("TodoPage", {
                                index: i,
                            })
                        }}
                        >
                        <Icon name="info-outline" type="MaterialIcons" style={{fontSize: 24, color: "#3FB0B9"}} />
                        </Button>
                    </Right>
                    </ListItem>
                );
            } else {
                listItems.push(
                    <ListItem key={i} style={styles.todo} onPress={() => {Keyboard.dismiss()}} disabled={true} />
                );
            }
        }
    
        return (
            <Content>
              <List>
                {listItems}
              </List>
              <View style={{height: 70,}}></View>
              
            </Content>
        );
    }

    render() {
        return (
            <Container>
                <NavigationEvents
                    onDidFocus={payload => this.loadData()}
                />
                {this.renderDailyActions()}
                {/* Ads */}
                <AdMobBanner
                style={styles.bottomBanner}
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-5171415220082797/1924509279" // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={(err) => {console.log(err)}}/>
            </Container>
        );
    }

}