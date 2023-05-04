import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    view:{
        borderColor:'#0FAF33',
        borderWidth:1,
        height:12,
        width:12,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:1,
        marginTop:10
    },
    cont:{ 
       flexDirection: 'row', 
       alignItems: 'center', 
       marginTop: 8, 
       justifyContent: 'space-between' 
    },
    view1:{
       flexDirection: 'row', 
    //    alignItems: 'center', 
    //    justifyContent:'center'
    },
    square:{
        height: 6,
        width: 6, backgroundColor: '#0FAF33',
        borderRadius: 6
    },
    title:{
        color: '#333333', 
        fontFamily: 'Montserrat-Regular', 
        // fontSize: 15
    },
    rView:{
        flexDirection: 'row', 
        alignContent: 'center', 
        marginTop: -4
    },
    rupay:{
        color: '#000000', 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 14
    },
    order:{ 
        paddingHorizontal: 8, 
        paddingVertical: 6, 
        backgroundColor: '#FFFFFF',
        elevation:3,
        marginBottom:15,
        paddingBottom:6,
        borderRadius:5
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    row1:{
        backgroundColor:'#F4F4F4',
        paddingVertical:2,
        paddingHorizontal:5,
        borderRadius:4,
        elevation:3
    },
    delivered:{
        fontFamily:'Montserrat-Medium',
        fontSize:13,
        color:'#000000'
    },
    from:{
        color:'#ED1B1A',
        fontFamily:'Montserrat-SemiBold',
        fontSize:15
    },
    hash:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginVertical: 2
    },
    text:{ 
        color: '#333333', 
        fontFamily: 'Montserrat-Medium' 
    },
    arrow:{
        alignSelf:'flex-start',
        paddingHorizontal:10,
        paddingVertical:4
    },
    view2:{ 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    your:{ 
        color: '#ED1B1A', 
        fontFamily: 'Montserrat-Bold', 
        fontSize: 20 
    },
    row3:{ 
        alignSelf: 'flex-end', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5 
    },
    rest:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:8
    },
    main:{
        backgroundColor: '#ED1B1A',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5
    },
    recover:{ 
        color: '#ffffff', 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 13, 
        marginLeft: 4 
    }

})