import React from "react";
import { View,Text,Image,ImageBackground,ScrollView } from "react-native";
import styles from "./style";
import BottomTab from "../../../components/BottomTab";

const ManagePayment=()=>{
    return(
        <View style={{flex:1}}>

            <ImageBackground 
            style={{
                flex:1,
                paddingVertical:7,
                paddingHorizontal:10
                }} source={require('../../../assets/Icon/bg.png')}>
              <ScrollView>
              <View >
                  <Image source={require('../../../assets/Icon/arrow.png')}/>
              </View>
              <View style={{alignItems:'center'}}>
                  <Text style={{color:'#ED1717',fontFamily:'Montserrat-Bold',fontSize:22}}>Manage Payment Methods</Text>
              </View>
              <View 
              style={[styles.card,{marginTop:10}]}>
                  <Text 
                  style={styles.text}>Cards</Text>
                      <View style={styles.card1}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                           <View style={styles.view}>
                             <Image source={require('../../../assets/Icon/credit-card.png')}/>
                           </View>
                           <Text style={{marginLeft:10,fontFamily:'Montserrat-SemiBold',color:'#333333',fontSize:16}}>{'Add Credit & Debit Card'}</Text>
                         </View>
                         
                         <Image source={require('../../../assets/Icon/go.png')}/>
                      </View>
              </View>
              {/* UPI */}
              <View 
              style={[styles.card,{marginTop:20}]}>
                  <Text 
                  style={styles.text}>UPI</Text>
                      <View style={styles.card1}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                           <View style={styles.view}>
                             <Image source={require('../../../assets/Icon/upi.png')}/>
                           </View>
                           <View style={{marginLeft:10,}}>
                           <Text style={{fontFamily:'Montserrat-SemiBold',color:'#333333',fontSize:16}}>{'Pay Via Upi'}</Text>
                           <Text style={{fontSize:13,color:'#000000',fontFamily:'Montserrat-Medium',marginTop:2}}>{'You need to have a registered UPI ID'}</Text>
                           </View>
                         </View>
                         
                         <Image source={require('../../../assets/Icon/go.png')}/>
                      </View>
              </View>
              {/* Wallets */}
              <View 
              style={[styles.card,{marginTop:20}]}>
                  <Text 
                  style={styles.text}>Wallets</Text>
                      <View style={[styles.card1,{}]}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                           <View style={styles.view}>
                             <Image source={require('../../../assets/Icon/paytm.png')}/>
                           </View>
                           <View style={{marginLeft:10,}}>
                           <Text style={{fontFamily:'Montserrat-SemiBold',color:'#333333',fontSize:16}}>{'Paytm'}</Text>
                           <Text style={{fontSize:13,color:'#000000',fontFamily:'Montserrat-Medium',marginTop:2}}>{'Link your Paytm wallet'}</Text>
                           </View>
                         </View>
                         
                         <Image source={require('../../../assets/Icon/go.png')}/>
                      </View>

                      <View style={styles.card1}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                           <View style={styles.view}>
                             <Image source={require('../../../assets/Icon/mobi.png')}/>
                           </View>
                           <View style={{marginLeft:10,}}>
                           <Text style={{fontFamily:'Montserrat-SemiBold',color:'#333333',fontSize:16}}>{'Mobikwik'}</Text>
                           <Text style={{fontSize:13,color:'#000000',fontFamily:'Montserrat-Medium',marginTop:2}}>{'Link your Mobikwik wallet'}</Text>
                           </View>
                         </View>
                         
                         <Image source={require('../../../assets/Icon/go.png')}/>
                      </View>

                      <View style={styles.card1}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                           <View style={styles.view}>
                             <Image source={require('../../../assets/Icon/free.png')}/>
                           </View>
                           <View style={{marginLeft:10,}}>
                           <Text style={{fontFamily:'Montserrat-SemiBold',color:'#333333',fontSize:16}}>{'Freecharge'}</Text>
                           <Text style={{fontSize:13,color:'#000000',fontFamily:'Montserrat-Medium',marginTop:2}}>{'Link your Freecharge wallet'}</Text>
                           </View>
                         </View>
                         
                         <Image source={require('../../../assets/Icon/go.png')}/>
                      </View>
              </View>
              {/* Net Banking */}
              <View 
              style={[styles.card,{marginTop:20}]}>
                  <Text 
                  style={styles.text}>Netbanking</Text>
                      <View style={styles.card1}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                           <View style={styles.view}>
                             <Image source={require('../../../assets/Icon/net.png')}/>
                           </View>
                           <View style={{marginLeft:10,}}>
                           <Text style={{fontFamily:'Montserrat-SemiBold',color:'#333333',fontSize:16}}>{'Netbanking'}</Text>
                           {/* <Text style={{fontSize:13,color:'#000000',fontFamily:'Montserrat-Medium'}}>{'You need to have a registered UPI ID'}</Text> */}
                           </View>
                         </View>
                         
                         <Image source={require('../../../assets/Icon/go.png')}/>
                      </View>
              </View>
              <View style={{height:30}}/>
              </ScrollView>
              
            </ImageBackground>
            <View>
                  <BottomTab/>
              </View>
        </View>
    )
}
export default ManagePayment;