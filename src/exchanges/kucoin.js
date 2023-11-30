import axios from "axios";


const exchangeName="kucoin"

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




export const getKucoinDepositAndWithdraw =async()=>{
    const values = []
    const response  = await axios.get(`https://api.kucoin.com/api/v1/currencies`)
    const data = response.data.data
    for(var i= 0; i<data.length;i++){
      values.push({
        borsa_name: 'kucoin',
        currency:data[i].currency,
        deposit:data[i].isDepositEnabled,
        withdraw:data[i].isWithdrawEnabled

      })
        
       
       
    }
   
    return values
    
}


export const getKucoinPrices =async ()=> 
{
    return new Promise( async(resolve, reject) => {
    const values = [];
    const object =await axios.get(`https://api.kucoin.com/api/v1/prices?base=usd`) 

    for (const prop in object.data.data) {
        values.push({ name: prop, value: object.data.data[prop] });
    }
    console.log("kucoin")
  resolve(values)
})
  
}


export const setKucoinWithdrawFees = async(coin) => {
    return new Promise(async(resolve, reject) => {
      
   try {
    
  
    const response = await axios.get(`https://api.kucoin.com/api/v2/currencies/${coin}`);
    const chains = response.data.data?.chains;
  
    let coinDetails = {
        exchangeName: "kucoin",
        coinName: coin.toUpperCase(),
        networks: {}
    };
  
    for(let i = 0; i< chains?.length; i++){
        coinDetails.networks[chains[i]?.chainName?.toUpperCase()] = chains[i].withdrawalMinFee;
    }
    resolve(coinDetails)
  } catch (error) {
    console.log(error)
  }
  })
   
  }



export const getKucoinDepthPromise =async(coin)=>{
   

    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios.get(`https://api.kucoin.com/api/v1/market/orderbook/level2_20?symbol=${coin.toUpperCase()}-USDT`)
            const bids = response.data.data?.bids
            const asks = response.data.data?.asks
            if(bids == null || asks == null){
        
               resolve(undefined)
            }else{

               resolve({
                    borsa:'kucoin',
                    bids:bids,
                    asks:asks,
                })
            
            }
         
           
            } catch (error) {
                resolve(undefined)
            }
            
        
    })
 
  
}