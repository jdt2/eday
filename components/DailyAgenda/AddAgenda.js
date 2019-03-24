import React from 'react';
import styles from '../../Styles';
import { DatePickerIOS, AsyncStorage, Image, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Animated, AlertIOS, FlatList, Platform, Keyboard } from 'react-native';
import { Item, Label, Form, Input, Container, Header, Title, Content, Button, Card, CardItem, Text, Body, Left, Right, Icon, Footer, Tabs, Tab, List, ListItem, CheckBox, Textarea } from "native-base";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {Notifications} from 'expo';

export default class AddAgenda extends React.Component {
    
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
          headerTitle: 'Add an Agenda Item',
          headerRight: (
              <TouchableOpacity
                style={styles.headerRight}
                onPress={() => params.handleText()}
              >
                    <Icon name="md-checkmark" style={{fontSize: 25, color: "#FFF"}} />
              </TouchableOpacity>
          ),
        };
    };

    constructor(props) {
        super(props);

        this.props.navigation.setParams({handleText: this.submitText});

        this.state = {
            text: "",
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("h:mm a"),
            token: '',
        }

    }

    componentDidMount() {
        let currDate = this.props.navigation.getParam("currDate", "");
        if(currDate != "") {
            this.setState({date: currDate});
        }

        this.loadNotifs();
    }

    loadNotifs = async () => {
        await AsyncStorage.getItem('token').then((value) => {
            if(value !== null) {
                this.setState({"token": value});
                console.log(value);
            }
        })
    }

    getDate() {
        const newDateString = this.state.date +" "+ this.state.time;
        const newDate = moment(newDateString, "YYYY-MM-DD hh:mm a").toDate();
        /* console.log(newDateString);
        console.log("Date created: " + newDate); */
        /* alert(newDateString);
        alert(newDate); */
        return newDate;
    }

    handleText(text) {
        this.setState({text: text});
    }
    
    submitText = async () => {
        // get from AsyncStorage and append
        try {
            await AsyncStorage.getItem("agenda").then((value) => {
                let parsed = JSON.parse(value);
                let dateString = this.state.date;
                console.log("String: " + this.state.text.length);
                console.log("Date string: " + dateString);
                let newArr = {};

                if(this.state.text.length == 0) return;
                if(parsed == null) parsed = {};
                if(parsed[dateString] == null) parsed[dateString] = [];
                let notificationId = '';
                // schedule a notification
                if(this.state.token !== '') {
                    let time = moment(this.getDate()).format("h:mm a");
                    let notification = {
                        title: time,
                        body: this.state.text,
                        ios: {sound: true},
                    }
                    Notifications.scheduleLocalNotificationAsync(notification, {time: new Date(this.getDate())}).then((localNotificationId) => {
                        notificationId = localNotificationId;
                        console.log(notificationId);
                    });
                }
                parsed[dateString].push({notifId: notificationId, date: this.getDate(), text: this.state.text});
            
                /* newArr[dateString].sort((a,b) => {
                    return new Date(b.date) - new Date(a.date);
                }); */
                AsyncStorage.setItem("agenda", JSON.stringify(parsed)).then(() => {
                    this.props.navigation.navigate("DailyAgenda");
                });
            });
        } catch (error) {
            alert(error);
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Daily Agenda Item</Label>
                            <Input
                                onChangeText={(text) => {this.handleText(text)}}
                            />
                        </Item>
                        <Card transparent>
                            <CardItem>
                                <Left>
                                    <DatePicker
                                        style={{width: 150,}}
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="select date"
                                        format="YYYY-MM-DD"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }
                                        // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(date) => {this.setState({date: date})}}
                                    />
                                </Left>
                                <Right>
                                    <DatePicker
                                        style={{width: 150}}
                                        date={this.state.time}
                                        mode="time"
                                        placeholder="select time"
                                        format="h:mm a"
                                        is24Hour={false}
                                        minuteInterval={10}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }
                                        // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(time) => {
                                            this.setState({time: time});
                                        }}
                                    />
                                </Right>
                            </CardItem>
                        </Card>
                    </Form>
                </Content>
            </Container>
        );
    }

}