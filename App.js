import React from 'react';
import { View, SafeAreaView, ScrollView, Image } from 'react-native';
import styles from './Styles';
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import Goals from './components/Goals/Goals';
import Home from './components/Home/Home';
import Todo from './components/Todo/Todo';
import Learning from './components/Learning/Learning';
import Thinking from './components/Thinking/Thinking';
import AddLearning from './components/Learning/AddLearning';
import Hamburger from './components/util/Hamburger';
import { Icon } from 'native-base';
import Summary from './components/Summary/Summary';
import DailyAction from './components/Todo/DailyAction';
import AddTodo from './components/Todo/AddTodo';
import GlobalFont from 'react-native-global-font';
import LottieView from 'lottie-react-native';

const unavigationOptions = ({navigation}) => {
  return {
    headerStyle: {height: 40, backgroundColor: "#3FB0B9"},
    headerTitleStyle: {color: "white"},
    headerLeft: (
        <Hamburger func={navigation.toggleDrawer} />
    ),
    headerBackTitle: null,
  };
}

const stackNavigationOptions = ({navigation}) => {
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
      screen: DailyAction,
      navigationOptions: unavigationOptions,
    },
    AddTodo: {
      screen: AddTodo,
      navigationOptions: stackNavigationOptions,
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

const SummaryNavigator = createStackNavigator(
  {
    Summary: {
      screen: Summary,
      navigationOptions: unavigationOptions,
    }
  }
);

const CustomDrawerComponent = (props) => (
  <SafeAreaView>
    <View style={{height: 150,backgroundColor: 'white',alignItems: 'center', marginBottom: 20,}}>
      <Image source={require('./assets/logoIcon.png')} style={{height: 150, width: 150,borderRadius: 75,}} />
    </View>
    <ScrollView style={{color: 'white'}}>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
);

const RootDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: ({tintColor}) => (
          <Icon
            name="home"
            type="MaterialIcons"
            style={{fontSize: 24, color: tintColor}}
          />
        ),
      },
      
    },
    Goals: {
      screen: GoalsNavigator,
      navigationOptions: {
        drawerLabel: "Goals",
        drawerIcon: ({tintColor}) => (
          <Icon
            name="trophy"
            type="MaterialCommunityIcons"
            style={{fontSize: 24, color: tintColor}}
          />
        ),
      }
    },
    Todo: {
      screen: TodoNavigator,
      navigationOptions: {
        drawerLabel: "Daily Action List",
        drawerIcon: ({tintColor}) => (
          <Icon
            name="assignment"
            type="MaterialIcons"
            style={{fontSize: 24, color: tintColor}}
          />
        ),
      }
    },
    Learning: {
      screen: LearningNavigator,
      navigationOptions: {
        drawerLabel: "Learning",
        drawerIcon: ({tintColor}) => (
          <Icon
            name="book-open-page-variant"
            type="MaterialCommunityIcons"
            style={{fontSize: 24, color: tintColor}}
          />
        ),
      }
    },
    Thinking: {
      screen: ThinkingNavigator,
      navigationOptions: {
        drawerLabel: "Thinking",
        drawerIcon: ({tintColor}) => (
          <Icon
            name="lightbulb-outline"
            type="MaterialIcons"
            style={{fontSize: 24, color: tintColor}}
          />
        ),
      }
    },
    Summary: {
      screen: SummaryNavigator,
      navigationOptions: {
        drawerLabel: "Daily Summary",
        drawerIcon: ({tintColor}) => (
          <Icon
            name="account-box"
            type="MaterialIcons"
            style={{fontSize: 24, color: tintColor}}
          />
        ),
      }
    }
  }, {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: '#3FB0B9',
    }
  }
);

export default class App extends React.Component {

  componentDidMount() {
    GlobalFont.applyGlobal("Arial");
  }

  render() {

    return (
      <RootDrawer />
    );
  }
}