import { Sheet, View } from "framework7-react";
import { LatLng } from "leaflet";
import { useEffect } from "react";
import '../css/location-information-modal.css'

interface LocationInformationModalProps {
    content?: React.ReactNode
    onDismiss: () => void
}

export const LocationInformationModal: React.FC<LocationInformationModalProps> = ({
    content,
    onDismiss
}) => {
    console.log(content);

    return (
        <Sheet
            opened={Boolean(content)}
            onSheetClosed={onDismiss}
            swipeToClose
            style={{ height: '100vh' }}
            breakpoints={[0.15, 0.45, 1]}
            className="location-information-modal-root"
        >
            <div className="location-information-modal-swipe-handler" style={{ backgroundColor: 'transparent' }}></div>
            <div className="location-information-modal-content">
                {content}
            </div>
        </Sheet>
    )
};