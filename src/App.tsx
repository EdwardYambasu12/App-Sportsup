// App.tsx
import React from 'react';
import { Redirect, Route, Switch, Router } from 'react-router-dom';
import { setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Main from './pages/Main/Main';

import Start from "./pages/Start"
import Result from "./components/components/result/result.jsx"
import { ThemeProvider } from './ThemeContext'; // Ensure correct import
import { IonButtons, IonContent, IonApp, IonHeader, IonFooter, IonCard, IonPage, IonTitle, IonDatetime, IonModal, IonToolbar, IonButton, IonIcon, IonLabel, IonTabs, IonTabBar, IonTabButton, IonRouterOutlet } from '@ionic/react';
import { playCircle, radio,footballSharp, newspaperSharp, trophySharp, bookmarksSharp, timeSharp, library, search, calendarOutline } from 'ionicons/icons';
import News from './pages/News';
import Leagues from './pages/Leagues';
import Faves from './pages/Faves';

import Search from './pages/Search';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';
import "./bootstrap.min.css"
import "./app.css"
setupIonicReact();

const App: React.FC = () => {
  console.log(ThemeProvider)


  return (
    <ThemeProvider>
      <IonApp>

      <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Route exact path="/start">
          <Start/>
        </Route>

         <Route exact path="/result/:id">
          <Result />
        </Route>
       
      </IonRouterOutlet>
    </IonReactRouter>

      
      </IonApp>
    </ThemeProvider>
  );
};

export default App;
