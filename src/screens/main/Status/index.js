import React,{useEffect} from "react";
import { View,Image,Text,BackHandler, Alert } from "react-native";
import Storage from "../../../components/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

const Status=({route})=>{
const navigation=useNavigation()
const dispatch=useDispatch()
useEffect(() => {
    NetInfo.addEventListener(state => {
      if(!state.isConnected){
      showMessage({
        message:'Please connect to your internet',
        type:'danger',
      });
      }
    });
  },[])

useEffect(()=>{
    firstCall()
},[0])

useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress',handleBackButtonClick);
     const backHandler = BackHandler.addEventListener("hardwareBackPress",handleBackButtonClick);
     return () => backHandler.remove();
   }, []);

 const  handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
};

const firstCall=async()=>{
    const customer_id = await AsyncStorage.getItem(Storage.customer_id)
    setTimeout(() => {
        dispatch({
            type: 'Order_List_Request',
            url: 'apiorder',
            customer_id: customer_id,
            route:'Status',
            navigation: navigation
          });
    }, 5000);
}
    return(
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{flex:1,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
            <Image style={{height:100,width:100}} source={require('../../../assets/Icon/right.jpg')}/>
             <Text style={{color:'#232323',fontFamily:'Montserrat-Bold',fontSize:24}}>Thankyou for ordering!</Text>
             <Text style={{color:'#232323',fontFamily:'Montserrat-SemiBold',fontSize:16,marginTop:5}}>{`Payment of ₹${parseInt(route.params.amount).toFixed(2)} successful `}</Text>
            </View>
        </View>
    )
}
export default Status;