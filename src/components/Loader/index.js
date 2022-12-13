import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StatusBar,
    Platform,
    StyleSheet,
} from 'react-native';

export default class Loading extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={Platform.OS == 'ios' ? 1 : 40} color={'red'} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(248,249,249,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
});
