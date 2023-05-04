import { View, Text, Image, Platform, TouchableOpacity, ImageBackground } from 'react-native';
import React,{useState,useEffect} from 'react';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import Back from "../../../assets/Svg/back1.svg";
import OtpInputs from "react-native-otp-inputs";
import Toast from "react-native-simple-toast";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

const Otp = ({route}) => {
    const navigation = useNavigation()
    const [code,setCode]=useState('')


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
    console.log(route.params.otp);
    const verifyOtp=()=>{
        if(code==''){
            Toast.show('Please enter otp')
        }
    else{
       if(code==route.params.otp){
        navigation.navigate('Change',{customer_id:route.params.customer_id})
       }
       else{
           Toast.show('Please enter correct otp')
       }
    }

    }
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1 }}
                source={require('../../../assets/Icon/bg.png')}>
                <View style={{ padding: 8 }}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 8, paddingVertical: 5 }}
                            onPress={() => navigation.goBack()}>
                            <Back />
                        </TouchableOpacity>
                        <Text style={styles.verify}>Verify Your Email</Text>
                        <View style={{width:15}}/>
                    </View>
                    <View style={styles.please}>
                        <Text style={styles.enter}>Please Enter The 4 Digit Code Sent To</Text>
                    </View>
                    <View style={{ paddingHorizontal: 45, marginTop: 12 }}>
                        <View style={styles.inputContainer}>
                            <OtpInputs
                                handleChange={code => setCode(code)}
                                numberOfInputs={4}
                                defaultValue={''}
                                autofillFromClipboard={true}
                                keyboardType={'numeric'}
                                style={styles.all}
                                //value={}
                                inputContainerStyles={[styles.otp]}
                                inputStyles={styles.box}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.code}>
                        <Text style={styles.resend}>Resend Code</Text>
                        <View style={{borderWidth:0.6,}}/>
                    </View> */}
                    <View style={{alignItems: 'center',marginTop:30 }}>
                      <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                        <Text style={styles.resend}>Resend Code</Text>
                        <View style={{borderWidth:0.6,borderColor:'#000000'}}/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            onPress={() => verifyOtp()}
                            style={styles.touch}>
                            <Text style={styles.text}>Verify</Text>
                        </TouchableOpacity>
                    </View>

                    <View>

                    </View>
                </View>
            </ImageBackground>
        </View>
    )

}
export default Otp;