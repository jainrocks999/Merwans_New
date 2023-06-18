import React,{useState,useEffect,useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import WebView from 'react-native-webview';
import Loader from "../../../components/Loader";
import { useNavigation } from '@react-navigation/native';
import Storage from '../../../components/AsyncStorage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

function WebViewPage ({route,}){

 const [visible,setVisible] = useState(true)
 const isDarkMode = useColorScheme() === 'dark';
 const [webview,setWebView] = useState(null);
 const webViewRef = useRef(null);
 const navigation=useNavigation()
 const dispatch=useDispatch()

 let params = {
    enc_val:route.params.data.encRequest,
    access_code:route.params.data.access_code,
    cancel_url:'https://merwans.co.in/ccavResponseHandler.php',
    redirect_url:'https://merwans.co.in/ccavResponseHandler.php',
    // order_id:route.params.response.order_id
  }
  const ActivityIndicatorElement = () => {
   return (
     <View style={styles.ActivityIndicatorStyle}>
       <Loader/>
     </View>
   );
 }

 function handleBackButtonClick(){
   Alert.alert(
       'Exit',
       'Do you really want to cancel this transaction?', [{
           text: 'Cancel',
           onPress: () => console.log('Cancel Pressed'),
           style: 'cancel'
       }, {
           text: 'OK',
           onPress: () => navigation.navigate('Home')
       },], {
       cancelable: false
   }
   )
   return true;
}

 useEffect(() => {
  BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
   const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
   return () => backHandler.remove();
 }, []);

  const onNavigationStateChange = async(navState) => {
    console.log('this is navstat',navState);
   if (navState.url === params.redirect_url || navState.url === params.cancel_url) {  
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    dispatch({
      type: 'Order_Status_Request',
      url: 'apiorder/orderStatus',
      customer_id: customer_id,
      order_id: route.params.order_id,
      navigation: navigation
    });
   }
 }
 const _onMessage = async(event) => {
   var getData = event.nativeEvent.data;
   console.log('this is geet data',getData);
    if(getData != null){
    }
  }
   const pucJavaScript = `
     var sourceCode = document.getElementsByName('encResp')[0].value;
     window.ReactNativeWebView.postMessage(sourceCode);
   //window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
      `;
 let web_url = route.params.data.action;
 let commamd = "initiateTransaction";
 let accces = params.access_code;

 const loadHtml =()=>{
   var html =
  `<html> <head><meta name='viewport' content='width=device-width, initial-scale=1.0'></head> <body onload='document.f.submit();'> <form id='f' name='f' action="${web_url}" method="post"
  id="ccavenuepay_standard_checkout" name="redirect">
  <input type="hidden" name="encRequest" id="encRequest" value="${params.enc_val}\" \/><input type="hidden" name="access_code" id="access_code" value="${accces}"/></form>`
   return html ;
 }
 const INJECTEDJAVASCRIPT = 'const meta = document.createElement(\'meta\'); meta.setAttribute(\'content\', \'width=device-width, initial-scale=1, maximum-scale=0.99, user-scalable=0\'); meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta); '

 
 return (
   <SafeAreaView style={{flex:1}}>
     <WebView
       automaticallyAdjustContentInsets={false}
       ref={webViewRef}
       source={{
         html:loadHtml()
       }}
       injectedJavaScript={INJECTEDJAVASCRIPT}
       injectedJavaScriptBeforeContentLoaded={pucJavaScript}
       scrollEnabled
       scalesPageToFit={false}
       originWhitelist={['*']}
       onMessage={_onMessage}
       javaScriptEnabled={true}
       cacheEnabled={true}
       allowFileAccessFromFileURLs={true}
       setSupportMultipleWindows={true}
       domStorageEnabled={true}
       allowUniversalAccessFromFileURLs={true}       
       onShouldStartLoadWithRequest={(request)=>{
         const {url} = request;
         if (url === params.redirect_url || url === params.cancel_url) {
           webViewRef.current.injectJavaScript(pucJavaScript);
         }
         return true;
       }}
       startInLoadingState={true}
       onNavigationStateChange={onNavigationStateChange}
       renderLoading={ActivityIndicatorElement}
       onLoad={() => setVisible(false)}
     />
     {visible ? <Loader/> : null}
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 ActivityIndicatorStyle: {
   flex: 1,
   position: 'absolute',
   marginLeft: 'auto',
   marginRight: 'auto',
   marginTop: 'auto',
   marginBottom: 'auto',
   left: 0,
   right: 0,
   top: 0,
   bottom: 0,
   justifyContent: 'center',

 },
})

export default WebViewPage;