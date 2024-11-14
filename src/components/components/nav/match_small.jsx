import React, {useState, useEffect} from "react"
import "./nav.css"
import All_Matches from "./all_matches"
import Tomorrow from "./tomorrow"
import Yesterday from "./yesterday"
import Live from "./live"
import api from "./details.js"
import League_Map from "./league_map.jsx"
import {Link, useLocation, useNavigate} from "react-router-dom"
import Favorites from "./favorites"
import axios from "axios"
import Calendar from "./calendar"
import Datepicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'


function Custom_input({value, onClick}){




    
  return(
    <>
  
 <button style ={{display : "flex"}} className  = "btn btn-light"  id = "call" onClick={onClick} ><img id = "icon" src = {require("../images/calendar.png")}></img><h6>Calendar</h6></button>
    
    </>
  )
}

function Custom_input1({value, onClick}){

    
  return(
    <>
  

   	<div className = "text-center" id = "call" onClick={onClick}><button className = "btn">📆</button><p className = "text-dark" id = "trans" style = {{textDecoration : "none"}}>Calendar</p></div> 
    </>
  )
}
export default function Match_small(){
		const api_key = api
	let d = new Date()
   const navigate = useNavigate()

const today_date = d.toISOString().split('T')[0]
console.log(today_date)

const tomorrow_setup = new Date(d)
tomorrow_setup.setDate(d.getDate()+1)
const tomorrow_date = tomorrow_setup.toISOString().split('T')[0]
console.log(tomorrow_date)

const yesterday_setup = new Date(d)
yesterday_setup.setDate(d.getDate()-2)
const yesterday = yesterday_setup.toISOString().split("T")[0]


	var arrs = []
	const [response, setResponse] = useState()
	const [main_state, setMain] = useState()
	const [trans, setTrans] = useState([])
	var route = []
	var [test_tail, setTesttail] = useState([])
	var league_route = []
	var league_route1 = []
	var route1 = []
	var [pray, setPray] = useState([])
    const leagues_ids =  [347, 207,152, 175, 300, 146, 332, 278, 28, 3, 4, 377, 683, 1, 17, 302, 168, 633, 354, 7098  ]

	const [main_matches, setMain_matches] = useState()
	const [match_test, setMatch_test] = useState()
	const [all_test, setAll] = useState()
	const [live, setLive] = useState()

//Time Zone
function getTimeZone() {
    var offset = new Date().getTimezoneOffset(),
        o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

			var groupBy = function(xs, key) {
		    return xs.reduce(function(rv, x) {
		        (rv[x[key]] = rv[x[key]] || []).push(x);
		        return rv;
		    }, {});
		};
		function sortByKeyAsc(array, key) {
		    return array.sort(function(a, b) {
		        var x = a[key];
		        var y = b[key];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		    });
		}

			function sortByKey(array, key) {
				    return array.sort(function(a, b) {
				        var x = a[key];
				        var y = b[key];
				        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				    });
				}



	var through
	const {state} = useLocation()


useEffect(()=>{
	var man

	man = (Array.isArray(state))
	if(man === false){
		const id = state.list[0].league_id
		console.log(id)
		axios.get("https://apiv3.apifootball.com/?action=get_events&league_id="+id+"&from="+today_date+"&to="+today_date+"&timezone="+getTimeZone()+"&APIkey="+api_key)
		.then(res=>{
			var important = []
						var data = res.data
			 			console.log(res)
                        leagues_ids.forEach((element)=>{
                            var filter = data.filter((item)=> item.league_id== element)
                            console.log(filter)
                            filter.map((item)=>{
                                 important.push(item)
                            })
                           

                        })
                        console.log(important, "filter")
                       	setResponse(important)

                       	var sorted1 = sortByKey(important, 'key');
										        var sorted_array1 = sortByKeyAsc(sorted1, "match_time");
										        var groubedByTeam1 = groupBy(sorted_array1, 'country_name');

										        console.log(groubedByTeam1)
										        const orderedLeagues1 = {};
										        Object.keys(groubedByTeam1).sort().forEach(function(key) {
										            orderedLeagues1[key] = groubedByTeam1[key];
										
										            route1.push({name : key, list : groubedByTeam1[key]})

										        });
										     
										        	setResponse(route)
										        	route1.map(
										        			(item)=>{
										        				var m = item.list
										        				var so =  groupBy(m, 'league_name');
										        				console.log(so, item.name)
										     		 Object.keys(so).sort().forEach(function(key) {
										            orderedLeagues1[key] = groubedByTeam1[key];
										
										           league_route1.push({country : item.name,  league_name : key , list  : so[key] })

										        });

										        			})
										        			console.log(league_route)
										        			

										        			if(league_route1.length > 0){
										        				setMatch_test(<div style = {{height : "22px", background : "#ECE5B6", display : "flex", justifyContent : "space-around"}}><label>Popular Competitions [A-Z]</label><h6>{league_route1.length}</h6></div>)
										        			}
						setMain_matches(league_route1.map((item)=>{
							const details = item.list
			        		var status 
			        		const badge = details[0].country_logo
			        		if (badge === ""){
			        			status = require("../images/main_logo.png")
			        		}
			        		else{
			        			status = badge
			        		}

			return(

	<div>
										       <div className = "league_description">
												<img alt = "l" src = {status} id = "logo"></img>
												<span style = {{fontSize : "0.8em"}}>{item.country} -- {item.league_name}</span>
											


												
											


													</div>			        			
				<div>{details.map((det)=>{

									var status
									var live
									var win_style1
									var win_style2
									if (det.match_status === "Finished"){
										status = "FT"
									}
									else if(det.match_status === "After ET"){
										status = "AEt"
									}
									else if(det.match_status == "Half Time"){
										status = "HT"
									}
									else if (det.match_status == "Extra Time"){
										status  = "ET"
									}
									else if (det.match_status == "Postponed"){
										status = "Post."
									}
									else if (det.match_live == 1){
										status = det.match_status+"'"
									}

									if(det.match_live == 1){
										live = <h6 className = "live">Live</h6>
									}
									else{
										live = <span className = "text-dark">{det.match_time}</span>
									}


									if(Number(det.match_hometeam_score )>Number( det.match_awayteam_score)){
										win_style1 = "text-dark"
										win_style2= "text-secondary"


									}

									else if( Number(det.match_awayteam_score) > Number(det.match_hometeam_score)){
										win_style2 = "text-dark"
										win_style1= "text-secondary"
									}
									else{
										win_style1 = "text-secondary"
										win_style2= "text-secondary"
									}

			        						return(
												<Link to = {"result/"+det.match_id}className = "matches">
														<div className = "team_and_badge">


														{/* HOME TEAM BADGE AND NAME */}
															<div className = "team_and_badge_a">
															<div style = {{display : "flex", alignItems : "center "}}>
																<div><img alt = "ht" loading = "lazy" src = {det.team_home_badge} id = "logo_id"></img></div>
																<h6  className={win_style1}>{det.match_hometeam_name}</h6>

															</div>	
																<div className = "away_score"><h6 className = {win_style1}>{det.match_hometeam_score}</h6></div>
															</div>
															{/* AWAY TEAM BADGE AND NAME */}
															<div className = "team_and_badge_b">
															<div style = {{display : "flex", alignItems : "center "}}>
																<div><img alt = "at" loading = "lazy" src = {det.team_away_badge} id = "logo_id"></img></div>
															<div>	<h6  className = {win_style2}>{det.match_awayteam_name}</h6></div>
															</div>	
																<div className = "home_score"><h6 className = {win_style2}>{det.match_awayteam_score}</h6></div>

															</div>

														</div>
														<div className = "end">
														{/*TIME OR STATUS */}
														<div><span className = "time_span">{status}</span></div>


												
														{/* LIVE */}
														<div>{live}</div>
														</div>
													</Link>

			        							)
			        				})}</div>
			        			</div>	
			)
			      
			      })

)
						/////////////////////////////////////////////////////////////////////
						setResponse(res.data)
						console.log(res.data, "data")	
	        			var sorted = sortByKey(res.data, 'key');
										        var sorted_array = sortByKeyAsc(sorted, "match_time");
										        var groubedByTeam = groupBy(sorted_array, 'country_name');

										        console.log(groubedByTeam)
										        const orderedLeagues = {};
										        Object.keys(groubedByTeam).sort().forEach(function(key) {
										            orderedLeagues[key] = groubedByTeam[key];
										
										            route.push({name : key, list : groubedByTeam[key]})

										        });
										     
										        	setResponse(route)
										        	route.map(
										        			(item)=>{
										        				var m = item.list
										        				var so =  groupBy(m, 'league_name');
										        				console.log(so, item.name)
										     		 Object.keys(so).sort().forEach(function(key) {
										            orderedLeagues[key] = groubedByTeam[key];
										
										           league_route.push({country : item.name,  league_name : key , list  : so[key] })

										        });

										        			})
										        			console.log(league_route)

										        	
										        

										        			setAll(<div style = {{height : "22px", background : "#EEEEEE", display : "flex", justifyContent : "space-around"}}><label>Available Competitions [A-Z]</label><h6>{league_route.length}</h6></div>)
										        				var live_m = []
										        		setTesttail(league_route.map((item)=>{
			   const details = item.list
			        		var status 
			        		const badge = details[0].country_logo
			        		if (badge === ""){
			        			status = require("../images/main_logo.png")
			        		}
			        		else{
			        			status = badge
			        		}

			return(

	<div>
										       <div className = "league_description">
												<img alt = "l" src = {status} id = "logo"></img>
												<span style = {{fontSize : "0.8em"}}>{item.country} -- {item.league_name}</span>
											


												
											


													</div>			        			
				<div>{details.map((det)=>{

									var status
									var live
									var win_style1
									var win_style2
									if (det.match_status === "Finished"){
										status = "FT"
									}
									else if(det.match_status === "After ET"){
										status = "AEt"
									}
									else if(det.match_status == "Half Time"){
										status = "HT"
									}
									else if (det.match_status == "Extra Time"){
										status  = "ET"
									}
									else if (det.match_status == "Postponed"){
										status = "Post."
									}
									else if (det.match_live == 1){
										status = det.match_status+"'"
									}

									if(det.match_live == 1){
										live = <h6 className = "live">Live</h6>
									}
									else{
										live = <span className = "text-dark">{det.match_time}</span>
									}


									if(Number(det.match_hometeam_score )>Number( det.match_awayteam_score)){
										win_style1 = "text-dark"
										win_style2= "text-secondary"


									}

									else if( Number(det.match_awayteam_score) > Number(det.match_hometeam_score)){
										win_style2 = "text-dark"
										win_style1= "text-secondary"
									}
									else{
										win_style1 = "text-secondary"
										win_style2= "text-secondary"
									}

			        						return(
												<Link to = {"result/"+det.match_id}className = "matches">
														<div className = "team_and_badge">


														{/* HOME TEAM BADGE AND NAME */}
															<div className = "team_and_badge_a">
															<div style = {{display : "flex", alignItems : "center "}}>
																<div><img alt = "ht" loading = "lazy" src = {det.team_home_badge} id = "logo_id"></img></div>
																<h6  className={win_style1}>{det.match_hometeam_name}</h6>

															</div>	
																<div className = "away_score"><h6 className = {win_style1}>{det.match_hometeam_score}</h6></div>
															</div>
															{/* AWAY TEAM BADGE AND NAME */}
															<div className = "team_and_badge_b">
															<div style = {{display : "flex", alignItems : "center "}}>
																<div><img alt = "at" loading = "lazy" src = {det.team_away_badge} id = "logo_id"></img></div>
															<div>	<h6  className = {win_style2}>{det.match_awayteam_name}</h6></div>
															</div>	
																<div className = "home_score"><h6 className = {win_style2}>{det.match_awayteam_score}</h6></div>

															</div>

														</div>
														<div className = "end">
														{/*TIME OR STATUS */}
														<div><span className = "time_span">{status}</span></div>


												
														{/* LIVE */}
														<div>{live}</div>
														</div>
													</Link>

			        							)
			        				})}</div>
			        			</div>	
			
			   )
			        	})

)
										        	})
.catch(err=>{console.log(err)})

				












































	}


	else if(man === true){
		axios.get("https://apiv3.apifootball.com/?action=get_events&match_live=1&from="+today_date+"&to="+today_date+"&timezone="+getTimeZone()+"&APIkey="+api_key)
		.then(res=>{
			var important = []
						var data = res.data
			 			console.log(res)
                        leagues_ids.forEach((element)=>{
                            var filter = data.filter((item)=> item.league_id== element)
                            console.log(filter)
                            filter.map((item)=>{
                                 important.push(item)
                            })
                           

                        })
                        console.log(important, "filter")
                       	setResponse(important)

                       	var sorted1 = sortByKey(important, 'key');
										        var sorted_array1 = sortByKeyAsc(sorted1, "match_time");
										        var groubedByTeam1 = groupBy(sorted_array1, 'country_name');

										        console.log(groubedByTeam1)
										        const orderedLeagues1 = {};
										        Object.keys(groubedByTeam1).sort().forEach(function(key) {
										            orderedLeagues1[key] = groubedByTeam1[key];
										
										            route1.push({name : key, list : groubedByTeam1[key]})

										        });
										     
										        	setResponse(route)
										        	route1.map(
										        			(item)=>{
										        				var m = item.list
										        				var so =  groupBy(m, 'league_name');
										        				console.log(so, item.name)
										     		 Object.keys(so).sort().forEach(function(key) {
										            orderedLeagues1[key] = groubedByTeam1[key];
										
										           league_route1.push({country : item.name,  league_name : key , list  : so[key] })

										        });

										        			})
										        			console.log(league_route)
										        			

										        			if(league_route1.length > 0){
										        				setMatch_test(<div style = {{height : "22px", background : "#ECE5B6", display : "flex", justifyContent : "space-around"}}><label>Popular Competitions [A-Z]</label><h6>{league_route1.length}</h6></div>)
										        			}
						setMain_matches(league_route1.map((item)=>{
							const details = item.list
			        		var status 
			        		const badge = details[0].country_logo
			        		if (badge === ""){
			        			status = require("../images/main_logo.png")
			        		}
			        		else{
			        			status = badge
			        		}

			return(

	<div>
										       <div className = "league_description">
												<img alt = "l" src = {status} id = "logo"></img>
												<span style = {{fontSize : "0.8em"}}>{item.country} -- {item.league_name}</span>
											


												
											


													</div>			        			
				<div>{details.map((det)=>{

									var status
									var live
									var win_style1
									var win_style2
									if (det.match_status === "Finished"){
										status = "FT"
									}
									else if(det.match_status === "After ET"){
										status = "AEt"
									}
									else if(det.match_status == "Half Time"){
										status = "HT"
									}
									else if (det.match_status == "Extra Time"){
										status  = "ET"
									}
									else if (det.match_status == "Postponed"){
										status = "Post."
									}
									else if (det.match_live == 1){
										status = det.match_status+"'"
									}

									if(det.match_live == 1){
										live = <h6 className = "live">Live</h6>
									}
									else{
										live = <span className = "text-dark">{det.match_time}</span>
									}


									if(Number(det.match_hometeam_score )>Number( det.match_awayteam_score)){
										win_style1 = "text-dark"
										win_style2= "text-secondary"


									}

									else if( Number(det.match_awayteam_score) > Number(det.match_hometeam_score)){
										win_style2 = "text-dark"
										win_style1= "text-secondary"
									}
									else{
										win_style1 = "text-secondary"
										win_style2= "text-secondary"
									}

			        						return(
												<Link to = {"result/"+det.match_id}className = "matches">
														<div className = "team_and_badge">


														{/* HOME TEAM BADGE AND NAME */}
															<div className = "team_and_badge_a">
															<div style = {{display : "flex", alignItems : "center "}}>
																<div><img alt = "ht" loading = "lazy" src = {det.team_home_badge} id = "logo_id"></img></div>
																<h6  className={win_style1}>{det.match_hometeam_name}</h6>

															</div>	
																<div className = "away_score"><h6 className = {win_style1}>{det.match_hometeam_score}</h6></div>
															</div>
															{/* AWAY TEAM BADGE AND NAME */}
															<div className = "team_and_badge_b">
															<div style = {{display : "flex", alignItems : "center "}}>
																<div><img alt = "at" loading = "lazy" src = {det.team_away_badge} id = "logo_id"></img></div>
															<div>	<h6  className = {win_style2}>{det.match_awayteam_name}</h6></div>
															</div>	
																<div className = "home_score"><h6 className = {win_style2}>{det.match_awayteam_score}</h6></div>

															</div>

														</div>
														<div className = "end">
														{/*TIME OR STATUS */}
														<div><span className = "time_span">{status}</span></div>


												
														{/* LIVE */}
														<div>{live}</div>
														</div>
													</Link>

			        							)
			        				})}</div>
			        			</div>	
			)
			      
			      })

)
						/////////////////////////////////////////////////////////////////////
						setResponse(res.data)
						console.log(res.data, "data")	
	        			var sorted = sortByKey(res.data, 'key');
										        var sorted_array = sortByKeyAsc(sorted, "match_time");
										        var groubedByTeam = groupBy(sorted_array, 'country_name');

										        console.log(groubedByTeam)
										        const orderedLeagues = {};
										        Object.keys(groubedByTeam).sort().forEach(function(key) {
										            orderedLeagues[key] = groubedByTeam[key];
										
										            route.push({name : key, list : groubedByTeam[key]})

										        });
										     
										        	setResponse(route)
										        	route.map(
										        			(item)=>{
										        				var m = item.list
										        				var so =  groupBy(m, 'league_name');
										        				console.log(so, item.name)
										     		 Object.keys(so).sort().forEach(function(key) {
										            orderedLeagues[key] = groubedByTeam[key];
										
										           league_route.push({country : item.name,  league_name : key , list  : so[key] })

										        });

										        			})
										        			console.log(league_route)

										        	
										        

										        			setAll(<div style = {{height : "22px", background : "#EEEEEE", display : "flex", justifyContent : "space-around"}}><label>Available Competitions [A-Z]</label><h6>{league_route.length}</h6></div>)
										        				var live_m = []
										        		setTesttail(league_route.map((item)=>{
			   const details = item.list
			        		var status 
			        		const badge = details[0].country_logo
			        		if (badge === ""){
			        			status = require("../images/main_logo.png")
			        		}
			        		else{
			        			status = badge
			        		}

			return(

	<div>
										       <div className = "league_description">
												<img alt = "l" src = {status} id = "logo"></img>
												<span style = {{fontSize : "0.8em"}}>{item.country} -- {item.league_name}</span>
											


												
											


													</div>			        			
				<div>{details.map((det)=>{

									var status
									var live
									var win_style1
									var win_style2
									if (det.match_status === "Finished"){
										status = "FT"
									}
									else if(det.match_status === "After ET"){
										status = "AEt"
									}
									else if(det.match_status == "Half Time"){
										status = "HT"
									}
									else if (det.match_status == "Extra Time"){
										status  = "ET"
									}
									else if (det.match_status == "Postponed"){
										status = "Post."
									}
									else if (det.match_live == 1){
										status = det.match_status+"'"
									}

									if(det.match_live == 1){
										live = <h6 className = "live">Live</h6>
									}
									else{
										live = <span className = "text-dark">{det.match_time}</span>
									}


									if(Number(det.match_hometeam_score )>Number( det.match_awayteam_score)){
										win_style1 = "text-dark"
										win_style2= "text-secondary"


									}

									else if( Number(det.match_awayteam_score) > Number(det.match_hometeam_score)){
										win_style2 = "text-dark"
										win_style1= "text-secondary"
									}
									else{
										win_style1 = "text-secondary"
										win_style2= "text-secondary"
									}

			        						return(
												<Link to = {"result/"+det.match_id}className = "matches">
														<div className = "team_and_badge">


														{/* HOME TEAM BADGE AND NAME */}
															<div className = "team_and_badge_a">
															<div style = {{display : "flex", alignItems : "center "}}>
																<div><img alt = "ht" loading = "lazy" src = {det.team_home_badge} id = "logo_id"></img></div>
																<h6  className={win_style1}>{det.match_hometeam_name}</h6>

															</div>	
																<div className = "away_score"><h6 className = {win_style1}>{det.match_hometeam_score}</h6></div>
															</div>
															{/* AWAY TEAM BADGE AND NAME */}
															<div className = "team_and_badge_b">
															<div style = {{display : "flex", alignItems : "center "}}>
																<div><img alt = "at" loading = "lazy" src = {det.team_away_badge} id = "logo_id"></img></div>
															<div>	<h6  className = {win_style2}>{det.match_awayteam_name}</h6></div>
															</div>	
																<div className = "home_score"><h6 className = {win_style2}>{det.match_awayteam_score}</h6></div>

															</div>

														</div>
														<div className = "end">
														{/*TIME OR STATUS */}
														<div><span className = "time_span">{status}</span></div>


												
														{/* LIVE */}
														<div>{live}</div>
														</div>
													</Link>

			        							)
			        				})}</div>
			        			</div>	
			
			   )
			        	})

)
										        	})
.catch(err=>{console.log(err)})

				














































	}

}, [])

	const [selectedDate, setDate] = useState(null);

	useEffect(()=>{
		

		if (selectedDate === null){
			setStatement(<All_Matches/>)
		}
		else{
		const date = new Date(selectedDate)

	    const select = date.toISOString().split('T')[0]

		setStatement(<Calendar date = {select}/>)
	}
			
	}, [selectedDate])

	const [leagues, setLeagues] = useState()
	const [tab_state, setTabstate] = useState(3)

	const [statement, setStatement] = useState()
	const [toggle, setToggle] = useState("")
	const [situp, setSitup] = useState(1)
		//REMOVING TOGGLE BAR
	function toggle_remove(){
		setToggle(
			""
			)

	}


//////////////
	///////////////
		////////////////LEAGUE SETUP FOR LARGER DEVICES/////////////

	useEffect(()=>{
			axios.get("https://apiv3.apifootball.com/?action=get_leagues&APIkey="+api_key)
			.then(res=>{
				const la = res.data
				setLeagues(
				la.map((item)=>{
					return(
 							 <button className="btn  btn-outline-dark "  style={{width : '100%'}}>{item.league_name}</button>
						)
				})
				)
			})
			.catch(e=> console.log(e))
	},[])

	/*
async function fetcher(){


	axios.get("")
	try{

			//const api = await fetch("https://apiv3.apifootball.com/?action=get_leagues&APIkey="+api_key)
			//const json = await api.json()

			

	}
	catch(err){
		console.log(err)
	}

}
*/
//fetcher()

/////////////////////////////
////////////////
///////////
	//SETTING TOGGLE BAR

	function toggle_add(id){
		if (id == 1){
			setSitup(0)
		setToggle(
				<div id = "toggle_bar" style = {{ height : window.innerHeight, }}>
						
						<h3>More Contents</h3>
						<hr></hr>
						<Link to = {"/minor"}className="btn btn-dark w-100 py-2" type="submit" id = "submit_linked" >
							<h3>⚽</h3><h5>Leagues</h5>
						</Link>



						<Link to = {"/news"}className="btn btn-outline-dark w-100 py-2" type="submit" id = "submit_linked" >
						<img id = "icon" src = {require("../images/today.png")}></img><h5>News</h5>
						</Link>

						
						<Link to = {"/search"}className="btn btn-outline-dark w-100 py-2" type="submit" id = "submit_linked" >
						<img id = "icon" src = {require("../images/search.png")}></img><h5>Search</h5>
						</Link>

					

						<Link to = {"/login"}className="btn btn-outline-dark w-100 py-2" type="submit" id = "submit_linked" >
						<img id = "icon" src = {require("../images/login.jpg")}></img><h5>Login/SignUp</h5>
						</Link>


						<Link to = {"/login"}className="btn btn-outline-dark w-100 py-2" type="submit" id = "submit_linked" >
								<h5>About | Contact | Advertise</h5>
						</Link>

						<hr></hr>
						<div className = "bottom">
						<img id = "ref" src = {require("../images/main_logo.png")}>
							

						</img>

						<h3>©️SportsUp 2024</h3>
						</div>
				</div>

			)}

		else{
			setToggle("")
			setSitup(1)
		}
	}


	function tab_change(id){
		setTabstate(id)


		if (id === 3){
			setStatement(<All_Matches/>)
		}

		else if (id === 4){
			setStatement(<Tomorrow/>)
		}
		else if (id === 5){
			setStatement(<Live/>)
		}
		else if (id === 2){
			setStatement(<Yesterday/>)
		}
		else if (id === 1){
			setStatement(<Favorites/>)
		}
		else if (id === 6){
			setStatement(<Calendar/>)
		}

	}

	return(
			<body>
			{/* Header for device over 750px in width */}
			<header id = "larger_screens">
				<nav className = "top_nav">

					<div className = "brand">
						<img className = "brand_image" src = {require("../images/main_logo.png")}></img>
						<h1 className = "main-text">SPORTS UP</h1>
					</div>

					<div className = "icons">
						<Link to={"/"}><button className = "btn btn-dark text-light">return</button></Link>
					</div>

				</nav>
			

			</header>

						{/* Header for device less than 750px in width */}
			<header id = "smaller_screen">
				<nav className = "top_nav fixed-top" style = {{marginBottom : "0.5%", height : "60px"}}>

					<div className = "brand">
						<img className = "brand_image" src = {require("../images/main_logo.png")}></img>
						<h1 className = "main-text">SPORTS UP</h1>
					</div>

			<div className = "icons">
					
						
							<Link to={"/"}><button className = "btn btn-dark text-light">return</button></Link>
			</div>

				</nav>
			 

		
 <div id = "smaller_screen" className = "nav fixed-bottom " style = {{display : "flex", background : "white", borderTop: "solid black", justifyContent : "space-between", height : "60px"}}>
		<a href = "/" style = {{textDecoration : "none"}}><div className = "text-center"><button className = "btn ">⚽</button><p className = "text-dark" id = "trans">Scores</p></div></a>
	<a href = "#top_link" style = {{textDecoration : "none"}}><div className = "text-center"><button className = "btn ">📰</button><p className = "text-dark" id = "trans">News</p></div></a>
	<a href = "/minor" style = {{textDecoration : "none"}}><div className = "text-center"><button className = "btn">🏆</button><p className = "text-dark" id = "trans" style = {{textDecoration : "none"}}>Leagues</p></div> </a>	
	<Datepicker selected={selectedDate} onChange = {date=> setDate(date)} customInput = {<Custom_input1/>}/>
 	<div className = "text-center"><button className = "btn">📌</button><p className = "text-dark" id = "trans" style = {{textDecoration : "none"}}>Favorites</p></div>

 </div>

			</header>	
		

			{/*----------------------------------------------------------------- */}
<div className = "smaller_device" style ={{marginTop: "80px"}}>
			<div id = "same_sort">
				
						{test_tail}
			</div>
</div>





<div className = "larger_device">
	<div id  = "row">

			<div id = "league_list">
				<div id = "large_league_list">
					<h2>LEAGUES</h2>
					<hr></hr>
					<div>
						{leagues}
					</div>
				</div>

			</div>

			<div className = "live_score">{test_tail}</div>
			        			</div>	

			        				<div className = "ads_news">
				
				<div>
					<img  src = {require("../images/main_logo.png")}></img>
					<h5>Sportsup Is a sport Update Paltform that will be uploaded with immediate effect, to get updates from All other Sources</h5>

				</div>

			</div>
			}</div>
			
		

 
           

			</body>
		)
}

			        			
					


