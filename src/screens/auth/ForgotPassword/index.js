import { View, Text, StatusBar, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import Back from "../../../assets/Svg/back.svg";

const ForgotScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1 }}
                source={require('../../../assets/Icon/bg.png')}>
                <View style={{ padding: 8 }}>

                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={() => navigation.goBack()}>
                            <Back />
                        </TouchableOpacity>
                        <Text style={styles.reset}>Reset Password</Text>
                        <View />
                    </View>
                    <View style={styles.space}>
                        <Text style={styles.please}>Please Enter Your Email Address To Receive A Verification Code</Text>
                    </View>
                    <View style={styles.padding}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Email '
                                style={styles.input}
                                placeholderTextColor={'#000'}
                            />
                        </View>
                    </View>
                    <View style={styles.get}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Otp')}
                            style={styles.send}>
                            <Text style={styles.prob}>Send</Text>
                        </TouchableOpacity>
                    </View>

                    <View>

                    </View>
                </View>
            </ImageBackground>
            <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
        </View>
    )

}
export default ForgotScreen;