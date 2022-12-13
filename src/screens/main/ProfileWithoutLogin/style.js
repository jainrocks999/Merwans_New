import { StyleSheet } from 'react-native';


export default StyleSheet.create({
header:{
    height:40,
    width:'100%',
    backgroundColor:'#232323',
    paddingHorizontal:8,
    flexDirection:'row',
    alignItems:'center'
},
location:{
    marginLeft:50,
    flexDirection:'row',
    alignItems:'center'
},
view:{
    backgroundColor:'#F4F4F4',
    paddingHorizontal:10,
    paddingVertical:20,
    elevation:3,
    borderRadius:10,
},
button:{
    width:'100%',
    height:40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ED1B1A',
    borderRadius:6,
    marginTop:10
},
black:{
    color:'#000000',
    fontFamily:'Montserrat-Medium'
},
red:{
    color:'#ED1B1A',
    fontFamily:'Montserrat-Medium'
},
card:{
    width:'31%',
    height:66,
    borderRadius:6,
    elevation:3,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
},
text:{
    color:'#000000',
    fontFamily:'Montserrat-SemiBold',
    fontSize:12,
    marginTop:3
},
card1:
    {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { height: 2, width: 0 },
        elevation: 5,
        borderRadius: 6,
        backgroundColor: '#F4F4F4',
        paddingVertical: 4,
        paddingHorizontal:1  
},
cont:{
    backgroundColor:'#FFFFFF',
    elevation:3,
    marginTop:30,
    paddingHorizontal:5,
    paddingVertical:15,
    borderRadius:6
}
})