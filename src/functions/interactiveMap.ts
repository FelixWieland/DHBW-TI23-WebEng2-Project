import { tileLayer, Map, divIcon } from "leaflet"


export const selectedLocationMarkerOptions = {
    icon: divIcon({
        html: `<svg class="interactive-map-marker-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PlaceIcon"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"></path></svg>`
    })
}

export const stopLocationMarkerOptions = {
    icon: divIcon({
        html: `<svg class="interactive-map-marker-icon fill-grey" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PlaceIcon"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"></path></svg>`
    })
}

export const ownLocationMarkerOptions = {
    icon: divIcon({
        html: `<svg class="interactive-map-marker-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MyLocationIcon"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7"></path></svg>`
    })
}

export const availableTileLayers = ['street', 'sat', 'dark'] as const
export type TileVariant = typeof availableTileLayers[number]

const streetTiles = 'https://tile.openstreetmap.de/{z}/{x}/{y}.png'
const satTiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const nightTiles = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

const tileOptions = { maxZoom: 19 }

const streetLayer = tileLayer(streetTiles, tileOptions)
const satLayer = tileLayer(satTiles, tileOptions)
const nightLayer = tileLayer(nightTiles, tileOptions)

export function getTileLayer(variant: TileVariant) {
    switch (variant) {
        case 'street': return streetLayer;
        case 'sat': return satLayer;
        case 'dark': return nightLayer
    }
}

export function changeMapLayer(map: Map, layer: TileVariant) {
    availableTileLayers.forEach((layer) => map.removeLayer(getTileLayer(layer)));
    map.addLayer(getTileLayer(layer));
}
