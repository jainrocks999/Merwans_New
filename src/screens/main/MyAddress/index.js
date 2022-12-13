import React, { useEffect } from 'react';
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

const MyAddress = ({route}) => {
    const navigation = useNavigation()
    const selector = useSelector(state => state.AddressList)
    const isFetching = useSelector(state => state.isFetching)
    const type=route.params
    console.log('this is user detail',type);
    console.log('this is selector response', selector);
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
    return (
        <View style={{ flex: 1 }}>
            {isFetching?<Loader/>:null}
            <ImageBackground 
            style={{ flex: 1, padding: 6 }} 
            source={require('../../../assets/Icon/bg.png')}>
                <View style={{ padding: 2 }}>
                    <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View style={styles.view}>
                        <Text style={styles.my}>My Addresses</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 6, marginTop: 5 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangeAddress')}
                        style={{ alignSelf: 'flex-start' }}>
                        <Text style={styles.add}>+  Add Address</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={selector}
                        style={{ marginBottom: 75,marginTop:14 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                            //    onPress={()=>addAddress(item.address_id)}
                                disabled
                                style={styles.card}>
                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View style={{ width: '8%' }}>
                                        <View style={styles.round}>
                                            <Home  />
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 8, width: '90%', }}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                          <Text style={styles.title}>{item.addressName}</Text>
                                          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                              <View style={{marginRight:20}}>
                                               <Edit height={13} width={13}/>
                                             </View>
                                             <Delete height={14} width={13}/>
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
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
        </View>
    )
}
export default MyAddress;

const data = [
    { title: 'Home', desc: '1st Floor, 65, Old Oriented Bldg, M G Road, Mumbai' },
    { title: 'Home', desc: '1st Floor, 65, Old Oriented Bldg, M G Road, Mumbai' },
    { title: 'Home', desc: '1st Floor, 65, Old Oriented Bldg, M G Road, Mumbai' }
]