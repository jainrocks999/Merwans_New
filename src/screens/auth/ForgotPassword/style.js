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
    container:{ 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexDirection: 'row' 
    },
    back:{
        paddingHorizontal:8,
        paddingVertical:5 
    },
    reset:{ 
        color: '#ED1B1A', 
        fontFamily: 'Montserrat-Bold', 
        fontSize: 22, 
    },
    space:{ 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 200 
    },
    please:{ 
        fontSize: 13, 
        color: '#000000', 
        fontFamily: 'Montserrat-Medium' 
    },
    padding:{ 
        paddingHorizontal: 45,
        marginTop: 15 
    },
    input:{ 
        fontFamily: 'Montserrat-Medium', 
        includeFontPadding: false, 
        padding: 0, 
        margin: 0, 
        width: '100%' 
    },
    get:{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 40 
    },
    send:{
        width: 180,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ED1B1A',
        borderRadius:2
    },
    prob:{ 
        fontSize: 18, 
        color: '#FFFFFF', 
        fontFamily: 'Montserrat-bold', 
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
})