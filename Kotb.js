import React, { Component,useState } from "react";
import { SafeAreaView, StyleSheet, Text, View,ScrollView,TextInput,Keyboard,TouchableOpacity,Alert } from "react-native";
import Button from "./components/Button";
import Row from "./components/Row";
import calculator, { initialState } from "./util/calculator";
import Bill from "./components/bill";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ABC from './components/PrintModule'
import {addbill,Viewarabica,ViewRc} from './model/bill_schema';
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";
import Filterdates from './selectdate';

// create class component of App
export default function App({navigation}) {
  const [date, setDate] = useState(new Date());
  const [open, setopen] = useState(false);
  const [state, setState] = useState(initialState);
  const [name, setName] = useState('');
  const [product, setProduct] = useState('Rc Cherry');
  const [bags, setBags] = useState(0);
  const [weight, setWeight] = useState(0);
  const [ot, setOt] = useState(25);
  const [mc, setMc] = useState(14);
  const [finalot, setFinalot] = useState(0);
  const [perbag, setPerbag] = useState(0);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState('');
  const [displayedDate, setdisplayedDate] = useState(moment());

  // handle tap method
  HandleTap = (type, value) => {
    setState(calculator(type, value, state))

  };
  function Handlenext(type, value){
    setState(calculator(type, value, state))

  };
  // render method

    return (
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',height:'100%'}}>
         <Filterdates open={open} date={date}  setDate={setDate} setopen={setopen} />
        <Bill navigation={navigation} />
   <View>

   <ScrollView style={{ width:450,height:'100%',padding:40}}>
   <Text style={styles.labels}>Date</Text>

     <TouchableOpacity style={{width:'100%',borderColor:'black',borderWidth:1,height:50,borderRadius:10,marginBottom:10,justifyContent:'center',padding:10}}onPress={()=>{setopen(true)}}>
       <Text style={styles.inputstext}>
         {date.toDateString()}
       </Text>
       </TouchableOpacity>
   
        <Text style={styles.labels}>Seller Name</Text>
        <TextInput
               value={name}
              style={styles.inputStyle}
              onChangeText={(value)=>{
                setName(value)
              }}
              

             
              />
            <Text style={styles.labels}>Products</Text>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
              <TouchableOpacity style={[styles.inputStyle,{backgroundColor:product=='Rc Cherry'?'#4c5cc5':'white',width:120,borderWidth:0}]}
          onPress={()=>{
            setProduct('Rc Cherry')
          }}>
            <Text style={[styles.inputstext,{color:product=='Rc Cherry'?'white':'black'}]}> RC Cherry</Text>

          </TouchableOpacity>
          <TouchableOpacity style={[styles.inputStyle,{backgroundColor:product=='Arabica'?'#4c5cc5':'white',width:120,borderWidth:0}]}
          onPress={()=>{
            setProduct('Arabica')
          }}>
            <Text style={[styles.inputstext,{color:product=='Arabica'?'white':'black'}]}> Arabica</Text>

          </TouchableOpacity>
          <TouchableOpacity style={[styles.inputStyle,{backgroundColor:product=='Other'?'#4c5cc5':'white',width:120,borderWidth:0}]}
          onPress={()=>{
            setProduct('Other')
          }}>
            <Text style={[styles.inputstext,{color:product=='Other'?'white':'black'}]}> Other</Text>

          </TouchableOpacity>
          
          </View>
            
      
    
                    <Text style={styles.labels}>Total Weight</Text>
                    <TouchableOpacity style={[styles.inputStyle,{borderColor:selected=='Weight'?'#4c5cc5':'black'}]}
          onPress={()=>{
            setSelected('Weight')
          }}>
            <Text style={styles.inputstext}> {weight}</Text>

          </TouchableOpacity>
   
        <Text style={styles.labels}>OT</Text>
        <TouchableOpacity style={[styles.inputStyle,{borderColor:selected=='Ot'?'#4c5cc5':'black'}]}
          onPress={()=>{
            setSelected('Ot')
          }}>
            <Text style={styles.inputstext}> {ot}</Text>

          </TouchableOpacity>
              <Text style={styles.labels}>Moisture</Text>
              <TouchableOpacity style={[styles.inputStyle,{borderColor:selected=='Moisture'?'#4c5cc5':'black'}]}
          onPress={()=>{
            setSelected('Moisture')
          }}>
            <Text style={styles.inputstext}> {mc}</Text>

          </TouchableOpacity>
                     <Text style={styles.labels}>Final O T</Text>
                     <TouchableOpacity style={[styles.inputStyle,{borderColor:selected=='Finalot'?'#4c5cc5':'black'}]}
          onPress={()=>{
            setSelected('Finalot')
          }}>
            <Text style={styles.inputstext}> {finalot}</Text>

          </TouchableOpacity>
                            <Text style={styles.labels}>Price per bag</Text>
                            <TouchableOpacity style={[styles.inputStyle,{borderColor:selected=='Bagprice'?'#4c5cc5':'black'}]}
          onPress={()=>{
            setSelected('Bagprice')
          }}>
            <Text style={styles.inputstext}> {perbag}</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:'#4c5cc5',width:370,height:70,marginBottom:70,borderRadius:16,justifyContent:'center',alignItems:'center'}}
          onPress={()=>{
            if(name.length>0){
            const bill = {
              id:Math.floor(Date.now() / 1000),
              name: name.toUpperCase(),
              c_date:date,
              common:'a',
              product:product,
              outern:parseFloat(ot) ,
              moisture: parseFloat(mc),
              finalot:parseFloat(finalot),
              bags:parseInt(weight/50),
              Weight:parseFloat(weight),
              rate:parseInt(perbag),
              total:parseInt((perbag/50)*weight),
              beens:parseFloat(((weight/50)*finalot).toFixed(1))

            
              }
              addbill(bill)
              .then(docs=>{
                // ABC.show({name:name,product:product,bags:parseInt(weight/50).toString(),weight:weight.toString(),ot:ot.toString(),mc:mc.toString(),finalot:finalot.toString(),price:perbag.toString(),total:parseInt((perbag/50)*weight).toString()},new Date().toLocaleString())
                Alert.alert(  
                  'Alert',  
                  'Data saved Do you want to print reciept ?',
            
                  [  
                       
                      {text: 'Yes', onPress: () => {
                        ABC.show({name:name.toUpperCase(),product:product,bags:parseInt(weight/50).toString(),weight:weight.toString(),ot:ot.toString(),mc:mc.toString(),finalot:finalot.toString(),price:perbag.toString(),total:parseInt((perbag/50)*weight).toString()},new Date(date).toLocaleString()) 
      
                      }},  
                      {text: 'Cancel', onPress: () => {
                        setName('')
                        setPerbag(0)
                        setWeight(0)          
                        setOt(25)          
                        setMc(13)          
                        setFinalot(25)
                        setDate(new Date())
                      }}
                  ]  
              )
          
              })
            }else{
              alert('Enter a name')
            }
            }}

          >
<Text style={{color:'#fff',fontSize:20}}>Save</Text>
          </TouchableOpacity>



                        
        </ScrollView>
       </View>
   
        <View style={styles.container}>
        {/* Status bae here */}
        <SafeAreaView>
          <Text style={styles.value}>
            {parseFloat(state.currentValue).toLocaleString()}
          </Text>

          {/* Do create componentRow */}
          <Row>
            <Button
              text="C"
              theme="secondary"
              onPress={() => HandleTap("clear")}
            />

           

            <Button
              text="%"
              theme="secondary"
              onPress={() => HandleTap("percentage")}
            />

            <Button
              text="/"
              theme="secondary"
              onPress={() => HandleTap("operator", "/")}
            />
            <Button
              text="X"
              theme="accent"
              onPress={() => HandleTap("operator", "*")}
            />
          </Row>

          {/* Number */}
          <Row>
            <Button text="7" onPress={() => HandleTap("number", 7)} />
            <Button text="8" onPress={() => HandleTap("number", 8)} />
            <Button text="9" onPress={() => HandleTap("number", 9)} />
            <Button
              text="-"
              theme="accent"
              onPress={() => HandleTap("operator", "-")}
            />
          </Row>

          <Row>
            <Button text="4" onPress={() => HandleTap("number", 4)} />
            <Button text="5" onPress={() => HandleTap("number", 5)} />
            <Button text="6" onPress={() => HandleTap("number", 6)} />
            <Button
              text="+"
              theme="accent"
              onPress={() => HandleTap("operator", "+")}
            />
          </Row>

          <Row>
            <Button text="1" onPress={() => HandleTap("number", 1)} />
            <Button text="2" onPress={() => HandleTap("number", 2)} />
            <Button text="3" onPress={() => HandleTap("number", 3)} />
            <Button
              text="="
              theme="primary"
              onPress={() => HandleTap("equal", "=")}
            />
          </Row>

          <Row>
            <Button text="0" onPress={() => HandleTap("number", 0)} />
            <Button text="." onPress={() => HandleTap("number", ".")} />
            <Button
              text="Next"
              theme="greenish"
              
              onPress={() => {
                switch (selected) {
                  case "Bags":
                   
                    setBags(state.currentValue)
                    Handlenext('next')
                    return setSelected('Weight')

                  case "Weight":
                    setWeight(state.currentValue)
                    Handlenext('next')
                    return setSelected('Ot')
                  case "Ot":
                    setOt(state.currentValue)
                    Handlenext('next')
                    return setSelected('Moisture')
                  case "Moisture":
                    setMc(state.currentValue)
                    Handlenext('next')
                    return setSelected('Finalot')
                  case "Finalot":
                      setFinalot(state.currentValue)
                      Handlenext('next')
                      return setSelected('Bagprice');
                  case "Bagprice":
                      setPerbag(state.currentValue)
                      Handlenext('next')
                      return setSelected('Weight')
                  
                  default:
                    Handlenext('next')
                    return setSelected('bree');
                  
                }
                }
              }
            />
          </Row>
        </SafeAreaView>
      </View>
      </View>
    );
  
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
  inputStyle: {height:50,marginTop:10,marginBottom:10,padding:10,backgroundColor:'#fff',borderWidth:.5,borderRadius:5,justifyContent:'center'},
  labels:{
    color:'#000',
    fontSize:20
  },
  inputstext:{
    color:'#000',
    fontSize:18
  },
  inputStyle: {height:50,marginTop:10,marginBottom:10,padding:10,backgroundColor:'#fff',borderWidth:.5,borderRadius:5,justifyContent:'center'},
});