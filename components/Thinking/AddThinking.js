import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, Button } from 'react-native';
import { Container, Content, Form, Textarea, Item, Input, Label } from 'native-base';
import styles from '../../Styles';
import {Ionicons as Icon} from '@expo/vector-icons';

export default class AddLearning extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Add a Thought',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => params.handleNote()}
                >
                    <Icon name="md-checkmark" size={25} color="#FFF" />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);

        this.props.navigation.setParams({handleNote: this.addNote});

        this.state = {
            title: "",
            text: "",
        }
    }

    addNote = async () => {
        // get from AsyncStorage and append
        try {
            await AsyncStorage.getItem("thinking").then((value) => {
                let parsed = JSON.parse(value);
                /* alert(parsed); */
                let newArr = [];
                if (this.state.title.length == 0 || this.state.text.length == 0) return;
                if(!parsed) parsed = [];
                parsed.push({title: this.state.title, text: this.state.text});
                AsyncStorage.setItem("thinking", JSON.stringify(parsed));
                this.props.navigation.navigate("Thinking");
            });
        } catch (error) {
            alert(error);
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel style={{marginBottom: 10,}}>
                            <Label>Thought Title</Label>
                            <Input onChangeText={(text) => this.setState({title: text})} />
                        </Item>
                        <Textarea rowSpan={10} bordered placeholder="Insert thought here" onChangeText={(text) => this.setState({text: text})} />
                        {/* <TextInput
                            style={styles.noteTitleInput}
                            }
                            placeholder="Note Title"
                            placeholderTextColor = "#88B8C3"
                        />
                        <TextInput
                            style={styles.noteTextInput}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(text) => this.setState({text: text})}
                            placeholder="Type what you learned here"
                            placeholderTextColor = "#88B8C3"
                        /> */}
                    </Form>
                </Content>
            </Container>
        );
    }
}