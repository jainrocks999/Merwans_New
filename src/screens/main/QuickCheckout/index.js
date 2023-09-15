import React, { useState, useEffect, useF } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  BackHandler,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {
  useNavigation,
  DrawerActions,
  useIsFocused,
} from '@react-navigation/native';
import Multi from '../../../assets/Svg/multiply.svg';
import styles from './style';
import Header from '../../../components/Header';
import { RadioButton } from 'react-native-paper';
import Fast from '../../../assets/Svg/fast-delivery1.svg';
import Delivery from '../../../assets/Svg/fast-delivery.svg';
import Option from '../../../assets/Svg/option.svg';
import Plus from '../../../assets/Svg/plus1.svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../components/AsyncStorage';
import Loader from '../../../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Done from '../../../assets/Svg/Done3.svg';
import Done2 from '../../../assets/Svg/Done2.svg';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from 'react-native-flash-message';

const Payment = ({ route }) => {
  const navigation = useNavigation();
  // const [dunzo, setDunzo] = useState('checked');
  // const [pick, setPick] = useState();
  // const [selfdelivery, setSelfdelivery] = useState('unchecked');
  const [mcpg, setMcpg] = useState('checked');

  const [online, setOnline] = useState('checked');
  const [cash, setCash] = useState('unchecked');
  const inputRef = React.useRef();
  const [isFetching, setFetching] = useState(false);
  const [state, setState] = useState(0);
  const [data, setData] = useState();
  const selector = useSelector(state => state.Auth.Shipping);
  const selector1 = useSelector(state => state.Auth.Time);
  const detail = useSelector(state => state.Auth.UserDetail);
  const address = useSelector(state => state.Auth.Address);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(true);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(true);
  const coupon = useSelector(state => state.Coupon);

  const [shipingOption, setShipingOption] = useState('');
  const [shipingPrice, setShippingPrice] = useState();
  const [shippingMethod, setShippingMethod] = useState();
  const dispatch = useDispatch();
  const [qty, setQty] = useState('');
  const [product, setProduct] = useState();
  const [total, setTotal] = useState([]);
  const isFocused = useIsFocused();
  const [input, setInput] = useState(useSelector(state => state.Coupon));
  useEffect(() => {
    if (isFocused) {
      firstCall();
    }
  }, [isFocused]);
  const getIntialCode = () => {
    let value = Object.values(selector.shipping_methods)[0].quote;
    let code = Object.values(value)[0].code;
    setShipingOption(code);
    return code;
  };
  const getIntialPrice = () => {
    let value = Object.values(selector.shipping_methods)[0].quote;
    let price = Object.values(value)[0].cost;
    setShippingPrice(price);
    return price;
  };
  const getIntialMethod = () => {
    let value = Object.values(selector.shipping_methods)[0].quote;
    let title = Object.values(value)[0].title;

    setShippingMethod(title);
    return title;
  };

  const confirmOrder = async () => {
    if (qty == null) {
      Toast.show('Please enter product quantity');
    } else {
      const n = total.length - 1;
      const customer_id = await AsyncStorage.getItem(Storage.customer_id);
      const store_id = await AsyncStorage.getItem(Storage.store_id);
      const total2 = data.totals[n].text;
      const subTotal = data.totals[0].text;
      const shippingPrice = data.totals[1].text;

      if (toggleCheckBox1 == false) {
        Toast.show('Please select Privacy Policy');
      } else if (toggleCheckBox2 == false) {
        Toast.show('Please select Term & Conditions');
      } else if (shipingOption == 'pickup.pickup' && state == 0) {
        Toast.show('Please select Pickup Time');
      } else {
        try {
          setFetching(true);
          const data = new FormData();
          data.append('outlet_id', store_id);
          data.append('customer', '');
          data.append('customer_id', customer_id);
          data.append('firstname', detail.firstname);
          data.append('lastname', detail.lastname);
          data.append('email', detail.email);
          data.append('telephone', detail.telephone);
          data.append(
            'payment_method',
            'CCAvenue MCPG </br> <img src= "https://www.ccavenue.com/images_shoppingcart/ccavenue_pay_options.gif" width="80%" />',
          );
          data.append('payment_code', 'ccavenuepay');
          data.append('payment_firstname', detail.firstname);
          data.append('payment_lastname', detail.lastname);
          data.append('payment_address_id', detail.email);
          data.append('payment_address_1', address.address_1);
          data.append('payment_address_2', address.address_2);
          data.append('payment_city', address.city);
          data.append('payment_postcode', address.postcode);
          data.append('payment_country_id', address.country_id);
          data.append('payment_country', address.country);
          data.append('payment_zone_id', address.zone_id);
          data.append('payment_zone', address.zone);
          data.append('payment_latitude', '0.000000000000');
          data.append('payment_longitude', '0.000000000000');
          data.append('shipping_firstname', address.firstname);
          data.append('shipping_lastname', address.lastname);
          data.append('shipping_company', address.company);
          data.append('shipping_address_id', address.address_id);
          data.append('shipping_address_1', address.address_1);
          data.append('shipping_address_2', address.address_2);
          data.append('shipping_city', address.city);
          data.append('shipping_postcode', address.postcode);
          data.append('shipping_country_id', address.country_id);
          data.append('shipping_country', address.country);
          data.append('shipping_zone_id', address.zone_id);
          data.append('shipping_zone', address.zone);
          data.append('shipping_method', shippingMethod);
          data.append('shipping_latitude', route.params.lat);
          data.append('shipping_longitude', route.params.long);
          data.append('shipping_code', shipingOption);
          data.append('ip', '');
          data.append('user_agent', '');
          data.append('comment', '');
          data.append('total', total2);
          data.append('privacy', toggleCheckBox1);
          data.append('agree', toggleCheckBox2);
          data.append('subscribe', toggleCheckBox);
          data.append('payment_address_type', 'existing');
          data.append('shipping_address_type', 'existing');
          data.append('billing_name', `${detail.firstname} ${detail.lastname}`);
          data.append('billing_address', '');
          data.append('billing_state', '');
          data.append('billing_tel', detail.telephone);
          data.append('billing_zip', '');
          data.append('billing_country', '');
          data.append('delivery_zip', '');
          data.append('delivery_country', '');
          data.append('shippingPrice', shippingPrice);
          data.append('subTotal', subTotal);
          data.append('pickup_time', state);
          data.append('coupon', coupon);

          const response = await axios({
            method: 'POST',
            data,
            headers: {
              'content-type': 'multipart/form-data',
              Accept: 'multipart/form-data',
            },
            url: 'https://merwans.co.in/index.php?route=api/neworder/addOrder',
          });
          if (response.data.status == true) {
            try {
              setFetching(true);
              const data2 = new FormData();
              data2.append('instruction', route.params?.instruction);
              data2.append('orderId', response.data.order_id);
              const responsedata1 = await axios({
                method: 'POST',
                data: data2,
                headers: {
                  'content-type': 'multipart/form-data',
                  Accept: 'multipart/form-data',
                },
                url: 'https://merwans.co.in/index.php?route=api/apiorder/addInstruction',
              });

              if (responsedata1.data.status == true) {
                try {
                  setFetching(true);
                  const data1 = new FormData();
                  data1.append('token', 'abcd1234');
                  data1.append('store_id', store_id);
                  data1.append('order_id', response.data.order_id);
                  data1.append('amount', total2);
                  const responsedata = await axios({
                    method: 'POST',
                    data: data1,
                    headers: {
                      'content-type': 'multipart/form-data',
                      Accept: 'multipart/form-data',
                    },
                    url: 'https://merwans.co.in/index.php?route=api/checkout/payment',
                  });

                  if (responsedata.data) {
                    setFetching(false);
                    navigation.navigate('WebView', {
                      data: responsedata.data,
                      order_id: response.data.order_id,
                    });
                  } else {
                    setFetching(false);
                  }
                } catch (error) {
                  setFetching(false);
                }
                // navigation.navigate('WebView',{data:responsedata.data,order_id:response.data.order_id})
              } else {
                setFetching(false);
              }
            } catch (error) {
              setFetching(false);
            }
          } else {
            setFetching(false);
          }
        } catch (error) {
          setFetching(false);
          console.log(error);
        }
      }
    }
  };

  const firstCall = async msg => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const store_id = await AsyncStorage.getItem(Storage.store_id);
    const shiipingcode = getIntialCode();
    const shipingPrice = getIntialPrice();
    getIntialMethod();
    try {
      setFetching(true);
      const data = new FormData();
      data.append('api_token', '123456');
      data.append('store_id', store_id);
      data.append('customer_id', customer_id);
      data.append('coupon', coupon);
      data.append('shipping_code', shiipingcode);
      data.append('shipping_cost', shipingPrice);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiorder/cart',
      });
      console.log('this is dunxo response', response.data);
      if (response.data) {
        setData(response.data);
        setProduct(response.data.products);
        setTotal(response.data.totals);
        if (msg) {
          Toast.show(msg);
        }
        if (response.data?.coupon_status) {
          dispatch({
            type: 'add_coupon',
            payload: response.data?.coupon,
          });
          setInput(response.data?.coupon);
        }
        setFetching(false);
      } else {
        setFetching(false);
        dispatch({
          type: 'remove_coupon',
        });
      }
    } catch (error) {
      setFetching(false);
      console.log('EEEEEEEEEEE', error);
    }
  };
  const manageShipping = async (code, price, method) => {
    if (code != 'pickup.pickup') {
      setState(0);
    }
    setShippingPrice(price);
    setShipingOption(code);
    setShippingMethod(method);

    manageRadioDunzo(code, price);
    console.log(data.totals[2].text);
  };
  const ApplyCoupon = async coupn => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const id = await AsyncStorage.getItem(Storage.store_id);

    try {
      setFetching(true);
      const data = new FormData();
      data.append('api_token', '123456');
      data.append('customer_id', customer_id);
      data.append('store_id', id);
      data.append('coupon', coupn);
      data.append('shipping_code', shipingOption);
      data.append('shipping_cost', shipingPrice);

      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiorder/cart',
      });

      if (response?.data?.coupon_status) {
        setData(response.data);
        setProduct(response.data.products);
        setTotal(response.data.totals);

        setInput('');
        dispatch({
          type: 'add_coupon',
          payload: response.data.coupon,
        });

        setFetching(false);
        Toast.show('Coupon Applied');
      } else {
        setFetching(false);

        Toast.show('Invalid or Expiered Coupon');
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
      data.append('shipping_code', shipingOption);
      data.append('shipping_cost', shipingPrice);

      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiorder/cart',
      });
      // console.log('FFFFFFFFFFFFFFFFFFFFFFFFF', response.data);
      if (response.data.coupon_status) {
        setData(response.data);
        setProduct(response.data.products);
        setTotal(response.data.totals);

        setInput(response.data.coupon);
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

  const manageRadioDunzo = async (code, price) => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    try {
      setFetching(true);
      const data = new FormData();
      data.append('api_token', '123456');
      data.append('customer_id', customer_id);
      data.append('coupon', coupon);
      data.append('coupon', coupon);
      data.append('shipping_code', code);
      data.append('shipping_cost', price);

      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiorder/cart',
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
  // const manageRadioPick = async () => {
  //   const customer_id = await AsyncStorage.getItem(Storage.customer_id);
  //   try {
  //     setFetching(true);
  //     const data = new FormData();
  //     data.append('api_token', '123456');
  //     data.append('customer_id', customer_id);
  //     data.append('coupon', coupon);
  //     data.append(
  //       'shipping_code',
  //       selector.shipping_methods.pickup.quote.pickup.code,
  //     );
  //     data.append('shipping_cost', 0);
  //     const response = await axios({
  //       method: 'POST',
  //       data,
  //       headers: {
  //         'content-type': 'multipart/form-data',
  //         Accept: 'multipart/form-data',
  //       },
  //       url: 'https://merwans.co.in/index.php?route=api/apiorder2/cart',
  //     });

  //     if (response.data) {
  //       setData(response.data);
  //       setProduct(response.data.products);
  //       setTotal(response.data.totals);
  //       setFetching(false);
  //     } else {
  //       setFetching(false);
  //     }
  //   } catch (error) {
  //     setFetching(false);
  //   }
  // };

  // const manageDunzo = () => {
  //   setDunzo('checked');
  //   setPick('unchecked');
  // };
  // const managePick = () => {
  //   setDunzo('unchecked');
  //   setPick('checked');
  //   manageRadioPick();
  // };
  const manageMcpg = () => {
    setMcpg('checked');
    setOnline('unchecked');
    setCash('unchecked');
  };
  const manageOnline = () => {
    setMcpg('unchecked');
    setOnline('checked');
    setCash('unchecked');
  };
  const manageCash = () => {
    setMcpg('unchecked');
    setOnline('unchecked');
    setCash('checked');
  };

  const updateCart = async item => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    if (item.quantity) {
      console.log('this is coutpon', coupon);
      try {
        setFetching(true);
        const data = new FormData();
        data.append('api_token', '123456');
        data.append('customer_id', customer_id);
        data.append('cart_id', item.cart_id);
        data.append('coupon', coupon);
        data.append('quantity', parseInt(item.quantity) - 1);
        data.append('shipping_code', shipingOption);
        data.append('shipping_cost', shipingPrice);

        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://merwans.co.in/index.php?route=api/apiorder/update_to_cart',
        });
        console.log('this is shiipiggigig', JSON.stringify(response.data));
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
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    try {
      setFetching(true);
      const data = new FormData();
      data.append('api_token', '123456');
      data.append('customer_id', customer_id);
      data.append('cart_id', item.cart_id);
      data.append('quantity', parseInt(item.quantity) + 1);
      data.append('coupon', coupon);
      data.append('shipping_code', shipingOption);
      data.append('shipping_cost', shipingPrice);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiorder/update_to_cart',
      });
      console.log('this is shiipiggigig', JSON.stringify(response.data));
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

  const updateCartInput = async (item, val) => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    if (val == '') {
      setQty(null);
    } else {
      setQty(val);
      try {
        setFetching(true);
        const data = new FormData();
        data.append('api_token', '123456');
        data.append('customer_id', customer_id);
        data.append('cart_id', item.cart_id);
        data.append('quantity', Number(val).toFixed());
        data.append('coupon', coupon);
        data.append('shipping_code', shipingOption);
        data.append('shipping_cost', shipingPrice);
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
  const version = Platform.OS;
  return (
    <View style={{ flex: 1 }}>
      {isFetching ? <Loader /> : null}
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../../assets/Icon/bg.png')}>
        {data && data.products ? (
          <ScrollView stickyHeaderIndices={[0]}>
            <Header
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
            <View style={styles.container}>
              <Text style={styles.quick}>Quick Checkout</Text>
            </View>
            {data && data.products.length > 0 ? (
              <View style={{ paddingHorizontal: 5 }}>
                <View style={[styles.ship, { marginTop: 15 }]}>
                  <Text style={styles.shipp}>Shipping Method</Text>
                  <View style={{ height: 14 }} />
                  {Object.values(selector.shipping_methods).map(
                    (item, index) => {
                      return (
                        <View>
                          <View style={styles.checkV}>
                            <Fast />
                            <View style={[{ marginLeft: 6 }]}>
                              {/* <RadioButton
                              value="first"
                              status={index === 0 ? 'checked' : 'unchecked'}
                              onPress={() => manageDunzo()}
                              uncheckedColor="#ED1B1A"
                              color="#ED1B1A"
                            /> */}

                              {version == 'ios' ? (
                                <TouchableOpacity
                                  onPress={() =>
                                    manageShipping(
                                      Object.values(item.quote)[0].code,
                                      Object.values(item.quote)[0].cost,
                                      Object.values(item.quote)[0].title,
                                    )
                                  }
                                  style={{ margin: 5 }}>
                                  {Object.values(item.quote)[0].code === shipingOption ? <Done width={26} height={25} /> : <Done2 width={26} height={25} />}
                                </TouchableOpacity>
                              ) : (
                                <RadioButton
                                  value="first"
                                  status={
                                    Object.values(item.quote)[0].code ===
                                      shipingOption
                                      ? 'checked'
                                      : 'unchecked'
                                  }
                                  onPress={() =>
                                    manageShipping(
                                      Object.values(item.quote)[0].code,
                                      Object.values(item.quote)[0].cost,
                                      item.title,
                                    )
                                  }
                                  uncheckedColor="#ED1B1A"
                                  color="#ED1B1A"
                                />
                              )}
                            </View>
                            <Text style={styles.dunzo}>{`${Object.values(item.quote)[0].title
                              } - ${Object.values(item.quote)[0].text}`}</Text>
                          </View>
                          {Object.values(item.quote)[0].code ===
                            'pickup.pickup' &&
                            shipingOption === 'pickup.pickup' ? (
                            <View style={styles.view1}>
                              <Text style={styles.time}>{'Pickup Time'}</Text>
                              <View style={styles.drop}>
                                <RNPickerSelect
                                  onValueChange={val => setState(val)}
                                  items={selector1}
                                  style={{
                                    inputAndroid: {
                                      color: '#000000',
                                      width: '100%',
                                      fontSize: 14,
                                      marginBottom: 0,
                                      fontFamily: 'Montserrat-Medium',
                                      includeFontPadding: false,
                                      padding: 0,
                                      margin: 0,
                                      marginRight: 20,
                                      // borderWidth:1,
                                      paddingHorizontal: 8,
                                    },
                                    inputIOS: {
                                      color: '#000000',
                                      width: '100%',
                                      fontSize: 14,
                                      marginBottom: 0,
                                      fontFamily: 'Montserrat-Medium',
                                      includeFontPadding: false,
                                      padding: 0,
                                      margin: 0,
                                      marginRight: 20,
                                      paddingHorizontal: 8,
                                    },
                                    placeholder: {
                                      color: '#000000',
                                      width: '100%',
                                      fontSize: 14,
                                      marginBottom: 0,
                                      fontFamily: 'Montserrat-Medium',
                                      includeFontPadding: false,
                                      padding: 0,
                                      margin: 0,
                                      marginRight: 20,
                                    },
                                  }}
                                  value={
                                    state == null || state == 0 ? '' : state
                                  }
                                  useNativeAndroidPickerStyle={false}
                                  placeholder={{ label: 'Time', value: '' }}
                                  Icon={() => (
                                    <Image
                                      style={{
                                        width: 10,
                                        height: 6,
                                        marginRight: 8,
                                        marginTop: 8,
                                      }}
                                      source={require('../../../assets/Icon/down.png')}
                                    />
                                  )}
                                />
                              </View>
                            </View>
                          ) : null}
                        </View>
                      );
                    },
                  )}
                  {/* {route.params.dunzo.isDunzoActive &&
                  (route.params.dunzo.message == 'Not serviceable' ||
                    route.params.dunzo.message ==
                      'Selected Location is out of Delivery Area, proceed with Store Pickup') ? (
                    <View style={{height: 14}} />
                  ) : (
                    <View style={styles.checkV}>
                      <Fast />
                      <View style={[{marginLeft: 6}]}>
                        {dunzo == 'checked' ? (
                          <RadioButton
                            value="first"
                            status={dunzo}
                            onPress={() => manageDunzo()}
                            uncheckedColor="#ED1B1A"
                            color="#ED1B1A"
                          />
                        ) : version == 'ios' ? (
                          <TouchableOpacity
                            onPress={() => manageDunzo()}
                            style={{margin: 5}}>
                            <Done width={26} height={25} />
                          </TouchableOpacity>
                        ) : (
                          <RadioButton
                            value="first"
                            status={dunzo}
                            onPress={() => manageDunzo()}
                            uncheckedColor="#ED1B1A"
                            color="#ED1B1A"
                          />
                        )}
                      </View>
                      <Text style={styles.dunzo}>{`${
                        selector.shipping_methods.dunzo.quote.dunzo.title
                      } - ₹${parseInt(
                        route.params.dunzo.price ? route.params.dunzo.price : 0,
                      ).toFixed(2)}`}</Text>
                    </View>
                  )}
                  <View style={styles.pick}>
                    {/* <Delivery />
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('../../../assets/Icon/shop.png')}
                    />
                    <View style={[{marginLeft: 6}]}>
                      {pick == 'checked' ? (
                        <RadioButton
                          value="first"
                          status={pick}
                          onPress={() => managePick()}
                          uncheckedColor="#ED1B1A"
                          color="#ED1B1A"
                        />
                      ) : version == 'ios' ? (
                        <TouchableOpacity
                          onPress={() => managePick()}
                          style={{margin: 5}}>
                          <Done width={26} height={25} />
                        </TouchableOpacity>
                      ) : (
                        <RadioButton
                          value="first"
                          status={pick}
                          onPress={() => managePick()}
                          uncheckedColor="#ED1B1A"
                          color="#ED1B1A"
                        />
                      )}
                    </View>
                    <Text
                      style={
                        styles.dunzo
                      }>{`${selector.shipping_methods.pickup.quote.pickup.title} - ${selector.shipping_methods.pickup.quote.pickup.text}`}</Text>
                  </View> */}
                </View>

                <View style={[styles.ship, { marginTop: 15 }]}>
                  <Text style={styles.pay}>Payment Method</Text>
                  <View style={styles.view2}>
                    <View style={[{ marginLeft: -7 }]}>
                      {mcpg == 'checked' ? (
                        <RadioButton
                          value="first"
                          status={mcpg}
                          onPress={() => manageMcpg()}
                          uncheckedColor="#ED1B1A"
                          color="#ED1B1A"
                        />
                      ) : version == 'ios' ? (
                        <TouchableOpacity
                          onPress={() => manageMcpg()}
                          style={{ margin: 5 }}>
                          <Done width={26} height={25} />
                        </TouchableOpacity>
                      ) : (
                        <RadioButton
                          value="first"
                          status={mcpg}
                          onPress={() => manageMcpg()}
                          uncheckedColor="#ED1B1A"
                          color="#ED1B1A"
                        />
                      )}
                      {/* <View style={{width:40,marginTop:10,marginBottom:20}}/> */}
                    </View>
                    <Text style={styles.cc}>{'CCAvenue MCPG'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    {/* <View style={[{ marginLeft: -7, marginTop: -7 }]}>
                                    {online == 'checked' ? <RadioButton
                                        value="first"
                                        status={online}
                                        onPress={() => manageOnline()}
                                        uncheckedColor='#ED1B1A'
                                        color='#ED1B1A'
                                    /> :
                                        version == 'ios' ?
                                            <TouchableOpacity onPress={() => manageOnline()}
                                                style={{ margin: 5 }}>
                                                <Done width={26} height={25} />
                                            </TouchableOpacity> :
                                            <RadioButton
                                                value="first"
                                                status={online}
                                                onPress={() => manageOnline()}
                                                uncheckedColor='#ED1B1A'
                                                color='#ED1B1A'
                                            />
                                    }
                                </View> */}
                    <View style={{ width: '90%', marginLeft: 3 }}>
                      <Option width={'100%'} />
                    </View>
                  </View>
                  {/* <View style={styles.first}>
                                <View style={[{ marginLeft: -7 }]}>
                                    {cash == 'checked' ? <RadioButton
                                        value="first"
                                        status={cash}
                                        onPress={() => manageCash()}
                                        uncheckedColor='#ED1B1A'
                                        color='#ED1B1A'
                                    /> :
                                        version == 'ios' ?
                                            <TouchableOpacity onPress={() => manageCash()}
                                                style={{ margin: 5 }}>
                                                <Done width={26} height={25} />
                                            </TouchableOpacity> :
                                            <RadioButton
                                                value="first"
                                                status={cash}
                                                onPress={() => manageCash()}
                                                uncheckedColor='#ED1B1A'
                                                color='#ED1B1A'
                                            />
                                    }
                                </View>
                                <Text style={styles.cash}>{'Cash On Delivery'}</Text>
                            </View> */}
                </View>
                {route.params?.instruction ? (
                  <View style={styles.inst}>
                    <View>
                      <Text style={styles.coupon}>Instructions</Text>
                    </View>
                    <Text style={{ marginTop: 8, color: '#000' }}>
                      {route.params?.instruction}
                    </Text>
                  </View>
                ) : null}
                <View style={[styles.ship, { marginTop: 15 }]}>
                  <View>
                    <Text style={styles.coupon}>Apply Coupon</Text>
                  </View>
                  {coupon === undefined || coupon === '' ? (
                    <View style={styles.apply}>
                      <View style={[styles.input]}>
                        <TextInput
                          style={styles.inputs}
                          placeholder="Enter your coupon here"
                          placeholderTextColor={'#000000'}
                          value={input}
                          onChangeText={text => {
                            setInput(text);
                          }}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (input === '' || input === undefined) {
                            Toast.show('Please enter a coupon code!');
                          } else {
                            ApplyCoupon(input);
                          }
                        }}
                        style={styles.btn}>
                        <Text style={styles.aware}>Apply</Text>
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
                        style={{
                          color: 'green',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        {coupon + ' ' + 'Applied Suceesefully'}
                      </Text>

                      <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={async () => {
                          setInput('');
                          DeleteCoupon('');
                        }}>
                        <Multi heigh={15} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={[styles.ship, { marginTop: 15 }]}>
                  <View>
                    <Text style={styles.order}>Your Order</Text>
                    <View style={{ marginTop: -3 }}>
                      <FlatList
                        data={data ? product : []}
                        renderItem={({ item, index }) => (
                          <View
                            style={{
                              borderBottomWidth:
                                data.products.length - 1 == index ? 0 : 0.5,
                              borderColor: '#dae1ed',
                            }}>
                            <View style={styles.border}>
                              <View style={[styles.color, { width: '75.5%' }]}>
                                <View
                                  style={{
                                    height: 38,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  {item.p_type == 1 ? (
                                    <View
                                      style={[
                                        styles.flex,
                                        { borderColor: '#0FAF33' },
                                      ]}>
                                      <View
                                        style={[
                                          styles.line,
                                          { backgroundColor: '#0FAF33' },
                                        ]}
                                      />
                                    </View>
                                  ) : (
                                    <View
                                      style={[
                                        styles.flex,
                                        { borderColor: '#ED1B1A' },
                                      ]}>
                                      <View
                                        style={[
                                          styles.line,
                                          { backgroundColor: '#ED1B1A' },
                                        ]}
                                      />
                                    </View>
                                  )}
                                </View>
                                <View style={{ width: '85%' }}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: 12 }}>
                                      <Image
                                        style={{
                                          height: 38,
                                          width: 38,
                                          borderRadius: 5,
                                        }}
                                        source={{ uri: item.image }}
                                      />
                                    </View>
                                    <View
                                      style={{ marginTop: -1, marginLeft: 2 }}>
                                      <Text style={styles.data}>
                                        {item.name}
                                      </Text>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          marginTop: 3,
                                        }}>
                                        <Text style={styles.pri}>
                                          {item.price}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View style={{ marginLeft: 12, width: '100%' }}>
                                    {item.option.length > 0 ? (
                                      <View style={{ marginTop: 2 }}>
                                        <Text
                                          style={
                                            styles.pric
                                          }>{`Size - ${item.option[0].value}`}</Text>
                                      </View>
                                    ) : null}
                                    {item.option.length > 1 ? (
                                      <View style={{ marginTop: 2 }}>
                                        <Text
                                          style={
                                            styles.pric
                                          }>{`Message - ${item.option[1].value}`}</Text>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              </View>
                              <View style={{ alignItems: 'center' }}>
                                <View style={styles.cont}>
                                  <TouchableOpacity
                                    style={styles.uri}
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
                                        //console.log('this i value', val);
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
                                    style={styles.uri}
                                    onPress={() => updateCart1(item)}>
                                    <Plus />
                                  </TouchableOpacity>
                                </View>
                                <View style={styles.bottom}>
                                  <Text style={styles.pric}>{item.total}</Text>
                                </View>
                              </View>
                            </View>
                            <View style={{ height: 10 }} />
                          </View>
                        )}
                      />
                    </View>
                  </View>
                </View>
                <View style={[styles.ship, { marginTop: 15 }]}>
                  <View>
                    <View style={styles.bill}>
                      <Text style={styles.bll}>Bill Summary</Text>

                      {/* <View style={styles.row1}>
                        <Text style={styles.sub}>{data.totals[0].title}</Text>
                        <Text style={styles.rok}>{data.totals[0].text}</Text>
                      </View>

                      <View style={styles.row2}>
                        <Text style={styles.sub}>{data.totals[1].title}</Text>
                        <Text style={styles.rok}>{data.totals[1].text}</Text>
                      </View>
                      <View style={styles.row2}>
                        <Text style={styles.total}>{data.totals[2].title}</Text>
                        <Text style={styles.sp}>{data.totals[2].text}</Text>
                      </View> */}
                      <FlatList
                        data={total}
                        keyExtractor={(item, index) => index}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={styles.row1}>
                              <View style={styles.row2}>
                                <Text
                                  style={
                                    item.title === 'Total'
                                      ? styles.total
                                      : styles.sub
                                  }>
                                  {item.title}
                                </Text>
                              </View>
                              <View style={styles.row2}>
                                <Text
                                  style={
                                    item.title === 'Total'
                                      ? styles.total
                                      : styles.sub
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
                </View>
                <View style={[styles.ship, { marginTop: 15 }]}>
                  <View>
                    <Text style={styles.bll}>Confirm Your Order</Text>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => inputRef.current.focus()}
                      style={styles.touch}>
                      <TextInput
                        ref={inputRef}
                        placeholderTextColor={'#000000'}
                        style={styles.input1}
                        placeholder="Add Comments About Your Order"
                        multiline={true}
                      />
                    </TouchableOpacity>
                    <View style={[styles.view, { marginTop: 10 }]}>
                      {/* <Checkbox
                                        value="red"
                                        size="sm"
                                        defaultIsChecked={false}
                                        colorScheme='green'
                                        borderRadius={'none'}
                                        borderWidth={1.2}
                                    /> */}
                      <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={newValue => setToggleCheckBox(newValue)}
                        tintColors={{ true: '#ED1B1A', false: 'grey' }}
                        onTintColor="#ED1B1A"
                        onCheckColor="#ED1B1A"
                        boxType="square"
                        style={{
                          height: Platform.OS == 'android' ? 17 : 17,
                          width: Platform.OS == 'android' ? 30 : 17,
                        }}
                      />
                      <Text
                        style={[
                          styles.check1,
                          { width: '96%', marginLeft: 10, marginTop: 9 },
                        ]}>
                        I wish to subscribe to the Merwans Confectioners Pvt.
                        Ltd. newsletter.
                      </Text>
                    </View>
                    <View style={styles.view}>
                      {/* <Checkbox
                                        value="red"
                                        size="sm"
                                        defaultIsChecked={false}
                                        colorScheme='green'
                                        borderRadius={'none'}
                                        borderWidth={1.2}
                                    /> */}
                      <CheckBox
                        disabled={false}
                        value={toggleCheckBox1}
                        onValueChange={newValue => setToggleCheckBox1(newValue)}
                        tintColors={{ true: '#ED1B1A', false: 'grey' }}
                        onTintColor="#ED1B1A"
                        onCheckColor="#ED1B1A"
                        boxType="square"
                        style={{
                          height: Platform.OS == 'android' ? 17 : 17,
                          width: Platform.OS == 'android' ? 30 : 17,
                        }}
                      />
                      <View style={styles.have}>
                        <Text style={styles.check1}>
                          {'I have read and agree to the '}
                        </Text>
                        <TouchableOpacity onPress={() => Policy()}>
                          <Text style={styles.priv}>Privacy Policy</Text>
                          <View
                            style={{ borderWidth: 0.5, borderColor: '#000' }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.views}>
                      <CheckBox
                        disabled={false}
                        value={toggleCheckBox2}
                        onValueChange={newValue => setToggleCheckBox2(newValue)}
                        tintColors={{ true: '#ED1B1A', false: 'grey' }}
                        onTintColor="#ED1B1A"
                        onCheckColor="#ED1B1A"
                        boxType="square"
                        style={{
                          height: Platform.OS == 'android' ? 17 : 17,
                          width: Platform.OS == 'android' ? 30 : 17,
                        }}
                      />
                      {/* <Checkbox
                                        value="red"
                                        size="sm"
                                        defaultIsChecked={false}
                                        colorScheme='green'
                                        borderRadius={'none'}
                                        borderWidth={1.2}
                                        on
                                    /> */}
                      <View style={styles.amage}>
                        <Text style={styles.check1}>
                          {'I have read and agree to the '}
                        </Text>
                        <TouchableOpacity onPress={() => Term()}>
                          <Text style={styles.term}>
                            {'Terms & Conditions'}
                          </Text>
                          <View
                            style={{ borderWidth: 0.5, borderColor: '#000' }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{ paddingHorizontal: 0 }}>
                      <TouchableOpacity
                        onPress={() => confirmOrder()}
                        style={styles.mainBtn}>
                        <Text style={styles.confirm1}>{`Confirm Order`}</Text>
                      </TouchableOpacity>
                      <View style={{ height: 10 }} />
                    </View>
                  </View>
                </View>
                <View style={{ height: 20 }} />
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
                <Text style={{ textAlign: 'center', fontSize: 18 }}>
                  Your cart is Empty!{' '}
                </Text>
                <View>
                  <Text
                    onPress={() => navigation.navigate('Home')}
                    style={{ fontSize: 18 }}>
                    Continue Shopping
                  </Text>
                  <View style={{ borderWidth: 0.6 }} />
                </View>
              </View>
            )}
          </ScrollView>
        ) : (
          <Loader />
        )}
      </ImageBackground>

      {/* <BottomTab /> */}
      <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
    </View>
  );
};
export default Payment;
