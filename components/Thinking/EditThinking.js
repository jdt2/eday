import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import { Container, Content, Form, Textarea, Item, Input, Label, Button } from 'native-base';
import styles from '../../Styles';
import {Ionicons as Icon} from '@expo/vector-icons';

export default class EditThinking extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Edit a Thought',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => params.handleNote()}
                >
                    <Icon name="md-checkmark" size={30} color="#FFF" />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);

        let index = this.props.navigation.getParam("index", 0);

        this.props.navigation.setParams({handleNote: this.addNote});

        this.state = {
            title: "",
            text: "",
            data: [],
            index: 0,
        }

        this.loadData(index);
    }

    loadData = async (index) => {
        // load index in
        this.setState({index: index});

        // load in data
        try {
            await AsyncStorage.getItem("thinking").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({data: parsed});
                    this.setState({title: parsed[index].title});
                    this.setState({text: parsed[index].text});
                } else {
                    alert("You're not supposed to be here!");
                }
            }).done();
        } catch (error) {
            alert(error);
        }
    }

    // actually editNote
    addNote = async () => {
        // get from AsyncStorage and append
        let newArr = this.state.data;
        if (this.state.title.length == 0 || this.state.text.length == 0) return;
        newArr[this.state.index] = {title: this.state.title, text: this.state.text};
        AsyncStorage.setItem("thinking", JSON.stringify(newArr));
        this.props.navigation.navigate("Thinking");
    }

    removeNote() {

        let temp = this.state.data;

        temp.splice(this.state.index, 1);

        this.setState({data: temp});
        AsyncStorage.setItem("thinking", JSON.stringify(temp));
        
        this.props.navigation.navigate("Thinking");
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel style={{marginBottom: 10,}}>
                            <Label>Thought Title</Label>
                            <Input value={this.state.title} onChangeText={(text) => this.setState({title: text})} />
                        </Item>
                        <Textarea rowSpan={10} bordered placeholder="Insert thought here" value={this.state.text} onChangeText={(text) => this.setState({text: text})} />
                    </Form>
                    <View style={styles.todoDelete}>
                        <Button
                            transparent
                            onPress={() => {
                                this.removeNote();
                            }}
                        >
                            <Text style={styles.todoDeleteText}>Delete</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}