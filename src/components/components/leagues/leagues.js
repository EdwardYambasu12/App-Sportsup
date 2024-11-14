import React, { useEffect, useState } from "react";

function Leagues(){
    var more
    const [ret, setRet] = useState()
useEffect(()=>{
   async function fetcher(){

    const result =await fetch("http://localhost:6100/avalable_leagues"); 
    const main = await result.json()
    console.log(main)
  
    more = main.competitions.map((item)=>{
        console.log(item.name)
        console.log(item.id)
        return(
            <>
                <button className="btn bg-warning btn-outline-dark ">{item.name}</button>
            </>
        )
    })
   setRet(more)
   }
   fetcher()

}, [])
    return(
        <>
            
            {ret}
        </>
    )
    
}

export default Leagues