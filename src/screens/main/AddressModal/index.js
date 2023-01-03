import React, { useEffect, useState } from "react";
import { View, Text,TouchableOpacity, StatusBar, StyleSheet, PermissionsAndroid } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Location from "../../../assets/Svg/location.svg";
import styles from "./style";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyAEAzAu0Pi_HLLURabwR36YY9_aiFsKrsw");
import Gps from "../../../assets/Svg/gps.svg";
import Back from "../../../assets/Svg/back1.svg";
const ChangeAddress = () => {

  const navigation = useNavigation()
  const [add1,setAdd1]=useState('')
  const [add2,setAdd2]=useState('')
  const [add3,setAdd3]=useState('')
  const [position, setPosition] = useState({
    latitude: 22.7196,
    longitude: 75.8577,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
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

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    })
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
     
          <View style={{
              flexDirection:'row',
              height:40,
              alignItems:'center',
              paddingHorizontal:10
              }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Back/>
            </TouchableOpacity>
            <Text style={{marginLeft:20,fontFamily:'Montserrat-SemiBold',fontSize:18}}>Choose delivery location</Text>
          </View>
        <View style={{height:'75%'}}>
          <View
            style={[StyleSheet.absoluteFillObject,
            {
              top: '50%',
              left: '50%',
              zIndex: 1,
            }]}>
            <Location width={30} height={30} />
          </View>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={StyleSheet.absoluteFillObject}
            initialRegion={position}
            onRegionChangeComplete={(val) => setPosition({
              latitude: val.latitude,
              longitude: val.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            })}
            onPress={(val) => setPosition({
              latitude: val.nativeEvent.coordinate.latitude,
              longitude: val.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            })}
          >
          </MapView>

        </View>
        <View style={{ alignItems: 'center', marginTop: -30, }}>
          <TouchableOpacity onPress={()=>getCurrentLocation()}
            style={styles.use}>
            <Gps />
            <Text style={styles.current}>Use Current Location</Text>
          </TouchableOpacity>
        </View>
       
     <View style={{height:'25%'}}>
            <View style={{ 
                marginLeft: 3,
                marginTop:20,
                flexDirection:'row' ,
                paddingHorizontal:5,
                backgroundColor:'#fff',
                alignItems:'center'
                }}>
                <Location />
                <View style={{marginLeft:10}}>
                <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,color:'#000'}}>{`${add1}`}</Text>
                <Text style={{fontFamily:'Montserrat-Medium',fontSize:12,color:'#000'}}>{`${add2} ${add3}`}</Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: 15,marginBottom:0 }}>
                      <TouchableOpacity
                            style={styles.btns}>
                            <Text style={styles.pro}>{`Confirm Address`}</Text>
                        </TouchableOpacity>
               </View>
     </View>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
    </View>
  )
}
export default ChangeAddress;

