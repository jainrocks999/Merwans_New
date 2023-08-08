import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Back from '../../../assets/Svg/back.svg';
import Check from '../../../assets/Svg/check1.svg';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';
import Recorder from '../../../assets/Svg/recorder.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../components/AsyncStorage';
import Loader from '../../../components/Loader';

const OrderDetail = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.Auth.OrderDetail);
  console.log('this total', selector);
  const isFetching = useSelector(state => state.Auth.isFetching);
  const dispatch = useDispatch();
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
  const handleReorder = async pid => {
    console.log(pid);
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const store_id = await AsyncStorage.getItem(Storage.store_id);
    dispatch({
      type: 'Add_Item_Request1',
      url: 'apiorder/add_to_cart',
      customer_id: customer_id,
      product_id: pid,
      outlet_id: store_id,
      navigation: navigation,
    });
  };
  return (
    <View style={{flex: 1}}>
      {isFetching ? <Loader /> : null}
      <ImageBackground
        style={{flex: 1}}
        source={require('../../../assets/Icon/bg.png')}>
        {/* <View style={{ padding: 8 }}>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View style={styles.title1}>
                        <Text style={styles.tag}>Order Detail</Text>
                    </View>
                </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#232323',
            height: 40,
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
              paddingRight: 30,
            }}
            onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Montserrat-Bold',
                fontSize: 20,
              }}>
              Order Detail
            </Text>
          </View>
          <View style={{width: 40}} />
        </View>

        <View style={{paddingHorizontal: 5}}>
          <View style={styles.item}>
            <View style={{paddingHorizontal: 8, marginTop: 6}}>
              <Text style={styles.id}>{`#${selector.order_id}`}</Text>
              <Text style={styles.date}>{selector.date_added}</Text>
              <Text style={styles.from}>Payment Address</Text>
              <Text style={styles.pay}>{selector.payment_address}</Text>
              <Text style={styles.to}>Shipping Address</Text>
              <Text style={styles.val}>{selector.shipping_address}</Text>
            </View>

            <FlatList
              data={selector.products}
              renderItem={({item}) => (
                <View style={{borderBottomWidth: 0.5, borderColor: 'grey'}}>
                  <View
                    style={[
                      styles.cont,
                      {paddingHorizontal: 8, marginTop: 12},
                    ]}>
                    <View style={styles.view1}>
                      {item.p_type == 1 ? (
                        <View style={[styles.view, {borderColor: '#0FAF33'}]}>
                          <View
                            style={[
                              styles.square,
                              {backgroundColor: '#0FAF33'},
                            ]}
                          />
                        </View>
                      ) : (
                        <View style={[styles.view, {borderColor: '#ED1B1A'}]}>
                          <View
                            style={[
                              styles.square,
                              {backgroundColor: '#ED1B1A'},
                            ]}
                          />
                        </View>
                      )}
                      <View style={{marginLeft: 6}}>
                        <Image
                          style={{width: 38, height: 31}}
                          source={{uri: item.image}}
                        />
                      </View>
                      <View
                        style={{marginLeft: 5, marginTop: -1, width: '65%'}}>
                        <Text
                          style={[
                            styles.title,
                            {fontSize: 14},
                          ]}>{`${item.name}`}</Text>
                        <Text
                          style={[
                            styles.title,
                            {fontSize: 12},
                          ]}>{`Quantity  ${item.quantity}`}</Text>
                      </View>
                    </View>
                    <View style={[styles.rView]}>
                      <Text style={styles.rupay}>{`${item.price}`}</Text>
                    </View>
                  </View>
                  <View style={{marginTop: 5, marginBottom: 10}} />
                  {/* <TouchableOpacity
                                        onPress={() => handleReorder(item.pid)}
                                        style={[styles.main,{marginTop:5,marginBottom:10}]}>
                                        <Recorder />
                                        <Text style={styles.recover}>Reorder</Text>
                                    </TouchableOpacity> */}
                </View>
              )}
            />

            {selector.totals.length > 0 ? (
              <Text style={styles.sum}>Bill Summary</Text>
            ) : null}
            <FlatList
              data={selector.totals}
              renderItem={({item}) => (
                <View style={styles.views}>
                  <Text style={styles.iTotal}>{item.title}</Text>
                  <View>
                    <Text style={[styles.total, {marginRight: 1}]}>
                      {item.text}
                    </Text>
                  </View>
                </View>
              )}
            />

            {/* <View style={styles.views}>
                            <Text style={styles.iTotal}>Item Total</Text>
                            <View>
                                <Text style={[styles.total, { marginRight: 1 }]}>{selector.products[0].title}</Text>
                            </View>
                        </View>
                        <View style={styles.views}>
                            <Text style={styles.iTotal}>Item Total</Text>
                            <View>
                                <Text style={[styles.total, { marginRight: 1 }]}>{selector.products[0].total}</Text>
                            </View>
                        </View> */}

            {/* <View style={styles.via}>
                            <Text style={styles.paid}>{`Paid Via CCAvenue`}</Text>
                            <View>
                                <Text style={[styles.sel, { marginRight: 1 }]}>{`Total  ₹${selector.orderTotal}`}</Text>
                            </View>
                        </View> */}
            <Text style={styles.sum}>Order History</Text>
            <FlatList
              data={selector.histories}
              renderItem={({item}) => (
                <View
                  style={[
                    styles.checkv,
                    {borderBottomWidth: 0.5, borderColor: 'grey'},
                  ]}>
                  <Text style={[styles.orders, {width: '90%'}]}>
                    {item.date_added}
                  </Text>
                  <Text style={[styles.orders, {width: '90%'}]}>
                    {item.status}
                  </Text>
                  <Text
                    style={[
                      styles.orders,
                      {width: '90%', marginBottom: item.comment ? 14 : 0},
                    ]}>
                    {item.comment}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
      <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
    </View>
  );
};
export default OrderDetail;
