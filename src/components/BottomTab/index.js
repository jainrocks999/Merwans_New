import React,{useState,useEffect} from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import Home from "../../assets/Svg/home.svg";
import Search from "../../assets/Svg/search.svg";
import Shopping from "../../assets/Svg/shopping-bag.svg";
import User from "../../assets/Svg/user.svg";
import Storage from "../../components/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loader from "../../components/Loader";

const BottomTab = ({home,search,cart,profile}) => {
  const navigation = useNavigation();
  const [data1,setData]=useState('')
  const handlePress=()=>{
    navigation.navigate('Home');
  }
  const handlePress1=()=>{
    navigation.navigate('SecondSearch');
  }
  const handlePress2=async()=>{
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    if(customer_id){
      navigation.navigate('Payment')
    }
    else{
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
    })
    }
  }
  const handlePress3=()=>{
    
    navigation.navigate('ProfileWithLogin');
  }

  useEffect(()=>{
     firstCall()
    
  })
  const firstCall=async()=>{
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    if(customer_id){
    try {
      const data1 = new FormData();
      data1.append('api_token', '');
      data1.append('customer_id', customer_id);
      const response = await axios({
          method: 'POST',
          data:data1,
          headers: {
              'content-type': 'multipart/form-data',
              Accept: 'multipart/form-data',
          },
          url: 'https://merwans.co.in/index.php?route=api/apiorder/cart',
      });

      if (response.data) {
          setData(response.data)
      }
      else {
      }
  } catch (error) {
     
  }
}

  }
  const renderHome = () => {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:home==true?'#808080':'#232323',borderRadius:20,padding:3}}>
          <Home height={22} width={22}/>
        </View>
        <Text style={[styles.text, {marginTop: 0}]}>{'Home'}</Text>
      </View>
    );
  };

  const renderBank = () => {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:search==true?'#808080':'#232323',borderRadius:20,padding:6}}>
         <Search height={16} width={16}/>
        </View>
        <Text style={[styles.text]}>{'Search'}</Text>
      </View>
    );
  };
  const renderKnowledge = () => {
    return (
      <View style={styles.container}>
        
        <View style={{backgroundColor:cart==true?'#808080':'#232323',borderRadius:20,padding:6}}>
           <Shopping height={16} width={16}/>
           
           {/* <Text style={{fontSize:10, color: '#ED1B1A', marginTop:-20,backgroundColor:'#fff'}}>{data1.products.length}</Text> */}

        </View>
        <Text style={styles.text}>{'Cart'}</Text>
        {/* <View> */}
       {data1 && data1.products? <View style={{
          position:'absolute',
          right:-5,top:0,
          backgroundColor:'#fff',
          borderRadius:8,padding:2,
          width:16,height:16,
          alignItems:'center',
          justifyContent:'center'
          }}>
        <Text style={{fontSize:10, color: '#ED1B1A', }}>{data1.products.length}</Text>
        </View>:null}
        {/* </View> */}
      </View>
    );
  };
  const renderTrending = () => {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:profile==true?'#808080':'#232323',borderRadius:20,padding:3}}>

           <User height={22} width={22}/>
        </View>
        <Text style={styles.text}>{'Profile'}</Text>
      </View>
    );
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => navigation.navigate('Home')}>
        {renderHome()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => handlePress1()}>
        {renderBank()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => handlePress2()}>
        {renderKnowledge()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => handlePress3()}>
        {renderTrending()}
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;
