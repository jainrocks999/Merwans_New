import React, { useEffect ,useState} from "react";
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity, StatusBar, BackHandler } from 'react-native';
import styles from './style'
import { useNavigation } from '@react-navigation/native';
import Back from "../../../assets/Svg/back.svg";
import Recorder from "../../../assets/Svg/recorder.svg";
import Forward from '../../../assets/Svg/forward.svg';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import Loader from "../../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";
import axios from "axios"
import Toast     from "react-native-simple-toast";

const MyOrders = ({ route }) => {
    const navigation = useNavigation()
    const selector = useSelector(state => state.Auth.OrderList)
    const isFetching = useSelector(state => state.Auth.isFetching)
    const [fetching,setFetching]=useState()
    const dispatch = useDispatch()

    const orderDetail = async (id) => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        dispatch({
            type: 'Order_Detail_Request',
            url: 'apiorder/orderinfo',
            customer_id: customer_id,
            order_id: id,
            navigation: navigation
        });
    }
    const manageNav = () => {
        if (route.params.page == 'Status') {
            navigation.navigate('Home')
        } else {
            navigation.goBack()
        }
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => backHandler.remove();
    }, []);

    function handleBackButtonClick() {
        if (route.params.page == 'Status') {
            navigation.navigate('Home')
        } else {
            navigation.goBack()
        }
    }

   const manageReOrder=async(order_id)=>{
       const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    try {
        setFetching(true)
        const data1 = new FormData();
        data1.append('orderId', order_id);
        data1.append('customerId', customer_id);
        
        const response = await axios({
            method: 'POST',
            data: data1,
            headers: {
                'content-type': 'multipart/form-data',
                Accept: 'multipart/form-data',
            },
            url: 'https://merwans.co.in/index.php?route=api/apiorder/reOrder',
        });
        console.log('this is response',response.data);
        if (response.data.status==true) {
            setFetching(false)
            Toast.show(response.data.message)
        }
        else {      
            setFetching(false)
        }
    } catch (error) {
        setFetching(false)
    }
    }
    
    return (
        <View style={{ flex: 1 }}>
            {isFetching || fetching ? <Loader /> : null}
            <ImageBackground style={{ flex: 1 }}
                source={require('../../../assets/Icon/bg.png')}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#232323',
                    height: 40
                }}>
                    <TouchableOpacity style={{
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        paddingRight: 30
                    }}
                        onPress={() => manageNav()}>
                        <Back />
                    </TouchableOpacity>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontFamily: 'Montserrat-Bold',
                            fontSize: 20
                        }}>Your Orders</Text>
                    </View>
                    <View style={{ width: 40 }} />
                </View>
                <View style={{ marginTop: 10 }}>
                </View>
                <View style={{}}>
                    <FlatList
                        data={selector}
                        style={{ marginBottom: 60 }}
                        renderItem={({ item }) => (
                            <View style={{}}>
                                <View style={styles.order}>
                                    <View style={styles.hash}>
                                        <Text style={styles.text}>{`#${item.order_id}`}</Text>
                                        <TouchableOpacity
                                            style={{ paddingLeft: 14, paddingVertical: 2 }}
                                            onPress={() => orderDetail(item.order_id)}>
                                            <Forward />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.row, { marginTop: 5 }]}>
                                        <View>
                                            <Text style={styles.from}>Ordered From</Text>
                                        </View>
                                        <View style={styles.row1}>
                                            <Text style={styles.delivered}>{item.status}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.delivered}>{item.store_name}</Text>
                                    <FlatList
                                        data={item.product_data}
                                        renderItem={({ item }) => (
                                            <View style={[styles.cont, { marginTop: 12 }]}>
                                                <View style={styles.view1}>
                                                    <View
                                                        style={styles.view}>
                                                        <View style={styles.square} />
                                                    </View>
                                                    <View style={{ marginLeft: 6, width: 38, height: 31, }}>
                                                        <Image style={{ width: 38, height: 31, }}
                                                            source={{ uri: item.image }} />
                                                    </View>
                                                    <View style={{ marginTop: -1, marginLeft: 5, width: '65%', }}>
                                                        <Text style={[styles.title,{fontSize:14}]}>{item.name}</Text>
                                                        <Text style={[styles.title,{fontSize:12}]}>{`Quantity  ${item.quantity}`}</Text>
                                                    </View>
                                                </View>
                                                <View style={[styles.rView]}>
                                                    <Text style={styles.rupay}>{`₹${parseInt(item.price).toFixed(2)}`}</Text>
                                                </View>
                                            </View>
                                        )}
                                    />
                                    <View style={{ borderWidth: 0.7, width: '16%', alignSelf: 'flex-end', marginTop: -5, borderColor: '#000000' }}>

                                    </View>
                                    <View style={styles.row3}>
                                        <Text style={styles.rupay}>{`${item.total}`}</Text>
                                    </View>
                                    <View style={styles.rest}>
                                        <View>
                                            <Text style={styles.rupay}>{item.date_added}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => manageReOrder(item.order_id)}
                                            style={styles.main}>
                                            <Recorder />
                                            <Text style={styles.recover}>Reorder</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ height: 5 }} />
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ImageBackground>
            <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
    )
}
export default MyOrders;

