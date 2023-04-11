import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput ,Image,FlatList} from "react-native";
import Down from '../../../assets/Svg/down.svg';
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import Search1 from "../../../assets/Svg/search1.svg";
import Forward from "../../../assets/Svg/forward.svg";
import Location from '../../../assets/Svg/location.svg';
import Multi from "../../../assets/Svg/multi.svg";
import { useSelector,useDispatch } from "react-redux";
import Home from "../../../assets/Svg/home1.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import Loader from "../../../components/Loader";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

const Modal = ({route}) => {
    const navigation = useNavigation()
    const selector=useSelector(state=>state.Auth.AddressData)
    const [fetching,setFetching]=useState(false)
    const dispatch=useDispatch()
    useEffect(async()=>{
        const customer_id=await AsyncStorage.getItem(Storage.customer_id)
        dispatch({
            type: 'Address_List_Req',
            url: 'apiorder/addressList',
            customer_id: customer_id,
          });
    },[])
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
    const manage=()=>{
        // navigation.goBack()
        navigation.navigate('Address')
    }

    const addAddress=async(id)=>{
        const customer_id=await AsyncStorage.getItem(Storage.customer_id)
        // try {
        //     setFetching(true)
        //     const data = new FormData();
        //     data.append('address_id', id);
        //     data.append('customer_id',customer_id)
        //     const response = await axios({
        //       method: 'POST',
        //       data,
        //       headers: {
        //         'content-type': 'multipart/form-data',
        //         Accept: 'multipart/form-data',
        //       },
        //       url: 'https://merwans.co.in/index.php?route=api/apiorder/addressById',
        //     });
        //    
        //     if (response.data.status == true) {
        //       setFetching(false)
        //     //   setProduct(response.data.products)
        //     //   setOpenPanel(true)
      
        //     }
        //     else{
        //         setFetching(false)
        //     }
        //   } catch (error) {
        //     throw error;
        //   }
            dispatch({
                type: 'Get_Address_Request2',
                url: 'apiorder/addressById',
                customer_id:customer_id,
                address_id:id,
                // navigation:navigation
              });
          }
    return (
        <View style={{ flex: 1, padding: 15 }}>
            {fetching?<Loader/>:null}
            <TouchableOpacity
            activeOpacity={1}
                onPress={() => navigation.goBack()}
                style={styles.main}>
                <Multi />
                <Text style={styles.select}>Select Your Location</Text>
            </TouchableOpacity>
            {/* <View style={{ marginTop: 15, paddingHorizontal: 0 }}>
                <View style={styles.container}>
                    <Search1 />
                    <TextInput
                        placeholder="Search for area, street name..."
                        style={styles.search}
                        placeholderTextColor={'#6A6A6A'}
                    />
                </View>
            </View> */}
            <TouchableOpacity onPress={()=>manage()} style={styles.view}>
                <View style={styles.cont}>
                    <Location/>
                    <View style={{marginLeft:10,width:'87%'}}>
                    <Text style={styles.use}>Use current location</Text>
                    {route.params.add1?<Text style={styles.res}>{`${route.params.add1}, ${route.params.add2}, ${route.params.add3}`}</Text>:null}
                    </View>
                </View>
                <View>
                   <Forward/>
                </View>
            </TouchableOpacity>
            <View style={styles.recentV} />
            {route.params.add1?<View style={{ marginTop: 15, }}>
               <Text style={styles.recent}>
                   Recent Location
               </Text>
            <View style={styles.clockV}>
                <Image source={require('../../../assets/Icon/clock.png')}/>
                <Text style={styles.text}>{`${route.params.add1}, ${route.params.add2}, ${route.params.add3}`}</Text>
            </View>
            <View style={styles.border} />
            </View>:null}
            <View style={{marginTop:15}}>
            {selector.length>0?<Text style={styles.recent}>
                   Saved Address
               </Text>:null}
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
                                              
                                          </View>
                                        </View>
                                        <Text style={[styles.desc, { width: '100%',marginTop:3 }]}>{item.address}</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        )}
                    />
            </View>
        </View>
    )
}
export default Modal;