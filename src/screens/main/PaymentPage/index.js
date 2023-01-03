import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ImageBackground, TextInput, FlatList, TouchableOpacity,StatusBar } from "react-native";
import BottomTab from "../../../components/BottomTab";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Header from "../../../components/Header";
import Done from '../../../assets/Svg/Done.svg';
import Multi from '../../../assets/Svg/multiply.svg';
import Plus from '../../../assets/Svg/plus1.svg';
import Location from '../../../assets/Svg/location.svg';
import styles from "./style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import Loader from "../../../components/Loader";
import { useDispatch,useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyAEAzAu0Pi_HLLURabwR36YY9_aiFsKrsw");

const Payment = () => {
    const navigation = useNavigation()
    const [instruction, setInstruction] = useState(false)
    const [isFetching, setFetching] = useState(false)
    const [data, setData] = useState('')
    const selector=useSelector(state=>state.Address)
    const isFetching1=useSelector(state=>state.isFetching)
    console.log('this is all data',selector);
    const dispatch=useDispatch()

    useEffect(async () => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        const id=await AsyncStorage.getItem(Storage.store_id)

        try {
            setFetching(true)
            const data = new FormData();
            data.append('api_token', '');
            data.append('customer_id', customer_id);
            const response = await axios({
                method: 'POST',
                data,
                headers: {
                    'content-type': 'multipart/form-data',
                    Accept: 'multipart/form-data',
                },
                url: 'https://merwans.co.in/index.php?route=api/apiorder/cart',
            });

            if (response.data) {
                setData(response.data)
                setFetching(false)
            }
            else {
                setFetching(false)
            }
        } catch (error) {
            setFetching(false)
        }

        dispatch({
            type: 'Shipping_List_Request',
            url: 'apiorder/shippingMethods',
            navigation:navigation
          });
        
        dispatch({
            type: 'Time_Drop_Request',
            url: 'apiorder/orderpickuptime',
            store_id:id
          });
    }, [0])

    const updateCart = async (item) => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        if(item.quantity){
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
            }
            else {
                setFetching(false)
            }
        } catch (error) {
            setFetching(false)
        }
    }
    const manageAddress=async()=>{
    //    navigation.navigate('Address')
       const customer_id=await AsyncStorage.getItem(Storage.customer_id)
       const id = await AsyncStorage.getItem("Address_id")
       dispatch({
         type: 'Address_List_Request',
         url: 'apiorder/addressList',
         customer_id:customer_id,
         from:'cart',
         navigation:navigation
       });
    //    dispatch({
    //     type: 'Get_Address_Request1',
    //     url: 'apiorder/addressById',
    //     customer_id:customer_id,
    //     address_id:id,
    //     navigation:navigation
    //   });
      }
      const manageAddress1=async()=>{
        const customer_id=await AsyncStorage.getItem(Storage.customer_id)
        // dispatch({
        //   type: 'Address_List_Request',
        //   url: 'apiorder/addressList',
        //   customer_id:customer_id,
        //   from:'cart',
        //   navigation:navigation
        // });
        navigation.navigate('AddressForm',{from:'cart'})
      }
      const manageDunzo=async()=>{
        const store_id=await AsyncStorage.getItem(Storage.store_id)
        const customer_id=await AsyncStorage.getItem(Storage.customer_id)
        Geocoder.from(`${selector.address_1} ${selector.address_2} ${selector.city}`)
        .then(async(json) => {
          var location = json.results[0].geometry.location;
         if(location&&store_id){
            try {
                setFetching(true)
                const data1 = new FormData();
                data1.append('store_id',2);
                data1.append('customer_id', customer_id);
                data1.append('latitude', location.lat);
                data1.append('longitude',location.lng);
                const response = await axios({
                    method: 'POST',
                    data:data1,
                    headers: {
                        'content-type': 'multipart/form-data',
                        Accept: 'multipart/form-data',
                    },
                    url: 'https://merwans.co.in/index.php?route=api/apiorder/dunzo',
                });
    
                if (response.data) {
                    navigation.navigate('Quick',{
                        data:data,
                        dunzo:response.data
                    })
                    setFetching(false)
                }
                else {
                    setFetching(false)
                }
            } catch (error) {
                setFetching(false)
            }
         }
         else{
             Toast.show('Something went wrong')
         }
        })
        .catch(error => console.warn(error));
       
      }
    return (
        <View style={{ flex: 1 }}>
            {isFetching ||isFetching1 ? <Loader /> : null}
            <ImageBackground style={{ flex: 1 }} source={require('../../../assets/Icon/bg.png')}>
               <ScrollView stickyHeaderIndices={[0]}>
                    <Header
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    />
                     {data && data.products.length>0?<View style={{ paddingHorizontal: 5 }}>
                        <View style={styles.main}>
                            <View style={styles.row}>
                                <View
                                    style={styles.done}>
                                    <Done />
                                </View>
                                <Text
                                    style={styles.you}>You can order for same day before 7pm or 8pm</Text>
                            </View>
                            <Multi />
                        </View>
                        <View style={styles.your}>
                            <Text style={styles.order}>Your Order</Text>
                            <View style={{ marginTop: -3 }}>
                                <FlatList
                                    data={data?data.products:[]}
                                    renderItem={({ item }) => (
                                        <View style={[styles.list,{marginTop:10}]}>
                                            <View style={[styles.row,]}>
                                                <View
                                                    style={styles.sq}>
                                                    <View style={styles.dot} />
                                                </View>
                                                <View style={{ marginLeft: 12 }}>
                                                    <Image style={{height:38,width:38,borderRadius:5}} source={{uri:item.image}} />
                                                </View>
                                                <View style={{ marginTop: -1,marginLeft:2 }}>
                                                    <Text style={styles.name}>{item.name}</Text>
                                                    <View style={{ flexDirection: 'row',marginTop:3 }}>
                                                        <Text style={styles.price}>{item.price}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <View
                                                    style={styles.view}>
                                                    <TouchableOpacity
                                                        style={{
                                                            height: 20,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: 20
                                                        }}
                                                        onPress={() => updateCart(item)}>
                                                        <Image source={require('../../../assets/Icon/minus.png')} />
                                                    </TouchableOpacity>
                                                    <Text style={{ fontSize: 11, color: '#ED1717' }}>{item.quantity}</Text>
                                                    <TouchableOpacity
                                                        style={{
                                                            height: 20,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: 20
                                                        }}
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
                        <TouchableOpacity
                            onPress={() => setInstruction(true)}
                            style={styles.inst}>
                            {instruction ? <TextInput
                                style={styles.input}
                                placeholder='Add Instructions'
                                placeholderTextColor={'#000000'}
                                multiline={true}
                            />
                                : <Text style={styles.add}>Add Instructions</Text>}
                        </TouchableOpacity>
                       {/* {data.products[0].option[1].value? <View style={styles.apply}>
                            <View>
                                <Text style={styles.coupon}>Message on Cake</Text>
                            </View>
                           <Text style={[styles.floor,{marginTop:3}]}>{data.products[0].option[1].value}</Text>
                        </View>:null} */}
                        {/* Apply Coupon */}
                        <View style={styles.apply}>
                            <View>
                                <Text style={styles.coupon}>Apply Coupon</Text>
                            </View>
                            <View style={styles.cont}>
                                <View style={styles.border}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder='Enter your coupon here'
                                        placeholderTextColor={'#000000'}
                                    />
                                </View>
                                <TouchableOpacity

                                    style={styles.btn}>
                                    <Text
                                        style={styles.app}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Bill Summery */}
                        <View style={styles.sum}>
                            <View style={{
                                width: '100%',
                            }}>
                                <Text style={styles.bill}>Bill Summary</Text>
                                <View style={styles.row1}>
                                    <View style={styles.row}>
                                        <Text style={styles.sub}>Sub-Total</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.total}>{data?data.totals[0].text:0}</Text>
                                    </View>
                                </View>

                                <View style={styles.row2}>
                                    <Text style={styles.class}>Total</Text>
                                    <View style={styles.row}>
                                        <Text style={styles.last}>{data?data.totals[1].text:0}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                        {/* Delivery At Home */}
                       {selector? <TouchableOpacity onPress={()=>manageAddress()} style={styles.dele}>
                            <View style={{marginTop:-12}}>
                            <Location />
                            </View>
                            <View style={{ marginLeft: 8, width: '92%' }}>
                                <View style={styles.view1}>
                                   
                                  <Text style={styles.home}>{`Delivery at ${selector.type}`}</Text>
                                  <TouchableOpacity 
                                  onPress={()=>manageAddress()}
                                  style={styles.btn1}>
                                      <Text style={styles.change}>Change</Text>
                                  </TouchableOpacity>
                                </View>
                                <Text style={styles.floor}>{`${selector.address_1} ${selector.address_2} ${selector.city}`}</Text>
                            </View>
                        </TouchableOpacity>:null}
                  

                    <View style={{ paddingHorizontal: 15 }}>
                      { selector? <TouchableOpacity
                            onPress={() => manageDunzo()}
                            style={styles.btns}>
                            <Text style={styles.pro}>{`Proceed To Checkout`}</Text>
                        </TouchableOpacity>:
                        <TouchableOpacity
                        onPress={() => manageAddress1()}
                        style={styles.btns}>
                        <Text style={styles.pro}>{`Add Address`}</Text>
                    </TouchableOpacity>
                        }
                    </View>
                    </View>:
                <View style={{flex:1,
                justifyContent:'center',
                alignItems:'center',
                marginTop:'80%',
                flexDirection:'row'
                }}>
                    <Text style={{textAlign:'center',fontSize:18}}>Your cart is Empty!</Text>
                    <Text onPress={()=>navigation.navigate('Home')} style={{borderBottomWidth:1,fontSize:18,}}> Continue Shopping</Text>

                </View>
                }
                    <View style={{ height: 20 }} />
                </ScrollView>
            </ImageBackground>
            <BottomTab
             home={false}
             search={false}
             cart={true}
             profile={false}
             />
            <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
    )
}
export default Payment;

const data1 = [
    { image: require('../../../assets/Logo/cake1.png'), title: 'Pineapple Cake', price: '₹290.00' },
    { image: require('../../../assets/Logo/cake1.png'), title: 'Pineapple Cake', price: '₹290.00' },
    { image: require('../../../assets/Logo/cake1.png'), title: 'Pineapple Cake', price: '₹290.00' },
    { image: require('../../../assets/Logo/cake1.png'), title: 'Pineapple Cake', price: '₹290.00' }
]
const products = [
    {
        cart_id: "5547",
        product_id: "330",
        name: "Choco Berry Delight",
        model: "Cake",
        option: [
            {
                "product_option_id": "359",
                "product_option_value_id": "215",
                "name": "Size",
                "value": "Small",
                "type": "select"
            }
        ],
        quantity: "2",
        stock: true,
        shipping: "1",
        price: "₹450.00",
        total: "₹900.00",
        reward: 0
    },
    {
        cart_id: "5547",
        product_id: "330",
        name: "Choco Berry Delight",
        model: "Cake",
        option: [
            {
                "product_option_id": "359",
                "product_option_value_id": "215",
                "name": "Size",
                "value": "Small",
                "type": "select"
            }
        ],
        quantity: "2",
        stock: true,
        shipping: "1",
        price: "₹450.00",
        total: "₹900.00",
        reward: 0
    }
]
