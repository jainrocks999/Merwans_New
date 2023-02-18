import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#232323',
        height: 40
    },
    touch:{
        paddingHorizontal: 10,
        paddingVertical: 8,
        paddingRight: 30
    },
    icon:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    about:{
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20
    },
    scroll:{ 
        marginTop: 10, 
        paddingHorizontal: 15, 
        marginBottom: 0 
    }
})