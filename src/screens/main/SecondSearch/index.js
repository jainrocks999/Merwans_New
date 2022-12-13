// import React from "react";
// import { View, Text, Image, TextInput, ImageBackground, FlatList,StatusBar } from 'react-native';
// import styles from "./style";
// import BottomTab from "../../../components/BottomTab";
// import Search1 from "../../../assets/Svg/search1.svg";
// import Heart from "../../../assets/Svg/heart.svg";
// const Search = () => {
//     return (
//         <View style={{ flex: 1, backgroundColor: '#fff' }}>
//             <View style={{ paddingHorizontal: 4 }}>
//                 <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
//                     <View style={styles.container}>
//                         <Search1 />
//                         <TextInput
//                             placeholder="Cakes"
//                             style={styles.search}
//                             placeholderTextColor={'#000000'}
//                         />
//                     </View>
//                 </View>
//                 <FlatList
//                     data={data1}
//                     style={{ marginBottom: 100, marginTop: 20 }}
//                     renderItem={({ item }) => (
//                         <View
//                             style={styles.view}>
//                             <Image style={styles.img}
//                                 source={require('../../../assets/Logo/rec.png')} />
//                             <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
//                                 <Text style={styles.title}>{item.title}</Text>
//                                 <Text style={styles.des}>{item.desc}</Text>
//                                 <View style={styles.row}>
//                                     <Text style={styles.price}>{'₹110.00'}</Text>
//                                     <Heart height={20} width={18} />
//                                 </View>
//                             </View>
//                         </View>
//                     )}
//                 />
//             </View>
//             <View style={styles.position}>
//                 <BottomTab />
//             </View>
//             <StatusBar backgroundColor={'#fff'} barStyle="dark-content"/>
//         </View>
//     )
// }
// export default Search;

// const data1 = [
//     {
//         image: require('../../../assets/Logo/group.png'),
//         title: 'Choco Bliss Cake',
//         desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sit euismod lacus iaculis sit ut pellentesque volutpat.',

//     },
//     {
//         image: require('../../../assets/Logo/group.png'),
//         title: 'Choco Bliss Cake',
//         desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sit euismod lacus iaculis sit ut pellentesque volutpat.',

//     },
//     {
//         image: require('../../../assets/Logo/group.png'),
//         title: 'Choco Bliss Cake',
//         desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sit euismod lacus iaculis sit ut pellentesque volutpat.',

//     },
//     {
//         image: require('../../../assets/Logo/group.png'),
//         title: 'Choco Bliss Cake',
//         desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sit euismod lacus iaculis sit ut pellentesque volutpat.',

//     },

// ]
import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, ScrollView, Dimensions, StatusBar,Platform } from "react-native";
import Stars from "react-native-stars";
import styles from "./style";
import SwipeablePanel from 'react-native-sheets-bottom';
import { useNavigation } from "@react-navigation/native";
import BottomTab from '../../../components/BottomTab';
import { RadioButton } from 'react-native-paper';
import Plus from "../../../assets/Svg/plus.svg";
import Full from "../../../assets/Svg/fullStar.svg";
import Blank from "../../../assets/Svg/blankStar.svg";
import Heart from "../../../assets/Svg/heart.svg";
import Poly from "../../../assets/Svg/poly.svg";
import { useSelector ,useDispatch} from "react-redux";
import axios from "axios";
import Loader from "../../../components/Loader";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Storage from "../../../components/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search1 from "../../../assets/Svg/search1.svg";
import Done from '../../../assets/Svg/Done.svg';

const CategoryList = () => {
  const [openPanel, setOpenPanel] = useState(false)
  const navigation = useNavigation()
  const dispatch=useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pref, setPref] = useState('checked');
  const [msg, setMsg] = useState('unchecked')
  const [kg, setKg] = useState('checked');
  const [gram, setGram] = useState('unchecked')
  const [cake, setCake] = useState(false)
  const selector = useSelector(state => state.CategoryList)
  const isFetching1=useSelector(state=>state.isFetching)
  const width = Dimensions.get('window').width;
  const [product, setProduct] = useState('')
  const [isFetching, setFetching] = useState(false)
  const inputRef = React.useRef()
  const length = selector.length
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [masterDataSource, setMasterDataSource] = useState();
  const [data1,setData1]=useState([])

  const searchFilterFunction = async(text) => {
    try {
        const data = new FormData();
        data.append('search',text);
        setSearch(text)
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
            setData1(response.data.products)
            setSearch(text)
        }
        else {
            setFetching(false)
            setSearch(text);
        }
    } catch (error) {
        setFetching(false)
    }
    // if (text) {
    //   const newData = masterDataSource.filter(function (item) {
    //     const itemData = `${item.content}${item.created_date}`
    //       ? `${item.content} ${item.created_date}`.toUpperCase()
    //       : ''.toUpperCase();
    //     const textData = text.toUpperCase();
    //     return itemData.indexOf(textData) > -1;
    //   });
    //   setFilteredDataSource(newData);
    //   setSearch(text);
    // } else {
    //   setFilteredDataSource(masterDataSource);
    //   setSearch(text);
    // }

  };

  const handleSearch = () => {
    setSearch('');
    setData1([]);
  };

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
      console.log('thisi i suser respone', response.data);
      if (response.data.status == true) {
        setFetching(false)
        setProduct(response.data.products)
        setOpenPanel(true)

      }
    } catch (error) {
      throw error;
    }
  };
  const addItemToCart=async()=>{
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    dispatch({
      type: 'Add_Item_Request',
      url: 'apiorder/add_to_cart',
      customer_id:customer_id,
      product_id:product.product_id,
      navigation:navigation
    });
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
  const version=Platform.OS
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {isFetching||isFetching1 ? <Loader /> : null}
      <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
                     <View style={styles.container}>
                         <View style={styles.container1}>
                         <Search1 />
                         <TextInput
                             placeholder="Cakes"
                             style={styles.search}
                             placeholderTextColor={'#000000'}
                             onChangeText={val => searchFilterFunction(val)}
                             value={search}
                             returnKeyType="done"
                         />
                         </View>
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
        <View style={{ paddingHorizontal: 10 }}>
          <View>
            <FlatList
              data={data1}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View
                  style={[styles.view, { borderBottomWidth: index == length - 1 ? 0 : .5, }]}>
                  <View style={{ width: '60%', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <View
                        style={styles.view1}>
                        <View style={styles.border} />
                      </View>
                      <View style={styles.tag}>
                        <Text style={styles.best}>{'Best Seller'}</Text>
                      </View>
                    </View>
                    <Text style={styles.title}
                    >{item.name}</Text>
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
                      <Text style={styles.review}>{'142 Reviews'}</Text>
                    </View>
                    <View style={styles.views}>
                      <Text style={styles.price}>{item.price}</Text>
                    </View>
                    <View style={{ marginTop: 6 }}>
                      <Text style={styles.desc}>{item.description}
                        <Text style={styles.more}>{'  read more'}</Text>
                      </Text>
                    </View>
                    <View style={styles.image}>
                      <Heart />
                    </View>
                    <View style={{ height: 15 }} />
                  </View>

                  <View style={styles.img}>
                    <Image style={{ height: 122, width: 122, borderRadius: 15 }}
                      source={{ uri: item.thumb }} />
                    <View style={styles.iview}>
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
                    </View>
                    <View style={styles.cus}>
                      <Text style={styles.custo}>Customise</Text>
                    </View>
                  </View>
                </View>
              )}
            />
            <View style={{ marginBottom: 110 }} />
          </View>
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
          <ScrollView stickyHeaderIndices={[0]} style={{ flex: 1 }}>
            <KeyboardAwareScrollView
              extraScrollHeight={10}
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flex: 1 }}>
              <View />
              <View />
              <View style={{ backgroundColor: '#fff', padding: 10, height: msg == 'checked' ?  600 : 700 }}>

                <View style={styles.thumb}>
                  <Image style={styles.url}
                    source={{ uri: product.thumb }} />
                </View>
                <View style={styles.bests}>
                  <View
                    style={styles.view1}>
                    <View style={styles.border} />
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.best}>{'Best Seller'}</Text>

                  </View>
                </View>
                <View style={styles.pname}>
                  <Text style={styles.title}>{product.name}</Text>
                  <View style={styles.image}>
                    <Image source={require('../../../assets/Icon/redHeart.png')} />
                  </View>
                </View>
                <View
                  style={styles.round1}>
                  <Stars
                    disabled={true}
                    default={product.rating}
                    spacing={3}
                    count={5}
                    starSize={12}
                    fullStar={require('../../../assets/Icon/fullstar.png')}
                    emptyStar={require('../../../assets/Icon/emptystar.png')} />
                  <Text style={styles.review}>{'142 Reviews'}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.descr}>
                    {product.description}
                  </Text>
                </View>
                <View style={styles.show}>
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
                </View>
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
                          <Text style={styles.gram}>500  grams</Text>
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
                        <Text style={styles.text}>Rs 315.26</Text>
                      </TouchableOpacity>
                      <TouchableOpacity

                        onPress={() => manageKg()}
                        style={styles.bottom}>
                        <View
                          style={styles.row}>
                          <Text style={styles.gram}>1  KG</Text>
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
                        <Text style={styles.text}>Rs 629.66</Text>
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
                        style={styles.msg}
                        placeholder='Message'
                        multiline={true}
                      />
                    </TouchableOpacity>
                  </View>
                }
                <View style={styles.pay}>
                  <TouchableOpacity
                    onPress={() => addItemToCart()}
                    style={styles.items}>
                    <Text style={styles.rs}>{`Add item ${product.price}`}</Text>
                  </TouchableOpacity>
                </View>

              </View>

              <View style={{ height: 100 }} />
            </KeyboardAwareScrollView>
          </ScrollView>
        </View>
      </SwipeablePanel>
      <View style={styles.bot}>
        <BottomTab />
      </View>
      
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content"/>
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


