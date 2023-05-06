import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import ABC from './PrintModule'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addbill,Viewarabica,ViewRc} from '../model/bill_schema';

export default (props) => {

    const {name,product,bags,weight,ot,mc,finalot,perbag,navigation, ...attributes} = props;

  return (
    <View style={{width:100,height:'100%',alignItems:'center',margin:20,backgroundColor:'#4c5cc5',borderRadius:16,padding:15,justifyContent:'space-around'}}>
    {/* <Bill name={name} product={product} bags={bags} weight={weight} ot={ot} mc={mc} finalot={finalot} perbag={perbag}  /> */}
    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{
        navigation.navigate('Splash')
    
    }}>
    
    <Icon 
                                    name="printer" 
                                    color={'#fff'}
                                    size={30}
                                    />
      <Text style={{color:'#fff'}}>Kot Billing</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{alignItems:'center'}} onPress={async()=>{
        navigation.navigate('List')
      }}>
    <Icon 
                                    name="format-list-bulleted" 
                                    color={'#fff'}
                                    size={30}
                                    />
      <Text style={{color:'#fff'}}>Rc Bills</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{alignItems:'center'}} onPress={async()=>{
        navigation.navigate('Arabica')
      }}>
    <Icon 
                                    name="format-list-bulleted" 
                                    color={'#fff'}
                                    size={30}
                                    />
      <Text style={{color:'#fff'}}>Arabica</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{alignItems:'center'}}>
    
    <Icon 
                                    name="note-check-outline" 
                                    color={'#fff'}
                                    size={30}
                                    />
      <Text style={{color:'#fff'}}>Outern Report</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{alignItems:'center'}}>
    
    <Icon 
                                    name="book-open" 
                                    color={'#fff'}
                                    size={30}
                                    />
      <Text style={{color:'#fff'}}>Reports</Text>
    </TouchableOpacity>
    </View>
     );
};

// set dimmenstion

const styles = StyleSheet.create({
 texta:{fontSize:17,marginTop:6,fontWeight:'600'}
});