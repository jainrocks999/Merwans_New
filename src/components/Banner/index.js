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
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,width:BannerWidth }}>
    <View style={{ width: '30%', }} >
        <Image style={{ width: '100%', height: 110 }} source={require('../../assets/Logo/image1.png')} />
        <Text style={{ color: '#000000', fontFamily: 'Montserrat-SemiBold', fontSize: 10, marginTop: 5 }}>{'Almond Finger \n[1 Pc]'}</Text>
        <Text style={{ color: '#000000', fontFamily: 'Montserrat-Medium', fontSize: 11, marginTop: 10 }}>{'₹ 550.00'}</Text>
    </View>
    <View style={{ width: '30%' }}>
        <Image style={{ width: '100%', height: 110 }} source={require('../../assets/Logo/image2.png')} />
        <Text style={{ color: '#000000', fontFamily: 'Montserrat-SemiBold', fontSize: 10, marginTop: 5 }}>{'Cashew Butter Biscuits [250 gms]'}</Text>
        <Text style={{ color: '#000000', fontFamily: 'Montserrat-Medium', fontSize: 11, marginTop: 10 }}>{'₹ 550.00'}</Text>
    </View>
    <View style={{ width: '30%', marginRight: 20 }}>
        <Image style={{ width: '100%', height: 110 }} source={require('../../assets/Logo/image3.png')} />
        <Text style={{ color: '#000000', fontFamily: 'Montserrat-SemiBold', fontSize: 10, marginTop: 5 }}>{'Blueberry Cheese Cake'}</Text>
        <Text style={{ color: '#000000', fontFamily: 'Montserrat-Medium', fontSize: 11, marginTop: 10 }}>{'₹ 550.00'}</Text>
    </View>
</View>
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