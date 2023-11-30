import { Button, FlatList, Text, View,StyleSheet,Pressable,Linking ,useWindowDimensions ,ScrollView, AppRegistry } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const OneCoinList =({maxBorsa, maxBorsaValue, minBorsa, minBorsaValue, name, percentDiff, state })=>{


    
    // for navigation
    const navigation = useNavigation();
    const handleCoinPress = () => {
      navigation.navigate('CoinDetails', { name });
    };

    const fixNumber =(num)=>{
        return Number(num).toFixed(5)
    }


    const setBackgroundColor = (durum)=>{
        if(durum == 2 ){
            return '#FF1E00'
        }else if(durum==1){
            return '#16FF00'
        }else{
            return '#00337C'
        }
    }

    return(
        <View style ={styles.box}>
            <View style={styles.flexing}>

                <View  style={styles.minBorsaStyle}>
                    <Text style={[styles.gen, styles.minBorsaName,]}>{minBorsa}</Text>
                    <Text style={[styles.gen, styles.minBorsaPrice,]}>{fixNumber(minBorsaValue)}</Text>
                </View>
                
                <View style={styles.coin}>
                    <Pressable onPress={handleCoinPress}>
                    <Text style={[styles.gen,styles.coinName,]}>{name?.toUpperCase()}</Text>
                    <Text style={[styles.gen,styles.diff, ]}>%{percentDiff}</Text>
                    </Pressable>
                </View>

                <View style={styles.maxBorsaStyle}>
                    <Text style={[styles.gen, styles.maxBorsaName,]}>{maxBorsa}</Text>
                    <Text style={[styles.gen, styles.maxBorsaPrice,]}>{fixNumber(maxBorsaValue)}</Text>
                    <View  style={[styles.state, {backgroundColor:setBackgroundColor(state)}]}>
                       
                    </View>
                </View>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    box:{
        marginStart:'5%',
        padding:20,
        marginTop: 30,
        backgroundColor:'#2B2730',
        color:'#2B2730',
        width:'90%',
        height:150,
        borderRadius:20,
        alignItems:'center',
            
    },
    flexing:{
        flex:1,
        flexDirection:'row',
    },  
    gen:{
        color:'#EEEDED',
        fontSize:15,
        flex:1,
      
    },
    minBorsa:{
        flex:1,
        alignItems:'center',
    }, 
    coin:{
        paddingTop:'5%',
        flex:1,
        alignItems:'center'
        
    },
    coinName:{
        color:'#000000',
        fontSize:20,
        fontWeight: 'bold',
    },
    diff:{
        color:'#16FF00'
    },
    maxBorsa:{
        
        flex:1,
        
    },
    state:{
        width:20,
        height:20,
        borderRadius:10,
      
    },
    
})
export default OneCoinList