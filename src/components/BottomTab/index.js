import React from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import Home from "../../assets/Svg/home.svg";
import Search from "../../assets/Svg/search.svg";
import Shopping from "../../assets/Svg/shopping-bag.svg";
import User from "../../assets/Svg/user.svg";

const BottomTab = () => {
  const navigation = useNavigation();

  const renderHome = () => {
    return (
      <View style={styles.container}>
        <View >
          <Home/>
        </View>
        <Text style={[styles.text, {marginTop: 0}]}>{'Home'}</Text>
      </View>
    );
  };

  const renderBank = () => {
    return (
      <View style={styles.container}>
        <View >
         <Search/>
        </View>
        <Text style={[styles.text]}>{'Search'}</Text>
      </View>
    );
  };
  const renderKnowledge = () => {
    return (
      <View style={styles.container}>
        <View >
           <Shopping/>
        </View>
        <Text style={styles.text}>{'Cart'}</Text>
      </View>
    );
  };
  const renderTrending = () => {
    return (
      <View style={styles.container}>
        <View >
           <User/>
        </View>
        <Text style={styles.text}>{'Profile'}</Text>
      </View>
    );
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        {renderHome()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => {
          navigation.navigate('SecondSearch');
        }}>
        {renderBank()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => navigation.navigate('Payment')}>
        {renderKnowledge()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => {
          navigation.navigate('ProfileWithLogin');
        }}>
        {renderTrending()}
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;
