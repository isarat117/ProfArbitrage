import {setKucoinWithdrawFees} from './exchanges/kucoin'
import {setGateWithdrawFees} from './exchanges/gate'
import {setHuobiWithdrawFees} from './exchanges/huobi'
import {setMexcWithdrawFees} from './exchanges/mexc'
import {setPoloneixWithdrawFees} from './exchanges/poloniex'



export const getWithdrawFee = async()=>{

    return new Promise(async(resolve, reject) => {
      try {
        
      
    const fees = []
    
    const[mexcFee,gateFee, huobiFee, poloneixFee, kucoinFee]=await Promise.all([
        setMexcWithdrawFees(),
        setGateWithdrawFees(),
        setHuobiWithdrawFees(),
        setPoloneixWithdrawFees(),
        setKucoinWithdrawFees()
    ])
  
    fees.push(mexcFee,gateFee, huobiFee, poloneixFee,kucoinFee)
   resolve(fees)
  } catch (error) {
    console.log(error)
  }
  })
  
  }
  
  
  
  
  const getPercentFromString =()=>{
    let sum = 0;
    const regex = /\b\d+%?\b/g; // bu regex, string içindeki %'li ve %'siz sayıları yakalar
    const found = str.match(regex);
  
    if (found) {
      for (let percentage of found) {
  
        let number = parseFloat(percentage.replace('%', '')); // '%' işaretini kaldır ve sayıya dönüştür
        sum += number;
        
      }
    }
  
    return sum;
  }
  