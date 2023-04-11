import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity,StatusBar } from "react-native";
import styles from './style';
import { useNavigation,StackActions } from "@react-navigation/native";
import Back from "../../../assets/Svg/back1.svg";
import Edit from '../../../assets/Svg/edit.svg';
import List from "../../../assets/Svg/check-list.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import { useSelector,useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";
import Loader from '../../../components/Loader'
const MyAccountPage = () => {
    const navigation = useNavigation()
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const detail=useSelector(state=>state.Auth.UserDetail)
    const isFetching=useSelector(state=>state.Auth.isFetching)
    const dispatch=useDispatch()
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

    useEffect(async () => {
        const fname = await AsyncStorage.getItem(Storage.firstname)
        const lname = await AsyncStorage.getItem(Storage.lastname)
        const email = await AsyncStorage.getItem(Storage.email)
        const telephone = await AsyncStorage.getItem(Storage.telephone)
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        setFname(fname)
        setLname(lname)
        setEmail(email)
        setTelephone(telephone)

        dispatch({
            type: 'User_Detail_Request',
            url: `customer/getDetail&customer_id=${customer_id}`,
        });
    }, [])

    const manageOrder = async () => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        dispatch({
          type: 'Order_List_Request',
          url: 'apiorder',
          customer_id: customer_id,
          route:'Account',
          navigation: navigation
        });
      }

    return (
        <View style={{ flex: 1 }}>
            {isFetching?<Loader/>:null}
            <ImageBackground style={{ padding: 8 }}
                source={require('../../../assets/Icon/bg1.png')}>
                <TouchableOpacity style={styles.arrow}
                    onPress={() => navigation.navigate('ProfileWithLogin')}
                    // onPress={()=>navigation.dispatch(StackActions.push('ProfileWithLogin'))}
                    >
                    <Back />
                </TouchableOpacity>
                <View>
                    <View style={styles.bc}>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.view1}>
                <View style={styles.view2}>
                    <Image source={require('../../../assets/Logo/profile.png')} />
                    <Text style={styles.name}>{`${fname} ${lname}`}</Text>
                    {/* <Text style={styles.name}>{`${detail.firstname} ${detail.lastname}`}</Text> */}
                </View>
                <View style={styles.view}>
                    <TouchableOpacity
                        onPress={() => manageOrder()
                            // navigation.navigate('MyOrders',{page:'Account'})
                        }
                        style={styles.button}>
                        <List />
                        <Text
                            style={styles.text}>My Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile', {
                            fname: detail.firstname,
                            lname: detail.lastname,
                            email: detail.email,
                            telephone: detail.telephone
                        })}
                        style={styles.button}>
                        <Edit height={20}/>
                        <Text
                            style={styles.text}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar backgroundColor={'#fff'} barStyle='dark-content'/>
        </View>
    )
}
export default MyAccountPage;