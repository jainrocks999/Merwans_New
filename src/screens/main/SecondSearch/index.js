import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  ImageBackground,
} from 'react-native';
import Stars from 'react-native-stars';
import styles from './style';
import SwipeablePanel from 'react-native-sheets-bottom';
import {useNavigation} from '@react-navigation/native';
import BottomTab from '../../../components/BottomTab';
import {RadioButton} from 'react-native-paper';
import Plus from '../../../assets/Svg/plus.svg';
import Full from '../../../assets/Svg/fullStar.svg';
import Blank from '../../../assets/Svg/blankStar.svg';
import Heart from '../../../assets/Svg/heart.svg';
import HeartF from '../../../assets/Svg/heartf.svg';
import Poly from '../../../assets/Svg/poly.svg';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Loader from '../../../components/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Storage from '../../../components/AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Search1 from '../../../assets/Svg/search1.svg';
import Done from '../../../assets/Svg/Done.svg';
import NetInfo from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';

const CategoryList = () => {
  const [openPanel, setOpenPanel] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [pref, setPref] = useState('checked');
  const [msg, setMsg] = useState('unchecked');
  const [kg, setKg] = useState('unchecked');
  const [gram, setGram] = useState('checked');
  const selector = useSelector(state => state.List.CategoryList);
  const isFetching1 = useSelector(state => state.List.isFetching);
  const Fetching = useSelector(state => state.Auth.isFetching);
  const width = Dimensions.get('window').width;
  const [product, setProduct] = useState('');
  const [isFetching, setFetching] = useState(false);
  const inputRef = React.useRef();
  const inputRef1 = React.useRef();
  const length = selector.length;
  const [search, setSearch] = useState('');
  const [data1, setData1] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    AsyncStorage.setItem('pageKey', '');
    // NetInfo.addEventListener(state => {
    //   if(!state.isConnected){
    //   showMessage({
    //     message:'Please connect to your internet',
    //     type:'danger',
    //   });
    //   }
    // });
  }, []);

  const searchFilterFunction = async text => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const store_id = await AsyncStorage.getItem(Storage.store_id);
    try {
      // setSearch(text)
      const data = new FormData();
      data.append('search', text);
      data.append('customer_id', customer_id);
      data.append('store_id', store_id);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiproduct/search',
      });

      if (response.data) {
        setData1(response.data.products);
        // setSearch(text)
      } else {
        setFetching(false);
        // setSearch(text);
      }
    } catch (error) {
      setFetching(false);
    }
  };

  const handleSearch = () => {
    setSearch('');
    setData1([]);
  };

  const productDetail = async id => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const store_id = await AsyncStorage.getItem(Storage.store_id);
    if (customer_id) {
      setOpenPanel(true);
      try {
        setFetching(true);
        const data = new FormData();
        data.append('product_id', id);
        data.append('store_id', store_id);
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://merwans.co.in/index.php?route=api/apiproduct/productDetails',
        });
        if (response.data.status == true) {
          setFetching(false);
          setProduct(response.data.products);
          setOpenPanel(true);
          if (response.data.products.options.length > 0) {
            if (
              response.data.products?.options[0]?.product_option_value[0]
                ?.pickup_quantity > 0
            ) {
              setGram('checked');
              setKg('unchecked');
              console.log('small........');
            } else if (
              response.data.products?.options[0]?.product_option_value[1]
                ?.pickup_quantity > 0
            ) {
              setGram('unchecked');
              setKg('checked');
              console.log('large.....');
            } else {
              setGram('unchecked');
              setKg('unchecked');
            }
          } else {
            setGram('unchecked');
            setKg('unchecked');
          }
        }
      } catch (error) {
        throw error;
      }
    } else {
      // AsyncStorage.setItem("pageKey","SecondSearch")
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };

  const addItemToCart = async () => {
    setOpenPanel(false);
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const store_id = await AsyncStorage.getItem(Storage.store_id);
    if (product.options.length > 1) {
      dispatch({
        type: 'Add_Item_Request',
        url: 'apiorder/add_to_cart',
        customer_id: customer_id,
        product_id: product.products.product_id,
        select_key: product.options[0].product_option_id,
        select_value:
          gram == 'checked'
            ? product.options[0].product_option_value[0].product_option_value_id
            : product.options[0].product_option_value[1]
                .product_option_value_id,
        text_key: product.options[1].product_option_id,
        text_value: text,
        outlet_id: store_id,
        navigation: navigation,
      });
    } else if (product.options.length > 0) {
      dispatch({
        type: 'Add_Item_Request',
        url: 'apiorder/add_to_cart',
        customer_id: customer_id,
        product_id: product.products.product_id,
        select_key: product.options[0].product_option_id,
        select_value:
          gram == 'checked'
            ? product.options[0].product_option_value[0].product_option_value_id
            : product.options[0].product_option_value[1]
                .product_option_value_id,
        text_key: 0,
        text_value: '',
        outlet_id: store_id,
        navigation: navigation,
      });
    } else {
      dispatch({
        type: 'Add_Item_Request1',
        url: 'apiorder/add_to_cart',
        customer_id: customer_id,
        product_id: product.products.product_id,
        outlet_id: store_id,
        navigation: navigation,
      });
    }
  };

  const managePref = () => {
    setPref('checked');
    setMsg('unchecked');
  };
  const manageMsg = () => {
    setPref('unchecked');
    setMsg('checked');
  };
  const manageGram = () => {
    if (product.options[0].product_option_value[0].pickup_quantity > 0) {
      setGram('checked');
      setKg('unchecked');
    }
  };
  console.log('this is price', product?.products?.price);

  const largeManage = () => {
    if (product?.options[0]?.product_option_value[1]?.pickup_quantity <= 0) {
      return false;
    }
    return true;
  };
  const smallManage = () => {
    if (product?.options[0]?.product_option_value[0]?.pickup_quantity <= 0) {
      return false;
    }
    return true;
  };
  const manageKg = () => {
    if (product?.options[0]?.product_option_value[1]?.pickup_quantity > 0) {
      setGram('unchecked');
      setKg('checked');
    }
  };
  const addWish = async id => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id);
    const store_id = await AsyncStorage.getItem(Storage.store_id);
    try {
      setFetching(true);
      const data = new FormData();
      data.append('product_id', id);
      data.append('customer_id', customer_id);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiproduct/add_wishlist',
      });
      if (response.data.status == true) {
        setFetching(false);
        try {
          setSearch(text);
          const data2 = new FormData();
          data2.append('search', text);
          data2.append('customer_id', customer_id);
          data2.append('store_id', store_id);
          const response = await axios({
            method: 'POST',
            data: data2,
            headers: {
              'content-type': 'multipart/form-data',
              Accept: 'multipart/form-data',
            },
            url: 'https://merwans.co.in/index.php?route=api/apiproduct/search',
          });

          if (response.data) {
            setData1(response.data.products);
            setSearch(text);
          } else {
            setFetching(false);
            setSearch(text);
          }
        } catch (error) {
          setFetching(false);
        }
      } else {
        setFetching(false);
      }
    } catch (error) {
      throw error;
    }
  };

  const version = Platform.OS;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../../assets/Icon/bg.png')}>
        {isFetching || isFetching1 || Fetching ? <Loader /> : null}
        <View style={{marginTop: 15, paddingHorizontal: 10}}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => inputRef1.current.focus()}
              style={[styles.container1]}>
              <Search1 />
              <TextInput
                ref={inputRef1}
                placeholder="Cakes"
                style={[styles.search]}
                placeholderTextColor={'#000000'}
                onChangeText={val => searchFilterFunction(val)}
                onChange={val => setSearch(val)}
                value={search}
                returnKeyType="done"
              />
            </TouchableOpacity>
            {search ? (
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => handleSearch()}
                style={{
                  backgroundColor: '#ED1717',
                  borderRadius: 15,
                  justifyContent: 'center',
                  height: 30,
                  width: 30,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginRight: 10,
                    color: '#fff',
                    marginLeft: 10,
                    marginBottom: 3,
                  }}>
                  x
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 10}}>
            <View>
              <FlatList
                data={data1}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={10}
                maxToRenderPerBatch={5}
                initialNumToRender={5}
                renderItem={({item, index}) => (
                  <View
                    style={[
                      styles.view,
                      {borderBottomWidth: index == length - 1 ? 0 : 0.5},
                    ]}>
                    <View style={{width: '56%', marginTop: 20}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {item.p_type == 1 ? (
                          <View
                            style={[styles.view1, {borderColor: '#0FAF33'}]}>
                            <View
                              style={[
                                styles.border,
                                {backgroundColor: '#0FAF33'},
                              ]}
                            />
                          </View>
                        ) : item.p_type == 2 || item.p_type == 3 ? (
                          <View
                            style={[styles.view1, {borderColor: '#ED1B1A'}]}>
                            <View
                              style={[
                                styles.border,
                                {backgroundColor: '#ED1B1A'},
                              ]}
                            />
                          </View>
                        ) : null}
                        {/* <View style={styles.tag}>
                        <Text style={styles.best}>{'Best Seller'}</Text>
                      </View> */}
                        <Text style={styles.title}>{item.name}</Text>
                      </View>

                      <View style={styles.round}>
                        <Stars
                          disabled={true}
                          default={item.rating}
                          spacing={3}
                          count={5}
                          starSize={12}
                          fullStar={<Blank />}
                          emptyStar={<Full />}
                        />
                        {/* <Text style={styles.review}>{'142 Reviews'}</Text> */}
                      </View>
                      <View style={styles.views}>
                        <Text style={styles.price}>{item.price}</Text>
                      </View>
                      <View style={{marginTop: 6}}>
                        <Text style={styles.desc}>
                          {item.description}
                          {/* <Text style={styles.more}>{'  read more'}</Text> */}
                        </Text>
                      </View>
                      {item.favourite == false ? (
                        <TouchableOpacity
                          onPress={() => addWish(item.product_id)}
                          style={styles.image}>
                          <Heart height={14} width={14} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => addWish(item.product_id)}
                          style={styles.image}>
                          <HeartF height={14} width={14} />
                          {/* <Image 
                      style={{height:10,width:10,tintColor:'grey'}}  
                      source={require('../../../assets/Icon/heart.png')}/> */}
                        </TouchableOpacity>
                      )}
                      <View style={{height: 15}} />
                    </View>

                    <View style={styles.img}>
                      <Image
                        style={{
                          height: 122,
                          width: 122,
                          borderRadius: 15,
                          opacity:
                            item.quantity > 0 && item.p_status == 1 ? 1 : 0.2,
                        }}
                        source={{uri: item.thumb}}
                      />
                      <View style={styles.iview}>
                        {item.quantity > 0 && item.p_status == 1 ? (
                          <TouchableOpacity
                            delayPressIn={0}
                            activeOpacity={1}
                            onPress={() => productDetail(item.product_id)}
                            style={styles.addCont}>
                            <View />
                            <Text style={styles.add}>Add</Text>
                            <View style={{}}>
                              <Plus />
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            disabled
                            delayPressIn={0}
                            activeOpacity={1}
                            onPress={() => productDetail(item.product_id)}
                            style={styles.addCont1}>
                            <Text style={styles.add1}>Out of stock</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      {/* <View style={styles.cus}>
                      <Text style={styles.custo}>Customise</Text>
                    </View> */}
                    </View>
                  </View>
                )}
              />
              <View style={{marginBottom: 110}} />
            </View>
          </View>
        </ScrollView>
        <SwipeablePanel
          style={{borderTopLeftRedius: 0}}
          barStyle={{borderTopLeftRedius: 0}}
          fullWidth
          isActive={openPanel}
          onClose={() => setOpenPanel(false)}
          closeOnTouchOutside={() => setOpenPanel(false)}
          noBar={true}
          onlyLarge={true}
          showCloseButton={true}
          closeIconStyle={{backgroundColor: '#000'}}
          closeRootStyle={{
            backgroundColor: '#fff',
            marginTop: -60,
            marginRight: width / 2 - 40,
          }}>
          <View style={{flex: 1}}>
            {product && product.products ? (
              <ScrollView stickyHeaderIndices={[0]} style={{flex: 1}}>
                <KeyboardAwareScrollView
                  extraScrollHeight={10}
                  enableOnAndroid={true}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{flex: 1}}>
                  <View />
                  <View />
                  <ImageBackground
                    source={require('../../../assets/Icon/bg.png')}
                    style={{
                      backgroundColor: '#fff',
                      padding: 10,
                      height: msg == 'checked' ? 600 : 700,
                    }}>
                    <View style={styles.thumb}>
                      <Image
                        style={styles.url}
                        source={{uri: product.products.thumb}}
                      />
                    </View>
                    <Text style={styles.desclamer}>
                      Disclaimer Notice :- ACTUAL PRODUCT MAY VARY FROM SHOWN
                      IMAGES
                    </Text>
                    <View
                      style={[styles.bests, {justifyContent: 'space-between'}]}>
                      <View style={styles.bests1}>
                        {product.products.p_type == 1 ? (
                          <View
                            style={[styles.view1, {borderColor: '#0FAF33'}]}>
                            <View
                              style={[
                                styles.border,
                                {backgroundColor: '#0FAF33'},
                              ]}
                            />
                          </View>
                        ) : (
                          <View
                            style={[styles.view1, {borderColor: '#ED1717'}]}>
                            <View
                              style={[
                                styles.border,
                                {backgroundColor: '#ED1717'},
                              ]}
                            />
                          </View>
                        )}
                        {/* <View style={styles.tag}>
                    <Text style={styles.best}>{'Best Seller'}</Text>
                  </View> */}
                        <Text style={[styles.title, {marginLeft: 5}]}>
                          {product.products.name}
                        </Text>
                      </View>
                      {/* <View style={styles.image}>
                    <Image source={require('../../../assets/Icon/redHeart.png')} />
                  </View> */}
                    </View>
                    {/* <View style={styles.pname}>
                 
                
                </View> */}
                    <View style={styles.round1}>
                      <Stars
                        disabled={true}
                        default={product.products.rating}
                        spacing={3}
                        count={5}
                        starSize={12}
                        fullStar={require('../../../assets/Icon/fullstar.png')}
                        emptyStar={require('../../../assets/Icon/emptystar.png')}
                      />
                      <Text
                        style={
                          styles.review
                        }>{`${product.products.reviews} Reviews`}</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                      <Text style={styles.descr}>
                        {product.products.description}
                      </Text>
                    </View>
                    {product.options.length > 0 ? (
                      <View>
                        {product.options.length > 1 ? (
                          <View style={styles.show}>
                            <View style={{width: '48%'}}>
                              <TouchableOpacity
                                onPress={() => managePref()}
                                style={[
                                  styles.button,
                                  {
                                    backgroundColor:
                                      pref == 'checked' ? '#000000' : '#FFFFFF',
                                    borderWidth: 1,
                                    borderColor: '#000000',
                                  },
                                ]}>
                                <View />
                                <Text
                                  style={{
                                    color:
                                      pref == 'checked' ? '#FFFFFF' : '#000000',
                                    fontFamily: 'Montserrat-Medium',
                                    fontSize: 10,
                                  }}>
                                  {'Preference & Size'}
                                </Text>
                                <View>
                                  {pref == 'checked' ? (
                                    <RadioButton
                                      value="checked"
                                      status={pref}
                                      uncheckedColor="#ED1B1A"
                                      color="#ED1B1A"
                                      onPress={() => managePref()}
                                    />
                                  ) : version == 'ios' ? (
                                    <TouchableOpacity
                                      onPress={() => managePref()}
                                      style={{marginRight: 4}}>
                                      <Done width={26} height={25} />
                                    </TouchableOpacity>
                                  ) : (
                                    <RadioButton
                                      value="checked"
                                      status={pref}
                                      uncheckedColor="#ED1B1A"
                                      color="#ED1B1A"
                                      onPress={() => managePref()}
                                    />
                                  )}
                                </View>
                              </TouchableOpacity>
                              <View
                                style={{alignItems: 'center', marginTop: 2}}>
                                {pref == 'checked' ? <Poly /> : null}
                              </View>
                            </View>
                            <View style={{width: '48%'}}>
                              <TouchableOpacity
                                onPress={() => manageMsg()}
                                style={[
                                  styles.button,
                                  {
                                    backgroundColor:
                                      msg == 'checked' ? '#000000' : '#FFFFFF',
                                    borderWidth: 1,
                                    borderColor: '#000000',
                                  },
                                ]}>
                                <View />
                                <Text
                                  style={{
                                    color:
                                      msg == 'checked' ? '#FFFFFF' : '#000000',
                                    fontFamily: 'Montserrat-Medium',
                                    fontSize: 10,
                                    marginLeft: 20,
                                  }}>
                                  {'Message'}
                                </Text>
                                <View style={{}}>
                                  {msg == 'checked' ? (
                                    <RadioButton
                                      value="first"
                                      status={msg}
                                      onPress={() => manageMsg()}
                                      uncheckedColor="#000000"
                                      color="#ED1B1A"
                                    />
                                  ) : version == 'ios' ? (
                                    <TouchableOpacity
                                      onPress={() => manageMsg()}
                                      style={{marginRight: 4}}>
                                      <Done width={26} height={25} />
                                    </TouchableOpacity>
                                  ) : (
                                    <RadioButton
                                      value="first"
                                      status={msg}
                                      onPress={() => manageMsg()}
                                      uncheckedColor="#000000"
                                      color="#ED1B1A"
                                    />
                                  )}
                                </View>
                              </TouchableOpacity>
                              <View
                                style={{alignItems: 'center', marginTop: 2}}>
                                {msg == 'checked' ? <Poly /> : null}
                              </View>
                            </View>
                          </View>
                        ) : null}
                        {pref == 'checked' ? (
                          <View>
                            <View style={[styles.pref, {marginTop: 3}]}>
                              <View>
                                <Text style={styles.title1}>
                                  {'Choose Your preference'}
                                </Text>
                                <Text style={styles.select}>
                                  Select 1 out of options
                                </Text>
                              </View>
                              <View style={styles.border2}>
                                <Text style={styles.req}>REQUIRED</Text>
                              </View>
                            </View>
                            <View style={styles.pref}>
                              <View style={{flexDirection: 'row'}}>
                                <View
                                  style={[
                                    styles.view1,
                                    {borderColor: '#0FAF33'},
                                  ]}>
                                  <View
                                    style={[
                                      styles.border,
                                      {backgroundColor: '#0FAF33'},
                                    ]}
                                  />
                                </View>
                                <Text style={styles.egg}>Eggless </Text>
                              </View>
                              <View style={{marginLeft: 10}}>
                                <RadioButton
                                  value="first"
                                  status={'checked'}
                                  uncheckedColor="#ED1B1A"
                                  color="#ED1B1A"
                                />
                              </View>
                            </View>
                            <View style={styles.pref}>
                              <View>
                                <Text style={styles.title1}>
                                  {'Pick size of cake'}
                                </Text>
                                <Text style={styles.lect}>
                                  Select 1 out of options
                                </Text>
                              </View>
                              <View style={styles.border2}>
                                <Text style={styles.req}>REQUIRED</Text>
                              </View>
                            </View>
                            <View style={styles.grams}>
                              <TouchableOpacity
                                disabled={!smallManage()}
                                onPress={() => manageGram()}
                                style={[
                                  styles.bottom,
                                  smallManage()
                                    ? null
                                    : {borderColor: 'lightgrey'},
                                ]}>
                                <View style={styles.row}>
                                  <Text
                                    style={[
                                      styles.gram,
                                      smallManage()
                                        ? null
                                        : {color: 'lightgrey'},
                                    ]}>
                                    {
                                      product.options[0].product_option_value[0]
                                        .name
                                    }
                                  </Text>
                                  <View style={{marginLeft: 10}}>
                                    {gram == 'checked' ? (
                                      <RadioButton
                                        value="first"
                                        status={smallManage() && gram}
                                        onPress={() => manageGram()}
                                        uncheckedColor={
                                          smallManage()
                                            ? '#ED1B1A'
                                            : 'lightgrey'
                                        }
                                        color="#ED1B1A"
                                      />
                                    ) : version == 'ios' ? (
                                      <TouchableOpacity
                                        onPress={() => manageGram()}
                                        style={{marginRight: 4, marginTop: 6}}>
                                        <Done width={26} height={25} />
                                      </TouchableOpacity>
                                    ) : (
                                      <RadioButton
                                        value="first"
                                        status={smallManage() && gram}
                                        onPress={() => manageGram()}
                                        uncheckedColor={
                                          smallManage()
                                            ? '#ED1B1A'
                                            : 'lightgrey'
                                        }
                                        color="#ED1B1A"
                                      />
                                    )}
                                  </View>
                                </View>
                                <Text
                                  style={[
                                    styles.text,
                                    smallManage() ? null : {color: 'lightgrey'},
                                  ]}>{`₹${parseInt(
                                  product.products.price,
                                ).toFixed(2)}`}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                disabled={!largeManage()}
                                onPress={() => manageKg()}
                                style={[
                                  styles.bottom,
                                  largeManage()
                                    ? null
                                    : {borderColor: 'lightgrey'},
                                ]}>
                                <View style={styles.row}>
                                  <Text
                                    style={[
                                      styles.gram,
                                      largeManage()
                                        ? null
                                        : {color: 'lightgrey'},
                                    ]}>
                                    {
                                      product.options[0].product_option_value[1]
                                        .name
                                    }
                                  </Text>
                                  <View style={{marginLeft: 10}}>
                                    {kg == 'checked' ? (
                                      <RadioButton
                                        value="first"
                                        status={largeManage() && kg}
                                        onPress={() => manageKg()}
                                        uncheckedColor={
                                          largeManage()
                                            ? '#ED1B1A'
                                            : 'lightgrey'
                                        }
                                        color="#ED1B1A"
                                      />
                                    ) : version == 'ios' ? (
                                      <TouchableOpacity
                                        onPress={() => manageKg()}
                                        style={{marginRight: 4, marginTop: 6}}>
                                        <Done width={26} height={25} />
                                      </TouchableOpacity>
                                    ) : (
                                      <RadioButton
                                        value="first"
                                        status={largeManage() && kg}
                                        onPress={() => manageKg()}
                                        uncheckedColor={
                                          largeManage()
                                            ? '#ED1B1A'
                                            : 'lightgrey'
                                        }
                                        color="#ED1B1A"
                                      />
                                    )}
                                  </View>
                                </View>
                                <Text
                                  style={[
                                    styles.text,
                                    largeManage() ? null : {color: 'lightgrey'},
                                  ]}>{`₹${(
                                  parseInt(
                                    product.options[0].product_option_value[1]
                                      .price,
                                  ) + parseInt(product.products.price)
                                ).toFixed(2)}`}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <View>
                            <Text style={styles.title1}>
                              {'Type Your Message'}
                            </Text>
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => inputRef.current.focus()}
                              style={styles.input}>
                              <TextInput
                                ref={inputRef}
                                placeholderTextColor={'#000000'}
                                value={text}
                                onChangeText={val => setText(val)}
                                style={styles.msg}
                                placeholder="Messages"
                                multiline={true}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ) : null}
                    <View style={styles.pay}>
                      {largeManage() || smallManage() ? (
                        <TouchableOpacity
                          onPress={() => addItemToCart()}
                          style={styles.items}>
                          <Text style={styles.rs}>
                            {`Add item ₹${
                              gram == 'checked'
                                ? parseInt(product.products.price).toFixed(2)
                                : product.options.length <= 0
                                ? parseInt(product?.products.price).toFixed(2)
                                : (
                                    parseInt(
                                      product.options[0]
                                        ?.product_option_value[1].price,
                                    ) + parseInt(product.products.price)
                                  ).toFixed(2)
                            }`}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => addItemToCart()}
                          disabled
                          style={styles.items}>
                          <Text style={styles.rs}>
                            {'Product out of stock'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </ImageBackground>
                  {/* <View style={{ height: 100 }} /> */}
                </KeyboardAwareScrollView>
              </ScrollView>
            ) : null}
          </View>
        </SwipeablePanel>
        <View style={styles.bot}>
          <BottomTab home={false} search={true} cart={false} profile={false} />
        </View>

        <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      </ImageBackground>
    </View>
  );
};
export default CategoryList;

const data = [
  {
    name: 'Black Forest',
    review: '142 Reviews',
    price: '₹70.00',
    description:
      'Evergreen  Red Velvet pastries It is a long established fact.',
    image: require('../../../assets/Logo/redv.png'),
  },
  {
    name: 'Black Forest',
    review: '142 Reviews',
    price: '₹70.00',
    description:
      'Evergreen  Red Velvet pastries It is a long established fact.',
    image: require('../../../assets/Logo/redv.png'),
  },
  {
    name: 'Black Forest',
    review: '142 Reviews',
    price: '₹70.00',
    description:
      'Evergreen  Red Velvet pastries It is a long established fact.',
    image: require('../../../assets/Logo/redv.png'),
  },
  {
    name: 'Black Forest',
    review: '142 Reviews',
    price: '₹70.00',
    description:
      'Evergreen  Red Velvet pastries It is a long established fact.',
    image: require('../../../assets/Logo/redv.png'),
  },
  {
    name: 'Black Forest',
    review: '142 Reviews',
    price: '₹70.00',
    description:
      'Evergreen  Red Velvet pastries It is a long established fact.',
    image: require('../../../assets/Logo/redv.png'),
  },
  {
    name: 'Black Forest',
    review: '142 Reviews',
    price: '₹70.00',
    description:
      'Evergreen  Red Velvet pastries It is a long established fact.',
    image: require('../../../assets/Logo/redv.png'),
  },
];
