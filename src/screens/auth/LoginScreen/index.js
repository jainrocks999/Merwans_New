import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView,StatusBar } from 'react-native';
import React, { useRef, useState } from 'react';
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

const loginValidationSchema = yup.object().shape({
  email: yup.string().required('Please enter your email address'),
  password: yup
    .string()
    .min(4, ({ min }) => `Password must be minimum 4 digits`)
    .required('Please enter your password'),
});
const LoginScreen = () => {
  const navigation = useNavigation()
  const next = useRef(null);
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching)
  const [visible,setVisible]=useState(true)

  

  const validateUser = (values) => {
    dispatch({
      type: 'User_Login_Request',
      url: 'api/login',
      email: values.email,
      password: values.password,
      navigation: navigation
    });
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
          <Hide width={32} height={30}/>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
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
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        maxLength={40}
                        returnKeyType="next"
                      />

                    </View>
                    <View style={styles.error}>
                      {errors.email && touched.email && (
                        <Text style={styles.warn}>{errors.email}</Text>
                      )}
                    </View>
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
                  <View style={styles.row}>
                    <TouchableOpacity
                       onPress={() => handleSubmit()}
                      // onPress={() => navigation.navigate('Main')}
                      style={styles.log}>
                      <Text style={styles.text}>Log In</Text>
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
                  <View style={{borderWidth:0.5,borderColor:'#000000'}}/>
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