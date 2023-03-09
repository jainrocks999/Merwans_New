import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput,
  Platform,
  ImageBackground
} from "react-native";
import Stars from "react-native-stars";
import styles from "./style";
import SwipeablePanel from 'react-native-sheets-bottom';
import { useNavigation } from "@react-navigation/native";
import BottomTab from '../../../components/BottomTab';
import Plus from "../../../assets/Svg/plus.svg";
import Full from "../../../assets/Svg/fullStar.svg";
import Blank from "../../../assets/Svg/blankStar.svg";
import Go from "../../../assets/Svg/go.svg";
import Poly from "../../../assets/Svg/poly.svg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import Toast from "react-native-simple-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RadioButton } from 'react-native-paper';
import Heart from "../../../assets/Svg/heart.svg";
import Search from "../../../assets/Svg/search1.svg";
import Done from '../../../assets/Svg/Done.svg';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

const CategoryList = () => {
  const [openPanel, setOpenPanel] = useState(false)
  const navigation = useNavigation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pref, setPref] = useState('checked');
  const [msg, setMsg] = useState('unchecked')
  const [kg, setKg] = useState('unchecked');
  const [gram, setGram] = useState('checked')
  const width = Dimensions.get('window').width;
  const [product, setProduct] = useState('')
  const isFetching = useSelector(state => state.isFetching)
  const [isFetching1, setFetching] = useState(false)
  const selector = useSelector(state => state.wishlist)
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(selector);
  const [masterDataSource, setMasterDataSource] = useState(selector);
  const [text,setText]=useState('')
  const [click, setClick] = useState(false)
  const dispatch = useDispatch()
  const inputRef = React.useRef()

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

  const productDetail = async (id) => {
    setOpenPanel(true)
    try {
      setFetching(true)
      const data = new FormData();
      data.append('product_id', id);
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
  };

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
  const removeWishList = async (id) => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id)
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
        url: 'https://merwans.co.in/index.php?route=api/apiproduct/delete_wishlist',
      });
      if (response.data.status == true) {
        Toast.show(response.data.message)
        setFilteredDataSource(response.data.products)
        setMasterDataSource(response.data.products)
        setFetching(false)
        
      }
      else {
        setFetching(false)
      }
    } catch (error) {
      setFetching(false)
    }
   
  }
  const handleWidth = () => {
    setClick(true)
  }
  const handleSearch = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource);
    setClick(false)
  };

  const addItemToCart = async () => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id)
    const store_id = await AsyncStorage.getItem(Storage.store_id)
    if(product.options.length>1){
      dispatch({
        type: 'Add_Item_Request',
        url: 'apiorder/add_to_cart',
        customer_id: customer_id,
        product_id: product.products.product_id,
        select_key:product.options[0].product_option_id,
        select_value:gram == 'checked'?product.options[0].product_option_value[0].product_option_value_id:
       product.options[0].product_option_value[1].product_option_value_id,
        text_key:product.options[1].product_option_id,
        text_value:text,
        outlet_id:store_id,
        navigation: navigation
      });
    }
    else if(product.options.length>0){
      dispatch({
        type: 'Add_Item_Request',
        url: 'apiorder/add_to_cart',
        customer_id: customer_id,
        product_id: product.products.product_id,
        select_key:product.options[0].product_option_id,
        select_value:gram == 'checked'?product.options[0].product_option_value[0].product_option_value_id:
       product.options[0].product_option_value[1].product_option_value_id,
        text_key:0,
        text_value:'',
        outlet_id:store_id,
        navigation: navigation
      });
    }
    else{
      dispatch({
        type: 'Add_Item_Request1',
        url: 'apiorder/add_to_cart',
        customer_id: customer_id,
        product_id: product.products.product_id,
        outlet_id:store_id,
        navigation: navigation
      });
    }
    setOpenPanel(false)
  }
  const length = data.length
  const version = Platform.OS
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 0 }}>
      {isFetching || isFetching1 ? <Loader /> : null}
      <ImageBackground style={{ flex: 1 }} source={require('../../../assets/Icon/bg.png')}>
      <View style={styles.main}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Go />
          </TouchableOpacity>
          {click ? null : <Text style={styles.cake}>WishList</Text>}
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
            <TextInput
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
              marginRight: 0,
              width: 122,
              height: 30,
              justifyContent: 'flex-start',
              alignItems: 'center'
            }]}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:2 }}> */}
              <Search />
              <Text style={styles.search}>Search</Text>
            {/* </View> */}

          </TouchableOpacity>
        }

      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 10 }}>
         {filteredDataSource.length>0? <View>
            <FlatList
              removeClippedSubviews={true}
              updateCellsBatchingPeriod={10}
              maxToRenderPerBatch={5}
              initialNumToRender={5}
              data={filteredDataSource}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View
                  style={[styles.view, { borderBottomWidth: index == length - 1 ? 0 : .5, }]}>
                  <View style={{ width: '56%', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <View
                        style={styles.view1}>
                        <View style={styles.border} />
                      </View>
                      {/* <View style={styles.tag}>
                        <Text style={styles.best}>{'Best Seller'}</Text>
                      </View> */}
                      <Text style={[styles.title,{marginLeft:5}]}
                     
                    >{item.name}</Text>
                    </View>
                    
                    <View
                      style={styles.round}>
                      <Stars
                        disabled={true}
                        default={3}
                        spacing={3}
                        count={5}
                        starSize={12}
                        fullStar={<Blank />}
                        emptyStar={<Full />} />
                      {/* <Text style={styles.review}>{'142 Reviews'}</Text> */}
                    </View>
                    <View style={styles.pCont}>
                      <Text style={styles.price}>{item.price}</Text>
                    </View>
                    <View style={{ marginTop: 6 }}>
                      <Text style={styles.desc}>{item.description}
                        {/* {item.description ? <Text style={styles.read}>{'  read more'}</Text> : null} */}
                      </Text>
                    </View>
                    {/* <View style={styles.image}>
                                            <Heart/>
                                        </View> */}
                    <View style={{ height: 15 }} />
                  </View>
                  <View style={styles.imageV}>
                    <Image style={{ height: 122, width: 122, borderRadius: 15 }}
                      source={{ uri: item.thumb }} />
                    <View style={styles.addC}>
                      <TouchableOpacity
                        delayPressIn={0}
                        onPress={() => productDetail(item.product_id)}
                        style={styles.addCont}>
                        <View />
                        <Text style={styles.add}>Add</Text>
                        <View style={{}}>
                          <Plus />
                        </View>
                      </TouchableOpacity>
                      <View style={[styles.cusView]}>
                        <TouchableOpacity
                          onPress={() => removeWishList(item.product_id)}
                          style={{}}>
                          <Text style={styles.remove}>Remove</Text>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 0.4, borderColor: '#ED1717', width: '42%', }} />
                      </View>
                    </View>
                    {/* <View style={styles.cusView}>
                      <Text style={styles.custom}>Customise</Text>
                    </View> */}
                  </View>
                </View>
              )}
            />
            <View style={{ marginBottom: 0 }} />
          </View>:
          <View style={{alignItems:'center',justifyContent:'center',marginTop:'80%'}}>
             <Text>No Products added in the Wishlist </Text>
          </View>
          }
        </View>
      </ScrollView>
      <SwipeablePanel
        style={{ borderTopLeftRedius: 0, }}
        barStyle={{ borderTopLeftRedius: 0, }}
        fullWidth
        isActive={openPanel}
        onClose={() => setOpenPanel(false)}
        closeOnTouchOutside={() => setOpenPanel(false)}
        noBar={true}
        onlyLarge={true}
        showCloseButton={true}
        closeIconStyle={{ backgroundColor: '#000' }}
        closeRootStyle={{
          backgroundColor: '#fff',
          marginTop: -60,
          marginRight: width / 2 - 40,
        }}
      >
        <View style={{ flex: 1 }}>
        {product&&product.products?<ScrollView stickyHeaderIndices={[0]} style={{ flex: 1 }}>
            <KeyboardAwareScrollView
              extraScrollHeight={10}
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flex: 1 }}>
              <View />
              <View />
              <ImageBackground 
              source={require('../../../assets/Icon/bg.png')}
              style={{backgroundColor:'#fff',padding: 10, height: msg == 'checked' ?  600 : 700 }}>

                <View style={styles.thumb}>
                  <Image style={styles.url}
                    source={{ uri: product.products.thumb }} />
                </View>
                <View style={[styles.bests,{justifyContent:'space-between'}]}>
                  <View style={styles.bests1}>
                  <View
                    style={styles.view1}>
                    <View style={styles.border} />
                  </View>
                
                   <Text style={[styles.title,{marginLeft:5}]}>{product.products.name}</Text>
                   </View>
                   {/* <View style={styles.image}>
                    <Image source={require('../../../assets/Icon/redHeart.png')} />
                  </View> */}
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
                {product.options.length>0? <View>
                {product.options.length>1?<View style={styles.show}>
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
                      <View>
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
                </View>:null}
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
                        <View
                          style={styles.view1}>
                          <View style={styles.border} />
                        </View>
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
                          `₹${(parseInt(product.options[0].product_option_value[1].price)+parseInt(product.products.price)).toFixed(2)}`}</Text>
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
                        placeholderTextColor={'#000000'}
                        value={text}
                        onChangeText={(val)=>setText(val)}
                        style={styles.msg}
                        placeholder='Message'
                        multiline={true}
                      />
                    </TouchableOpacity>
                  </View>
                }
                </View>:null}
                <View style={styles.pay}>
                 { product.products.quantity>0? <TouchableOpacity
                    onPress={() => addItemToCart()}
                    style={styles.items}>
                       <Text style={styles.rs}>
                        {`Add item ₹${gram == 'checked'?parseInt(product.products.price).toFixed(2):
                        (parseInt(product.options[0].product_option_value[1].price)+parseInt(product.products.price)).toFixed(2)}`}
                        </Text>
                  </TouchableOpacity>:
                  <TouchableOpacity
                    onPress={() => addItemToCart()}
                    disabled
                    style={styles.items}>
                     <Text style={styles.rs}>{'Product out of stock'}</Text>
                  </TouchableOpacity>}
                </View>
              </ImageBackground>
           
            </KeyboardAwareScrollView>
          </ScrollView>:null}
        </View>
      </SwipeablePanel>
      
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      </ImageBackground>
    </View>
  )
}
export default CategoryList

const data = [
  { name: 'Black Forest', review: '142 Reviews', price: '₹70.00', description: 'Evergreen  Red Velvet pastries It is a long established fact.', image: require('../../../assets/Logo/redv.png') },
  { name: 'Black Forest', review: '142 Reviews', price: '₹70.00', description: 'Evergreen  Red Velvet pastries It is a long established fact.', image: require('../../../assets/Logo/redv.png') },
  { name: 'Black Forest', review: '142 Reviews', price: '₹70.00', description: 'Evergreen  Red Velvet pastries It is a long established fact.', image: require('../../../assets/Logo/redv.png') },
  { name: 'Black Forest', review: '142 Reviews', price: '₹70.00', description: 'Evergreen  Red Velvet pastries It is a long established fact.', image: require('../../../assets/Logo/redv.png') },
  { name: 'Black Forest', review: '142 Reviews', price: '₹70.00', description: 'Evergreen  Red Velvet pastries It is a long established fact.', image: require('../../../assets/Logo/redv.png') },
  { name: 'Black Forest', review: '142 Reviews', price: '₹70.00', description: 'Evergreen  Red Velvet pastries It is a long established fact.', image: require('../../../assets/Logo/redv.png') }
]
const styl = StyleSheet.create({
  btn: {
    width: '49%',
    backgroundColor: '#ED1B1A',
    borderRadius: 5,
    alignItems: 'center',
    elevation: 3,
    marginTop: 20,
    justifyContent: 'center',
    height: 38
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0
  }
})



