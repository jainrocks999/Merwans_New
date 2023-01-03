import { StyleSheet } from "react-native";

export default StyleSheet.create({
    main:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 10,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        elevation: 5
    },
    row:{ 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    done:{
        backgroundColor: '#D9D9D9',
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    you:{
        color: '#000000',
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
        width: '80%',
        marginLeft: 10
    },
    your:{
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 10
    },
    order:{ 
        color: '#ED1B1A', 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 15 
    },
    list:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sq:{
        borderColor: '#0FAF33',
        borderWidth: 1,
        height: 10,
        width: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        marginTop: 0
    },
    dot:{
        height: 6,
        width: 6, 
        backgroundColor: '#0FAF33',
        borderRadius: 8
    },
    name:{ 
        color: '#333333', 
        fontFamily: 'Montserrat-Regular', 
        fontSize: 13 
    },
    price:{ 
        color: '#000000', 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 13 
    },
    view:{
        borderWidth: 1,
        height: 22,
        width: 60,
        // marginTop: 10,
        borderColor: '#ED1717',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 2,
        borderRadius: 5
    },
    bottom:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 2
    },
    pric:{ 
        color: '#000000', 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 12 
    },
    inst:{
        paddingHorizontal: 10,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        elevation: 5,
        borderRadius: 5
    },
    input:{ 
        fontFamily: 'Montserrat-Medium',
        fontSize: 14, 
        includeFontPadding: false, 
        padding: 0, 
        margin: 0
    },
    add:{ 
        color: '#000000', 
        fontFamily: 'Montserrat-Medium', 
    },
    apply:{
        paddingHorizontal: 10,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        elevation: 5,
        borderRadius: 5
    },
    coupon:{ 
        color: '#ED1B1A', 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 15 
    },
    cont:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 9
    },
    border:{
        borderWidth: 1,
        borderColor: '#FB8019',
        width: '63%',
        height: 33,
        borderRadius: 2,
        justifyContent: 'center',
        paddingHorizontal:8
    },
    inputs:{ 
        fontFamily: 'Montserrat-Medium',
        fontSize: 12, 
        includeFontPadding: false, 
        padding: 0, 
        margin: 0 ,

    },
    btn:{
        height: 33,
        backgroundColor: '#ED1B1A',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    app:{
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'Montserrat-Bold',
        marginTop: -3
    },
    sum:{
        paddingHorizontal: 10,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        elevation: 5,
        borderRadius: 5
    },
    bill:{ 
        color: '#ED1B1A', 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 15 
    },
    row1:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 10 
    },
    sub:{ 
        color: '#000000', 
        fontFamily: 'Montserrat-Medium' 
    },
    total:{ 
        color: '#000000', 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 12 
    },
    row2:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 6 
    },
    class:{ 
        color: '#000000', 
        fontFamily: 'Montserrat-Bold' 
    },
    last:{ 
        color: '#000000', 
        fontFamily: 'Montserrat-Bold', 
        fontSize: 14 
    },
    dele:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        elevation: 5,
        borderRadius: 5,
        paddingTop:8
    },
    home:{
        color: '#000000',
        fontFamily: 'Montserrat-Medium',
       
    },
    floor:{
        color: '#000000',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12
    },
    btns:{
        width: '100%',
        backgroundColor: '#ED1B1A',
        borderRadius: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        elevation: 3,
        marginTop: 20,
        justifyContent: 'center',
        height: 38
    },
    pro:{
        color: "#fff",
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    view1:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
       
    },
    btn1:{
        // borderWidth:1.5,
        // paddingHorizontal:5,
        paddingVertical:2,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#ED1B1A',
        // borderRadius:3
    },
    change:{
        fontFamily:'Montserrat-Medium',
        fontSize:13,
        color:'#ED1B1A'
    }
})