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
    headerLeft: {
      paddingLeft: 15,
    },
    headerRight: {
      paddingRight: 15,
    },
    // Home.js
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
    // Learning
    note: {
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#90CCF4",
      justifyContent: "center",
      marginLeft: 15,
      marginRight: 15,
      padding: 15,
    },
    noteText: {
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 16,
    },
    noteTitle: {
      fontSize: 36,
    },
    // Add Learning
    noteTitleInput: {
      fontSize: 36,
      height: 70,
      borderWidth: 1,
      borderColor: "#90CCF4",
    },
    noteTextInput: {
      height: 400,
      borderWidth: 1,
      borderColor: "#90CCF4",
    }
})