import { IonModal, IonContent, IonSearchbar, IonList, IonItem, IonAvatar, IonImg, IonLabel } from "@ionic/react";
import { useRef } from "react";
import styles from "./LocationInformationModal.module.css"
import {LatLng} from "leaflet";

interface LocationInformationModalProps {
    content?: React.ReactNode
    onDismiss: () => void
}

export const LocationInformationModal: React.FC<LocationInformationModalProps> = ({
    content,
    onDismiss
}) => {
    const modal = useRef<HTMLIonModalElement>(null);

    return (
        <IonModal
            ref={modal}
            isOpen={Boolean(content)}
            initialBreakpoint={0.10}
            breakpoints={[0, 0.10, 0.75]}
            backdropDismiss={false}
            backdropBreakpoint={0}
            canDismiss={true}
            onWillDismiss={onDismiss}
        >
            <IonContent className="ion-padding">
                {content}
            </IonContent>
        </IonModal>
    );
};
