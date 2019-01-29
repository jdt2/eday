import React from 'react';
import { Easing, AsyncStorage, TouchableOpacity, StyleSheet, View, Image, TextInput, Animated } from 'react-native';
import styles from '../../Styles';
import { Input, Container, Title, Content, Icon, Button, Card, CardItem, Text, Body, Left, Right, IconNB, Footer, Item, Label } from "native-base";

export default class Mindset extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Mindset',
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            currText: "",
            mindset: [],
            mindsetFinalized: [],
        }
    }

    componentDidMount() {
        this.getMindset();
    }

    getMindset = async () => {
        try {
            await AsyncStorage.getItem('mindset').then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({"mindset": parsed});
                } else {
                    this.setState({"mindset": []});
                }
            //alert(parsed);
            }).then(() => {
                this.finalizeMindset();
            }).done();
        } catch(error) {
            alert(error);
        }
    }

    finalizeMindset() {
        for(let i = 0; i < this.state.mindset.length; i++) {
            let temp = this.state.mindsetFinalized;
            if(this.state.mindset[i] != null && this.state.mindset[i] != undefined) {
              temp[i] = true;
            } else {
              temp[i] = false;
            }
            this.setState({"mindsetFinalized": temp});
        }
    }

    handleMindset(text) {
        this.setState({"currText": text});
    }

    submitMindset() {
        let temp = this.state.mindset;
        temp.push(this.state.currText);
        this.setState({"mindset": temp});
        AsyncStorage.setItem("mindset", JSON.stringify(temp));
        // check if it's the last goal, then add another one that's null
        this.finalizeMindset();
    }

    clearMindset = async () => {
        this.setState({"mindset": []})
        this.setState({"mindsetFinalized": []})
        this.setState({"currText": ""});
        AsyncStorage.removeItem("mindset");
    }

    render() {

        let mindsetFields = [];

        for(let i = 0; i < this.state.mindset.length+1; i++) {
            if(this.state.mindsetFinalized == null || this.state.mindsetFinalized[i] == false || this.state.mindsetFinalized[i] == undefined) {
              // set a textbox if there isn't a goal here
              if(i == 0) {
                mindsetFields.push(
                    <Item inlineLabel style={[styles.goalTextBox]}>
                        <Label>I am...</Label>
                        <Input
                            /*placeholder = {"Goal " + (i+1).toString()}
                            placeholderTextColor = "#88B8C3"*/
                            value={this.state.mindset != null ? this.state.mindset[i] : null}
                            onChangeText = {(text) => this.handleMindset(text, i)}
                            onSubmitEditing = {() => this.submitMindset()}
                        />
                    </Item>
                );
              } else {
                mindsetFields.push(
                    <Item floatingLabel style={[styles.goalTextBox]}>
                        <Label>Enter Mindset Here...</Label>
                        <Input
                            /*placeholder = {"Goal " + (i+1).toString()}
                            placeholderTextColor = "#88B8C3"*/
                            value={this.state.mindset != null ? this.state.mindset[i]: null}
                            onChangeText = {(text) => this.handleMindset(text, i)}
                            onSubmitEditing = {() => this.submitMindset()}
                        />
                    </Item>
                );
              }
            } else {
                if(i == 0) {
                    mindsetFields.push(
                        <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                            <Text style={[styles.goalText, {marginLeft: 10, color: "black",}]}>
                                I am {this.state.mindset[i]}
                            </Text>
                            
                        </View>
                    );
                } else {
                    mindsetFields.push(
                        <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                            <Text style={[styles.goalText, {marginLeft: 10, color: "black",}]}>
                                {this.state.mindset[i]}
                            </Text>
                            
                        </View>
                    );
                }
            }
        }

        return (
            <Container>
                <Content>
                    {mindsetFields}
                    <View style={styles.goalButtons}>
                        <Button
                        rounded
                        style={styles.goalButton}
                        onPress={() => {
                            this.submitMindset();
                        }}
                        
                        >
                          <Text>Save</Text>
                        </Button>
                        <Button
                        rounded
                        style={styles.goalButton}
                        onPress={() => {
                            this.clearMindset();
                        }}
                        >
                         <Text>Clear Mindset</Text>
                        </Button>
                    </View>
                </Content>  
            </Container>
        );
    }

}