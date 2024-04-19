import { tileLayer, Map } from "leaflet"


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
