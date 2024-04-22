import { LatLng } from "leaflet";


export function getGeoLocation(onSuccess: (coords: LatLng) => void) {
    navigator.geolocation.getCurrentPosition((loc) => {
        onSuccess(new LatLng(loc.coords.latitude, loc.coords.longitude, loc.coords.altitude || undefined))
    }, (err) => {
        // error
        console.error(err)
    }, {
        timeout: 10000,
        enableHighAccuracy: true
    });
}