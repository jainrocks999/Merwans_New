import { StyleSheet } from 'react-native';


export default StyleSheet.create({
 inputContainer:{
     width:'100%',
     height:40,
     borderWidth:2,
     borderColor:'#FB8019',
     borderRadius:2,
     paddingHorizontal:6,
     justifyContent:'center'
    },
    error:
    {
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:8,
        marginTop:6
    },
    warn:
    {
        fontSize:12,
        color:'#ED1B1A'
    },
    cont:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },
    headerCont:{ 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 100 
    },
    login:{ 
        color: '#ED1B1A', 
        fontFamily: 'Montserrat-Bold', 
        fontSize: 22 
    },
    input:{ 
        fontFamily: 'Montserrat-Medium',
        includeFontPadding:false,
        padding: 0,
        margin:0,
        width:'100%'
    },
    password:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    },
    pass:{ 
        fontFamily: 'Montserrat-Medium',
        includeFontPadding:false,
        padding: 0,
        margin:0,
        width:'80%'
    },
    forgot:{
        color: '#146678',
        fontSize: 14,
        fontFamily: 'Montserrat-Medium'
    },
    row:{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 40 
    },
    log:{
        width: 180,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ED1B1A',
        borderRadius: 2
    },
    text:{ 
        fontSize: 18, 
        color: '#FFFFFF', 
        fontFamily: 'Montserrat-bold', 
    },
    bottom:{ 
        bottom: 30, 
        position: 'absolute', 
        left: 0, 
        right: 0 
    },
    view:{ 
        paddingHorizontal: 20, 
        marginTop: 6, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    have:{ 
        color: '#000000', 
        fontSize: 13, fontFamily: 'Montserrat-Medium' 
    },
    here:{ 
        color: '#000000', 
        fontSize: 13, 
        marginTop: 1, 
        fontFamily: 'Montserrat-Medium' 
    }
})