import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{ 
        elevation:4,
        backgroundColor:'#F4F4F4',
        shadowColor:'#000',
        borderRadius:6,
        width:'100%',
        flexDirection:'row',
        // paddingVertical:10,
        paddingHorizontal:10,
        alignItems:'center'
    },
    search:{
        fontSize:13,
        fontFamily:'Montserrat-Medium',
        color:'#000000',
        marginLeft:11,
        width:'90%',
        height:40,
        includeFontPadding:false,
        padding: 0,
        margin:0
    },
    main:{ 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    select:{ 
        marginLeft: 15, 
        fontFamily: 'Montserrat-Bold', 
        fontSize: 16, 
        color: '#333333' 
    },
    view:{ 
        marginTop: 15, 
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between' 
    },
    cont:{
        flexDirection:'row',
        alignItems:'center'
    },
    use:{
        color:'#ED1B1A',
        fontSize:14,
        fontFamily:'Montserrat-SemiBold'
    },
    res:{
        fontFamily:'Montserrat-Medium',
        fontSize:12,
        color:'#333333'
    },
    recentV:{ 
        borderWidth: 0.5, 
        borderColor: '#D9D9D9',
        marginTop:10 },
    recent:{
        fontFamily:'Montserrat-Bold',
        color:'#333333',
        fontSize:15
    },
    clockV:{ 
        flexDirection:'row',
        alignItems:'center',
        marginTop:10
    },
    text:{
        fontFamily:'Montserrat-Medium',
        fontSize:12,
        color:'#333333',
        marginLeft:10
    },
    border:{ 
        borderWidth: 0.5, 
        borderColor: '#D9D9D9',
        marginTop:10 
    },
   
    view1:{
        alignItems:'center',
        justifyContent:'center',
    },
    my:{
        color:'#fff',
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
