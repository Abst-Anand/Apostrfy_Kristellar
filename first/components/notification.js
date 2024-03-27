import React, { useState } from 'react';
import { Image, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Notification = (props) => {
    const [clickedIcons, setClickedIcons] = useState([]);

    const data = [
        {
            id: '58',
            post_title: 'Heavy weight',
            postimage: require('./assets/download.jpeg'),
            post_city: 'newYork',
            username: 'Tom',
            notification: 'sent you a message',
            time: '10:00',
        },
        {
            id: '57',
            post_title: 'HWe',
            postimage: require('./assets/download.jpeg'),
            post_city: 'India',
            username: 'Jerry',
            notification: 'sent you a connection request',
            time: '12:00',
        },
        {
            id: '56',
            post_title: 'HWe',
            postimage: require('./assets/girl.jpg'),
            post_city: 'India',
            username: 'Jerry',
            notification: 'sent you a connection request',
            time: '12:00',
        },
        {
            id: '56',
            post_title: 'Heavy weight',
            postimage: require('./assets/download.jpeg'),
            post_city: 'newYork',
            username: 'Puppy',
            notification: 'sent you a message',
            time: '10:00',
        },
    ];

    const handleIconClick = (id) => {
        if (!clickedIcons.includes(id)) {
            setClickedIcons([...clickedIcons, id]);
        } else {
            setClickedIcons(clickedIcons.filter(iconId => iconId !== id));
        }
    };

    const handleCrossButtonClick = (id) => {
        setClickedIcons(clickedIcons.filter(iconId => iconId !== id));
    };

    return (
        <View style={styles.container}>
            {/* <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', marginTop: 40, marginBottom: 20 }}>Notifications</Text> */}
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const isClicked = clickedIcons.includes(item.id);
                    return (
                        <View style={styles.content}>
                            <View style={styles.headerImageView}>
                                <Image style={styles.handerImage} source={item.postimage} />
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                                <View>
                                    <Text style={styles.username}>{item.username}</Text>
                                </View>
                                <View>
                                    <Text style={styles.noti}>{item.notification}</Text>
                                </View>
                            </View>
                            {item.notification === 'sent you a connection request' ? (
                                <View>
                                    <TouchableOpacity onPress={() => handleIconClick(item.id)}>
                                        <View style={styles.button}>
                                            <Icon name="check-square-o" size={30} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                    {isClicked && (
                                        <TouchableOpacity onPress={() => handleCrossButtonClick(item.id)}>
                                            <View style={styles.crossbutton}>
                                                <Icon name="times" size={20} color="red" style={styles.crossIcon} />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ) : (
                                <TouchableOpacity onPress={() => props.navigation.navigate("PrivateMessageScreen",{name: item.username, picture: item.postimage})}>
                                    <View style={styles.arrowButton}>
                                            <Icon name="arrow-right" size={30} color="white" />
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 15,
        backgroundColor: '#151918',
    },
    content: {
        flex: 1,
        width: '90%',
        padding: 2,
        marginVertical: 0,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxHeight: '80%',
        justifyContent: 'center',
    },
    handerImage: {
        width: 40,
        height: 50,
        borderRadius: 20,
        overflow: 'hidden',
    },
    headerImageView: {
        padding: 10,
        width: 40,
        height: 40,
        top: 15,
        right: 30,
        marginBottom: 5,
    },
    username: {
        color: '#FFFFFF',
        fontSize: 15,
        bottom: 18,
        fontWeight: 'bold',
    },
    noti: {
        color: '#646768',
        marginLeft: 3,
        bottom: 18,
    },
    button: {
        //flexDirection: 'row',
        left: 290,
        bottom: 35,
        width: 35,
        height: 35,
        backgroundColor: '#123445', // Set the background color of TouchableOpacity to transparent
        //padding: 5, // Adjust padding as needed
        borderRadius: 10, // Adjust border radius as needed
        borderWidth: 1, // Border width to create the outline effect
        borderColor: 'white',
        alignItems: 'center',
    },
    crossbutton: {
        flexDirection: 'row',
        alignItems: 'center',
        left: 320,
        bottom: 60,
    },
    crossIcon: {
        marginLeft: 5,
    },
    arrowButton: {
        left: 300,
        bottom: 35,
        width: 35,
        height: 35,
        backgroundColor: '#123445', // Set the background color of TouchableOpacity to transparent
        //padding: 5, // Adjust padding as needed
        borderRadius: 10, // Adjust border radius as needed
        borderWidth: 1, // Border width to create the outline effect
        borderColor: 'white',
        alignItems: 'center',
    },
    iconContainer: {
        //borderWidth: 1, // Border width to create outline for icon
        //borderColor: 'black', // Border color
        //borderRadius: 5, // Border radius to match parent button
    },
});
