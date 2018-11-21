import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, View, Image, TextInput } from 'react-native';
import styles from '../../Styles';
import { Input, Container, Title, Content, Icon, Button, Card, CardItem, Text, Body, Left, Right, IconNB, Footer, Item, Label, CheckBox } from "native-base";
                              
export default class Goals extends React.Component {
	static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Goals',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      goalFinalized: [],
      goalActivated: [],
      actionSteps: [],
      actionFinalized: []
      
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

  goalSubmit() {
    /* let editSavedGoals = [this.state.savedGoals];
    editSavedGoals[i] = this.state.currGoals[i];
    this.setState({savedGoals: editSavedGoals});
    let jsonString = JSON.stringify(editSavedGoals);
    AsyncStorage.setItem('goals', jsonString);
    this.getGoals(); */
    AsyncStorage.setItem("goals", JSON.stringify(this.state.goals));
    this.finalizeGoals();
  }

  finalizeGoals() {
    for(let i = 0; i < 5; i++) {
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
          this.setState({"goals": []});
        }
        //alert(parsed);
      }).then(() => {
        this.finalizeGoals();
        // now we get the goals that are activated
        /* await AsyncStorage.getItem("goalActivated").then((value) => {
          let parsed = JSON.parse(value);
          if(parsed != null) {
            this.setState({"goalActivated": parsed});
          } else {
            this.setState({"goalActivated": []});
          }
        }); */
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

  submitActionSteps() {
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
    temp[i] = null;
    AsyncStorage.setItem('goals', JSON.stringify(temp));
    this.setState({"goals": temp});
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
    this.setState({"goals": []});
    this.setState({"goalFinalized": []});
    AsyncStorage.setItem("goals", "");
  }

  clearActions() {
    this.setState({"actionSteps": []});
    this.setState({"actionFinalized": []});
    AsyncStorage.setItem("actionSteps", "");
  }

  // when activating a goal
  /* activateGoal(i) {
    let temp = this.state.goalActivated;
    temp[i] = true;
    this.setState({goalActivated: temp});
    AsyncStorage.setItem("goalActivated", JSON.parse(temp));
  } */

  render() {
    var goalFields = [];
    //this.getGoals();

    for(let i = 0; i < 5; i++) {
      if(this.state.goalFinalized == null || this.state.goalFinalized[i] == false || this.state.goalFinalized[i] == undefined) {
        // set a textbox if there isn't a goal here
        goalFields.push(
          <Item floatingLabel style={styles.goalTextBox}>
            <Label>{"Goal " + (i+1).toString()}</Label>
            <Input
              /*placeholder = {"Goal " + (i+1).toString()}
              placeholderTextColor = "#88B8C3"*/
              value={this.state.goals[i]}
              onChangeText = {(text) => this.handleGoal(text, i)}
            />
          </Item>
        );
      } else {
        goalFields.push(
          <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
            {/* <CheckBox checked={false} color="#3FB0B9" onPress={() => {
              this.activateGoal(i);
            }} /> */}
            <Text style={[styles.goalText]}>
              {i+1}. {this.state.goals[i]}
            </Text>
            <Button
              transparent
              small
              style={{marginLeft: 'auto'}}
              onPress={() => {this.editGoal(i)}}
            >
              {/*<Icon name='md-create' style={{color: "#3FB0B9", fontSize: 20}} />*/}
            </Button>
            <Button
              transparent
              small
              style={{marginLeft: 0}}
              onPress={() => {this.removeGoal(i)}}
            >
              {/* <Icon name='md-close' style={{color: "#AA0000", fontSize: 20}} /> */}
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
          <Item floatingLabel style={styles.goalTextBox}>
            <Label>{"Action Step " + (i+1).toString()}</Label>
            <Input
              /*placeholder = "Action Step"
              placeholderTextColor = "#90CCF4"*/
              value={this.state.actionSteps[i]}
              onChangeText = {(text) => this.actionStep(text, i)}
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
              {/* <Icon name='md-create' style={{color: "#3FB0B9", fontSize: 20}} /> */}
            </Button>
            <Button
              transparent
              small
              style={{marginLeft: 0}}
              onPress={() => {this.removeAction(i)}}
            >
              {/* <Icon name='md-close' style={{color: "#AA0000", fontSize: 20}} /> */}
            </Button>
          </View>
        );
      }
    }

    return (
      <Container>
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
        </Content>
      </Container>
    );
  }
}