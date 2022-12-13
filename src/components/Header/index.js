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
  
  useEffect(async()=>{
   const locations=await AsyncStorage.getItem(Storage.location)
   setLocation(locations)
  },[])

  const manageList=async()=>{
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    dispatch({
      type: 'Wish_List_Request',
      url: 'apiproduct/wishlist',
      customer_id:customer_id,
      navigation:navigation
    });
  }
  return (
    <View style={{ backgroundColor: '#232323', paddingVertical: 0, height: 40, }}>
      <View style={{ height: 40, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 2, marginTop: 10,height:40 }}>
            <Logo
              height={76} width={76}/>
          </View>
          <TouchableOpacity 
          onPress={()=>navigation.navigate('MyModal')}
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30 }}>
            <Location />
            <Text 
            style={{ 
              color: '#fff', 
              marginLeft: 10, 
              fontSize: 12 
              }}>{'Your Location'}</Text>
              {/* location1?location1:location */}
            <Image style={{ tintColor: '#fff', height: 7, width: 10, marginLeft: 15, marginTop: 2 }}
             source={require('../../assets/Icon/down.png')} />
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