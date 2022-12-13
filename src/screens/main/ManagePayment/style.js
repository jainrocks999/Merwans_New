import { StyleSheet } from "react-native";

export default StyleSheet.create({
    card:{
        width:'100%',
        elevation:3,
        backgroundColor:'#fff',
        borderRadius:7,
        paddingHorizontal:6,
        paddingVertical:20
    },
    text:{
        color:'#ED1717',
        fontFamily:'Montserrat-SemiBold',
        fontSize:20,
        marginTop:0
    },
    card1:{
        backgroundColor:'#F4F4F4',
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:14,
        marginTop:20,
        borderRadius:6,
        elevation:3,
        alignItems:'center',
        justifyContent:'space-between'
    },
    view:{
        backgroundColor:'#D9D9D9',
        width:30,
        height:30,
        borderRadius:15,
        padding:5,
        alignItems:'center',
        justifyContent:'center'
    }
})