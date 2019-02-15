import React from 'React';
import { Share, ScrollView, Easing, AsyncStorage, TouchableOpacity, StyleSheet, View, Image, TextInput, Animated, ImageBackground, AlertIOS } from 'react-native';
import styles from '../../Styles';
import { Input, Container, Title, Content, Icon, Button, Card, Text, CardItem, Body, Left, Right, IconNB, Footer, Item, Label, ScrollableTab, Tabs, Tab } from "native-base";
import moment from 'moment';

export default class Summary extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Daily Summary',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => params.handleAction()}
                >
                <Icon
                    name="share"
                    type="MaterialCommunityIcons"
                    style={{fontSize: 24,color: "white",}}
                />
                </TouchableOpacity>
            ),
        }; 
    };

    constructor(props) {
        super(props);

        this.state = {
            saved: false,
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

        this.getSaved();

    }

    componentDidMount() {
        this.getSaved();

        this.props.navigation.setParams({handleAction: this.onShare});
    }

    onShare = async () => {
        try {
            let shareString = "";
            // goals
            let notFirst = false;
            if(this.state.goals.length > 0) {
                shareString += "Your Goals:";
                for(let i = 0; i < this.state.goals.length; i++) {
                    if(this.state.goals[i])
                        shareString += " " + this.state.goals[i] + ",";
                }
                notFirst = true;
            }
            if(this.state.actionSteps.length > 0) {
                if(notFirst) {
                    shareString += "\n";
                } else notFirst = false;
                shareString += "Your Action Steps:";
                for(let i = 0; i < this.state.actionSteps.length; i++) {
                    if(this.state.actionSteps[i])
                        shareString += " " + this.state.actionSteps[i] + ",";
                }
            }
            const result = await Share.share({
                title: 'My Eday Summary',
                message: shareString,
            })
    
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error);
        }
    }

    getSaved = async() => {
        try {
            await AsyncStorage.getItem("summary").then((value) => {
                let parsed = JSON.parse(value);
                /* console.log("Parsed:");
                console.log(parsed); */
                if(parsed != null) {
                    this.setState(parsed, () => {
                        if(!this.state.saved) {
                            this.getGoals();
                            this.getActionSteps();
                            this.getLearning();
                            this.getThoughts();
                            this.getAgenda();
                            this.getActions();
                            this.getMindset();
                        }
                    });
                } else {
                    this.getGoals();
                    this.getActionSteps();
                    this.getLearning();
                    this.getThoughts();
                    this.getAgenda();
                    this.getActions();
                    this.getMindset();

                }
            }).done();
        } catch(error) {
            alert(error);
        }
    }

    getGoals = async () => {
        try {
            await AsyncStorage.getItem("goals").then((value) => {
                let parsed = JSON.parse(value);
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
            await AsyncStorage.getItem("thinking").then((value) => {
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

    save() {
        let temp = this.state;
        temp.saved = true;
        /* console.log(temp); */
        AsyncStorage.setItem('summary', JSON.stringify(temp));
        AlertIOS.alert("Saving Daily Summary", "Saved!");
    }

    render() {

        // Goals
        let goalNotCompletedList = [];
        let goalCompleted = [];
        for (let i = 0; i < this.state.goals.length; i++) {
            if(this.state.goals[i]) {
                if(!this.state.goalActivated[i]) {
                    goalNotCompletedList.push(
                        <CardItem key={i}>
                            <Body /*style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}*/>
                                <Text style={[styles.goalText, {marginLeft: 10, color: this.state.goalActivated[i] == null || !this.state.goalActivated[i] ? "black" : "green"}]}>
                                {i+1}. {this.state.goals[i]}
                                </Text>
                            </Body>
                        </CardItem>
                    );
                } else {
                    goalCompleted.push(
                        <CardItem key={i}>
                            <Body /*style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}*/>
                                <Text style={[styles.goalText, {marginLeft: 10, color: this.state.goalActivated[i] == null || !this.state.goalActivated[i] ? "black" : "green"}]}>
                                {i+1}. {this.state.goals[i]}
                                </Text>
                            </Body>
                        </CardItem>
                    )
                }
            }
        }

        // Action Steps
        actionStepList = [];
        for (let i = 0; i < this.state.actionSteps.length; i++) {
            if(this.state.actionSteps[i]) {
                actionStepList.push(
                    <CardItem key={i}>
                        <Body /*style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}*/>
                            <Text style={styles.goalText}>
                            {i+1}. {this.state.actionSteps[i]}
                            </Text>
                        </Body>
                    </CardItem>
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
                        <Card key={i} /*style={[styles.item]}*/>
                            <CardItem header>
                                <Text>
                                    {moment(item[i].date).format("YYYY-MM-DD h:mm a")}:
                                </Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>{item[i].text}</Text>
                                </Body>
                            </CardItem>
                        </Card>
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
                        <CardItem key={i}>
                            <Body /*style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}*/>
                                <Text style={[styles.todoTextBox]}>
                                    {this.state.actions[i]}
                                </Text>
                            </Body>
                        </CardItem>
                    );
                } else {
                    actionCompleted.push(
                        <CardItem key={i}>
                            <Body /*style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}*/>
                                <Text style={[styles.todoTextBox, {color: "green"}]}>
                                    {this.state.actions[i]}
                                </Text>
                            </Body>
                        </CardItem>
                    )
                }
            }
        }

        // Learning
        learningList = [];
        for (let i = 0; i < this.state.learning.length; i++) {
            if(this.state.learning[i]) {
                /* console.log(this.state.learning[i]); */
                learningList.push(
                    <Card key={i} /*style={[styles.item]}*/>
                        <CardItem header>
                            <Text>
                                {this.state.learning[i].title}
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>{this.state.learning[i].text}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                );
            }
        }

        // Thinking
        thoughtList = [];
        for (let i = 0; i < this.state.thoughts.length; i++) {
            if(this.state.thoughts[i]) {
                thoughtList.push(
                    
                    <Card key={i} /*style={[styles.item]}*/>
                        <CardItem header>
                            <Text>
                                {this.state.thoughts[i].title}
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>{this.state.thoughts[i].text}</Text>
                            </Body>
                        </CardItem>
                        {/* <View style={styles.thought}>
                        <ImageBackground source={require('../../assets/bubble.png')} style={{width: 310, height: 170}}>
                            <Text style={styles.thoughtText} numberOfLines={1}>{this.state.thoughts[i]}</Text>
                        </ImageBackground>
                    </View> */}
                    </Card>
                    
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
                <CardItem key={0}>
                    <Body /*style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}*/>
                        <Text style={[styles.goalText, {marginLeft: 10, color: "black"}]}>
                            No Goals Not Completed!
                        </Text>
                    </Body>
                </CardItem>
            )]
        }
        
        if(goalCompleted.length == 0) {
            goalCompleted = [(
                <CardItem key={0}>
                    <Body /*style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}*/>
                        <Text style={[styles.goalText, {marginLeft: 10, color: "black"}]}>
                            No Goals Completed!
                        </Text>
                    </Body>
                </CardItem>
            )]
        }
        
        // Agenda
        if(agendaList.length == 0) {
            agendaList = [(
                <Card key={0} /*style={[styles.item]}*/>
                    <CardItem header>
                        <Text>
                            Nothing in the Daily Agenda!
                        </Text>
                    </CardItem>
                </Card>
            )];
        }

        // Daily Actions
        if(actionCompleted.length == 0) {
            actionCompleted = [(
                <CardItem key={0}>
                    <Body /*style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}*/>
                        <Text style={[styles.todoTextBox]}>
                            No Completed Actions!
                        </Text>
                    </Body>
                </CardItem>
            )];
        }

        if(actionNotCompletedList.length == 0) {
            actionNotCompletedList = [(
                <CardItem key={0}>
                    <Body /*style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}*/>
                        <Text style={[styles.todoTextBox]}>
                            No Actions Not Completed!
                        </Text>
                    </Body>
                </CardItem>
            )];
        }

        // Action Steps
        if(actionStepList.length == 0) {
            actionStepList = [(
                <CardItem key={0}>
                    <Body /*style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}*/>
                        <Text style={styles.goalText}>
                            No Action Steps!
                        </Text>
                    </Body>
                </CardItem>
            )];
        }

        // Learning
        if(learningList.length == 0) {
            learningList = [(
                <Card key={0} /*style={[styles.item]}*/>
                    <CardItem header>
                        <Text>
                            Nothing in Learning!
                        </Text>
                    </CardItem>
                </Card>
            )];
        }

        // Thinking
        if(thoughtList.length == 0) {
            thoughtList = [(
                <View key={0} style={styles.thought}>
                    <Text style={styles.thoughtText} numberOfLines={1}>Nothing in Thinking!</Text>
                </View>
            )];
        }

        // Mindset
        if(mindsetList.length == 0) {
            mindsetList = [(
                <View key={0} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                    <Text style={styles.goalText}>
                        Nothing in Mindset!
                    </Text>
                </View>
            )];
        }

        return (
            <Container>
                <Button
                    style={{alignSelf: 'center', marginTop: 10, marginBottom: 10,}}
                    onPress={() => {
                        this.save();
                    }}
                >
                    <Text>Save Summary</Text>
                </Button>
                <Button
                    style={{alignSelf: 'center', marginTop: 10, marginBottom: 10,}}
                    onPress={() => {
                        AsyncStorage.removeItem("summary");
                    }}
                >
                    <Text>Remove Saved Summary</Text>
                </Button>
                {/* <Button
                    style={{alignSelf: 'center', marginTop: 10, marginBottom: 10,}}
                    onPress={() => {
                        console.log(this.state);
                    }}
                >
                    <Text>Get State</Text>
                </Button> */}
                {/* <Button
                    style={{alignSelf: 'center', marginTop: 10, marginBottom: 10,}}
                    onPress={() => {
                        AsyncStorage.clear();
                    }}
                >
                    <Text>DEBUG ONLY</Text>
                </Button> */}
                <Tabs locked
                    initialPage={0}
                    tabBarUnderlineStyle={{backgroundColor: "#3FB0B9"}}
                    renderTabBar={() => <ScrollableTab />}
                >
                    <Tab heading="Goals" activeTextStyle={{color: "#3FB0B9"}}>
                        <ScrollView>
                            {/* Goals */}
                            <Card>
                                <CardItem header>
                                    <Text style={{color: "green"}}>Completed</Text>
                                </CardItem>
                                {goalCompleted}
                            </Card>
                            <Card>
                                <CardItem header>
                                    <Text>Not Completed</Text>
                                </CardItem>
                                {goalNotCompletedList}
                            </Card>
                            <Card>
                                <CardItem header>
                                    <Text>Action Steps</Text>
                                </CardItem>
                                {actionStepList}
                            </Card>
                        </ScrollView>
                    </Tab>
                    <Tab heading="Daily Agenda" activeTextStyle={{color: "#3FB0B9"}}>
                        <ScrollView>
                            {agendaList}
                        </ScrollView>
                    </Tab>
                    <Tab heading="Schedule" activeTextStyle={{color: "#3FB0B9"}}>
                        <ScrollView>
                            <Card>
                                <CardItem header>
                                    <Text style={{color: "green"}}>Completed</Text>
                                </CardItem>
                                {actionCompleted}
                            </Card>
                            <Card>
                                <CardItem header>
                                    <Text>Not Completed</Text>
                                </CardItem>
                                {actionNotCompletedList}
                            </Card>
                        </ScrollView>
                    </Tab>
                    <Tab heading="Learning" activeTextStyle={{color: "#3FB0B9"}}>
                        <ScrollView>
                            {learningList}
                        </ScrollView>
                    </Tab>
                    <Tab heading="Thinking" activeTextStyle={{color: "#3FB0B9"}}>
                        <ScrollView>
                            {thoughtList}
                        </ScrollView>
                    </Tab>
                    <Tab heading="Mindset" activeTextStyle={{color: "#3FB0B9"}}>
                        <ScrollView>
                            {mindsetList}
                        </ScrollView>
                    </Tab>
                </Tabs>
            </Container>
        );
    }

}