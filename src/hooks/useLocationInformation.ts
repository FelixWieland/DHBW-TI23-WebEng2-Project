import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { GeoInformation, WikipediaInformation, fetchGeoInformation, fetchWikipediaInformation } from "../functions/locationInformation";

export function useLocationInformation(latLng: LatLng) {
    const [geoInformation, setGeoInformation] = useState<GeoInformation | null>(null)
    const [loadingGeoInformation, setLoadingGeoInformation] = useState(false)
    const [wikipediaInformation, setWikipediaInformation] = useState<Array<WikipediaInformation> | null>(null)
    const [loadingWikipediaInformation, setLoadingWikipediaInformation] = useState(false)

    useEffect(() => {
        setLoadingGeoInformation(true)
        fetchGeoInformation(latLng)
        .then(geoInformation => {
            if (geoInformation.title) {
                setLoadingWikipediaInformation(true)
                fetchWikipediaInformation(geoInformation.title)
                .then(wikipediaInformation => {
                    setWikipediaInformation(wikipediaInformation)
                })
                .finally(() => setLoadingWikipediaInformation(false))
            }
            setGeoInformation(geoInformation)
        })
        .finally(() => setLoadingGeoInformation(false))
    }, [latLng])

    return {
        geoInformation,
        loadingGeoInformation,
        wikipediaInformation,
        loadingWikipediaInformation
    }
}