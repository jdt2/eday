import React from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Icon } from 'native-base';
import styles from '../../Styles';

export default class Tutorial extends React.Component {

    componentDidMount() {
        AsyncStorage.getItem("tutorial", (err, result) => {
            if(!err) {
                if(result != null) {
                    this.props.navigation.navigate("Home");
                }
            }
        });
    }

    isDone = () => {
        AsyncStorage.setItem("tutorial", "true");
        this.props.navigation.navigate("Home");
    }

      render() {
        
        return (
            <Onboarding
                pages={[
                    {
                        backgroundColor: '#3FB0B9',
                        image: <Image source={require('../../assets/logo.png')} style={{width: 300, height: 300}} />,
                        title: <Text style={styles.titleText}>Welcome to Eday</Text>,
                        subtitle: <Text style={styles.subTitleText}>Here's a short walkthrough on how to use the app</Text>
                    },
                    {
                        backgroundColor: '#3FB0B9',
                        image: <Icon name="trophy" type="MaterialCommunityIcons" style={{fontSize: 100, color: "white"}} />,
                        title: <Text style={styles.titleText}>Goals and Action Steps</Text>,
                        subtitle: <Text style={styles.subTitleText}>
                            List the 5 goals Daily that if and when achieved would have the most impact as well as highest payoff when accomplished.
                            {'\n\n'}Commit to taking at least one action step on at least one of your goals today.
                        </Text>
                    },
                    {
                        backgroundColor: '#3FB0B9',
                        image: <Icon name="assignment" type="MaterialIcons" style={{fontSize: 100, color: "white"}} />,
                        title: <Text style={styles.titleText}>Schedule and Daily Action</Text>,
                        subtitle: <Text style={styles.subTitleText}>
                            Schedule appointments as well as blocks of time to accomplish tasks and projects.
                            {'\n\n'}List first the items that MUST be done today followed by what should get accomplished today.
                        </Text>
                    },
                    {
                        backgroundColor: '#3FB0B9',
                        image: <Icon name="book-open-page-variant" type="MaterialCommunityIcons" style={{fontSize: 100, color: "white"}} />,
                        title: <Text style={styles.titleText}>Learning</Text>,
                        subtitle: <Text style={styles.subTitleText}>
                            Take time daily to learn. Listen to podcasts, read books attend go to seminars and write what you are learning.
                            {'\n\n'}Example: Title: Greatest Entrepreneur in the World book. Insert Build a Brand
                        </Text>
                    },
                    {
                        backgroundColor: '#3FB0B9',
                        image: <Icon name="lightbulb-outline" type="MaterialIcons" style={{fontSize: 100, color: "white"}} />,
                        title: <Text style={styles.titleText}>Thinking</Text>,
                        subtitle: <Text style={styles.subTitleText}>
                            Take a few minutes and just THINK. What good ideas can you begin to have? List them. What ideas can you improve on?
                        </Text>
                    },
                    {
                        backgroundColor: '#3FB0B9',
                        image: <Icon name="brain" type="MaterialCommunityIcons" style={{fontSize: 100, color: "white"}} />,
                        title: <Text style={styles.titleText}>Mindset</Text>,
                        subtitle: <Text style={styles.subTitleText}>
                            Begin your day with just something as simple as I am GRATEFUL for …(list a few things each day).
                            {'\n'}Next I am … list qualities and achievements.
                            {'\n\n'}Example. I am a very successful entrepreneur and my business continues to grow beyond my expectations.
                        </Text>
                    },
                    {
                        backgroundColor: '#3FB0B9',
                        image: <Icon name="account-circle" type="MaterialIcons" style={{fontSize: 100, color: "white"}} />,
                        title: <Text style={styles.titleText}>Daily Summary</Text>,
                        subtitle: <Text style={styles.subTitleText}>
                            Review your day and see if you took action on high-level items. Did you spend time thinking, and learning?
                        </Text>
                    },
                ]}
                onDone={() => {this.isDone()}}
                onSkip={() => {this.isDone()}}
            />
        );
      }
}