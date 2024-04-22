import { LatLng } from "leaflet"

export type GeoInformation = {
    city?: string,
    subcity?: string,
    houseNumber?: string,
    history?: string,
    place?: string
}



export async function fetchGeoInformation(latLng: LatLng): Promise<GeoInformation> {
    const adress = `https://nominatim.openstreetmap.org/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json`
    const resp = await fetch(adress)
    const json = await resp.json() as any
    return unifyaddress(json)
}

function unifyaddress(rawGeoInformation: any): GeoInformation {
    let city: string | null = null;
    const address = rawGeoInformation.address;

    const data: GeoInformation = {}
    if (address) {
        if (address.city != null) {
            data.city = address.city
        } else if (address.town != null) {
            data.city = address.town
        }

        if (address.suburb != null) {
            data.subcity = address.suburb
        } else if (address.village != null) {
            data.subcity = address.village
        } else if (address.farm != null) {
            data.subcity = address.farm
        }

        if (address.house_number != null) {
            data.houseNumber = address.house_number
        } else if (address.house_name != null) {
            data.houseNumber = "(" + address.house_name + ")"
        }

        if (address.historic != null) {
            data.history = address.historic
        } else if (address.tourism != null) {
            data.history = address.tourism
        } else if (address.amenity != null) {
            data.history = address.amenity
        }

        if (address.footway != null) {
            data.place = address.footway
        } else if (address.locality != null) {
            data.place = address.locality
        } else if (address.shop != null) {
            data.place = address.shop
        } else if (address.leisure != null) {
            data.place = address.leisure
        }
    }
    return data
}