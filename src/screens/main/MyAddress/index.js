import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Back from "../../../assets/Svg/back.svg";
import Home from "../../../assets/Svg/home1.svg";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./style";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import Edit from "../../../assets/Svg/edit1.svg";
import Delete from "../../../assets/Svg/dele.svg";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

const MyAddress = ({route}) => {
    const navigation = useNavigation()
    const selector = useSelector(state => state.Auth.AddressList)
    const isFetching = useSelector(state => state.Auth.isFetching)
    const [fetching,setFetching]=useState(false)
    const type=route.params
console.log(selector);
    // useEffect(() => {
    //   NetInfo.addEventListener(state => {
    //     if(!state.isConnected){
    //     showMessage({
    //       message:'Please connect to your internet',
    //       type:'danger',
    //     });
    //     }
    //   });
    // },[])
  
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'City_List_Request',
            url: 'apiorder/getStates',
            country_id: '99',
        });
    }, [])

    const addAddress=async(id)=>{
        const customer_id=await AsyncStorage.getItem(Storage.customer_id)
        if (route.params.from=='cart') {
            dispatch({
                type: 'Get_Address_Request1',
                url: 'apiorder/addressById',
                customer_id:customer_id,
                address_id:id,
                navigation:navigation
              });
        } else {  
        }
    }
    const deleteAddress=async(item)=>{
        const customer_id=await AsyncStorage.getItem(Storage.customer_id)
        const address_id = await AsyncStorage.getItem("Address_id")
           try {
            setFetching(true)
            const data = new FormData();
            data.append('api_token','');
            data.append('customer_id',customer_id);
            data.append('address_id',item.address_id);
            const response = await axios({
              method: 'POST',
              data,
              headers: {
                'content-type': 'multipart/form-data',
                Accept: 'multipart/form-data',
              },
              url: 'https://merwans.co.in/index.php?route=api/apiorder/addressDelete',
            });
            if (response.data.status == true) {
              setFetching(false)
              
              dispatch({
                type: 'Address_List_Request',
                url: 'apiorder/addressList',
                customer_id:customer_id,
                from:'profile',
                navigation:navigation
              });
              dispatch({
                type: 'Get_Address_Request',
                url: 'apiorder/addressById',
                customer_id: customer_id,
                address_id:0
            });
              item.address_id==address_id?AsyncStorage.setItem('Address_id','0'):null
            }
            else{
                setFetching(false)
            }
          } catch (error) {
            throw error;
          }
    }

    const editAddress=async(item)=>{
        const customer_id=await AsyncStorage.getItem(Storage.customer_id)
        try {
            setFetching(true)
            const data = new FormData();
            data.append('api_token','');
            data.append('customer_id',customer_id);
            data.append('address_id',item.address_id);
            const response = await axios({
              method: 'POST',
              data,
              headers: {
                'content-type': 'multipart/form-data',
                Accept: 'multipart/form-data',
              },
              url: 'https://merwans.co.in/index.php?route=api/apiorder/addressById',
            });
            if (response.data.status == true) {
              setFetching(false)
              navigation.navigate('EditAddress',response.data.data)
            }
            else{
                setFetching(false)
            }
          } catch (error) {
            setFetching(false)
          }
    }
    return (
        <View style={{ flex: 1 }}>
            {isFetching || fetching?<Loader/>:null}
            <ImageBackground 
            style={{ flex: 1, }} 
            source={require('../../../assets/Icon/bg.png')}>
                 <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    backgroundColor:'#232323',
                    height:40
                     }}>
                    <TouchableOpacity style={styles.arrow}
                        onPress={() => route.params.from=='cart'?navigation.navigate('Payment'):navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View style={styles.view}>
                        <Text style={styles.my}>My Addresses</Text>
                    </View>
                    <View style={{width:40}}/>
                </View>
                <View style={{ paddingHorizontal: 6, marginTop: 14 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddressForm',{from:'address'})}
                        style={{ alignSelf: 'flex-start' }}>
                        <Text style={styles.add}>+  Add Address</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={selector}
                        style={{ marginBottom: 75,marginTop:14 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                               onPress={()=>addAddress(item.address_id)}
                                // disabled
                                style={styles.card}>
                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View style={{ width: '8%' }}>
                                        <View style={styles.round}>
                                            <Home  />
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 8, width: '90%', }}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                          <Text style={styles.title}>{item.address_type}</Text>
                                          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                              <TouchableOpacity onPress={()=>editAddress(item)} style={{marginRight:15}}>
                                               <Edit height={13} width={13}/>
                                             </TouchableOpacity>
                                             <TouchableOpacity style={{paddingHorizontal:5}} onPress={()=>deleteAddress(item)}>
                                             <Delete height={14} width={13}/>
                                             </TouchableOpacity>
                                          </View>
                                        </View>
                                        <Text style={[styles.desc, { width: '100%',marginTop:3 }]}>{item.address}</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ImageBackground>
            <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
    )
}
export default MyAddress;

const data = [
    { title: 'Home', desc: '1st Floor, 65, Old Oriented Bldg, M G Road, Mumbai' },
    { title: 'Home', desc: '1st Floor, 65, Old Oriented Bldg, M G Road, Mumbai' },
    { title: 'Home', desc: '1st Floor, 65, Old Oriented Bldg, M G Road, Mumbai' }
]