import { LatLng } from "leaflet"

export type GeoInformation = {
    name: string
}

type RawGeoInformation = {
    place_id: number
    licence: string
    osm_type: string
    osm_id: number
    lat: string
    lon: string
    class: string
    type: string
    place_rank: number
    importance: number
    addresstype: string
    name: string
    display_name: string
    address: RawGeoInformationAddress
    boundingbox: string[]
}

type RawGeoInformationAddress = {
    house_number: string
    road: string
    hamlet: string
    town: string
    municipality: string
    county: string
    state: string
    "ISO3166-2-lvl4": string
    postcode: string
    country: string
    country_code: string
    suburb: string
}
  
export async function fetchGeoInformation(latLng: LatLng): Promise<GeoInformation> {
    const adress = `https://nominatim.openstreetmap.org/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json`
    const resp = await fetch(adress)
    const json = await resp.json() as RawGeoInformation
    return unifyRawGeoInformation(json)
}

function unifyRawGeoInformation(rawGeoInformation: RawGeoInformation): GeoInformation {
    let name = rawGeoInformation.name
    if (!name) {
        name = rawGeoInformation.address.suburb
    }
    return {
        name
    }
}