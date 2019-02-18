import React from 'react';
import { Easing, AsyncStorage, TouchableOpacity, StyleSheet, View, Image, TextInput, Animated } from 'react-native';
import styles from '../../Styles';
import { Input, Container, Title, Content, Button, Card, CardItem, Text, Body, Left, Right, IconNB, Footer, Item, Label } from "native-base";
import {Ionicons as Icon} from '@expo/vector-icons';

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
            editing: false,
            currIndexEdit: 0,
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
        if(this.state.currText.length == 0) return;
        let temp = this.state.mindset;
        if(this.state.editing) {
            temp[this.state.currIndexEdit] = this.state.currText;
            this.setState({"editing": false});
        } else {
            temp.push(this.state.currText);
        }
        this.setState({"mindset": temp});
        this.setState({"currText": ""});
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

    editItem(i) {
        let temp = this.state.mindsetFinalized;
        temp[i] = false;
        this.setState({"editing": true});
        this.setState({"currIndexEdit": i});
        this.setState({"currText": this.state.mindset[i]});
        this.setState({"mindsetFinalized": temp});
    }

    removeItem(i) {
        let temp = this.state.mindset;
        let temp1 = this.state.mindsetFinalized;
        temp.splice(i,1);
        temp1.splice(i,1);
        AsyncStorage.setItem('mindset', JSON.stringify(temp));
        this.setState({"mindset": temp});
        this.setState({"mindsetFinalized": temp1});
    }

    render() {

        let mindsetFields = [];

        for(let i = 0; i < this.state.mindset.length+1; i++) {
            if(this.state.mindsetFinalized == null || this.state.mindsetFinalized[i] == false || this.state.mindsetFinalized[i] == undefined) {
              // set a textbox if there isn't a goal here
              if(!this.state.editing || (this.state.editing && i < this.state.mindset.length)) {
                if(i == 0) {
                    mindsetFields.push(
                        <Item key={i} inlineLabel style={[styles.goalTextBox]}>
                            <Label>I am...</Label>
                            <Input
                                /*placeholder = {"Goal " + (i+1).toString()}
                                placeholderTextColor = "#88B8C3"*/
                                value={this.state.currText}
                                onChangeText = {(text) => this.handleMindset(text, i)}
                                onSubmitEditing = {() => this.submitMindset()}
                            />
                        </Item>
                    );
                } else {
                    mindsetFields.push(
                        <Item key={i} floatingLabel style={[styles.goalTextBox]}>
                            <Label>Enter Mindset Here...</Label>
                            <Input
                                /*placeholder = {"Goal " + (i+1).toString()}
                                placeholderTextColor = "#88B8C3"*/
                                value={this.state.currText}
                                onChangeText = {(text) => this.handleMindset(text, i)}
                                onSubmitEditing = {() => this.submitMindset()}
                            />
                        </Item>
                    );
                }
              }
            } else {
                if(i == 0) {
                    mindsetFields.push(
                        <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                            <Text style={styles.goalText}>I am {this.state.mindset[i]}</Text>
                            {this.state.editing ? null : 
                                <Button
                                transparent
                                small
                                style={{marginLeft: 'auto', marginRight: 20,}}
                                onPress={() => {this.editItem(i)}}
                                >
                                <Icon name='md-create' style={{color: "#3FB0B9", fontSize: 20}} />
                                </Button>
                            }
                            {this.state.editing ? null : 
                                <Button
                                transparent
                                small
                                style={{marginLeft: 0, marginRight: 20,}}
                                onPress={() => {this.removeItem(i)}}
                                >
                                <Icon name='md-close' style={{color: "#AA0000", fontSize: 20}} />
                                </Button>
                            }
                        </View>
                    );
                } else {
                    mindsetFields.push(
                        <View key={i} style={[styles.goalTextBox, {flex: 1,flexWrap: 'wrap', flexDirection: 'row'}]}>
                            <Text style={styles.goalText}>{this.state.mindset[i]}</Text>
                            {this.state.editing ? null : 
                            <Button
                            transparent
                            small
                            style={{marginLeft: 'auto', marginRight: 20,}}
                            onPress={() => {this.editItem(i)}}
                            >
                            <Icon name='md-create' style={{color: "#3FB0B9", fontSize: 20}} />
                            </Button>
                            }
                            {this.state.editing ? null : 
                            <Button
                            transparent
                            small
                            style={{marginLeft: 0, marginRight: 20,}}
                            onPress={() => {this.removeItem(i)}}
                            >
                            <Icon name='md-close' style={{color: "#AA0000", fontSize: 20}} />
                            </Button>
                            }
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