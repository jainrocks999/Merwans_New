import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import BottomTab from '../../../components/BottomTab';
import { useNavigation, DrawerActions } from "@react-navigation/native";
import styles from "./style";
import Header from "../../../components/Header";
import Arrow from "../../../assets/Svg/arrow-forward.svg";
import Arrow1 from "../../../assets/Svg/arrow1.svg";
import Arrow2 from "../../../assets/Svg/arrow2.svg";
import Modal from 'react-native-modal';
import Arro from "../../../assets/Svg/arro";
import RNPickerSelect from 'react-native-picker-select';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage"
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import { ScrollView } from "react-native-gesture-handler";
import { FlatListSlider } from 'react-native-flatlist-slider';
import Banner from "../../../components/Banner";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";


const HomeScreen = ({ route }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const selector = useSelector(state => state.Store)
    const selector1 = useSelector(state => state.Home)
    const isFetching = useSelector(state => state.isFetching)
    const BannerWidth = Dimensions.get('window').width;
    const BannerWidth1 = Dimensions.get('window').width / 3;
    const BannerHeight = 240;
    const [visible, setVisible] = useState(false)
    const [state, setState] = useState(0)
    const [location, setLocation] = useState('Select Store')

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

    useEffect(async () => {
        const data = await AsyncStorage.getItem(Storage.location)
        data == null ? setVisible(true) : setVisible(false)
        setState(data)
        setLocation(data)
        dispatch({
            type: 'Home_Data_Request',
            url: 'home/mobileview',
        });
    }, [])
    useEffect(async () => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        const pageKey = await AsyncStorage.getItem("pageKey")
        dispatch({
            type: 'Menu_List_Request',
            url: 'apiproduct/menuSubmenuList',
        });
        dispatch({
            type: 'User_Detail_Request',
            url: `customer/getDetail&customer_id=${customer_id}`,
        });
        dispatch({
            type: 'Get_Address_Request',
            url: 'apiorder/addressById',
            customer_id: customer_id,
            address_id: 0
        });
        dispatch({
            type: 'Address_List_Req',
            url: 'apiorder/addressList',
            customer_id: customer_id,
        });
        navigation.navigate(pageKey)
    }, [])
    const handleLocation = async () => {
        const store_id = await AsyncStorage.getItem(Storage.store_id)
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        if (state == 0) {
            Toast.show('Please select store')
        }
        else {
            for (let index = 0; index < selector.length; index++) {
                if (state == selector[index].label) {
                    if (selector[index].store_id == store_id) {
                        AsyncStorage.setItem(Storage.store_id, selector[index].store_id)
                    } else {
                        AsyncStorage.setItem(Storage.store_id, selector[index].store_id)
                        try {
                            const data = new FormData();
                            data.append('customer_id', customer_id)
                            const response = await axios({
                                method: 'POST',
                                data,
                                headers: {
                                    'content-type': 'multipart/form-data',
                                    Accept: 'multipart/form-data',
                                },
                                url: 'https://merwans.co.in/index.php?route=api/cart/clearcart',
                            });
                        } catch (error) {
                            throw error;
                        }
                    }
                }
            }
            setVisible(false)
            setLocation(state)
            AsyncStorage.setItem(Storage.location, state)

        }
    }
    const manageListIem = async (id, product_id) => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        const store_id = await AsyncStorage.getItem(Storage.store_id)
        AsyncStorage.setItem("category_id", id)
        AsyncStorage.setItem("product_id", product_id)
        dispatch({
            type: 'Category_List_Request',
            url: 'apiproduct',
            category_id: id,
            customer_id: customer_id,
            store_id: store_id,
            product_id: product_id,
            navigation: navigation
        });
    }
    const manageList = async (id) => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        const store_id = await AsyncStorage.getItem(Storage.store_id)
        AsyncStorage.setItem("category_id", id)
        AsyncStorage.setItem("product_id", '')
        dispatch({
            type: 'Category_List_Request',
            url: 'apiproduct',
            category_id: id,
            customer_id: customer_id,
            store_id: store_id,
            navigation: navigation
        });
    }

    const manageTranding = async (item) => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        const store_id = await AsyncStorage.getItem(Storage.store_id)
        AsyncStorage.setItem("category_id", item.category_id)
        AsyncStorage.setItem("product_id", item.product_id)
        dispatch({
            type: 'Category_List_Request',
            url: 'apiproduct',
            category_id: item.category_id,
            customer_id: customer_id,
            store_id: store_id,
            product_id: item.product_id,
            navigation: navigation
        });
    }
    const flatListRef = useRef(FlatList);
    const [index, setIndex] = useState(1)
    const nextPress = () => {
        if (index + 1 < selector1.trendingProducts.length) {
            flatListRef?.current?.scrollToIndex({
                animated: true,
                index: index + 1
            });
            setIndex(index + 1)
        }
    };
    const backPress = () => {
        if (index > 0) {
            flatListRef?.current?.scrollToIndex({
                animated: true,
                index: index - 1
            });
            setIndex(index - 1)
        }
    };
    const manageBanner = async (item) => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        const store_id = await AsyncStorage.getItem(Storage.store_id)
        AsyncStorage.setItem("category_id", selector1.bannerData[item].catId)
        AsyncStorage.setItem("product_id", '')
        dispatch({
            type: 'Category_List_Request',
            url: 'apiproduct',
            category_id: selector1.bannerData[item].catId,
            customer_id: customer_id,
            store_id: store_id,
            navigation: navigation
        });
    }


    return (
        <View style={{ flex: 1 }}>
            {isFetching ? <Loader /> : null}
            <ScrollView contentInsetAdjustmentBehavior='automatic' stickyHeaderIndices={[0]} style={{ flex: 1 }}>
                <Header
                    location={location}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
                <TouchableOpacity
                    onPress={() => setVisible(true)}
                    style={styles.header}>
                    <Text style={styles.location}>{location ? location : 'Select Store'}</Text>
                </TouchableOpacity>
                {selector1.banner == true ? <View style={styles.height}>
                    <FlatListSlider
                        data={selector1.bannerData}
                        width={BannerWidth}
                        height={BannerHeight}
                        contentContainerStyle={{ paddingHorizontal: 0 }}
                        indicatorContainerStyle={{ position: 'absolute', bottom: 5, }}
                        indicatorActiveColor={'#ED1B1A'}
                        indicatorInActiveColor={'#737373'}
                        loop={false}
                        autoscroll={true}
                        onPress={(item) => manageBanner(item)}
                    />
                </View> : null}
                {selector1.specialProduct == true ? <ImageBackground source={require('../../../assets/Icon/bg.png')}
                    style={styles.special}>
                    <View style={styles.specialView}>
                        <Text style={styles.merwans}>Merwans Special</Text>
                    </View>
                    <View style={{ paddingHorizontal: 10, marginBottom: 25 }}>
                        <FlatListSlider
                            data={selector1.specialProducts}
                            width={BannerWidth1}
                            height={BannerHeight}
                            contentContainerStyle={{ paddingHorizontal: 0 }}
                            indicatorContainerStyle={{ position: 'absolute', bottom: -15 }}
                            indicatorActiveColor={'#ED1B1A'}
                            indicatorInActiveColor={'#737373'}
                            component={<Banner />}
                            loop={false}
                            autoscroll={false}
                        />
                    </View>
                </ImageBackground> : null}
                {selector1.category == true ? <View style={{  }}>
                    <View style={styles.sub}>
                        <Image source={require('../../../assets/Icon/dot.png')} />
                    </View>
                    <View style={styles.sub1}>
                        <Text style={styles.ready}>Ready To Deliver</Text>
                    </View>

                    <View style={{ height: 370 }} />
                    <View>
                        <Image source={require('../../../assets/Icon/badam.png')} />
                    </View>
                    <View style={{ paddingHorizontal: 12, marginTop: -449 }}>
                        <View style={styles.row}>
                            <TouchableOpacity
                                onPress={() => manageList(selector1.deliverCategory[0].category_id)}
                                style={styles.main}>
                                <Image
                                    style={styles.image}
                                    source={selector1.deliverCategory[0].image ? { uri: selector1.deliverCategory[0].image } : require('../../../assets/Logo/rtd1.png')} />
                                    <Text style={{alignSelf:'flex-start',fontFamily:'Montserrat-SemiBold',marginTop:6,color:'#000000'}}>{selector1.deliverCategory[0].name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => manageList(selector1.deliverCategory[1].category_id)}
                                style={styles.main}>
                                <Image
                                    style={styles.image}
                                    source={selector1.deliverCategory[1].image ? { uri: selector1.deliverCategory[1].image } : require('../../../assets/Logo/rtd1.png')} />
                         <Text style={{alignSelf:'flex-start',fontFamily:'Montserrat-SemiBold',marginTop:6,color:'#000000'}}>{selector1.deliverCategory[1].name}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row, { marginTop: 12 }]}>
                            <TouchableOpacity
                                onPress={() => manageList(selector1.deliverCategory[2].category_id)}
                                style={styles.main}>
                                <Image
                                    style={styles.image}
                                    source={selector1.deliverCategory[2].image ? { uri: selector1.deliverCategory[2].image } : require('../../../assets/Logo/rtd1.png')} />
                             <Text style={{alignSelf:'flex-start',fontFamily:'Montserrat-SemiBold',marginTop:6,color:'#000000'}}>{selector1.deliverCategory[2].name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => manageList(selector1.deliverCategory[3].category_id)}
                                style={styles.main}>
                                <Image
                                    style={styles.image}
                                    source={selector1.deliverCategory[3].image ? { uri: selector1.deliverCategory[3].image } : require('../../../assets/Logo/rtd1.png')}
                                />
                                 <Text style={{alignSelf:'flex-start',fontFamily:'Montserrat-SemiBold',marginTop:6,color:'#000000'}}>{selector1.deliverCategory[3].name}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}
                <View style={{ backgroundColor: '#fff', marginTop: selector1.category == true ? 40 : 0 }}>
                    {selector1.specialCategory == true && selector1.specialCategoryData[0].products? <View style={styles.cont}>
                        <Text style={styles.cat}>{selector1.specialCategoryData[0].name}</Text>
                        <TouchableOpacity
                            onPress={() => manageList(selector1.specialCategoryData[0].category_id)}
                            style={styles.viewAll}>
                            <Text style={styles.all}>View All</Text>
                            <Arrow />
                        </TouchableOpacity>
                    </View> : null}
                    {selector1.specialCategory == true &&selector1.specialCategoryData[0].products ? <View style={[styles.row1, { marginBottom: 30 }]}>
                        <TouchableOpacity
                            onPress={() => manageListIem(selector1.specialCategoryData[0].category_id, selector1.specialCategoryData[0].products[0].product_id)}
                            style={styles.view}>
                            <Image style={styles.radius}
                                source={selector1.specialCategoryData[0].products[0].image ? { uri: selector1.specialCategoryData[0].products[0].image } : require('../../../assets/Logo/cake-box.png')} />
                            <View style={styles.view2}>
                                <Text style={styles.cake}>{selector1.specialCategoryData[0].products[0].name}</Text>
                                <Text style={styles.des}>{selector1.specialCategoryData[0].products[0].description}</Text>
                                <View style={styles.rView}>
                                    <Text style={styles.rupees}>{`₹${parseInt(selector1.specialCategoryData[0].products[0].price).toFixed(2)}`}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => manageListIem(selector1.specialCategoryData[0].category_id, selector1.specialCategoryData[0].products[1].product_id)}
                            style={styles.view}>
                            <Image style={styles.radius}
                                source={selector1.specialCategoryData[0].products[1].image ? { uri: selector1.specialCategoryData[0].products[1].image } : require('../../../assets/Logo/cake-box.png')} />
                            <View style={styles.view2}>
                                <Text style={styles.cake}>{selector1.specialCategoryData[0].products[1].name}</Text>
                                <Text style={styles.des}>{selector1.specialCategoryData[0].products[1].description}</Text>
                                <View style={styles.rView}>
                                    <Text style={styles.rupees}>{`₹${parseInt(selector1.specialCategoryData[0].products[1].price).toFixed(2)}`}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> : null}
                    {selector1.trendingProduct == true ? <View style={styles.trending}>
                        <View style={styles.trending1}>
                            <Text style={styles.trending2}>Trending Now</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <FlatList
                                data={selector1.trendingProducts}
                                ref={flatListRef}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => manageTranding(item)}
                                            style={{
                                                marginHorizontal: 8
                                            }}>
                                            <Image style={{ width: 133, height: 125 }}
                                                source={item.image ? { uri: item.image } : require('../../../assets/Logo/samosa.png')} />
                                            <Text style={styles.name}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                }
                            />
                            <View style={styles.arrow}>
                                <TouchableOpacity
                                    onPress={() => backPress()}>
                                    <Arrow1 />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => nextPress()}
                                    style={{ marginLeft: 12 }}>
                                    <Arrow2 />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 30 }} />
                    </View> : null}

                </View>
                {/* </View> */}

            </ScrollView>
            <View>
                <BottomTab
                    home={true}
                    search={false}
                    cart={false}
                    profile={false}
                />
            </View>
            <Modal
                isVisible={visible}
            >
                <View style={styles.pop}>
                    <View style={styles.popView}>
                        <Text style={styles.welcome}>{'WELCOME TO MERWANS CONFECTIONERS PVT. LTD.'}</Text>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#D9D9D9' }} />
                    <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
                        <Text style={styles.select}>Select Store To Start Shopping</Text>
                        <View style={styles.main1}>
                            <View style={styles.container}>
                                <RNPickerSelect
                                    onValueChange={val => setState(val)}
                                    items={selector}
                                    style={{
                                        inputAndroid: {
                                            color: '#333333',
                                            width: '100%',
                                            fontSize: 12,
                                            marginBottom: 0,
                                            includeFontPadding: false, padding: 0, margin: 0
                                        },
                                        inputIOS: {
                                            color: '#333333',
                                            width: '100%',
                                            fontSize: 12,
                                            marginBottom: -4,
                                        },
                                        placeholder: {
                                            color: '#333333',
                                            width: '100%',
                                            //height: 40,
                                            alignSelf: 'center',
                                        },
                                    }}
                                    value={state == null || state == 0 ? '' : state}
                                    useNativeAndroidPickerStyle={false}
                                    placeholder={{ label: 'Select Store', value: '' }}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => handleLocation()}
                                style={styles.go}>
                                <Text style={styles.text}>Go</Text>
                                <View style={{ marginTop: 4, marginLeft: 6 }}>
                                    <Arro />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 15 }} />
                </View>
            </Modal>
            <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
    )
}
export default HomeScreen;

