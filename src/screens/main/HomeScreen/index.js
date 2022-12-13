import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import BottomTab from '../../../components/BottomTab';
import { useNavigation, DrawerActions } from "@react-navigation/native";
import styles from "./style";
import Header from "../../../components/Header";
import Arrow from "../../../assets/Svg/arrow-forward.svg";
import Arrow1 from "../../../assets/Svg/arrow1.svg";
import Arrow2 from "../../../assets/Svg/arrow2.svg";
import Modal from 'react-native-modal';
import Arro from "../../../assets/Svg/arro";
import Down from "../../../assets/Svg/down.svg";
import RNPickerSelect from 'react-native-picker-select';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage"
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import SelectDropdown from 'react-native-select-dropdown'
import { ScrollView } from "react-native-gesture-handler";
import {FlatListSlider} from 'react-native-flatlist-slider';
import Banner from "../../../components/Banner";

const HomeScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const selector = useSelector(state => state.Store)
    const isFetching = useSelector(state => state.isFetching)
    const BannerWidth = Dimensions.get('window').width;
    const BannerHeight = 240;
    const [visible, setVisible] = useState(false)
    const [state, setState] = useState(0)
    const [location, setLocation] = useState('Select Store')
  
    useEffect(async() => {
        const data=await AsyncStorage.getItem(Storage.location)
         data==null? setVisible(true):setVisible(false)
         setState(data)
         setLocation(data)
    },[])
    useEffect(async()=>{
        const customer_id=await AsyncStorage.getItem(Storage.customer_id)
        dispatch({
            type: 'Menu_List_Request',
            url: 'apiproduct/menuSubmenuList',
          });
          dispatch({
            type: 'Get_Address_Request',
            url: 'apiorder/addressById',
            customer_id:customer_id,
            address_id:0
          });
    },[])


    const handleLocation = () => {
        if (state == 0) {
            Toast.show('Please select store')
        }
        else {
            for (let index = 0; index < selector.length; index++) {
                 if(state==selector[index].label){
                  AsyncStorage.setItem(Storage.store_id,selector[index].store_id)
                 }    
            }
            setVisible(false)
            setLocation(state)
            AsyncStorage.setItem(Storage.location, state)

        }
    }
    const handleLocation1 = (val) => {
        setState(val)
        setLocation(val)
        AsyncStorage.setItem(Storage.location, val)

    }

    const renderPage = (image, index) => {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={require('../../../assets/Logo/banner.png')} />
            </View>
        );
    }
    const renderPage1 = (image, index) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                <View style={{ width: '30%', }} >
                    <Image style={{ width: '100%', height: 110 }} source={require('../../../assets/Logo/image1.png')} />
                    <Text style={{ color: '#000000', fontFamily: 'Montserrat-SemiBold', fontSize: 10, marginTop: 5 }}>{'Almond Finger \n[1 Pc]'}</Text>
                    <Text style={{ color: '#000000', fontFamily: 'Montserrat-Medium', fontSize: 11, marginTop: 10 }}>{'₹ 550.00'}</Text>
                </View>
                <View style={{ width: '30%' }}>
                    <Image style={{ width: '100%', height: 110 }} source={require('../../../assets/Logo/image2.png')} />
                    <Text style={{ color: '#000000', fontFamily: 'Montserrat-SemiBold', fontSize: 10, marginTop: 5 }}>{'Cashew Butter Biscuits [250 gms]'}</Text>
                    <Text style={{ color: '#000000', fontFamily: 'Montserrat-Medium', fontSize: 11, marginTop: 10 }}>{'₹ 550.00'}</Text>
                </View>
                <View style={{ width: '30%', marginRight: 20 }}>
                    <Image style={{ width: '100%', height: 110 }} source={require('../../../assets/Logo/image3.png')} />
                    <Text style={{ color: '#000000', fontFamily: 'Montserrat-SemiBold', fontSize: 10, marginTop: 5 }}>{'Blueberry Cheese Cake'}</Text>
                    <Text style={{ color: '#000000', fontFamily: 'Montserrat-Medium', fontSize: 11, marginTop: 10 }}>{'₹ 550.00'}</Text>
                </View>
            </View>
        );
    }

    const manageList = async () => {
        dispatch({
            type: 'Category_List_Request',
            url: 'apiproduct',
            category_id: 24,
            navigation: navigation
        });
    }
    const flatListRef = useRef(FlatList);
    const [index, setIndex] = useState(1)
    const nextPress = () => {
        if (index + 1 < data.length) {
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
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#E2E2E2',
                        height: 40, width: '100%'
                    }}>
                    <Text style={{ color: '#333333', fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>{location ? location : 'Select Store'}</Text>
                </TouchableOpacity>
                <View style={{ width: '100%', alignItems: 'center', height: 200, marginTop: 0 }}>
                    {/* <Carousel
                        autoplay={false}
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                        activePageIndicatorStyle={{ backgroundColor: '#ED1B1A', }}
                    >
                        {images.map((image, index) => renderPage(image, index))}
                    </Carousel> */}
                    <FlatListSlider 
                        data={images5} 
                        imageKey={'banner'}
                        local
                        width= {BannerWidth}
                        height= {BannerHeight}
                        contentContainerStyle={{paddingHorizontal: 0}}
                        indicatorContainerStyle={{position:'absolute', bottom: 5,}}
                        indicatorActiveColor={'#ED1B1A'}
                        indicatorInActiveColor={'#737373'}
                        loop={false}
                        autoscroll={false}
                        // animation
                    />
                </View>
                <ImageBackground source={require('../../../assets/Icon/bg.png')} 
                style={{ backgroundColor: '#fff', paddingBottom: 11,  }}>
                    <View style={{ alignItems: 'center', paddingVertical: 10, marginTop: 5 }}>
                        <Text style={{ color: '#ED1B1A', fontFamily: 'Montserrat-Bold', fontSize: 22 }}>Merwans Special</Text>
                    </View>
                    <View style={{ paddingHorizontal: 10, marginBottom: 25}}>
                        {/* <Carousel
                            autoplay={false}
                            autoplayTimeout={5000}
                            loop={false}
                            index={0}
                            pageSize={BannerWidth}
                            pageIndicatorStyle={{ marginTop: 20, backgroundColor: 'grey' }}
                            pageIndicatorContainerStyle={{ marginTop: 20, bottom: -10 }}
                            activePageIndicatorStyle={{ marginTop: 20, backgroundColor: '#ED1B1A', }}
                            showsPageIndicator={true}
                        >
                            {images1.map((image, index) => renderPage1(image, index))}
                        </Carousel> */}
                        <FlatListSlider 
                        data={images5} 
                        imageKey={'banner'}
                        local
                        width= {BannerWidth}
                        height= {BannerHeight}
                        contentContainerStyle={{paddingHorizontal: 0}}
                        indicatorContainerStyle={{position:'absolute', bottom: -15}}
                        indicatorActiveColor={'#ED1B1A'}
                        indicatorInActiveColor={'#737373'}
                        component={<Banner/>}
                        loop={false}
                        autoscroll={false}
                        // animation
                    />
                    </View>
                </ImageBackground>
                <View style={{ backgroundColor: '#E2E2E2' }}>
                    <View style={{ alignItems: 'flex-end', marginTop: -30 }}>
                        <Image source={require('../../../assets/Icon/dot.png')} />
                    </View>
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: -92,
                    }}>
                        <Text style={{ color: '#ED1B1A', fontFamily: 'Montserrat-SemiBold', fontSize: 22 }}>Ready To Deliver</Text>
                    </View>

                    <View style={{ height: 340 }} />
                    <View>
                        <Image source={require('../../../assets/Icon/badam.png')} />
                    </View>
                    <View style={{ paddingHorizontal: 12, marginTop: -425 }}>
                        <View style={styles.row}>
                            <View style={styles.main}>
                                <Image
                                    style={{ width: '100%', borderRadius: 10 }}
                                    source={require('../../../assets/Logo/rtd1.png')} />
                            </View>
                            <View style={styles.main}>
                                <Image
                                    style={{ width: '100%', borderRadius: 10 }}
                                    source={require('../../../assets/Logo/rtd1.png')} />
                            </View>
                        </View>
                        <View style={[styles.row, { marginTop: 12 }]}>
                            <View style={styles.main}>
                                <Image
                                    style={{ width: '100%', borderRadius: 10 }}
                                    source={require('../../../assets/Logo/rtd1.png')} />
                            </View>
                            <View style={styles.main}>
                                <Image
                                    style={{ width: '100%', borderRadius: 10 }}
                                    source={require('../../../assets/Logo/rtd1.png')} />
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#fff', marginTop: 73 }}>
                        <View style={styles.cont}>
                            <Text style={{ color: '#EB201F', fontFamily: 'Montserrat-Bold', fontSize: 20 }}>Cakes</Text>
                            <TouchableOpacity
                                onPress={() => manageList()}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#EC1835', fontSize: 13, marginRight: 10, borderBottomWidth: 1, fontFamily: 'Montserrat-Medium' }}>View All</Text>
                                <Arrow />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row1}>
                            <View style={styles.view}>
                                <Image style={{ width: '100%' }}
                                    source={require('../../../assets/Logo/cake-box.png')} />
                                <View style={styles.view2}>
                                    <Text style={styles.cake}>{'Pineapple Cake'}</Text>
                                    <Text style={styles.des}>Lorem ipsume dolor sit amet, consectetur adipiscing elit.</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 10 }}>
                                        <Text style={{ color: '#232323', fontFamily: 'Montserrat-Regular', fontSize: 12 }}>{'₹ 290.00'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.view}>
                                <Image style={{ width: '100%' }}
                                    source={require('../../../assets/Logo/cake-box.png')} />
                                <View style={styles.view2}>
                                    <Text style={styles.cake}>{'Pineapple Cake'}</Text>
                                    <Text style={styles.des}>Lorem ipsume dolor sit amet, consectetur adipiscing elit.</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 10 }}>
                                        <Text style={{ color: '#232323', fontFamily: 'Montserrat-Regular', fontSize: 12 }}>{'₹ 290.00'}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', backgroundColor: '#FFFBDB', marginTop: 30 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 22, color: '#ED1B1A' }}>Trending Now</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <FlatList
                                    data={data}
                                    ref={flatListRef}
                                    horizontal={true}
                                    renderItem={({ item }) => {
                                        return (
                                            <View
                                                style={{
                                                    marginHorizontal: 8
                                                }}>
                                                <Image source={item.image} />
                                                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 12, color: '#000000', marginTop: 10 }}>{item.name
                                                }</Text>
                                            </View>
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
                        </View>

                    </View>
                </View>

            </ScrollView>
            <View>
                <BottomTab />
            </View>
            <Modal
                isVisible={visible}
            >
                <View style={{ backgroundColor: '#FFF', width: '100%', alignSelf: 'center' }}>
                    <View style={{
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: '#ED1B1A',
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: 13
                        }}>{'WELCOME TO MERWANS CONFECTIONERS PVT. LTD.'}</Text>
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
                                {/* <SelectDropdown
                                    data={data1}
                                    onSelect={(selectedItem, index) => {
                                        setState(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                    buttonStyle={{
                                        backgroundColor:'#FAFAFA',
                                        height:30,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        width:'100%'
                                    }}
                                    buttonTextStyle={{fontSize:12}}
                                    defaultButtonText='Select Store'
                                /> */}
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
const Store = ["Egypt", "Canada", "Australia", "Ireland", "Egypt", "Canada", "Australia", "Ireland"]
const data1 = [
    {
        labe: "Andheri West",
        value: "31"
    },
    {
        label: "West",
        value: "32"
    },
    {
        label: "West",
        value: "33"
    }
]

const data = [
    { image: require('../../../assets/Logo/samosa.png'), name: 'Cheese Puff' },
    { image: require('../../../assets/Logo/samosa.png'), name: 'Cheese Puff' },
    { image: require('../../../assets/Logo/samosa.png'), name: 'Cheese Puff' },
    { image: require('../../../assets/Logo/samosa.png'), name: 'Cheese Puff' },
    { image: require('../../../assets/Logo/samosa.png'), name: 'Cheese Puff' }
]

const images = [
    "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    "http://xxx.com/3.png"
];
const images1 = [
    "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    "http://xxx.com/3.png"
];


const images5 = [
    {
     banner:require('../../../assets/Logo/banner.png'),
    
    },
   {
     banner:require('../../../assets/Logo/banner.png'),
    },
    {
     banner:require('../../../assets/Logo/banner.png'),
    }
   ]