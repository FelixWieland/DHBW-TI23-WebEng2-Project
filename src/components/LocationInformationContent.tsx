import { LatLng } from "leaflet";
import '../css/location-information-content.css'
import { Button, Card, Preloader, Toolbar } from "framework7-react";
import { useLocationInformation } from "../hooks/useLocationInformation";
import { useMemo } from "react";

interface LocationInformationContentProps {
    latLng: LatLng,
}

export const LocationInformationContent: React.FC<LocationInformationContentProps> = ({
    latLng
}) => {
    const {
        geoInformation,
        loadingGeoInformation
    } = useLocationInformation(latLng)


    const title = useMemo(() =>  geoInformation ? `${geoInformation.subcity || ''} ${geoInformation.subcity && geoInformation.city ? '(' : ''}${geoInformation.city || ''}${geoInformation.subcity && geoInformation.city ? ')' : ''}` : '', [geoInformation])

    const loaderJsx = useMemo(() => <div className="location-information-content-loader"><Preloader /></div>, [])
    const geoInformationJsx = useMemo(() => !geoInformation ? null : <>
        <h1>{title}</h1>
        <Toolbar className="location-information-content-action-toolbar">
            <Button small fill round>
                Route
            </Button>
        </Toolbar>
    </>, [geoInformation])

    return (
        <div className="location-information-content-root">
            {loadingGeoInformation ? loaderJsx : geoInformationJsx}
        </div>
    );
};