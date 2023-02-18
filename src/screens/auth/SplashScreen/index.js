import React, { useEffect } from 'react';
import { View, Text, Image,PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import Logo from "../../../assets/Logo/logo.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import { useSelector, useDispatch } from "react-redux";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";

const Splash = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useEffect(async () => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        AsyncStorage.setItem(Storage.lat,'')
        AsyncStorage.setItem(Storage.long,'')
        if (Platform.OS=='android') {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          }).then((data) => {
            if (customer_id) {
              setTimeout(() => navigation.reset({
                  index: 0,
                  routes: [{ name: "Main" }],
              }), 2000);
          }
          else {
              setTimeout(() => navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
              }), 2000);
          }
            })
            .catch((err) => {
            });
        } else {
          if (customer_id) {
            setTimeout(() => navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
            }), 2000);
        }
        else {
            setTimeout(() => navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            }), 2000);
        }
        }
    }, []);

    useEffect(() => {
        dispatch({
            type: 'Get_Store_Request',
            url: 'apiproduct/getstore',
        });
        dispatch({
            type: 'Privacy_Policy_Request1',
            url: 'api/privacy_policy',
          });
          dispatch({
            type: 'Home_Data_Request',
            url: 'home/mobileview',
        });
         requestLocationPermission()
    },[])


async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Merwans',
        'message': 'Merwans App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   alert("You can use the location");
    } else {
    //   alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}

useEffect(() => {
  NetInfo.addEventListener(state => {
    if(!state.isConnected){
    showMessage({
      message:'Please connect to your internet',
      type:'danger',
    });
    }
  });
},[])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Logo height={150} width={150}/>
            </View>
        </View>
    )

}
export default Splash;