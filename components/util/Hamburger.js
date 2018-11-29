import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Icon } from 'native-base';
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
                        <Icon name="menu" type="MaterialIcons" style={{fontSize: 25, color: "#FFF"}} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}