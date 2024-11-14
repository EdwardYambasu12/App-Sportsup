import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonImg, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import logo from "../images/sportsup.png" 

import icon from "../images/public/icon.jpg"
import { useHistory } from 'react-router-dom';
const Home: React.FC = () => {

    const history = useHistory();

  useEffect(() => {
    // Set a timer to navigate after 5 seconds
    const timer = setTimeout(() => {
      history.push('/start'); // Change this to the route you want to navigate to
    }, 2000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [history]);


  return (
    <IonPage>

      <IonContent  color="primary">
      <div class = "full-screen">
      <div>

      <div class = "styler">
          <img
      src={icon}
      alt="Sportsup"
      class = "icon"
    ></img>

      </div>

      <div class = "styler2">
         <img
      src = {logo}
      alt = "Sportsup"
      class = "logo"
    >

    </img>


    </div>

</div>
 
    </div>



      </IonContent>

    </IonPage>
  );
};

export default Home;
