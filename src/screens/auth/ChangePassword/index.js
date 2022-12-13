import { View,Text,Image, TextInput, TouchableOpacity,ImageBackground } from 'react-native';
import React from 'react';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import Back from "../../../assets/Svg/back.svg";

const ForgotScreen=()=>{
    const navigation=useNavigation()
    return(
        <View style={{flex:1}}>
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
        
                  />
                </View>
            </View>
            <View style={{paddingHorizontal:45,marginTop:15}}>
                <View style={styles.inputContainer}>
                  <TextInput
                  placeholder='Confirm Password '
                  style={{fontFamily:'Montserrat-Medium',includeFontPadding:false,padding: 0,margin:0,width:'100%'}}
                  placeholderTextColor={'#000'}
                 
                  />
                </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:40}}>
            <TouchableOpacity 
                // onPress={()=>navigation.navigate('Otp')}
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
    )

}
export default ForgotScreen;