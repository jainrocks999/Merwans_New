import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import Logo from "../../../assets/Logo/logo.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import { useSelector, useDispatch } from "react-redux";

const Splash = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useEffect(async () => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        console.log('this is id', customer_id);
        if (customer_id) {
            setTimeout(() => navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
            }), 2000);
        }
        else {
            setTimeout(() => navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            }), 2000);
        }

    }, []);

    useEffect(() => {
        dispatch({
            type: 'Get_Store_Request',
            url: 'apiproduct/getstore',
        });
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                {/* <Image source={require('../../../assets/Logo/logo.png')}/> */}
                {/* <SvgUri
                    width={100}
                    height={100}
                    uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
                /> */}
                <Logo height={150} width={150}/>
            </View>
        </View>
    )

}
export default Splash;