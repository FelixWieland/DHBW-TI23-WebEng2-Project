import { IonModal, IonContent, IonSearchbar, IonList, IonItem, IonAvatar, IonImg, IonLabel } from "@ionic/react";
import { useRef } from "react";
import styles from "./LocationInformationModal.module.css"
import {LatLng} from "leaflet";

interface LocationInformationModalProps {
    latLng:LatLng,
}

export const LocationInformationModal: React.FC<LocationInformationModalProps> = ({
}) => {
    const modal = useRef<HTMLIonModalElement>(null);

    return (
        <IonModal
            ref={modal}
            trigger="open-modal"
            isOpen={false}
            initialBreakpoint={0.25}
            breakpoints={[0.25, 0.5, 0.75]}
            backdropDismiss={false}
            backdropBreakpoint={0}
        >
            <IonContent className="ion-padding">

            </IonContent>
        </IonModal>
    );
};
