import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#232323',
        height: 40
    },
    touch1:{
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
    },
    view:{
        borderWidth:2,
        height:40,
        marginTop:3,
        paddingHorizontal:5,
        borderColor:'#FB8019',
        borderRadius:2,
        justifyContent:'center'
    },
    heading:{
        color:'#000000',
        fontFamily:'Montserrat-SemiBold',
        fontSize:15
    },
    input:{
        color:'#000000',
        fontFamily:'Montserrat-Medium',
        fontSize:12,
        includeFontPadding:false,padding: 0,margin:0
    },
    touch:{
        backgroundColor: '#F5F5F5', 
        height: 70, 
        marginTop: 8, 
        borderRadius: 0, 
        paddingHorizontal: 8 
    },
    input1: { 
        fontSize: 12, 
        fontFamily: 'Montserrat-Regular', 
        includeFontPadding: false, 
        padding: 0, 
        margin: 0, 
        color: '#000',
    },
    mainBtn: {
        width: '100%',
        backgroundColor: '#ED1B1A',
        borderRadius: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        elevation: 3,
        marginTop: 25,
        justifyContent: 'center',
        height: 38,
        marginBottom:70
    },
    confirm1: {
        color: "#fff",
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    space: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginTop: 15,
        // justifyContent: 'center'
    },
    have: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    read: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Montserrat-Medium',
    },
    policy: {
        fontSize: 13,
        color: '#000',
        fontFamily: 'Montserrat-Medium',
    },

})