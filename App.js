import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/begin_quote.png')} style={{width: 80, height: 50}}/>
        <Text style={styles.quote}>Innovation distinguishes between a leader and a follower</Text>
        <Image source={require('./assets/end_quote.png')} style={{width: 80, height: 50}}/>
        <Text style={styles.from}>Steve Jobs</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quote: {
    width: 300,
    fontWeight: 'bold',
    fontSize: 30,
  },
  from: {
    marginTop: 50,
    fontSize: 20
  }
});