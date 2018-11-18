import React from 'react';
import {Image} from 'react-native';
import styles from './Styles';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Goals from './components/Goals/Goals';
import Home from './components/Home/Home';
import Todo from './components/Todo/Todo';
import Learning from './components/Learning/Learning';
import Thinking from './components/Thinking/Thinking';
import AddLearning from './components/Learning/AddLearning';
import Hamburger from './components/util/Hamburger';

var unavigationOptions = ({navigation}) => {
  return {
    headerStyle: {height: 40, backgroundColor: "#3FB0B9"},
    headerTitleStyle: {color: "white"},
    headerLeft: (
        <Hamburger func={navigation.toggleDrawer} />
    ),
    headerBackTitle: null,
  };
}

var stackNavigationOptions = ({navigation}) => {
  return {
    headerStyle: {height: 40, backgroundColor: "#3FB0B9"},
    headerTintColor: "white",
    headerTitleStyle: {color: "white"},
    headerBackTitle: null,
  };
}

const LearningNavigator = createStackNavigator(
  {
    Learning: {
      screen: Learning,
      navigationOptions: unavigationOptions,
    },
    AddNote: {
      screen: AddLearning,
      navigationOptions: stackNavigationOptions,
    }
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: unavigationOptions,
    }
  }
);

const GoalsNavigator = createStackNavigator(
  {
    Goals: {
      screen: Goals,
      navigationOptions: unavigationOptions,
    }
  }
);

const TodoNavigator = createStackNavigator(
  {
    Todo: {
      screen: Todo,
      navigationOptions: unavigationOptions,
    }
  }
);

const ThinkingNavigator = createStackNavigator(
  {
    Thinking: {
      screen: Thinking,
      navigationOptions: unavigationOptions,
    }
  }
);

const RootDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator
    },
    Goals: {
      screen: GoalsNavigator
    },
    Todo: {
      screen: TodoNavigator
    },
    Learning: {
      screen: LearningNavigator
    },
    Thinking: {
      screen: ThinkingNavigator
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootDrawer />;
  }
}