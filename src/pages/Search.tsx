import React, { useState, useEffect, useMemo } from "react";
import { IonHeader, IonPage, IonContent, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { Link, useHistory } from "react-router-dom";
import axios from "axios"

import link from "../components/components/nav/details.js"


function Search() {

    const [searchText, setSearchText] = useState('');
    const navigate = useHistory()
    const [tack, setTack] = React.useState()
    const Line = link 

  const handleSearch = (event) => {
    setSearchText(event.target.value);


  };

useEffect(()=>{




    async function reload(){

      console.log(Line, searchText)
      try{
        const fetcher = await sessionStorage.getItem("league_data")
          const parser = await JSON.parse(fetcher)
          


      


          const searcher_raw = await axios.get(Line+"/search", {
            params : {
              term : searchText
            }
          })
          const searcher = searcher_raw.data
          console.log(searcher, "search_return")



          setTack(
                  searcher[0].suggestions.map((item)=>{

                    var stat 
                    

                    if(item.type == "player"){
                      var stat = <div onClick = {()=>{navigate.push("player/"+item.id);const stringer = JSON.stringify(item); sessionStorage.setItem("selected_league", stringer)}} style = {{display : "flex", width : "100%", marginTop : "3%", height : "50px",  justifyContent : "space-between", alignItems : "center",}}>
                                  <div style = {{width : "90%", height : "100%", alignItems : "center", display : "flex", justifyContent : "space-between"}}><h6 >{item.name}</h6> <img src = {"https://images.fotmob.com/image_resources/playerimages/"+item.id+".png"} style = {{width : "30px", height : "30px"}}></img> </div>
                                </div>
                    }

                    else if(item.type == "team"){
                      var stat = <div onClick = {()=>{navigate.push("team/"+item.id);const stringer = JSON.stringify(item); sessionStorage.setItem("selected_league", stringer)}} style = {{display : "flex", width : "100%", marginTop : "3%", height : "50px",  justifyContent : "space-between", alignItems : "center",}}>
                                  <div style = {{width : "90%", height : "100%", alignItems : "center", display : "flex", justifyContent : "space-between"}}><h6 >{item.name}</h6> <img src = {"https://images.fotmob.com/image_resources/logo/teamlogo/"+item.id+"_xsmall.png"} style = {{width : "30px", height : "30px"}}></img> </div>
                                </div>
                    }

                    else if(item.type == "league"){
                      var stat = <div onClick = {()=>{navigate.push("leauges/"+item.id);const stringer = JSON.stringify(item); sessionStorage.setItem("selected_league", stringer)}} style = {{display : "flex", width : "100%", marginTop : "3%", height : "50px",  justifyContent : "space-between", alignItems : "center",}}>
                                  <div style = {{width : "90%", height : "100%", alignItems : "center", display : "flex", justifyContent : "space-between"}}><h6 >{item.name}</h6> <img src = {"https://images.fotmob.com/image_resources/logo/leaguelogo/"+item.id+".png"} style = {{width : "30px", height : "30px"}}></img> </div>
                                </div>
                    }

                          return(
                                <div>{stat}</div>     
                            )
                  }
            )


                  )
      }
catch(e){
  console.log(e)
}
          

    }

    reload()

},[handleSearch])

  return (

    <IonContent color = "primary">
      <IonToolbar color = "tertiary">
        <IonTitle color = "secondary">Sportsup</IonTitle>
      </IonToolbar>
      <IonToolbar color = "tertiary" style = {{color : `var(--ion-color-secondary)`}}>
            <IonSearchbar
            color = "primary"

        value={searchText}
        style = {{color : `var(--ion-color-secondary)`}}
        onIonInput={handleSearch}
        placeholder="Search for Players Teams and Leagues"
      />
        {tack}
      </IonToolbar>
    </IonContent>
  
  );
}
export default Search;