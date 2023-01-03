import React, { useState,useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Menu from "../../assets/Logo/menu.svg";
import Heart from "../../assets/Logo/heart.svg";
import Logo from '../../assets/Logo/logo.svg';
import Location from "../../assets/Svg/location1.svg";
import styles from './style'
import Modal from 'react-native-modal';
import Plus from "../../assets/Svg/menuP.svg";
import Minus from "../../assets/Svg/minus.svg";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../components/AsyncStorage";
import { useDispatch } from "react-redux";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyAEAzAu0Pi_HLLURabwR36YY9_aiFsKrsw");

const Header = ({location,onPress}) => {
  const [cake, setCake] = useState(false)
  const [pastry, setPastry] = useState(false)
  const [puff, setPuff] = useState(false)
  const [cookies, setCookies] = useState(false)
  const [other, setOther] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation=useNavigation()
  const [location1,setLocation]=useState('')
  const dispatch=useDispatch()
  const [add1,setAdd1]=useState('')
  const [add2,setAdd2]=useState('')
  const [add3,setAdd3]=useState('')
  const [position, setPosition] = useState({
    latitude: 22.7196,
    longitude: 75.8577,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [pin, setPin] = useState({
    latitude: 22.748803900815737,
    longitude:75.84374703346793,
  });22.748803900815737, 75.84374703346793
  
  useEffect(async()=>{
   const locations=await AsyncStorage.getItem(Storage.location)
   setLocation(locations)
  },[])

  const manageList=async()=>{
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    console.log(customer_id);
    dispatch({
      type: 'Wish_List_Request',
      url: 'apiproduct/wishlist',
      customer_id:customer_id,
      navigation:navigation
    });
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
     console.log('this is coords value',crd);
    })
  }, []);

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
  // json.results[0].formatted_address
  return (
    <View style={{ backgroundColor: '#232323', paddingVertical: 0, height: 40, }}>
      <View style={{ height: 40, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 2, marginTop: 10,height:40 }}>
            <Logo
              height={76} width={76}/>
          </View>
          <TouchableOpacity 
          onPress={()=>navigation.navigate('MyModal',{add1,add2,add3})}
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
            <Location />
           {add1?<View>
             <View style={{flexDirection:'row',alignItems:'center'}}>
             <Text style={{color:'#fff',marginLeft:10,fontFamily:'Montserrat-Medium',fontSize:12}}>{add1}</Text>
             <Image style={{ tintColor: '#fff',  marginLeft: 15, }}
             source={require('../../assets/Icon/down.png')} />
             </View>
             <Text style={{color:'#fff',marginLeft:10,fontFamily:'Montserrat-Medium',fontSize:10,marginTop:2}}>{`${add2}, ${add3}`}</Text>
           </View> :
           <Text 
            style={{ 
              color: '#fff', 
              marginLeft: 10, 
              fontSize: 12 
              }}>{'Your Location'}</Text>}
           {add1?null: <Image style={{ tintColor: '#fff', marginLeft: 15, marginTop: 2 }}
             source={require('../../assets/Icon/down.png')} />}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <TouchableOpacity
          onPress={()=>manageList()}
           style={{ marginRight: 20 }}>
            <Heart />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={onPress}>
            <Menu />
          </TouchableOpacity>
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
      <View style={{backgroundColor:'#FFF',width:'76%',alignSelf:'center'}}>
            <View
              style={styles.header}>
              <Text style={{ color: '#FFFFFF', fontSize: 15, fontFamily: 'Montserrat-SemiBold' }}>Menu</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ borderWidth: 2, borderColor: '#FFFFFF', marginRight: 5, padding: 4, borderRadius: 3 }}>
                <Image style={{ tintColor: '#fff', height: 8, width: 8 }} source={require('../../assets/Icon/multiply.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingVertical: 30,paddingHorizontal:15 }}>
              <Text style={styles.home}>Home</Text>
              <TouchableOpacity
                onPress={() => cake ? setCake(false) : setCake(true)}
                style={[styles.cmn, { marginTop: 12 }]}>
                <Text style={styles.home}>Cakes</Text>
                {cake?<Minus/>:<Plus/>}
              </TouchableOpacity>
              {cake ?

                <View style={{marginTop:12,paddingLeft:8}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={styles.item}>Weekend Special cakes</Text>
                  <View style={styles.round2}>
                    <Text style={styles.num}>2</Text>
                  </View>
                  </View>
                  <View style={styles.margin}>
                  <Text style={styles.item}>Rich Premium Cakes</Text>
                  <View style={styles.round2}>
                    <Text style={styles.num}>2</Text>
                  </View>
                  </View>
                  <View style={styles.margin}>
                  <Text style={styles.item}>Rich Premium Cheese Cakes</Text>
                  <View style={styles.round2}>
                    <Text style={styles.num}>2</Text>
                  </View>
                  </View>
                  <View style={styles.margin}>
                  <Text style={styles.item}>Premium Cakes</Text>
                  <View style={styles.round2}>
                    <Text style={styles.num}>2</Text>
                  </View>
                  </View>
                  <View style={styles.margin}>
                  <Text style={styles.item}>Rich Cakes</Text>
                  <View style={styles.round2}>
                    <Text style={styles.num}>2</Text>
                  </View>
                  </View>
                  <View style={styles.margin}>
                  <Text style={styles.item}>Exotic Cakes</Text>
                  <View style={styles.round2}>
                    <Text style={styles.num}>2</Text>
                  </View>
                  </View>
                  <View style={styles.margin}>
                  <Text style={styles.item}>Exquisite Cakes</Text>
                  <View style={styles.round2}>
                    <Text style={styles.num}>2</Text>
                  </View>
                  </View>
                </View>

                : <View />}
              <View style={[styles.cmn, { marginTop: 12 }]}>
                <Text style={styles.home}>Pastries</Text>
                <Plus/>
              </View>
              <View style={[styles.cmn, { marginTop: 12 }]}>
                <Text style={styles.home}>Puffs and Rolls</Text>
                <Plus/>
              </View>
              <View style={[styles.cmn, { marginTop: 12 }]}>
                <Text style={styles.home}>Cookies-Breads</Text>
                <Plus/>
              </View>
              <View style={[styles.cmn, { marginTop: 12 }]}>
                <Text style={styles.home}>Others</Text>
                <Plus/>
              </View>
              <Text style={[styles.home, { marginTop: 10 }]}>Contact Us</Text>
            </View>
          </View>
      </Modal>
    </View>
  )
}
export default Header

// {"address_components": 
// [{"long_name": "314/6", "short_name": "314/6", "types": [Array]},
//  {"long_name": "Ward 5", "short_name": "Ward 5", "types": [Array]}, 
//  {"long_name": "Vindhyanchal Nagar", "short_name": "Vindhyanchal Nagar", "types": [Array]},
//   {"long_name": "Indore", "short_name": "Indore", "types": [Array]},
//    {"long_name": "Indore", "short_name": "Indore", "types": [Array]},
//     {"long_name": "Madhya Pradesh", "short_name": "MP", "types": [Array]}, 
//     {"long_name": "India", "short_name": "IN", "types": [Array]}, 
//     {"long_name": "452006", "short_name": "452006", "types": [Array]}],
//      "formatted_address": "314/6, Ward 5, Vindhyanchal Nagar, Indore, Madhya Pradesh 452006, India", "geometry": {"bounds": {"northeast": [Object], "southwest": [Object]}, "location": {"lat": 22.7487671, "lng": 75.843761}, "location_type": "ROOFTOP", "viewport": {"northeast": [Object], "southwest": [Object]}}, "place_id": "ChIJ_anTs3kCYzkRDpnzeIL7VZc", "types": ["premise"]}