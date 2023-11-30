import React, { useEffect, useState } from 'react';
import {  Text, View,StyleSheet,TextInput,TouchableHighlight } from 'react-native'
import {takeAvg, diff} from '../src/getCoinInfo'

import { getAllDepthExchanges } from '../src/getDepths';
import { getWord } from '../src/languages';


/* to do:
ui for exchange order book info
get withdraw info 



*/
const CoinDetails =({route})=>{
 
    const [allDepths, setAllDepths] = useState([])
    const [diffValue, setDiffValue] = useState({ })
    const [coinName, setCoinName] = useState('')
    useEffect(()=>{

        setCoinName(route?.params?.name)
    },[route])

    const consoling =async()=> {
        const depths = await getAllDepthExchanges(coinName)
        setDiffValue(diff(takeAvg(depths)))
    }






    
    const fixNumber =(num)=>{
        return Number(num).toFixed(6)
    }
   

    return(

      <View style={{width:'100%', height:'100%', backgroundColor:'#000'}}>
        <View style={{width:'100%'}}>
            <View style={{alignItems:'center'}}>
            <TextInput
            style= {styles.input}
            value={coinName}
            onChangeText={setCoinName}
            placeholder={getWord('word14')}
            keyboardType='default'

            />
           
                <TouchableHighlight  onPress={consoling} style={[styles.btn]}>
                <View style={styles.btn}>

                    <Text style={styles.btnText} >{getWord('word15')}</Text>
                    
                </View>
                </TouchableHighlight>
            </View>

            <View >

            {
                diffValue.state ? 
                (
                    <View style={styles.exchanges}>
                    <View style={styles.minExchange}>
                        <View style={{alignItems:'center', width:'100%'}}>
                            <Text style={styles.minExchangeText}>{getWord('word18')}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginVertical:15}}>
                             <Text style={[styles.exchangeInfo]}>
                               {getWord('word16')}
                            </Text>
                            <Text style={{   color:'white'}}>
                            {diffValue?.exchanges[0][0]}
                            </Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.currencyInfo}>
                            {getWord('word17')}
                            </Text>
                            <Text style={{   color:'white'}}>
                            {fixNumber(diffValue?.exchanges[0][1])}
                            </Text>
                        </View>
                       
                    </View>
    
                    <View style={styles.verticalSeperator}></View>
    
                    <View style={styles.maxExchange}>
                        <View style={{alignItems:'center', width:'100%'}}>
                            <Text style={styles.maxExchangeText}>{getWord('word19')}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginVertical:15}}>
                            <Text style={[styles.exchangeInfo]}>
                            {getWord('word16')}
                            </Text>
                            <Text style={{   color:'white'}}>
                            {diffValue?.exchanges[1][0]}
                            </Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                             <Text style={styles.currencyInfo}>
                            {getWord('word20')}
                            </Text>
                            <Text style={{   color:'white'}}>
                            {fixNumber(diffValue?.exchanges[1][1])}
                            </Text>
                        </View>          
                    </View>
            </View>
                
                )
                :''
            }


            {diffValue.diff ?
              (<Text style={{color:'white', margin:15}}> {
              diffValue.diff > 0
              ? `${diffValue.diff} ${getWord('word21')}`
              : `${diffValue.diff} ${getWord('word22')}`
              } </Text>)
              :''
            }

   
            </View>
            <View style={[styles.withdrawInfo, { padding:10}]}>
                <Text style={{color:'red',fontSize:20, marginTop:30}}>{getWord('word23')}</Text>
                <Text style={{color:'#61677A',fontSize:18, marginTop:30}}>{getWord('word24')}</Text>
            </View>


        </View>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        width:'80%',
        marginTop: 40,
        height: 40,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'#9E9FA5',
        borderRadius:5,
     
      },
      btn:{
        alignItems: 'center',
        backgroundColor: '#461959',
        borderRadius:5,
        width:'80%',
        margin:10
  
      },
      exchanges:{
        flexDirection:'row',
        height:200,
        width:'100%',
        backgroundColor:'#000'
       
      },
      minExchange:{
      margin:15,
        flex:1

    },
      verticalSeperator:{
        width:1,
        backgroundColor:'#61677A',
       
      },
      maxExchange:{
        flex:1,
        margin:15,
     

      },
      maxExchangeText:{
        color:'red',
        
      },
      minExchangeText:{
        color:'#16FF00',
      },
      currencyInfo:{
        fontWeight:'bold',
        color:'gray'

      },
      exchangeInfo:{
        fontWeight:'bold',
        color:'gray'

      },
      btnText:{
        color:'white'
      }

})

export default CoinDetails;