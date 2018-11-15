import React from 'react';
import { KeyboardAvoidingView, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import styles from '../Styles';

export default class AddLearning extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
          headerTitle: 'Add a Note',
        };
    };

    render() {
        return (
            <View style={[styles.container, styles.content]}>
                <Button 
                    onPress={() => this.props.navigation.goBack()}
                    title="Go Back"
                />
            </View>
        );
    }
}