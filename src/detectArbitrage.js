import {getKucoinPrices, getKucoinDepositAndWithdraw} from './exchanges/kucoin' 
import {getGatePrices, getGateDepositAndWithdraw} from './exchanges/gate' 
import {getHuobiPrices, getHuobiDepositAndWithdraw} from './exchanges/huobi' 
import {getMexcPrices, getMexcDepositAndWithdraw} from './exchanges/mexc' 
import {getPoloniexPrices, getPoloneixDepositAndWithdraw} from './exchanges/poloniex' 

export const detectArbitrage = async (minPercent, maxPercent) => {
    const firstDate = new Date();

    return new Promise(async(resolve, reject) => {


        // Fetching data
        const [kucoinPrices, gatePrices, mexcPrices, huobiPrices, poloneixPrices, kucoinWalletStatus, gateWalletStatus, mexcWalletStatus, huobiWalletStatus, poloneixWalletStatus] = await Promise.all([
            getKucoinPrices(),
            getGatePrices(),
            getMexcPrices(),
            getHuobiPrices(),
            getPoloniexPrices(),


            getKucoinDepositAndWithdraw(),
            getGateDepositAndWithdraw(),
            getMexcDepositAndWithdraw(),
            getHuobiDepositAndWithdraw(),
            getPoloneixDepositAndWithdraw()

        ]);



        const secondDate = new Date();

        console.log((secondDate-firstDate)/1000, " saniye verilerin gelmesi sürdü");



        const sendArrForTradeStatus =(exchangeName)=>{
            if(exchangeName =='kucoin')
            {
                return 1

            }else if(exchangeName =='gate')
            {
                return gatePrices

            }else if(exchangeName =='mexc')
            {
                return mexcPrices

            }else if(exchangeName =='huobi')
            {
                return huobiPrices

            }else if(exchangeName =='poloneix')
            {
                return poloneixPrices

            }

        }


        const sendArrForWalletStatus =(exchangeName)=>{
            if(exchangeName =='kucoin')
            {
                return kucoinWalletStatus

            }else if(exchangeName =='gate')
            {
                return gateWalletStatus

            }else if(exchangeName =='mexc')
            {
                return mexcWalletStatus

            }else if(exchangeName =='huobi')
            {
                return huobiWalletStatus

            }else if(exchangeName =='poloneix')
            {
                return poloneixWalletStatus

            }

        }


        



 


        //Updated for optimization
        const kucoinPricesMap = new Map(kucoinPrices.map(item => [item.name, item.value]));
        const gatePricesMap = new Map(gatePrices.map(item => [item.name, item.value]));
        const mexcPricesMap = new Map(mexcPrices.map(item => [item.name, item.value]));
        const huobiPricesMap = new Map(huobiPrices.map(item => [item.name, item.value]));
        const poloneixPricesMap = new Map(poloneixPrices.map(item => [item.name, item.value]));

        const names = [...new Set([...kucoinPricesMap.keys(), ...gatePricesMap.keys(), ...mexcPricesMap.keys(), ...huobiPricesMap.keys(), ...poloneixPricesMap.keys()])];

        let result = [];
        for (let name of names) {
            let values = [
                { name: 'kucoin', value: kucoinPricesMap.get(name) },
                { name: 'huobi', value: huobiPricesMap.get(name) },
                { name: 'gate', value: gatePricesMap.get(name) },
                { name: 'mexc', value: mexcPricesMap.get(name) },
                { name: 'poloneix', value: poloneixPricesMap.get(name) },
            ].filter(item => item.value !== undefined);

            if (values.length < 2) continue;

            values.sort((a, b) => a.value - b.value);

            let min = values[0].value;
            let max = values[values.length - 1].value;
            let percentDifference = (max - min) / min * 100;

            if (percentDifference >= minPercent && percentDifference <= maxPercent) {
                if(isAviableForTransfer(name,sendArrForWalletStatus(values[0].name),sendArrForWalletStatus(values[values.length - 1].name))){
                    if(isAviableForTrade(name,sendArrForTradeStatus(values[0].name),sendArrForTradeStatus(values[values.length - 1].name))){

                result.push({
                    name: name,
                    minBorsa: values[0].name,
                    maxBorsa: values[values.length - 1].name,
                    minBorsaValue: values[0].value,
                    maxBorsaValue:values[values.length - 1].value,
                    percentDiff: getPercentDiff(values[0].value,values[values.length - 1].value).toFixed(2),
                    minBorsaLink:setLink(name,values[0].name),
                    maxBorsaLink:setLink(name, values[values.length - 1].name)
                });
                    }
                }
            }
        }
        const lastDate = new Date();
        console.log((lastDate-firstDate)/1000, " saniye sürdü");

        resolve(result);
    });
};






const isAviableForTransfer =(coinName, minExchange, maxExchange)=>{

    let minExchangeWithdraw = false
    let maxExchangeDeposit = false
    for(let i = 0; i<minExchange.length; i++){
        if(minExchange[i].currency == coinName)
        {
            minExchangeWithdraw = minExchange[i].withdraw
        }
    }

    for(let i = 0; i<maxExchange.length; i++){
        if(maxExchange[i].currency == coinName)
        {
            maxExchangeDeposit = maxExchange[i].deposit
        }
    }

    return minExchangeWithdraw && maxExchangeDeposit

}



const isAviableForTrade =(coinName, minExchange, maxExchange)=>{

   let minExchangeAsk = 0
   let maxExchangeBid = 0


   if((minExchange || maxExchange) == 1)
   {
    return true
   }
    for(let i = 0; i<minExchange.length; i++){
        if(minExchange[i].name == coinName)
        {
            minExchangeAsk = minExchange[i]?.ask
        }
    }

    for(let i = 0; i<maxExchange.length; i++){
        if(maxExchange[i].name == coinName)
        {
            maxExchangeBid = minExchange[i]?.bid
        }
    }

    return    maxExchangeBid > minExchangeAsk

}


const setLink =(coin,borsa)=>{
    if(borsa==="kucoin")
    {
        return `https://www.kucoin.com/trade/${coin.toUpperCase()}-USDT`
    }
    if(borsa==="gate")
    {
        return `https://www.gate.io/trade/${coin.toUpperCase()}_USDT`
        
    }
    if(borsa==="mexc")
    {
        return `https://www.mexc.com/exchange/${coin.toUpperCase()}_USDT?_from=search_spot_trade`
    }
    if(borsa==="huobi")
    {
        return `https://www.huobi.com/en-us/exchange/${coin.toLowerCase()}_usdt/`
    }
    if(borsa==="poloneix")
    {
        return `https://poloniex.com/trade/${coin.toUpperCase()}_USDT?type=spot`
    }


 }



const getPercentDiff=(sayi1, sayi2)=> {
    var fark = Math.abs(sayi1 - sayi2);
    var yuzdeFarki = (fark / sayi1) * 100;
    return yuzdeFarki;
  }