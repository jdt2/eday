import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, View, Image, TextInput } from 'react-native';
import styles from '../../Styles';
import { Input, Container, Title, Content, Icon, Button, Card, CardItem, Text, Body, Left, Right, IconNB, Footer, Item, Label } from "native-base";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Goals extends React.Component {
	static navigationOptions = ({navigation}) => {
    return {
      drawerLabel: 'Goals',
      drawerIcon: ({ tintColor }) => {
        <Image
          source={require('../../assets/icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      },
      headerTitle: 'Goals',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      goalFinalized: [],
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

  // editing and removing
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
    this.setState({"goals": temp}).then(() => {
      this.finalizeGoals();
    });
  }

  removeAction(i) {
    let temp = this.state.actionSteps;
    temp[i] = null;
    AsyncStorage.setItem('actionSteps', JSON.stringify(temp));
    this.setState({"actionSteps": temp}).then(() => {
      this.finalizeActions();
    });
  }

  render() {
    var goalFields = [];
    //this.getGoals();

    for(let i = 0; i < 5; i++) {
      if(this.state.goalFinalized == null || this.state.goalFinalized[i] == false || this.state.goalFinalized[i] == undefined) {
        goalFields.push(
          <Item floatingLabel style={styles.goalTextBox}>
            <Label>{"Goal " + (i+1).toString()}</Label>
            <Input
              /*placeholder = {"Goal " + (i+1).toString()}
              placeholderTextColor = "#88B8C3"*/
              onChangeText = {(text) => this.handleGoal(text, i)}
            />
            {/* <TouchableOpacity
              style={styles.goalButton}
              onPress={() => this.goalSubmit(i)}
            >
              <Icon style={styles.goalButtonText} name="md-checkmark" size={40} />
            </TouchableOpacity> */}
          </Item>
        );
      } else {
        goalFields.push(
          <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
            <Text style={styles.goalText}>{i+1}. {this.state.goals[i]}</Text>
            {/* <View style = {{marginLeft: 'auto'}}> */}
              <Button
                transparent
                small
                style={{marginLeft: 'auto'}}
              >
                <Icon name='md-create' style={{color: "#3FB0B9", fontSize: 20}} />
              </Button>
              <Button
                transparent
                small
                style={{marginLeft: 0}}
              >
                <Icon name='md-close' style={{color: "#AA0000", fontSize: 20}} />
              </Button>
            {/*</View>*/}
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
              onChangeText = {(text) => this.actionStep(text, i)}
            />
            {/* <TouchableOpacity
              style={styles.goalButton}
              onPress={() => this.submitActionStep()}
            >
              <Icon style={styles.goalButtonText} name="md-checkmark" size={40} />
            </TouchableOpacity> */}
          </Item>
        );
      } else {
        aStep.push(
          <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
            <Text style={styles.goalText}>{i+1}. {this.state.actionSteps[i]}</Text>
            {/* <View style = {{marginLeft: 'auto'}}> */}
              <Button
                transparent
                small
                style={{marginLeft: 'auto'}}
              >
                <Icon name='md-create' style={{color: "#3FB0B9", fontSize: 20}} />
              </Button>
              <Button
                transparent
                small
                style={{marginLeft: 0}}
              >
                <Icon name='md-close' style={{color: "#AA0000", fontSize: 20}} />
              </Button>
            {/*</View>*/}
          </View>
        );
      }
    }

    return (
      <Container>
        <Content>
          <Text style={[styles.textHeader, {marginTop: 20, marginBottom: 5,marginLeft: 15}]}>Goals</Text>
          
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
                AsyncStorage.clear(null);
                this.getGoals();
              }}
            >
              <Text>Clear Goals</Text>
            </Button>
          </View>

          <Text style={[styles.textHeader, {marginBottom: 5, marginLeft: 15}]}>
            Action Step
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
                AsyncStorage.clear(null);
                this.updateActionSteps();
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