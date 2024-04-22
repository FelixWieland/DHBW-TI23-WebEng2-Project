import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { GeoInformation, fetchGeoInformation } from "../functions/locationInformation";

export function useLocationInformation(latLng: LatLng) {
    const [geoInformation, setGeoInformation] = useState<GeoInformation | null>(null)
    const [loadingGeoInformation, setLoadingGeoInformation] = useState(false)

    useEffect(() => {
        setLoadingGeoInformation(true)
        fetchGeoInformation(latLng)
        .then(data => {
            setGeoInformation(data)
        })
        .finally(() => setLoadingGeoInformation(false))
    }, [latLng])

    return {
        geoInformation,
        loadingGeoInformation
    }
}