import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../../components/DrawerContent';
import HomeScreen from '../../screens/main/HomeScreen';
import PaymentPage from "../../screens/main/PaymentPage";
import ProfileWithLogin from "../../screens/main/ProfileWithLogin";
import QuickCheckout from "../../screens/main/QuickCheckout";
import Whishlist from "../../screens/main/Whishlist";

const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator
    // drawerStyle={{width:'100%'}}
    screenOptions={{headerShown:false}}
    drawerContent={() => <DrawerContent/>}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Payment" component={PaymentPage}/>
        <Drawer.Screen name="ProfileWithLogin" component={ProfileWithLogin}/>
        <Drawer.Screen name="Quick" component={QuickCheckout}/>
        <Drawer.Screen name="Whish" component={Whishlist}/>
    </Drawer.Navigator>
  );

}
export default MyDrawer;