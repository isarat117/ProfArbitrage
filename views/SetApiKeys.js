import { useState } from "react";
import { View, Text, StyleSheet,TextInput,TouchableHighlight  } from "react-native"
import {Picker} from "@react-native-picker/picker"
import {Ionicons} from '@expo/vector-icons'



import { useNavigation } from '@react-navigation/native';
import db from "../src/database";

import { getWord } from "../src/languages";






const SetApiKeys =()=>{

    const [apiKey , setApiKey]= useState('')
    const [secretKey , setSecretKey]= useState('')
    const [exchange, setExchange] = useState("gate");


    const [updateWarnHandler, setUpdateWarnHandler] =useState(0);

    
    const navigation = useNavigation()


    const setKeys=()=>{
       
        db.transaction(tx=>{
            
            tx.executeSql('CREATE TABLE IF NOT EXISTS keys (apiKey TEXT, secretKey TEXT, exchange TEXT)')
           
        },(error)=>{
          console.log(error)
        });

        db.transaction(tx => {
            console.log("sasddd");
            tx.executeSql(
                `SELECT exchange FROM keys WHERE exchange = ?`,
                [exchange],
                (txObj, resultSet) => {
                    console.log(resultSet);
                    if (resultSet.rows.length === 0) {
                        tx.executeSql(
                            `INSERT INTO keys (apiKey, secretKey, exchange) VALUES (?, ?, ?);`,
                            [apiKey, secretKey, exchange],
                            (_, result) => {
                              setUpdateWarnHandler(1)
                            },
                            (_, error) => {
                                console.log("INSERT error:", error);
                            }
                        );
                    } else {
                        tx.executeSql(
                            `UPDATE keys SET apiKey = ?, secretKey = ? WHERE exchange = ?;`,
                            [apiKey, secretKey, exchange],
                            (_, result) => {
                               setUpdateWarnHandler(1)
                            },
                            (_, error) => {
                                console.log("UPDATE error:", error);
                            }
                        );
                    }
                },
                (txObj, error) => {
                    console.log("SELECT error:", error);
                }
            );
        }, (error) => {
            console.log("Transaction error:", error);
        });
        
    }
    
    return(
        <View style={{marginTop:20,alignItems:'center',backgroundColor:'#000',height:'100%'}}>
            <View style={{flexDirection:'row', marginTop:20,width:'100%', justifyContent:'space-between'}}>
                <Ionicons color={'white'}  onPress={() => navigation.navigate('Options')} name='arrow-back-outline' size={40}/>
            </View>

            <Text style={{ fontSize:20, color:'white'}}>{getWord('word8')} </Text>
            <Picker
                selectedValue={exchange}
                style={{ height: 50, width: 150, backgroundColor:'gray',marginTop:15}}
                onValueChange={(itemValue, itemIndex) => setExchange(itemValue)}
            >
                <Picker.Item label="gate" value="gate" />
                <Picker.Item label="kucoin" value="kucoin" />
                <Picker.Item label="poloniex" value="poloniex" />
                <Picker.Item label="mexc" value="mexc" />
                <Picker.Item label="huobi" value="huobi" />
            </Picker>

            <TextInput
              style={[styles.apiKeyInput]}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder={getWord('word9')}
             
            />
            <TextInput
            style={[styles.apiKeyInput]}
            value={secretKey}
            onChangeText={setSecretKey}
            placeholder={getWord('word10')}
            
           />
           

          <TouchableHighlight  onPress={setKeys} style={{alignItems:'center', marginTop:20}}>
            <View style={styles.btn}>  
              <Text style={styles.btnText} >{getWord('word11')}</Text>
              
            </View>
          </TouchableHighlight>

          {updateWarnHandler ==1
              ?
              (<Text> {
               getWord('word12')
              } </Text>)
              :''
            }
           
          
           
        </View>
    )
}

const styles = StyleSheet.create({

    apiKeyInput:{
        width:'90%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'gray',
        borderRadius:5,
        marginTop:30

    },
    btn:{
        alignItems: 'center',
        backgroundColor: '#461959',
        padding: 10,
        borderRadius:5,
        width:'100%',
        margin:10
      },
      btnText:{
        color:'white'
      }
})

export default SetApiKeys;