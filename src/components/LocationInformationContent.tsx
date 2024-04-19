import { LatLng } from "leaflet";
import '../css/location-information-content.css'
import { Button, Card, Toolbar } from "framework7-react";

interface LocationInformationContentProps {
    latLng: LatLng,
}

export const LocationInformationContent: React.FC<LocationInformationContentProps> = ({
    latLng
}) => {
    return (
        <div className="location-information-content-root">
            <h1>{latLng.toString()}</h1>
            <Toolbar className="location-information-content-action-toolbar">
                <Button small fill round>
                    Route
                </Button>
            </Toolbar>
            ...
        </div>
    );
};