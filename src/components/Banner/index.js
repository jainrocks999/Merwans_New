import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../AsyncStorage";
import { useNavigation } from "@react-navigation/native";

const Preview = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  const BannerWidth = Dimensions.get('window').width ;
  const BannerHeight = 180;
 const dispatch=useDispatch()
 const navigation=useNavigation()
  const manageList = async (item) => {
    const customer_id=await AsyncStorage.getItem(Storage.customer_id)
    const store_id=await AsyncStorage.getItem(Storage.store_id)
    AsyncStorage.setItem("category_id",item.category_id)
    AsyncStorage.setItem('product_id',item.product_id)
    dispatch({
        type: 'Category_List_Request',
        url: 'apiproduct',
        customer_id:customer_id,
        category_id:item.category_id,
        store_id:store_id,
        product_id:item.product_id,
        navigation: navigation
    });
}
  return (
    <TouchableOpacity
     onPress={()=>manageList(item)}
     style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,width:BannerWidth/3,paddingHorizontal:6 }}>
    <View style={{ width: '100%', }} >
        <Image style={{ width: '100%', height: 110,borderRadius:15 }} source={item.image?{uri:item.image}:require('../../assets/Logo/image2.png')} />
        <Text style={{ color: '#000000', fontFamily: 'Montserrat-SemiBold', fontSize: 10, marginTop: 5 }}>{item.name}</Text>
        {item.price==undefined?null:<Text style={{ color: '#000000', fontFamily: 'Montserrat-Medium', fontSize: 11, marginTop: 10 }}>{`₹${parseInt(item.price).toFixed(2)}`}</Text>}
    </View>
</TouchableOpacity>
  );
};
export default Preview
const styles = StyleSheet.create({
  
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});