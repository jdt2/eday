import React from 'react';
import { AsyncStorage, Image, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Animated, AlertIOS, FlatList, Platform, Keyboard } from 'react-native';
import { Input, Container, Header, Title, Content, Button, Card, CardItem, Text, Body, Left, Right, Icon, Footer, Tabs, Tab, List, ListItem, CheckBox } from "native-base";
import styles from '../../Styles';
/* import CheckBox from './../util/CheckBox'; */
import { Agenda } from 'react-native-calendars';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';

export default class DailyAction extends React.Component {

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

            await AsyncStorage.getItem("agenda").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({"items": parsed});
                } else {
                    this.setState({"items": {}});
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
                            autoFocus={true}
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
          <Container>
            
            <Content>
              <List>
                {listItems}
              </List>
            </Content>
            {/* <Footer style={styles.todoFooter}>
              
            </Footer> */}
          </Container>
        );
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
                <Tabs locked
                    initialPage={0}
                    tabBarUnderlineStyle={{backgroundColor: "#3FB0B9"}}
                    onChangeTab={(i, ref) => {
                        Keyboard.dismiss();
                    }}
                >
                    <Tab heading="Daily Agenda" activeTextStyle={{color: "#3FB0B9"}}>
                        {this.renderDailyAgenda()}
                    </Tab>
                    <Tab heading="Daily Actions" activeTextStyle={{color: "#3FB0B9"}}>
                        {this.renderDailyActions()}
                    </Tab>
                </Tabs>
            </Container>
        );
    }

    loadItems(day) {
        console.log(this.state.items);
        /*setTimeout(() => {
            /* console.log(this.state.items);
            const time = day.timestamp;
            const strTime = this.dateToString(time);
            /* console.log(actualTime);
            /* if (!this.state.items[strTime]) {
                this.state.items[strTime] = [{
                    add: true,
                }];
            } /* else if(this.state.items[strTime][this.state.items[strTime].length - 1] !== {add: true}) {
                console.log(this.state.items[strTime]);
                this.state.items[strTime].push({add: true});
            }
            //console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
                newItems[key].sort(function(a,b) {
                    return new Date(a.date) - new Date(b.date);
                })
                /* newItems[key].reverse();
                /* console.log(newItems[key]);
            });
            /* console.log(newItems);
            this.setState({
                items: newItems
            });
        }, 1000);*/
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
        return (
            <View style={[styles.item]}>
                {!item.add ? 
                <Text>
                    {moment(item.date).format("h:mm a")}: {item.text}
                </Text> :
                <Button
                    transparent
                    onPress={() => {this.props.navigation.navigate("AddAgenda")}}
                >
                    <Text>Add an item to your agenda</Text>    
                </Button>
                }
            </View>
        );
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