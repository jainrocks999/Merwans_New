import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';
import HomeScreen from '../screens/main/HomeScreen';
import ChangePassword from '../screens/auth/ChangePassword';
import Category from "../screens/main/Category"
import CategoryList from "../screens/main/CategoryList"
import PaymentPage from '../screens/main/PaymentPage';
import ProfileWithoutLogin from '../screens/main/ProfileWithoutLogin';
import ProfileWithLogin from '../screens/main/ProfileWithLogin';
import MyAccountPage from '../screens/main/MyAccountPage';
import EditProfile from '../screens/main/EditProfile';
import MyOrders from "../screens/main/MyOrders";
import OrderDetail from "../screens/main/OrderDetail";
import MyAddress from "../screens/main/MyAddress";
import ChangeAddress from '../screens/main/ChangeAddress';
import AddressForm from '../screens/main/AddressForm';
import OnlineOrderingHelp from '../screens/main/OnlineOrderingHelp';
import Search from "../screens/main/Search";
import SecondSearch from "../screens/main/SecondSearch"
import ManagePayment from "../screens/main/ManagePayment";
import QuickCheckout from '../screens/main/QuickCheckout';
import Coupon from "../screens/main/Coupon";
import Otp from "../screens/auth/OtpPage"
import Modal from "../screens/main/LocationModal";
import Address from "../screens/main/AddressModal";
import Main from "./DrawerNavigation";
import About from "../screens/main/About";
import Favorite from "../screens/main/Favorite";
import Privacy from "../screens/main/Privacy";
import Term from "../screens/main/TermCondition";
import Whishlist from "../screens/main/Whishlist";
import EditAddress from "../screens/main/EditAddress";
const Stack = createNativeStackNavigator();
function Navigate() {

  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator  
      screenOptions={{
        headerShown: false
        }} 
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegistrationScreen}/>
        <Stack.Screen name="Forgot" component={ForgotPassword}/>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Change" component={ChangePassword}/>
        <Stack.Screen name="Category" component={Category}/>
        <Stack.Screen name="CategoryList" component={CategoryList}/>
        <Stack.Group screenOptions={{ headerShown:false }}>
        <Stack.Screen name="Payment" component={PaymentPage}/>
        </Stack.Group>
        <Stack.Screen name="ProfileWithoutLogin" component={ProfileWithoutLogin}/>
        <Stack.Screen name="ProfileWithLogin" component={ProfileWithLogin}/>
        <Stack.Screen name="MyAccountPage" component={MyAccountPage}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="MyOrders" component={MyOrders}/>
        <Stack.Screen name="OrderDetail" component={OrderDetail}/>
        <Stack.Screen name="MyAddress" component={MyAddress}/>
        <Stack.Screen name="ChangeAddress" component={ChangeAddress}/>
        <Stack.Screen name="AddressForm" component={AddressForm}/>
        <Stack.Screen name="OnlineOrderingHelp" component={OnlineOrderingHelp}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="SecondSearch" component={SecondSearch} options={horizontalAnimation}/>
        <Stack.Screen name="ManagePayment" component={ManagePayment}/>
        <Stack.Screen name="Quick" component={QuickCheckout}/>
        <Stack.Screen name="Coupon" component={Coupon}/>
        <Stack.Screen name="Whish" component={Whishlist}/>
        <Stack.Screen name={"Otp"} component={Otp}/>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name={'MyModal'} component={Modal}/>
        <Stack.Screen name={'Address'} component={Address}/>
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
       
        </Stack.Group>
        <Stack.Screen name={"About"} component={About}/>
        <Stack.Screen name={"Favorite"} component={Favorite}/>
        <Stack.Screen name={"Privacy"} component={Privacy}/>
        <Stack.Screen name={"Term"} component={Term}/>
        <Stack.Screen name={"EditAddress"} component={EditAddress}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigate;
