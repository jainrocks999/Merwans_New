import { takeEvery, put, call, take } from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../components/AsyncStorage';

function* categoryList(action) {
  try {
    const data = new FormData();
    data.append('category_id', action.category_id);
    data.append('store_id', action.store_id);
    data.append('customer_id', action.customer_id);
    data.append('product_id', action.product_id ? action.product_id : '');
    const response = yield call(Api.fetchDataByPOST, action.url, data);

    if (response.status == true) {
      yield put({
        type: 'Category_List_Success',
        payload: response.products,
        payload1: response.category,
      });
      // Toast.show(response.message);
      if (response.products.length > 0) {
        action.navigation.navigate('CategoryList');

      }
    } else {
      // Toast.show(response.message);

      yield put({
        type: 'Category_List_Error',
      });
    }
  } catch (error) {
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Category_List_Error',
    });
  }
}

export default function* itemSaga() {
  //   yield takeEvery('User_Login_Request',doLogin)
  //   yield takeEvery('User_Register_Request',doRegister)
  //   yield takeEvery('User_Logout_Request',logout)
  //   yield takeEvery('Edit_Profile_Request',editProfile)
  //   yield takeEvery('Address_List_Request',addressList)
  //   yield takeEvery('Get_Store_Request',getStore)
  yield takeEvery('Category_List_Request', categoryList);
  //   yield takeEvery('Menu_List_Request',getMenu)
  //   yield takeEvery('Add_Address_Request',addAddress)
  //   yield takeEvery('City_List_Request',cityList)
  //   yield takeEvery('Order_List_Request',orderList)
  //   yield takeEvery('Order_Detail_Request',orderDetail)
  //   yield takeEvery('Add_Item_Request',addItemToCart)
  //   yield takeEvery('Add_Item_Request1',addItemToCart1)
  //   yield takeEvery('Shipping_List_Request',shipping)
  //   yield takeEvery('Time_Drop_Request',timeDrop)
  //   yield takeEvery('Get_Address_Request',getAddress)
  //   yield takeEvery('Get_Address_Request1',getAddress1)
  //   yield takeEvery('Get_Address_Request2',getAddress2)
  //   yield takeEvery('Wish_List_Request',wishlist)
  //   yield takeEvery('Wish_Remove_Request',removewishlist)
  //   yield takeEvery('Add_Wish_Request',addWish)
  //   yield takeEvery('About_Us_Request',about)
  yield takeEvery('Privacy_Policy_Request', policy);
  yield takeEvery('Privacy_Policy_Request1', policy1);
  yield takeEvery('Term_Condition_Request', term);
  //   yield takeEvery('Reset_Pass_Request',resetPass)
  //   yield takeEvery('Change_Pass_Request',changePassword)
  //   yield takeEvery('Add_Lat_Request',addLat)
  //   yield takeEvery('Address_List_Req',addressListReq)
  //   yield takeEvery('Home_Data_Request',homeList)
  //   yield takeEvery('User_Detail_Request',userDetail)
  //   yield takeEvery('Order_Status_Request',orderStatus)
}
// navigation.navigate('Feedback')
// navigation.navigate('About')
