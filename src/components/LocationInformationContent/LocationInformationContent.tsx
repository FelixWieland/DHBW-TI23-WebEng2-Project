import {LatLng} from "leaflet";

interface LocationInformationContentProps {
    latLng:LatLng,
}

export const LocationInformationContent: React.FC<LocationInformationContentProps> = ({
    latLng
}) => {

    return (<div>
        {latLng.toString()}
    </div>);
};
