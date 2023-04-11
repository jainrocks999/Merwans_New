import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView,StatusBar } from 'react-native';
import React, { useRef, useState,useEffect } from 'react';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../assets/Logo/logo.svg";
import Hide from "../../../assets/Svg/hide.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loader from "../../../components/Loader";
import Eye from "../../../assets/Svg/eye.svg";
import Geocoder from 'react-native-geocoding';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";
import Forward from '../../../assets/Svg/forward1.svg';
Geocoder.init("AIzaSyAEAzAu0Pi_HLLURabwR36YY9_aiFsKrsw");

const loginValidationSchema = yup.object().shape({
  value: yup.string().required('Please enter your Mobile No. or Email ID'),
  password: yup
    .string()
    .min(4, ({ min }) => `Password must be minimum 4 digits`)
    .required('Please enter your password'),
});
const LoginScreen = () => {
  const navigation = useNavigation()
  const next = useRef(null);
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.Auth.isFetching)
  const [visible,setVisible]=useState(true)

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
    if(isNaN(values.value)){
      dispatch({
        type: 'User_Login_Request',
        url: 'api/login',
        email: values.value,
        password: values.password,
        navigation: navigation
      });
    }
    else{
      dispatch({
        type: 'User_Login_Request',
        url: 'api/login',
        mobile: values.value,
        password: values.password,
        navigation: navigation
      });
    }
    dispatch({
      type: 'Home_Data_Request',
      url: 'home/mobileview',
  });
  }

  const showVisible = () => {
    return (
      <View>
        {!visible ? (
          <TouchableOpacity onPress={() => setVisible(true)}>
           <Eye width={28} height={26} />
           </TouchableOpacity>
        ) : ( 
          <TouchableOpacity onPress={() => setVisible(false)}>
          <Hide width={32} height={30}/>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  Geocoder.from("Indore,kushwash nagar")
  .then(json => {
    var location = json.results[0].geometry.location;
  })
  .catch(error => console.warn(error));

  const renderError = (values, errors, touched) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const reg1 = /^[0]?[6-9]\d{9}$/;
    if (values.value) {
      if (isNaN(values.value)) {
        if (reg.test(values.value) === false)
          return (
            <View style={styles.error}>
              {touched.value && (
                <Text style={styles.warn}>{'Please enter valid email'}</Text>
              )}
            </View>
          );
      } else {
        if (reg1.test(values.value) === false) {
          return (
            <View style={styles.error}>
              {touched.value && (
                <Text style={styles.warn}>
                  {'Please enter valid mobile number'}
                </Text>
              )}
            </View>
          );
        }
      }
    } else {
      return (
        <View style={styles.error}>
          {errors.value && touched.value && (
            <Text style={styles.warn}>{errors.value}</Text>
          )}
        </View>
      );
    }
  };

  return (
    <Formik
      initialValues={{ value: '', password: '' }}
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
                  <View style={styles.cont}>
                  <Logo height={100} width={100}/>
                  {/* <TouchableOpacity
                  
                   style={{flexDirection:'row',justifyContent:'center',}}>
                  <Text style={{fontSize:16,marginRight:5,color:'#ED1B1A',fontFamily:'Montserrat-SemiBold'}}>Skip</Text>
                  <View style={{flexDirection:'row',marginTop:3}}>
                  <Forward width ={10} height={16}/>
                  <Forward width ={10} height={16}/>
                  </View>
                  </TouchableOpacity> */}

                  </View>
                  <View style={styles.headerCont}>
                    <Text style={styles.login}>Login</Text>
                  </View>
                  <View style={{ paddingHorizontal: 45, marginTop: 20 }}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder='Mobile No. or Email ID'
                        placeholderTextColor={'#000000'}
                        onChangeText={handleChange('value')}
                        onBlur={handleBlur('value')}
                        value={values.value}
                        maxLength={40}
                        returnKeyType="next"
                      />
                    </View>
                    {/* <View style={styles.error}>
                      {errors.value && touched.value && (
                        <Text style={styles.warn}>{errors.value}</Text>
                      )}
                    </View> */}
                     {renderError(values, errors, touched)}
                    <View style={[styles.inputContainer, { marginTop: 12 }]}>
                      <View style={styles.password}>
                        <TextInput
                          style={styles.pass}
                          placeholder='Password  '
                          placeholderTextColor={'#000000'}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          maxLength={40}
                          returnKeyType="done"
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
                    <View style={{ marginTop: 6, alignItems: 'baseline' }}>
                      <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                        <Text style={[styles.forgot]}>Forgot Password</Text>
                        <View style={{borderWidth:0.5,borderColor:'#146678'}}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.row,{marginTop:40}]}>
                    <TouchableOpacity
                       onPress={() => handleSubmit()}
                      style={styles.log}>
                      <Text style={styles.text}>Log In</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.row,{marginTop:20}]}>
                  <Text style={{fontFamily:'Montserrat-SemiBold',color:'#000'}}>OR</Text>
                  </View>
                  <View style={[styles.row,{marginTop:10}]}>
                    <TouchableOpacity
                       onPress={()=>navigation.reset({
                        index: 0,
                        routes: [{ name: "Main" }],
                    })}
                      style={{borderBottomColor:'#ED1B1A',borderBottomWidth:2}}
                      >
                      <Text style={styles.text4}>Skip to continue</Text>
                    </TouchableOpacity>
                  </View>

                  <View>

                  </View>
                </View>
              </KeyboardAwareScrollView>
            </ScrollView>
            <View style={styles.bottom}>
              <View style={styles.view}>
                <View>
                  <Text style={styles.have}>Don't have an Account? </Text>
                </View>
                <View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                     <Text style={[styles.here]}>Click here</Text>
                  <View style={{borderBottomWidth:1,borderColor:'#000000',}}/>
                </TouchableOpacity>
              </View>


            </View>

          </ImageBackground>
          <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
        </View>
      )}
    </Formik>
  )

}
export default LoginScreen;

const data = [
  { label: 'Male', value: '1' },
  { label: 'Female', value: '2' },
  { label: 'Others', value: '3' },
];