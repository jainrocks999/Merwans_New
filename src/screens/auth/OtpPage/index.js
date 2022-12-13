import { View, Text, Image, Platform, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import Back from "../../../assets/Svg/back.svg";
import OtpInputs from "react-native-otp-inputs";

const Otp = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1 }}
                source={require('../../../assets/Icon/bg.png')}>
                <View style={{ padding: 8 }}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 8, paddingVertical: 5 }}
                            onPress={() => navigation.goBack()}>
                            <Back />
                        </TouchableOpacity>
                        <Text style={styles.verify}>Verify Your Email</Text>
                        <View />
                    </View>
                    <View style={styles.please}>
                        <Text style={styles.enter}>Please Enter The 4 Digit Code Sent To</Text>
                    </View>
                    <View style={{ paddingHorizontal: 45, marginTop: 12 }}>
                        <View style={styles.inputContainer}>
                            <OtpInputs
                                // handleChange={code => this.setState({otp: code})}
                                numberOfInputs={4}
                                // defaultValue={this.state.otp}
                                autofillFromClipboard={true}
                                keyboardType={'numeric'}
                                style={styles.all}
                                //value={}
                                inputContainerStyles={[styles.otp]}
                                inputStyles={styles.box}
                            />
                        </View>
                    </View>
                    <View style={styles.code}>
                        <Text style={styles.resend}>Resend Code</Text>
                        <View style={{borderWidth:0.6,width:'24%'}}/>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Change')}
                            style={styles.touch}>
                            <Text style={styles.text}>Verify</Text>
                        </TouchableOpacity>
                    </View>

                    <View>

                    </View>
                </View>
            </ImageBackground>
        </View>
    )

}
export default Otp;