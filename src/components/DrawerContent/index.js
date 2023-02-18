import React, { useState ,useEffect} from "react";
import { View, Text, Image, TouchableOpacity,FlatList,LayoutAnimation } from "react-native";
import styles from './style'
import Plus from "../../assets/Svg/menuP.svg";
import Minus from "../../assets/Svg/minus.svg";
import { useNavigation ,DrawerActions} from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import Loader from "../Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from "../../components/AsyncStorage";

const Drawer=()=>{
    const [visible, setVisible] = useState(false)
    const navigation=useNavigation()
    const selector=useSelector(state=>state.MenuList)
    const isFetching=useSelector(state=>state.isFetching)
    const [listDataSource, setListDataSource] = useState(selector);
    const [multiSelect, setMultiSelect] = useState(false);
    const dispatch=useDispatch()
    
    const manageData=async(id)=>{
      const customer_id=await AsyncStorage.getItem(Storage.customer_id)
      const store_id=await AsyncStorage.getItem(Storage.store_id)
      AsyncStorage.setItem('category_id',id)
      AsyncStorage.setItem("product_id",'')
      dispatch({
        type: 'Category_List_Request',
        url: 'apiproduct',
        category_id:id,
        customer_id:customer_id,
        store_id:store_id,
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
          <View 
          // activeOpacity={0.8}  onPress={onClickFunction} 
          style={[styles.cmn]}>
                <TouchableOpacity 
                activeOpacity={0.8} onPress={()=>manageData(item.category_id)}
                >
                <Text style={[styles.home,{textTransform:'uppercase'}]}>{(item.name)}</Text>
                </TouchableOpacity>
                {visible? handleSubCategory(item):<View/>}
                <TouchableOpacity 
               activeOpacity={0.8}  onPress={onClickFunction} 
                style={{paddingHorizontal:6,paddingVertical:5}}>
               { layoutHeight==0?<Plus/>:<Minus/>}
                </TouchableOpacity>
              </View>
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
            style={[styles.margin,{width:'90%'}]}>
              <Text style={[styles.item,{textTransform:'uppercase'}]}>{item.name}</Text>
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
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const array = [...selector];
      // if (multiSelect) {
      // } else {
        array.map((value, placeindex) =>
          placeindex === index
            ? (array[placeindex]['isExpanded'] =
               !array[placeindex]['isExpanded'])
            : (array[placeindex]['isExpanded'] = false),
        );
      // }
      setListDataSource(array);
    };

    const manageHome=()=>{
      navigation.dispatch(DrawerActions.closeDrawer())
      navigation.navigate('Home')
    }
   
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
          onPress={() => manageHome()}
          >
             <Text style={[styles.home,{marginBottom:4,textTransform:'uppercase'}]}>Home</Text>
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
            <Text style={[styles.home, { marginTop: 3 ,textTransform:'uppercase'}]}>Contact Us</Text>
        </View>
     
      </View>
    )
}
export default Drawer;
