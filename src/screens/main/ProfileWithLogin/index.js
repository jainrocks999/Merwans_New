import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView,Alert ,StatusBar} from 'react-native';
import { useNavigation ,DrawerActions} from "@react-navigation/native";
import styles from "./style";
import BottomTab from "../../../components/BottomTab";
import Header from "../../../components/Header";
import Down from "../../../assets/Svg/down.svg";
import Forward from "../../../assets/Svg/forward.svg";
import { useSelector,useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from '../../../components/AsyncStorage';
import Loader from "../../../components/Loader";

const Profile = () => {
  const navigation = useNavigation()
  const dispatch=useDispatch()
  const isFetching=useSelector(state=>state.isFetching)
  const [fname,setFname]=useState('')
  const [lname,setLname]=useState('')
  const [email,setEmail]=useState('')

  useEffect(async()=>{
      const fname=await AsyncStorage.getItem(Storage.firstname)
      const lname=await AsyncStorage.getItem(Storage.lastname)
      const email=await AsyncStorage.getItem(Storage.email)
      setFname(fname)
      setLname(lname)
      setEmail(email)
  },[])

  const logoutUser=async()=>{
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    dispatch({
      type: 'User_Logout_Request',
      url: 'api/logout',
      customer_id:customer_id,
      navigation:navigation
    });
  }
  const manageAddress=async()=>{
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    dispatch({
      type: 'Address_List_Request',
      url: 'apiorder/addressList',
      customer_id:customer_id,
      from:'profile',
      navigation:navigation
    });
  }
  const manageOrder=async()=>{
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    dispatch({
      type: 'Order_List_Request',
      url: 'apiorder',
      customer_id:customer_id,
      navigation:navigation
    });
  }
  const logout = () => {
    Alert.alert('CONFIRM', 'Are you sure you want to logout', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'YES', onPress: () => logoutUser()},
    ]);
  };

  const about=()=>{
    dispatch({
      type: 'About_Us_Request',
      url: 'api/about_us',
      navigation:navigation
    });
  }
  const Policy=()=>{
    dispatch({
      type: 'Privacy_Policy_Request',
      url: 'api/privacy_policy',
      navigation:navigation
    });
  }
  const Term=()=>{
    dispatch({
      type: 'Term_Condition_Request',
      url: 'api/terms_conditions',
      navigation:navigation
    });
  }

  return (
    <View style={{ flex: 1 }}>
      {isFetching?<Loader/>:null}
      <ImageBackground style={{ flex: 1 }} source={require('../../../assets/Icon/bg.png')}>
        <ScrollView stickyHeaderIndices={[0]}>
          <Header 
          onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
          />
          <View style={{ paddingHorizontal: 5, marginTop: 10 }}>
            <View style={styles.view}>
              <View style={{width:'75%'}}>
                <Text style={styles.name}>{`${fname} ${lname}`}</Text>
                <Text style={[styles.email, { marginTop: 4}]}>{email}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyAccountPage')}
                style={{ height: 59, width: 59 }}>
                <Image style={{ height: 58, width: 58 }} source={require('../../../assets/Logo/profile.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.cont}>
              <Text
                style={styles.food}>Food Orders</Text>
              <View style={{ marginTop: 0 }}>
                <TouchableOpacity
                  onPress={() => manageOrder()}
                  style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Image source={require('../../../assets/Icon/shopping-bag.png')} />
                    </View>
                    <Text style={styles.title}>{'Your Orders'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity 
                onPress={()=>navigation.navigate('Favorite')}
                style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Image source={require('../../../assets/Icon/like.png')} />
                    </View>
                    <Text style={styles.title}>{'Favorite Orders'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => 
                    manageAddress()
                    // navigation.navigate('MyAddress')
                  }
                  style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Image source={require('../../../assets/Icon/book.png')} />
                    </View>
                    <Text style={styles.title}>{'Address Book'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={styles.cont}>
              <Text
                style={styles.food}>More</Text>
              <View style={{ marginTop: 0 }}>
                <TouchableOpacity
                onPress={()=>about()}
                 style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Image source={require('../../../assets/Icon/info.png')} />
                    </View>
                    <Text style={styles.title}>{'About'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Image source={require('../../../assets/Icon/rating1.png')} />
                    </View>
                    <Text style={styles.title}>{'Rate Us on Play store'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>


                <TouchableOpacity 
                onPress={()=>Policy()}
                style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Image source={require('../../../assets/Icon/insur.png')} />
                    </View>
                    <Text style={styles.title}>{'Privacy Policy'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>


                <TouchableOpacity
                onPress={()=>Term()}
                style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Image source={require('../../../assets/Icon/terms.png')} />
                    </View>
                    <Text style={styles.title}>{'Terms & Conditions'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>logout()}
                style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Image source={require('../../../assets/Icon/log-out.png')} />
                    </View>
                    <Text style={styles.title}>{'Logout'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>

              </View>
            </View>
            <View style={{ height: 120 }} />
          </View>
        </ScrollView>
        <View style={{ bottom: 0, left: 0, right: 0, position: 'absolute' }}>
          <BottomTab
          home={false}
          search={false}
          cart={false}
          profile={true}
          />
        </View>
      </ImageBackground>
      <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
    </View>
  )
}
export default Profile;