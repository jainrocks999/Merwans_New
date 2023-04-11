import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground, ScrollView, StatusBar } from 'react-native';
import React, { useState,useEffect } from 'react';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../assets/Logo/logo.svg";
import Hide from "../../../assets/Svg/hide.svg";
import Eye from "../../../assets/Svg/eye.svg";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox, } from "native-base";
import Loader from "../../../components/Loader";
import Dialog, {DialogContent} from 'react-native-popup-dialog'
import HTMLView from "react-native-htmlview";
import Multi from "../../../assets/Svg/multi.svg";
import Toast from "react-native-simple-toast";
import CheckBox from '@react-native-community/checkbox';
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import Forward from "../../../assets/Svg/forward1.svg";
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
  password: yup
    .string()
    .min(4, ({ min }) => `Password must be minimum 4 digits`)
    .required('Please enter your password'),
  confirmPassword: yup.string()
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Both pin need to be the same'),
    })
    .required('Please enter confirm password'),
});

const RegistrationScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(true)
  const [visible1, setVisible1] = useState(true)
  const isFetching = useSelector(state => state.Auth.isFetching)
  const selector1 = useSelector(state => state.List.Policy1)
  const [showModal, setShowModal] = useState(false);
  const [policy,setPolicy]=useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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

  const validateUser = (values) => {
    if(toggleCheckBox){
    dispatch({
      type: 'User_Register_Request',
      url: 'api/register',
      fname: values.fname,
      lname: values.lname,
      mobile: values.mobile,
      email: values.email,
      password: values.password,
      navigation: navigation
    });
    dispatch({
      type: 'Home_Data_Request',
      url: 'home/mobileview',
  });
  }
  else{
    Toast.show('Please accept Privacy Policy');
  }
  }

  const showVisible = () => {
    return (
      <View
      >
        {!visible ? (
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Eye width={28} height={26} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Hide width={32} height={30} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const showVisible1 = () => {
    return (
      <View
      >
        {!visible1 ? (
          <TouchableOpacity onPress={() => setVisible1(true)}>
            <Eye width={28} height={26} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setVisible1(false)}>
            <Hide width={32} height={30} />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <Formik
      initialValues={{ fname: '', lname: '', email: '', mobile: '', password: '', confirmPassword: '' }}
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
          <ImageBackground style={{ flex: 1 }} source={require('../../../assets/Icon/bg.png')}>
            <ScrollView>
              <KeyboardAwareScrollView
                extraScrollHeight={10}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}>
                <View style={{ padding: 12 }}>
                  <View style={styles.container}>
                    <Logo height={100} width={100} />
                    
                  </View>
                  <View style={styles.header}>
                    <Text style={styles.register}>Registration</Text>
                  </View>
                  <View style={styles.cont}>
                    <View>
                      <Text style={styles.ready}>Already have an account? </Text>
                    </View>
                    <View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.here}>Login here</Text>
                      <View style={{borderBottomWidth:1,borderColor:'#000000',}}/>
                    </TouchableOpacity>
                  </View>
                  <View style={{ paddingHorizontal: 45, marginTop: 17 }}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder='First Name'
                        placeholderTextColor={'#000'}
                        onChangeText={handleChange('fname')}
                        onBlur={handleBlur('fname')}
                        value={values.fname}
                      />
                    </View>
                    <View style={styles.error}>
                      {errors.fname && touched.fname && (
                        <Text style={styles.warn}>{errors.fname}</Text>
                      )}
                    </View>
                    <View style={[styles.inputContainer, { marginTop: 12 }]}>
                      <View style={styles.row}>
                        <TextInput
                          style={styles.input}
                          placeholder='Last Name  '
                          placeholderTextColor={'#000'}
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
                    <View style={[styles.inputContainer, { marginTop: 12 }]}>
                      <View style={styles.row}>
                        <TextInput
                          style={styles.input}
                          placeholder='Email  '
                          placeholderTextColor={'#000'}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          keyboardType='email-address'
                        />
                      </View>
                    </View>
                    <View style={styles.error}>
                      {errors.email && touched.email && (
                        <Text style={styles.warn}>{errors.email}</Text>
                      )}
                    </View>
                    <View style={[styles.inputContainer, { marginTop: 12 }]}>
                      <View style={styles.row}>
                        <TextInput
                          style={styles.input}
                          placeholder='Mobile Number     '
                          placeholderTextColor={'#000'}
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
                    <View style={[styles.inputContainer, { marginTop: 12 }]}>
                      <View style={styles.row}>
                        <TextInput
                          style={styles.pass}
                          placeholder='Password   '
                          placeholderTextColor={'#000'}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          secureTextEntry={visible}
                        />
                        {showVisible()}
                      </View>
                    </View>
                    <View style={styles.error}>
                      {errors.password && touched.password && (
                        <Text style={styles.warn}>{errors.password}</Text>
                      )}
                    </View>
                    <View style={[styles.inputContainer, { marginTop: 12 }]}>
                      <View style={styles.row}>
                        <TextInput
                          style={styles.pass}
                          placeholder='Confirm Password     '
                          placeholderTextColor={'#000'}
                          onChangeText={handleChange('confirmPassword')}
                          onBlur={handleBlur('confirmPassword')}
                          value={values.confirmPassword}
                          secureTextEntry={visible1}
                        />
                        {showVisible1()}
                      </View>
                    </View>
                    <View style={styles.error}>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={styles.warn}>{errors.confirmPassword}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.space}>
                  <CheckBox
                      disabled={false}
                      value={toggleCheckBox}
                      onValueChange={newValue => setToggleCheckBox(newValue)}
                      tintColors={{true: '#ED1B1A', false: 'grey'}}
                      onTintColor='#ED1B1A'
                      onCheckColor='#ED1B1A'
                      boxType='square'
                      style={{height:16,width:18}}
                    />
                    <View style={styles.have}>
                      <Text style={styles.read}>{'I have read and agree to the '}
                      </Text>
                      <TouchableOpacity onPress={()=>setShowModal(true)}>
                      <Text style={styles.policy}>Privacy Policy</Text>
                      <View style={{borderBottomWidth:1,borderColor:'#000000',}}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.bView,{marginTop:30}]}>
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      style={styles.touch}>
                      <Text style={styles.sign}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.bView,{marginTop:20}]}>
                  <Text style={{fontFamily:'Montserrat-SemiBold',color:'#000'}}>OR</Text>
                  </View>
                  <View style={[styles.bView,{marginTop:10}]}>
                    <TouchableOpacity
                     onPress={()=>navigation.reset({
                      index: 0,
                      routes: [{ name: "Main" }],
                      })}
                      // style={styles.touch}
                      style={{borderBottomWidth:2,borderColor:'#ED1B1A',}}
                      >
                      <Text style={styles.sign1}>Skip to continue</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
              </KeyboardAwareScrollView>
            </ScrollView>
            <Dialog
            dialogStyle={{
              width: '95%',
              paddingHorizontal: 0,
              height: '90%',
              paddingTop: 10,
            }}
            visible={showModal}
            onHardwareBackPress={() => setShowModal(false)}>
            <DialogContent>
              <View style={{alignSelf: 'flex-end', padding: -20}}>
                <TouchableOpacity
                  delayPressIn={0}
                  onPress={() => setShowModal(false)}
                  style={styles.cross}>
                 <Multi/>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 30}}>
                  <HTMLView
                  // addLineBreaks
                    value={selector1
                      .trim()
                      .replace(new RegExp('<p>', 'g'), '<span>')}
                    addLineBreaks={false}
                  />
                </View>
              </ScrollView>
            </DialogContent>
          </Dialog>
            <View style={styles.bottom}>
            </View>
          </ImageBackground>
          <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
        </View>
      )}
    </Formik>
  )

}
export default RegistrationScreen;