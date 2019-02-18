import React from 'react';
import { Easing, AsyncStorage, TouchableOpacity, StyleSheet, View, Image, TextInput, Animated } from 'react-native';
import styles from '../../Styles';
import { Input, Container, Title, Content, Icon, Button, Card, CardItem, Text, Body, Left, Right, IconNB, Footer, Item, Label } from "native-base";
import CheckBox from './../util/CheckBox';
import LottieView from 'lottie-react-native';
import {AdMobBanner} from 'expo';
                              
export default class Goals extends React.Component {
	static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Goals',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      goals: new Array(5).fill(null),
      goalFinalized: new Array(5).fill(null),
      goalActivated: new Array(5).fill(null),
      actionSteps: [],
      actionFinalized: [],
      // Animations
      animating: false,
      animateValue: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.getGoals();
    this.updateActionSteps();
  }

  // handle goals
  handleGoal(text, i) {
    let editGoals = this.state.goals;
    editGoals[i] = text;
    this.setState({goals: editGoals});
  }

  goalSubmit = async () => {
    /* let editSavedGoals = [this.state.savedGoals];
    editSavedGoals[i] = this.state.currGoals[i];
    this.setState({savedGoals: editSavedGoals});
    let jsonString = JSON.stringify(editSavedGoals);
    AsyncStorage.setItem('goals', jsonString);
    this.getGoals(); */
    if(this.state.goals[this.state.goals.length-1] != null) {
      let temp = this.state.goals;
      temp[this.state.goals.length] = null;
      console.log(temp);
      this.setState({goals: temp});
      AsyncStorage.setItem("goals", JSON.stringify(this.state.goals));
      // check if it's the last goal, then add another one that's null
      this.finalizeGoals();
    } else {
      AsyncStorage.setItem("goals", JSON.stringify(this.state.goals));
      // check if it's the last goal, then add another one that's null
      this.finalizeGoals();
    }
  }

  finalizeGoals = async () => {
    for(let i = 0; i < this.state.goals.length; i++) {
      let temp = this.state.goalFinalized;
      if(this.state.goals[i] != null && this.state.goals[i] != undefined) {
        temp[i] = true;
      } else {
        temp[i] = false;
      }
      this.setState({"goalFinalized": temp});
    }
  }

  getGoals = async () => {
    try {
      let goalList = await AsyncStorage.getItem('goals').then((value) => {
        let parsed = JSON.parse(value);
        if(parsed != null) {
          this.setState({"goals": parsed});
        } else {
          this.setState({"goals": new Array(5).fill(null)});
        }
        //alert(parsed);
      }).then(() => {
        this.finalizeGoals();
        
      }).done();
      // now we get the goals that are activated
      await AsyncStorage.getItem("goalActivated").then((value) => {
        let parsed = JSON.parse(value);
        if(parsed != null) {
          this.setState({"goalActivated": parsed});
        } else {
          this.setState({"goalActivated": new Array(5).fill(null)});
        }
      }).done();
    } catch (error) {
      alert(error);
    }
  }

  actionStep(text, i) {
    let temp = this.state.actionSteps;
    temp[i] = text;
    this.setState({actionSteps: temp});

  }

  submitActionSteps = async () => {
    AsyncStorage.setItem('actionSteps', JSON.stringify(this.state.actionSteps));
    this.finalizeActions();
  }

  finalizeActions() {
    for(let i = 0; i < 3; i++) {
      let temp = this.state.actionFinalized;
      if(this.state.actionSteps[i] != null && this.state.actionSteps[i] != undefined) {
        temp[i] = true;
      } else {
        temp[i] = false;
      }
      this.setState({"actionFinalized": temp});
    }
  }

  updateActionSteps = async() => {
    try {
      let astep = await AsyncStorage.getItem('actionSteps').then((value) => {
        let parsed = JSON.parse(value);
        if(parsed != null) {
          this.setState({"actionSteps": JSON.parse(value)});
        } else {
          this.setState({"actionSteps": []});
        }
        //alert(parsed);
      }).then(() => {
        this.finalizeActions();
      }). done();
    } catch (error) {
      alert(error);
    }
  }

  // editing and removing and clearing
  editGoal(i) {
    let temp = this.state.goalFinalized;
    temp[i] = false;
    this.setState({"goalFinalized": temp});
  }

  editAction(i) {
    let temp = this.state.actionFinalized;
    temp[i] = false;
    this.setState({"actionFinalized": temp});
  }

  removeGoal(i) {
    let temp = this.state.goals;
    let temp1 = this.state.goalActivated;
    temp[i] = null;
    temp1[i] = false;
    AsyncStorage.setItem('goals', JSON.stringify(temp));
    AsyncStorage.setItem('goalActivated', JSON.stringify(temp1));
    this.setState({"goals": temp});
    this.setState({"goalActivated": temp1});
    this.finalizeGoals();
  }

  removeAction(i) {
    let temp = this.state.actionSteps;
    temp[i] = null;
    AsyncStorage.setItem('actionSteps', JSON.stringify(temp));
    this.setState({"actionSteps": temp});
    this.finalizeActions();
  }

  clearGoals = () => {
    this.setState({"goals": new Array(5).fill(null)});
    this.setState({"goalFinalized": new Array(5).fill(null)});
    AsyncStorage.removeItem("goals");
  }

  clearActions() {
    this.setState({"actionSteps": []});
    this.setState({"actionFinalized": []});
    AsyncStorage.setItem("actionSteps", "");
  }

  // when activating a goal
  activateGoal = async (i) => {
    let temp = this.state.goalActivated;
    if(temp[i] == true) {
      temp[i] = false;
    } else {
      temp[i] = true;
      await this.setState({animating: true}, () => {
        // Animation
        Animated.timing(
          this.state.animateValue,
          {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
          }
        ).start(({ finished }) => {
          if(finished) {
            this.setState({animating: false});
            this.setState({animateValue: new Animated.Value(0)});
          }
        });
      });

    }
    this.setState({goalActivated: temp});
    AsyncStorage.setItem("goalActivated", JSON.stringify(temp));
  }

  render() {
    var goalFields = [];
    //this.getGoals();

    for(let i = 0; i < this.state.goals.length; i++) {
      if(this.state.goalFinalized == null || this.state.goalFinalized[i] == false || this.state.goalFinalized[i] == undefined) {
        // set a textbox if there isn't a goal here
        goalFields.push(
          <Item key={i} floatingLabel style={styles.goalTextBox}>
            <Label>{"Goal " + (i+1).toString()}</Label>
            <Input
              /*placeholder = {"Goal " + (i+1).toString()}
              placeholderTextColor = "#88B8C3"*/
              value={this.state.goals[i]}
              onChangeText = {(text) => this.handleGoal(text, i)}
              onSubmitEditing = {this.goalSubmit}
            />
          </Item>
        );
      } else {
        goalFields.push(
          <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
            <CheckBox key={i} checked={this.state.goalActivated[i]} style={{color: "#3FB0B9"}} clicked={() => {
              this.activateGoal(i);
            }} />
            <Text style={[styles.goalText, {marginLeft: 10, color: this.state.goalActivated[i] == null || !this.state.goalActivated[i] ? "black" : "green"}]}>
              {/*i+1. */}{this.state.goals[i]}
            </Text>
            <Button
              transparent
              small
              style={{marginLeft: 'auto'}}
              onPress={() => {this.editGoal(i)}}
            >
              {this.state.goalActivated[i] == null || !this.state.goalActivated[i] ? <Icon name='md-create' style={{color: "#3FB0B9", fontSize: 20}} /> : null}
            </Button>
            <Button
              transparent
              small
              style={{marginLeft: 0}}
              onPress={() => {this.removeGoal(i)}}
            >
              <Icon name='md-close' style={{color: "#AA0000", fontSize: 20}} />
            </Button>
          </View>
        )
      }
    }

    // action step
    var aStep = [];

    for(let i = 0; i < 3; i++) {
      if(this.state.actionFinalized == null || this.state.actionFinalized[i] == false || this.state.actionFinalized[i] == undefined) {
        aStep.push(
          <Item key={i} floatingLabel style={styles.goalTextBox}>
            <Label>{"Action Step " + (i+1).toString()}</Label>
            <Input
              /*placeholder = "Action Step"
              placeholderTextColor = "#90CCF4"*/
              value={this.state.actionSteps[i]}
              onChangeText = {(text) => this.actionStep(text, i)}
              onSubmitEditing = {() => {this.submitActionSteps()}}
            />
          </Item>
        );
      } else {
        aStep.push(
          <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
            <Text style={styles.goalText}>{i+1}. {this.state.actionSteps[i]}</Text>
            <Button
              transparent
              small
              style={{marginLeft: 'auto'}}
              onPress={() => {this.editAction(i)}}
            >
              <Icon name='md-create' style={{color: "#3FB0B9", fontSize: 20}} />
            </Button>
            <Button
              transparent
              small
              style={{marginLeft: 0}}
              onPress={() => {this.removeAction(i)}}
            >
              <Icon name='md-close' style={{color: "#AA0000", fontSize: 20}} />
            </Button>
          </View>
        );
      }
    }

    var AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

    return (
      <Container>
        { this.state.animating ?
          <AnimatedLottieView 
            progress={this.state.animateValue}
            source={require("../../assets/animations/fireworks.json")}
            /*ref={animation => {
              this.animation = animation;
            }}*/
            loop = {false}
            style={{
              position: "absolute",
              zIndex: 1,
            }}
          /> : null
        }
        <Content>
          <Text style={[styles.textHeader, {marginTop: 20, marginBottom: 5,marginLeft: 15}]}>
            Goals
          </Text>
          {goalFields}
          <View style={styles.goalButtons}>
            <Button
              rounded
              style={styles.goalButton}
              onPress={() => {
                this.goalSubmit();
              }}
              
            >
              <Text>Save</Text>
            </Button>
            <Button
              rounded
              style={styles.goalButton}
              onPress={() => {
                this.clearGoals();
              }}
            >
              <Text>Clear Goals</Text>
            </Button>
          </View>

          <Text style={[styles.textHeader, {marginBottom: 5, marginLeft: 15}]}>
            Action Steps
          </Text>
          
          {aStep}
          <View style={styles.goalButtons}>
            <Button
              rounded
              style={styles.goalButton}
              onPress={() => {
                this.submitActionSteps();
              }}
            >
              <Text>Save</Text>
            </Button>
            <Button
              rounded
              style={styles.goalButton}
              onPress={() => {
                this.clearActions();
              }}
            >
              <Text>Clear Action Steps</Text>
            </Button>
          </View>
          <View style={{height: 50,}}></View>
        </Content>
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
}