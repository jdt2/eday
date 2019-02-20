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
    bottomBanner: {
      position: 'absolute',
      bottom: 0,
      //borderWidth: 1,
    },
    cardHeader: {
      flex: 1,
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    textHeader: {
      fontSize: 48,
      fontWeight: 'bold',
      fontFamily: 'Arial',
    },
    headerLeft: {
      paddingLeft: 15,
    },
    headerRight: {
      paddingRight: 15,
    },
    headerRightText: {
      fontSize: 18,
      color: "#FFF",
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
      marginLeft: 15,
      /*justifyContent: 'center',*/
    },
    goal: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: 50,
    },
    goalTextBox: {
      marginLeft: 10,
      marginTop: 20,
    },
    goalText: {
      fontSize: 24,
      fontWeight: 'bold',
      justifyContent: 'flex-start'
    },
    goalButtons: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginBottom: 20,
    },
    goalButton: {
      marginTop: 10,
      marginLeft: 10,
      backgroundColor: "#3FB0B9",
      /* height: 40,
      width: 40,
      alignItems: 'center', */
    },
    goalButtonText: {
      color: 'white'
    },
    // Learning
    note: {
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#3FB0B9",
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
      borderColor: "#3FB0B9",
    },
    noteTextInput: {
      height: 400,
      borderWidth: 1,
      borderColor: "#3FB0B9",
    },
    // Thinking
    thought: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
    },
    thoughtText: {
      alignSelf: 'center',
      fontSize: 24,
      marginTop: 80,
    },
    thoughtTextBox: {
      marginTop: 10,
      marginLeft: 15,
      fontSize: 24,
    },
    thoughtButton: {
      marginLeft: 15,
    },
    thoughtButtonText: {

    },
    // DailyAgenda in DailyAction.js
    emptyDate: {
      height: 15,
      flex:1,
      width: '100%',
      alignItems: "center",
      paddingTop: 30
    },
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 7,
      marginBottom: 10,
      height: 60,
    },
    swipeRightButton: {
      height: 100,
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 15,
    },
    // Todo in DailyAction.js
    todo: {
      height: 50,
    },
    todoTextBox: {
      marginLeft: 10,
    },
    todoFooter: {
      height: 50,
      backgroundColor: "white",
    },

    // TodoPage.js
    todoDelete: {
      marginTop: 20,
      flex: 1,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
    },
    todoDeleteText: {
      color: "red",
      fontSize: 18,
    },
    // Tutorial.js
    titleText: {
      color: "white",
      fontSize: 36,
      textAlign: 'center',
      width: '90%',
    },
    subTitleText: {
      marginTop: 10,
      color: "white",
      fontSize: 24,
      textAlign: 'center',
      width: '90%',
    },
    // About.js
    aboutText: {
      fontSize: 28,
    }
})