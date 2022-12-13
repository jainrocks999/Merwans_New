import React from "react";
import { View,Text,ImageBackground,Image,TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const OnlineOrdering=()=>{
    return(
        <View style={{flex:1}}>
            <ImageBackground style={{padding:8}} source={require('../../../assets/Icon/bg.png')}>
               <Image source={require('../../../assets/Icon/arrow.png')}/>
               <Text 
               style={{
                   color:'#ED1B1A',
                   fontFamily:'Montserrat-Bold',
                   fontSize:20,
                   marginTop:10
                   }}>Merwans Interactive Assistant</Text>
                   <View style={{
                       backgroundColor:'#F4F4F4',
                       marginTop:10,
                       elevation:3,
                       paddingHorizontal:8,
                       paddingVertical:4
                }}>
                     <Text style={{color:'#000000',fontFamily:'Montserrat-SemiBold',fontSize:16}}>Merwans</Text>
                     <Text 
                     style={{
                         marginTop:6,
                         fontFamily:'Montserrat-Medium',
                         fontSize:13,
                         color:'#333333'
                         }}>Hi Abc,please select the order for whichyou seek the support.</Text>
                   </View>
                   <View>
                       <FlatList
                       data={data}
                       renderItem={({item})=>(
                           <View style={{marginTop:10}}>
                               <Text style={{
                                   color:'#000000',
                                   fontFamily:'Montserrat-SemiBBold',
                                   fontSize:16
                                   }}>Ordered From</Text>
                               <Text style={{
                                   color:'#333333',
                                   fontFamily:'Montserrat-Medium',
                                   fontSize:10
                                   }}>Merwans Bakers,Andheri West</Text>
                               <Text 
                               style={{
                                   color:'#000000',
                                   fontFamily:'Montserrat-Regular',
                                   fontSize:12,
                                   marginTop:8
                                   }}>Place on 23 oct 2022 at 7pm 1pc Black Forest cake and etc.</Text>
                               <View style={{
                                   backgroundColor:'#F4F4F4',
                                   paddingHorizontal:18,
                                   paddingVertical:5,
                                   alignItems:'center',
                                   justifyContent:'center',
                                   borderRadius:4,
                                   elevation:3,
                                   alignSelf:'flex-end'
                               }}>
                                   <Text>Delivered</Text>
                               </View>
                               <View style={{marginTop:2}}/>
                           </View>
                       )}
                       />
                       
                   </View>
            </ImageBackground>
            <View style={{marginTop:25,alignItems:'center'}}>
                    <TouchableOpacity style={{
                        paddingHorizontal:24,
                        alignItems:'center',
                        backgroundColor:'#ED1B1A',
                        height:50,
                        justifyContent:'center',
                        borderRadius:4
                        }}>
                        <Text style={{fontFamily:'Montserrat-Bold',color:'#fff',fontSize:17}}>Previous Orders</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}
export default OnlineOrdering;

const data=[
    {address:'Merwans Bakers,Andheri West',desc:'Place on 23 oct 2022 at 7pm 1pc Black Forest cake and etc.'},
    {address:'Merwans Bakers,Andheri West',desc:'Place on 23 oct 2022 at 7pm 1pc Black Forest cake and etc.'},
    {address:'Merwans Bakers,Andheri West',desc:'Place on 23 oct 2022 at 7pm 1pc Black Forest cake and etc.'}

]