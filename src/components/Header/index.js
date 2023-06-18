import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Menu from "../../assets/Logo/menu.svg";
import Heart from "../../assets/Logo/heart.svg";
import Logo from '../../assets/Logo/logo.svg';
import Location from "../../assets/Svg/location1.svg";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../components/AsyncStorage";
import { useDispatch } from "react-redux";
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyAEAzAu0Pi_HLLURabwR36YY9_aiFsKrsw");

const Header = ({ location, onPress, }) => {
  const navigation = useNavigation()
  const [location1, setLocation] = useState('')
  const dispatch = useDispatch()
  const [add1, setAdd1] = useState('')
  const [add2, setAdd2] = useState('')
  const [add3, setAdd3] = useState('')
  const [lat, setLat] = useState()
  const [long, setLong] = useState()
  const [position, setPosition] = useState({
    latitude: 19.1733,
    longitude: 72.8360,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(async () => {
    const locations = await AsyncStorage.getItem(Storage.location)
    const lat = await AsyncStorage.getItem(Storage.lat)
    const long = await AsyncStorage.getItem(Storage.long)
    setLocation(locations)
    setLat(lat)
    setLong(long)
  }, [])

  const manageList = async () => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id)
    const store_id = await AsyncStorage.getItem(Storage.store_id)
   if(customer_id){
    dispatch({
      type: 'Wish_List_Request',
      url: 'apiproduct/wishlist',
      customer_id: customer_id,
      store_id:store_id,
      navigation: navigation
    });
  }
  else{
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
  })
  }
  }

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
      if (lat && long) {
        Geocoder.from(lat, long)
          .then(json => {
            var location = json.results[0].address_components[1].long_name
            var location1 = json.results[0].address_components[2].long_name
            var location2 = json.results[0].address_components[3].long_name
            setAdd1(location)
            setAdd2(location1)
            setAdd3(location2)
          })
          .catch(error => console.warn(error));
      }
      else {
        Geocoder.from(crd.latitude,crd.longitude)
          .then(json => {
            var location = json.results[0].address_components[1].long_name
            var location1 = json.results[0].address_components[2].long_name
            var location2 = json.results[0].address_components[3].long_name
            setAdd1(location)
            setAdd2(location1)
            setAdd3(location2)
          })
          .catch(error => console.warn(error));
      }
    })
  }, []);
  if (lat && long) {
    Geocoder.from(lat, long)
      .then(json => {
        var location = json.results[0].address_components[1].long_name
        var location1 = json.results[0].address_components[2].long_name
        var location2 = json.results[0].address_components[3].long_name
        setAdd1(location)
        setAdd2(location1)
        setAdd3(location2)
      })
      .catch(error => console.warn(error));
  }
  else {
    Geocoder.from(position)
      .then(json => {
        var location = json.results[0].address_components[1].long_name
        var location1 = json.results[0].address_components[2].long_name
        var location2 = json.results[0].address_components[3].long_name
        setAdd1(location)
        setAdd2(location1)
        setAdd3(location2)
      })
      .catch(error => console.warn(error));
  }
  return (
    <View style={{ backgroundColor: '#232323', paddingVertical: 0, height: 40, }}>
      <View style={{ height: 40, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <View style={{ flexDirection: 'row', width: '73%' }}>
          <View style={{ marginLeft: 2, marginTop: 10, height: 40 }}>
            <Logo
              height={76} width={76} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyModal', { add1, add2, add3 })}
            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
            <Location />
            {add1 ? <View style={{ width: '80%' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                <Text numberOfLines={1} style={{ color: '#fff', marginLeft: 10, fontFamily: 'Montserrat-Medium', fontSize: 12 }}>{add1}</Text>
                <Image style={{ tintColor: '#fff', marginLeft: 15, }}
                  source={require('../../assets/Icon/down.png')} />
              </View>
              <Text numberOfLines={1} style={{ color: '#fff', marginLeft: 10, fontFamily: 'Montserrat-Medium', fontSize: 10, marginTop: 2, width: '80%' }}>{`${add2} ${add3}`}</Text>
            </View> :
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 10,
                  fontSize: 12
                }}>{'Your Location'}</Text>}
            {add1 ? null : <Image style={{ tintColor: '#fff', marginLeft: 15, marginTop: 2 }}
              source={require('../../assets/Icon/down.png')} />}
          </TouchableOpacity> 
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 10,
          width: '25%',
          justifyContent: 'flex-end',

        }}>
          <TouchableOpacity
            onPress={() => manageList()}
            style={{ marginRight: 20 }}>
            <Heart />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPress}>
            <Menu />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
export default Header
