import React from 'react';
import { View, SafeAreaView, ScrollView, Image, AsyncStorage } from 'react-native';
import styles from './Styles';
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import Goals from './components/Goals/Goals';
import Home from './components/Home/Home';
import Learning from './components/Learning/Learning';
import Thinking from './components/Thinking/Thinking';
import AddThinking from './components/Thinking/AddThinking';
import AddLearning from './components/Learning/AddLearning';
import Hamburger from './components/util/Hamburger';
import { Icon } from 'native-base';
import Summary from './components/Summary/Summary';
import DailyAgenda from './components/DailyAgenda/DailyAgenda';
import EditAgenda from './components/DailyAgenda/EditAgenda';
import DailyAction from './components/DailyActions/DailyAction';
import GlobalFont from 'react-native-global-font';
import TodoPage from './components/Todo/TodoPage';
import AddAgenda from './components/Todo/AddAgenda';
import Mindset from './components/Mindset/Mindset';
import About from './components/About/About';
import Tutorial from './components/Tutorial/Tutorial';
import {AdMobBanner} from 'expo';

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

const TutorialNavigator = createStackNavigator(
  {
    Tutorial: {
      screen: Tutorial,
      navigationOptions: {
        header: null,
      }
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

const ScheduleNavigator = createStackNavigator(
  {
    DailyAgenda: {
      screen: DailyAgenda,
      navigationOptions: unavigationOptions,
    },
    AddAgenda: {
      screen: AddAgenda,
      navigationOptions: stackNavigationOptions,
    },
    EditAgenda: {
      screen: EditAgenda,
      navigationOptions: stackNavigationOptions,
    }
  }
);

const DailyActionNavigator = createStackNavigator(
  {
    DailyAction: {
      screen: DailyAction,
      navigationOptions: unavigationOptions,
    },
    TodoPage: {
      screen: TodoPage,
      navigationOptions: stackNavigationOptions,
    },
  }
);

const ThinkingNavigator = createStackNavigator(
  {
    Thinking: {
      screen: Thinking,
      navigationOptions: unavigationOptions,
    },
    AddNote: {
      screen: AddThinking,
      navigationOptions: stackNavigationOptions,
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

const MindsetNavigator = createStackNavigator(
  {
    Mindset: {
      screen: Mindset,
      navigationOptions: unavigationOptions,
    }
  }
)

const AboutNavigator = createStackNavigator(
  {
    About: {
      screen: About,
      navigationOptions: unavigationOptions,
    }
  }
)

const CustomDrawerComponent = (props) => (
  <SafeAreaView>
    <View style={{height: 150,backgroundColor: 'white',alignItems: 'center', marginBottom: 20,}}>
      <Image source={require('./assets/logoIcon.png')} style={{height: 150, width: 150, borderRadius: 75,}} />
    </View>
    <ScrollView>
      <DrawerItems style={{color: 'white'}} {...props}/>
    </ScrollView>
  </SafeAreaView>
);

const RootDrawer = createDrawerNavigator(
  {
    Tutorial: {
      screen: TutorialNavigator,
      navigationOptions: {
        drawerLabel: () => null,
        drawerIcon: null,
      }
    },
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
    ScheduleNavigator: {
      screen: ScheduleNavigator,
      navigationOptions: {
        drawerLabel: "Schedule",
        drawerIcon: ({tintColor}) => (
          <Icon
            name="calendar-week"
            type="MaterialCommunityIcons"
            style={{fontSize: 24, color: tintColor}}
          />
        ),
      }
    },
    DailyActionNavigator: {
      screen: DailyActionNavigator,
      navigationOptions: {
        drawerLabel: "Daily Actions",
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
    Mindset: {
      screen: MindsetNavigator,
      navigationOptions: {
        drawerLabel: "Mindset",
        drawerIcon: ({tintColor}) => (
          <Icon
            name="brain"
            type="MaterialCommunityIcons"
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
            name="account-circle"
            type="MaterialIcons"
            style={{fontSize: 24, color: tintColor}}
          />
        ),
      }
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: "About",
        drawerIcon: ({tintColor}) => (
          <Icon
            name="info-outline"
            type="MaterialIcons"
            style={{fontSize: 24, color: tintColor}}
          />
        ),
      }
    }
  }, {
    contentComponent: CustomDrawerComponent,
    edgeWidth: 70,
    minSwipeDistance: 3,
    contentOptions: {
      activeTintColor: '#3FB0B9',
    },
  }
);

export default class App extends React.Component {

  componentDidMount() {
    GlobalFont.applyGlobal("Arial");
  }

  render() {

    return (
      /*<View><Text>Something</Text></View>*/
      <RootDrawer />
      /*<Tutorial /> */      
    );
  }
}