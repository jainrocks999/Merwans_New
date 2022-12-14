import {takeEvery, put, call, take} from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from "../../components/AsyncStorage";

//Login
function* doLogin(action) {
    try {
      const data = new FormData();
      data.append('email', action.email);
      data.append('mobile', action.mobile);
      data.append('password',action.password)
      const response = yield call(Api.fetchDataByPOST, action.url, data);
      if (response.status == true) {
        yield put({
          type: 'User_Login_Success',
          payload: response,
        });
        Toast.show(response.message);
        AsyncStorage.setItem(Storage.customer_id,response.customer_id)
        AsyncStorage.setItem(Storage.firstname,response.firstname)
        AsyncStorage.setItem(Storage.lastname,response.lastname)
        AsyncStorage.setItem(Storage.email,response.email)
        AsyncStorage.setItem(Storage.telephone,response.telephone)
        action.navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        })
      } else {
        Toast.show(response.message);
        yield put({
          type: 'User_Login_Error',
        });
      }
    } catch (error) {
      console.log('this is error message',error);
      yield put({
        type: 'User_Login_Error',
      });
    }
}

// Registration Api

function* doRegister(action) {
  try {
    const data = new FormData();
    data.append('firstname', action.fname);
    data.append('lastname',action.lname)
    data.append('telephone',action.mobile)
    data.append('email',action.email)
    data.append('password',action.password)
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is user res',response);
    if (response.status == true) {
      yield put({
        type: 'User_Register_Success',
        payload: response,
      });
      Toast.show(response.message);
      AsyncStorage.setItem(Storage.customer_id,response.customer_id)
      AsyncStorage.setItem(Storage.firstname,response.firstname)
      AsyncStorage.setItem(Storage.lastname,response.lastname)
      AsyncStorage.setItem(Storage.email,response.email)
      AsyncStorage.setItem(Storage.telephone,response.telephone)
      action.navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      })
    } else {
      Toast.show(response.message);
      yield put({
        type: 'User_Register_Error',
      });
    }
  } catch (error) {
    console.log('this is error message',error);
    yield put({
      type: 'User_Register_Error',
    });
  }
}

function* logout(action) {
  try {
    const data = new FormData();
    data.append('customer_id', action.customer_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'User_Logout_Success',
      });
      Toast.show(response.message);
      action.navigation.navigate('Login');
      AsyncStorage.setItem(Storage.customer_id,'');
      AsyncStorage.setItem(Storage.firstname,'')
      AsyncStorage.setItem(Storage.lastname,'')
      AsyncStorage.setItem(Storage.email,'')
      AsyncStorage.setItem(Storage.telephone,'')
    } else {
      Toast.show(response.message);
      yield put({
        type: 'User_Logout_Error',
      });
    }
  } catch (error) {
    console.log('this is error message',error);
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'User_Logout_Error',
    });
  }
}

function* editProfile(action) {
  try {
    const data = new FormData();
    data.append('firstname', action.firstname);
    data.append('lastname',action.lastname)
    data.append('telephone',action.telephone)
    data.append('email',action.email)
    data.append('customer_id',action.customer_id)
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('this is user res1',response);
    if (response.status == true) {
      yield put({
        type: 'Edit_Profile_Success',
        payload: response,
      });
      // Toast.show(response.message);
      AsyncStorage.setItem(Storage.firstname,response.user_data.firstname)
      AsyncStorage.setItem(Storage.lastname,response.user_data.lastname)
      AsyncStorage.setItem(Storage.email,response.user_data.email)
      AsyncStorage.setItem(Storage.telephone,response.user_data.telephone)
      console.log('this is respponse userdata',response.user_data);
      action.navigation.push('MyAccountPage')
    } else {
      // Toast.show(response.message);
      yield put({
        type: 'Edit_Profile_Error',
      });
    }
  } catch (error) {
    console.log('this is error message',error);
    yield put({
      type: 'Edit_Profile_Error',
    });
  }
}

function* addressList(action) {
  try {
    const data = new FormData();
    data.append('customer_id',action.customer_id);
    data.append('api_token','')
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('response block',response);
    if (response.status == true) {
      yield put({
        type: 'Address_List_Success',
        payload: response.addresses,
      });
      // Toast.show(response.message);
      if(action.from=='carts'){

      }
      else{
      action.navigation.navigate('MyAddress',{from:action.from});
      }
    } else {
      // Toast.show(response.message);
      console.log('else block');
      yield put({
        type: 'Address_List_Error',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Address_List_Error',
    });
  }
}

function* orderList(action) {
  try {
    const data = new FormData();
    data.append('customer_id',action.customer_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('response block',response);
    if (response.status == true) {
      yield put({
        type: 'Order_List_Success',
        payload: response.data,
      });
      // Toast.show(response.message);
      action.navigation.navigate('MyOrders');
    } else {
      // Toast.show(response.message);
      console.log('else block');
      yield put({
        type: 'Order_List_Error',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Order_List_Error',
    });
  }
}

function* getStore(action) {
  try {
    const response = yield call(Api.fetchDataByGET, action.url);
    console.log('this is responsee data from saga ',response);
    if (response) {
      yield put({
        type: 'Get_Store_Success',
        payload: response.data,
      });
    } else {
      // Toast.show(response.messages)
      yield put({
        type: 'Get_Store_Error',
      });
    }
  } catch (error) {
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Get_Store_Error',
    });
  }
}

function* categoryList(action) {
  try {
    const data = new FormData();
    data.append('category_id',action.category_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('response block',response);
    if (response.status == true) {
      yield put({
        type: 'Category_List_Success',
        payload: response.products,
        payload1:response.category
      });
      // Toast.show(response.message);
      action.navigation.navigate('CategoryList');
    } else {
      // Toast.show(response.message);
      console.log('else block');
      yield put({
        type: 'Category_List_Error',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Category_List_Error',
    });
  }
}

function* getMenu(action) {
  try {
    const response = yield call(Api.fetchDataByGET, action.url);
    console.log('this is responsee data from saga ',response);
    if (response) {
      yield put({
        type: 'Menu_List_Success',
        payload: response.data,
      });
    } else {
      // Toast.show(response.messages)
      yield put({
        type: 'Menu_List_Error',
      });
    }
  } catch (error) {
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Menu_List_Error',
    });
  }
}

function* addAddress(action) {
  try {
    const data = new FormData();
    data.append('api_token','');
    data.append('customer_id',action.customer_id);
    data.append('company','Merwans');
    data.append('address_1',action.address_1);
    data.append('address_2',action.address_2);
    data.append('city',action.city);
    data.append('postcode',action.postcode);
    data.append('country_id','99');
    data.append('zone_id',action.zone_id);
    data.append('default',action.default)
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('response block',response);
    if (response.status == true) {
      yield put({
        type: 'Add_Address_Success',
      });
      // Toast.show(response.message);
    } else {
      // Toast.show(response.message);
      console.log('else block');
      yield put({
        type: 'Add_Address_Error',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Add_Address_Error',
    });
  }
}

function* cityList(action) {
  try {
    const data = new FormData();
    data.append('country_id','99');
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('response block',response);
    if (response.status == true) {
      yield put({
        type: 'City_List_Success',
        payload:response.data
      });
    } else {
      console.log('else block');
      yield put({
        type: 'City_List_Error',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'City_List_Error',
    });
  }
}

function* orderDetail(action) {
  try {
    const data = new FormData();
    data.append('customer_id',action.customer_id);
    data.append('order_id',action.order_id)
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('response block',response);
    if (response.status == true) {
      yield put({
        type: 'Order_Detail_Success',
        payload:response.data
      });
      action.navigation.navigate('OrderDetail')
    } else {
      console.log('else block');
      yield put({
        type: 'Order_Detail_Error',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Order_Detail_Error',
    });
  }
}

function* addItemToCart(action) {
  console.log('this is action option',action.option);
  try {
    const data = new FormData();
    data.append('customer_id',action.customer_id);
    data.append('product_id',action.product_id)
    data.append('select_key',action.select_key)
    data.append('select_value',action.select_value)
    data.append('text_key',action.text_key)
    data.append('text_value',action.text_value)
    data.append('quantity','1')
    data.append('api_token','')
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('response block',response);
    if (response.status == true) {
      yield put({
        type: 'Add_Item_Success',
        // payload:response.data
      });
      // action.navigation.navigate('Payment')
      // Toast.show(response.message)
    } else {
      console.log('else block');
      yield put({
        type: 'Add_Item_Error',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Add_Item_Error',
    });
  }
}

function* addItemToCart1(action) {
  console.log('this is action option',action.option);
  try {
    const data = new FormData();
    data.append('customer_id',action.customer_id);
    data.append('product_id',action.product_id)
    data.append('select_key',action.select_key)
    data.append('select_value',action.select_value)
    data.append('text_key',action.text_key)
    data.append('text_value',action.text_value)
    data.append('quantity','1')
    data.append('api_token','')
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('response block',response);
    if (response.status == true) {
      yield put({
        type: 'Add_Item_Success1',
        // payload:response.data
      });
      // action.navigation.navigate('Payment')
      // Toast.show(response.message)
    } else {
      console.log('else block');
      yield put({
        type: 'Add_Item_Error1',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Add_Item_Error1',
    });
  }
}

function* shipping(action) {
  try {
    const data = new FormData();
    data.append('api_token','');
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    console.log('response block',response);
    if (response.status == true) {
      yield put({
        type: 'Shipping_List_Success',
        payload:response
      });
    } else {
      console.log('else block');
      yield put({
        type: 'Shipping_List_Error',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Shipping_List_Error',
    });
  }
}

function* timeDrop(action) {
  try {
    const data = new FormData();
    data.append('store_id',action.store_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'Time_Drop_Success',
        payload:response.pickuptimes
      });
    } else {
      console.log('else block');
      yield put({
        type: 'Time_Drop_Error',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Time_Drop_Error',
    });
  }
}

function* getAddress(action) {
  try {
    const data = new FormData();
    data.append('customer_id',action.customer_id);
    data.append('address_id',action.address_id)
    data.append('api_token','')
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'Get_Address_Success',
        payload:response.data
      });
    } else {
      console.log('else block');
      yield put({
        type: 'Get_Address_Error',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Get_Address_Error',
    });
  }
}

function* getAddress1(action) {
  try {
    const data = new FormData();
    data.append('customer_id',action.customer_id);
    data.append('address_id',action.address_id)
    data.append('api_token','')
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'Get_Address_Success1',
        payload:response.data
      });
      action.navigation.navigate('Payment')
      AsyncStorage.setItem("Address_id",action.address_id)
    } else {
      console.log('else block');
      yield put({
        type: 'Get_Address_Error1',
      });
    }
  } catch (error) {
    console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Get_Address_Error1',
    });
  }
}

function* wishlist(action) {
  try {
    const data = new FormData();
    data.append('customer_id',action.customer_id);
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'Wish_List_Success',
        payload:response.products
      });
      action.navigation.push('Whish')
    } else {
      console.log('else block');
      yield put({
        type: 'Wish_List_Error',
      });
    }
  } catch (error) {
    // console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Wish_List_Error',
    });
  }
}

function* removewishlist(action) {
  try {
    const data = new FormData();
    data.append('customer_id',action.customer_id);
    data.append('product_id',action.product_id)
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'Wish_Remove_Success',
      });
      // Toast.show(response.message)
      action.navigation.navigate('Whish')
    } else {
      console.log('else block');
      yield put({
        type: 'Wish_Remove_Error',
      });
    }
  } catch (error) {
    // console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Wish_Remove_Error',
    });
  }
}

function* addWish(action) {
  try {
    const data = new FormData();
    data.append('customer_id',action.customer_id);
    data.append('product_id',action.product_id)
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'Add_Wish_Success',
        payload:response.products
      });
      // Toast.show(response.message)
      // action.navigation.navigate('Whish')
    } else {
      console.log('else block');
      yield put({
        type: 'Add_Wish_Error',
      });
    }
  } catch (error) {
    // console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Add_Wish_Error',
    });
  }
}


function* about(action) {
  try {
    const response = yield call(Api.fetchDataByGET, action.url);
    if (response) {
      yield put({
        type: 'About_Us_Success',
        payload: response.description,
      });
      action.navigation.navigate('About')
    } else {
      // Toast.show(response.messages)
      yield put({
        type: 'About_Us_Error',
      });
    }
  } catch (error) {
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'About_Us_Error',
    });
  }
}
function* policy(action) {
  try {
    const response = yield call(Api.fetchDataByGET, action.url);
    if (response) {
      yield put({
        type: 'Privacy_Policy_Success',
        payload: response.description,
      });
      action.navigation.navigate('Privacy')
    } else {
      // Toast.show(response.messages)
      yield put({
        type: 'Privacy_Policy_Error',
      });
    }
  } catch (error) {
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Privacy_Policy_Error',
    });
  }
}

function* policy1(action) {
  try {
    const response = yield call(Api.fetchDataByGET, action.url);
    if (response) {
      yield put({
        type: 'Privacy_Policy_Success1',
        payload: response.description,
      });
    } else {
      // Toast.show(response.messages)
      yield put({
        type: 'Privacy_Policy_Error1',
      });
    }
  } catch (error) {
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Privacy_Policy_Error1',
    });
  }
}


function* term(action) {
  try {
    const response = yield call(Api.fetchDataByGET, action.url);
    if (response) {
      yield put({
        type: 'Term_Condition_Success',
        payload: response.description,
      });
      action.navigation.navigate('Term')
    } else {
      // Toast.show(response.messages)
      yield put({
        type: 'Term_Condition_Error',
      });
    }
  } catch (error) {
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Term_Condition_Error',
    });
  }
}

function* resetPass(action) {
  try {
    const data = new FormData();
    data.append('email',action.email)
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'Reset_Pass_Success',
      });
      Toast.show(response.message)
      action.navigation.navigate('Otp',{
        customer_id:response.customer_id,
        otp:response.otp
      })
    } else {
      console.log('else block');
      yield put({
        type: 'Reset_Pass_Error',
      });
    }
  } catch (error) {
    // console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Reset_Pass_Error',
    });
  }
}

function* changePassword(action) {
  try {
    const data = new FormData();
    data.append('password',action.password)
    data.append('customer_id',action.customer_id)
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'Change_Pass_Success',
      });
      Toast.show(response.message)
      action.navigation.navigate('Login')
    } else {
      console.log('else block');
      yield put({
        type: 'Change_Pass_Error',
      });
    }
  } catch (error) {
    // console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Change_Pass_Error',
    });
  }
}

function* addLat(action) {
  try {
    const data = new FormData();
    data.append('address_id',action.address_id)
    data.append('latitude',action.lat)
    data.append('longitude',action.long)
    const response = yield call(Api.fetchDataByPOST, action.url, data);
    if (response.status == true) {
      yield put({
        type: 'Add_Lat_Success',
      });
      // Toast.show(response.message)
    } else {
      console.log('else block');
      yield put({
        type: 'Add_Lat_Error',
      });
    }
  } catch (error) {
    // console.log('catch block');
    if (error.message == 'Network Error') {
    }
    yield put({
      type: 'Add_Lat_Error',
    });
  }
}

export default function* authSaga() {
  yield takeEvery('User_Login_Request',doLogin)
  yield takeEvery('User_Register_Request',doRegister)
  yield takeEvery('User_Logout_Request',logout)
  yield takeEvery('Edit_Profile_Request',editProfile)
  yield takeEvery('Address_List_Request',addressList)
  yield takeEvery('Get_Store_Request',getStore)
  yield takeEvery('Category_List_Request',categoryList)
  yield takeEvery('Menu_List_Request',getMenu)
  yield takeEvery('Add_Address_Request',addAddress)
  yield takeEvery('City_List_Request',cityList)
  yield takeEvery('Order_List_Request',orderList)
  yield takeEvery('Order_Detail_Request',orderDetail)
  yield takeEvery('Add_Item_Request',addItemToCart)
  yield takeEvery('Add_Item_Request1',addItemToCart1)
  yield takeEvery('Shipping_List_Request',shipping)
  yield takeEvery('Time_Drop_Request',timeDrop)
  yield takeEvery('Get_Address_Request',getAddress)
  yield takeEvery('Get_Address_Request1',getAddress1)
  yield takeEvery('Wish_List_Request',wishlist)
  yield takeEvery('Wish_Remove_Request',removewishlist)
  yield takeEvery('Add_Wish_Request',addWish)
  yield takeEvery('About_Us_Request',about)
  yield takeEvery('Privacy_Policy_Request',policy)
  yield takeEvery('Privacy_Policy_Request1',policy1)
  yield takeEvery('Term_Condition_Request',term)
  yield takeEvery('Reset_Pass_Request',resetPass)
  yield takeEvery('Change_Pass_Request',changePassword)
  yield takeEvery('Add_Lat_Request',addLat)
}
// navigation.navigate('Feedback')
// navigation.navigate('About')