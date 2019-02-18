import React from 'react';
import { AsyncStorage, Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, Dimensions, ScrollView, Animated, AlertIOS, FlatList, Platform, Keyboard } from 'react-native';
import { Input, Container, Header, Title, Content, Button, Card, CardItem, Text, Body, Left, Right, Icon, Footer, Tabs, Tab, List, ListItem, CheckBox } from "native-base";
import styles from '../../Styles';
/* import CheckBox from './../util/CheckBox'; */
import { Agenda } from 'react-native-calendars';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import Swipeable from 'react-native-swipeable';
import {Notifications, AdMobBanner} from 'expo';

export default class DailyAgenda extends React.Component {

    static navigationOptions = ({navigation}) => {

        return {
          headerTitle: 'Schedule',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            currText: [],
            data: [],
            todoActivated: [],
            items: {},
            token: "",
            swipeables: {},
            selected: {},
        }
    }

    componentDidMount() {
        this.loadData();

        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
        this.props.navigation.navigate("DailyAgenda");
    }

    loadData = async () => {
        try {
            await AsyncStorage.getItem("agenda").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    // sort parsed
                    let tempArr = parsed;
                    var temp = Object.keys(parsed).map((key) => {
                        tempArr[key].sort((a,b) => {
                            return new Date(a.date).getTime() - new Date(b.date).getTime();
                        })
                    });
                    this.setState({"items": tempArr});
                    let currDate = moment().format("YYYY-MM-DD");
                    this.setState({"selected": {[currDate]: tempArr[currDate]}});
                } else {
                    this.setState({"items": {}});
                }
            }).done();
        } catch (error) {
            alert(error);
        }
    }

    renderDailyAgenda() {
        return (
            <Container>
                <Card transparent>
                    <CardItem>
                        <Left />
                        <Button
                            primary
                            onPress={() => {this.props.navigation.navigate("AddAgenda")}}
                        >
                            <Text>Add an item to your agenda</Text>    
                        </Button>
                        <Right/>
                    </CardItem>
                </Card>
                
                <Agenda
                items={this.state.selected}
                onDayPress={this.updateSelected.bind(this)}
                markedDates={this.getMarkedDates()}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={moment().format("YYYY-MM-DD")}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                renderEmptyData={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                onRefresh={() => {
                    this.loadData();
                }}
                refreshControl={null}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#666'},
                //    '2017-05-09': {textColor: '#666'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                    // monthFormat={'yyyy'}
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                />
                <View style={{height: 70,backgroundColor: '#F4F4F4'}}></View>
                {/* Ads */}
                <AdMobBanner
                style={styles.bottomBanner}
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-7973916379677731/6870247021" // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={(err) => {console.log(err)}}/>
            </Container>
        );
    }

    render() {
        return (
            <Container>
                <NavigationEvents
                    onDidFocus={payload => this.loadData()}
                />
                {this.renderDailyAgenda()}
            </Container>
        );
    }

    getMarkedDates = () => {
        let markedDates = {};
        Object.keys(this.state.items).map(date => {
            markedDates[date] = {
                marked: true,
            }
        })

        return {
            ...markedDates
        };
    }

    updateSelected(date) {
        //console.log(date);
        const newDate = date.dateString;
        const dates = this.state.items[newDate];
        
        //console.log(this.state.items);
        //console.log({[newDate]: dates});

        this.setState({
            selected: {
                [newDate]: dates
            }
        })
    }

    loadItems(day) {
        /* console.log(this.state.items); */
    }

    editItem(item) {
        /* console.log("Editing now");
        console.log(item); */
        this.props.navigation.navigate("EditAgenda", {item: item});
    }

    deleteItem(item) {

        // first swipe back
        if(this.$swipe) {
            console.log("here");
            this.$swipe.recenter();
        }

        let index = 0;
        let date = moment(item.date).format("YYYY-MM-DD");
        let parsed = this.state.items;
        for(let i = 0; i < parsed[date].length; i++) {
            if(parsed[date][i].date == item.date && parsed[date][i].text == item.text) {
                index = i;
                break;
            }
        }

        parsed[date].splice(index, 1);
        this.setState({items: parsed});
        AsyncStorage.setItem("agenda", JSON.stringify(parsed));
    }

    setSwipeRef(ref, item) {
        let temp = this.state.swipeables;
        temp[item] = ref;
        this.setState({swipeables: temp});
    }

    renderItem(item) {
        if(!item.add) {
            return (
                /* <Swipeable onRef={ref=> {
                    this.setSwipeRef(ref, item);
                }} rightButtons={[
                    <TouchableOpacity onPress={() => {
                        this.state.swipeables[item].recenter();
                        this.editItem(item);
                    }} style={styles.swipeRightButton}>
                        <Icon
                            name="edit"
                            type="MaterialIcons"
                            style={{fontSize: 24, color: "blue"}}
                        />
                    </TouchableOpacity>,
                    <TouchableOpacity onPress={() => {
                        this.state.swipeables[item].recenter();
                        this.deleteItem(item)
                    }} style={styles.swipeRightButton}>
                        <Icon
                            name="close"
                            type="MaterialIcons"
                            style={{fontSize: 24, color: "red"}}
                        />
                    </TouchableOpacity>
                ]}> */
                    <Card>
                        <CardItem header bordered button onPress={() => {
                            this.editItem(item);
                        }}>
                            <Body>
                                <Text style={[styles.cardHeader, {color: "#3FB0B9", fontSize: 14}]}>{moment(item.date).format("h:mm a")}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => {this.editItem(item)}}>
                                    <Icon name="info-outline" type="MaterialIcons" style={{fontSize: 20, color: "#3FB0B9"}} />
                                </TouchableOpacity>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>{item.text}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                //</Swipeable>
            );
        } else {
            return (
                <Button
                    transparent
                    onPress={() => {this.props.navigation.navigate("AddAgenda")}}
                >
                    <Text>Add an item to your agenda</Text>    
                </Button>
            );
        }
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                {/*<Button
                    transparent
                    onPress={() => {this.props.navigation.navigate("AddAgenda")}}
                    >*/}
                    <Text>You don't have anything on this date</Text>    
                {/*</Button>*/}
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1 !== r2;
    }

    dateToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    timeToString(time) {
        const date = new Date(time);
        const timeString = date.toLocaleTimeString();
        const timeFormat = timeString.substr(0, timeString.lastIndexOf(":"));
        const ampm = timeString.split(" ")[1];
        return timeFormat + " " + ampm;
    }

}