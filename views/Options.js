import React, {useState, useEffect} from 'react'
import  {View,TextInput,StyleSheet, Text,TouchableHighlight} from 'react-native'


import db from '../src/database'

import {Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import Seperator from './components/Seperator';
import { getWord } from '../src/languages';




const Options =()=>{

  const navigation = useNavigation();
  const [lenOfValue, setLenOfValue] = useState(0)
  const [minPercent, setMinPercent] = useState('');    // Min percent of coins which will listing
  const [maxPercent, setMaxPercent] = useState('');    // Max percent of coins which will listing

    useEffect(()=>{
    
      

   
        db.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS valueForScan (minPercent TEXT, maxPercent TEXT)')
            
        },(error)=>{
          console.log(error)
        });

        db.transaction(tx=>{
         
            tx.executeSql('Select * from valueForScan',null,
            (txObj, resultSet)=>{
              if(resultSet.rows.length > 0){
                setMinPercent(resultSet.rows._array[0].minPercent)
                setMaxPercent(resultSet.rows._array[0].maxPercent)
                setLenOfValue(resultSet.rows.length)
              }else{
                tx.executeSql(`INSERT INTO valueForScan (minPercent, maxPercent )VALUES(${minPercent}, ${maxPercent})`)
              }
            },
            (txObj, error)=>{ console.log(error)}
            )
        })

    },[])

    const setNewPercents =()=>{
     
        db.transaction(tx=>{
         
            if(lenOfValue==0){
            tx.executeSql(`INSERT INTO valueForScan (minPercent, maxPercent )VALUES(${minPercent}, ${maxPercent})`,null,
            (txObj, resultSet)=>{
              
                setLenOfValue(resultSet.rows.length)
              
            },
            (txObj, error)=>{ console.log(error)}
            )
            }else{
                tx.executeSql('select * from valueForScan',null,
                (txObj, resultSet)=>{
                   
                  tx.executeSql(`update valueForScan set   minPercent =${minPercent}, maxPercent=${maxPercent}  where minPercent= ${resultSet.rows._array[0].minPercent}`, null,(txObj, resultSet)=>{
                   
                  },(txObj,error)=>{
                    console.log(error)
                  })
                  tx.executeSql(`select * from valueForScan`, null,(txObj, resultSet)=>{
                   
                  },(txObj,error)=>{
                    console.log(error)
                  })
                },
                (txObj, error)=>{ console.log(error)}
                )
            }
        })
    }


   
    return(
        <View style={{height:'100%', backgroundColor:'#000'}}>
           <Ionicons style={{marginTop:30, marginLeft:10, marginBottom:30, width:40}} color={'white'} onPress={() => navigation.navigate('Tabs')} name='arrow-back-outline' size={40}/> 
          <View style={styles.optionsFilter}>
            
            <View style={styles.optionsInputs}>
           
            <Text style={styles.optionsInputsText}>MIN:</Text>
            <TextInput
              style={[styles.inputMin]}
              value={minPercent}
              onChangeText={setMinPercent}
              placeholder="Min Percent"
              keyboardType="numeric"
            />
            <Text style={styles.optionsInputsText}>MAX:</Text>

            <TextInput
              style={styles.inputMax}
              value={maxPercent}
              onChangeText={setMaxPercent}
              placeholder="Max Percent"
              keyboardType="numeric"
            />

            

          </View>
        
          
             <TouchableHighlight underlayColor="transparent" onPress={setNewPercents} style={{alignItems:'center', marginTop:20}}>
              <View style={styles.btn}>

                <Text style={styles.btnText} >{getWord('word3')}</Text>
                
              </View>
            </TouchableHighlight>
           
            <View style={styles.activeFilterBox}>
              <Text style={styles.activeFilterText}>{getWord('word4')} {minPercent}</Text>
              <Text style={styles.activeFilterText}>{getWord('word5')}{maxPercent}</Text>
            </View>

          </View>
          <View style={styles.optionParametres}>

               
                <Seperator/>
                <TouchableHighlight underlayColor="transparent" style={styles.optionParametre} onPress={() => navigation.navigate('SetApiKeys')}>
                <>
                  <View style={{flexDirection:'row'}}>
                  <Ionicons name='bookmark-outline'  size={20} color={'white'} />
                  <Text style={styles.optionParametreText}>
                    {getWord('word6')}
                  </Text>
                  </View>
                  <Ionicons name='chevron-forward-outline' size={20} color={'white'}/>
                  </>
                </TouchableHighlight>
                <Seperator/>



                <TouchableHighlight underlayColor="transparent" style={styles.optionParametre} onPress={() => navigation.navigate('SetLanguage')}>
                <>
                  <View style={{flexDirection:'row'}}>
                  <Ionicons name='language-outline'  size={20}  color={'white'}/>
                  <Text style={styles.optionParametreText} >
                    {getWord('word7')}
                  </Text>
                  </View>
                  <Ionicons name='chevron-forward-outline' size={20} color={'white'}/>
                  </>
                </TouchableHighlight>
                <Seperator/>

          </View>
          


         
    
        
        </View>
    )
}
const styles = StyleSheet.create({
      optionsInputs:{
        flexDirection:'row',
        justifyContent:'space-around'
      },
      optionsInputsText:{
        fontWeight:'bold',
         marginTop:5,
         fontSize:20,
         color:'white'

      },
      inputMin: {
        width:'30%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'gray',
        borderRadius:5
      },
      inputMax: {
        width:'30%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius:5,
        backgroundColor:'gray',
    
      },
      activeFilterBox:{
        justifyContent:'space-around',
        flexDirection:'row'
      },
      activeFilterText:{
        fontWeight: 'bold',
        color:'white'
      }, 
      btn:{
        alignItems: 'center',
        backgroundColor: '#461959',
        padding: 10,
        borderRadius:5,
        width:'80%',
        margin:10
  
      },
      optionParametres:{
        marginTop:25,
        paddingTop:14,
      },
      optionParametre:{
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between'
        
      },
      optionParametreText:{
        fontSize:15,
        fontWeight:'bold',
        marginLeft:20,
        color:'white'
      },
      btnText:{
        color:'white'
      }


})
export default Options;