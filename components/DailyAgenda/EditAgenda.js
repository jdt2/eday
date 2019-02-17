import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, Input, Label, Form, Item, Button, ListItem, Body, Left, Card, CardItem, Right } from 'native-base';
import styles from '../../Styles';
import { List } from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import {Notifications} from 'expo';

export default class EditAgenda extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Daily Agenda Details',
            /*headerLeft: null,*/
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => params.handleAction()}
                >
                    <Text style={styles.headerRightText}>
                        Done
                    </Text>
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);

        
        this.state = {
            items: {},
            item: {},
            index: 0,
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("h:mm a"),
            token: '',
        };
    }

    componentDidMount() {
        let index = this.props.navigation.getParam("item", {});

        this.props.navigation.setParams({handleAction: this.addAgenda});

        this.loadNotifs();
    
        // load in data and todoActivated
        this.loadData(index);
    }

    loadNotifs = async () => {
        await AsyncStorage.getItem('token').then((value) => {
            if(value !== null) {
                this.setState({"token": value});
                console.log(value);
            }
        })
    }

    loadData = async (item) => {
        // load index in
        this.setState({date: moment(item.date).format("YYYY-MM-DD")});
        this.setState({time: moment(item.date).format("h:mm a")});
        this.setState({item: item});

        // load in data
        try {
            let date = moment(item.date).format("YYYY-MM-DD");

            await AsyncStorage.getItem("agenda").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    // get index
                    for(let i = 0; i < parsed[date].length; i++) {
                        if(parsed[date][i].date == item.date && parsed[date][i].text == item.text) {
                            this.setState({"index": i});
                            break;
                        }
                    }
                    this.setState({"items": parsed});
                } else {
                    this.setState({"items": {}});
                }
            }).done();
        } catch (error) {
            alert(error);
        }
    }

    addAgenda = async () => {
        // not really adding, more like editing
        try {

            let temp = this.state.items;
            let tempItem = temp[this.state.date][this.state.index];
            const newDateString = moment(tempItem.date).format("YYYY-MM-DD") +" "+ this.state.time;
            console.log(newDateString);
            // reset notification
            let notificationId = '';
            if(tempItem.notifId !== null && tempItem.notifId !== '') {
                Notifications.cancelScheduledNotificationAsync(tempItem.notifId);
            }
            if(this.state.token !== '') {
                let notification = {
                    title: this.state.time,
                    body: this.state.item.text,
                    ios: {sound: true},
                }
                Notifications.scheduleLocalNotificationAsync(notification, {time: new Date(moment(newDateString, "YYYY-MM-DD hh:mm a").toDate())}).then((localNotificationId) => {
                    notificationId = localNotificationId;
                    console.log(notificationId);
                });
            }
            tempItem.date = moment(newDateString, "YYYY-MM-DD hh:mm a").toDate();
            tempItem.text = this.state.item.text;
            tempItem.notifId = notificationId;
            temp[this.state.date][this.state.index] = tempItem;


            AsyncStorage.setItem("agenda", JSON.stringify(temp)).then(() => {
                this.props.navigation.navigate("DailyAgenda");
            });
        } catch(error) {
            alert(error);
        }
    }

    handleActionText(text) {
        let temp = this.state.item;
        /* temp[this.state.date][this.state.index].text = text; */
        temp.text = text;
        this.setState({item: temp});
    }

    removeAction() {

        let temp = this.state.items;
        temp[this.state.date].splice(this.state.index, 1);

        AsyncStorage.setItem("agenda", JSON.stringify(temp));
        
        this.props.navigation.navigate("DailyAgenda");
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel style={styles.todo}>
                            <Label>Daily Action Text</Label>
                            <Input
                                value={this.state.item.text}
                                numberOfLines={1}
                                onChangeText={(text) => {
                                    this.handleActionText(text);
                                }}
                            />
                        </Item>
                        <Card transparent>
                            <CardItem>
                                <Body>
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
                                </Body>
                            </CardItem>
                        </Card>
                    </Form>
                    <View style={styles.todoDelete}>
                        <Button
                            transparent
                            onPress={() => {
                                this.removeAction();
                            }}
                        >
                            <Text style={styles.todoDeleteText}>Delete</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}