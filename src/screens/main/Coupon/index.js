import React from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import Back from "../../../assets/Svg/back.svg";

const Coupon = () => {
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1 }} 
            source={require('../../../assets/Icon/bg.png')}>
                <View style={{ padding: 8 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#ED1717', fontFamily: 'Montserrat-Bold', fontSize: 22 }}>Coupons For You</Text>
                    </View>
                    <View style={{ marginTop: 14 }}>
                        <View style={styles.main}>
                            <View style={[styles.view, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                <TextInput
                                    style={{ fontFamily: 'Montserrat-Medium', fontSize: 12, includeFontPadding: false, padding: 0, margin: 0, }}
                                    placeholder='Type coupon code here       '
                                    placeholderTextColor={'#000000'}
                                />
                                <Text
                                    style={styles.apply}>Apply</Text>

                            </View>

                        </View>
                    </View>
                    <View style={styles.cart}>
                        <Text style={styles.off}>50% OFF upto ₹100.00 </Text>
                        <View style={[styles.space, { marginTop: 5 }]}>
                            <View style={{ borderWidth: 1, borderColor: '#FB8019', paddingHorizontal: 3, }}>
                                <Text style={styles.welcome}>WELCOME 50</Text>
                            </View>
                            <View>
                                <Text
                                    style={styles.detail}>View Details</Text>
                            </View>
                        </View>
                        <View style={{ borderWidth: 0.5, marginTop: 7, borderStyle: 'dashed' }} />
                        <View style={[styles.space, { marginTop: 9 }]}>
                            <Text style={styles.save}>Save ₹90.00 with this code</Text>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.ly}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
export default Coupon;