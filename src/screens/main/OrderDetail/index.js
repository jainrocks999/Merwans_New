import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./style";
import Back from "../../../assets/Svg/back.svg";
import Check from '../../../assets/Svg/check1.svg';
import { useSelector } from 'react-redux';

const OrderDetail = () => {
    const navigation = useNavigation()
    const selector = useSelector(state => state.OrderDetail)
    console.log('this is selecor', selector.date_added);
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1 }} source={require('../../../assets/Icon/bg.png')}>
                {/* <View style={{ padding: 8 }}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View style={styles.title1}>
                        <Text style={styles.tag}>Order Detail</Text>
                    </View>
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
        paddingRight:30
    }}
                        onPress={() => navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', 
        justifyContent: 'center', }}>
                        <Text style={{color: '#ED1B1A', 
        fontFamily: 'Montserrat-Bold', 
        fontSize: 20 }}>Order Detail</Text>
                    </View>
                    <View style={{width:40}}/>
                </View>

                <View style={{ paddingHorizontal: 5 }}>
                    <View style={styles.item}>
                        <View style={{ paddingHorizontal: 8, marginTop: 6 }}>
                            <Text style={styles.id}>{`#${selector.order_id}`}</Text>
                            <Text style={styles.date}>{selector.date_added}</Text>
                            <Text style={styles.from}>Ordered From</Text>
                            <Text style={styles.pay}>{selector.payment_address}</Text>
                            <Text style={styles.to}>Delivered To</Text>
                            <Text style={styles.val}>{selector.shipping_address}</Text>
                        </View>


                        <View style={[styles.cont, { paddingHorizontal: 8, marginTop: 12 }]}>
                            <View style={styles.view1}>
                                <View
                                    style={styles.view}>
                                    <View style={styles.square} />
                                </View>
                                <View style={{ marginLeft: 6 }}>
                                    <Image source={require('../../../assets/Logo/cake1.png')} />
                                </View>
                                <View style={{ marginLeft: 5,marginTop:-1 }}>
                                    <Text style={styles.title}>{selector.products[0].model}</Text>
                                </View>
                            </View>
                            <View style={[styles.rView,]}>
                                <Text style={styles.rupay}>{`${selector.products[0].price}`}</Text>
                            </View>

                        </View>


                        <Text style={styles.sum}>Bill Summary</Text>

                        <View style={styles.views}>
                            <Text style={styles.iTotal}>Item Total</Text>
                            <View>
                                <Text style={[styles.total,{marginRight:1}]}>{selector.products[0].total}</Text>
                            </View>
                        </View>

                        <View style={styles.via}>
                            <Text style={styles.paid}>Paid Via Cash</Text>
                            <View>
                                <Text style={[styles.sel,{marginRight:1}]}>{`Total  ${selector.products[0].total}`}</Text>
                            </View>
                        </View>
                        <View style={styles.checkv}>
                            <View style={styles.check}>
                                <Check />
                                <Text style={styles.orders}>{`Order Delivered on ${selector.date_added} by ${selector.shipping_method}.`}</Text>
                            </View>
                        </View>
                    </View>

                </View>

            </ImageBackground>
            <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
    )
}
export default OrderDetail;


