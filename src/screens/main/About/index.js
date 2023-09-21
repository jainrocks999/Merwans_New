import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import styles from "./style";
import Loader from "../../../components/Loader";
import Back from "../../../assets/Svg/back.svg";
import HTMLView from 'react-native-htmlview';


const About = ({ route }) => {
    const navigation = useNavigation()
    const selector = useSelector(state => state.Auth.About)
    const isFetching = useSelector(state => state.Auth.isFetching)
    // useEffect(() => {
    //     NetInfo.addEventListener(state => {
    //       if(!state.isConnected){
    //       showMessage({
    //         message:'Please connect to your internet',
    //         type:'danger',
    //       });
    //       }
    //     });
    //   },[])
    return (
        <View style={{ flex: 1 }}>
            {isFetching ? <Loader /> : null}
            <ImageBackground
                style={{ flex: 1, }}
                source={require('../../../assets/Icon/bg.png')}>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.touch}
                            onPress={() => navigation.goBack()}>
                            <Back />
                        </TouchableOpacity>
                        <View style={styles.icon}>
                            <Text style={styles.about}>About Us</Text>
                        </View>
                        <View style={{ width: 40 }} />
                    </View>
                    <ScrollView
                        style={styles.scroll}>
                        <HTMLView
                            addLineBreaks={false}
                            value={selector.replace(/\s*(<br \/> | <br>)\s*/gi, '<br\>')}
                        />
                    </ScrollView>
                </View>
            </ImageBackground>
            <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
    )
}
export default About;