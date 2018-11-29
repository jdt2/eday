import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import styles from '../../Styles';
import {Ionicons as Icon} from '@expo/vector-icons';

export default class AddLearning extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Add a Note',
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
            await AsyncStorage.getItem("notes").then((value) => {
                let parsed = JSON.parse(value);
                /* alert(parsed); */
                let newArr = [];
                if(parsed.length > 0) {
                    newArr = [parsed, [this.state.title, this.state.text]];
                } else {
                    newArr = [[this.state.title, this.state.text]];
                }
                AsyncStorage.setItem("notes", JSON.stringify(newArr));
                this.props.navigation.navigate("Learning");
            });
        } catch (error) {
            alert(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.noteTitleInput}
                    onChangeText={(text) => this.setState({title: text})}
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
                />
            </View>
        );
    }
}