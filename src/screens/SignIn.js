import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';


export default class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            email: '',
            secureTextEntry: true

        }
    }

    signIn = async () => {
        if (this.state.email == '' || this.state.password == '') {
            Alert.alert('Error', "You've miseed something. Please check. ")
        } else {
            try {
                const doLogin = await auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                if (doLogin.user) {
                    this.props.navigation.navigate('Dashboard');
                }
            } catch (e) {
                Alert.alert(
                    'Alert from Firebase', e.message
                );
            }
        }
    };

    secureTextEntry() {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome Here!</Text>
                </View>
                <Animatable.View
                    animation='fadeInUpBig'
                    style={styles.footer}>
                    <Text style={styles.text_footer}>E-MAIL</Text>
                    <View style={styles.action}>
                        <Image
                            source={require('../assets/mail.png')}
                            style={styles.mailIcon}
                        />

                        <TextInput
                            placeholder='Your Email...'
                            style={styles.textInput}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                    </View>

                    <Text style={styles.text_footer, { marginTop: 30 }}>Password</Text>
                    <View style={styles.action}>
                        <Image
                            source={require('../assets/password.png')}
                            style={styles.passwordIcon}
                        />
                        {this.state.secureTextEntry ?
                            <TextInput
                                placeholder='Your Password...'
                                secureTextEntry={true}
                                style={styles.textInput}
                                value={this.state.password}
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                            :
                            <TextInput
                                placeholder='Your Password...'
                                style={styles.textInput}
                                value={this.state.password}
                                onChangeText={(text) => this.setState({ password: text })}
                            />}

                        <TouchableOpacity
                            onPress={() => this.secureTextEntry()}>
                            {this.state.secureTextEntry ?
                                <Image
                                    source={require('../assets/eyeoff.png')}
                                    style={{ width: 25, height: 25 }} />
                                :
                                <Image
                                    source={require('../assets/eyeon.png')}
                                    style={{ width: 25, height: 25 }} />}
                        </TouchableOpacity>
                    </View>
                    <Text
                        onPress={() => this.props.navigation.navigate('PasswordReset')}
                        style={{ color: '#009bd1', marginTop: 15 }}>Forgot Password?</Text>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => this.signIn()}>
                            <LinearGradient colors={['#5db8fe', '#39cff2']}
                                style={styles.signIn}>
                                <Text style={styles.textSign}>Sign in</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('SignUp')}
                            style={[styles.signUp, {
                                borderColor: '4dc2f8',
                                borderWidth: 1,
                                marginTop: 15
                            }]}>
                            <Text style={styles.textSignUp}>
                                Sign Up
                                    </Text>

                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        )


    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#05375a',
    },

    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },

    footer: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },

    text_header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },

    text_footer: {
        color: '#05375a',
        fontSize: 18
    },

    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },

    mailIcon: {
        height: 20,
        width: 20,
        alignSelf: 'center'
    },

    passwordIcon: {
        height: 23,
        width: 20,
        alignSelf: 'center'
    },

    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
    },

    button: {
        alignItems: 'center',
        marginTop: 50
    },

    signIn: {
        width: 410,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    textSign: {
        fontSize: 18,
        color: 'white'
    },

    textSignUp: {
        fontSize: 18,
        color: 'black'
    }
})