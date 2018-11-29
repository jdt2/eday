import React from 'react';
import styles from '../../Styles';
import { DatePickerIOS, AsyncStorage, Image, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Animated, AlertIOS, FlatList, Platform, Keyboard } from 'react-native';
import { Item, Label, Form, Input, Container, Header, Title, Content, Button, Card, CardItem, Text, Body, Left, Right, Icon, Footer, Tabs, Tab, List, ListItem, CheckBox, Textarea } from "native-base";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

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
        }

    }

    getDate() {
        const newDateString = this.state.date +" "+ this.state.time;
        const newDate = moment(newDateString, "YYYY-MM-DD hh:mm a").toDate();
        console.log(newDateString);
        console.log("Date created: " + newDate);
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
                let dateString = this.getDate().toISOString().split("T")[0];
                let newArr = {};
                if(parsed != null) {
                    newArr = parsed;
                    if(newArr[dateString] != null) {
                        newArr[dateString].push({date: this.getDate(), text: this.state.text});
                    } else {
                        newArr[dateString]= [{date: this.getDate(), text: this.state.text}];
                    }
                } else {
                    newArr = {};
                    newArr[dateString] = [{date: this.getDate(), text: this.state.text}];
                }
                newArr[dateString].sort((a,b) => {
                    return new Date(b.date) - new Date(a.date);
                });
                AsyncStorage.setItem("agenda", JSON.stringify(newArr)).then(() => {
                    this.props.navigation.navigate("DailyAction");
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
                        <DatePicker
                            style={{width: 200}}
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
                        <DatePicker
                            style={{width: 200}}
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
                    </Form>
                </Content>
            </Container>
        );
    }

}