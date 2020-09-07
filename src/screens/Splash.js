import React from 'react';
import {
    Image,
    View,
    StyleSheet,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';


export default class Splash extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <View style={styles.header}>
                    <Animatable.Image
                        animation='bounceIn'
                        duration={1500}
                        source={require('../assets/logo.jpeg')}
                        style={styles.logo}
                        resizeMode='stretch'
                    />
                </View>
                <Animatable.View
                    style={styles.footer}
                    animation='fadeInUpBig'>
                    <Text style={styles.title}>Welcome to MakeMyTrip!</Text>
                    <Text style={styles.text}>Sign in with account</Text>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
                            <LinearGradient colors={['#5db8fe', '#39cff2']}
                                style={styles.signIn}>
                                <Text style={styles.textSign}>Get Started</Text>
                                <Image source={require('../assets/chevron.png')}
                                    style={styles.icon}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        )
    }
}

const { height } = Dimensions.get('screen');
const height_logo = height * 0.3 + 0.4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040e60'
    },

    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },

    logo: {
        width: height_logo,
        height: height_logo,
    },

    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },

    text: {
        color: 'gray',
        marginTop: 5,
    },

    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },

    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },

    textSign: {
        color: 'white',
        alignSelf: 'center'

    },

    icon: {
        height: 20,
        width: 20,
        alignSelf: 'center'
    }
});