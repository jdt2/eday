import React from 'react';
import { ScrollView, ImageBackground, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import styles from '../../Styles';
import {Ionicons as Icon} from '@expo/vector-icons';

export default class Thinking extends React.Component {
    
    static navigationOptions = ({navigation}) => {
        return {
            drawerLabel: 'Thinking',
            drawerIcon: ({ tintColor }) => {
            <Image
                source={require('../../assets/icon.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
            },
            headerTitle: 'Thinking',
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            thought: "",
            thoughts: []
        }
    }

    componentDidMount() {
        this.getThoughts();
    }

    getThoughts = async () => {
        try {
            await AsyncStorage.getItem("thoughts").then((value) => {
                if(value != null) {
                    let parsed = JSON.parse(value);
                    this.setState({"thoughts": parsed});
                } else {
                    this.setState({"thoughts": []});
                }
            });
        } catch (error) {
            alert(error);
        }
    }

    handleThought(text) {
        this.setState({"thought": text});
    }

    addThoughts() {

        if(this.state.thought != null && this.state.thought.trim().length > 0) {
            let temp = this.state.thoughts;
            temp.unshift(this.state.thought);
            this.setState({"thoughts": temp});
            this.setState({"thought": ""});
            /* alert(temp); */
            AsyncStorage.setItem("thoughts", JSON.stringify(temp));
        }
    }

    clearThoughts() {
        this.setState({"thoughts": []});
        this.setState({"thought": ""});
        AsyncStorage.removeItem("thoughts");
    }

    render() {
        var thoughtList = [];

        for (let i = 0; i < this.state.thoughts.length; i++) {
            thoughtList.push(
                <View style={styles.thought}>
                    <ImageBackground source={require('../../assets/bubble.png')} style={{width: 310, height: 170}}>
                        <Text style={styles.thoughtText} numberOfLines={1}>{this.state.thoughts[i]}</Text>
                    </ImageBackground>
                </View>
            );
        }

        return (
            <ScrollView style={[styles.container, {alignItems: 'center'}]}>
                <Button
                    title="Clear Thoughts"
                    onPress={() => {this.clearThoughts()}}
                />
                {/* Text input for next thought bubble */}
                <ImageBackground source={require('../../assets/bubble.png')} style={[styles.thought, {width: 310, height: 170}]}>
                    <TextInput
                        style={styles.thoughtTextBox}
                        placeholder = {"Enter a thought here"}
                        placeholderTextColor = "#88B8C3"
                        ref={input => {this.textInput = input}}
                        onChangeText = {(text) => this.handleThought(text)}
                    />
                    <TouchableOpacity
                        style={styles.thoughtButton}
                        onPress={() => {
                            this.addThoughts();
                            this.textInput.clear();
                        }}
                    >
                        <Icon style={styles.thoughtButtonText} name="md-checkmark" size={40} />
                    </TouchableOpacity>
                </ImageBackground>

                {thoughtList}
            </ScrollView>
        );
    }

}