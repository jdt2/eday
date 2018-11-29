import React from 'React';
import { Easing, AsyncStorage, TouchableOpacity, StyleSheet, View, Image, TextInput, Animated, ImageBackground } from 'react-native';
import styles from '../../Styles';
import { Input, Container, Title, Content, Icon, Button, Card, Text, CardItem, Body, Left, Right, IconNB, Footer, Item, Label, ScrollableTab, Tabs, Tab } from "native-base";
import moment from 'moment';

export default class Summary extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Daily Summary',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            goals: [],
            goalActivated: [],
            actionSteps: [],
            learning: [],
            thoughts: [],
            agenda: {},
            actions: [],
            actionsActivated: [],
            mindset: [],
        }

    }

    componentDidMount() {
        this.getGoals();
        this.getActionSteps();
        this.getLearning();
        this.getThoughts();
        this.getAgenda();
        this.getActions();
        this.getMindset();
    }

    getGoals = async () => {
        try {
            await AsyncStorage.getItem("goals").then((value) => {
                let parsed = JSON.parse(value);
                console.log(parsed);
                if(parsed != null) {
                    this.setState({goals: parsed});
                } else {
                    this.setState({goals: []});
                }
            }).done();

            await AsyncStorage.getItem("goalActivated").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                  this.setState({"goalActivated": parsed});
                } else {
                  this.setState({"goalActivated": new Array(5).fill(null)});
                }
            }).done();
        } catch(error) {
            alert(error);
        }
    }

    getActionSteps = async () => {
        try {
            await AsyncStorage.getItem("actionSteps").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({actionSteps: parsed});
                } else {
                    this.setState({actionSteps: []});
                }
            })
        } catch(error) {
            alert(error);
        }
    }

    getLearning = async () => {
        try {
            await AsyncStorage.getItem("notes").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({learning: parsed});
                } else {
                    this.setState({learning: []});
                }
            })
        } catch(error) {
            alert(error);
        }
    }

    getThoughts = async () => {
        try {
            await AsyncStorage.getItem("thoughts").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({thoughts: parsed});
                } else {
                    this.setState({thoughts: []});
                }
            })
        } catch(error) {
            alert(error);
        }
    }

    getMindset = async () => {
        try {
            await AsyncStorage.getItem("mindset").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({mindset: parsed});
                } else {
                    this.setState({mindset: []});
                }
            })
        } catch(error) {
            alert(error);
        }
    }

    getAgenda = async () => {
        try {
            await AsyncStorage.getItem("agenda").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({agenda: parsed});
                } else {
                    this.setState({agenda: []});
                }
            })
        } catch(error) {
            alert(error);
        }
    }

    getActions = async () => {
        try {
            await AsyncStorage.getItem("todo").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({actions: parsed});
                } else {
                    this.setState({actions: []});
                }
            })

            await AsyncStorage.getItem("todoActivated").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({actionsActivated: parsed});
                } else {
                    this.setState({actionsActivated: []});
                }
            })
        } catch(error) {
            alert(error);
        }
    }

    render() {

        // Goals
        let goalNotCompletedList = [];
        let goalCompleted = [];
        for (let i = 0; i < this.state.goals.length; i++) {
            if(this.state.goals[i]) {
                if(!this.state.goalActivated[i]) {
                    goalNotCompletedList.push(
                        <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                            <Text style={[styles.goalText, {marginLeft: 10, color: this.state.goalActivated[i] == null || !this.state.goalActivated[i] ? "black" : "green"}]}>
                            {i+1}. {this.state.goals[i]}
                            </Text>
                        </View>
                    );
                } else {
                    goalCompleted.push(
                        <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                            <Text style={[styles.goalText, {marginLeft: 10, color: this.state.goalActivated[i] == null || !this.state.goalActivated[i] ? "black" : "green"}]}>
                            {i+1}. {this.state.goals[i]}
                            </Text>
                        </View>
                    )
                }
            }
        }

        // Action Steps
        actionStepList = [];
        for (let i = 0; i < this.state.actionSteps.length; i++) {
            if(this.state.actionSteps[i]) {
                actionStepList.push(
                    <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                        <Text style={styles.goalText}>{i+1}. {this.state.actionSteps[i]}</Text>
                    </View>
                );
            }
        }

        // Daily Agenda
        agendaList = [];
        Object.keys(this.state.agenda).forEach(key => {
            let item = this.state.agenda[key];
            for(let i = 0; i < item.length; i++) {
                if(item[i] && !item[i].add) {
                    agendaList.push(
                        <View style={[styles.item]}>
                            <Text>
                                {moment(item[i].date).format("YYYY-MM-DD h:mm a")}: {item[i].text}
                            </Text>
                        </View>
                    );
                }
            }
        });

        actionNotCompletedList = [];
        actionCompleted = [];
        for(let i = 0; i < this.state.actions.length; i++) {
            if(this.state.actions[i]) {
                if(!this.state.actionsActivated[i]) {
                    actionNotCompletedList.push(
                        <View style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                            <Text style={[styles.todoTextBox]}>
                                {this.state.actions[i]}
                            </Text>
                        </View>
                    );
                } else {
                    actionCompleted.push(
                        <View style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                            <Text style={[styles.todoTextBox]}>
                                {this.state.actions[i]}
                            </Text>
                        </View>
                    )
                }
            }
        }

        // Learning
        learningList = [];
        for (let i = 0; i < this.state.learning.length; i++) {
            if(this.state.learning[i]) {
                learningList.push(
                    <View style={styles.note}>
                        <Text style={styles.noteTitle}>{this.state.learning[i][0]}</Text>
                        <Text style={styles.noteText} numberOfLines={1}>{this.state.learning[i][1]}</Text>
                    </View>
                );
            }
        }

        // Thinking
        thoughtList = [];
        for (let i = 0; i < this.state.thoughts.length; i++) {
            if(this.state.thoughts[i]) {
                thoughtList.push(
                    <View style={styles.thought}>
                        <ImageBackground source={require('../../assets/bubble.png')} style={{width: 310, height: 170}}>
                            <Text style={styles.thoughtText} numberOfLines={1}>{this.state.thoughts[i]}</Text>
                        </ImageBackground>
                    </View>
                );
            }
        }

        // Mindset
        mindsetList = [];
        for (let i = 0; i < this.state.mindset.length; i++) {
            if(this.state.mindset[i]) {
                mindsetList.push(
                    <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                        <Text style={styles.goalText}>
                            I am {this.state.mindset[i]}
                        </Text>
                    </View>
                );
            }
        }

        // add placeholder if it's empty
        if(goalNotCompletedList.length == 0) {
            goalNotCompletedList = [(
                <View style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                    <Text style={[styles.goalText, {marginLeft: 10}]}>
                        No Goals Not Completed!
                    </Text>
                </View>
            )]
        }
        
        if(goalCompleted.length == 0) {
            goalCompleted = [(
                <View style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                    <Text style={[styles.goalText, {marginLeft: 10}]}>
                        No Goals Completed!
                    </Text>
                </View>
            )]
        }
        
        // Agenda
        if(agendaList.length == 0) {
            agendaList = [(
                <View style={[styles.item]}>
                    <Text>
                        Nothing in your agenda!
                    </Text>
                </View>
            )];
        }

        // Daily Actions
        if(actionCompleted.length == 0) {
            actionCompleted = [(
                <View style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                    <Text style={[styles.todoTextBox]}>
                        No Completed Actions!
                    </Text>
                </View>
            )];
        }

        if(actionNotCompletedList.length == 0) {
            actionNotCompletedList = [(
                <View style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                    <Text style={[styles.todoTextBox]}>
                        No Uncompleted Actions!
                    </Text>
                </View>
            )];
        }

        // Action Steps
        if(actionStepList.length == 0) {
            actionStepList = [(
                <View style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                    <Text style={styles.goalText}>No Action Steps!</Text>
                </View>
            )];
        }

        // Learning
        if(learningList.length == 0) {
            learningList = [(
                <View style={styles.note}>
                    <Text style={styles.noteTitle}>Nothing in Learning!</Text>
                </View>
            )];
        }

        // Thinking
        if(thoughtList.length == 0) {
            thoughtList = [(
                <View style={styles.thought}>
                    <Text style={styles.thoughtText} numberOfLines={1}>Nothing in Thinking!</Text>
                </View>
            )];
        }

        // Mindset
        if(mindsetList.length == 0) {
            mindsetList = [(
                <View style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                    <Text style={styles.goalText}>
                        Nothing in Mindset!
                    </Text>
                </View>
            )];
        }

        return (
            <Container>
                <Tabs locked
                    initialPage={0}
                    tabBarUnderlineStyle={{backgroundColor: "#3FB0B9"}}
                    renderTabBar={() => <ScrollableTab />}
                >
                    <Tab heading="Goals" activeTextStyle={{color: "#3FB0B9"}}>
                        {/* Goals */}
                        <Text>Completed</Text>
                        {goalCompleted}
                        <Text>Not Completed</Text>
                        {goalNotCompletedList}
                        <Text>Action Steps</Text>
                        {actionStepList}
                    </Tab>
                    <Tab heading="Daily Agenda" activeTextStyle={{color: "#3FB0B9"}}>
                        {agendaList}
                    </Tab>
                    <Tab heading="Daily Learning List" activeTextStyle={{color: "#3FB0B9"}}>
                        <Text>Completed</Text>
                        {actionCompleted}
                        <Text>Not Completed</Text>
                        {actionNotCompletedList}
                    </Tab>
                    <Tab heading="Learning" activeTextStyle={{color: "#3FB0B9"}}>
                        {learningList}
                    </Tab>
                    <Tab heading="Thinking" activeTextStyle={{color: "#3FB0B9"}}>
                        {thoughtList}
                    </Tab>
                    <Tab heading="Mindset" activeTextStyle={{color: "#3FB0B9"}}>
                        {mindsetList}
                    </Tab>
                </Tabs>
            </Container>
        );
    }

}