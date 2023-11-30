import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet,TouchableHighlight} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import db from '../src/database'
import Seperator from './components/Seperator';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';

import { NativeModules } from "react-native";
import { getWord } from '../src/languages';

const languages ={
    tr:'Türkçe',
    en: "English",
    es: "Español",
    fr: "Français",
    cs: "Česky",
    de: "Deutsch",
    zh: "中文",
    id: "endonesian",
    it: "Italiano",
    ja: "日本語",
    ko: "한국어",
    pt: "Português",
    ru: "россия",
    uk: "український",
    bg: "български",
}


const SetLanguage=()=>{

    const navigation = useNavigation();
    const [lang, setLang] = useState('en')
    const [activeIndex, setActiveIndex] = useState(0)





    const langArr = Object.keys(languages)


    useEffect(()=>{

        db.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS activeLang (lang TEXT)')
            
        },(error)=>{
          console.log(error)
        });


        db.transaction(tx=>{
            tx.executeSql(`select * from activeLang`,null,(txObj, resultSet)=>{
                if(resultSet.rows.length === 0){
                    tx.executeSql(`INSERT INTO activeLang (lang )VALUES( '${lang}')`)
                  }else{
                   setLang(resultSet.rows._array[0].lang)
                   console.log(resultSet.rows)
                  }
            })
            
        },(error)=>{
          console.log(error)
        });
    },[])


    const handleChange =()=>{
      
        db.transaction(tx=>{
            tx.executeSql(`DELETE FROM activeLang`)
            tx.executeSql(`INSERT INTO activeLang (lang )VALUES( '${lang}')`)
            console.log(lang)
          
          

        })

      
        NativeModules.DevSettings.reload();

    }



    return(
        <View style={{  backgroundColor:'#000'}}>
             <Ionicons style={{marginTop:30, marginLeft:10, marginBottom:30, width:40}} color={'white'} onPress={() => navigation.navigate('Options')} name='arrow-back-outline' size={40}/> 

             <View style={{marginBottom:150}}>
               
             <ScrollView style={{marginBottom:100}}>
                {
                    langArr.map((lan, index)=>(
                       
                        <TouchableHighlight 
                        key={index}
                        underlayColor="transparent"
                        style={styles.oneLang} 
                        onPress={()=>setLang(lan)}
                        >
                            <>

                            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:25}}>

                                <Text  style={{  color:'white'}}>{languages[lan]}</Text>
                                {
                                    lan === lang
                                    ?(
                                        < View style={{justifyContent:'center', alignItems:'center'}}>
                                            <Ionicons name='checkmark-outline' size={23} color={'#068FFF'}/>
                                        </View>
                                    ):''
                                }
                                
                            </View>
                            <Seperator/>
                            </>
                         
                        </TouchableHighlight>
                       
                    ))
                }

                    <TouchableHighlight underlayColor="transparent"  onPress={handleChange} style={{alignItems:'center', marginTop:20}}>
                        <View style={styles.btn}>  
                             <Text style={styles.btnText} >{getWord('word13')}</Text>
                        
                        </View>
                    </TouchableHighlight>
                </ScrollView>
              

             </View>


        </View>
    )
}

const styles = StyleSheet.create({
    oneLang:{
    backgroundColor:'#000',
        padding:20,
      
    },
    btn:{
        alignItems: 'center',
        backgroundColor: '#461959',
        padding: 10,
        borderRadius:10,
        width:'80%',
        margin:10,
        height:50,
        alignItems:'center'
  
      },
      btnText:{
        color:'white'
      }
})


export default SetLanguage;