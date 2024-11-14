import React, { useState, useEffect, useMemo } from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import axios from "axios"

import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import link from "../components/components/nav/details.js"
const Leagues = () => {
const Line = link


 const [allLeagues, setAllLeagues] = useState([]);
  const [followedLeagues, setFollowedLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useHistory();
  const [users, setUser] = useState()
useEffect(()=>{



  async function bless(){
    try{
      const data = await axios.get(Line+"/all_leagues")
      
        const la = data.data.international[0].leagues

          const linkd = await JSON.stringify(data.data)
      //    console.log(linkd)
          await sessionStorage.setItem("league_",linkd)

      
        

          var monk = []




      data.data.countries.map((item)=>{
              
              item.leagues.map((id)=>{

                  monk.push(id)
              })
            
      })

        data.data.popular.map((item)=>{
              
              

                  monk.push(item)
            
            
      })
        console.log(monk, "monk")
        setLoading(true);
      const raw_data = await sessionStorage.getItem("league_data");

      const leagues = monk
      setAllLeagues(monk)
      if (leagues) {
        const user_data = JSON.parse(localStorage.getItem("data"));
        const response = await axios.get(`${Line}/users`);
        if(user_data != null){
        const user = response.data.find(u => u.email === user_data.email);

        if (user) {
          setFollowedLeagues(user.favorite_league.map(item => JSON.parse(item)));
          setUser(user)
        }
      } else {

      }
    }



      setLoading(false);


        }

        catch(e){
          console.log(e)
        }

      }

      bless()

      }, [])
  



  useEffect(() => {
    const fetchLeagues = async () => {
          };

    fetchLeagues();
  }, []);

  const toggleFollowLeague = async(leagueId, leagueName) => {
    const isFollowing = followedLeagues.some(league => league.id === leagueId);
    const updatedFollowedLeagues = isFollowing
      ? followedLeagues.filter(league => league.id !== leagueId)
      : [...followedLeagues, allLeagues.find(league => league.id === leagueId)];

    setFollowedLeagues(updatedFollowedLeagues);


      if(isFollowing === false){

                const monk = {
        id : leagueId,
        name : leagueName,
              }

      const league = JSON.stringify(monk)
   
    const place = {
      id_: users._id,
      league_id: league,
    };

              console.log(users)

              await fetch(`${Line}/favorite_league`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(place),
    });
   
  };
      

if(isFollowing === true){

         const monk = {
        id : leagueId,
        name : leagueName,
              }

      const league = JSON.stringify(monk)
   
    const place = {
      id_: users._id,
      league_id: league,
    };

              console.log(users)

              await fetch(`${Line}/favorite_league_remove`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(place),
    });
    
  };

      
      }
 
  


  return(
  <>
    <IonHeader>
      <IonToolbar style = {{color :  `var(--ion-color-secondary)`,}}color = "tertiary">
        <IonTitle>Leagues</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent color = "primary">
      <div
        
      >
            <>
            <div style={{ width: "98%", margin: "1%",  marginTop : "7%", borderRadius: "10px", color :  `var(--ion-color-secondary)`, background: `var(--ion-color-tertiary)` }}>
              <strong style={{ textDecoration: "bold" }}>Following</strong>
              {followedLeagues.map(league => (
                <div key={league.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3%" }}>
                  <div onClick={() => navigate.push("/leauges/"+league.id)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <img src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${league.id}.png`} style={{ width: "25px", height: "20px", borderRadius: "50%" }} alt="League Logo" />
                    <h6>{league.name}</h6>
                  </div>
                  <button className = "btn btn-light" onClick={() => toggleFollowLeague(league.id, league.name)} style={{ background: "#EEEEEE", height: "30px" }}>
                    <strong>Unfollow</strong>
                  </button>
                </div>
              ))}
            </div>
           
            <div style={{ width: "98%", margin: "1%",  marginTop : "7%", borderRadius: "10px", color :  `var(--ion-color-secondary)`,  background: `var(--ion-color-tertiary)` }} >
              <strong style={{ textDecoration: "bold" }}>All Competitions</strong>
              {allLeagues.map(league => (
                <div key={league.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3%" }}>
                  <div onClick={() => navigate.push("/leauges/"+league.id)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <img src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${league.id}.png`} style={{ width: "25px", height: "20px", borderRadius: "50%" }} alt="League Logo" />
                    <h6>{league.name}</h6>
                  </div>
                  <button className = "btn btn-light" onClick={() => toggleFollowLeague(league.id, league.name)} style={{ background: "#EEEEEE", height: "30px" }}>
                    <strong>{followedLeagues.some(l => l.id === league.id) ? "Unfollow" : "Follow"}</strong>
                  </button>
                </div>
              ))}
            </div>
          </>
      </div>
    </IonContent>
  </>
);}

export default Leagues;