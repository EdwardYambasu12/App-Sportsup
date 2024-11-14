import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useHistory } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import link from "./details.js";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const AdComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5765675396995319";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    script.onload = () => {
      // Remove existing adsbygoogle ins elements
      const existingAds = document.querySelectorAll('.adsbygoogle');
      existingAds.forEach(ad => ad.remove());

      // Create a new ins element
      const newAd = document.createElement('ins');
      newAd.className = 'adsbygoogle';
      newAd.style.display = 'block';
      newAd.style.width = '100%';
      newAd.setAttribute('data-ad-format', 'fluid');
      newAd.setAttribute('data-ad-layout-key', '-fb+5w+4e-db+86');
      newAd.setAttribute('data-ad-client', 'ca-pub-5765675396995319');
      newAd.setAttribute('data-ad-slot', '9599407082');

      // Append the new ins element
      document.body.appendChild(newAd);

      // Push the ad
      (window.adsbygoogle = window.adsbygoogle || []).push({});

        console.log({
        adClient: newAd.getAttribute('data-ad-client'),
        adSlot: newAd.getAttribute('data-ad-slot'),
        adFormat: newAd.getAttribute('data-ad-format'),
        adLayoutKey: newAd.getAttribute('data-ad-layout-key')
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // or return a loading indicator if necessary
};


const Yesterday = () => {
	const Line = link
  const [leagues, setLeagues] = useState([]);
  const [matchPinnedStatus, setMatchPinnedStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState()
  const [following, setFollowing] = useState()
  const [theme, setTheme] = useState(document.body.getAttribute("color-theme"))
  const [color, setColor] = useState()

var navigate = useHistory()
const trive = localStorage.getItem("theme")

useEffect(()=>{
	
			setTheme(trive)


			if(trive === "dark"){
				setTheme("#282828") 
				setColor("#ffffff")
			}

			else{
				setTheme("#ffffff")
				setColor("black")

			}
		

}, [document.body.getAttribute("color-theme")])
  const fetchData = async () => {
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const userCode = "INT"
      const date = new Date();
      const formatted_date = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()-1).padStart(2, '0')}`;

      const raw_data = await axios.get(`${Line}/match`, {
        params: { timeZone: userTimeZone, code: userCode, date: formatted_date },
      });

      setLeagues(raw_data.data.leagues);

      const league = raw_data.data.leagues
      const raw = localStorage.getItem("data");
      const done = JSON.parse(raw);
      const { data: users } = await axios.get(`${Line}/users`);
      if(raw != null){
      const user = users.find(user => user.email === done.email && user.password === done.password);

      
    var pinner = []
  

    league.map((item)=>{
      item.matches.map((id)=>{
        pinner.push(id)
      })
    })
  console.log(user, pinner, leagues)

  var involved =  []

  pinner.map((item)=>{
   
   if(user != null){
    user.favorite_league.map((id)=>{

      league.map((i)=>{


         if(i.primaryId === JSON.parse(id).id){
           i.matches.map((ele)=>{

            if(involved.includes(ele)){
            
          } 
          else{
            involved.push(ele)
          }


           })
          }
         
        

      })

     

      
        
    })
    user.favorite_team.map((id)=>{
        if(item.home.id === JSON.parse(id).id){
          if(involved.includes(item)){
            
          } 
          else{
            involved.push(item)
          }
        }

        if(item.away.id === JSON.parse(id).id){
         if(involved.includes(item)){
            
          } 
          else{
            involved.push(item)
          }
        }


        
    })
  }
   })



    console.log(involved)
        if(involved.length > 0){
    setFollowing(
        <Accordion style = {{background : `var(--ion-color-tertiary)`}} defaultExpanded sx={{ borderRadius: '15px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <div className="league_description" onClick={() => { navigate("/leagues")}} style={{ display: 'flex', alignItems: 'center' }}>
            <BookmarkIcon/>
            <h6 id="break-down1">Following</h6>
          </div>
        </AccordionSummary>
        <div style= {{width : "100%", background : "lightgrey", height : "1px"}}></div>
        <AccordionDetails>
          {involved.map((match, matchIndex) => {
            const dateTimeString = match.status.utcTime;
            const dateObject = new Date(dateTimeString);
            const timeString = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const isPinned = matchPinnedStatus[match.id] || false;

            let status;
            let live;

            if (!match.status.started) {
              status = timeString;
              live = <div onClick={() => togglePin(match)} style={{ cursor: 'pointer' }}>
                {isPinned ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </div>;
            } else if (match.status.started && !match.status.finished) {
              status = <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}><h6>{match.home.score}</h6><h6>-</h6><h6>{match.away.score}</h6></div>;
              live = <h6 style={{ width: "20px", fontSize: "0.7em", display: "flex", justifyContent: "center", height: "20px", alignItems: "center", color: "white", borderRadius: "50%", background: "red" }}>{match.status.liveTime.short}</h6>;
            } else {
              status = <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}><h6>{match.home.score}</h6><h6>-</h6><h6>{match.away.score}</h6></div>;
              live = <h6 style={{ width: "20px", height: "20px", textAlign: "center", alignItems: "center", color: "black", borderRadius: "50%", background: "#EEEEEE" }}>FT</h6>;
            }

            return (
              <div key={matchIndex} style={{ display: "flex", marginTop: "3%", width: "100%", justifyContent: "space-between", background: "white", borderRadius: "10px", textDecoration: "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "50px", alignItems: "center" }}>
                  <div style={{ width: "5%" }}>{live}</div>
                  <Link onClick = {()=>{navigate.push(`result/${match.id}`)}}  style={{ display: "flex", textDecoration: "none", justifyContent: "space-between", width: "90%" }}>
                    <div style={{ display: "flex", width: "33%", justifyContent: "space-between", alignItems: "center" }}>
                      <h6 className="text-dark" style={{ fontSize: "0.8em" }}>{match.home.name}</h6>
                      <img src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}_xsmall.png`} loading="lazy" alt="Home Team Logo" style={{ width: "20px", height: "20px" }} />
                     {match.status.numberOfHomeRedCards > 0 ? <div style = {{fontSize : "0.5em", transform : `translateY(-100%)`}}>🟥</div> : ""}
                    </div>
                    <div className="text-dark" style={{ width: "20%", justifyContent: "center", textAlign: "center", display: "flex", color: "black" }}>
                      <strong>{status}</strong>
                    </div>
                    <div style={{ display: "flex", width: "33%", justifyContent: "space-between", alignItems: "center" }}>
                       {match.status.numberOfAwayRedCards > 0 ? <div style = {{fontSize : "0.5em", transform : `translateY(-100%)`}}>🟥</div> : ""}
                     
                      <img src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}_xsmall.png`} loading="lazy" alt="Away Team Logo" style={{ width: "20px", height: "20px" }} />
                      <h6 className="text-dark" style={{ fontSize: "0.8em" }}>{match.away.name}</h6>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
      )

}
    if(involved.length > 0){

      setAds(
            <AdComponent/>
        )


    }
    }
      console.log(raw_data.data);
    } catch (e) {
      console.error(e);
       setFollowing(<Alert severity="error">Fail to load data Try checking Network Connection</Alert>)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Fetch user favorites as before
  const [userFavorites, setUserFavorites] = useState(null);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      const raw = localStorage.getItem("data");
      const done = JSON.parse(raw);
      const { data: users } = await axios.get(`${Line}/users`);

      if(raw != null){
      const user = users.find(user => user.email === done.email && user.password === done.password);
      setUserFavorites(user);
    }
    };

    fetchUserFavorites();

  }, []);

  useEffect(() => {
    if (userFavorites && leagues.length > 0) {
      const pinnedIds = userFavorites.pinned_matches.map(item => JSON.parse(item).id);
      const statusMap = {};
      leagues.forEach(item => {
        item.matches.forEach(match => {
          statusMap[match.id] = pinnedIds.includes(match.id);
        });
      });
      setMatchPinnedStatus(statusMap);
    }
  }, [leagues, userFavorites]);

useEffect(()=>{



  async function followed(){
      
  }

  followed()

  }, [])

  const togglePin = async (match) => {
    const isPinned = matchPinnedStatus[match.id] || false;
    const url = `${Line}/${isPinned ? "unpinned_matches" : "pinned_matches"}`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        id_: userFavorites._id,
        player_id: JSON.stringify(match),
      }),
    });

    setMatchPinnedStatus(prev => ({ ...prev, [match.id]: !isPinned }));
  };
  const replacement = "data:image/jpeg;base64,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"
  const renderMatches = useMemo(() => {
    return leagues.map((item, index) => (
      <Accordion   key={index} defaultExpanded sx={{ borderRadius: '15px', background : `var(--ion-color-tertiary);`, color : `var(--ion-color-secondary);` }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <div className="league_description" onClick={() => { navigate.push("leauges/" + item.primaryId); sessionStorage.setItem("selected_league", JSON.stringify(item)); }} style={{ display: 'flex', alignItems: 'center' }}>
            <img style={{ width: "30px", height: "30px" }} src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${item.id}.png`} alt="Sportsup" onError={(e) => { e.target.src = replacement }} 
/>
            <h6 id="break-down1">{item.name || 'League Name'}</h6>
          </div>
        </AccordionSummary>
        <div style= {{width : "100%", background : "lightgrey", height : "1px"}}></div> 
        <AccordionDetails sx = {{background : `var(--ion-color-tertiary);`}}>
          {item.matches.map((match, matchIndex) => {
            const dateTimeString = match.status.utcTime;
            const dateObject = new Date(dateTimeString);
            const timeString = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const isPinned = matchPinnedStatus[match.id] || false;

            let status;
            let live;

            if (!match.status.started) {
              status = timeString;
              live = <div onClick={() => togglePin(match)} style={{ cursor: 'pointer' }}>
                {isPinned ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </div>;
            } else if (match.status.started && !match.status.finished) {
              status = <div style={{ display: "flex", width: "100%", justifyContent: "space-between", color : `var(--ion-color-secondary)`}}><h6>{match.home.score}</h6><h6>-</h6><h6>{match.away.score}</h6></div>;
              live = <h6 style={{ width: "20px", fontSize: "0.7em", display: "flex", justifyContent: "center", height: "20px", alignItems: "center", color: "white", borderRadius: "50%", background: "red" }}>{match.status.liveTime.short}</h6>;
            } else {
              status = <div style={{ display: "flex", width: "100%", justifyContent: "space-between", color : `var(--ion-color-secondary)` }}><h6>{match.home.score}</h6><h6>-</h6><h6>{match.away.score}</h6></div>;
              live = <h6 style={{ width: "20px", height: "20px", textAlign: "center", alignItems: "center", color: "black", borderRadius: "50%", background: "#EEEEEE" }}>FT</h6>;
            }

            return (
              <div key={matchIndex} style={{ display: "flex", background : `var(--ion-color-tertiary);`, marginTop: "3%", width: "100%", justifyContent: "space-between",  borderRadius: "10px", textDecoration: "none" }}>
                <div style={{ display: "flex", background : `var(--ion-color-tertiary)`, justifyContent: "space-between", width: "100%", height: "50px", alignItems: "center" }}>
                  <div style={{ width: "5%" }}>{live}</div>
                  <div onClick = {()=>{navigate.push(`result/${match.id}`); window.location.reload()}}  style={{ display: "flex", color : `var(--ion-color-secondary);`, textDecoration: "none", justifyContent: "space-between", width: "90%" }}>
                    <div style={{ display: "flex", width: "33%", justifyContent: "space-between", alignItems: "center" }}>
                      <h6 style={{color : `var(--ion-color-secondary)`, fontSize: "0.8em" }}>{match.home.name}</h6>
                      <img src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}_xsmall.png`} loading="lazy" alt="Home Team Logo" style={{ width: "20px", height: "20px" }} />
                       {match.status.numberOfHomeRedCards > 0 ? <div style = {{fontSize : "0.5em", transform : `translateY(-100%)`}}>🟥</div> : ""}
                    </div>
                    <div  style={{ width: "20%", justifyContent: "center", textAlign: "center", display: "flex", color: `var(--ion-color-secondary)` }}>
                      <strong>{status}</strong>
                    </div>
                    <div style={{ display: "flex", width: "33%", justifyContent: "space-between", alignItems: "center" }}>
                       {match.status.numberOfAwayRedCards > 0 ? <div style = {{fontSize : "0.5em", transform : `translateY(-100%)`}}>🟥</div> : ""}
                      <img src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}_xsmall.png`} loading="lazy" alt="Away Team Logo" style={{ width: "20px", height: "20px" }} />
                      <h6  style={{ fontSize: "0.8em", color : `var(--ion-color-secondary)` }}>{match.away.name}</h6>
                     
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
    ));
  }, [leagues, matchPinnedStatus, theme]);

  return (
    <div className="container">
      {loading && leagues.length === 0 ? (  // Show spinner only if loading and no leagues are present
        <Box style={{ display: 'flex', width: "100%", justifyContent: "center" }}>
          <CircularProgress sx={{ backgroundColor: "white", borderRadius: "50%" }} />
        </Box>
      ) : (

      <div>
      {following}
      {ads}
       { renderMatches}

        </div>
      )}
    </div>
  );
};

export default Yesterday;
