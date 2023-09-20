import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Linking,
  Platform
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import styles from './style';
import BottomTab from '../../../components/BottomTab';
import Header from '../../../components/Header';
import Forward from '../../../assets/Svg/forward.svg';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../components/AsyncStorage';
import Loader from '../../../components/Loader';
import Order from '../../../assets/Svg/your-order.svg';
import Address from '../../../assets/Svg/add-book.svg';
import About from '../../../assets/Svg/about-info.svg';
import Rating from '../../../assets/Svg/rating-rate.svg';
import Privacy from '../../../assets/Svg/privacy-info.svg';
import Terms from '../../../assets/Svg/terms-and-conditions.svg';
import Logout from '../../../assets/Svg/log-out.svg';
import axios from 'axios';
import { watchPosition } from 'react-native-geolocation-service';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.Auth.isFetching);
  const detail = useSelector(state => state.Auth.UserDetail);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [customer_id, set_customeer_id] = useState('');

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
    data2()
  }, []);
  const data2 = async () => {
    const fname = await AsyncStorage.getItem(Storage.firstname);
    const lname = await AsyncStorage.getItem(Storage.lastname);
    const email = await AsyncStorage.getItem(Storage.email);
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    setFname(fname);
    setLname(lname);
    setEmail(email);
    set_customeer_id(customer_id);
  }
  const appVersion = async url => {

  };
  const logoutUser = async () => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    dispatch({
      type: 'User_Logout_Request',
      url: 'api/logout',
      customer_id: customer_id,
      navigation: navigation,
    });
    dispatch({
      type: 'remove_coupon',
    });
  };
  const manageAddress = async () => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    dispatch({
      type: 'Address_List_Request',
      url: 'apiorder/addressList',
      customer_id: customer_id,
      from: 'profile',
      navigation: navigation,
    });
  };
  const manageOrder = async () => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    dispatch({
      type: 'Order_List_Request',
      url: 'apiorder',
      customer_id: customer_id,
      route: 'Profile',
      navigation: navigation,
    });
  };
  const logout = () => {
    Alert.alert('CONFIRM', 'Are you sure you want to logout', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'YES', onPress: () => logoutUser() },
    ]);
  };
  const disableAccount = () => {
    Alert.alert('CONFIRM', 'All data will be deleted, Are you sure want to delete your account ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'YES', onPress: () => deleteAccout() },
    ]);
  };
  const deleteAccout = () => {

    dispatch({
      type: 'User_delete_account_request',
      url: 'customer/disabled',
      customer_id: customer_id,
      navigation: navigation,
    });
  }


  const about = () => {
    dispatch({
      type: 'About_Us_Request',
      url: 'api/about_us',
      navigation: navigation,
    });
  };
  const Policy = () => {
    dispatch({
      type: 'Privacy_Policy_Request',
      url: 'api/privacy_policy',
      navigation: navigation,
    });
  };
  const Term = () => {
    dispatch({
      type: 'Term_Condition_Request',
      url: 'api/terms_conditions',
      navigation: navigation,
    });
  };

  const appReview = async () => {
    // console.log('called')
    // Linking.openURL('https://play.google.com/store/apps/details?id=com.merwans')
    try {
      const response = await axios({
        method: 'GET',
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/version',
      });
      if (Platform.OS == 'android') {
        if (response.data.android_url != '') {
          Linking.openURL(response.data.android_url);
        }
      } else {
        if (response.data.ios_url != '') {
          Linking.openURL(response.data.ios_url)
        }
      }


    } catch (error) {
      throw error;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {isFetching ? <Loader /> : null}
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../../assets/Icon/bg.png')}>
        <ScrollView stickyHeaderIndices={[0]}>
          <Header
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
          <View style={{ paddingHorizontal: 5, marginTop: 10 }}>
            {customer_id ? (
              <View style={styles.view}>
                <View style={{ width: '75%' }}>
                  <Text
                    style={
                      styles.name
                    }>{`${detail?.firstname} ${detail?.lastname}`}</Text>
                  <Text style={[styles.email, { marginTop: 4 }]}>
                    {detail?.email}
                  </Text>
                  <TouchableOpacity onPress={() => { disableAccount() }}>
                    <Text style={{ marginTop: 10, color: 'red', width: 115, fontFamily: 'Montserrat-Medium' }}>Delete Account</Text>
                    <View style={{ borderBottomWidth: 1, width: 115, borderColor: 'red' /*'#000000'*/, }} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyAccountPage')}
                  style={{ height: 59, width: 59 }}>
                  <Image
                    style={{ height: 58, width: 58 }}
                    source={require('../../../assets/Logo/profile.png')}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            {customer_id ? (
              <View style={styles.cont}>
                <Text style={styles.food}>Food Orders</Text>
                <View style={{ marginTop: 0 }}>
                  <TouchableOpacity
                    onPress={() => manageOrder()}
                    style={[styles.card1]}>
                    <View style={styles.main}>
                      <View style={styles.round}>
                        <Order />
                        {/* <Image source={require('../../../assets/Icon/shopping-bag.png')} /> */}
                      </View>
                      <Text style={styles.title}>{'Your Orders'}</Text>
                    </View>
                    <View style={{ marginRight: 0 }}>
                      <Forward />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={
                      () => manageAddress()
                      // navigation.navigate('MyAddress')
                    }
                    style={[styles.card1]}>
                    <View style={styles.main}>
                      <View style={styles.round}>
                        <Address />
                        {/* <Image source={require('../../../assets/Icon/book.png')} /> */}
                      </View>
                      <Text style={styles.title}>{'Address Book'}</Text>
                    </View>
                    <View style={{ marginRight: 0 }}>
                      <Forward />
                    </View>
                  </TouchableOpacity>

                </View>
              </View>
            ) : null}
            <View style={styles.cont}>
              <Text style={styles.food}>More</Text>
              <View style={{ marginTop: 0 }}>
                <TouchableOpacity
                  onPress={() => about()}
                  style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <About />
                      {/* <Image source={require('../../../assets/Icon/info.png')} /> */}
                    </View>
                    <Text style={styles.title}>{'About'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => appReview()} style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Rating />
                      {/* <Image source={require('../../../assets/Icon/rating1.png')} /> */}
                    </View>
                    <Text style={styles.title}>{Platform.OS === 'android' ? 'Rate Us' : 'Rate Us'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Policy()}
                  style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Privacy />
                      {/* <Image source={require('../../../assets/Icon/insur.png')} /> */}
                    </View>
                    <Text style={styles.title}>{'Privacy Policy'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Term()} style={[styles.card1]}>
                  <View style={styles.main}>
                    <View style={styles.round}>
                      <Terms />
                      {/* <Image source={require('../../../assets/Icon/terms.png')} /> */}
                    </View>
                    <Text style={styles.title}>{'Terms & Conditions'}</Text>
                  </View>
                  <View style={{ marginRight: 0 }}>
                    <Forward />
                  </View>
                </TouchableOpacity>

                {customer_id ? (
                  <TouchableOpacity
                    onPress={() => logout()}
                    style={[styles.card1]}>
                    <View style={styles.main}>
                      <View style={styles.round}>
                        <Logout />
                        {/* <Image source={require('../../../assets/Icon/log-out.png')} /> */}
                      </View>
                      <Text style={styles.title}>{'Logout'}</Text>
                    </View>
                    <View style={{ marginRight: 0 }}>
                      <Forward />
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View style={{ height: 120 }} />
          </View>
        </ScrollView>
        <View style={{ bottom: 0, left: 0, right: 0, position: 'absolute' }}>
          <BottomTab home={false} search={false} cart={false} profile={true} />
        </View>
      </ImageBackground>
      <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
    </View>
  );
};
export default Profile;
