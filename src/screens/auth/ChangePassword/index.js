import { View,Text,Image, TextInput, TouchableOpacity,ImageBackground ,BackHandler} from 'react-native';
import React,{useEffect} from 'react';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import Back from "../../../assets/Svg/back.svg";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch,useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

const loginValidationSchema = yup.object().shape({
    password: yup
      .string()
      .min(4, ({ min }) => `Password must be minimum 4 digits`)
      .required('Please enter your password'),
    confirmPassword: yup.string()
      .when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref('password')], 'Both password need to be the same'),
      })
      .required('Please enter confirm password'),
  });
const ForgotScreen=({route})=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)

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

    const validateUser =(values) => {
      dispatch({
        type: 'Change_Pass_Request',
        url: 'api/changePassword',
        password: values.password,
        customer_id:route.params.customer_id,
        navigation: navigation
      });
    }

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }, []);

    const handleBackButtonClick = () => {
      if (navigation.isFocused()) {
        navigation.navigate('Login');
        return true;
      }
    };
    return(
        <Formik
      initialValues={{ password: '', confirmPassword: '' }}
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
        <View style={{flex:1}}>
          {isFetching?<Loader/>:null}
             <ImageBackground style={{flex:1}} source={require('../../../assets/Icon/bg.png')}>
            <View style={{padding:8}}>
           
            <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#ED1B1A',fontFamily:'Montserrat-Bold',fontSize:22,}}>Create New Password</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',marginTop:200}}>
            <Text style={{fontSize:13,color:'#000000',fontFamily:'Montserrat-Medium'}}>Create New Password</Text>
            </View>
            <View style={{paddingHorizontal:45,marginTop:15}}>
                <View style={styles.inputContainer}>
                  <TextInput
                  placeholder='New Password '
                  style={{fontFamily:'Montserrat-Medium',includeFontPadding:false,padding: 0,margin:0,width:'100%'}}
                  placeholderTextColor={'#000'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  />
                </View>
                <View style={styles.error}>
                      {errors.password && touched.password && (
                        <Text style={styles.warn}>{errors.password}</Text>
                      )}
                    </View>
            </View>
            <View style={{paddingHorizontal:45,marginTop:15}}>
                <View style={styles.inputContainer}>
                  <TextInput
                  placeholder='Confirm Password '
                  style={{fontFamily:'Montserrat-Medium',includeFontPadding:false,padding: 0,margin:0,width:'100%'}}
                  placeholderTextColor={'#000'}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  />
                </View>
                <View style={styles.error}>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={styles.warn}>{errors.confirmPassword}</Text>
                      )}
                    </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:40}}>
            <TouchableOpacity 
                onPress={()=>handleSubmit()}
                style={{
                    width:180,
                    height:50,
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:'#ED1B1A',
                    borderRadius:2
                    }}>
                    <Text style={{fontSize:18,color:'#FFFFFF',fontFamily:'Montserrat-bold',}}>Save</Text>
                </TouchableOpacity>
            </View>
           
            <View>

            </View>
            </View>
            </ImageBackground>
        </View>
        )}
        </Formik>
    )

}
export default ForgotScreen;