import { LatLng } from "leaflet";
import '../css/location-information-content.css'
import { Button, Card, Preloader, Toolbar } from "framework7-react";
import { useLocationInformation } from "../hooks/useLocationInformation";
import { useMemo } from "react";
import { WikipediaResultCard } from "./WikipediaResultCard";

interface LocationInformationContentProps {
    latLng: LatLng,
}

export const LocationInformationContent: React.FC<LocationInformationContentProps> = ({
    latLng
}) => {
    const {
        geoInformation,
        loadingGeoInformation,
        wikipediaInformation,
        loadingWikipediaInformation
    } = useLocationInformation(latLng)

    const loaderJsx = useMemo(() => <div className="location-information-content-loader"><Preloader /></div>, [])
    const geoInformationJsx = useMemo(() => !geoInformation ? null : <>
        <h1>{geoInformation.title}</h1>
        <Toolbar className="location-information-content-action-toolbar">
            <Button small fill round>
                Route
            </Button>
        </Toolbar>
    </>, [geoInformation])

    const wikipediaInformationJsx = useMemo(() => !wikipediaInformation ? null : <>
        <swiper-container
            space-between="10"
            slides-per-view="auto"
            pagination={true}
        >
            {wikipediaInformation.map(entry => (
                <swiper-slide key={entry.pageid}>
                    <WikipediaResultCard information={entry} />
                </swiper-slide>
            ))}
        </swiper-container>
    </>, [])

    return (
        <div className="location-information-content-root">
            {loadingGeoInformation ? loaderJsx : geoInformationJsx}
            {loadingWikipediaInformation ? loaderJsx : wikipediaInformationJsx}
        </div>
    );
};