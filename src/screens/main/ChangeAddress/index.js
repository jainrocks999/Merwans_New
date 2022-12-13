import React from "react";
import { View,Text,ImageBackground,Image,TouchableOpacity,StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Location from "../../../assets/Svg/location.svg";
import styles from "./style";
const ChangeAddress=()=>{

    const navigation=useNavigation()

    return(
      <View style={{flex:1}}>
          <ImageBackground source={require('../../../assets/Icon/bg.png')}>
             <View style={{borderWidth:1,height:200}}>

             </View>
             <View style={{paddingHorizontal:8,marginTop:8}}>
             <View style={styles.main}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={{marginTop:-5,marginLeft:3}}>
                                <Location/>
                                </View>
                                <View style={{marginLeft:6,marginTop:6}}>
                                    <Text style={styles.first}>{'1st Floor, 65, \nOld Oriented Bldg, M G Road,Mumbai'}</Text>
                                </View>
                            </View>
                            <View style={{marginTop:0,alignItems:'center'}}>
                            <TouchableOpacity
                            onPress={()=>navigation.navigate('ChangeAddress')}
                             style={{alignSelf:'flex-end',padding:6,borderRadius:15}}>
                                      <Text style={styles.change}>Change</Text>
                            </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.view}>
                            <TouchableOpacity
                             onPress={()=>navigation.navigate('AddressForm')}
                             style={styles.button}>
                                <Text style={styles.enter}>Enter Complete Address</Text>
                            </TouchableOpacity>
                        </View>
             </View>
          </ImageBackground>
          <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      </View>
    )
}
export default ChangeAddress;