import React,{useState} from 'react';
import { Text, View,TextInput,StyleSheet,TouchableOpacity,ScrollView,Modal } from 'react-native';
import DateRangePicker from "react-native-daterange-picker";
import moment from "moment";

export default function Addbus(props) {
    const [displayedDate, setdisplayedDate] = useState(moment());
  const {open,navigation,startDate,endDate,setopen,setendDate,setstartDate,getdata, ...attributes} = props;

  
  return (
    <DateRangePicker
    onChange={(dates)=>{
        if(dates.startDate){
              setstartDate(new Date(dates.startDate))
              getdata()
        }else if(dates.endDate){
          setendDate(new Date(dates.endDate))
          getdata()
          setopen(false)
          getdata()
        }else{
            if(dates.startDate&&dates.endDate){
                setstartDate(new Date(dates.startDate))
                setendDate(new Date(dates.endDate))
                getdata()
                }
                
        }
        if(dates.displayedDate){
          setdisplayedDate(dates.displayedDate)
        }
 
   

    }}
    endDate={endDate}
    startDate={startDate}
    displayedDate={displayedDate}
    range
    open={open}
      > 
<Text></Text>
</DateRangePicker>  
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor:'#000',
    borderWidth:1,
    width:'90%',
    alignSelf:'center',
    borderRadius:10
  },
  text: {
        left:'4%',
     },
     extra_button: {
    height:50,
    left:'5%',
      backgroundColor: '#253B8A',
      borderRadius: 10,
      marginTop:10,
      justifyContent: 'center',
      alignItems: 'center',
      width:'90%',
  },

  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 400,
    width: '80%',
    borderRadius: 16,
    padding:20,
    display: 'flex',
    justifyContent: 'space-around',
  },
 
})