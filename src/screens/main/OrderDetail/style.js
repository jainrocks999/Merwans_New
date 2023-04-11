import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    cont: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-between',
        alignItems:'center'
    },
    view1: {
        flexDirection: 'row',
        // width:'100%'
        // alignItems: 'center',
       
    },
    square: {
        height: 6,
        width: 6, backgroundColor: '#0FAF33',
        borderRadius: 8
    },
    title: {
        color: '#333333',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14
    },
    rView: {
        flexDirection: 'row',
    },
    rupay: {
        color: '#000000',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        marginTop:-21
    },
    order: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        marginBottom: 15,
        paddingBottom: 6,
        borderRadius: 5
    },
    view: {
        borderColor: '#0FAF33',
        borderWidth: 1,
        height: 10,
        width: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        marginTop:10
    },
    back: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    title1: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tag: {
        color: '#ED1B1A',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20
    },
    item: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        elevation: 3,
        paddingVertical: 5,
        marginTop: 8,
        borderRadius: 5,
    },
    id: {
        color: '#333333',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16
    },
    date: {
        color: '#333333',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 13
    },
    from: {
        color: '#ED1B1A',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginTop: 10
    },
    pay: {
        color: '#333333',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 13,
        width: '90%',
        marginTop:2
    },
    to: {
        color: '#ED1B1A',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginTop: 10
    },
    val: {
        color: '#333333',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 13,
        width: '90%',
        marginTop:2
    },
    sum: {
        color: '#ED1B1A',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        marginLeft: 8,
        marginTop: 10
    },
    views: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 6,
        paddingHorizontal: 8,
    
    },
    iTotal: {
        color: '#333333',
        fontFamily: 'Montserrat-Medium',
        fontSize: 13
    },
    total: {
        color: '#333333',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
    via: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
        marginBottom: 8,
        paddingHorizontal: 8
    },
    paid: {
        color: '#333333',
        fontFamily: 'Montserrat-SemiBold'
    },
    sel: {
        color: '#333333',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14
    },
    checkv: {
        paddingHorizontal: 8,
        marginTop: 10,
        marginBottom: 10
    },
    check: {
        flexDirection: 'row',
        // alignItems: 'center'
    },
    orders: {
        color: '#333333',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 13,
        marginLeft: 5,
        marginTop:0
    },
    main:{
        backgroundColor: '#ED1B1A',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
       
        alignSelf:'flex-end'
    },
    recover:{ 
        color: '#ffffff', 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 13, 
        marginLeft: 4 
    }
})