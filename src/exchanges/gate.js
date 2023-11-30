import axios from "axios";
import CryptoJS from 'crypto-js';
import db from "../database";



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



export const getGatePrices =async()=>{
    return new Promise( async(resolve, reject) => {
    const response = await axios.get(`https://api.gateio.ws/api/v4/spot/tickers`)
    data = response.data
    const values = []
    for(var i=0 ; i<data.length;i++){
        if(data[i].currency_pair.endsWith('_USDT') && !(

            data[i].currency_pair.includes('5S_') || data[i].currency_pair.includes('5L_') ||
            data[i].currency_pair.includes('4S_') || data[i].currency_pair.includes('4L_') ||
            data[i].currency_pair.includes('3S_') || data[i].currency_pair.includes('3L_') ||
            data[i].currency_pair.includes('2S_') || data[i].currency_pair.includes('2L_'))){
            values.push({name:data[i].currency_pair.slice(0,-5), value:data[i].last, bid:data[i].highest_bid, ask:data[i].lowest_ask})
        }
    }
    console.log("gate")
   
    resolve(values)
   
})
}


export const getGateDepthPromise =async(coin)=>{
    let response
    let bids
    let asks
return new Promise(async(resolve, reject) => {
    try {
    
         response = await axios.get(`https://api.gateio.ws/api/v4/spot/order_book?currency_pair=${coin}_USDT&limit=20`)
                
         bids = response.data?.bids
         asks = response.data?.asks
        } catch (error) {
            resolve(undefined)
        
}
      
        if(bids== undefined || asks == undefined){
            
     
            resolve(undefined)
        }else{
                resolve({
                    borsa:'gate',
                    bids:bids,
                    asks:asks,
                })
        }

       
                
       
            
               
})
         
   
}


export const getGateDepositAndWithdraw =async()=>{
       
    const response  = await axios.get(`https://api.gateio.ws/api/v4/spot/currencies/`)
    const data = response.data
    const values =[]
    for(var i=0; i<data.length; i++){
        values.push({
            borsa_name: 'gate',
            currency:data[i].currency,
            deposit:!data[i].deposit_disabled,
            withdraw:!data[i].withdraw_disabled

        })
    }
    return values
    
}  

export const setGateWithdrawFees = async () => {

    return new Promise(async(resolve, reject) => {
      
   try {
    
  
    const host = 'https://api.gateio.ws';
    const prefix = '/api/v4';
    const method = 'GET';
    const url = '/wallet/withdraw_status';
    const queryParam = '';
    const bodyParam = '';
  
    const timestamp = Math.floor((Date.now() + 60) / 1000).toString();
   
    const bodyHash = CryptoJS.SHA512(bodyParam).toString();
  const signString = `${method}\n${prefix}${url}\n${queryParam}\n${bodyHash}\n${timestamp}`;
  const sign = CryptoJS.HmacSHA512(signString, await secretKey()).toString();
  
    const config = {
        headers: {
            'KEY':await apiKey(),
            'SIGN': sign,
            'Timestamp': timestamp
        },
        params: {
            ...queryParam
        }
    }
    const response = await axios.get(`${host}${prefix}${url}`, config)
  
    let formattedDataArray = [];
  
    response.data.forEach(item => {
        let networks = {};
        if (item.withdraw_fix_on_chains) {
            for (let chain in item.withdraw_fix_on_chains) {
                networks[chain.toUpperCase()] = item.withdraw_fix_on_chains[chain];
            }
        } else {
            networks[item.name.toUpperCase()] = item.withdraw_fix;
        }
        formattedDataArray.push({
            exchangeName: "gate",
            coinName: item.currency.toUpperCase(),
            networks
        });
        
    });
   resolve(formattedDataArray)
  } catch (error) {
    console.log(2)
    console.log(error)
  }
  })
   
  }