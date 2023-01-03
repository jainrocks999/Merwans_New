import React,{Fragment} from 'react';
import { View, Text,SafeAreaView ,LogBox,StatusBar,YellowBox,} from 'react-native';
import Navigation from './src/navigation/index';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import { NativeBaseProvider, Box ,} from "native-base";
import {enableLatestRenderer} from 'react-native-maps';

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