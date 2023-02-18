import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, TextInput, ScrollView, StatusBar, Platform } from "react-native";
import styles from './style';
import Home from "../../../components/Home";
import Multi from "../../../assets/Svg/multip.svg";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import Down from "../../../assets/Svg/down.svg";
import { Formik } from 'formik';
import * as yup from 'yup';
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import CheckBox from '@react-native-community/checkbox';
import Geocoder from 'react-native-geocoding';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";
Geocoder.init("AIzaSyAEAzAu0Pi_HLLURabwR36YY9_aiFsKrsw");

const loginValidationSchema = yup.object().shape({
    address1: yup.string().required('Please enter your address1'),
    fName: yup.string().required('Please enter your first name'),
    lName: yup.string().required('Please enter your last name'),
    address2: yup.string(),
    city: yup.string().required('Please enter your city'),
    post: yup.string()
        .min(6, ({ }) => 'Post code must be minimum 6 digit').
        max(6, ({ }) => 'Post code must be maximum 6 digit').
        required('Please enter your post code')
        .matches(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/, 'Please enter valid post code'),
    land: yup.string()
});


const AddressForm = ({ route }) => {

    const [home, setHome] = useState(true)
    const [work, setWork] = useState(false)
    const [hotel, setHotel] = useState(false)
    const [other, setOther] = useState(false)
    const [type, setType] = useState(route.params.type)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [isFetching, setFetching] = useState(false)
    const City = useSelector(state => state.City)
    const [state, setState] = useState(route.params.zone_id)
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    useEffect(() => {
        NetInfo.addEventListener(state => {
          if(!state.isConnected){
          showMessage({
            message:'Please connect to your internet',
            type:'danger',
          });
          }
        });
      },[])
    useEffect(() => {
        if (route.params.type == 'Home') {
         manageHome()
        }
        else if (route.params.type == 'Work') {
         manageWork()
        }
        else if (route.params.type == 'Hotel') {
         manageHotel()
        }
        else if (route.params.type == 'Other') {
        manageOther()
        }
    }, [])
    const manageHome = () => {
        setWork(false)
        setHotel(false)
        setOther(false)
        setHome(true)
        setType('Home')
    }
    const manageWork = () => {
        setWork(true)
        setHotel(false)
        setOther(false)
        setHome(false)
        setType('Work')
    }
    const manageHotel = () => {
        setWork(false)
        setHotel(true)
        setOther(false)
        setHome(false)
        setType('Hotel')
    }
    const manageOther = () => {
        setWork(false)
        setHotel(false)
        setOther(true)
        setHome(false)
        setType('Other')
    }


    const validateUser = async (values) => {
        const customer_id = await AsyncStorage.getItem(Storage.customer_id)
        const first = await AsyncStorage.getItem(Storage.firstname)
        const last = await AsyncStorage.getItem(Storage.lastname)
        if (state == '' || state == 0) {
            Toast.show('Please select state')
        }
        else {
            try {
                setFetching(true)
                const data = new FormData();
                data.append('api_token', '');
                data.append('address_id',route.params.address_id);
                data.append('customer_id', customer_id);
                data.append('type', type)
                data.append('company', 'Merwans');
                data.append('address_1', values.address1);
                data.append('address_2', values.address2);
                data.append('city', values.city);
                data.append('postcode', values.post);
                data.append('country_id', '99');
                data.append('zone_id', state);
                data.append('landmark', values.land)
                data.append('firstname', values.fName)
                data.append('lastname', values.lName)
                data.append('default', toggleCheckBox == true ? 1 : 0)
                const response = await axios({
                    method: 'POST',
                    data,
                    headers: {
                        'content-type': 'multipart/form-data',
                        Accept: 'multipart/form-data',
                    },
                    url: 'https://merwans.co.in/index.php?route=api/apiorder/addressUpdate',
                });
                if (response.data.status == true) {
                    Geocoder.from(values.address1)
                        .then(json => {
                            var location = json.results[0].geometry.location;
                            dispatch({
                                type: 'Add_Lat_Request',
                                url: 'apiorder/addlatlong',
                                address_id: response.data.address_id,
                                lat: location.lat,
                                long: location.lng,
                            });
                        })
                        .catch(error => console.warn(error));

                    dispatch({
                        type: 'Address_List_Request',
                        url: 'apiorder/addressList',
                        customer_id: customer_id,
                        from: 'addressForm',
                        navigation: navigation
                    });
                    setFetching(false)
                }
                else {
                    setFetching(false)
                }
            } catch (error) {
                throw error;
            }
        }
    }

    return (
        <Formik
            initialValues={{
                address1: route.params.address_1,
                address2: route.params.address_2,
                city: route.params.city,
                post: route.params.postcode,
                land: route.params.landmark,
                fName:route.params.firstname,
                lName:route.params.lastname
            }}
            onSubmit={values => validateUser(values)}
            validateOnMount={true}
            validationSchema={loginValidationSchema}>
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <View style={{ flex: 1 }}>
                    {isFetching ? <Loader /> : null}
                    <ImageBackground
                        style={{ flex: 1 }}
                        source={require('../../../assets/Icon/bg.png')}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#232323',
                            height: 40
                        }}>
                            <View style={{ width: 30 }} />
                            <Text style={styles.enter}>Edit Address Details</Text>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ marginRight: 10 }}>
                                <Multi width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 6 }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.as}>Save Address As</Text>
                            </View>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    onPress={() => manageHome()}
                                    style={[styles.button, { borderWidth: home ? 1 : 0, }]}>
                                    <Text style={styles.text}>Home</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => manageWork()}
                                    style={[styles.button, { borderWidth: work ? 1 : 0, }]}>
                                    <Text style={styles.text}>Work</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => manageHotel()}
                                    style={[styles.button, { borderWidth: hotel ? 1 : 0, }]}>
                                    <Text style={styles.text}>Hotel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => manageOther()}
                                    style={[styles.button, { borderWidth: other ? 1 : 0, }]}>
                                    <Text style={styles.text}>Other</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <KeyboardAwareScrollView
                                    extraScrollHeight={10}
                                    enableOnAndroid={true}
                                    keyboardShouldPersistTaps="handled"
                                    contentContainerStyle={{ flex: 1 }}>
                                    <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                                        <View style={{ height: 20 }}>
                                        </View>
                                        <View >
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>First Name</Text>
                                                <Text style={styles.str}>*</Text>
                                            </View>

                                            <View style={styles.view}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="First Name"
                                                    placeholderTextColor={'#000000'}
                                                    onChangeText={handleChange('fName')}
                                                    onBlur={handleBlur('fName')}
                                                    value={values.fName}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.error}>
                                            {errors.fName && touched.fName && (
                                                <Text style={styles.warn}>{errors.fName}</Text>
                                            )}
                                        </View>
                                        <View style={{ marginTop: 15 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Last Name</Text>
                                                <Text style={styles.str}>*</Text>
                                            </View>

                                            <View style={styles.view}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Last Name"
                                                    placeholderTextColor={'#000000'}
                                                    onChangeText={handleChange('lName')}
                                                    onBlur={handleBlur('lName')}
                                                    value={values.lName}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.error}>
                                            {errors.lName && touched.lName && (
                                                <Text style={styles.warn}>{errors.lName}</Text>
                                            )}
                                        </View>
                                        <View style={{marginTop:15}}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Location</Text>
                                                <Text style={styles.str}>*</Text>
                                            </View>
                                            <View style={styles.view}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Location"
                                                    placeholderTextColor={'#000000'}
                                                    onChangeText={handleChange('address1')}
                                                    onBlur={handleBlur('address1')}
                                                    value={values.address1}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.error}>
                                            {errors.address1 && touched.address1 && (
                                                <Text style={styles.warn}>{errors.address1}</Text>
                                            )}
                                        </View>

                                        <View style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Flat No./Building Name</Text>
                                            </View>
                                            <View style={styles.view}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Flat No./Building Name"
                                                    placeholderTextColor={'#000000'}
                                                    onChangeText={handleChange('address2')}
                                                    onBlur={handleBlur('address2')}
                                                    value={values.address2}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 15 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>City</Text>
                                                <Text style={styles.str}>*</Text>
                                            </View>

                                            <View style={styles.view}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="City"
                                                    placeholderTextColor={'#000000'}
                                                    onChangeText={handleChange('city')}
                                                    onBlur={handleBlur('city')}
                                                    value={values.city}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.error}>
                                            {errors.city && touched.city && (
                                                <Text style={styles.warn}>{errors.city}</Text>
                                            )}
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Post Code</Text>
                                                <Text style={styles.str}>*</Text>
                                            </View>
                                            <View style={styles.view}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Post Code"
                                                    placeholderTextColor={'#000000'}
                                                    onChangeText={handleChange('post')}
                                                    onBlur={handleBlur('post')}
                                                    value={values.post}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.error}>
                                            {errors.post && touched.post && (
                                                <Text style={styles.warn}>{errors.post}</Text>
                                            )}
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.heading}>Region / State</Text>
                                                <Text style={styles.str}>*</Text>
                                            </View>
                                            <View style={styles.view}>
                                                <RNPickerSelect
                                                    onValueChange={(val) => setState(val)}
                                                    items={City}
                                                    style={{
                                                        inputAndroid: {
                                                            color: '#000',
                                                            width: '100%',
                                                            fontSize: 14,
                                                            marginBottom: -1,
                                                        },
                                                        inputIOS: {
                                                            color: '#000',
                                                            width: '100%',
                                                            fontSize: 14,
                                                            marginBottom: -1,
                                                        },
                                                        placeholder: {
                                                            color: '#000',
                                                            width: '100%',
                                                            alignSelf: 'center',
                                                        },
                                                    }}
                                                    value={state}
                                                    useNativeAndroidPickerStyle={false}
                                                    placeholder={{ label: 'Select state', value: '' }}
                                                    Icon={() => (
                                                        <View style={{ marginTop: Platform.OS == 'ios' ? 5 : 12, marginRight: 4 }}>
                                                            <Down />
                                                        </View>
                                                    )}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.error}>
                                            {errors.states && (
                                                <Text style={styles.warn}>{errors.states}</Text>
                                            )}
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={styles.heading}>Nearby Landmark(Optional)</Text>
                                            <View style={styles.view}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder=""
                                                    placeholderTextColor={'#000000'}
                                                    onChangeText={handleChange('email')}
                                                    onBlur={handleBlur('email')}
                                                    value={values.email}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onValueChange={newValue => setToggleCheckBox(newValue)}
                                                tintColors={{ true: '#ED1B1A', false: 'grey' }}
                                                onTintColor='#ED1B1A'
                                                onCheckColor='#ED1B1A'
                                                boxType='square'
                                                style={{ height:Platform.OS=='android'?30:17, width:Platform.OS=='android'?30:17}}
                                            />
                                            <Text style={[styles.as1, { marginLeft: 10 }]}>Set as default address</Text>
                                        </View>
                                        <View style={{ marginTop: 25, alignItems: 'center' }}>
                                            <TouchableOpacity
                                                onPress={() => handleSubmit()}
                                                style={styles.add}>
                                                <Text style={styles.save}>Save Address</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ height: 130 }} />
                                    </View>
                                </KeyboardAwareScrollView>
                            </ScrollView>
                        </View>
                    </ImageBackground>
                    <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
                </View>
            )}
        </Formik>
    )
}
export default AddressForm;
const data = [
    { label: 'Maharashtra', value: '1' },
    { label: 'Indore', value: '2' },
    { label: 'Delhi', value: '3' },
];