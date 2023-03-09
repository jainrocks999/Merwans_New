import { View, Text, StatusBar, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React,{useEffect} from 'react';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import Back from "../../../assets/Svg/back.svg";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector,useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";
const loginValidationSchema = yup.object().shape({
    email: yup.string().required('Please enter your email address'),
  });

const ForgotScreen = () => {
    const navigation = useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)

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
    const validateUser = (values) => {
        dispatch({
          type: 'Reset_Pass_Request',
          url: 'api/resetPassword',
          email: values.email,
          navigation: navigation
        });
    }
    return (
        <Formik
        initialValues={{ email: '' }}
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
            {isFetching?<Loader/>:null}
            <ImageBackground style={{ flex: 1 }}
                source={require('../../../assets/Icon/bg.png')}>
                <View style={{ padding: 8 }}>

                    <View style={[styles.container]}>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={() => navigation.goBack()}>
                            <Back />
                        </TouchableOpacity>
                        <Text style={styles.reset}>Reset Password</Text>
                        <View style={{width:15}}/>
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.please}>Please Enter Your Email Address To Receive A Verification Code</Text>
                    </View>
                    <View style={styles.padding}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Email '
                                style={styles.input}
                                placeholderTextColor={'#000'}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                maxLength={40}
                                returnKeyType="next"
                                keyboardType='email-address'
                            />
                        </View>
                        <View style={styles.error}>
                      {errors.email && touched.email && (
                        <Text style={styles.warn}>{errors.email}</Text>
                      )}
                    </View>
                    </View>
                    <View style={styles.get}>
                        <TouchableOpacity
                            onPress={() => handleSubmit()}
                            style={styles.send}>
                            <Text style={styles.prob}>Send</Text>
                        </TouchableOpacity>
                    </View>

                    <View>

                    </View>
                </View>
            </ImageBackground>
            <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
        </View>
          )}
          </Formik>
    )

}
export default ForgotScreen;