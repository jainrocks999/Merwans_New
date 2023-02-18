import React,{Fragment} from 'react';
import { View, Text,SafeAreaView ,LogBox,StatusBar,YellowBox,Image} from 'react-native';
import Navigation from './src/navigation/index';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import { NativeBaseProvider, Box ,} from "native-base";
import {enableLatestRenderer} from 'react-native-maps';
import FlashMessage from 'react-native-flash-message';

enableLatestRenderer();
const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(['Require cycle: node_modules/']);
   return (
    <Fragment>
    <SafeAreaView style={{backgroundColor:Platform.OS=='ios'?'#232323':'#fff'}}/> 
    <SafeAreaView style={{flex:1,backgroundColor:Platform.OS=='ios'?'#232323':'#fff'}}>
    <FlashMessage  
      //  icon={<Image resizeMode='contain' style={{height:20,width:20,tintColor:'#000'}} source={require('./src/assets/Icon/arrow.png')}/>}
       duration={3000} 
       style={{
        //  borderRadius:10,
        //  marginHorizontal:30,
        //  marginVertical:20,
        //  height:50,
         alignItems:'center',
         justifyContent:'center',
         backgroundColor:'#ED1B1A',
        //  borderWidth:2
         }}
        textStyle={{marginTop:20,height:40}}
        position={'bottom'}
        titleStyle={{fontSize:16,marginTop:15,color:'#fff'}}
          />
    <NativeBaseProvider>
        <Provider store={Store}>
        <Navigation/>
        </Provider>
        </NativeBaseProvider>
    </SafeAreaView>
    </Fragment>
      // <SafeAreaView style={{flex:1}}>
      //   <NativeBaseProvider>
      //   <Provider store={Store}>
      //   <Navigation/>
      //   </Provider>
      //   </NativeBaseProvider>
      //   {/* <Text>narendra</Text> */}
      // </SafeAreaView>

    
  )
}
export default App;