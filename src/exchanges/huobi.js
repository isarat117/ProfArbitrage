import axios from "axios";

const exchangeName="huobi"


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


export const getHuobiPrices = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.huobi.pro/market/tickers`);
            const data = response.data.data;

            const values = [];
            for(let i = 0; i < data.length; i++) {
                if(data[i].symbol.endsWith('usdt')) {
                    values.push({name: data[i].symbol.slice(0, -4).toUpperCase(), value: String(data[i].close), bid: data[i].bid, ask: data[i].ask});
                }
            }
            console.log("huobi")
            resolve(values);
        } catch(error) {
            reject(error);
        }
    });
}


export const getHuobiDepositAndWithdraw = async () => {
    const response = await axios.get('https://api.huobi.pro/v2/reference/currencies');
    const data = response.data.data;
    const values = [];
    let withdraw=false
    let deposit= false

    for (const item of data) {
        for(let i = 0; i<item.chains.length; i++){
            if(item.chains[i].depositStatus==="allowed")
            {
                deposit=true
            }
            if(item.chains[i].withdrawStatus==="allowed")
            {
                withdraw=true
            }


        }
      values.push({
        borsa_name: 'huobi',
        currency: item.currency,
        deposit: deposit,
        withdraw: withdraw,
      });
    }
    return values;
};


export const setHuobiWithdrawFees = async () => {
    return new Promise(async(resolve, reject) => {
      try {
        
     
    const baseURL = 'https://api.huobi.pro/v2/reference/currencies';
  
    const response = await axios.get(`${baseURL}`);
    const currencies = response.data.data;
  
    let formattedDataArray = [];
  
    currencies.forEach(item => {
        let networks = {};
        item.chains.forEach(chainItem => {
            networks[chainItem.displayName.toUpperCase()] = chainItem.transactFeeWithdraw;
        });
        formattedDataArray.push({
            exchangeName: "huobi",
            coinName: item.currency.toUpperCase(),
            networks
        });
    });
    resolve(formattedDataArray)
  } catch (error) {
        console.log(4)
  }
  
  })
  
  }


  export const getHuobiDepthPromise =async(coin)=>{
    return new Promise(async(resolve, reject) => {
     try {  
         const response = await axios.get(`https://api.huobi.pro/market/depth?symbol=${coin.toLowerCase()}usdt&type=step0&depth=20`);
         const bids = response.data.tick?.bids;
         const asks = response.data.tick?.asks;
       
         if(bids== undefined || asks == undefined){
 
        resolve(undefined)
         }else{
             resolve({
                 borsa: 'huobi',
                 bids: bids,
                 asks: asks,
               })
         }
     
         
         } catch (error) {
             resolve(undefined)
                 
         }
    })
    
     
 }