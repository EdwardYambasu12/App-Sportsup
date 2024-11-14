import api from "./details.js"
import React, {useState, useEffect} from "react"
import Mini_Nav from "./mini-nav.jsx"
import {Link} from "react-router-dom"
import axios from "axios"
export default function Minor(){
 
 const api_key = api

  const [ret, setRet] = useState()
  async function fetcher(){
    
 
     try {
         const result =await fetch("https://apiv3.apifootball.com/?action=get_leagues&APIkey="+api_key)
         const main = await result.json()
         console.log(main)
  
    let  more = main.map((item)=>{
   
         return(
             <Link to={"/league"} state={item}>
                 <div className="btn bg-warning btn-outline-dark "  style={{width : '100%', display : "flex"}}><img src = {item.league_logo}></img><p>{item.league_name}</p></div>
                 <hr></hr>
             </Link>
         )
     })
    setRet(more)
    
    }
         
    catch (error) {
     console.log(error)
     }}
    useEffect(()=>{
            axios.get("https://apiv3.apifootball.com/?action=get_leagues&APIkey="+api_key)
            .then(res=>{
                const la = res.data
                setRet(
                la.map((item)=>{
                    return(
                                     <Link to={"/league"} state={item}>
                                         <button className="btn bg-warning btn-outline-dark "  style={{width : '100%'}}>{item.league_name}</button>
                                         <hr></hr>
                                     </Link>
                        )
                })
                )
            })
            .catch(e=> console.log(e))
    },[])
     
  //  fetcher()
	return(
    <body className='bg-light text-dark'>
        <Mini_Nav/>
       
        <h2 className='text-center text-warning'>List Of Leagues</h2>
        <div style = {{ overflowY : "auto"}}>
        {ret}
        </div>
  
        
    </body>
		)
}