import React, { useEffect, useState,useRef } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, StatusBar, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Location from "../../../assets/Svg/location.svg";
import styles from "./style";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Loader from "../../../components/Loader";
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyAEAzAu0Pi_HLLURabwR36YY9_aiFsKrsw");
import Gps from "../../../assets/Svg/gps.svg";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

const ChangeAddress = () => {
 const ref=useRef()
  const navigation = useNavigation()
  const [address, setAddress] = useState('')
  const [position, setPosition] = useState({
    latitude: 22.7196,
    longitude: 75.8577,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

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
  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    })
  }, []);
  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        // accessLocation()
        return true;
      } else {

        return false;
      }
    } catch (err) {
      return false;
    }
  }

  Geocoder.from(position)
    .then(json => {
      var location = json.results[0].formatted_address
      setAddress(location)
    })
    .catch(error => console.warn(error));
   
  const getCurrentLocation = () => {
    if (Platform.OS=='android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      }).then((data) => {
        Geolocation.getCurrentPosition((pos) => {
          const crd = pos.coords;
          setPosition({
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });
          ref.current.animateToRegion({
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });
        })
        })
        .catch((err) => {
        });
    } else {
      Geolocation.getCurrentPosition((pos) => {
        const crd = pos.coords;
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
        ref.current.animateToRegion({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
      })
    }
  }
  
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageBackground style={{ flex: 1 }} source={require('../../../assets/Icon/bg.png')}>
        <View style={{ height: 260 }}>
          <View
            style={[
            {
              top: '40%',
              // left: '50%',
              zIndex: 1,
              alignItems:'center',
              justifyContent:'center'
            }]}>
            <Location width={30} height={30} />
          </View>
          <MapView
            ref={ref}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={StyleSheet.absoluteFillObject}
            initialRegion={position}
            onRegionChangeComplete={(val) => setPosition({
              latitude: val.latitude,
              longitude: val.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            })}
            showsUserLocation={true}
          followsUserLocation={position}
            onPress={(val) => setPosition({
              latitude: val.nativeEvent.coordinate.latitude,
              longitude: val.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            })}
          >

            {/* <Marker 
                    draggable={false} 
                    coordinate={position}
                    onDragEnd={e => {
                      setPosition({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                        latitudeDelta: 0.0421,
                        longitudeDelta: 0.0421,
                      });
                    }}
                    style={{zIndex:3,position:'absolute'}}
                    /> */}
          </MapView>

        </View>
        <View style={{ alignItems: 'center', marginTop: -30 }}>
          <TouchableOpacity onPress={()=>getCurrentLocation()}
            style={styles.use}>
            <Gps />
            <Text style={styles.current}>Use Current Location</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 8, marginTop: 4 }}>
          <View style={styles.main}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginLeft: 3, }}>
                <Location />
              </View>
              <View style={{ marginLeft: 6, marginTop: 0, width: '90%' }}>
                <Text style={[styles.first, {}]}>{address}</Text>
              </View>
            </View>
            {/* <View style={{ marginTop: 0, alignItems: 'center' }}> */}
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('ChangeAddress')}
                style={{ alignSelf: 'flex-end', padding: 6, borderRadius: 15 }}>
                <Text style={styles.change}>Change</Text>
              </TouchableOpacity> */}
            {/* </View> */}
          </View>

          <View style={styles.view}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddressForm',{address:address})}
              style={styles.button}>
              <Text style={styles.enter}>Enter Complete Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
    </View>
  )
}
export default ChangeAddress;

