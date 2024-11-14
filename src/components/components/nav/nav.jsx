import React, {useState, useEffect} from "react"
import "./nav.css"
import All_Matches from "./all_matches"
import Tomorrow from "./tomorrow"
import Yesterday from "./yesterday"
import Live from "./live"
import api from "./details.js"
import League_Map from "./league_map.jsx"
import {Link} from "react-router-dom"
import Favorites from "./favorites"
import axios from "axios"
import Calendar from "./calendar"
import Datepicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'


import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




  const Drawer = ({ isOpen, toggleDrawer }) => {
  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        {/* Drawer content goes here */}
        <h2>Drawer Content</h2>
        <p>This is the content inside the drawer.</p>
      </div>
      <button className="close-button" onClick={toggleDrawer}>Close Drawer</button>
    </div>
  );
};




function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}



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
export default function Nav(){


  const [value, setValue] = React.useState(4);

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };




 


	const [selectedDate, setDate] = useState(null);
	const [list, setListd] = useState()
		const [listm, setListm] = useState()
	var dated = []
	var mated = []

	for(let i=3; i>0; i--){
		const d = new Date()
		const yesterday_setup = new Date(d)
		yesterday_setup.setDate(d.getDate()-i)
		const yesterday = yesterday_setup.toISOString().split("T")[0]

		dated.push(yesterday)
}

	for(let i=0; i<5; i++){
		const d = new Date()
		const yesterday_setup = new Date(d)
		yesterday_setup.setDate(d.getDate()-i)
		const yesterday = yesterday_setup.toISOString().split("T")[0]

		mated.push(yesterday)



	}

	useEffect(()=>{
		
			setListd(
			dated.map((item)=>{
				return(
					  <LinkTab label={item} href="/drafts" />
					)
			})
		)


			setListm(
			mated.map((item)=>{
				return(
					  <LinkTab label = {item} href="/drafts" />
					)
			})
		)


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
	const [statement, setStatement] = useState(<All_Matches/>)
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
	const api_key = api
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
			<body style = {{background : "#EEEEEE"}}>
			{/* Header for device over 750px in width */}
			<header id = "larger_screens">
				<nav className = "top_nav">

					<div className = "brand">
						<img className = "brand_image" src = {require("../images/main_logo.png")}></img>
						<h1 className = "main-text">SPORTS UP</h1>
					</div>

					<div className = "icons">
						<Datepicker selected={selectedDate} onChange = {date=> setDate(date)} customInput = {<Custom_input/>}/>
						<Link to = {"/news"} id = "nav-link" className = "btn btn-danger"><img id = "icon" src = {require("../images/today.png")}></img><h6>News</h6></Link>

						
						<Link to = {"/search"} id = "nav-link" className = "btn btn-outline-info" to = {"/search"}><img id = "icon" src = {require("../images/search.png")}></img><h6>Search</h6></Link>

					
						<Link to = {"/login"} id = "nav-link" className = "btn btn-outline-light"><img id = "icon" src = {require("../images/login.jpg")}></img><h6>Login or SignUp</h6></Link>
					</div>

				</nav>
			
				<div className = "mid_tab">
				{list}
						<button onClick = {()=> tab_change(1)} className = {tab_state === 1 ? "active" : "inactive"}><h6>💝</h6><h6>Favorites</h6></button>
						<button onClick = {()=> tab_change(2)} className = {tab_state === 2 ? "active" : "inactive"}><img id = "icon" src = {require("../images/yesterday.png")}></img><h6>Yesterday</h6></button>
						<button onClick = {()=> tab_change(3)} className = {tab_state === 3 ? "active" : "inactive"}><img id = "icon" src = {require("../images/today.png")}></img><h6>All Matches</h6></button>
						<button onClick = {()=> tab_change(4)} className = {tab_state === 4 ? "active" : "inactive"}><img id = "icon" src = {require("../images/tomorrow.png")}></img><h6>Tomorrow</h6></button>
						<button onClick = {()=> tab_change(5)} className = {tab_state === 5 ? "active" : "inactive"}><h6>🔴</h6><h6>Live Matches</h6></button>
						{listm}
						
				</div>
		

			</header>

						{/* Header for device less than 750px in width */}
			<header id = "smaller_screen">
				<nav className = " fixed-top" style = {{marginBottom : "0.5%"}}>
				
					<div className="top_nav">
					<div className = "brand">
						<img className = "brand_image" src = {require("../images/sportsup.png")}></img>
						<h2>SPORTS UP</h2>
					</div>

			<div className = "icons">
					
						
						<Link to = {"/search"}><button className = "btn btn-light"><img id = "icon" src = {require("../images/search.png")}></img></button></Link>
						
						<button className = "btn btn-warning" onClick = {()=> toggle_add(situp)}><img id = "icon" src = {require("../images/more.png")}></img></button>
			</div>

			    </div>
  
<Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{ style: { backgroundColor: 'midnightblue'} }}  variant="scrollable" scrollButtons="auto" aria-label="gold tabs example"
      	sx = {{background : "white", }}

      	className = "mid_tab"
      	id = "idl"
      >
      {list}
        <LinkTab label="Yesterday" href="/drafts" />
          <LinkTab label="Today" href="/drafts" />
            <LinkTab label="Tomorrow" href="/drafts" />
      {listm}

      </Tabs>


				</nav>
				<br></br>
					<br></br>
				<br></br>
				<br></br>
				<br></br>
					<Drawer/>
				<div className = "state" >
    
			{statement}

					
</div>
 <div id = "smaller_screen" className = "nav fixed-bottom " style = {{display : "flex", background : "white", borderTop: "solid #EEEEEE", justifyContent : "space-between", height : "60px"}}>
		<a href = "/" style = {{textDecoration : "none"}}><div className = "text-center"><button className = "btn ">⚽</button><p className = "text-dark" id = "trans">Scores</p></div></a>
	<a href = "#top_link" style = {{textDecoration : "none"}}><div className = "text-center"><button className = "btn ">📰</button><p className = "text-dark" id = "trans">News</p></div></a>
	<a href = "/minor" style = {{textDecoration : "none"}}><div className = "text-center"><button className = "btn">🏆</button><p className = "text-dark" id = "trans" style = {{textDecoration : "none"}}>Leagues</p></div> </a>	
	<Datepicker selected={selectedDate} onChange = {date=> setDate(date)} customInput = {<Custom_input1/>}/>
 	<div className = "text-center"><button className = "btn">📌</button><p className = "text-dark" id = "trans" style = {{textDecoration : "none"}}>Favorites</p></div>

 </div>

			</header>	
		

			{/*----------------------------------------------------------------- */}



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

			<div className = "live_score">{statement}</div>
			
			<div className = "ads_news">
				
				<div >
					<img  src = {require("../images/sportsup.png")}></img>
					<h5>Sportsup Is a sport Update Paltform that will be uploaded with immediate effect, to get updates from All other Sources</h5>

				</div>

			</div>


	</div>		
</div>

{toggle}
 
           

			</body>
		)
}