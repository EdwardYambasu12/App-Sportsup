import React from 'react';
import { Redirect, Route, Switch, Router } from 'react-router-dom';
import { setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { IonButtons, IonContent, IonApp, IonHeader, IonFooter, IonCard, IonPage, IonTitle, IonDatetime, IonModal, IonToolbar, IonButton, IonIcon, IonLabel, IonTabs, IonTabBar, IonTabButton, IonRouterOutlet } from '@ionic/react';
import { playCircle, radio,footballSharp, newspaperSharp, trophySharp, bookmarksSharp, timeSharp, library, search, calendarOutline } from 'ionicons/icons';
import New from './News';
import Leagues from './Leagues';
import Faves from './Faves';
import Main from "./Main/Main"

import Search from './Search';



function Start(){

	return(
							<IonPage>
					

												<IonReactRouter>
         <IonTabs>
          <IonRouterOutlet>
      
            <Route exact path="/">
            <Redirect to="/" />
          </Route>
            <Route path="/news" component={New} exact={true} />
            <Route path="/leagues" component={Leagues} exact={true} />
            <Route path="/faves" component={Faves} exact={true} />
            <Route path="/search" component={Search} exact={true} />
            <Route path ="/start" component = {Main} exact = {true}/> 
      
          </IonRouterOutlet>

          <IonTabBar slot="bottom" color="tertiary">
            <IonTabButton tab="home" href="/start">
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

</IonReactRouter>

							</IonPage>
		)
}


export default Start