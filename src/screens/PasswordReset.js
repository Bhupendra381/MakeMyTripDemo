import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';


export default class PasswordReset extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
        }
    }

    reset = async () => {
        if (this.state.email == '') {
            Alert.alert('Error', "you haven't enter email. Please enter. ")
        } else {
            try {
                await auth().sendPasswordResetEmail(this.state.email);
                Alert.alert('Alert from Firebase', 'Email Send Successfully!')
                this.props.navigation.navigate('SignIn')
            } catch (e) {
                Alert.alert(
                    'Alert from Firebase', e.message
                );
            }
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Forgot Password?</Text>
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
                            placeholder='Enter Your E-mail Here...'
                            style={styles.textInput}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        {this.state.check_textInputChange ?
                            <Image
                                source={require('../assets/check.png')}
                                style={{ width: 25, height: 25 }} />
                            : null}
                    </View>
                    <Text
                        onPress={() => this.props.navigation.navigate('SignIn')}
                        style={{ color: '#009bd1', marginTop: 15 }}>Remember? Go back to Sign in!</Text>
                    <TouchableOpacity onPress={() => this.reset()}>
                        <View style={styles.button}>
                            <LinearGradient colors={['#5db8fe', '#39cff2']}
                                style={styles.signIn}>
                                <Text style={styles.textSign}>Reset Password</Text>
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

})