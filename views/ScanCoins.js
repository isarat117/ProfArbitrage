import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, View,StyleSheet,TextInput,TouchableHighlight  ,ScrollView } from 'react-native'
import { useNavigation,useFocusEffect  } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native';


import OneCoinList from './components/OneCoinList';
import { detectArbitrage } from '../src/detectArbitrage';
import {takeAvg, diff} from '../src/getCoinInfo'
import { getAllDepthExchanges } from '../src/getDepths';
import db from '../src/database'

import { getWord } from '../src/languages';



import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from "expo";







const ScanCoins =()=>{


  const navigation = useNavigation();


  

  const [data, setData] = useState([]);                //Coin data for listing
  const [size, setSize]= useState(0)                   // Size of data for writing on the screen
  const [getOkeyFromCoin, setGetOkeyFromCoin]=useState([])
  const [minPercent, setMinPercent] = useState(5);    // Min percent of coins which will listing
  const [maxPercent, setMaxPercent] = useState(10);    // Max percent of coins which will listing
  const [numOfProfitCoins, setNumOfProfitCoins] = useState(0)
  const [countOfHandle, setCountOfHandle]= useState(0)
  
  useEffect(() => {

    setStateForCoins();
  }, [data]);




  
  useFocusEffect(
    React.useCallback(() => {
    
      setNewPercents()
     
    }, [])
  );


  const setNewPercents =()=>{

   
    db.transaction(tx=>{

      tx.executeSql('CREATE TABLE IF NOT EXISTS valueForScan (minPercent TEXT, maxPercent TEXT)')
      
     
    
        tx.executeSql(`select * from valueForScan`, null,
        (txObj, resultSet) => {
          console.log(resultSet.rows.length);
      
          if (resultSet.rows.length > 0) {
            setMinPercent(resultSet.rows._array[0]?.minPercent);
            setMaxPercent(resultSet.rows._array[0]?.maxPercent);
          } else {
            setMinPercent(5);
            setMaxPercent(10);
          }
        },
        (error) => {
          console.log("Error executing SQL query:", error);
        }
      );

    })
  }




  async function setStateForCoins() {
    const array = new Array(data.length).fill(0);
    const tempQueue = []; // Geçici dizi oluşturuyoruz

    for (let i = 0; i < data.length; i++) {
      const coinName = data[i].name;

      const depthsPromise = getAllDepthExchanges(coinName); // Promise'i alıyoruz
      tempQueue.push(depthsPromise); // Promise'i geçici diziye ekliyoruz
    }

    const depthsResults = await Promise.all(tempQueue);

    depthsResults.forEach((depths, index) => {
      const diffValue = diff(takeAvg(depths));
      if (diffValue.state) {
        array[index] = 1;
      } else {
        array[index] = 2;
      }

    });

    setGetOkeyFromCoin(array); // State'i güncelliyoruz



    //  1 lerin sayısını almak için
    const onesCount = array.reduce((count, element) => {
      return count + (element === 1 ? 1 : 0);
    }, 0)

    setNumOfProfitCoins(onesCount)


  }


  const onButtonPress = () => {
    detectArbitrage(minPercent, maxPercent)
      .then((newData) => {
        setData(newData)
        setSize(newData.length)
        const array = new Array(newData.length).fill(0);
        setGetOkeyFromCoin(array)
        setCountOfHandle(countOfHandle+1)
      })
      .catch(error => console.error(error));
      
  };


  
    return(
        <View style={{backgroundColor:'#000'}}>
   
          
          <Ionicons onPress={() => navigation.navigate('Options')} style={{textAlign: 'right', marginTop:20, marginEnd:20}}  name='settings-outline' size={40} color={'#75C2F6'}/>

          <View style={{alignItems:'center'}}>
            <Text style={{color: '#7A9D54'}} >{getWord('word1')}</Text>
          
          </View>
         
      

        
          <TouchableHighlight  onPress={onButtonPress} style={{alignItems:'center', marginTop:20}}>
              <View style={styles.btn}>

                <Text style={styles.btnText} >{getWord('word2')}</Text>
                
              </View>
            </TouchableHighlight>
        

          <View style={{alignItems:'center', marginTop:20}}>
            <Text style={{ color: '#7A9D54' }}>
              {size
                ? `${size} coins loaded 🎉`
                : ''
              }
            </Text>
            <Text style={{ color: '#7A9D54' }}>
              {numOfProfitCoins
                ? `${numOfProfitCoins} coins ready for processing`
                : ''
              }
            </Text>
          </View>


     
        <View style={styles.dataFrameScreen}>
        <ScrollView >
          
          {
            // data'dan componentleri dizi olarak oluştur
            data.map((element, index) => (
              {
                key: index.toString(),
                state: getOkeyFromCoin[index],
                maxBorsa: element.maxBorsa,
                maxBorsaValue: element.maxBorsaValue,
                minBorsa: element.minBorsa,
                minBorsaValue: element.minBorsaValue,
                name: element.name,
                percentDiff: element.percentDiff,
              }
            ))
            // 1 state'ine sahip olanları önce getirerek sırala
            .sort((b, a) => b.state - a.state)
            // Diziyi tekrar componentlere dönüştür
            .map((item) => (
              <OneCoinList
                key={item.key}
                state={item.state}
                maxBorsa={item.maxBorsa}
                maxBorsaValue={item.maxBorsaValue}
                minBorsa={item.minBorsa}
                minBorsaValue={item.minBorsaValue}
                name={item.name}
                percentDiff={item.percentDiff}
              />
            ))
          }
        
        </ScrollView>
        </View>
        

      


     
    </View>
  );
}
const styles = StyleSheet.create({
 
    dataFrameScreen:{
      backgroundColor:'black',
      width:'100%',
      height:'100%',
      
    },
    btn:{
      alignItems: 'center',
      backgroundColor: '#461959',
      padding: 10,
      borderRadius:5,
      width:'80%',
      margin:10

    },
    btnText:{
      color:'white'
    },
    header: {
      flexDirection: 'row',
      backgroundColor: '#f8f8f8',
      padding: 10,
      backgroundColor:'#ccc'
    },
    row: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor:'#C8F2EF'
    },
    cell: {
      flex: 1,
      width: 120, 
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    percentDiff:{
      color:'#2EB086'
    },
    price:{
      alignItems:'baseline'
    },
     exchangeLink:{
      color:'#1C6DD0',
      fontSize:15
    },
    
  });
export default ScanCoins;