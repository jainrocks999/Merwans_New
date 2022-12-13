import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity,Image,LayoutAnimation,ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ScrollView } from "react-native-gesture-handler";
import BottomTab from "../../../components/BottomTab";
import Header from "../../../components/Header";
import Down from "../../../assets/Svg/down.svg";


const ExpandableComponent = ({item, onClickFunction}) => {
    const [layoutHeight, setLayoutHeight] = useState(0);
    const navigation=useNavigation()
  
    useEffect(() => {
      if (item.isExpanded) {
        setLayoutHeight(null);
      } else {
        setLayoutHeight(0);
      }
    }, [item.isExpanded]);
  
    return (
      <View style={{paddingHorizontal:5}}>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={1}
        //   onPress={onClickFunction}
        onPress={()=>navigation.navigate('CategoryList')}
          style={{}}>
          <View style={[styles.card,{
              marginTop:10,
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center'

        }]}>
             <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Image source={item.image}/>
              <Text style={{fontFamily:'Montserrat-SemiBold',color:'#333333',fontSize:18}}>{item.name}</Text>
             </View>
             <View style={{marginRight:14}}>
                 <Down/>
             </View>
         </View>    
        </TouchableOpacity>
       
      </View>
    );
  };




const Category=()=>{
    const [pending,setPending]=useState(true)
    const [listDataSource, setListDataSource] = useState(CONTENT);
    const [multiSelect, setMultiSelect] = useState(false);

    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listDataSource];
        if (multiSelect) {
          array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
          array.map((value, placeindex) =>
            placeindex === index
              ? (array[placeindex]['isExpanded'] =
                 !array[placeindex]['isExpanded'])
              : (array[placeindex]['isExpanded'] = false),
          );
        }
        setListDataSource(array);
      };

    return(
     <View style={{flex:1,backgroundColor:'#fff'}}>
        <ImageBackground style={{flex:1}} source={require('../../../assets/Icon/bg.png')}>
          
         <ScrollView  stickyHeaderIndices={[0]}>
         <Header/>
         <View style={{marginTop:28,alignItems:'center',justifyContent:'center'}}>
             <Text style={{fontSize:20,fontFamily:'Montserrat-Bold',color:'#ED1B1A'}}>Categories</Text>
         </View>
         <View style={{marginTop:20}}>
     {pending==true? <View>
          {CONTENT.map((item, key) => (
            <ExpandableComponent
              key={item.CustomerSrNo}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          ))}
          </View>:null}
          </View>
          </ScrollView>
          <View>
            <BottomTab/>
          </View>
          </ImageBackground>
     </View>
    )
}
export default Category;
const CONTENT = [
  {
    isExpanded: false,
    image: require('../../../assets/Logo/blue.png'),
    name:'Cake',
    date:'23 Sep 2021',
    subcategory: [
      {id: 1, val: 'Sub Cat 1'},
    ],
  },
  {
    isExpanded: false,
    image: require('../../../assets/Logo/blue.png'),
    name:'PASTRIES',
    date:'23 Sep 2021',
    subcategory: [
      {id: 4, val: 'Sub Cat 4'},
    ],
  },
  {
    isExpanded: false,
    image: require('../../../assets/Logo/blue.png'),
    name:'Puffs and Rolls',
    date:'23 Sep 2021',
    subcategory: [
      {id: 7, val: 'Sub Cat 7'},
    ],
  },
  {
    isExpanded: false,
    image: require('../../../assets/Logo/blue.png'),
    name:'Cookies - Breads',
    date:'23 Sep 2021',
    subcategory: [
      {id: 7, val: 'Sub Cat 7'},
    ],
  },
  {
    isExpanded: false,
    image: require('../../../assets/Logo/blue.png'),
    name:'Others',
    date:'23 Sep 2021',
    subcategory: [
      {id: 7, val: 'Sub Cat 7'},
    ],
  },
  {
    isExpanded: false,
    image: require('../../../assets/Logo/blue.png'),
    name:'Others',
    date:'23 Sep 2021',
    subcategory: [
      {id: 7, val: 'Sub Cat 7'},
    ],
  },
  {
    isExpanded: false,
    image: require('../../../assets/Logo/blue.png'),
    name:'Others',
    date:'23 Sep 2021',
    subcategory: [
      {id: 7, val: 'Sub Cat 7'},
    ],
  },
  {
    isExpanded: false,
    image: require('../../../assets/Logo/blue.png'),
    name:'Others',
    date:'23 Sep 2021',
    subcategory: [
      {id: 7, val: 'Sub Cat 7'},
    ],
  },
  {
    isExpanded: false,
    image: require('../../../assets/Logo/blue.png'),
    name:'Others',
    date:'23 Sep 2021',
    subcategory: [
      {id: 7, val: 'Sub Cat 7'},
    ],
  },
  {
    isExpanded: false,
    image: require('../../../assets/Logo/blue.png'),
    name:'Others',
    date:'23 Sep 2021',
    subcategory: [
      {id: 7, val: 'Sub Cat 7'},
    ],
  },

  
];