import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  Alert,
} from 'react-native';
import BottomTab from '../../../components/BottomTab';
import {
  useNavigation,
  DrawerActions,
  useIsFocused,
} from '@react-navigation/native';
import Header from '../../../components/Header';
import Done from '../../../assets/Svg/Done.svg';
import Multi from '../../../assets/Svg/multiply.svg';
import Plus from '../../../assets/Svg/plus1.svg';
import Location from '../../../assets/Svg/location.svg';
import styles from './style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../components/AsyncStorage';
import Loader from '../../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import NetInfo from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';
import Modal from 'react-native-modal';
import Edit from '../../../assets/Svg/edit.svg';
Geocoder.init('AIzaSyAEAzAu0Pi_HLLURabwR36YY9_aiFsKrsw');

const Payment = () => {
  const navigation = useNavigation();
  const [instruction, setInstruction] = useState('');
  const [isFetching, setFetching] = useState(false);
  const [data, setData] = useState('');
  const selector = useSelector(state => state.Auth.Address);
  const isFetching1 = useSelector(state => state.Auth.isFetching);
  const dispatch = useDispatch();
  const [qty, setQty] = useState('');
  const isFocused = useIsFocused();
  const [product, setProduct] = useState([]);
  const [visible, setVisible] = useState(false);
  const coupon = useSelector(state => state.Coupon);
  const [total, setTotal] = useState([]);
  const [input, setInut] = useState(useSelector(state => state.Coupon));

  useEffect(() => {
    if (isFocused) {
      firstCall();
    } else {
      firstCall();
    }
  }, [isFocused]);
  console.log('this isjdh', coupon);
  const firstCall = async () => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const id = await AsyncStorage.getItem(Storage.store_id);

    try {
      setFetching(true);
      const data = new FormData();
      data.append('api_token', '123456');
      data.append('customer_id', customer_id);
      data.append('store_id', id);
      data.append('coupon', coupon);
      console.log('first call UUUUU...', coupon);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiorder2/cart',
      });
      console.log('FFFFFFFFFFFFFFFFFFFFFFFFF', response.data);
      if (response.data) {
        // console.log('this is MMMMMMMMMM total', response.data);
        // console.log('this is NNNNNNNNNN response', response);
        setData(response.data);
        setProduct(response.data.products);
        setTotal(response.data.totals);
        if (response.data?.coupon_status) {
          setInut(response.data.coupon);
          dispatch({
            type: 'add_coupon',
            payload: response.data.coupon,
          });
        }
        setFetching(false);
        // console.log('this is data', response.data);
      } else {
        setFetching(false);
        dispatch({
          type: 'remove_coupon',
        });
      }
    } catch (error) {
      setFetching(false);
    }

    dispatch({
      type: 'Shipping_List_Request',
      url: 'apiorder/shippingMethods',
      navigation: navigation,
    });

    dispatch({
      type: 'Time_Drop_Request',
      url: 'apiorder/orderpickuptime',
      store_id: id,
    });
    dispatch({
      type: 'Get_Address_Request',
      url: 'apiorder/addressById',
      customer_id: customer_id,
      address_id: 0,
    });
    useEffect(() => {
      dispatch({
        type: 'City_List_Request',
        url: 'apiorder/getStates',
        country_id: '99',
      });
    }, []);
  };
  const ApplyCoupon = async (coupn, val) => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const id = await AsyncStorage.getItem(Storage.store_id);

    try {
      setFetching(true);
      const data = new FormData();
      data.append('api_token', '123456');
      data.append('customer_id', customer_id);
      data.append('store_id', id);
      data.append('coupon', coupn);

      // console.log('sendCCCCCCCCCCCCCC', coupn);
      // console.log('sendCCCCCCCCCCCCCC', customer_id);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiorder/applyCoupon',
      });
      // console.log('FFFFFFFFFFFFFFFFFFFFFFFFF', response.data);
      if (response.data.coupon_status) {
        setData(response.data);
        setProduct(response.data.products);
        setTotal(response.data.totals);

        setInut(response.data.coupon);
        dispatch({
          type: 'add_coupon',
          payload: response.data.coupon,
        });

        setFetching(false);
        Toast.show(response.data.message);
      } else {
        setFetching(false);
        Toast.show(response.data.message);
        dispatch({
          type: 'remove_coupon',
        });
      }
    } catch (error) {
      setFetching(false);
    }
  };
  const DeleteCoupon = async coupn => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const id = await AsyncStorage.getItem(Storage.store_id);

    try {
      setFetching(true);
      const data = new FormData();
      data.append('api_token', '123456');
      data.append('customer_id', customer_id);
      data.append('store_id', id);
      data.append('coupon', coupn);

      // console.log('sendCCCCCCCCCCCCCC', coupn);
      // console.log('sendCCCCCCCCCCCCCC', customer_id);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiorder2/cart',
      });
      // console.log('FFFFFFFFFFFFFFFFFFFFFFFFF', response.data);
      if (response.data.coupon_status) {
        setData(response.data);
        setProduct(response.data.products);
        setTotal(response.data.totals);

        setInut(response.data.coupon);
        dispatch({
          type: 'add_coupon',
          payload: response.data.coupon,
        });

        setFetching(false);
        Toast.show('Coupon Applied');
      } else {
        setData(response.data);
        setProduct(response.data.products);
        setTotal(response.data.totals);
        dispatch({
          type: 'remove_coupon',
        });
        setFetching(false);
        Toast.show('Coupon Deleted');
      }
    } catch (error) {
      setFetching(false);
    }
  };
  const cou = async () => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const id = await AsyncStorage.getItem(Storage.store_id);

    try {
      setFetching(true);
      const data = new FormData();
      data.append('api_token', '123456');
      data.append('customer_id', customer_id);
      data.append('store_id', id);
      data.append('coupon', coupon);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'mulltipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiorder/applyCoupon',
      });
      console.log('thasisaisMMMMMMMMMMMMMMMMMMMM444444', response.data);
      if (response?.data?.coupon_status) {
        // console.log('this is MMMMMMMMMM total', response.data);
        // console.log('this is NNNNNNNNNN response', response);
        setData(response.data);
        setProduct(response.data.products);
        setTotal(response.data.totals);

        setFetching(false);

        Toast.show(response.data.message);
      } else {
        setTotal(response.data.totals);
        setFetching(false);
        Toast.show(response.data.message);
      }
    } catch (error) {
      setFetching(false);
      console.log('this is error', error);
    }
  };
  console.log(coupon);
  const updateCart = async item => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    if (item.quantity) {
      try {
        setFetching(true);
        const data = new FormData();
        data.append('api_token', '123456');
        data.append('customer_id', customer_id);
        data.append('cart_id', item.cart_id);
        data.append('coupon', coupon);
        data.append('quantity', parseInt(item.quantity) - 1);
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://merwans.co.in/index.php?route=api/apiorder/update_to_cart',
        });
        if (response.data) {
          setData(response.data);
          setProduct(response.data.products);
          setTotal(response.data.totals);
          setFetching(false);
        } else {
          setFetching(false);
        }
      } catch (error) {
        setFetching(false);
      }
    }
  };
  const updateCart1 = async item => {
    console.log('this is cart id', item.cart_id);
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    try {
      setFetching(true);
      const data = new FormData();
      data.append('api_token', '123456');
      data.append('customer_id', customer_id);
      data.append('coupon', coupon);
      data.append('cart_id', item.cart_id);
      data.append('quantity', parseInt(item.quantity) + 1);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiorder/update_to_cart',
      });
      if (response.data) {
        setData(response.data);
        setProduct(response.data.products);
        setTotal(response.data.totals);

        setFetching(false);
      } else {
        setFetching(false);
      }
    } catch (error) {
      setFetching(false);
    }
  };

  const updateCartInput = async (item, val, index) => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    if (val == '') {
      setQty(null);
    } else {
      setQty(val);
      try {
        setFetching(true);
        const data = new FormData();
        data.append('api_token', '');
        data.append('customer_id', customer_id);
        data.append('cart_id', item.cart_id);
        data.append('coupon', coupon);
        data.append('quantity', Number(val).toFixed());
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://merwans.co.in/index.php?route=api/apiorder/update_to_cart',
        });
        if (response.data) {
          setData(response.data);
          setProduct(response.data.products);

          setFetching(false);
        } else {
          setFetching(false);
        }
      } catch (error) {
        setFetching(false);
      }
    }
  };

  const manageAddress = async () => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const id = await AsyncStorage.getItem('Address_id');
    dispatch({
      type: 'Address_List_Request',
      url: 'apiorder/addressList',
      customer_id: customer_id,
      from: 'cart',
      navigation: navigation,
    });
  };
  const manageAddress1 = async () => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    navigation.navigate('AddressForm', {from: 'cart'});
  };
  const manageDunzo = async () => {
    if (qty == null) {
      Toast.show('Please enter product quantity');
    } else {
      const store_id = await AsyncStorage.getItem(Storage.store_id);
      const customer_id = await AsyncStorage.getItem(Storage.customer_id);
      Geocoder.from(
        `${selector.address_1} ${selector.address_2} ${selector.city}`,
      )
        .then(async json => {
          var location = json.results[0].geometry.location;
          if (location && store_id) {
            try {
              setFetching(true);

              const data1 = new FormData();
              data1.append('store_id', store_id);
              data1.append('customer_id', customer_id);
              data1.append('latitude', location.lat);
              data1.append('longitude', location.lng);
              const response = await axios({
                method: 'POST',
                data: data1,
                headers: {
                  'content-type': 'multipart/form-data',
                  Accept: 'multipart/form-data',
                },
                url: 'https://merwans.co.in/index.php?route=api/apiorder/dunzo',
              });
              if (response.data.status) {
                navigation.navigate('Quick', {
                  data: data,
                  dunzo: response.data,
                  lat: location.lat,
                  long: location.lng,
                  instruction: instruction,
                });
                setFetching(false);
              } else if (
                response.data.dunzo == false &&
                response.data.status == false
              ) {
                // Toast.show(response.data.message)
                // setVisible(true)
                // manageStore()
                // navigation.navigate('Quick', {
                //     data: data,
                //     dunzo: response.data,
                //     lat: location.lat,
                //     long: location.lng,
                //     instruction: instruction
                // })
                Alert.alert(
                  'Selected Location is out of Delivery Area!',
                  `\nDo you want to Change Address/Store?`,
                  [
                    {
                      text: 'YES',
                      style: 'cancel',
                    },
                    {
                      text: 'NO',
                      onPress: () =>
                        navigation.navigate('Quick', {
                          data: data,
                          dunzo: response.data,
                          lat: location.lat,
                          long: location.lng,
                          instruction: instruction,
                        }),
                    },
                  ],
                );
                setFetching(false);
              } else {
                Toast.show(response.data.message);
                setFetching(false);
              }
            } catch (error) {
              setFetching(false);
            }
          } else {
            Toast.show('Something went wrong');
          }
        })
        .catch(error => console.warn(error));
    }
  };

  return (
    <View style={{flex: 1}}>
      {isFetching || isFetching1 ? <Loader /> : null}
      <ImageBackground
        style={{flex: 1}}
        source={require('../../../assets/Icon/bg.png')}>
        <ScrollView stickyHeaderIndices={[0]}>
          <Header
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
          {data && data.products.length > 0 ? (
            <View style={{paddingHorizontal: 5}}>
              <View style={styles.main}>
                <View style={styles.row}>
                  <View style={styles.done}>
                    <Done />
                  </View>
                  <Text style={styles.you}>
                    You can order for same day before 7pm or 8pm
                  </Text>
                </View>
                <Multi />
              </View>
              <View style={styles.your}>
                <Text style={styles.order}>Your Order</Text>
                <View style={{marginTop: -3}}>
                  <FlatList
                    data={data ? product : []}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          borderBottomWidth:
                            data.products.length - 1 == index ? 0 : 0.5,
                          borderColor: '#dae1ed',
                        }}>
                        <View style={[styles.list, {marginTop: 10}]}>
                          <View style={[styles.row, {width: '75.5%'}]}>
                            <View
                              style={{
                                height: 38,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              {item.p_type == 1 ? (
                                <View
                                  style={[styles.sq, {borderColor: '#0FAF33'}]}>
                                  <View
                                    style={[
                                      styles.dot,
                                      {backgroundColor: '#0FAF33'},
                                    ]}
                                  />
                                </View>
                              ) : (
                                <View
                                  style={[styles.sq, {borderColor: '#ED1717'}]}>
                                  <View
                                    style={[
                                      styles.dot,
                                      {backgroundColor: '#ED1717'},
                                    ]}
                                  />
                                </View>
                              )}
                            </View>
                            <View style={{width: '78%'}}>
                              <View style={{flexDirection: 'row'}}>
                                <View style={{marginLeft: 12}}>
                                  <Image
                                    style={{
                                      height: 38,
                                      width: 38,
                                      borderRadius: 5,
                                    }}
                                    source={{uri: item.image}}
                                  />
                                </View>
                                <View style={{marginTop: -1, marginLeft: 2}}>
                                  <Text style={styles.name}>{item.name}</Text>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginTop: 3,
                                    }}>
                                    <Text style={styles.price}>
                                      {item.price}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{marginLeft: 12, width: '100%'}}>
                                {item.option.length > 0 ? (
                                  <View style={{marginTop: 2}}>
                                    <Text
                                      style={
                                        styles.pric
                                      }>{`Size - ${item.option[0].value}`}</Text>
                                  </View>
                                ) : null}
                                {item.option.length > 1 ? (
                                  <View style={{marginTop: 2}}>
                                    <Text
                                      style={
                                        styles.pric
                                      }>{`Message - ${item.option[1].value}`}</Text>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          </View>

                          <View style={{alignItems: 'center'}}>
                            <View style={styles.view}>
                              <TouchableOpacity
                                style={{
                                  height: 20,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 20,
                                }}
                                onPress={() => updateCart(item)}>
                                <Image
                                  source={require('../../../assets/Icon/minus.png')}
                                />
                              </TouchableOpacity>
                              <TextInput
                                defaultValue={''}
                                value={product[index].quantity}
                                // value={
                                //     Number(product[index].quantity).toFixed(0)==''?'':Number(product[index].quantity).toFixed(0)
                                // }
                                onChangeText={val =>
                                  //
                                  {
                                    if (val == 0) {
                                      let newArr = [...product]; // copying the old datas array
                                      // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
                                      newArr[index].quantity = ''; // replace e.target.value with whatever you want to change it to
                                      setProduct(newArr);
                                      console.log('this i value', val);
                                    }
                                    {
                                      let newArr = [...product]; // copying the old datas array
                                      // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
                                      newArr[index].quantity = val; // replace e.target.value with whatever you want to change it to
                                      setProduct(newArr);
                                      updateCartInput(item, val, index);
                                    }
                                  }
                                }
                                style={{
                                  textAlign: 'center',
                                  minWidth: 20,
                                  fontSize: 11,
                                  color: '#ED1717',
                                  height: 40,
                                }}
                                maxLength={3}
                                keyboardType="numeric"
                              />

                              {/* <Text style={{ fontSize: 11, color: '#ED1717' }}>{item.quantity}</Text> */}
                              <TouchableOpacity
                                style={{
                                  height: 20,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 20,
                                }}
                                onPress={() => updateCart1(item)}>
                                <Plus />
                              </TouchableOpacity>
                            </View>
                            <View style={styles.bottom}>
                              <Text style={styles.pric}>{item.total}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{height: 10}} />
                      </View>
                    )}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setInstruction(true)}
                style={styles.inst}>
                {instruction ? (
                  <TextInput
                    style={styles.input}
                    placeholder="Add Instructions"
                    placeholderTextColor={'#000000'}
                    multiline={true}
                    value={instruction}
                    onChangeText={val => setInstruction(val)}
                  />
                ) : (
                  <Text style={styles.add}>Add Instructions</Text>
                )}
              </TouchableOpacity>

              <View style={styles.apply}>
                <View>
                  <Text style={styles.coupon}>Apply Coupon</Text>
                </View>
                {coupon === undefined || coupon === '' ? (
                  <View style={styles.cont}>
                    <View style={styles.border}>
                      <TextInput
                        style={styles.inputs}
                        placeholder="Enter your coupon here"
                        placeholderTextColor={'#000000'}
                        value={input}
                        onChangeText={text => setInut(text)}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        if (input == '' || input === undefined) {
                          Toast.show('Please enter a coupon code!');
                        } else {
                          ApplyCoupon(input);
                        }
                      }}
                      style={styles.btn}>
                      <Text style={styles.app}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      paddingVertical: 8,
                      paddingLeft: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: 'green', fontFamily: 'Montserrat-Medium'}}>
                      {coupon + ' ' + 'Applied Suceesefully'}
                    </Text>

                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={async () => {
                        setInut('');
                        DeleteCoupon('');
                      }}>
                      <Multi heigh={15} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Bill Summery */}
              <View style={styles.sum}>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <Text style={styles.bill}>Bill Summary</Text>
                  {/* <View style={styles.row1}>
                    <View style={styles.row}>
                      <Text style={styles.sub}>Sub-Total</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.total}>
                        {data ? data.totals[0].text : 0}
                      </Text>
                    </View>
                  </View> */}

                  {/* <View style={styles.row2}>
                    <Text style={styles.class}>Total</Text>
                    <View style={styles.row}>
                      <Text style={styles.last}>
                        {data ? data.totals[1].text : 0}
                      </Text>
                    </View>
                  </View> */}
                  <FlatList
                    data={total}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => {
                      return (
                        <View style={styles.row1}>
                          <View style={styles.row}>
                            <Text
                              style={
                                item.title === 'Total'
                                  ? styles.class
                                  : styles.sub
                              }>
                              {item.title}
                            </Text>
                          </View>
                          <View style={styles.row}>
                            <Text
                              style={
                                item.title === 'Total'
                                  ? styles.last
                                  : styles.total
                              }>
                              {item.text ? item.text : 0}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
              {/* Delivery At Home */}
              {selector ? (
                <TouchableOpacity
                  onPress={() => manageAddress()}
                  style={styles.dele}>
                  <View style={{marginTop: -12}}>
                    <Location />
                  </View>
                  <View style={{marginLeft: 8, width: '92%'}}>
                    <View style={styles.view1}>
                      <Text style={styles.home}>{`Delivery at`}</Text>
                      <TouchableOpacity
                        onPress={() => manageAddress()}
                        style={styles.btn1}>
                        <Text style={styles.change}>Change</Text>
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={
                        styles.floor
                      }>{`${selector.address_1} ${selector.address_2} ${selector.city}`}</Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              <View style={{paddingHorizontal: 15}}>
                {selector ? (
                  <TouchableOpacity
                    onPress={() => manageDunzo()}
                    style={styles.btns}>
                    <Text style={styles.pro}>{`Proceed To Checkout`}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => manageAddress1()}
                    style={styles.btns}>
                    <Text style={styles.pro}>{`Add Address`}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '80%',
                flexDirection: 'row',
              }}>
              <Text style={{textAlign: 'center', fontSize: 18, color: 'black'}}>
                Your cart is Empty!{' '}
              </Text>
              <View>
                <Text
                  onPress={() => navigation.navigate('Home')}
                  style={{fontSize: 18, color: 'black'}}>
                  Continue Shopping
                </Text>
                <View style={{borderWidth: 0.6}} />
              </View>
            </View>
          )}
          <View style={{height: 20}} />
        </ScrollView>
      </ImageBackground>
      <BottomTab home={false} search={false} cart={true} profile={false} />
      <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
    </View>
  );
};
export default Payment;
