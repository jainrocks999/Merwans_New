import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity,StatusBar,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./style";
import Loader from "../../../components/Loader";
import Back from "../../../assets/Svg/back.svg";
import HTMLView from 'react-native-htmlview';

const Privacy = ({route}) => {
    const navigation = useNavigation()
    const selector = useSelector(state => state.Policy)
    const isFetching = useSelector(state => state.isFetching)
    const regex = /<br|\n|\r\s*\\?>/g;
    return (
        <View style={{ flex: 1 }}>
            {isFetching?<Loader/>:null}
            <ImageBackground 
            style={{ flex: 1,}} 
            source={require('../../../assets/Icon/bg.png')}>
               <View style={{ }}>
                    {/* <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View style={styles.view}>
                        <Text style={styles.my}>Privacy Policy</Text>
                    </View> */}
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
        fontSize: 20 }}>Privacy Policy</Text>
                    </View>
                    <View style={{width:40}}/>
                </View>
                    <ScrollView style={{marginTop:10,paddingHorizontal:10}}>
                    <HTMLView
                      value={`<div>${selector.trim().replace(regex, '')}</div>`}
                        
                    />
                    </ScrollView>
                </View>
            </ImageBackground>
            <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
    )
}
export default Privacy;