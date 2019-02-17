import React from 'react';
import { ScrollView, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, View, Image, Button, TextInput, StatusBar } from 'react-native';
import { Card, CardItem, Text, Body, Container, Content, Icon } from 'native-base';
import styles from '../../Styles';
import Swipeable from 'react-native-swipeable';

export default class Thinking extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Thinking',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => navigation.navigate("AddThought")}
                >
                    <Icon
                        name="add"
                        type="MaterialIcons"
                        style={{fontSize: 24, color: "white"}}
                    />
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

    editThought(i) {
        this.props.navigation.navigate('EditThought', {index: i});
    }

    deleteThought(i) {
        let temp = this.state.notes;
        temp.splice(i,1);
        this.setState({"notes": temp});
        AsyncStorage.setItem("thinking", JSON.stringify(temp));
    }

    render() {
        var notes = [];
        console.log(this.state.notes);
        for (let i = this.state.notes.length-1; i >= 0; i--) {
            notes.push(
                <Swipeable key={i} onRef={ref=> {
                    this.$swipe = ref;
                }} rightButtons={[
                    <TouchableOpacity onPress={() => {
                        this.$swipe.recenter();
                        this.editThought(i);
                    }} style={styles.swipeRightButton}>
                        <Icon
                            name="edit"
                            type="MaterialIcons"
                            style={{fontSize: 24, color: "blue"}}
                        />
                    </TouchableOpacity>,
                    <TouchableOpacity onPress={() => {
                        this.$swipe.recenter();
                        this.deleteThought(i);
                    }} style={styles.swipeRightButton}>
                        <Icon
                            name="close"
                            type="MaterialIcons"
                            style={{fontSize: 24, color: "red"}}
                        />
                    </TouchableOpacity>
                ]}>
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
                </Swipeable>
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