import React from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../Styles';
import Hamburger from './Hamburger';

export default class Home extends React.Component {
	static navigationOptions = ({navigation}) => {
    return {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => {
        <Image
          source={require('../assets/icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      },
      headerTitle: 'Home',
    };
	};

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.whole}>
            <Image source={require('../assets/begin_quote.png')} style={{width: 30, height: 20}}/>
            <Text style={styles.quote}>Innovation distinguishes between a leader and a follower</Text>
            {/*<Image source={require('./assets/end_quote.png')} style={{width: 30, height: 20}}/>*/}
          </View>
          <Text style={styles.from}>Steve Jobs</Text>
        </View>
      </View>
    );
  }
}