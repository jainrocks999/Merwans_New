initialstate = {
   
    CategoryList:[],
    Policy:'',
    Policy1:'',
    Term:'',
  
  };
  export default (state = initialstate, action) => {
    switch (action.type) {
    
        case 'Category_List_Request':
          return { ...state, isFetching: true };
        case 'Category_List_Success':
          return { ...state, isFetching: false,CategoryList: action.payload,Category:action.payload1};
        case 'Category_List_Error':
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
  
        
  
      
  
      default:
        return state;
    }
  };
  