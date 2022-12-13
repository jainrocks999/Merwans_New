import React,{useState} from "react";
import { View,Text,TextInput,TouchableOpacity,} from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import Down from "../../assets/Svg/down.svg";

const Home=()=>{
    const navigation=useNavigation()
    const [state,setState]=useState(0)
    return(
        <View style={{paddingHorizontal:20,paddingBottom:20}}>      
        <View style={{height:20}}>
        </View>
        <View>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.heading}>Address 1</Text>
                <Text style={styles.str}>*</Text>
            </View>
            <View style={styles.view}>
                <TextInput
                style={styles.input}
                placeholder="Address 1"
                placeholderTextColor={'#000000'}
                />
            </View>
        </View>

        <View style={{marginTop:17}}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.heading}>Address 2</Text>
                
            </View>
            
            <View style={styles.view}>
                <TextInput
                style={styles.input}
                placeholder="Address 2"
                placeholderTextColor={'#000000'}
                />
            </View>
        </View>
        <View style={{marginTop:17}}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.heading}>City</Text>
                <Text style={styles.str}>*</Text>
            </View>
            
            <View style={styles.view}>
                <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor={'#000000'}
                />
            </View>
        </View>
        <View style={{marginTop:17}}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.heading}>Post Code</Text>
                <Text style={styles.str}>*</Text>
            </View>
            
            <View style={styles.view}>
                <TextInput
                style={styles.input}
                placeholder="Post Code"
                placeholderTextColor={'#000000'}
                />
            </View>
        </View>
        <View style={{marginTop:17}}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.heading}>Region / State</Text>
                <Text style={styles.str}>*</Text>
            </View>
            
            <View style={styles.view}>
            <RNPickerSelect
                    onValueChange={val => setState(val)}
                    items={data}
                    style={{
                      inputAndroid: {
                        color: '#000',
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                      },
                      inputIOS:{
                        color: '#000',
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                      },
                      placeholder: {
                        color: '#000',
                        width: '100%',
                        alignSelf: 'center',
                      },
                    }}
                    value={state == null || state == 0 ? '' : state}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{label: 'Select state', value: ''}}
                    Icon={() => (
                        <View style={{marginTop:12,marginRight:4}}>
                          <Down/>
                      </View>
                    )}
                  />
            </View>
        </View>
        <View style={{marginTop:17}}>
            <Text style={styles.heading}>Nearby Landmark(Optional)</Text>
            <View style={styles.view}>
                <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#000000'}
                />
            </View>
        </View>
        
        <View style={{marginTop:25,alignItems:'center'}}>
            <TouchableOpacity
            style={{
                paddingHorizontal:24,
                alignItems:'center',
                backgroundColor:'#ED1B1A',
                height:38,
                justifyContent:'center',
                borderRadius:4
                }}>
                <Text style={{fontFamily:'Montserrat-Bold',color:'#fff',fontSize:17}}>Save Address</Text>
            </TouchableOpacity>
        </View>
        <View style={{height:10}}/>
       
    </View>
    )
}
export default Home;
const data = [
    {label: 'Maharashtra', value: '1'},
    {label: 'Indore', value: '2'},
    {label: 'Delhi', value: '3'},
  ];