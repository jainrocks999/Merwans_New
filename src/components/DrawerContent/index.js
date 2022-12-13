import React, { useState ,useEffect} from "react";
import { View, Text, Image, TouchableOpacity,FlatList,LayoutAnimation } from "react-native";
import styles from './style'
import Plus from "../../assets/Svg/menuP.svg";
import Minus from "../../assets/Svg/minus.svg";
import { useNavigation ,DrawerActions} from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import Loader from "../Loader";

const Drawer=()=>{
    const [visible, setVisible] = useState(false)
    const navigation=useNavigation()
    const selector=useSelector(state=>state.MenuList)
    const isFetching=useSelector(state=>state.isFetching)
    const [listDataSource, setListDataSource] = useState(selector);
    const [multiSelect, setMultiSelect] = useState(false);
    const dispatch=useDispatch()

    const manageData=(id)=>{
      dispatch({
        type: 'Category_List_Request',
        url: 'apiproduct',
        category_id:id,
        navigation:navigation
      });
      navigation.dispatch(DrawerActions.closeDrawer());
    }
    const ExpandableComponent = ({item, onClickFunction}) => {
      const [layoutHeight, setLayoutHeight] = useState(0);
      useEffect(() => {
        if (item.isExpanded) {
          setLayoutHeight(null);
        } else {
          setLayoutHeight(0);
        }
      }, [item.isExpanded]);
     
      return (
        <View>
          <TouchableOpacity activeOpacity={0.8}  onPress={onClickFunction} style={[styles.cmn]}>
                <View 
                // activeOpacity={0.8} onPress={()=>manageData(item.category_id)}
                >
                <Text style={styles.home}>{item.name}</Text>
                </View>
                {visible? handleSubCategory(item):<View/>}
                <View 
               
                style={{paddingHorizontal:6,paddingVertical:5}}>
               { layoutHeight==0?<Plus/>:<Minus/>}
                </View>
              </TouchableOpacity>
          <View
            style={{
              height: layoutHeight,
              overflow: 'hidden',
              paddingHorizontal:8,
              width:'95%',
            }}>
            {item.submenus.map((item, key) => (
            <TouchableOpacity 
            onPress={()=>manageData(item.category_id)} 
            style={styles.margin}>
              <Text style={styles.item}>{item.name}</Text>
              <View style={styles.round2}>
                <Text style={styles.num}>{item.productCount}</Text>
              </View>
            </TouchableOpacity>
              
            ))}
          </View>
        </View>
      );
    };
    const updateLayout = (index) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const array = [...selector];
      if (multiSelect) {
      } else {
        array.map((value, placeindex) =>
          placeindex === index
            ? (array[placeindex]['isExpanded'] =
               !array[placeindex]['isExpanded'])
            : (array[placeindex]['isExpanded'] = false),
        );
      }
      setListDataSource(array);
    };
   
    return(
        <View style={{backgroundColor:'#FFF',width:'100%',alignSelf:'center'}}>
          {isFetching?<Loader/>:null}
        <View
          style={styles.header}>
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontFamily: 'Montserrat-SemiBold' }}>Menu</Text>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
            style={{ borderWidth: 2, borderColor: '#FFFFFF', marginRight: 10, padding: 4, borderRadius: 3 }}>
            <Image style={{ tintColor: '#fff', height: 8, width: 8 }} source={require('../../assets/Icon/multiply.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 15,paddingHorizontal:6,paddingLeft:19 }}>
          <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
          >
             <Text style={[styles.home,{marginBottom:4}]}>Home</Text>
          </TouchableOpacity>
           <View>
           {selector.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          ))}
           </View>
            <Text style={[styles.home, { marginTop: 3 }]}>Contact Us</Text>
        </View>
     
      </View>
    )
}
export default Drawer;
const CONTENT = [
  {
    isExpanded: false,
    category_name: 'Item 1',
    subcategory: [
      {id: 1, val: 'Sub Cat 1'},
      {id: 3, val: 'Sub Cat 3'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 2',
    subcategory: [
      {id: 4, val: 'Sub Cat 4'},
      {id: 5, val: 'Sub Cat 5'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 3',
    subcategory: [
      {id: 7, val: 'Sub Cat 7'},
      {id: 9, val: 'Sub Cat 9'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 4',
    subcategory: [
      {id: 10, val: 'Sub Cat 10'},
      {id: 12, val: 'Sub Cat 2'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 5',
    subcategory: [
      {id: 13, val: 'Sub Cat 13'},
      {id: 15, val: 'Sub Cat 5'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 6',
    subcategory: [
      {id: 17, val: 'Sub Cat 17'},
      {id: 18, val: 'Sub Cat 8'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 7',
    subcategory: [{id: 20, val: 'Sub Cat 20'}],
  },
  {
    isExpanded: false,
    category_name: 'Item 8',
    subcategory: [{id: 22, val: 'Sub Cat 22'}],
  },
  {
    isExpanded: false,
    category_name: 'Item 9',
    subcategory: [
      {id: 26, val: 'Sub Cat 26'},
      {id: 27, val: 'Sub Cat 7'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 10',
    subcategory: [
      {id: 28, val: 'Sub Cat 28'},
      {id: 30, val: 'Sub Cat 0'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 11',
    subcategory: [{id: 31, val: 'Sub Cat 31'}],
  },
  {
    isExpanded: false,
    category_name: 'Item 12',
    subcategory: [{id: 34, val: 'Sub Cat 34'}],
  },
  {
    isExpanded: false,
    category_name: 'Item 13',
    subcategory: [
      {id: 38, val: 'Sub Cat 38'},
      {id: 39, val: 'Sub Cat 9'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 14',
    subcategory: [
      {id: 40, val: 'Sub Cat 40'},
      {id: 42, val: 'Sub Cat 2'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 15',
    subcategory: [
      {id: 43, val: 'Sub Cat 43'},
      {id: 44, val: 'Sub Cat 44'},
    ],
  },
];
