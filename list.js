import React, { Component,useState,useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View,FlatList,TextInput,Keyboard,TouchableOpacity, } from "react-native";
import Button from "./components/Button";
import Row from "./components/Row";
import calculator, { initialState } from "./util/calculator";
import Bill from "./components/bill";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ABC from './components/PrintModule'
import {addbill,SearchRc,ViewRc} from './model/bill_schema';
import Loader from './loader';
import { Searchbar } from 'react-native-paper';
import Filterdates from './filterdates';

// create class component of App
export default function App({navigation}) {
    const [data, setdata] = useState([]);
    const [searchText, setSearchQuery] = useState('');
    const [weight, setweight] = useState(0);
    const [ep, setep] = useState(0);
    const [total, setTotal] = useState(0);
    const [commonltr, setCommonltr] = useState('a');
    const [Totalweight, setTotalweight] = useState(0);
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [open, setopen] = useState(false);
    const onChangeSearch = (query) => {
        setSearchQuery(query)
        if(query){
            searchdata(query)
        }else{
            getdata(query)
        }
    };
  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true) 
    getdata()
  }, []);

  async function getdata(){
    setLoading(true) 

    var dar = await ViewRc(startDate,endDate)
    setdata(dar.data)
    setweight(dar.weight)
    setep(dar.ep)
    setTotal(dar.total)
    setTotalweight(dar.Totalweight)
    setLoading(false) 

  }
  const filteredData = commonltr ? data.filter(x =>
    x.common.toLowerCase().includes(commonltr.toLowerCase())
    ):data

    async function searchdata(query){
        setLoading(true) 
    
        var dar = await SearchRc(startDate,endDate,query)
        setdata(dar.data)
        setweight(dar.weight)
        setep(dar.ep)
        setTotal(dar.total)
        setTotalweight(dar.Totalweight)
        setLoading(false) 
    
      }
  // render method

    return (
      <View style={{flexDirection:'row',width:'100%',height:'100%'}}>
                               <Loader loading={loading} navigation={navigation} />
                               <Filterdates open={open} startDate={startDate} endDate={endDate} setopen={setopen} setendDate={setendDate} setstartDate={setstartDate} getdata={getdata}/>

        <Bill navigation={navigation} />
        <View style={{height:'100%',width:'90%',padding:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:'#000',fontSize:20,margin:5,fontWeight:'bold'}}>Rc Bills </Text>
                <Text style={{color:'#000',fontSize:18,margin:5,}}>From - {startDate.toDateString()} - To - {endDate.toDateString()} </Text>

            </View>
            
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{width:250,height:100,backgroundColor:'#f1f1f1',borderRadius:16,alignItems:'center',justifyContent:'space-evenly',padding:10}}>
                    <Text style={{fontWeight:'bold',fontSize:18,color:'#000'}}>Total Kg </Text>
                    <Text style={{fontWeight:'bold',fontSize:18,color:'#000'}}>{Totalweight.toFixed(1)}</Text>
                </View>
                <View style={{width:250,height:100,backgroundColor:'#f1f1f1',borderRadius:16,alignItems:'center',justifyContent:'space-evenly',padding:10}}>
                    <Text style={{fontWeight:'bold',fontSize:18,color:'#000'}}>Settlement Kg </Text>
                    <Text style={{fontWeight:'bold',fontSize:18,color:'#000'}}>{weight.toFixed(1)}</Text>
                </View>
                <View style={{width:250,height:100,backgroundColor:'#f1f1f1',borderRadius:16,alignItems:'center',justifyContent:'space-evenly',padding:10}}>
                <Text style={{fontWeight:'bold',fontSize:18,color:'#000'}}>Total Ep</Text>

                <Text style={{fontWeight:'bold',fontSize:18,color:'#000'}}>{ep.toFixed(1)}</Text>
                </View>
                <View style={{width:250,height:100,backgroundColor:'#f1f1f1',borderRadius:16,alignItems:'center',justifyContent:'space-evenly',padding:10}}>
                <Text style={{fontWeight:'bold',fontSize:18,color:'#000'}}>Total Amount</Text>
                <Text style={{fontWeight:'bold',fontSize:18,color:'#000'}}>{total}</Text>

                </View>
            </View>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
            <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchText}
      style={{width:480}}
    />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity style={{backgroundColor:'#4c5cc5',width:100,height:40,justifyContent:'center',alignItems:'center',borderRadius:13,marginRight:20}}
                onPress={()=>{
                    setopen(true)
                }}>
                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>
                            Filter dates
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'#4c5cc5',width:150,height:40,justifyContent:'center',alignItems:'center',borderRadius:13,marginRight:20}}>
                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>
                            Print Report
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#4c5cc5',width:150,height:40,justifyContent:'center',alignItems:'center',borderRadius:13,marginRight:20}} 
                    onPress={()=>{
                        navigation.navigate('Rcstorage')
                    }}>
                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>
                        Storage Report
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#4c5cc5',width:100,height:40,justifyContent:'center',alignItems:'center',borderRadius:13}}
                    onPress={getdata}>
                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>
                        Refresh
                        </Text>
                    </TouchableOpacity>
                    </View>

            </View>
              <View style={{flexDirection:'row',margin:15}}>
                    <Text style={{color:'#000',fontSize:18,width:80}}>Index</Text>
                  
                  <Text style={{color:'#000',fontSize:18,width:80}}>Final Ot</Text>
                  <Text style={{color:'#000',fontSize:18,width:130}}>Expected Ep</Text>

                  <Text style={{color:'#000',fontSize:18,width:240}}>Name of the seller</Text>
                  <Text style={{color:'#000',fontSize:18,width:80}}>Bags</Text>
                  <Text style={{color:'#000',fontSize:18,width:120}}>Total weight</Text>

                  <Text style={{color:'#000',fontSize:18,width:100}}>Per bag</Text>
                  <Text style={{color:'#000',fontSize:18,width:150}}>Total</Text>
                  <Text style={{color:'#000',fontSize:18,width:90}}>Edit</Text>

              </View>

              <FlatList
                data={filteredData}
                extraData={filteredData}
                
                renderItem={({ item,index }) => (
    
                    <View style={{flexDirection:'row',margin:15 }}>
                    <Text style={{color:'#000',fontSize:18,width:80}}>{index+1}</Text>
                 
                  <Text style={{color:'#000',fontSize:18,width:80}}>{item.finalot.toFixed(2)}</Text>
                  <Text style={{color:'#000',fontSize:18,width:130}}>{item.beens.toFixed(1)}</Text>
                  <Text style={{color:'red',fontSize:18,width:240}}>{item.name}</Text>

                  <Text style={{color:'#000',fontSize:18,width:80}}>{item.bags}</Text>
                  <Text style={{color:'#000',fontSize:18,width:120}}>{item.Weight.toFixed(1)}</Text>

                  <Text style={{color:'#000',fontSize:18,width:100}}>{item.rate}</Text>
                  <Text style={{color:'#000',fontSize:18,width:150}}>{item.total}</Text>

                  <View style={{justifyContent:'space-between',flexDirection:'row',width:90}}>
                  <TouchableOpacity onPress={()=>{
                          ABC.show({name:item.name,product:'RC Cherry',bags:parseInt(item.Weight/50).toString(),weight:item.Weight.toString(),ot:item.outern.toString(),mc:item.moisture.toString(),finalot:item.finalot.toString(),price:item.rate.toString(),total:parseInt((item.rate/50)*item.Weight).toString()},new Date(item.c_date).toLocaleString())
                      }}>
                      <Icon 
                                    name="printer" 
                                    color={'#000'}
                                    size={30}
                                    />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                          navigation.navigate('Editcoffeebill',{id:item.id})
                      }}>
                      <Icon 
                                    name="playlist-edit" 
                                    color={'#000'}
                                    size={30}
                                    />
                      </TouchableOpacity>
                     
                  </View>

              </View>
        )}
         keyExtractor={(item, univname) => univname.toString()}/>

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