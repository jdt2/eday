import React from 'react';
import { ScrollView, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, Button, TextInput, StatusBar } from 'react-native';
import styles from '../../Styles';
import {Ionicons as Icon} from '@expo/vector-icons';

export default class Learning extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Learning',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => navigation.navigate("AddNote")}
                >
                    <Icon name="md-add" size={30} color="#FFF" />
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
            await AsyncStorage.getItem("notes").then((value) => {
                if(value != null) {
                    let parsed = JSON.parse(value);
                    /* alert(parsed.length); */
                    this.setState({"notes": parsed});
                } else {
                    /* alert("notes is null"); */
                    this.setState({"notes": []});
                    AsyncStorage.setItem("notes", JSON.stringify([]));
                }
            });
        } catch (error) {
            alert(error);
        }
    }

    render() {
        var notes = [];

        for (let i = 0; i < this.state.notes.length; i++) {
            notes.push(
                
                <View style={styles.note}>
                    <Text style={styles.noteTitle}>{this.state.notes[i][0]}</Text>
                    <Text style={styles.noteText} numberOfLines={1}>{this.state.notes[i][1]}</Text>
                </View>
            );
        }

        return (
            <ScrollView style={styles.container}>

                <Button 
                    onPress={() => {
                        AsyncStorage.clear(null);
                        this.getNotes();
                    }}
                    title="Clear"
                />
                {notes}
            </ScrollView>
        );
    }
}