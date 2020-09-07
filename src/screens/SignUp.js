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


export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            email: '',
            password_confirm: '',
            secureTextEntry: true,
            secureTextEntry_confirm: true

        }
    }

    doSignUp = async () => {
        if (this.state.email == '' || this.state.password == '' || this.state.password_confirm == "") {
            Alert.alert('Error', "You've miseed something. Please check. ")
        }
        else if (this.state.password != this.state.password_confirm) {
            Alert.alert("Error", "Password don't match. Please Try Again ");
        } else {
            try {
                const doSign = await auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
                if (doSign.user) {
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

    secureTextEntryConfirm() {
        this.setState({
            secureTextEntry_confirm: !this.state.secureTextEntry_confirm
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

                    <Text style={styles.text_footer, { marginTop: 30 }}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Image
                            source={require('../assets/password.png')}
                            style={styles.passwordIcon}
                        />
                        {this.state.secureTextEntry_confirm ?
                            <TextInput
                                placeholder='Confirm Password...'
                                secureTextEntry={true}
                                style={styles.textInput}
                                value={this.state.password_confirm}
                                onChangeText={(text) => this.setState({ password_confirm: text })}
                            />
                            :
                            <TextInput
                                placeholder='Confirm Password...'
                                style={styles.textInput}
                                value={this.state.password_confirm}
                                onChangeText={(text) => this.setState({ password_confirm: text })}
                            />}

                        <TouchableOpacity
                            onPress={() => this.secureTextEntryConfirm()}>
                            {this.state.secureTextEntry_confirm ?
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
                        onPress={() => this.props.navigation.navigate('SignIn')}
                        style={{ color: '#009bd1', marginTop: 15 }}>
                        Already have an accound? Sign in
                    </Text>
                    <View style={styles.textPrivate}>
                        <Text style={styles.colorTextPrivate}>
                            By signing up you are agree to our
                        </Text>
                        <Text style={styles.colorTextPrivate, { fontWeight: 'bold' }}>
                            {' '}
                            Terms of Services
                        </Text>
                        <Text style={styles.colorTextPrivate}>
                            {' '}
                            And
                        </Text>
                        <Text style={styles.colorTextPrivate, { fontWeight: 'bold' }}>
                            {' '}
                            Privacy Policy
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.doSignUp()}>
                        <View style={styles.button}>
                            <LinearGradient colors={['#5db8fe', '#39cff2']}
                                style={styles.signIn}>
                                <Text style={styles.textSign}>Sign Up</Text>
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>
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

    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },

    colorTextPrivate: {
        color: 'gray'
    }
})