import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    useWindowDimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import AppText from "../components/AppText";
import Layout from "../constants/Layout";
import Theme from "../constants/Theme";
import FontSize from "../constants/FontSize";
import auth from '@react-native-firebase/auth';

export default function Dashboard({ navigation }) {

    const width = useWindowDimensions().width;
    const height = width * 0.6;

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [active, setActive] = useState(0);

    const images = [
        {
            location: 'New Delhi',
            image: 'https://cf.bstatic.com/images/hotel/max1024x768/424/42404017.jpg'
        },
        {
            location: 'Mumbai',
            image: 'https://cf.bstatic.com/images/hotel/max1024x768/103/103705059.jpg',
        },
        {
            location: 'Bangalore',
            image: 'https://cf.bstatic.com/images/hotel/max1024x768/109/109404369.jpg'
        },
        {
            location: 'Chennai',
            image: 'https://res.cloudinary.com/simplotel/image/upload/x_0,y_0,w_2560,h_1442,r_0,c_crop,q_90,fl_progressive/w_1500,c_fit,f_auto/hablis-hotel-chennai/Facade_Hablis_Hotel_-_luxury_business_hotel_near_Chennai_Airport_8'
        },
        {
            location: 'Hyderabad',
            image: 'https://cf.bstatic.com/images/hotel/max1024x768/574/57461655.jpg'
        },
        {
            location: 'Kolkata',
            image: 'https://www.hospitalitynet.org/picture/xxl_153102313.jpg?t=20190621113357'
        },
    ];

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
        );
        if (slide !== active) {
            setActive(slide);
        }
    };

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    if (!user) {
        return navigation.navigate('SignIn');
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Theme.gradient.start, Theme.gradient.end]}
                style={styles.headerContainer}
            >
                <View style={styles.header}>
                    <AppText style={styles.screenTitle}>Welcome, {user.email} </AppText>
                    <TouchableOpacity
                        style={[styles.headerIconContainer, styles.myLogoutContainer]}
                        onPress={() => { auth().signOut() }}
                    >
                        <Image
                            source={require("../assets/logout.png")}
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showHorizontalScrollIndicator={false}
                style={{ width, height }}>
                {images.map((item, index) => (
                    <Image
                        key={index}
                        source={{ uri: item.image }}
                        style={{ width, height, resizeMode: 'cover' }}
                    />
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {images.map((item, index) => (
                    <Text key={index} style={index == active ? styles.activeDot : styles.dot}>
                        •
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        justifyContent: "flex-start",
        height: 70 * Layout.ratio,
        paddingHorizontal: 20,
        paddingTop: Layout.statusBarHeight,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        height: 10 * Layout.ratio,
        marginTop: 10 * Layout.ratio,
    },
    headerIconContainer: {
        height: 26 * Layout.ratio,
        width: 26 * Layout.ratio,
        justifyContent: "center",
        alignItems: "center",
    },
    headerIcon: {
        height: 26 * Layout.ratio,
        width: 26 * Layout.ratio,
        resizeMode: "contain",
    },
    myLogoutContainer: {
        marginLeft: "auto",
    },
    screenTitle: {
        fontSize: FontSize[10],
        fontWeight: "bold",
        color: Theme.bright,
        marginLeft: 16 * Layout.ratio,
        marginTop: -4,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -15,
        alignSelf: 'center',
    },
    dot: {
        color: '#888',
        fontSize: 50,
    },
    activeDot: {
        color: '#FFF',
        fontSize: 50,
    },
});