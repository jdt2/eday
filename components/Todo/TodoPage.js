import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, Input, Label, Form, Item, Button, ListItem, Body, Left, Right } from 'native-base';
import styles from '../../Styles';
import { List } from 'native-base';

export default class TodoPage extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Daily Action Details',
            headerLeft: null,
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => params.handleAction()}
                >
                    <Text style={styles.headerRightText}>
                        Done
                    </Text>
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);

        
        this.state = {
            date: null,
            data: [],
            todoActivated: [],
            index: 0,
        };
    }

    componentDidMount() {
        let index = this.props.navigation.getParam("index", 0);

        this.props.navigation.setParams({handleAction: this.addAction});
    
        // load in data and todoActivated
        this.loadData(index);
    }

    loadData = async (index) => {
        // load index in
        this.setState({index: index});

        // load in data
        try {
            await AsyncStorage.getItem("todo").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({data: parsed});
                } else {
                    alert("You're not supposed to be here!");
                }
            }).done();
    
            // now we get the actions that are activated
            await AsyncStorage.getItem("todoActivated").then((value) => {
                let parsed = JSON.parse(value);
                if(parsed != null) {
                    this.setState({"todoActivated": parsed});
                } else {
                    this.setState({"todoActivated": []});
                }
            }).done();
        } catch (error) {
            alert(error);
        }
    }

    addAction = async () => {
        // not really adding, more like editing
        try {
            AsyncStorage.setItem("todo", JSON.stringify(this.state.data)).then(() => {
                this.props.navigation.navigate("DailyAction");
            });
            
            AsyncStorage.setItem("todoActivated", JSON.stringify(this.state.todoActivated));

        } catch(error) {
            alert(error);
        }
    }

    handleActionText(text) {
        let temp = this.state.data;
        temp[this.state.index] = text;
        this.setState({data: temp});
    }

    removeAction() {

        let temp = this.state.data;
        let temp1 = this.state.todoActivated;

        temp.splice(this.state.index, 1);
        temp1.splice(this.state.index, 1);

        this.setState({data: temp});
        this.setState({todoActivated: temp1});

        AsyncStorage.setItem("todo", JSON.stringify(temp));
        AsyncStorage.setItem("todoActivated", JSON.stringify(temp1));
        
        this.props.navigation.navigate("DailyAction");
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                            <Item floatingLabel style={styles.todo}>
                                <Label>Daily Action Text</Label>
                                <Input
                                    value={this.state.data[this.state.index]}
                                    numberOfLines={1}
                                    onChangeText={(text) => {
                                        this.handleActionText(text);
                                    }}
                                />
                            </Item>
                    </Form>
                    <View style={styles.todoDelete}>
                        <Button
                            transparent
                            onPress={() => {
                                this.removeAction();
                            }}
                        >
                            <Text style={styles.todoDeleteText}>Delete</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}