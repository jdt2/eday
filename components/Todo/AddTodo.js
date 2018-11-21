import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Input } from 'native-base';

export default class AddTodo extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerTitle: 'Add a Note',
            headerRight: (
                <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => params.handleNote()}
                >
                    <Icon name="md-checkmark" size={30} color="#FFF" />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            date: null,
        };
    }

    render() {
        return (
            <Container>
                <Input
                    numberOfLines={1}
                />
            </Container>
        );
    }
}