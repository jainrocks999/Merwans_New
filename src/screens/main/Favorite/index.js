import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./style";
import Loader from "../../../components/Loader";
import Back from "../../../assets/Svg/back.svg";

const Favorite = ({route}) => {
    const navigation = useNavigation()
    const selector = useSelector(state => state.AddressList)
    const isFetching = useSelector(state => state.isFetching)
    
    return (
        <View style={{ flex: 1 }}>
            {isFetching?<Loader/>:null}
            <ImageBackground 
            style={{ flex: 1, padding: 6 }} 
            source={require('../../../assets/Icon/bg.png')}>
                <View style={{ padding: 2 }}>
                    <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View style={styles.view}>
                        <Text style={styles.my}>Favorite Orders</Text>
                    </View>
                </View>
            </ImageBackground>
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
        </View>
    )
}
export default Favorite;