import React, { useState, useEffect, useRef } from "react";
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
  ImageBackground,
  Platform,
  LayoutAnimation
} from "react-native";
import Stars from "react-native-stars";
import styles from "./style";
import SwipeablePanel from 'react-native-sheets-bottom';
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from 'react-native-paper';
import Plus from "../../../assets/Svg/plus.svg";
import Plus2 from "../../../assets/Svg/menuP.svg";
import Full from "../../../assets/Svg/fullStar.svg";
import Blank from "../../../assets/Svg/blankStar.svg";
import Heart from "../../../assets/Svg/heart.svg";
import Cutlery from "../../../assets/Svg/cutlery-white.svg";
import Go from "../../../assets/Svg/go.svg";
import Search from "../../../assets/Svg/search1.svg";
import Minus from "../../../assets/Svg/minus.svg";
import Multi from "../../../assets/Svg/multi.svg";
import Diamond from "../../../assets/Svg/diamond.svg";
import Poly from "../../../assets/Svg/poly.svg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loader from "../../../components/Loader";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Storage from "../../../components/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeartF from "../../../assets/Svg/heartf.svg";
import Done from '../../../assets/Svg/Done.svg';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BottomTab from "../../../components/BottomTab";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";
import Modal from "react-native-modal";

const CategoryList = () => {
  const [openPanel, setOpenPanel] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pref, setPref] = useState('checked');
  const [msg, setMsg] = useState('unchecked')
  const [kg, setKg] = useState('unchecked');
  const [gram, setGram] = useState('checked')
  const selector = useSelector(state => state.List.CategoryList)
  const Fetching=useSelector(state=>state.Auth.isFetching)
  const category = useSelector(state => state.Auth.Category)
  const selector1 = useSelector(state => state.Auth.MenuList)
  const width = Dimensions.get('window').width;
  const [product, setProduct] = useState('')
  const [isFetching, setFetching] = useState(false)
  const [search, setSearch] = useState('');
  const [catname, setcatname] = useState('')
  const [filteredDataSource, setFilteredDataSource] = useState(selector);
  const [masterDataSource, setMasterDataSource] = useState(selector);
  const [listDataSource, setListDataSource] = useState(selector);
  const [multiSelect, setMultiSelect] = useState(false);
  const [click, setClick] = useState(false)
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const inputRef = React.useRef()
  const length = selector.length
  useEffect(() => {
    AsyncStorage.setItem("pageKey","")
    // NetInfo.addEventListener(state => {
    //   if(!state.isConnected){
    //   showMessage({
    //     message:'Please connect to your internet',
    //     type:'danger',
    //   });
    //   }
    // });
  },[])

  const productDetail = async (id) => {
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    const store_id=await AsyncStorage.getItem(Storage.store_id)
    if(customer_id){
    setOpenPanel(true)
    try {
      setFetching(true)
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
        setFetching(false)
        setProduct(response.data.products)
        setOpenPanel(true)

      }
    } catch (error) {
      throw error;
    }
  }
  else{
    AsyncStorage.setItem("pageKey","CategoryList")
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],

  })
  }
  };

  const addItemToCart = async () => {
    setOpenPanel(false)
    // setFetching(true)
    const customer_id = await AsyncStorage.getItem(Storage.customer_id)
    const store_id = await AsyncStorage.getItem(Storage.store_id)
    if (product.options.length > 1) {
      dispatch({
        type: 'Add_Item_Request',
        url: 'apiorder/add_to_cart',
        customer_id: customer_id,
        product_id: product.products.product_id,
        select_key: product.options[0].product_option_id,
        select_value: gram == 'checked' ? product.options[0].product_option_value[0].product_option_value_id :
          product.options[0].product_option_value[1].product_option_value_id,
        text_key: product.options[1].product_option_id,
        text_value: text,
        outlet_id:store_id,
        navigation: navigation
      });
    }
    else if (product.options.length > 0) {
      dispatch({
        type: 'Add_Item_Request',
        url: 'apiorder/add_to_cart',
        customer_id: customer_id,
        product_id: product.products.product_id,
        select_key: product.options[0].product_option_id,
        select_value: gram == 'checked' ? product.options[0].product_option_value[0].product_option_value_id :
          product.options[0].product_option_value[1].product_option_value_id,
        text_key: 0,
        text_value: '',
        outlet_id:store_id,
        navigation: navigation
      });
    }
    else {
      dispatch({
        type: 'Add_Item_Request1',
        url: 'apiorder/add_to_cart',
        customer_id: customer_id,
        product_id: product.products.product_id,
        outlet_id:store_id,
        navigation: navigation
      });
    }
   
  }

  const managePref = () => {
    setPref('checked')
    setMsg('unchecked')
  }
  const manageMsg = () => {
    setPref('unchecked')
    setMsg('checked')
  }
  const manageGram = () => {
    setGram('checked')
    setKg('unchecked')
  }
  const manageKg = () => {
    setGram('unchecked')
    setKg('checked')
  }

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = `${item.name}${item.price}` ? `${item.description}${item.name}${item.price} `.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSearch = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource);
    setClick(false)
  };
  const handleWidth = () => {
    setClick(true)
  }
  const addWish = async (id) => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id)
    const category_id = await AsyncStorage.getItem('category_id')
    const product_id = await AsyncStorage.getItem('product_id')
    const store_id = await AsyncStorage.getItem(Storage.store_id)
    try {
      setFetching(true)
      const data = new FormData();
      data.append('product_id', id);
      data.append('customer_id', customer_id)
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
        setFetching(false)
        try {
          setFetching(true)
          const data1 = new FormData();
          data1.append('category_id', category_id);
          data1.append('customer_id', customer_id)
          data1.append('product_id', product_id == null ? '' : product_id)
          data1.append('store_id', store_id)
          const response = await axios({
            method: 'POST',
            data: data1,
            headers: {
              'content-type': 'multipart/form-data',
              Accept: 'multipart/form-data',
            },
            url: 'https://merwans.co.in/index.php?route=api/apiproduct',
          });
          if (response.data.status == true) {
            setFetching(false)
            setFilteredDataSource(response.data.products)
            setcatname(response.data.category)
          }
          else {
            setFetching(false)
          }
        } catch (error) {
          throw error;
        }

      }
      else {
        setFetching(false)
      }
    } catch (error) {
      throw error;
    }
  }


  const ExpandableComponent = ({ item, onClickFunction }) => {
    const [layoutHeight, setLayoutHeight] = useState(0);
    useEffect(() => {
      if (item.isExpanded) {
        setLayoutHeight(null);
      } else {
        setLayoutHeight(0);
      }
    }, [item.isExpanded]);

    return (
      <View>
        <View
          style={[styles.cmn,{marginTop:5,}]}>
          <TouchableOpacity
            activeOpacity={0.2} onPress={() => manageData(item.category_id)}
          >
            <Text style={[styles.home, { textTransform: 'uppercase' }]}>{(item.name)}</Text>
          </TouchableOpacity>
          {visible ? handleSubCategory(item) : <View />}
          <TouchableOpacity
            activeOpacity={0.8} onPress={onClickFunction}
            style={{ paddingHorizontal: 6, paddingVertical: 5 }}>
            {layoutHeight == 0 ? <View style={{borderWidth:1,borderColor:'#6A6A6A',borderRadius:10,padding:1}}><Plus2/></View>:<View style={{borderWidth:1,borderColor:'#6A6A6A',borderRadius:10,padding:1}}><Minus/></View>}
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: layoutHeight,
            overflow: 'hidden',
            paddingHorizontal: 8,
            width: '95%',
          }}>
          {item.submenus.map((item, key) => (
            <TouchableOpacity
            activeOpacity={0.2}
              onPress={() => manageData(item.category_id)}
              style={[styles.margin, { width: '90%' }]}>
              <Text style={[styles.item, { textTransform: 'uppercase', }]}>{item.name}</Text>
              <View style={styles.round2}>
                <Text style={styles.num}>{item.productCount}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...selector1];
    if (multiSelect) {
    } else {
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] =
            !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };

  const manageData = async (id) => {
    setIsModalVisible(false)
    const customer_id = await AsyncStorage.getItem(Storage.customer_id)
    AsyncStorage.setItem("category_id", id)
    AsyncStorage.setItem("product_id", '')
    const store_id = await AsyncStorage.getItem(Storage.store_id)
    try {
      setFetching(true)
      const data = new FormData();
      data.append('category_id', id);
      data.append('customer_id', customer_id)
      data.append('store_id', store_id)
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://merwans.co.in/index.php?route=api/apiproduct',
      });
      if (response.data.status == true) {
        setFetching(false)
        setFilteredDataSource(response.data.products)
        setcatname(response.data.category)
      }
      else {
        setFetching(false)
      }
    } catch (error) {
      throw error;
    }
   
  }
  const version = Platform.OS
  return (
    <View style={{ flex: 1, }}>
      {isFetching || Fetching  ? <Loader /> : null}
      <ImageBackground style={{ flex: 1 }} source={require('../../../assets/Icon/bg.png')}>
        <View style={styles.main}>
          <View style={styles.go}>
            <TouchableOpacity style={{ paddingRight: 10, paddingVertical: 3 }} 
            onPress={() => {
              navigation.navigate('Home')
              // setIsModalVisible(false)
              }}>
              <Go />
            </TouchableOpacity>
            {click ? null : <Text style={styles.cake}>{
              catname ? catname.catname : category.catname
            }</Text>}
          </View>
          {click ? <TouchableOpacity
            disabled
            style={[styles.container, {
              marginRight: 0,
              width: '90%',
              height: 30,
              justifyContent: 'space-between'
            }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* <Search /> */}
              <TextInput
                ref={inputRef}
                placeholder="Search here"
                value={search}
                placeholderTextColor={'##353535'}
                onChangeText={val => searchFilterFunction(val)}
                style={{
                  height: 30,
                  includeFontPadding: false,
                  padding: 0,
                  margin: 0,
                  fontSize: 13,
                  width: '90%',
                  color:'black'
                }}
                returnKeyType="done"
              />
            </View>
            {search ? (
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => handleSearch()}
                style={{
                  backgroundColor: '#ED1717',
                  borderRadius: 12,
                  justifyContent: 'center',
                  height: 24,
                  width: 24,
                  alignItems: 'center',

                }}>
                <Image style={{ tintColor: '#fff' }}
                  source={require('../../../assets/Icon/multiply.png')} />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity> :
            <TouchableOpacity
              onPress={() => handleWidth()}
              style={[styles.container, {
                width: 122,
                height: 30,
                alignItems: 'center',
                justifyContent: 'flex-start'
              }]}>
              <Search />
              <Text style={[styles.search, { marginTop: 0 }]}>Search</Text>
            </TouchableOpacity>
          }
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 10 }}>
            {category.subcatname || catname.subcatname ? <View style={styles.row1}>
              <Text style={styles.cakes}>{catname ? catname.catname : category.catname}</Text>
              {category.subcatname == undefined || catname.subcatname == undefined ? null : <Text style={styles.black}>{` /  ${catname ? catname.subcatname : category.subcatname}`}</Text>}
            </View> : <View />}
            <View>
              <FlatList
                data={filteredDataSource}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item)=>item.product_id}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={10}
                maxToRenderPerBatch={5}
                initialNumToRender={5}
                renderItem={({ item, index }) => (
                  <View
                    style={[styles.view, { borderBottomWidth: index == length - 1 ? 0 : .5, }]}>
                    <View style={{ width: '56%', marginTop: 20 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {item.p_type==1?<TouchableOpacity
                          style={[styles.view1,{ borderColor:'#0FAF33',}]}>
                          <View style={[styles.border,{backgroundColor:'#0FAF33'}]} />
                        </TouchableOpacity>:
                        
                        <TouchableOpacity
                          style={[styles.view1,{ borderColor:'#ED1B1A',}]}>
                          <View style={[styles.border,{backgroundColor:'#ED1B1A'}]} />
                        </TouchableOpacity>
                        }

                        <Text style={[styles.title]}
                        >{item.name}</Text>
                      </View>

                      <View
                        style={styles.round}>
                        <Stars
                          disabled={true}
                          default={item.rating}
                          spacing={3}
                          count={5}
                          starSize={12}
                          fullStar={<Blank />}
                          emptyStar={<Full />} />
                      </View>
                      <View style={styles.views}>
                        <Text style={styles.price}>{item.price}</Text>
                      </View>
                      <View style={{ marginTop: 6 }}>
                        <Text style={styles.desc}>{item.description}
                        </Text>
                      </View>
                      {item.favourite == false ? <TouchableOpacity
                        onPress={() => addWish(item.product_id)}
                        style={styles.image}>
                        <Heart height={14} width={14}/>
                      </TouchableOpacity> :
                        <TouchableOpacity
                          // disabled
                          onPress={() => addWish(item.product_id)}
                          style={[styles.image]}>
                          <HeartF height={14} width={14}/>
                        </TouchableOpacity>}
                      <View style={{ height: 15 }} />
                    </View>

                    <View style={styles.img}>
                    <Image style={{ height: 122, width: 122, borderRadius: 15,opacity:item.quantity>0 && item.p_status==1?1:0.2 }}
                        source={{ uri: item.thumb }} />
                      <View style={styles.iview}>
                        {item.quantity>0 && item.p_status==1?
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
                        :
                        <TouchableOpacity
                        disabled
                        delayPressIn={0}
                        activeOpacity={1}
                        onPress={() => productDetail(item.product_id)}
                        style={styles.addCont1}>
                       <Text style={styles.add1}>Out of stock</Text>
                      </TouchableOpacity>
                        }
                      </View>
                    </View>
                  </View>
                )}
              />
              <View style={{ marginBottom: 60 }} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottom1}>
          <TouchableOpacity
            activeOpacity={0.1}
            onPress={() => {
              setIsModalVisible(true)
            }}
            style={styles.menu}>
            <Text style={styles.brow}>{'Browse Menu'}</Text>
            <View style={{ marginLeft: 8 }}>
              <Cutlery />
            </View>
          </TouchableOpacity>
        </View>

        <SwipeablePanel
          style={{ borderTopLeftRedius: 0, }}
          barStyle={{ borderTopLeftRedius: 0, }}
          fullWidth
          isActive={openPanel}
          onClose={() => setOpenPanel(false)}
          closeOnTouchOutside={() => setOpenPanel(false)}
          noBar={true}
          onlyLarge={true}
          showCloseButton={openPanel==true?true:false}
          closeIconStyle={{ backgroundColor: '#000' }}
          closeRootStyle={{
            backgroundColor: '#fff',
            marginTop: -60,
            marginRight: width / 2 - 40,
            borderWidth: 1
          }}
        >
          <View style={{ flex: 1 }}>
            {product && product.products ? <ScrollView stickyHeaderIndices={[0]} style={{ flex: 1 }}>
              <KeyboardAwareScrollView
                extraScrollHeight={10}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}>
                <View />
                <View />
                <ImageBackground
                  source={require('../../../assets/Icon/bg.png')}
                  style={{ backgroundColor: '#fff', padding: 10, height: msg == 'checked' ? 600 : 700 }}>
                  <View style={styles.thumb}>
                    <Image style={[styles.url,{opacity:1}]}
                      source={{ uri: product.products.thumb }} />
                  </View>
                  <Text style={styles.desclamer}>Disclaimer Notice :-   ACTUAL PRODUCT  MAY VARY FROM SHOWN IMAGES</Text>
                  <View style={[styles.bests, { justifyContent: 'space-between' }]}>
                    <View style={styles.bests1}>
                     {product.products.p_type==1? <View
                        style={[styles.view1,{borderColor:'#0FAF33'}]}>
                        <View style={[styles.border,{backgroundColor:'#0FAF33',}]} />
                      </View>:
                     <View
                      style={[styles.view1,{borderColor:'#ED1B1A'}]}>
                      <View style={[styles.border,{backgroundColor:'#ED1B1A',}]} />
                    </View>
                      }
                      <Text style={styles.title}>{product.products.name}</Text>
                    </View>
                    {/* <View style={styles.image}>
                      <Image source={require('../../../assets/Icon/redHeart.png')} />
                    </View> */}

                  </View>
                  <View style={styles.pname}>


                  </View>
                  <View
                    style={styles.round1}>
                    <Stars
                      disabled={true}
                      default={product.products.rating}
                      spacing={3}
                      count={5}
                      starSize={12}
                      fullStar={require('../../../assets/Icon/fullstar.png')}
                      emptyStar={require('../../../assets/Icon/emptystar.png')} />
                    <Text style={styles.review}>{`${product.products.reviews} Reviews`}</Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.descr}>
                      {product.products.description}
                    </Text>
                  </View>
                  {product.options.length > 0 ? <View>

                    {product.options.length > 1 ? <View style={styles.show}>
                      <View style={{ width: '48%' }}>
                        <TouchableOpacity
                          onPress={() => managePref()}
                          style={[styles.button, {
                            backgroundColor: pref == 'checked' ? '#000000' : '#FFFFFF', borderWidth: 1,
                            borderColor: '#000000'
                          }]}>
                          <View />
                          <Text style={{
                            color: pref == 'checked' ? '#FFFFFF' : '#000000',
                            fontFamily: 'Montserrat-Medium',
                            fontSize: 10,
                          }}>{'Preference & Size'}</Text>
                          <View >
                            {pref == 'checked' ? <RadioButton
                              value="checked"
                              status={pref}
                              uncheckedColor='#ED1B1A'
                              color='#ED1B1A'
                              onPress={() => managePref()}
                            /> :
                              version == 'ios' ? <TouchableOpacity onPress={() => managePref()}
                                style={{ marginRight: 4 }}>
                                <Done width={26} height={25} />
                              </TouchableOpacity> :
                                <RadioButton
                                  value="checked"
                                  status={pref}
                                  uncheckedColor='#ED1B1A'
                                  color='#ED1B1A'
                                  onPress={() => managePref()}
                                />
                            }
                          </View>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', marginTop: 2 }}>
                          {pref == 'checked' ? <Poly /> : null}
                        </View>
                      </View>
                      <View style={{ width: '48%' }}>
                        <TouchableOpacity
                          onPress={() => manageMsg()}
                          style={[styles.button, {
                            backgroundColor: msg == 'checked' ? '#000000' : '#FFFFFF',
                            borderWidth: 1,
                            borderColor: '#000000'
                          }]}>
                          <View />
                          <Text
                            style={{
                              color: msg == 'checked' ? '#FFFFFF' : '#000000',
                              fontFamily: 'Montserrat-Medium',
                              fontSize: 10,
                              marginLeft: 20
                            }}>{'Message'}</Text>
                          <View style={{}}>
                            {msg == 'checked' ? <RadioButton
                              value="first"
                              status={msg}
                              onPress={() => manageMsg()}
                              uncheckedColor='#000000'
                              color='#ED1B1A'
                            /> :
                              version == 'ios' ? <TouchableOpacity onPress={() => manageMsg()}
                                style={{ marginRight: 4 }}>
                                <Done width={26} height={25} />
                              </TouchableOpacity> :
                                <RadioButton
                                  value="first"
                                  status={msg}
                                  onPress={() => manageMsg()}
                                  uncheckedColor='#000000'
                                  color='#ED1B1A'
                                />
                            }
                          </View>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', marginTop: 2 }}>
                          {msg == 'checked' ? <Poly /> : null}
                        </View>
                      </View>
                    </View> : null}
                    {pref == 'checked' ?
                      <View>
                        <View
                          style={[styles.pref, { marginTop: 3 }]}>
                          <View>
                            <Text style={styles.title1}>{'Choose Your preference'}</Text>
                            <Text style={styles.select}>Select 1 out of options</Text>
                          </View>
                          <View style={styles.border2}>
                            <Text style={styles.req}>REQUIRED</Text>
                          </View>
                        </View>
                        <View
                          style={styles.pref}>
                          <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity
                          style={[styles.view1,{ borderColor:'#0FAF33',}]}>
                          <View style={[styles.border,{backgroundColor:'#0FAF33'}]} />
                        </TouchableOpacity>
                            <Text
                              style={styles.egg}>Eggless </Text>
                          </View>
                          <View style={{ marginLeft: 10 }}>
                            <RadioButton
                              value="first"
                              status={'checked'}
                              uncheckedColor='#ED1B1A'
                              color='#ED1B1A'
                            />
                          </View>
                        </View>
                        <View
                          style={styles.pref}>
                          <View>
                            <Text style={styles.title1}>{'Pick size of cake'}</Text>
                            <Text style={styles.lect}>Select 1 out of options</Text>
                          </View>
                          <View style={styles.border2}>
                            <Text style={styles.req}>REQUIRED</Text>
                          </View>
                        </View>
                        <View style={styles.grams}>
                          <TouchableOpacity

                            onPress={() => manageGram()}
                            style={styles.bottom}>
                            <View
                              style={styles.row}>
                              <Text style={styles.gram}>{product.options[0].product_option_value[0].name}</Text>
                              <View style={{ marginLeft: 10 }}>
                                {gram == 'checked' ? <RadioButton
                                  value="first"
                                  status={gram}
                                  onPress={() => manageGram()}
                                  uncheckedColor='#ED1B1A'
                                  color='#ED1B1A'
                                /> :
                                  version == 'ios' ? <TouchableOpacity
                                    onPress={() => manageGram()}
                                    style={{ marginRight: 4, marginTop: 6 }}>
                                    <Done width={26} height={25} />
                                  </TouchableOpacity> :
                                    <RadioButton
                                      value="first"
                                      status={gram}
                                      onPress={() => manageGram()}
                                      uncheckedColor='#ED1B1A'
                                      color='#ED1B1A'
                                    />
                                }
                              </View>
                            </View>
                            <Text style={styles.text}>{`₹${parseInt(product.products.price).toFixed(2)}`}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity

                            onPress={() => manageKg()}
                            style={styles.bottom}>
                            <View
                              style={styles.row}>
                              <Text style={styles.gram}>{product.options[0].product_option_value[1].name}</Text>
                              <View style={{ marginLeft: 10 }}>
                                {kg == 'checked' ? <RadioButton
                                  value="first"
                                  status={kg}
                                  onPress={() => manageKg()}
                                  uncheckedColor='#ED1B1A'
                                  color='#ED1B1A'
                                /> :
                                  version == 'ios' ? <TouchableOpacity
                                    onPress={() => manageKg()}
                                    style={{ marginRight: 4, marginTop: 6 }}>
                                    <Done width={26} height={25} />
                                  </TouchableOpacity> :
                                    <RadioButton
                                      value="first"
                                      status={kg}
                                      onPress={() => manageKg()}
                                      uncheckedColor='#ED1B1A'
                                      color='#ED1B1A'
                                    />
                                }
                              </View>
                            </View>
                            <Text style={styles.text}>{
                              `₹${(parseInt(product.options[0].product_option_value[1].price) + parseInt(product.products.price)).toFixed(2)}`}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      :
                      <View>
                        <Text style={styles.title1}>{'Type Your Message'}</Text>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => inputRef.current.focus()}
                          style={styles.input}>
                          <TextInput
                            ref={inputRef}
                            value={text}
                            onChangeText={(val) => setText(val)}
                            placeholderTextColor={'#000000'}
                            style={styles.msg}
                            placeholder='Message'
                            multiline={true}
                          />
                        </TouchableOpacity>
                      </View>
                    }
                  </View> : null}
                  <View style={styles.pay}>

                  {product.products.quantity>0?<TouchableOpacity
                      onPress={() => addItemToCart()}
                      style={styles.items}>
                        <Text style={styles.rs}>
                        {`Add item ₹${gram == 'checked' ? parseInt(product.products.price).toFixed(2) :
                          (parseInt(product.options[0].product_option_value[1].price) + parseInt(product.products.price)).toFixed(2)}`}
                          </Text>
                    </TouchableOpacity>:
                    <TouchableOpacity
                      // onPress={() => addItemToCart()}
                      disabled
                      style={styles.items}>
                      <Text style={styles.rs}>{'Product out of stock'}</Text>
                    </TouchableOpacity>}
                  </View>
                </ImageBackground>
                {/* here */}

              </KeyboardAwareScrollView>
            </ScrollView> : null}
          </View>
        </SwipeablePanel>
        <View style={styles.bot}>
          {/* <BottomTab /> */}
        </View>
        {/* <Dialog
          visible={isModalVisible}
          dialogStyle={{
            backgroundColor: '#FFF',
            width: '86%',
            alignSelf: 'center',
            elevation: 5,
            borderRadius: 20
          }}
          onTouchOutside={() => setIsModalVisible(false)}
          onHardwareBackPress={() => setIsModalVisible(false)}
        > */}
          {/* <DialogContent> */}
          <Modal
                isVisible={isModalVisible}
                onBackdropPress={()=>setIsModalVisible(false)}
            >
            <View style={{
                backgroundColor: '#FFF', 
                width: '86%', 
                alignSelf: 'center' ,
                elevation: 5,
                borderRadius: 20
            }}>
              <View style={styles.men}>
                <View style={{ width: '24%' }} />
                <View style={styles.space}>
                  <Text style={styles.enu}>Menu</Text>
                  <View style={styles.dia}>
                    <View style={{ borderWidth: 0.5, width: 30 }} />
                    <Diamond />
                    <View style={{ borderWidth: 0.5, width: 30 }} />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={{ marginLeft: 36, marginTop: -20 }}>

                  <Multi />

                </TouchableOpacity>
                <View />
              </View>

              <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
                <View>
                  {selector1.map((item, key) => (
                    <ExpandableComponent
                      key={item.category_name}
                      onClickFunction={() => {
                        updateLayout(key);
                      }}
                      item={item}
                    />
                  ))}
                </View>

              </View>
            </View>
            </Modal>
          {/* </DialogContent> */}
        {/* </Dialog> */}
      </ImageBackground>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <BottomTab/>
    </View>
  )
}
export default CategoryList





