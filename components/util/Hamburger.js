import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import styles from '../../Styles';

export default class Hamburger extends React.Component {
    render() {
        return (
            <View>
                <StatusBar barStyle="light-content" />
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => {this.props.func()
                        }}
                    >
                        <Icon name="md-menu" size={30} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}