import React, { useEffect, useState } from 'react';



import {Link} from "react-router-dom"

import axios from "axios"

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
import logo from "../../images/sportsup.png";
import "../Home.css";
import ThemeToggleButton from "../../ThemeToggleButton";
import { IonReactRouter } from '@ionic/react-router';
import { IonButtons, IonContent, IonHeader, IonFooter, IonSelect, IonSelectOption, IonItem,  IonRefresher, IonRefresherContent, IonTab,IonCard, IonPage, IonTitle, IonDatetime, IonModal, IonToolbar, IonButton, IonIcon, IonLabel, IonTabs, IonTabBar, IonTabButton, IonRouterOutlet } from '@ionic/react';
import { playCircle, addCircle, radio,footballSharp, newspaperSharp, trophySharp, bookmarksSharp, timeSharp, library, search, calendarOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import News from '../News';
import Leagues from '../Leagues';
import Faves from '../Faves';

import "../../theme/variables.css"
import Search from '../Search';
import All_Matches from "../../components/components/nav/all_matches"
import Tomorrow from "../../components/components/nav/tomorrow"
import Yesterday from "../../components/components/nav/yesterday"
import Calendar from "../../components/components/nav/calendar"
import Live from "../../components/components/nav/live"
import "../../app.css"
function Nav_Down(){


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

	const [selectedDate, setSelectedDate] = useState(null);

  useEffect(()=>{

if(selectedDate != null){
    const originalDate = selectedDate
const formattedDate = originalDate.split("T")[0];
console.log(formattedDate);
 
    console.log("there is a change in the date")
    setStatement(<Calendar data = {formattedDate}/>)
}
  }, [selectedDate])
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
					   <IonTabButton tab="library">
        {item}
         
        </IonTabButton>
					)
			})
		)


			setListm(
			mated.map((item)=>{
				return(
					 <IonTabButton tab="item">
        {item}
         
        </IonTabButton>
					)
			})
		)


	
	}, [])
const [statement, setStatement]= useState(<All_Matches/>)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const url_live = "https://pngtree.com/freepng/live-icon-design-template-vector-isolated-illustration_5190250.html"
  const handleDateChange = (event: CustomEvent) => {
    const date = event.detail.value; // Get the selected date
    setSelectedDate(date);
    console.log('Selected Date:', date); // Log or process the selected date
    setIsModalOpen(false); // Close modal after selecting date
  };

  const cal_pressed = () => {
    setIsModalOpen(true); // Open modal when "cal" is pressed
  };

	return(

   <div>
   <IonHeader className = "fixed-top">
          <IonToolbar color="tertiary">
            <div className="nav-bar">
              <img src={logo} className="logo" alt="Logo" />
              <div style = {{width : "50%", display : "flex", justifyContent : "space-between" }}>
         <button 
  className="text-light btn btn-danger" 
  onClick={() => {
    setStatement(statement.type === Live ? <All_Matches /> : <Live />);
  }}
>
  Live
</button>

  <IonIcon color="secondary" onClick={cal_pressed} size="large" icon={calendarOutline}></IonIcon>

                <ThemeToggleButton />
              </div>
            </div>
          </IonToolbar>
      

        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Select a Date</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsModalOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonDatetime
              onIonChange={handleDateChange}
              displayFormat="MMM DD, YYYY"
              placeholder="Select Date"
            />
          </IonContent>
        </IonModal>

       



      <div style = {{width : "100%", height : "50px", display : "flex", justifyContent : "space-between", background : `var(--ion-color-tertiary)`}}>
       <div>

       <button className  = "btn btn-outline-secondary">
        <IonIcon icon = {addCircle} color = "secondary" size = "large"/>

        </button>
    </div>
        <IonSelect  onIonChange={(e) => e.detail.value == "today" ? setStatement(<All_Matches/>) : e.detail.value == "tomorrow" ? setStatement(<Tomorrow/>) : e.detail.value == "yesterday" ? setStatement(<Yesterday/>): "" } interface="popover" style = {{background : "gold", borderRadius : "10px", color : "black", textDecoration : "bold", width : "40%", textAlign : "right", justifyContent : "right"}}  placeholder="Today">
         <strong>
          <IonSelectOption value="yesterday">Yesterday</IonSelectOption>
          <IonSelectOption   value="today">Today</IonSelectOption>
          <IonSelectOption  value="tomorrow">Tomorrow</IonSelectOption>
          </strong>
        </IonSelect>
      </div>

      </IonHeader>



    <div style = {{marginTop : "30%"}}>  {statement}</div>

      </div>



 


		)
}

function Tabbar(){
	return(
		 <IonTabs>
          <IonRouterOutlet>
            <Redirect exact path="/" to="/news" />
            <Route path="/news" component={News} exact={true} />
            <Route path="/leagues" component={Leagues} exact={true} />
            <Route path="/faves" component={Faves} exact={true} />
            <Route path="/search" component={Search} exact={true} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom" color="tertiary">
            <IonTabButton tab="home" href="/">
              <IonIcon color="secondary" icon={footballSharp} />
              <IonLabel color="secondary">Matches</IonLabel>
            </IonTabButton>

            <IonTabButton tab="radio" href="/news">
              <IonIcon color="secondary" icon={newspaperSharp} />
              <IonLabel color="secondary">News</IonLabel>
            </IonTabButton>

            <IonTabButton tab="library" href="/leagues">
              <IonIcon color="secondary" icon={trophySharp} />
              <IonLabel color="secondary">Leagues</IonLabel>
            </IonTabButton>

            <IonTabButton tab="faves" href="/faves">
              <IonIcon color="secondary" icon={bookmarksSharp} />
              <IonLabel color="secondary">Faves</IonLabel>
            </IonTabButton>

            <IonTabButton tab="search" href="/search">
              <IonIcon color="secondary" icon={search} />
              <IonLabel color="secondary">Search</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
		)
}

function Main() {
 
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }


  return (
  
   <>
    

        <IonContent color="primary">
         <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <Nav_Down/>
         
            

        </IonContent>

 
 
          
  </>
  );
}

export default Main;
