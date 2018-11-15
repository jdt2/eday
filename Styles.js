import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    // global
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
    },
    icon: {
        width: 24,
        height: 24
    },
    textHeader: {
      fontSize: 48,
      fontWeight: 'bold',
    },
    // Home.js
    header: {
      paddingLeft: 15,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    whole: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    quote: {
      width: 300,
      fontWeight: 'bold',
      fontSize: 30,
    },
    from: {
      marginTop: 50,
      fontSize: 20
    },
    // Goals.js
    goalContent: {
      flex: 1,
      alignItems: 'center',
      /*justifyContent: 'center',*/
    },
    goal: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: 50,
    },
    goalTextBox: {
      margin: 15,
      height: 40,
      width: 250,
      borderColor: "#90CCF4",
      borderWidth: 1,
    },
    goalText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    goalButton: {
      margin: 15,
      height: 40,
      width: 40,
      backgroundColor: "#90CCF4",
      alignItems: 'center',
    },
    goalButtonText: {
      color: 'white'
    },
})