import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ImageBackground, TextInput, FlatList, TouchableOpacity, StatusBar, Platform } from "react-native";
import BottomTab from "../../../components/BottomTab";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import styles from "./style";
import Header from "../../../components/Header";
import { RadioButton } from 'react-native-paper';
import Fast from "../../../assets/Svg/fast-delivery1.svg";
import Delivery from "../../../assets/Svg/fast-delivery.svg";
import Option from "../../../assets/Svg/option.svg";
import Plus from '../../../assets/Svg/plus1.svg';
import { Checkbox } from "native-base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from 'react-native-select-dropdown'
import RNPickerSelect from 'react-native-picker-select';
import Done from '../../../assets/Svg/Done.svg';

const data2 = [
    {
        label: "10:20-12:40",
        value: "10:20"
    },
    {
        label: "10:30-01:00",
        value: "10:30"
    },
    {
        label: "10:40-02:30",
        value: "10:50"
    }
]

const Payment = ({ route }) => {
    const navigation = useNavigation()
    const [dunzo, setDunzo] = useState('checked')
    const [pick, setPick] = useState('unchecked')
    const [mcpg, setMcpg] = useState('checked')
    const [online, setOnline] = useState('unchecked')
    const [cash, setCash] = useState('unchecked')
    const inputRef = React.useRef()
    const [isFetching, setFetching] = useState(false)
    const [state, setState] = useState(0)
    const [data, setData] = useState(route.params.data)
    const selector = useSelector(state => state.Shipping)
    const selector1 = useSelector(state => state.Time)
    console.log(selector.shipping_methods.dunzo.quote.dunzo.title, selector1);

    const manageDunzo = () => {
        setDunzo('checked')
        setPick('unchecked')
    }
    const managePick = () => {
        setDunzo('unchecked')
        setPick('checked')
    }
    const manageMcpg = () => {
        setMcpg('checked')
        setOnline('unchecked')
        setCash('unchecked')
    }
    const manageOnline = () => {
        setMcpg('unchecked')
        setOnline('checked')
        setCash('unchecked')
    }
    const manageCash = () => {
        setMcpg('unchecked')
        setOnline('unchecked')
        setCash('checked')
    }


    const updateCart = async (item) => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        if (item.quantity > 1) {
            try {
                setFetching(true)
                const data = new FormData();
                data.append('api_token', '');
                data.append('customer_id', customer_id);
                data.append('cart_id', item.cart_id);
                data.append('quantity', parseInt(item.quantity) - 1);
                const response = await axios({
                    method: 'POST',
                    data,
                    headers: {
                        'content-type': 'multipart/form-data',
                        Accept: 'multipart/form-data',
                    },
                    url: 'https://merwans.co.in/index.php?route=api/apiorder/update_to_cart',
                });

                if (response.data) {
                    setData(response.data)
                    setFetching(false)
                    console.log('this is response data', response.data.products);
                }
                else {
                    setFetching(false)
                }
            } catch (error) {
                setFetching(false)
            }
        }
    }
    const updateCart1 = async (item) => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        try {
            setFetching(true)
            const data = new FormData();
            data.append('api_token', '');
            data.append('customer_id', customer_id);
            data.append('cart_id', item.cart_id);
            data.append('quantity', parseInt(item.quantity) + 1);
            const response = await axios({
                method: 'POST',
                data,
                headers: {
                    'content-type': 'multipart/form-data',
                    Accept: 'multipart/form-data',
                },
                url: 'https://merwans.co.in/index.php?route=api/apiorder/update_to_cart',
            });

            if (response.data) {
                setData(response.data)
                setFetching(false)
                console.log('this is response data', response.data.products);
            }
            else {
                setFetching(false)
            }
        } catch (error) {
            setFetching(false)
        }
    }
    const version = Platform.OS
    return (
        <View style={{ flex: 1 }}>
            {isFetching ? <Loader /> : null}
            <ImageBackground style={{ flex: 1 }} source={require('../../../assets/Icon/bg.png')}>
                <ScrollView stickyHeaderIndices={[0]}>
                    <Header
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    />
                    <View
                        style={styles.container}>
                        <Text style={styles.quick}>Quick Checkout</Text>
                    </View>
                    <View style={{ paddingHorizontal: 5 }}>
                        <View style={[styles.ship, { marginTop: 15 }]}>
                            <Text style={styles.shipp}>Shipping Method</Text>
                            <View style={styles.checkV}>
                                <Fast />
                                <View style={[{ marginLeft: 6 }]}>
                                    {dunzo == 'checked' ? <RadioButton
                                        value="first"
                                        status={dunzo}
                                        onPress={() => manageDunzo()}
                                        uncheckedColor='#ED1B1A'
                                        color='#ED1B1A'
                                    /> :
                                        version == 'ios' ?
                                            <TouchableOpacity onPress={() => manageDunzo()}
                                                style={{ margin: 5 }}>
                                                <Done width={26} height={25} />
                                            </TouchableOpacity> :
                                            <RadioButton
                                                value="first"
                                                status={dunzo}
                                                onPress={() => manageDunzo()}
                                                uncheckedColor='#ED1B1A'
                                                color='#ED1B1A'
                                            />
                                    }
                                </View>
                                <Text style={styles.dunzo}>{`${selector.shipping_methods.dunzo.quote.dunzo.title} - ${selector.shipping_methods.dunzo.quote.dunzo.text}`}</Text>
                            </View>
                            <View style={styles.pick}>
                                <Delivery />
                                <View style={[{ marginLeft: 6 }]}>
                                    {pick == 'checked' ? <RadioButton
                                        value="first"
                                        status={pick}
                                        onPress={() => managePick()}
                                        uncheckedColor='#ED1B1A'
                                        color='#ED1B1A'
                                    /> :
                                        version == 'ios' ?
                                            <TouchableOpacity onPress={() => managePick()}
                                                style={{ margin: 5 }}>
                                                <Done width={26} height={25} />
                                            </TouchableOpacity> :
                                            <RadioButton
                                                value="first"
                                                status={pick}
                                                onPress={() => managePick()}
                                                uncheckedColor='#ED1B1A'
                                                color='#ED1B1A'
                                            />
                                    }
                                </View>
                                <Text style={styles.dunzo}>{`${selector.shipping_methods.pickup.quote.pickup.title} - ${selector.shipping_methods.pickup.quote.pickup.text}`}</Text>
                            </View>
                            {pick == 'checked' ? <View style={styles.view1}>
                                <Text style={styles.time}>{'Pickup Time'}</Text>
                                <View
                                    style={styles.drop}>
                                    <RNPickerSelect
                                        onValueChange={val => setState(val)}
                                        items={data2}
                                        style={{
                                            inputAndroid: {
                                                color: '#000000',
                                                width: '100%',
                                                fontSize: 14,
                                                marginBottom: 0,
                                                fontFamily: 'Montserrat-Medium',
                                                includeFontPadding: false, padding: 0, margin: 0,
                                                marginRight: 20
                                            },
                                            inputIOS: {
                                                color: '#000000',
                                                width: '100%',
                                                fontSize: 14,
                                                marginBottom: 0,
                                                fontFamily: 'Montserrat-Medium',
                                                includeFontPadding: false, padding: 0, margin: 0,
                                                marginRight: 20
                                            },
                                            placeholder: {
                                                color: '#000000',
                                                width: '100%',
                                                fontSize: 14,
                                                marginBottom: 0,
                                                fontFamily: 'Montserrat-Medium',
                                                includeFontPadding: false, padding: 0, margin: 0,
                                                marginRight: 20
                                            },
                                        }}
                                        value={state == null || state == 0 ? '' : state}
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{ label: 'Time', value: '' }}
                                        Icon={() => (
                                            <Image
                                                style={{ width: 10, height: 6, marginRight: 0, marginTop: 8 }}
                                                source={require('../../../assets/Icon/down.png')} />
                                        )}
                                    />
                                </View>
                            </View> : null}
                        </View>

                        <View style={[styles.ship, { marginTop: 15 }]}>
                            <Text style={styles.pay}>Payment Method</Text>
                            <View style={styles.view2}>
                                <View style={[{ marginLeft: -7 }]}>
                                    {mcpg == 'checked' ? <RadioButton
                                        value="first"
                                        status={mcpg}
                                        onPress={() => manageMcpg()}
                                        uncheckedColor='#ED1B1A'
                                        color='#ED1B1A'
                                    /> :
                                        version == 'ios' ?
                                            <TouchableOpacity onPress={() => manageMcpg()}
                                                style={{ margin: 5 }}>
                                                <Done width={26} height={25} />
                                            </TouchableOpacity> :
                                            <RadioButton
                                                value="first"
                                                status={mcpg}
                                                onPress={() => manageMcpg()}
                                                uncheckedColor='#ED1B1A'
                                                color='#ED1B1A'
                                            />
                                    }
                                </View>
                                <Text style={styles.cc}>{'CCAvenue MCPG'}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[{ marginLeft: -7, marginTop: -7 }]}>
                                    {online == 'checked' ? <RadioButton
                                        value="first"
                                        status={online}
                                        onPress={() => manageOnline()}
                                        uncheckedColor='#ED1B1A'
                                        color='#ED1B1A'
                                    /> :
                                        version == 'ios' ?
                                            <TouchableOpacity onPress={() => manageOnline()}
                                                style={{ margin: 5 }}>
                                                <Done width={26} height={25} />
                                            </TouchableOpacity> :
                                            <RadioButton
                                                value="first"
                                                status={online}
                                                onPress={() => manageOnline()}
                                                uncheckedColor='#ED1B1A'
                                                color='#ED1B1A'
                                            />
                                    }
                                </View>
                                <View
                                    style={{ width: '90%', marginLeft: 3 }}>
                                    <Option width={'100%'} />
                                </View>
                            </View>
                            <View style={styles.first}>
                                <View style={[{ marginLeft: -7 }]}>
                                    {cash == 'checked' ? <RadioButton
                                        value="first"
                                        status={cash}
                                        onPress={() => manageCash()}
                                        uncheckedColor='#ED1B1A'
                                        color='#ED1B1A'
                                    /> :
                                        version == 'ios' ?
                                            <TouchableOpacity onPress={() => manageCash()}
                                                style={{ margin: 5 }}>
                                                <Done width={26} height={25} />
                                            </TouchableOpacity> :
                                            <RadioButton
                                                value="first"
                                                status={cash}
                                                onPress={() => manageCash()}
                                                uncheckedColor='#ED1B1A'
                                                color='#ED1B1A'
                                            />
                                    }
                                </View>
                                <Text style={styles.cash}>{'Cash On Delivery'}</Text>
                            </View>
                        </View>
                        <View style={[styles.ship, { marginTop: 15 }]}>
                            <View>
                                <Text style={styles.coupon}>Apply Coupon</Text>
                            </View>
                            <View style={styles.apply}>
                                <View style={[styles.input]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder='Enter your coupon here'
                                        placeholderTextColor={'#000000'}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.btn}>
                                    <Text
                                        style={styles.aware}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.ship, { marginTop: 15 }]}>
                            <View>
                                <Text style={styles.order}>Your Order</Text>
                                <View style={{ marginTop: -3 }}>
                                    <FlatList
                                        data={data.products}
                                        renderItem={({ item }) => (
                                            <View style={styles.border}>
                                                <View style={styles.color}>
                                                    <View
                                                        style={styles.flex}>
                                                        <View style={styles.line} />
                                                    </View>
                                                    <View style={{ marginLeft: 12 }}>
                                                        <Image
                                                            style={{ height: 38, width: 38, borderRadius: 5 }}
                                                            source={{ uri: item.image }} />
                                                    </View>
                                                    <View style={{ marginTop: -1, marginLeft: 2 }}>
                                                        <Text style={styles.data}>{item.name}</Text>
                                                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                                            <Text style={styles.pri}>{item.price}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: 'center' }}>
                                                    <View
                                                        style={styles.cont}>
                                                        <TouchableOpacity
                                                            style={styles.uri}
                                                            onPress={() => updateCart(item)}>
                                                            <Image source={require('../../../assets/Icon/minus.png')} />
                                                        </TouchableOpacity>
                                                        <Text style={{ fontSize: 11, color: '#ED1717' }}>{item.quantity}</Text>
                                                        <TouchableOpacity
                                                            style={styles.uri}
                                                            onPress={() => updateCart1(item)}>
                                                            <Plus />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.bottom}>
                                                        <Text style={styles.pric}>{item.total}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.ship, { marginTop: 15 }]}>
                            <View>
                                <View style={styles.bill}>
                                    <Text style={styles.bll}>Bill Summary</Text>
                                    <View style={styles.row1}>
                                        <Text style={styles.sub}>Sub-Total</Text>
                                        <Text style={styles.rok}>{data.totals[0].text}</Text>
                                    </View>

                                    <View style={styles.row2}>
                                        <Text style={styles.total}>Total</Text>
                                        <Text style={styles.sp}>{data.totals[1].text}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <View style={[styles.ship, { marginTop: 15 }]}>
                            <View>
                                <Text style={styles.bll}>Confirm Your Order</Text>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => inputRef.current.focus()}
                                    style={styles.touch}>
                                    <TextInput
                                        ref={inputRef}
                                        placeholderTextColor={'#000000'}
                                        style={styles.input1}
                                        placeholder='Add Comments About Your Order'
                                        multiline={true}
                                    />
                                </TouchableOpacity>
                                <View style={[styles.view, { marginTop: 10 }]}>
                                    <Checkbox
                                        value="red"
                                        size="sm"
                                        defaultIsChecked={false}
                                        colorScheme='green'
                                        borderRadius={'none'}
                                        borderWidth={1.2}
                                    />
                                    <Text style={[styles.check1, { width: '96%', marginLeft: 10, marginTop: 7 }]}>I wish to subscribe to the Merwans Confectioners Pvt. Ltd. newsletter.</Text>
                                </View>
                                <View style={styles.view}>
                                    <Checkbox
                                        value="red"
                                        size="sm"
                                        defaultIsChecked={false}
                                        colorScheme='green'
                                        borderRadius={'none'}
                                        borderWidth={1.2}
                                    />
                                    <View style={styles.have}>
                                        <Text style={styles.check1}>{'I have read and agree to the '}</Text>
                                        <View>
                                            <Text style={styles.priv}>
                                                Privacy Policy</Text>
                                            <View style={{ borderWidth: 0.2 }} />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.views}>
                                    <Checkbox
                                        value="red"
                                        size="sm"
                                        defaultIsChecked={false}
                                        colorScheme='green'
                                        borderRadius={'none'}
                                        borderWidth={1.2}

                                    />
                                    <View style={styles.amage}>
                                        <Text style={styles.check1}>{'I have read and agree to the '}</Text>
                                        <View>
                                            <Text style={styles.term}>
                                                {'Terms & Conditions'}</Text>
                                            <View style={{ borderWidth: 0.2 }} />
                                        </View>
                                    </View>
                                </View>

                                <View style={{ paddingHorizontal: 0 }}>
                                    <TouchableOpacity
                                        // onPress={()=>navigation.navigate('ProfileWithoutLogin')}
                                        style={styles.mainBtn}>
                                        <Text
                                            style={styles.confirm1}>{`Confirm Order`}</Text>
                                    </TouchableOpacity>
                                    <View style={{ height: 10 }} />
                                </View>
                            </View>
                        </View>


                        <View style={{ height: 20 }} />
                    </View>
                </ScrollView>
            </ImageBackground>


            <BottomTab />
            <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
    )
}
export default Payment;

const data1 = [
    { image: require('../../../assets/Logo/cake1.png'), title: 'Pineapple Cake', price: '₹290.00' },

]
const Store = ["Egypt", "Canada", "Australia", "Ireland", "Egypt", "Canada", "Australia", "Ireland"]