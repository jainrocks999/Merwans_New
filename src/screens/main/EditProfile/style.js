import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    card:
    {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { height: 2, width: 0 },
        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
        paddingVertical: 4,
        paddingHorizontal:5
   
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
    error:
    {
        width:'100%',
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
    arrow:{
        alignSelf:'flex-start',
        paddingHorizontal:10,
        paddingVertical:4
    },
    header:{ 
        marginTop: 0, 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    edit:{ 
        color: '#ED1B1A', 
        fontFamily: 'Montserrat-Bold', 
        fontSize: 20 
    },
    btn:{
        paddingHorizontal: 24,
        alignItems: 'center',
        backgroundColor: '#ED1B1A',
        height: 38,
        justifyContent: 'center',
        borderRadius: 2
    },
    save:{ 
        fontFamily: 'Montserrat-Bold', 
        color: '#fff', 
        fontSize: 17 
    }
})



 