import React, { useState,useEffect } from "react";
import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import * as yup from 'yup';
import Back from "../../../assets/Svg/back.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/AsyncStorage";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

const loginValidationSchema = yup.object().shape({
  fname: yup
    .string()
    .max(40, ({ max }) => `First name must be only ${max} character`)
    .required('Please enter your first name ')
    .matches(/^[^,*+.!0-9-\/:-@\[-`{-~]+$/, 'Please enter valid first name'),
  lname: yup
    .string()
    .max(40, ({ max }) => `Last name must be only ${max} character`)
    .required('Please enter your last name ')
    .matches(/^[^,*+.!0-9-\/:-@\[-`{-~]+$/, 'Please enter valid last name'),
  mobile: yup
    .string()
    .min(10, ({ }) => 'Mobile number must be 10 digit number')
    .required('Please enter your mobile number')
    .matches(/^[0]?[6-9]\d{9}$/, 'Please enter valid mobile number'),
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Please enter your email address '),
});

const EditProfile = ({ route }) => {
  const navigation = useNavigation()
  const isFetching = useSelector(state => state.isFetching)
  const dispatch = useDispatch()

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

  const validateUser = async (values) => {
    const customer_id = await AsyncStorage.getItem(Storage.customer_id)
    dispatch({
      type: 'Edit_Profile_Request',
      url: 'api/updateProfile',
      firstname: values.fname,
      lastname: values.lname,
      telephone: values.mobile,
      email: values.email,
      customer_id: customer_id,
      navigation: navigation
    });
  }

  return (
    <Formik
      initialValues={{
        fname: route.params.fname,
        lname: route.params.lname,
        email: route.params.email,
        mobile: route.params.telephone
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
          <ImageBackground style={{ padding: 0, flex: 1 }}
            source={require('../../../assets/Icon/bg.png')}>
           
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#232323',
              height: 40
            }}>
              <TouchableOpacity style={{
                paddingHorizontal: 10,
                paddingVertical: 8,
                paddingRight: 30
              }}
                onPress={() => navigation.goBack()}>
                <Back />
              </TouchableOpacity>
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{
                  color: '#fff',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 20
                }}>Edit Profile</Text>
              </View>
              <View style={{ width: 40 }} />
            </View>
            <ScrollView>
              <KeyboardAwareScrollView
                extraScrollHeight={100}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}>

                <View style={{ padding: 20 }}>
                  <View>
                    <Text style={styles.heading}>First Name</Text>
                    <View style={styles.view}>
                      <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor={'#000000'}
                        onChangeText={handleChange('fname')}
                        onBlur={handleBlur('fname')}
                        value={values.fname}
                      />
                    </View>
                  </View>
                  <View style={styles.error}>
                    {errors.fname && touched.fname && (
                      <Text style={styles.warn}>{errors.fname}</Text>
                    )}
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.heading}>Last Name</Text>
                    <View style={styles.view}>
                      <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor={'#000000'}
                        onChangeText={handleChange('lname')}
                        onBlur={handleBlur('lname')}
                        value={values.lname}
                      />
                    </View>
                  </View>
                  <View style={styles.error}>
                    {errors.lname && touched.lname && (
                      <Text style={styles.warn}>{errors.lname}</Text>
                    )}
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.heading}>Email</Text>
                    <View style={styles.view}>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={'#000000'}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                    </View>
                  </View>
                  <View style={styles.error}>
                    {errors.email && touched.email && (
                      <Text style={styles.warn}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.heading}>Mobile Number</Text>
                    <View style={styles.view}>
                      <TextInput
                        style={styles.input}
                        placeholder="Mobile Number"
                        placeholderTextColor={'#000000'}
                        onChangeText={handleChange('mobile')}
                        onBlur={handleBlur('mobile')}
                        value={values.mobile}
                      />
                    </View>
                  </View>
                  <View style={styles.error}>
                    {errors.mobile && touched.mobile && (
                      <Text style={styles.warn}>{errors.mobile}</Text>
                    )}
                  </View>

                  <View style={{ marginTop: 25, alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      style={styles.btn}>
                      <Text style={styles.save}>Save Changes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </ScrollView>
          </ImageBackground>
          <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
      )}
    </Formik>
  )
}
export default EditProfile;