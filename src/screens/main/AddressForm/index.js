import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, TextInput, ScrollView,StatusBar } from "react-native";
import styles from './style';
import Home from "../../../components/Home";
import Multi from "../../../assets/Svg/multiply.svg";
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

const loginValidationSchema = yup.object().shape({
    address1: yup.string().required('Please enter your address1'),
    address2: yup.string(),
    city: yup.string().required('Please enter your city'),
    post: yup.string().required('Please enter your post code'),
    land: yup.string()
});

const AddressForm = () => {

    const [home, setHome] = useState(true)
    const [work, setWork] = useState(false)
    const [hotel, setHotel] = useState(false)
    const [other, setOther] = useState(false)
    const [type, setType] = useState('')
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [isFetching, setFetching] = useState(false)
    const City = useSelector(state => state.City)
    console.log('this is city', City);
    const [state, setState] = useState(0)

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
            Toast.show('Please select city')
        }
        else {
            try {
                setFetching(true)
                const data = new FormData();
                data.append('api_token', '');
                data.append('customer_id', customer_id);
                data.append('company', 'Merwans');
                data.append('address_1', values.address1);
                data.append('address_2', values.address2);
                data.append('city', values.city);
                data.append('postcode', values.post);
                data.append('country_id', '99');
                data.append('zone_id', state);
                data.append('default', values.land)
                data.append('firstname', first)
                data.append('lastname', last)
                const response = await axios({
                    method: 'POST',
                    data,
                    headers: {
                        'content-type': 'multipart/form-data',
                        Accept: 'multipart/form-data',
                    },
                    url: 'https://merwans.co.in/index.php?route=api/apiorder/addressAdd',
                });

                if (response.data.status == true) {
                    dispatch({
                        type: 'Address_List_Request',
                        url: 'apiorder/addressList',
                        customer_id: customer_id,
                        from:'addressForm',
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
                address1: '',
                address2: '',
                city: '',
                post: '',
                land: ''
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
                        style={{ paddingHorizontal: 6, flex: 1 }}
                        source={require('../../../assets/Icon/bg.png')}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ alignSelf: 'flex-end', }}>
                            <Multi />
                        </TouchableOpacity>
                        <View>
                            <View style={styles.title}>
                                <Text style={styles.enter}>Enter Address Details</Text>
                            </View>
                        </View>
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
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.heading}>Address 1</Text>
                                            <Text style={styles.str}>*</Text>
                                        </View>
                                        <View style={styles.view}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Address 1"
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
                                            <Text style={styles.heading}>Address 2</Text>
                                        </View>
                                        <View style={styles.view}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Address 2"
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
                                                    <View style={{ marginTop: 12, marginRight: 4 }}>
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
                                    <View style={{ marginTop: 25, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => handleSubmit()}
                                            style={styles.add}>
                                            <Text style={styles.save}>Save Address</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ height: 10 }} />
                                </View>
                            </KeyboardAwareScrollView>
                        </ScrollView>
                    </ImageBackground>
                    <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
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