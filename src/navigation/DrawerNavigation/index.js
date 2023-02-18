import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerContent from '../../components/DrawerContent';
import HomeScreen from '../../screens/main/HomeScreen';
import PaymentPage from "../../screens/main/PaymentPage";
import ProfileWithLogin from "../../screens/main/ProfileWithLogin";
import QuickCheckout from "../../screens/main/QuickCheckout";
import Whishlist from "../../screens/main/Whishlist";
import SecondSearch from "../../screens/main/SecondSearch";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator
    // drawerStyle={{width:'100%'}}
    screenOptions={{headerShown:false}}
    drawerContent={() => <DrawerContent/>}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        {/* <Drawer.Screen name="Payment" component={PaymentPage}/> */}
        <Stack.Group screenOptions={{ headerShown:false }}>
        <Drawer.Screen name="ProfileWithLogin" component={ProfileWithLogin}/>
        </Stack.Group>
        {/* <Drawer.Screen name="Quick" component={QuickCheckout}/> */}
        <Drawer.Screen name="SecondSearch" component={SecondSearch}/>
    </Drawer.Navigator>
  );
}
export default MyDrawer;