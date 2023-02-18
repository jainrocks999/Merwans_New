initialstate = {
  AddressList:[],
  AddressData:[],
  Store:[],
  CategoryList:[],
  Category:'',
  MenuList:[],
  City:[],
  OrderList:[],
  OrderDetail:[],
  Shipping:'',
  Time:[],
  Address:'',
  wishlist:'',
  About:'',
  Policy:'',
  Policy1:'',
  Term:'',
  Home:'',
  UserDetail:'',

};
export default (state = initialstate, action) => {
  switch (action.type) {
  
      case 'User_Login_Request':
        return { ...state, isFetching: true };
      case 'User_Login_Success':
        return { ...state, isFetching: false,};
      case 'User_Login_Error':
        return { ...state, isFetching: false };

      case 'User_Register_Request':
        return { ...state, isFetching: true };
      case 'User_Register_Success':
        return { ...state, isFetching: false,};
      case 'User_Register_Error':
        return { ...state, isFetching: false };

      case 'User_Logout_Request':
        return { ...state, isFetching: true };
      case 'User_Logout_Success':
        return { ...state, isFetching: false,};
      case 'User_Logout_Error':
        return { ...state, isFetching: false };

      case 'Edit_Profile_Request':
        return { ...state, isFetching: true };
      case 'Edit_Profile_Success':
        return { ...state, isFetching: false,};
      case 'Edit_Profile_Error':
        return { ...state, isFetching: false };

      case 'Address_List_Request':
        return { ...state, isFetching: true };
      case 'Address_List_Success':
        return { ...state, isFetching: false,AddressList: action.payload};
      case 'Address_List_Error':
        return { ...state, isFetching: false };

      case 'Address_List_Req':
        return { ...state, isFetching: true };
      case 'Address_List_Suc':
        return { ...state, isFetching: false,AddressData: action.payload};
      case 'Address_List_Err':
        return { ...state, isFetching: false };

      case 'Get_Store_Request':
        return { ...state, isFetching: true };
      case 'Get_Store_Success':
        return { ...state, isFetching: false,Store: action.payload};
      case 'Get_Store_Error':
        return { ...state, isFetching: false };

      case 'Category_List_Request':
        return { ...state, isFetching: true };
      case 'Category_List_Success':
        return { ...state, isFetching: false,CategoryList: action.payload,Category:action.payload1};
      case 'Category_List_Error':
        return { ...state, isFetching: false };

      case 'Menu_List_Request':
        return { ...state, isFetching: true };
      case 'Menu_List_Success':
        return { ...state, isFetching: false,MenuList: action.payload};
      case 'Menu_List_Error':
        return { ...state, isFetching: false };

      case 'Add_Address_Request':
        return { ...state, isFetching: true };
      case 'Add_Address_Success':
        return { ...state, isFetching: false};
      case 'Add_Address_Error':
        return { ...state, isFetching: false };

      case 'City_List_Request':
        return { ...state, isFetching: true };
      case 'City_List_Success':
        return { ...state, isFetching: false,City:action.payload};
      case 'City_List_Error':
        return { ...state, isFetching: false };

      case 'Order_List_Request':
        return { ...state, isFetching: true };
      case 'Order_List_Success':
        return { ...state, isFetching: false,OrderList:action.payload};
      case 'Order_List_Error':
        return { ...state, isFetching: false };

      case 'Order_Detail_Request':
        return { ...state, isFetching: true };
      case 'Order_Detail_Success':
        return { ...state, isFetching: false,OrderDetail:action.payload};
      case 'Order_Detail_Error':
        return { ...state, isFetching: false };

      case 'Add_Item_Request':
        return { ...state, isFetching: true };
      case 'Add_Item_Success':
        return { ...state, isFetching: false};
      case 'Add_Item_Error':
        return { ...state, isFetching: false };

      case 'Shipping_List_Request':
        return { ...state, isFetching: true };
      case 'Shipping_List_Success':
        return { ...state, isFetching: false,Shipping:action.payload};
      case 'Shipping_List_Error':
        return { ...state, isFetching: false };

      case 'Time_Drop_Request':
        return { ...state, isFetching: true };
      case 'Time_Drop_Success':
        return { ...state, isFetching: false,Time:action.payload};
      case 'Time_Drop_Error':
        return { ...state, isFetching: false };

      case 'Get_Address_Request':
        return { ...state, isFetching: true };
      case 'Get_Address_Success':
        return { ...state, isFetching: false,Address:action.payload};
      case 'Get_Address_Error':
        return { ...state, isFetching: false };

      case 'Get_Address_Request1':
        return { ...state, isFetching: true };
      case 'Get_Address_Success1':
        return { ...state, isFetching: false,Address:action.payload};
      case 'Get_Address_Error1':
        return { ...state, isFetching: false };

      case 'Get_Address_Request2':
        return { ...state, isFetching: true };
      case 'Get_Address_Success2':
        return { ...state, isFetching: false,Address:action.payload};
      case 'Get_Address_Error2':
        return { ...state, isFetching: false };

      case 'Wish_List_Request':
        return { ...state, isFetching: true };
      case 'Wish_List_Success':
        return { ...state, isFetching: false,wishlist:action.payload};
      case 'Wish_List_Error':
        return { ...state, isFetching: false };

      case 'Wish_Remove_Request':
        return { ...state, isFetching: true };
      case 'Wish_Remove_Success':
        return { ...state, isFetching: false,};
      case 'Wish_Remove_Error':
        return { ...state, isFetching: false };
      
      case 'Add_Wish_Request':
        return { ...state, isFetching: true };
      case 'Add_Wish_Success':
        return { ...state, isFetching: false,};
      case 'Add_Wish_Error':
        return { ...state, isFetching: false };

      case 'About_Us_Request':
        return { ...state, isFetching: true };
      case 'About_Us_Success':
        return { ...state, isFetching: false,About:action.payload};
      case 'About_Us_Error':
        return { ...state, isFetching: false };

      case 'Privacy_Policy_Request':
        return { ...state, isFetching: true };
      case 'Privacy_Policy_Success':
        return { ...state, isFetching: false,Policy:action.payload};
      case 'Privacy_Policy_Error':
        return { ...state, isFetching: false };

      case 'Privacy_Policy_Request1':
        return { ...state, isFetching: true };
      case 'Privacy_Policy_Success1':
        return { ...state, isFetching: false,Policy1:action.payload};
      case 'Privacy_Policy_Error1':
        return { ...state, isFetching: false };

      case 'Term_Condition_Request':
        return { ...state, isFetching: true };
      case 'Term_Condition_Success':
        return { ...state, isFetching: false,Term:action.payload};
      case 'Term_Condition_Error':
        return { ...state, isFetching: false };

      case 'Reset_Pass_Request':
        return { ...state, isFetching: true };
      case 'Reset_Pass_Success':
        return { ...state, isFetching: false};
      case 'Reset_Pass_Error':
        return { ...state, isFetching: false };

      case 'Change_Pass_Request':
        return { ...state, isFetching: true };
      case 'Change_Pass_Success':
        return { ...state, isFetching: false};
      case 'Change_Pass_Error':
        return { ...state, isFetching: false };

      case 'Home_Data_Request':
        return { ...state, isFetching: true };
      case 'Home_Data_Success':
        return { ...state, isFetching: false,Home:action.payload};
      case 'Home_Data_Error':
        return { ...state, isFetching: false };

      case 'User_Detail_Request':
        return { ...state, isFetching: true };
      case 'User_Detail_Success':
        return { ...state, isFetching: false,UserDetail:action.payload};
      case 'User_Detail_Error':
        return { ...state, isFetching: false };

      case 'Order_Status_Request':
        return { ...state, isFetching: true };
      case 'Order_Status_Success':
        return { ...state, isFetching: false};
      case 'Order_Status_Error':
        return { ...state, isFetching: false };

    default:
      return state;
  }
};
