import React from "react";
import {IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import TodoForm from "../components/TodoForm/TodoForm";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Blank</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true} >
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer/>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <TodoForm/>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Home;
