import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  otp: {
    // backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {height: 2, width: 0},
    elevation: 2,
    borderRadius: 10,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  verify: {
    color: '#ED1B1A',
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
  please: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  enter: {
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  all: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    marginTop: 8,
    alignSelf: 'center',
  },
  box: {
    fontSize: 12,
    color: 'red',
    width: 34,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderColor: '#FB8019',
    borderWidth: 2,
    height: Platform.OS == 'ios' ? 34 : 34,
  },
  code: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  resend: {
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  touch: {
    width: 180,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ED1B1A',
    borderRadius: 2,
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-bold',
  },
});
