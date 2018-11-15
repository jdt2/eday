import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, Button, TextInput, StatusBar } from 'react-native';
import styles from '../Styles';
import Hamburger from './Hamburger';

export default class Learning extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            drawerLabel: 'Learning',
            drawerIcon: ({ tintColor }) => {
                <Image
                    source={require('../assets/icon.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            },
            headerTitle: 'Learning',
        };
    };

    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <View style={[styles.container, styles.content]}>
                <Button 
                    onPress={() => {
                        this.props.navigation.navigate("AddNote");
                    }}
                    title="Go to Add Note"
                />
            </View>
        );
    }
}