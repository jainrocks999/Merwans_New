import { StyleSheet } from "react-native";

export default StyleSheet.create({
    view:{
        alignItems:'center',
        justifyContent:'center',
    },
    my:{
        color:'#ED1B1A',
        fontFamily:'Montserrat-Bold',
        fontSize:20
    },
    add:{
        color:'#ED1B1A',
        fontFamily:'Montserrat-SemiBold',
        fontSize:16,
        marginBottom:2
    },
    card:{
        backgroundColor:'#F4F4F4',
        marginTop:2,
        paddingVertical:10,
        paddingHorizontal:8,
        elevation:5,
        marginBottom:13,
        borderRadius:6,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.5,
        marginHorizontal:1
    },
    round:{
        backgroundColor:"#D9D9D9",
        alignSelf:'flex-start',
        padding:4,
        borderRadius:15,
        marginTop:4
    },
    title:{
        fontFamily:'Montserrat-SemiBold',
        fontSize:16,
        color:'#000000'
    },
    desc:{
        fontSize:12,
        color:'#333333',
        fontFamily:'Montserrat-Medium',
        // width:'90%'
    },
    arrow:{  paddingHorizontal: 10, paddingVertical:8,
        paddingRight:30 }
})