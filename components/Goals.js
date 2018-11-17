import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import styles from '../Styles'
import {Ionicons as Icon} from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Goals extends React.Component {
	static navigationOptions = ({navigation}) => {
    return {
      drawerLabel: 'Goals',
      drawerIcon: ({ tintColor }) => {
        <Image
          source={require('../assets/icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      },
      headerTitle: 'Goals',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      currGoals: [],
      savedGoals: [],
      actionStep: "",
      savedActionStep: "",
    }
    this.getGoals();
    this.updateActionStep();
  }

  // handle goals
  handleGoal(text, i) {
    let editGoals = [this.state.currGoals];
    editGoals[i] = text;
    this.setState({currGoals: editGoals});
  }

  goalSubmit(i) {
    let editSavedGoals = [this.state.savedGoals];
    editSavedGoals[i] = this.state.currGoals[i];
    this.setState({savedGoals: editSavedGoals});
    let jsonString = JSON.stringify(editSavedGoals);
    AsyncStorage.setItem('goals', jsonString);
    this.getGoals();
  }

  getGoals = async () => {
    try {
      let goalList = await AsyncStorage.getItem('goals').then((value) => {
        let parsed = JSON.parse(value);
        this.setState({"savedGoals": parsed});
        //alert(parsed);
      }).done();
    } catch (error) {
      alert(error);
    }
  }

  actionStep(text) {    
    this.setState({actionStep: text});
  }

  submitActionStep() {
    AsyncStorage.setItem('actionStep', this.state.actionStep);
    this.updateActionStep();
  }

  updateActionStep = async() => {
    try {
      let astep = await AsyncStorage.getItem('actionStep').then((value) => {
        this.setState({"savedActionStep": value});
        //alert(parsed);
      }).done();
    } catch (error) {
      alert(error);
    }
  }

  render() {
    var goalFields = [];
    //this.getGoals();

    for(let i = 0; i < 5; i++) {
      if(this.state.savedGoals === null || this.state.savedGoals[i] == undefined) {
        goalFields.push(
          <View key={i} style={styles.goal}>
            <TextInput
              style={styles.goalTextBox}
              placeholder = {"Goal " + (i+1).toString()}
              placeholderTextColor = "#88B8C3"
              onChangeText = {(text) => this.handleGoal(text, i)}
            />
            <TouchableOpacity
              style={styles.goalButton}
              onPress={() => this.goalSubmit(i)}
            >
              <Icon style={styles.goalButtonText} name="md-checkmark" size={40} />
            </TouchableOpacity>
          </View>
        );
      } else {
        goalFields.push(
          <View key={i}>
            <Text style={styles.goalText}>{i+1}. {this.state.savedGoals[i]}</Text>
          </View>
        )
      }
    }

    // action step
    var aStep = null;

    if(this.state.savedActionStep === "" || this.state.savedActionStep === null) {
      aStep = (
        <View style={styles.goal}>
          <TextInput
            style={styles.goalTextBox}
            placeholder = {"Action Step"}
            placeholderTextColor = "#90CCF4"
            onChangeText = {(text) => this.actionStep(text)}
          />
          <TouchableOpacity
            style={styles.goalButton}
            onPress={() => this.submitActionStep()}
          >
            <Icon style={styles.goalButtonText} name="md-checkmark" size={40} />
          </TouchableOpacity>
        </View>
      );
    } else {
      aStep = (
        <View style={styles.goal}>
            <Text style={styles.goalText}>{this.state.savedActionStep}</Text>
        </View>
      );
    }

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.goalContent}>
          <Text style={styles.textHeader}>Goals</Text>
          <Button
            onPress={() => {
              AsyncStorage.clear(null);
              this.getGoals();
            }}
            title="Clear Goals"
          />
          {goalFields}

          <Text style={[styles.textHeader, {marginTop: 20}]}>
            Action Step
          </Text>
          <Button
            onPress={() => {
              AsyncStorage.clear(null);
              this.updateActionStep();
            }}
            title="Clear Action Step"
          />
          {aStep}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}