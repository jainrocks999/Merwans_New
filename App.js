import React,{Fragment,useEffect,useState} from 'react';
import { View, Text,SafeAreaView ,LogBox,Alert} from 'react-native';
import Navigation from './src/navigation/index';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import { NativeBaseProvider, Box ,} from "native-base";
import {enableLatestRenderer} from 'react-native-maps';
import FlashMessage from 'react-native-flash-message';
import NetInfo from "@react-native-community/netinfo";
import Dialog, { DialogContent } from 'react-native-popup-dialog';

enableLatestRenderer();
const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(['Require cycle: node_modules/']);
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if(!state.isConnected){
         setIsModalVisible(true)
      }
      else if(state.isConnected){
        setIsModalVisible(false)
      }
    });
  },[])
   return (
    <Fragment>
    <SafeAreaView style={{backgroundColor:Platform.OS=='ios'?'#232323':'#fff'}}/> 
    <SafeAreaView style={{flex:1,backgroundColor:Platform.OS=='ios'?'#232323':'#fff'}}>
    <FlashMessage  
      //  icon={<Image resizeMode='contain' style={{height:20,width:20,tintColor:'#000'}} source={require('./src/assets/Icon/arrow.png')}/>}
       duration={3000} 
       style={{
       
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
        <Dialog
          visible={isModalVisible}
          dialogStyle={{
            backgroundColor: '#FFF',
            width: '86%',
            alignSelf: 'center',
            elevation: 5,
            borderRadius: 10
          }}
          // onTouchOutside={() => setIsModalVisible(false)}
          // onHardwareBackPress={() => setIsModalVisible(false)}
          >
          <DialogContent>
           <View style={{alignItems:'center',justifyContent:'center',height:80,marginTop:20}}>
        
             <Text style={{fontSize:16,fontFamily:'Montserrat-SemiBold'}}>Please connect to your internet</Text>
           </View>
          </DialogContent>
        </Dialog>
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