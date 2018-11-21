import React from 'react';
import { Container, Tabs, Tab } from 'native-base';
import DailyAgenda from './DailyAgenda';
import Todo from './Todo';

export default class DailyAction extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
          headerTitle: 'Daily Action List',
        };
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Tabs locked initialPage={0} tabBarUnderlineStyle={{backgroundColor: "#3FB0B9"}}>
                    <Tab heading="Daily Agenda" activeTextStyle={{color: "#3FB0B9"}}>
                        <DailyAgenda />
                    </Tab>
                    <Tab heading="Daily Actions" activeTextStyle={{color: "#3FB0B9"}}>
                        <Todo />
                    </Tab>
                </Tabs>
            </Container>
        );
    }

}