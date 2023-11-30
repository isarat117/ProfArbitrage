import {getAllDepthExchanges} from './getDepths'
import {getWithdrawFee} from './getWithdrawFee'
 

// tahtada 50 dolarlık işelm var mı diye kontral için yapılan fonsksiyon alldepth fonksioynu ile çalışacak
  export const takeAvg=(obj,coinName)=>{
    const len = obj.length

    const coinData ={
        name:coinName,
        aviableBids:0,
        aviableAsks:0
    }
    
    const aviableBids =[]
    const aviableAsks =[]

    for(let i=0; i< len; i++){
      
      
        let sum =0
        let amount =0
        for(let j =0; j<obj[i].bids.length;j++){
            const bids =  obj[i].bids
            sum +=parseFloat(bids[j][0]*bids[j][1])
            amount += parseFloat(bids[j][1])

            if(sum >= 500){
              
                aviableBids.push({
                    borsaName:obj[i].borsa,
                    sum:sum,
                    amount:amount,
                    avg:sum/amount
                })

                break;
                
            }
        }
        sum =0
        amount =0
        for(let j =0; j<obj[i].asks.length;j++){
            const asks =  obj[i].asks
            sum +=parseFloat(asks[j][0]*asks[j][1])
            amount += parseFloat(asks[j][1])

            if(sum >= 500){

              
                aviableAsks.push({
                    borsaName:obj[i].borsa,
                    sum:sum,
                    amount:amount,
                    avg:sum/amount
                })

                break;
                
            }

    }
    coinData.aviableBids= aviableBids
    coinData.aviableAsks= aviableAsks
  }

  return coinData

  }



// takeAvg fonsksiyonundan dönen veri burda kullanılacak
export const diff=(obj)=>{
    const bidsLen = obj.aviableBids.length
    const asksLen = obj.aviableAsks.length
    let  biggestPriceForSelling = obj.aviableBids[0]?.avg
    let lowerPriceForBuying = obj.aviableAsks[0]?.avg
    let minBorsa = obj.aviableBids[0]?.borsaName
    let maxBorsa = obj.aviableAsks[0]?.borsaName

   
    for(let i =0; i<bidsLen;i++){
        if(obj.aviableBids[i]?.avg >  biggestPriceForSelling){
             biggestPriceForSelling = obj.aviableBids[i]?.avg
            minBorsa =  obj.aviableBids[i]?.borsaName

        }
    }
    for(let i =0; i<asksLen;i++){
        if(obj.aviableAsks[i]?.avg < lowerPriceForBuying){
            lowerPriceForBuying= obj.aviableAsks[i]?.avg
            maxBorsa =  obj.aviableAsks[i]?.borsaName

        }
    }


    if(lowerPriceForBuying< biggestPriceForSelling){
        return {

            state:true,
            diff:( biggestPriceForSelling-lowerPriceForBuying)/lowerPriceForBuying*100,
            exchanges: [[minBorsa, lowerPriceForBuying],[maxBorsa,  biggestPriceForSelling]]

        }
    }else{
        return {
            state:false,
            diff:( biggestPriceForSelling-lowerPriceForBuying)/lowerPriceForBuying*100,
            exchanges: [[minBorsa, lowerPriceForBuying],[maxBorsa,  biggestPriceForSelling]]

        }
    }

}


const getAverage =(data)=>{

  let amount = 0
  let balance=0

   for(var i=0; i<data.length;i++){

       amount += data[i][1]/data[i][0];
       balance += data[i][1]

   }

   return balance/amount;
}

  