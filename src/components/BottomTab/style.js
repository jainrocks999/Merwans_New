import { Dimensions, StyleSheet } from 'react-native';
export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor:'#232323',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical:5
  },

  itemSeperator: {
    borderBottomWidth: 0.5,
    borderColor: '#C1C1C1',
    width: '50%',
  },
  bottomTab: {
    tintColor: 'white',
    height: 25,
    width: 25,
  },
  bottomTab1: {
    height: 40,
    width: 40,
  },
  buttonText: {
    fontSize: 11,
    alignSelf: 'center',
    width: 90,
    padding: 4,
    textAlign: 'center',
  },
  text:{
    fontSize: 11,
    color:'#FFFFFF',
    fontFamily:'Montserrat-Bold',
   // marginTop:5
  },
  container:{
    justifyContent: 'center', 
    alignItems: 'center'
  }
});
