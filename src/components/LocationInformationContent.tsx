import { LatLng } from "leaflet";
import { Button, Preloader, Toolbar } from "framework7-react";
import { useLocationInformation } from "../hooks/useLocationInformation";
import { useMemo } from "react";
import { WikipediaResultCard } from "./WikipediaResultCard";
import { RoutingData } from "../functions/routing";
import '../css/location-information-content.css'

interface LocationInformationContentProps {
    latLng: LatLng,
    routingData: RoutingData | null,
    onRouteStart: () => void
}

export const LocationInformationContent: React.FC<LocationInformationContentProps> = ({
    latLng,
    routingData,
    onRouteStart,
}) => {
    const {
        geoInformation,
        loadingGeoInformation,
        wikipediaInformation,
        loadingWikipediaInformation
    } = useLocationInformation(latLng)

    const loaderJsx = useMemo(() => <div className="location-information-content-loader"><Preloader /></div>, [])

    const routingDataJsx = useMemo(() => !routingData ? null : (
        (routingData.totalDistance >= 1000 ? `${(routingData.totalDistance / 1000).toFixed(2)}km` : `${routingData.totalDistance}m`)
    ), [routingData])

    const geoInformationJsx = useMemo(() => !geoInformation ? null : <>
        <h1>{geoInformation.title}</h1>
        <Toolbar className="location-information-content-action-toolbar">
            {routingData ? routingDataJsx : (
                <Button small fill round onClick={onRouteStart}>
                    Route
                </Button>
            )}
        </Toolbar>
    </>, [geoInformation, onRouteStart])

    const wikipediaInformationJsx = useMemo(() => !wikipediaInformation ? null : <>
        <swiper-container
            space-between="10"
            slides-per-view="auto"
            class="location-information-content-swiper"
            pagination
        >
            {wikipediaInformation.map(entry => (
                <swiper-slide key={entry.pageid}>
                    <WikipediaResultCard information={entry} />
                </swiper-slide>
            ))}
            <div className="swiper-pagination"></div>
        </swiper-container>
    </>, [wikipediaInformation])

    return (
        <div className="location-information-content-root">
            {loadingGeoInformation ? loaderJsx : geoInformationJsx}
            {loadingWikipediaInformation ? loaderJsx : wikipediaInformationJsx}
        </div>
    );
};