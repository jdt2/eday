import React from 'React';
import styles from '../../Styles';
import { Text } from 'react-native';
import { Container, Content } from 'native-base';

export default class Summary extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Daily Summary',
        };
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Container>
                <Content>
                    <Text>
                        This is some text.
                    </Text>
                    <Text>
                        This is some text.
                    </Text>
                </Content>
            </Container>
        );
    }

}