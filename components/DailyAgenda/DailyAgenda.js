import React from 'react';
import { AsyncStorage, Image, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Animated, AlertIOS, FlatList, Platform, Keyboard } from 'react-native';
import { Input, Container, Header, Title, Content, Button, Card, CardItem, Text, Body, Left, Right, Icon, Footer, Tabs, Tab, List, ListItem, CheckBox } from "native-base";
import styles from '../../Styles';
/* import CheckBox from './../util/CheckBox'; */
import { Agenda } from 'react-native-calendars';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';

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
        }
    }

    componentDidMount() {
        this.loadData();
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
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={moment().format("YYYY-MM-DD")}
                renderItem={this.renderItem.bind(this)}
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

    loadItems(day) {
        console.log(this.state.items);
    }

    editItem(item) {
        console.log("Editing now");
        console.log(item);
        this.props.navigation.navigate("EditAgenda", {item: item});
    }

    renderItem(item) {
        if(!item.add) {
            return (
                <Card>
                    <CardItem header bordered button onPress={() => {
                        this.editItem(item);
                    }}>
                        <Text style={{fontSize: 14}}>{moment(item.date).format("h:mm a")}</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{item.text}</Text>
                        </Body>
                    </CardItem>
                </Card>
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
                    <Text>Add an item to your agenda with the button above</Text>    
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