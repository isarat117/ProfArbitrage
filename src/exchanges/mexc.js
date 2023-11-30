import axios from "axios";
import CryptoJS from 'crypto-js';

const exchangeName="gate"


const  secretKey =async()=>{
  return new Promise(async(resolve, reject)=>{
    db.transaction(tx=>{
      tx.executeSql(`select * from keys where exchange ="${exchangeName}"`),null,(txObj, resultSet)=>{
         resolve(resultSet.rows._array[0].secretKey)

      }
  })
  })
}



const apiKey =async()=>{
  return new Promise(async(resolve, reject)=>{
    db.transaction(tx=>{
      tx.executeSql(`select * from keys where exchange ="${exchangeName}"`),null,(txObj, resultSet)=>{
         resolve(resultSet.rows._array[0].apiKey)

      }
  })
  })

}


export const getMexcPrices =async()=>{
    return new Promise( async(resolve, reject) => {
    const response = await axios.get(`https://www.mexc.com/open/api/v2/market/ticker`)
    data =response.data.data
    const values=[]
    for(var i= 0; i<data.length;i++){
        if(data[i].symbol.includes('_USDT') && !(

            data[i].symbol.includes('5S_') || data[i].symbol.includes('5L_') ||
            data[i].symbol.includes('4S_') || data[i].symbol.includes('4L_') ||
            data[i].symbol.includes('3S_') || data[i].symbol.includes('3L_') ||
            data[i].symbol.includes('2S_') || data[i].symbol.includes('2L_'))
        ){
            values.push({name:data[i].symbol.slice(0,-5) , value:data[i].last, bid:data[i].bid, ask:data[i].ask})

        }

    }
    console.log("mexc")
    resolve(values)
})

}


export const setMexcWithdrawFees =async()=>{
    return new Promise(async(resolve, reject) => {
      
   
    const API_KEY = await apiKey(); 
    const SECRET_KEY =await secretKey(); 
    const timestamp = Date.now().toString();
    const message = `timestamp=${timestamp}`;
    const signature = CryptoJS.HmacSHA256(message, SECRET_KEY).toString(CryptoJS.enc.Hex);
   
  
    try {
      const response = await axios.get('https://api.mexc.com/api/v3/capital/config/getall', {
        headers: {
          'X-MEXC-APIKEY': API_KEY,
        },
        params: {
          timestamp,
          signature,
        },
      });
  
      const formattedData = response.data.map(coin => ({
        exchangeName: 'MEXC',
        coinName: coin.coin,
        networks: coin.networkList.reduce((acc, network) => {
          acc[network.network] = parseFloat(network.withdrawFee);
          return acc;
        }, {}),
      }));
  
      resolve(formattedData)
    
    } catch (error) {
      console.error(1);
  
      console.error(error);
    }
  })
  }


export const getMexcDepositAndWithdraw =async()=>{
       
    
    const response  = await axios.get(`https://www.mexc.com/open/api/v2/market/coin/list?currency`)
    const data0 = response.data.data
    const values=[]

    for(var i= 0; i<data0.length;i++){
        let withdraw=false
        let  deposit=false
        let coinName = data0[i].currency
        let  data1 = response.data.data[i].coins
       

        for(var j =0; j<data1.length;j++){
            if(data1[j].is_withdraw_enabled && !withdraw){
                withdraw=true
             }
 
             if(data1[j].is_deposit_enabled && !deposit){
                 deposit=true
             }  

        }
        values.push({
            borsa_name: 'mexc',
            currency:coinName,
            deposit:deposit,
            withdraw:withdraw

        })
       
       
    }
    return values;
   
  }

  
export const getMexcDepthPromise =async(coin)=>{
    let response
    let bids  =[]
    let asks =[]

    try {
    
        response = await axios.get(`https://www.mexc.com/open/api/v2/market/depth?symbol=${coin.toUpperCase()}_USDT&depth=20`)
        
       
        for(var j =0; j<20 ; j++){          
            bids.push([response.data.data.bids[j]?.price,response.data.data.bids[j]?.quantity])
            asks.push([response.data.data.asks[j]?.price,response.data.data.asks[j]?.quantity])         
        }
    } catch (error) {
        console.log(error)
            
        } 
            
       if(bids== undefined || asks == undefined){
        resolve(undefined)
        }else{  
            
            return ({
                borsa:'mexc',
                bids:bids,
                asks:asks,
            })
        }

  
}