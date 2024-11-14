import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import News from "../components/components/nav/news"

const New = () => (
  <>
    <IonHeader >
      <IonToolbar color = "tertiary">
        <IonTitle color = "secondary">News</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent color = "primary">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          marginTop: "720%"
        }}
      >
        <News/>
      </div>
    </IonContent>
  </>
);

export default New;