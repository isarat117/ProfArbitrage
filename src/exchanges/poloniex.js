import axios from "axios";

const exchangeName="poloniex"




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

export const setPoloneixWithdrawFees = async () => {
    return new Promise(async(resolve, reject) => {
      try {
        
     
  
    const baseUrl = 'https://poloniex.com/public?command=returnCurrencies';
  
    const response = await axios.get(baseUrl);
    const currencies = response.data;
  
    let formattedDataArray = [];
  
    for(let coin in currencies){
        let coinDetails = {
            exchangeName: "poloneix",
            coinName: coin.toUpperCase(),
            networks: {}
        };
        coinDetails.networks[currencies[coin].blockchain] = currencies[coin].txFee;
        formattedDataArray.push(coinDetails);
    }
  resolve(formattedDataArray)
  } catch (error) {
        console.log(5)
  }
  })
   
  }



  
export const getPoloniexDepthPromise = async(coin) => {


    let response
    let bids
    let asks

    return new Promise(async(resolve, reject) => {
        try {
            response = await axios.get(`https://api.poloniex.com/markets/${coin.toUpperCase()}_USDT/orderBook`)
            
           bids = response.data?.bids
           asks = response.data?.asks
        } catch (error) {
          resolve(undefined)
        }

        console.log("bids:  ",bids)
        console.log("asks:  ",asks)
    
            
            if(bids== undefined || asks == undefined){
        
               return 1
            }else{
                resolve({
                    borsa: 'poloniex',
                    bids: bids.map(bid => [parseFloat(bid[0]), parseFloat(bid[1])]),
                    asks: asks.map(ask => [parseFloat(ask[0]), parseFloat(ask[1])]),
                })
            }
           
        
       
    })
    
    
   
}


export const getPoloniexPrices = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.poloniex.com/markets/ticker24h`);
            const data = response.data;

            const values = [];
            for(let symbol in data) {
            
                if(data[symbol].symbol.endsWith('_USDT')) {
                    values.push({
                        name:data[symbol].symbol.slice(0,-5), // USDT_ kelimesini kaldır
                        value: (data[symbol].close),
                        bid: (data[symbol].bid),
                        ask: (data[symbol].ask)
                    });
                }
            }
           
            resolve(values);
        } catch(error) {
            reject(error);
        }
    });
}


export const getPoloneixDepositAndWithdraw =async ()=> {
    const res = await axios.get('https://api.poloniex.com/currencies');
    const data = res.data;
    const values = []
  
    let len = data.length 
    for(let i = 0; i< len ; i++){
     
  
      values.push({
          borsa_name: 'poloneix',
          currency: Object.keys(data[i])[0],
          deposit: data[i][Object.keys(data[i])[0]]?.walletDepositState ==="ENABLED",
          withdraw: data[i][Object.keys(data[i])[0]]?.walletWithdrawalState ==="ENABLED",
        })
    }
    return(values)
  
  }
  
