import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity,StatusBar } from "react-native";
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import Back from "../../../assets/Svg/back.svg";
import Edit from '../../../assets/Svg/edit.svg';
import List from "../../../assets/Svg/check-list.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";


const MyAccountPage = () => {
    const navigation = useNavigation()
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')


    useEffect(async () => {
        const fname = await AsyncStorage.getItem(Storage.firstname)
        const lname = await AsyncStorage.getItem(Storage.lastname)
        const email = await AsyncStorage.getItem(Storage.email)
        const telephone = await AsyncStorage.getItem(Storage.telephone)
        setFname(fname)
        setLname(lname)
        setEmail(email)
        setTelephone(telephone)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ padding: 8 }}
                source={require('../../../assets/Icon/bg1.png')}>
                <TouchableOpacity style={styles.arrow}
                    onPress={() => navigation.goBack()}>
                    <Back />
                </TouchableOpacity>
                <View>
                    <View style={styles.bc}>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.view1}>
                <View style={styles.view2}>
                    <Image source={require('../../../assets/Logo/profile.png')} />
                    <Text style={styles.name}>{`${fname} ${lname}`}</Text>
                </View>
                <View style={styles.view}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MyOrders')}
                        style={styles.button}>
                        <List />
                        <Text
                            style={styles.text}>My Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile', {
                            fname: fname,
                            lname: lname,
                            email: email,
                            telephone: telephone
                        })}
                        style={styles.button}>
                        <Edit />
                        <Text
                            style={styles.text}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar backgroundColor={'#fff'} barStyle='dark-content'/>
        </View>
    )
}
export default MyAccountPage;