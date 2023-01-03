import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity,StatusBar,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./style";
import Loader from "../../../components/Loader";
import Back from "../../../assets/Svg/back.svg";
import HTMLView from 'react-native-htmlview';



const About = ({route}) => {
    const navigation = useNavigation()
    const selector = useSelector(state => state.About)
    const isFetching = useSelector(state => state.isFetching)
    console.log('this is abbout dta',selector);
    const regex = /<br|\n|\r\s*\\?>/g;
    return (
        <View style={{ flex: 1 }}>
            {isFetching?<Loader/>:null}
            <ImageBackground 
            style={{ flex: 1, }} 
            source={require('../../../assets/Icon/bg.png')}>
               <View style={{ }}>
                     <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    backgroundColor:'#232323',
                    height:40
                     }}>
                    <TouchableOpacity style={{
        paddingHorizontal:10,
        paddingVertical:8,
        paddingRight:30}}
                        onPress={() => navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', 
        justifyContent: 'center', }}>
                        <Text style={{color: '#ED1B1A', 
        fontFamily: 'Montserrat-Bold', 
        fontSize: 20 }}>About Us</Text>
                    </View>
                    <View style={{width:40}}/>
                </View>
                    
                    <ScrollView style={{marginTop:10,paddingHorizontal:10}}>
                    <HTMLView
                    //    value={selector.trim().replace(regex, '  ')}
                       value={`<div>${selector.trim().replace(regex, '')}</div>`}
                    />
                    </ScrollView>
                </View>
            </ImageBackground>
            <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
    )
}
export default About;