import React,{useState} from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import Home from "../../assets/Svg/home.svg";
import Search from "../../assets/Svg/search.svg";
import Shopping from "../../assets/Svg/shopping-bag.svg";
import User from "../../assets/Svg/user.svg";

const BottomTab = ({home,search,cart,profile}) => {
  const navigation = useNavigation();
  const handlePress=()=>{
    navigation.navigate('Home');
  }
  const handlePress1=()=>{
    navigation.navigate('SecondSearch');
  }
  const handlePress2=()=>{
    navigation.navigate('Payment')
  }
  const handlePress3=()=>{
    navigation.navigate('ProfileWithLogin');
  }

  const renderHome = () => {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:home==true?'#808080':'#232323',borderRadius:20,padding:3}}>
          <Home height={18} width={18}/>
        </View>
        <Text style={[styles.text, {marginTop: 0}]}>{'Home'}</Text>
      </View>
    );
  };

  const renderBank = () => {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:search==true?'#808080':'#232323',borderRadius:20,padding:3}}>
         <Search height={18} width={18}/>
        </View>
        <Text style={[styles.text]}>{'Search'}</Text>
      </View>
    );
  };
  const renderKnowledge = () => {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:cart==true?'#808080':'#232323',borderRadius:20,padding:3}}>
           <Shopping height={18} width={18}/>
        </View>
        <Text style={styles.text}>{'Cart'}</Text>
      </View>
    );
  };
  const renderTrending = () => {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:profile==true?'#808080':'#232323',borderRadius:20,padding:3}}>

           <User height={18} width={18}/>
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
        onPress={() => handlePress()}>
        {renderHome()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => handlePress1()}>
        {renderBank()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => handlePress2()}>
        {renderKnowledge()}
      </TouchableOpacity>

      <TouchableOpacity
        delayPressIn={0}
        style={styles.bottomTabContainer}
        onPress={() => handlePress3()}>
        {renderTrending()}
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;
