import React, { Component,useState,useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View,ScrollView,TextInput,Keyboard,TouchableOpacity, Alert } from "react-native";
import Button from "./components/Button";
import Row from "./components/Row";
import calculator, { initialState } from "./util/calculator";
import Bill from "./components/bill";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ABC from './components/PrintModule'
import {finddata,edit,deletedata} from './model/bill_schema';

// create class component of App
export default function App({navigation,route}) {
  var date = new Date();
  const [data, setdata] = useState({});
  const [name, setName] = useState('');
  const [product, setProduct] = useState('Rc Cherry');
  const [bags, setBags] = useState('0');
  const [weight, setWeight] = useState('0');
  const [ot, setOt] = useState('25');
  const [mc, setMc] = useState('14');
  const [finalot, setFinalot] = useState('');
  const [perbag, setPerbag] = useState('0');
  const [total, setTotal] = useState('0');
  const [selected, setSelected] = useState('');
  const [loading, setloading] = useState(false);

  // handle tap method
  useEffect(() => {
    getdata(route.params.id)
  }, [loading]);

  async function getdata(id){
    var dar = await finddata(id)
    setdata(dar)
    setName(dar.name)
    setProduct(dar.product)
    setWeight(dar.Weight.toFixed(1).toString())
    setOt(dar.outern.toFixed(2).toString())
    setMc(dar.moisture.toFixed(1).toString())
    setFinalot(dar.finalot.toFixed(2).toString())
    setPerbag(dar.rate.toString())
    setTotal(dar.total.toString())
    setloading(true)
  }
  async function editdata(){
    if(name.length>0){
        const bill = {
          id:data.id,
          name: name.toUpperCase(),
          product:product,
          outern:parseFloat(ot) ,
          moisture: parseFloat(mc),
          finalot:parseFloat(finalot),
          bags:parseInt(weight/50),
          Weight:parseFloat(weight),
          rate:parseInt(perbag),
          total:parseInt(total),
          beens:parseFloat(((weight/50)*finalot).toFixed(1))

        
          }

          edit(bill).then(docs=>{

              if(product=='Rc Cherry'){
                navigation.navigate('List')

              }else{
                navigation.navigate('Arabica')

              }
          })

        }
  }
  async function deletebill(){
    Alert.alert(  
        'Alert',  
        'This action will delete The data',
  
        [  
             
            {text: 'OK', onPress: () => {
                deletedata(data.id).then(docs=>{

                    if(product=='Rc Cherry'){
                      navigation.navigate('List')
            
                    }else{
                      navigation.navigate('Arabica')
            
                    }
                })
              .catch(err => alert(`Some error occured`));        
            }},  
            {text: 'Cancel', onPress: () => {
              return
            }}
        ]  
    )

    


        
  }
  // render method

    return (
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',height:'100%'}}>
        <Bill navigation={navigation} />
       { loading?<View style={{justifyContent:'space-evenly',flexDirection:'row',padding:20,flexWrap: 'wrap',width:'90%',}}>
            <View>
            <Text style={styles.labels}>Products</Text>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
              <TouchableOpacity style={[styles.inputStyle,{backgroundColor:product=='Rc Cherry'?'#4c5cc5':'white',width:100,borderWidth:0}]}
          onPress={()=>{
            setProduct('Rc Cherry')
          }}>
            <Text style={[styles.inputstext,{fontSize:16,color:product=='Rc Cherry'?'white':'black'}]}> RC Cherry</Text>

          </TouchableOpacity>
          <TouchableOpacity style={[styles.inputStyle,{backgroundColor:product=='Arabica'?'#4c5cc5':'white',width:100,borderWidth:0}]}
          onPress={()=>{
            setProduct('Arabica')
          }}>
            <Text style={[styles.inputstext,{color:product=='Arabica'?'white':'black'}]}> Arabica</Text>

          </TouchableOpacity>
          <TouchableOpacity style={[styles.inputStyle,{backgroundColor:product=='Other'?'#4c5cc5':'white',width:100,borderWidth:0}]}
          onPress={()=>{
            setProduct('Other')
          }}>
            <Text style={[styles.inputstext,{color:product=='Other'?'white':'black'}]}> Other</Text>

          </TouchableOpacity>
          
          </View>
              
            </View> 
            <View>
            <Text style={styles.labels}>Seller Name</Text>
        <TextInput
              value={name}
              style={styles.inputStyle}
              onChangeText={(value)=>{
                  setName(value)
              }}
              />   
            </View>
           
            <View>
            <Text style={styles.labels}>Total Weight</Text>
        <TextInput
              style={styles.inputStyle}
              keyboardType='number-pad'
              value={weight}
              onChangeText={(value)=>{
                setTotal(parseInt((value/50)*parseFloat(perbag)).toString())
                setWeight(value.toString())
            }}
              />   
            </View>
            <View>
            <Text style={styles.labels}>Outern</Text>
        <TextInput
              style={styles.inputStyle}
              keyboardType='decimal-pad'
              value={ot}
              onChangeText={(value)=>{
                setOt(value.toString())
            }}

              />   
            </View>
            <View>
            <Text style={styles.labels}>Moisture</Text>
        <TextInput
              style={styles.inputStyle}
              keyboardType='numeric'
              value={mc}
              onChangeText={(value)=>{
                setMc(value.toString())
            }}
              />   
            </View>

            <View>
            <Text style={styles.labels}>Final OT</Text>
        <TextInput
              style={styles.inputStyle}
              keyboardType='numeric'
              value={finalot}
              onChangeText={(value)=>{
                setFinalot(value.toString())
            }}
              />   
            </View>

            <View>
            <Text style={styles.labels}>Prize Perbag</Text>
        <TextInput
              style={styles.inputStyle}
              keyboardType='numeric'
              value={perbag}
              onChangeText={(value)=>{
                setTotal(parseInt((parseFloat(weight)/50)*value).toString())
                setPerbag(value.toString())
            }}
              />   
            </View>

            <View>
            <Text style={styles.labels}>Total</Text>
        <TextInput
              style={styles.inputStyle}
              keyboardType='numeric'
              value={total}
              onChangeText={(value)=>{
                setTotal(value.toString())
            }}
              />   
            </View>
            
            <TouchableOpacity style={{backgroundColor:'#4c5cc5',width:150,height:50,marginTop:35,borderRadius:10,justifyContent:'center',alignItems:'center'}} 
            onPress={editdata}
            >
<Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>Edit data</Text>              
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'red',width:110,height:50,marginTop:35,borderRadius:10,justifyContent:'center',alignItems:'center'}} onPress={deletebill}>
            <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>Delete</Text>           
              </TouchableOpacity>
        </View>:''
   }</View>
   )

    
  
}

// create styles of app
const styles = StyleSheet.create({
  container: {
    width:550,
    height:'100%',
    justifyContent:'flex-end',
    backgroundColor: "#202020",
  },
  value: {
    color: "#fff",
    fontSize: 42,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  containera: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels:{
    color:'#000',
    fontSize:20
  },
  inputstext:{
    color:'#000',
    fontSize:18
  },
  inputStyle: {height:50,marginTop:10,marginBottom:10,padding:10,backgroundColor:'#fff',borderWidth:.5,borderRadius:5,justifyContent:'center',width:300},
});