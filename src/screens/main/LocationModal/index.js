import React from "react";
import { View, Text, TouchableOpacity, TextInput ,Image,Tou} from "react-native";
import Down from '../../../assets/Svg/down.svg';
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import Search1 from "../../../assets/Svg/search1.svg";
import Forward from "../../../assets/Svg/forward.svg";
import Location from '../../../assets/Svg/location.svg';
import Multi from "../../../assets/Svg/multi.svg";

const Modal = ({route}) => {
    const navigation = useNavigation()
    const manage=()=>{
        // navigation.goBack()
        navigation.navigate('Address')
    }
    return (
        <View style={{ flex: 1, padding: 15 }}>
            <TouchableOpacity
            activeOpacity={1}
                onPress={() => navigation.goBack()}
                style={styles.main}>
                <Multi />
                <Text style={styles.select}>Select Your Location</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 15, paddingHorizontal: 0 }}>
                <View style={styles.container}>
                    <Search1 />
                    <TextInput
                        placeholder="Search for area, street name..."
                        style={styles.search}
                        placeholderTextColor={'#6A6A6A'}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={()=>manage()} style={styles.view}>
                <View style={styles.cont}>
                    <Location/>
                    <View style={{marginLeft:10}}>
                    <Text style={styles.use}>Use current location</Text>
                    <Text style={styles.res}>{`${route.params.add1}, ${route.params.add2}, ${route.params.add3}`}</Text>
                    </View>
                </View>
                <View>
                   <Forward/>
                </View>
            </TouchableOpacity>
            <View style={styles.recentV} />
           <View style={{ marginTop: 15, }}>
               <Text style={styles.recent}>
                   Recent Location
               </Text>
            <View style={styles.clockV}>
                <Image source={require('../../../assets/Icon/clock.png')}/>
                <Text style={styles.text}>{`${route.params.add1}, ${route.params.add2}, ${route.params.add3}`}</Text>
            </View>
            <View style={styles.border} />
            </View>
        </View>
    )
}
export default Modal;