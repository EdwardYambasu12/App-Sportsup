import React, { useEffect, useState } from "react";
import Nav from "../nav_bar/nav";
import { Link, useLocation } from "react-router-dom";
import "./personal.css"
import Line_up from "./lineup";

function Personal(props){

    

    const [needed, setNeeded] = useState()
    const [na, setNa] = useState("ed")
    const {state} = useLocation();

    const item = state

    useEffect(()=>{
        async function load(){
        var item = await localStorage.getItem("data")
       var data = await JSON.parse(item)
        console.log(data)
        setNeeded(data)
        setNa("hi")
        return(
            <>Hello World</>
            
            )}
    },     [])

    //INFO
  

    const [lower, setLower] = useState(<Info item={item}/>)



    function information(){
        setLower(<Info item={item}/>)
    }
    
    function match_summary(){
        setLower(<Match_info item={item}/>)
    }

    function statistics(){}
    function Line_ups(){}
    function tables(){
        setLower(<Tables item={item}/>)
    }
    function h2h(){}
    function news(){}

/*
    if (holder == "stats"){
        <Stats/>
    }
    else if(holder == "news"){
        <News_game/>
    }
    else if(holder == "lineup"){
        <Line_up/>
    }
    else if(holder == "table"){
        <Table/>
    }
    else if(holder == "missing"){
        <Missing_player/>
    }
    else{
        
    }
*/

 console.log(state)

    return(
        <body>
        <>
        <Nav/>
       
       <div className="top_class">
        <Link className="btn btn-danger" to={"/"}>return home</Link>
        <hr style={{backgroundColor : "white", color : "white"}}></hr>
        <div className="main_row">
            <div style={{width : "40%"}}>
                <img src = {item.homeTeam.crest} className="team_logos"></img>
                <h4  className="text-warning">{item.homeTeam.name}</h4>
            </div>

            <div style={{display : "flex", justifyContent : "space-evenly", width : "20%"}}>
                <h1 className="text-light">{item.score.fullTime.home}</h1>
                <h1 className="text-warning" style={{marginLeft : "2%", marginRight : "2%"}}>:</h1>
                <h1 className="text-light">{item.score.fullTime.away}</h1>
            </div>

            <div id = "awaya" style={{width : "40%"}}>
                <img src = {item.awayTeam.crest} className="team_logos"></img>
                <h4 >{item.awayTeam.name}</h4>
            </div>


        </div>

           
        <div>
                <h2 className="text-center text-light">{item.status}</h2>
              </div>


      
        </div>

        <div className="short_nav">
            <button className="btn" onClick={()=>information()}>Info</button>
            <button className="btn" onClick={()=>match_summary()}>Summary</button>
            <button className="btn" onClick={()=>statistics()}>Stats</button>
            <button className="btn" onClick={()=>Line_ups()}>Line_ups</button>
            <button className="btn"onClick={()=>tables()}>Table</button>
            <button className="btn"onClick={()=>h2h()}>H2H</button>
            <button className="btn" onClick={()=>news()}>News</button>
        </div>

        {lower}
        </>
        </body>
    )
}



function Info(props){



    const item = props.item
    console.log(props.item)
    let mapper = item.referees.map((item)=>{
            return(
                <>
                    <h2>name : {item.name}</h2>
                    <h3>nationality : {item.nationality}</h3>
                    <h3 className="text-danger">{item.type}</h3>
                    <hr></hr>
                </>
            )
    })
    return(

       
  
          <div className="info_div">
        <>
            <h1>MATCH INFO</h1>

          
            <h3>Referees: </h3>
            <div className="ref_box">
            {mapper}
     

            </div>
            <hr></hr>
            <br></br>
         
            <h3>Venue:</h3>
            <h1 className="text-warning">{item.venue}</h1>
    
            <h4>Attendance:</h4>
        </>
        </div>

    )
}

function Match_info(props){

  let api = 
        {
            "area": {
                "id": 2045,
                "name": "Chile",
                "code": "CHL",
                "flag": null
            },
            "competition": {
                "id": 2048,
                "name": "Primera División",
                "code": "CPD",
                "type": "LEAGUE",
                "emblem": null
            },
            "season": {
                "id": 1102,
                "starthate": "2022-02-06",
                "endDate": "2022-11-30",
                "currentMatchday": 13,
                "winner": null,
                "stages": [
                    "REGULAR_SEASON"
                ]
            },
            "id": 392181,
            "utcDate": "2022-05-17T00:30:00Z",
            "status": "FINISHED",
            "minute": "90",
            "injuryTime": 5,
            "attendance": null,
            "venue": null,
            "matchday": 13,
            "stage": "REGULAR_SEASON",
            "group": null,
            "lastUpdated": "2022-05-17T17:49:28Z",
            "homeTeam": {
                "id": 4465,
                "name": "CDP Curicó Unido",
                "shortName": "Curicó",
                "tla": "CUR",
                "crest": "https://crests.football-data.org/4465.svg",
                "coach": {
                    "id": 104512,
                    "name": "Damian Munoz",
                    "nationality": "Chile"
                },
                "leagueRank": 6,
                "formation": "4-3-3",
                "lineup": [
                    {
                        "id": 111099,
                        "name": "Fabián Cerda",
                        "position": "Goalkeeper",
                        "shirtNumber": 12
                    },
                    {
                        "id": 46409,
                        "name": "Matías Cahais",
                        "position": "Centhe-Back",
                        "shirtNumber": 3
                    },
                    {
                        "id": 23433,
                        "name": "Yerko Leiva",
                        "position": "Attacking Midfield",
                        "shirtNumber": 10
                    },
                    {
                        "id": 28306,
                        "name": "Agustín Nadruz",
                        "position": "Defensive Midfield",
                        "shirtNumber": 5
                    },
                    {
                        "id": 123230,
                        "name": "Mario Sandoval",
                        "position": "Centhal Midfield",
                        "shirtNumber": 8
                    },
                    {
                        "id": 23602,
                        "name": "Ronald De La Fuente",
                        "position": "Left-Back",
                        "shirtNumber": 19
                    },
                    {
                        "id": 23467,
                        "name": "Franco Bechtholdt",
                        "position": "Centhe-Back",
                        "shirtNumber": 16
                    },
                    {
                        "id": 17210,
                        "name": "Juan Pablo Gómez",
                        "position": "Right-Back",
                        "shirtNumber": 15
                    },
                    {
                        "id": 138242,
                        "name": "Bayron Oyarzo",
                        "position": "Right Winger",
                        "shirtNumber": 11
                    },
                    {
                        "id": 59028,
                        "name": "Rodrigo Holgado",
                        "position": "Centhe-Forward",
                        "shirtNumber": 9
                    },
                    {
                        "id": 28427,
                        "name": "Diego Coelho",
                        "position": "Centhe-Forward",
                        "shirtNumber": 27
                    }
                ],
                "bench": [
                    {
                        "id": 129935,
                        "name": "Tomás Vergara",
                        "position": null,
                        "shirtNumber": 1
                    },
                    {
                        "id": 23758,
                        "name": "José Rojas",
                        "position": "Centhe-Back",
                        "shirtNumber": 13
                    },
                    {
                        "id": 23466,
                        "name": "Diego Urzúa",
                        "position": "Centhal Midfield",
                        "shirtNumber": 6
                    },
                    {
                        "id": 23627,
                        "name": "Felipe Fritz",
                        "position": "Left Winger",
                        "shirtNumber": 7
                    },
                    {
                        "id": 60772,
                        "name": "Federico Castho",
                        "position": "Left Winger",
                        "shirtNumber": 20
                    },
                    {
                        "id": 168037,
                        "name": "Joaquin Gonzalez",
                        "position": "Right Winger",
                        "shirtNumber": 14
                    },
                    {
                        "id": 167922,
                        "name": "Martin Miguel Cortes",
                        "position": null,
                        "shirtNumber": 17
                    }
                ]
            },
            "awayTeam": {
                "id": 4455,
                "name": "Audax CS Italiano",
                "shortName": "Audax Italiano",
                "tla": "AUD",
                "crest": "https://crests.football-data.org/4455.svg",
                "coach": {
                    "id": 23574,
                    "name": "Juan Ribera",
                    "nationality": "Chile"
                },
                "leagueRank": 12,
                "formation": "3-5-2",
                "lineup": [
                    {
                        "id": 23817,
                        "name": "Álvaro Salazar",
                        "position": "Goalkeeper",
                        "shirtNumber": 13
                    },
                    {
                        "id": 23545,
                        "name": "Fabián Torres",
                        "position": "Centhe-Back",
                        "shirtNumber": 5
                    },
                    {
                        "id": 23408,
                        "name": "Pablo Alvarado",
                        "position": "Centhe-Back",
                        "shirtNumber": 32
                    },
                    {
                        "id": 23530,
                        "name": "Roberto Cereceda",
                        "position": "Left-Back",
                        "shirtNumber": 28
                    },
                    {
                        "id": 23524,
                        "name": "Fernando Cornejo",
                        "position": "Centhal Midfield",
                        "shirtNumber": 8
                    },
                    {
                        "id": 23694,
                        "name": "Matías Sepúlveda",
                        "position": "Left Midfield",
                        "shirtNumber": 17
                    },
                    {
                        "id": 23522,
                        "name": "Osvaldo Bosso",
                        "position": "Right-Back",
                        "shirtNumber": 4
                    },
                    {
                        "id": 1130,
                        "name": "Tomás Andrade",
                        "position": "Attacking Midfield",
                        "shirtNumber": 35
                    },
                    {
                        "id": 23557,
                        "name": "Bryan Figueroa",
                        "position": "Right Winger",
                        "shirtNumber": 19
                    },
                    {
                        "id": 23843,
                        "name": "Luis Riveros",
                        "position": "Right Winger",
                        "shirtNumber": 11
                    },
                    {
                        "id": 168002,
                        "name": "Nikolas Aedo",
                        "position": null,
                        "shirtNumber": 20
                    }
                ],
                "bench": [
                    {
                        "id": 118809,
                        "name": "Tomás Ahumada",
                        "position": "Goalkeeper",
                        "shirtNumber": 12
                    },
                    {
                        "id": 23553,
                        "name": "Diego Torres",
                        "position": "Left-Back",
                        "shirtNumber": 6
                    },
                    {
                        "id": 23543,
                        "name": "Nicolás Fernández",
                        "position": "Right-Back",
                        "shirtNumber": 7
                    },
                    {
                        "id": 140227,
                        "name": "Alfred Canales",
                        "position": "Defensive Midfield",
                        "shirtNumber": 22
                    },
                    {
                        "id": 179039,
                        "name": "Marlon Carrasco",
                        "position": "Midfield",
                        "shirtNumber": 23
                    },
                    {
                        "id": 23667,
                        "name": "Michael Fuentes",
                        "position": "Left Winger",
                        "shirtNumber": 27
                    },
                    {
                        "id": 23826,
                        "name": "German Estigarribia",
                        "position": "Centhe-Forward",
                        "shirtNumber": 21
                    }
                ]
            },
            "score": {
                "winner": "HOME_TEAM",
                "duration": "REGULAR",
                "fullTime": {
                    "home": 4,
                    "away": 1
                },
                "halfTime": {
                    "home": 2,
                    "away": 1
                }
            },
            "goals": [
                {
                    "minute": 14,
                    "injuryTime": null,
                    "type": "REGULAR",
                    "team": {
                        "id": 4465,
                        "name": "CDP Curicó Unido"
                    },
                    "scorer": {
                        "id": 59028,
                        "name": "Rodrigo Holgado"
                    },
                    "assist": null,
                    "score": {
                        "home": 1,
                        "away": 0
                    }
                },
                {
                    "minute": 21,
                    "injuryTime": null,
                    "type": "REGULAR",
                    "team": {
                        "id": 4465,
                        "name": "CDP Curicó Unido"
                    },
                    "scorer": {
                        "id": 138242,
                        "name": "Bayron Oyarzo"
                    },
                    "assist": null,
                    "score": {
                        "home": 2,
                        "away": 0
                    }
                },
                {
                    "minute": 38,
                    "injuryTime": null,
                    "type": "PENALTY",
                    "team": {
                        "id": 4455,
                        "name": "Audax CS Italiano"
                    },
                    "scorer": {
                        "id": 1130,
                        "name": "Tomás Andrade"
                    },
                    "assist": null,
                    "score": {
                        "home": 2,
                        "away": 1
                    }
                },
                {
                    "minute": 62,
                    "injuryTime": null,
                    "type": "REGULAR",
                    "team": {
                        "id": 4465,
                        "name": "CDP Curicó Unido"
                    },
                    "scorer": {
                        "id": 138242,
                        "name": "Bayron Oyarzo"
                    },
                    "assist": null,
                    "score": {
                        "home": 3,
                        "away": 1
                    }
                },
                {
                    "minute": 80,
                    "injuryTime": null,
                    "type": "REGULAR",
                    "team": {
                        "id": 4465,
                        "name": "CDP Curicó Unido"
                    },
                    "scorer": {
                        "id": 28306,
                        "name": "Agustín Nadruz"
                    },
                    "assist": null,
                    "score": {
                        "home": 4,
                        "away": 1
                    }
                }
            ],
            "penalties": [
                {
                    "player": {
                        "id": 1130,
                        "name": "Tomás Andrade"
                    },
                    "team": {
                        "id": 4455,
                        "name": "Audax CS Italiano"
                    },
                    "scored": "thue"
                },
                {
                    "player": {
                        "id": 1130,
                        "name": "Tomás Andrade"
                    },
                    "team": {
                        "id": 4455,
                        "name": "Audax CS Italiano"
                    },
                    "scored": "thue"
                }
            ],
            "bookings": [],
            "substitutions": [],
            "odds": {
                "homeWin": null,
                "draw": null,
                "awayWin": null
            },
            "referees": []
       
      }








    const item = props.item


      let goals_map = api.goals.map((item)=>{

        if(item.team.name === api.homeTeam.name){
            console.log("home goal", item.team.name, item.minute)
            if (item.type == "REGULAR"){

            return(
                
                
                <div id="main-left">
                    <h4>  {item.scorer.name} {item.minute}'⚽</h4>

                </div>
            )
        }
        else if(item.type =="PENALTY"){
            
            return(
            
                <div id="main-left">
                    <h4>  {item.scorer.name} {item.minute}'⚽ </h4>
                    <h5 id = "pen">pen</h5>
                </div>)
        }
    }
        
        else{
              if (item.type == "REGULAR"){

            return(
                
                
                <div id="main">
                    <h4>  {item.scorer.name} {item.minute}'⚽</h4>

                </div>
            )
        }
        else if(item.type =="PENALTY"){
            
            return(
            
                <div id="main">
                    <h4>  {item.scorer.name} {item.minute}'⚽ </h4>
                    <h5 id = "pen">pen</h5>
                </div>)
        }
        }
        
      })


   let bookings_map = api.bookings.map((item)=>{

      })

    let  substitutions = api.substitutions.map((item)=>{
        
      })







      return(

<body className="container">
    <h4 className="text-center text-secondary">Goals</h4>
        {goals_map}
        <h4 className="text-center text-secondary">bookings</h4>
        {bookings_map}

        <h4 className="text-center text-secondary">substitutions</h4>
        {substitutions}
 </body>

      )




}



function Tables(props){

    const [map, setMap] = useState([])
    const [main, setMain] = useState()
    const [group, setGroup] = useState([])
    let pointer = props.item
    async function fetcher(){
        const item = await fetch("http://localhost:6100/trial")
        const des = await item.json()
       console.log(des)
        des.map((item)=>{
            console.log(item.competition.name)
        })
        setMain(
            des.find((item)=> item.competition.name == pointer.competition.name)
        )
        console.log(main)
        console.log(pointer)
        console.log()

       
    
    
        
    

    }
fetcher()
let vice = main

if (pointer.stage == "REGULAR_SEASON"){
    console.log("regular season")
  console.log(vice)

}

else if(pointer.season.stage == "GROUP_STAGE"){
setGroup(
    main.standings.find((item)=> item.group == pointer.season.group)
)

setMap(group.table.map(
    (item)=>{
return(
    <tr>
        <td>{item.position}</td>
        <td>{item.team.name}</td>
        <td>{item.playedGames}</td>
        <td>{item.goalDifference}</td>
        <td>{item.points}</td>
    </tr>
)
 } ))

}


    return(
        <body>
            <table>
                <caption>{pointer.competition.name}</caption>
                <tr>
                    <th>POS</th>
                    <th>TEAMS</th>
                    <th>PLD</th>
                    <th>GD</th>
                    <th>PTS</th>
                </tr>

                
                    {map}
                
            </table>
        </body>
    )
}

export default Personal