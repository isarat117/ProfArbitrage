import axios from "axios";

import { getKucoinDepthPromise} from './exchanges/kucoin'
import { getGateDepthPromise} from './exchanges/gate'
import { getHuobiDepthPromise} from './exchanges/huobi'
import { getMexcDepthPromise} from './exchanges/mexc'
import { getPoloniexDepthPromise} from './exchanges/poloniex'






export const getAllDepthExchanges= async(coin)=>{
  

 
   return new Promise(async(resolve, reject) => {
    const allDepth = []


        
    
    const [kucoin, huobi, gate, mexc, poloneix] = await Promise.all([
        getKucoinDepthPromise(coin).catch(() => undefined),
        getHuobiDepthPromise(coin).catch(() => undefined),
        getGateDepthPromise(coin).catch(() => undefined),
        getMexcDepthPromise(coin).catch(() => undefined),
        getPoloniexDepthPromise(coin).catch(() => undefined),
    ])
   
   
    allDepth.push(kucoin, huobi, gate, mexc, poloneix)
    const result = []
    

    for(let i =0 ; i< allDepth.length;i++){
        if(!(allDepth[i]==undefined)){
            result.push(allDepth[i])
        }
    }
 

      resolve(result);
   })

   
   
}

 