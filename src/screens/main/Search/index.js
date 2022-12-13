import React from "react";
import { View,Text,Image,StyleSheet,ImageBackground,FlatList } from 'react-native';
import styles from "./style";
import BottomTab from "../../../components/BottomTab";
const Search=()=>{
    return(
        <View style={{flex:1}}>
          <ImageBackground style={{flex:1}} source={require('../../../assets/Icon/bg.png')}>
            <View style={{paddingHorizontal:7}}>
                <View style={{marginTop:15,paddingHorizontal:7}}>
                    <View style={styles.container}>
                    <Image source={require('../../../assets/Icon/search.png')} />
                    <Text style={styles.search}>Search for Cakes,Pasties,Cookies etc.</Text>
                    </View>
                </View>
                <View style={{marginTop:10,}}>
                    <Text style={{color:'#000000',fontFamily:'Montserrat-SemiBold'}}>Recent Searches</Text>
                    <FlatList
                        data={data}
                        horizontal={true}
                        style={{width:'100%'}}
                        renderItem={({item})=>(
                            <View style={{flexDirection:'row',padding:10}}>
                            <View style={{
                                backgroundColor:'#F4F4F4',
                                paddingHorizontal:13,
                                paddingVertical:6,
                                borderRadius:6,
                                alignItems:'center'
                                }}>
                                <Text>{item.title}</Text>
                            </View>
                            </View>
                        )}
                    />
                </View>
                <View style={{marginTop:10,}}>
                    <Text 
                    style={{
                        color:'#000000',
                        fontFamily:'Montserrat-SemiBold'}}>Recommended For You</Text>
                    <FlatList
                        data={data1}
                        style={{width:'100%'}}
                        renderItem={({item})=>(
                            <View style={{
                                flexDirection:'row',
                                marginTop:19,
                                backgroundColor:'#F4F4F4',
                                justifyContent:'space-between',
                                alignItems:'center'
                                }}>
                            <View>
                                <Image source={item.image}/>
                            </View>
                            <View style={{width:'50%'}}>
                                <Text style={{fontFamily:'Montserrat-SemiBold',color:'#000000',fontSize:13}}>{item.title}</Text>
                                <Text style={{fontSize:9,fontFamily:'Montserrat-Regular',color:'#333333',marginTop:3}}>{item.desc}</Text>
                                <View style={{
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                    marginTop:4,
                                    paddingRight:12
                                    }}>
                                    <Text style={{color:'#000000',fontFamily:'Montserrat-Medium',fontSize:11}}>{'₹110.00'}</Text>
                                    <Image source={require('../../../assets/Icon/redHeart.png')}/>
                                </View>
                            </View>
                            </View>
                        )}
                    />
                    
                </View>
               
            </View>
           
          </ImageBackground>
          <View>
              <BottomTab/>
          </View>
        </View>
    )
}
export default Search;

const data=[
    {title:'Pineapple cake'},
    {title:'Cookies'},
    {title:'Rolls'},
    {title:'Strawberry cake'},
    // {title:''},
    // {title:''},
]

const data1=[
    {
        image:require('../../../assets/Logo/group.png'),
        title:'Blueberry Cheese Cake',
        desc:'Blueberries all the way! This sinfully rich smooth cheesecake made with finest cream cheese, smothered on with a glossy blueberry compote is a crowd pleaser.',
        
    },
    {
        image:require('../../../assets/Logo/group.png'),
        title:'Blueberry Cheese Cake',
        desc:'Blueberries all the way! This sinfully rich smooth cheesecake made with finest cream cheese, smothered on with a glossy blueberry compote is a crowd pleaser.',
        
    },
    {
        image:require('../../../assets/Logo/group.png'),
        title:'Blueberry Cheese Cake',
        desc:'Blueberries all the way! This sinfully rich smooth cheesecake made with finest cream cheese, smothered on with a glossy blueberry compote is a crowd pleaser.',
        
    }
]