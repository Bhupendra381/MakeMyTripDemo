import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from '../screens/Splash';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import PasswordReset from '../screens/PasswordReset';
import Dashboard from '../screens/Dashboard';

const StackNavigator=createStackNavigator({
    Splash:{
        screen:Splash,
        navigationOptions:{
            headerShown:false
        }
    },

    SignIn:{
        screen:SignIn,
        navigationOptions:{
            headerShown:false
        }
    },

    SignUp:{
        screen:SignUp,
        navigationOptions:{
            headerShown:false
        }
    },

    PasswordReset:{
        screen:PasswordReset,
        navigationOptions:{
            headerShown:false
        }
    },

    Dashboard:{
        screen:Dashboard,
        navigationOptions:{
            headerShown:false
        }
    },
});

export default createAppContainer(StackNavigator);