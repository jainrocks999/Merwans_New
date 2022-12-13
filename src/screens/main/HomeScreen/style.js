import { StyleSheet } from "react-native";

export default StyleSheet.create({
    main:{
        width:'48%',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%'
    },
    go:{
        height:30,
        width:52,
        backgroundColor:'#ED1B1A',
        flexDirection:'row',
        alignItems:'center',justifyContent:'center',
        borderRadius:6
    },
    text:{
        color:'#FFFFFF',
        fontFamily:'Montserrat-Bold',
        fontSize:14
    },
    container:{
        backgroundColor:'#FAFAFA',
        width:'80%',
        elevation:5,
        height:30,
        justifyContent:'center',
        paddingHorizontal:8
    },
    main1:{
        marginTop:8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    select:{
        color:'#333333',
        fontFamily:'Montserrat-Medium',
        fontSize:12
    },
    cont:{
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    row1:{ 
        paddingHorizontal: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 15 ,
        backgroundColor:'#fff',
        paddingVertical:3
    },
    view:{
        width:'48%',
        backgroundColor:'#fff',
        borderRadius:10,
        elevation:5
    },
    view2:{
        paddingHorizontal: 10,
        backgroundColor: '#FAFAFA',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    cake:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: '#383737',
        marginTop: 7
    },
    des:{
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: '#383737'
    },
    arrow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    }
  
})