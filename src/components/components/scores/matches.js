import React, { useState, useEffect } from "react";
import "./matches.css"
import { Link } from "react-router-dom";

function Matches(){

    var pl = []
    const la = []
    const wc =[]
    const cl = []
    const coli = []
    const bl = []
    const sa = []
    const l1 = []
    const pd = []
    const cs = []
    const ecs = []
    const ed = []
    const plg = []
    const cbsa = []
    
    const[Premier_Leaguea, setPremier_League] = useState()
    const [Laliga, setLaliga] = useState()
    const [WORLD_CUP, setWORLD_CUP]= useState()
    const [Championship, setChampionship] = useState()
    const [Seria_A, setSeria_A] = useState()
    const [Bundesliga, setBundeslig] = useState()
    const [Ligue1, setLigue1] = useState()
    const [ECS, setECS] = useState()
    const [ED, setED] = useState()
    const [PLG, setPLG] = useState()
    const [CBSA, setCBSA] =  useState()
    const [COLI, setCOLI] = useState()
    const [CL, setCL] = useState()
    const [PD, setPD]= useState()


   const [PD_LEAGUE, setPD_LEAGUE] = useState()
   const [premier_league, setPremier]= useState([])
   const [champs, setChampions] = useState([])
   const [world_cup] = useState([])
   const [serial, setSeria] = useState([])
   const [lalig, setLalig] = useState([])
   const [Cleague, setCleague] = useState([])
   const [COLI_league, setCOLI_league] = useState([])
   const [CBSA_league, setCBSA_league] = useState([])
   const [PLG_league, setPLG_league] = useState([])
   const [ECS_league, setECS_league]= useState([])
   const [ligue1, setLigue] = useState([])
   const [Bundes, setBundes] = useState([])
   const [ED_league, setEd] = useState([]
    )
    
    async function personal(item){
        let string = JSON.stringify(item)
        await localStorage.setItem("data", string)
        
    }

    var [first, setFirst] = useState("disable");
    var [second, setSecond] = useState("disable");
    var [third, setThird] = useState("disable");
    var [today, setToday] = useState("enable");
    var [fourth, setFourth]= useState("disable");
    var [fifth, seFifth]= useState("disable");
    var [sixth, setSixth]= useState("disable");

    const [hearts, setHearts] = useState("🤍")
    const [ret, setRet] = useState([])
    const [maintain, setMaintain]  = useState("job")
    var more
    console.log(Date().getDay)


    async function fetcher(){
     
        const result =await fetch("http://localhost:6100/main_matches"); 
        const main = await result.json()
        console.log(main)
      
        more = main.matches.map((item)=>{

           //PUSHER
           console.log(item.competition.name)

           if (item.competition.name == "Premier League"){
               pl.push(item)
               console.log(pl)
           }
           if (item.competition.name == "FIFA World Cup"){
               wc.push(item)
                console.log(wc)
           }

           if (item.competition.name == "Campeonato Brasileiro Série A"){
               cbsa.push(item)
                console.log(cbsa)
           }
           if (item.competition.name == "Championship"){
               cs.push(item)
                console.log(cs)
           }
 
           if (item.competition.name == "UEFA Champions League"){
               cl.push(item)
                console.log(cl)
           }
           if (item.competition.name == "European Championship"){
               ecs.push(item)
               console.lgo(ecs)
           }
           if (item.competition.name == "Ligue 1"){
               l1.push(item)
                console.log(l1)
           }
           if (item.competition.name == "Bundesliga"){
               bl.push(item)
               console.log(bl)

           }
           if (item.competition.name == "Serie A"){
               sa.push(item)
               console.log(sa)
           }
           if (item.competition.name == "Eredivisie"){
               ed.push(item)
               console.log(ed)
           }
           if (item.competition.name == "Primeira Liga"){
               plg.push(item)
               console.log(plg)
           }
           if (item.competition.name == "Copa Libertadores"){
               coli.push(item)
               console.log(pl)
           }
           if (item.competition.name == "Primera Division"){
               pd.push(item)
               console.log(pd)
           }

       console.log(item.id)


       if(cs.length > 0){
  
        setChampionship("Championship")
        setChampions(cs.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
    
        }))
       }
    
       if(ed.length>0){
        setED("Eredivisie")
        setEd(ed.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
    
       if(la.length>0){
        setLaliga("Laliga")
        setLalig(la.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
       if(cl.length>0){
        setCL("UEFA CHAMPIONS LEAGUE")
        setCleague(cl.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
    
       if(sa.length>0){
        setSeria_A("SERIA A")
        setSeria(sa.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
       if(bl.length>0){
        setBundeslig("Bundesliga")
        setBundes(bl.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
    
       if(l1.length>0){
        setLigue1("Ligue1")
        setLigue(l1.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
    
    
       if(cbsa.length>0){
        setCBSA("Campeonato Brasileiro Série A")
        setCBSA_league(cbsa.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
    
       if(coli.length>0){
        setCOLI("Copa Libertadores")
        setCOLI_league(coli.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
       if(pd.length>0){
        setPD("Primera Division")
        setPD_LEAGUE(pd.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
    
       if(ecs.length>0){
        setECS("Copa Libertadores")
        setECS_league(ecs.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
    
    
       if(plg.length>0){
        setPLG("Premier Liga")
        setPLG_league(plg.map((item)=>{
            return(
                <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
       
                <div className="btn" id="match" onClick={()=>{personal(item)}}>
                    
                <div className="all_in_one">
                <div className="teams_name">
                <h4>{item.homeTeam.name}</h4>
                <h4>{item.awayTeam.name}</h4>
                </div>
                <div className="teams_score">
                    <h4>{item.score.fullTime.home}</h4>
                    <h4>{item.score.fullTime.away}</h4>
                </div>
                </div>
                <div>
    
    
    
                <div className="time_and_love">
                    <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
                    <button className="btn" onClick={(val)=>{
                        alert("ok")
                
                if (hearts == "🤍"){
                    setHearts("❤️")
                    
                }
    
                else{
                    setHearts("🤍")
                }
                }}>{hearts}</button>
                
                
                </div>
                </div>
            </div>
    
            </Link>
            )
        }))
       }
    
    
    
    
    
    
    
    

  if (pl.length > 0){
   setPremier_League("Premier League")
    setPremier(pl.map((item)=>{
       return(
           <Link to={"/personal"} state={item} style={{textDecoration : "none"}}>
  
           <div className="btn" id="match" onClick={()=>{personal(item)}}>
               
           <div className="all_in_one">
           <div className="teams_name">
           <h4>{item.homeTeam.name}</h4>
           <h4>{item.awayTeam.name}</h4>
           </div>
           <div className="teams_score">
               <h4>{item.score.fullTime.home}</h4>
               <h4>{item.score.fullTime.away}</h4>
           </div>
           </div>
           <div>



           <div className="time_and_love">
               <h6 style={{color : "gold"}}>{item.utcDate[11]+item.utcDate[12]+item.utcDate[13]+item.utcDate[14]+item.utcDate[14]}</h6>
               <button className="btn" onClick={(val)=>{
                   alert("ok")
           
           if (hearts == "🤍"){
               setHearts("❤️")
               
           }

           else{
               setHearts("🤍")
           }
           }}>{hearts}</button>
           
           
           </div>
           </div>
       </div>

       </Link>
       )
   }))
  }


   })




   
  setRet(more)
  console.log(pl)
  console.log(la)
  console.log(wc)
  console.log(cs)



    }














   fetcher()

  
  

    
    return(
        <body>
        
        <div className="date-location">
            <button className="btn btn-outline-danger">-3</button>
            <button className="btn btn-outline-warning">-3</button>
            <button className="btn btn-outline-info">-3</button>
            <button className="btn btn-success">Today Matches</button>
            <button className="btn btn-outline-info">-3</button>
            <button className="btn btn-outline-warning">-3</button>
            <button className="btn btn-outline-danger">-3</button>


        </div>
        <hr></hr>

        <>
        <div className="list_of_matches" style={{overflowX: "hidden",
    overflowY: "auto", height : "350px"}}>
        
        <div className="world_cup">
        {WORLD_CUP}
        {world_cup}

        </div>

        <div className="chamions-league">
            {CL}
            {Cleague}
        </div>

        <div className="premier_league">
        {Premier_Leaguea}
        {premier_league}

        </div>

        <div className="Laliga">
        {Laliga}
        {lalig}

        </div>

        <div className="Seria_a">
            {Seria_A}
            {serial}
        </div>

    
        <div className="Bundesliga">
            {Bundesliga}
            {Bundes}
        </div>

        <div className="ligue_1">
            {Ligue1}
            {ligue1}
        </div>
        <div className="championship">
        {Championship}
        {champs}

        </div>

        <div className="Ed">
            {ED}
            {ED_league}
        </div>

        <div className="Premier Liga">
            {PD}
            {PD_LEAGUE}
        </div>
        
            </div>



            
        </>

        </body>
    )

}

export default Matches