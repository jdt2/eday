import React from 'react';
import { ScrollView, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, View, Image, Button, TextInput, StatusBar } from 'react-native';
import { Card, CardItem, Text, Body, Container, Content } from 'native-base';
import styles from '../../Styles';
import {Ionicons as Icon} from '@expo/vector-icons';

export default class Thinking extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Thinking',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => navigation.navigate("AddNote")}
                >
                    <Icon name="md-add" size={25} color="#FFF" />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            notes: []
        }
    }

    componentDidMount() {

        this.getNotes();
        this.props.navigation.addListener('willFocus', this.getNotes);
    }

    getNotes = async () => {
        try {
            await AsyncStorage.getItem("thinking").then((value) => {
                if(value != null) {
                    let parsed = JSON.parse(value);
                    /* alert(parsed.length); */
                    this.setState({"notes": parsed});
                } else {
                    /* alert("notes is null"); */
                    this.setState({"notes": []});
                    AsyncStorage.setItem("thinking", JSON.stringify([]));
                }
            });
        } catch (error) {
            alert(error);
        }
    }

    clearNotes() {
        this.setState({"notes": []});
        AsyncStorage.removeItem("thinking");
    }

    render() {
        var notes = [];
        console.log(this.state.notes);
        for (let i = this.state.notes.length-1; i >= 0; i--) {
            notes.push(
                <Card style={{marginLeft: 10, marginRight: 10,}}>
                    <CardItem header>
                        <Text>{this.state.notes[i].title}</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                {this.state.notes[i].text}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            );
        }

        return (
            <Container>
                <Content contentContainerStyle={{paddingTop: 10,}}>
                    <Button 
                        onPress={() => {
                            this.clearNotes();
                        }}
                        title="Clear"
                    />
                    {notes}
                </Content>
            </Container>
        );
    }
}