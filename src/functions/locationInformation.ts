import { LatLng } from "leaflet"

export type GeoInformation = {
    city?: string,
    subcity?: string,
    houseNumber?: string,
    history?: string,
    place?: string,
    title?: string
}

export type WikipediaInformation = {
    ns: number,
    title: string,
    pageid: string,
    size: string,
    wordcount: number,
    snippet: string,
    timestamp: string
}

export async function fetchGeoInformation(latLng: LatLng): Promise<GeoInformation> {
    const address = `https://nominatim.openstreetmap.org/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json`
    const resp = await fetch(address)
    const json = await resp.json() as any
    return unifyaddress(json)
}

export async function fetchWikipediaInformation(search: string): Promise<Array<WikipediaInformation>> {
    const address = `https://de.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=${encodeURIComponent(search)}`
    const resp = await fetch(address)
    const json = await resp.json() as any
    return json.query.search
}

function unifyaddress(rawGeoInformation: any): GeoInformation {
    const address = rawGeoInformation.address;

    const data: GeoInformation = {}
    if (address) {
        if (address.city != null) {
            data.city = address.city
        } else if (address.town != null) {
            data.city = address.town
        }

        if (address.amenity != null) {
            data.subcity = address.amenity
        } else if (address.suburb != null) {
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

    if (data.city) {
        if (data.subcity) {
            if (data.subcity.includes(data.city)) {
                data.title = data.subcity
            } else {
                data.title = `${data.subcity} (${data.city})` 
            }
        } else {
            data.title = data.city
        }
    } else if (data.subcity) {
        data.title = data.subcity
    }

    return data
}