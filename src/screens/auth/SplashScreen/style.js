import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    image:{
       width:270,
        height:270,
       
    },
    text:{
        fontSize:18,
        fontFamily:"Montserrat-Bold",
        color:'red',
        marginTop:10
    },  
    modal: {
        width: 300,
    
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      ModelBtntext: {
        color: '#fff',
        fontSize: 15,
        alignSelf: 'center',
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        //padding: 16,
        textAlign: 'center',
      },
      ModelMsgText: {
        width: '99%',
        alignSelf: 'center',
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
        alignItems: 'center',
        padding: 6,
        textAlign: 'center',
      },
      ModelmsgView: {
        width: '99%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      popup: {
        height: 40,
        marginTop: 10,
        backgroundColor:'#ED1B1A',
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal:10
      },
});