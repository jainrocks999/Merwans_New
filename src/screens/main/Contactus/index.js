import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, ScrollView, TextInput,Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import styles from "./style";
import Loader from "../../../components/Loader";
import Back from "../../../assets/Svg/back.svg";
import HTMLView from 'react-native-htmlview';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";
import Plus from "../../../assets/Svg/menuP.svg";
import Minus from "../../../assets/Svg/minus.svg";
import CheckBox from '@react-native-community/checkbox';
import axios from "axios";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-simple-toast";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Contact = () => {
    const navigation = useNavigation()
    const dispatch=useDispatch()
    const isFetching = useSelector(state => state.Auth.isFetching)
    const [open, setOpen] = useState(false)
    const selector = useSelector(state => state.Auth.Store)
    console.log(selector);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const inputRef = React.useRef()
    const [first,setFirst]=useState('---Please Select---')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [mobile,setMobile]=useState('')
    const [topic,setTopic]=useState('')
    const [message,setMessage]=useState('')

    const [visible,setVisible]=useState(false)
    const [fetching,setFetching]=useState(false)
    const [data,setData]=useState()
  
    const refRBSheet = useRef();

    const Policy = () => {
        dispatch({
          type: 'Privacy_Policy_Request',
          url: 'api/privacy_policy',
          navigation: navigation
        });
        navigation.navigate('Privacy')
      }

    manageSubmit=async()=>{
        if(name==''){
            Toast.show('Please enter your name')
        }
        else if(email==''){
            Toast.show('Please enter your email')
        }
        else if(mobile==''){
           Toast.show('Please enter phone number')
        }
        else if(message==''){
            Toast.show('Please enter message')
        }
        else if(toggleCheckBox==false){
            Toast.show('Please accept Privacy Policy')
        }
        else{
            console.log(name,email,mobile,message,first);
            try {
                setFetching(true)
                const response = await axios({
                  method: 'POST',
                  headers: {
                    'content-type': 'multipart/form-data',
                    Accept: 'multipart/form-data',
                  },
                  url:`https://merwans.co.in/index.php?route=api/contactus/contactForm&name=${name}&email=${email}&phoneNumber=${mobile}&topic=${first=='---Please Select---'?'':first}&message=${message}`,
                });
                console.log('this is respose',response.data);
                if (response.data.status == true) {
                  setFetching(false)
                  navigation.goBack()
                }
                else {
                  setFetching(false)
                }
              } catch (error) {
                throw error;
              }
        }
    }

    const getStoreDetails=async(id)=>{
        console.log('this is id',id);
        try {
            setFetching(true)
            const response = await axios({
              method: 'POST',
              headers: {
                'content-type': 'multipart/form-data',
                Accept: 'multipart/form-data',
              },
              url:`https://merwans.co.in/index.php?route=api/contactus/storeAddress&store_id=${id}`,
            });
            console.log('this is respose',response.data);
            if (response.data.status == true) {
                setData(response.data.address)
              setFetching(false)
              refRBSheet.current.open()

            //   setFilteredDataSource(response.data.products)
            //   setcatname(response.data.category)
            }
            else {
              setFetching(false)
            }
          } catch (error) {
            throw error;
          }
    }
    return (
        <View style={{ flex: 1 }}>
            {isFetching ||fetching ? <Loader /> : null}
            <ImageBackground
                style={{ flex: 1, }}
                source={require('../../../assets/Icon/bg.png')}>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.touch1}
                            onPress={() => navigation.goBack()}>
                            <Back />
                        </TouchableOpacity>
                        <View style={styles.icon}>
                            <Text style={styles.about}>Contact Us</Text>
                        </View>
                        <View style={{ width: 40 }} />
                    </View>
                    <ScrollView style={styles.scroll}>
                        <View>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: 'black' }}>Store Locator</Text>
                            <TouchableOpacity
                                onPress={() => setOpen(!open)}
                                style={{
                                    backgroundColor: 'grey',
                                    height: 50,
                                    width: '100%',
                                    marginTop: 9,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 10
                                }}>
                                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Montserrat-SemiBold' }}>Mumbai</Text>
                                {open ? <Minus width={25} height={25} /> : <Plus width={25} height={25} />}
                            </TouchableOpacity>
                            {open ? <View style={{ backgroundColor: 'white', width: '100%', paddingHorizontal: 20, paddingVertical: 10 }}>
                                {selector.map((item) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#000' }} />
                                        <Text onPress={()=>getStoreDetails(item.store_id)} style={{ marginLeft: 8 }}>{item.label}</Text>
                                    </View>
                                ))}
                            </View> : null}
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.heading}>{'Your Name'}
                                   <Text style={{color:'#ED1B1A',fontSize:16}}>*</Text>
                                </Text>
                                <View style={styles.view}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Your Name"
                                        placeholderTextColor={'#000000'}
                                        onChangeText={(val)=>setName(val)}
                                        value={name}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.heading}>{'Your Email'}
                                <Text style={{color:'#ED1B1A',fontSize:16}}>*</Text></Text>
                                <View style={styles.view}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Your Email"
                                        placeholderTextColor={'#000000'}
                                        onChangeText={(val)=>setEmail(val)}
                                        value={email}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.heading}>{'Phone Number'}
                                <Text style={{color:'#ED1B1A',fontSize:16}}>*</Text></Text>
                                <View style={styles.view}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Mobile"
                                        placeholderTextColor={'#000000'}
                                        onChangeText={(val)=>setMobile(val)}
                                        value={mobile}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.heading}>Topic</Text>
                                <TouchableOpacity
                                onPress={() => setVisible(true)} 
                                 style={styles.view}>
                                    <Text style={styles.input}>{first}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.heading}>{'Message'}
                                <Text style={{color:'#ED1B1A',fontSize:16}}>*</Text>
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => inputRef.current.focus()}
                                    style={[styles.touch, { borderWidth: 2, borderColor: '#FB8019', }]}>
                                    <TextInput
                                        ref={inputRef}
                                        placeholderTextColor={'#000000'}
                                        style={styles.input}
                                        placeholder='Message'
                                        multiline={true}
                                        onChangeText={(val)=>setMessage(val)}
                                        value={message}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.space}>
                                <CheckBox
                                    disabled={false}
                                    value={toggleCheckBox}
                                    onValueChange={newValue => setToggleCheckBox(newValue)}
                                    tintColors={{ true: '#ED1B1A', false: 'grey' }}
                                    onTintColor='#ED1B1A'
                                    onCheckColor='#ED1B1A'
                                    boxType='square'
                                    style={{ height: 16, width: 18 }}
                                />
                                <View style={styles.have}>
                                    <Text style={styles.read}>{'I have read and agree to the '}
                                    </Text>
                                    <TouchableOpacity onPress={() => Policy()}>
                                        <Text style={styles.policy}>Privacy Policy</Text>
                                        <View style={{ borderBottomWidth: 1, borderColor: '#000000', }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => manageSubmit()}
                                    style={styles.mainBtn}>
                                    <Text
                                        style={styles.confirm1}>{`Submit`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {visible ?
                        <View  style={{ 
                            backgroundColor: 'white', 
                            borderRadius: 3,
                            paddingTop: 5,
                            position: 'absolute',
                            bottom: (windowHeight * 5) /(Platform.OS=='android'? 22:26),
                            left: (windowWidth * 58) / 390,
                            borderColor: 'red', 
                            borderWidth: 0.5,
                            width: windowWidth-100,
                            zIndex:1,
                            // height: 70, 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation:5
                                     }}>
                            <TouchableOpacity style={{width:'100%'}} onPress={() => {
                                setFirst('Product related issue')
                                setVisible(false)
                            }}>
                                <Text style={{ 
                                    color: 'black', 
                                    marginLeft:10, 
                                    height: 30, 
                                    fontSize: 12, 
                                    fontFamily: 'Montserrat-Medium' ,
                                    marginTop:4
                                    }}>Product related issue</Text>
                            </TouchableOpacity >
                            <TouchableOpacity 
                            style={{ 
                                borderTopWidth: 0.5, 
                                borderTopColor: 'red', 
                                width: '100%'
                            }} onPress={() => {
                               setFirst('Delivery related issue')
                               setVisible(false)
                                // this.changeGender('F', index);
                            }}>
                                <Text style={{ 
                                    color: 'black', 
                                    marginLeft:10,
                                    marginTop: 7, 
                                    height: 30, 
                                    fontSize: 12, 
                                    fontFamily: 'Montserrat-Medium' ,
                                   
                                    }}>Delivery related issue</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={{ 
                                borderTopWidth: 0.5, 
                                borderTopColor: 'red', 
                                width: '100%'
                            }} onPress={() => {
                               setFirst('Other')
                               setVisible(false)
                                // this.changeGender('F', index);
                            }}>
                                <Text style={{ 
                                    color: 'black', 
                                    marginLeft:10,
                                    marginTop: 7, 
                                    height: 30, 
                                    fontSize: 12, 
                                    fontFamily: 'Montserrat-Medium' 
                                    }}>Other</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }
                    </ScrollView>
                    <RBSheet
                    ref={refRBSheet}
                    height={windowHeight/2}
                    openDuration={250}>
                        <View style={{padding:15}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{fontSize:16,color:'#000',fontFamily:'Montserrat-SemiBold'}}>Store Address</Text>
                            <TouchableOpacity onPress={()=> refRBSheet.current.close()} style={{ backgroundColor: '#ED1B1A',paddingHorizontal:10,paddingVertical:4,borderRadius:6,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:14,fontFamily:'Montserrat-Medium'}}>Close</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{borderWidth:0.5,marginTop:10}}/>
                            <View style={{marginTop:10}}>
                                <Text style={{color:'#000',fontFamily:'Montserrat-SemiBold',fontSize:15}}>{'Store Name : '}
                                <Text style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:13}}>{data?.name}</Text>
                                </Text>
                            </View>
                            <View style={{marginTop:10}}>
                                <Text style={{color:'#000',fontFamily:'Montserrat-SemiBold',fontSize:15}}>{'Address : '}
                                <Text style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:13}}>{data?.address}</Text>
                                </Text>
                            </View>
                            <View style={{marginTop:10}}>
                                <Text style={{color:'#000',fontFamily:'Montserrat-SemiBold',fontSize:15}}>{'Telephone No. : '}
                                <Text style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:13}}>{data?.telephone}</Text>
                                </Text>
                            </View>
                            <View style={{marginTop:10}}>
                                <Text style={{color:'#000',fontFamily:'Montserrat-SemiBold',fontSize:15}}>{'Mobile No. : '}
                                <Text style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:13}}>{data?.mobile}</Text>
                                </Text>
                            </View>
                            <View style={{marginTop:10}}>
                                <Text style={{color:'#000',fontFamily:'Montserrat-SemiBold',fontSize:15}}>{'Store Hours : '}
                                <Text style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:13}}>{data?.store_hours}</Text>
                                </Text>
                            </View>

                        </View>

                   </RBSheet>
                </View>
            </ImageBackground>
            <StatusBar barStyle="light-content" backgroundColor={'#232323'} />
        </View>
    )
}
export default Contact;