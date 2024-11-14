import React, {useState} from "react"
import api from "../../details.js"

export default function League_Map(){

const [status, setStatus] = useState()

async function fetcher(){
	try{

			const api = await fetch("https://apiv3.apifootball.com/?action=get_leagues&APIkey="+api)
			const json = await api.json()
			console.log(json)

	}
	catch(err){

	}
}
fetcher()
	return(
			{status}
		)

}