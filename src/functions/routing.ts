import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { getGeoLocation } from './locateSelf';
import { ownLocationMarkerOptions, stopLocationMarkerOptions } from './interactiveMap';

export type RoutingControl = L.Routing.Control;
export type RoutingData = {
    totalDistance: number,
    totalDuration: number
}
export type RoutingResult = {
    routes: Promise<RoutingData>,
    control: L.Routing.Control
}

const routeControlOptions: Partial<L.Routing.RoutingControlOptions> = {
    show: true,
    fitSelectedRoutes: "smart",
    routeWhileDragging: true,
    showAlternatives: false,
    lineOptions: {
        extendToWaypoints: true,
        missingRouteTolerance: 1,
        styles: [{
            color: "rgb(37,80,240)",
            opacity: 1,
            weight: 8
        }]
    },
}

export async function startRoute(opt: {
    from: L.LatLng | null,
    to: L.LatLng,
    updateOwnLocation?: (loc: L.LatLng) => void
}): Promise<RoutingResult> {
    return new Promise<RoutingResult>((fullfillRouting) => {
        const withFrom = (from: L.LatLng, ignoreLocUpdate?: boolean) => {
            if (opt.updateOwnLocation && !ignoreLocUpdate) {
                opt.updateOwnLocation(from)
            }
            const waypoints = [from, opt.to]
            const plan = new L.Routing.Plan(waypoints, {
                createMarker: (i, waypoint, n) => {
                    switch (waypoint.latLng) {
                    case from: return false;
                    case opt.to: return false;
                    default: return L.marker(waypoint.latLng, stopLocationMarkerOptions);
                    }
                }
            })
            const control = L.Routing.control({
                ...routeControlOptions,
                waypoints,
                plan,
            })

            const routesFoundProm = new Promise<RoutingData>((fullfillRoutingResultEvent, rejectRoutingResultEvent) => {
                control.on('routesfound', (e: L.Routing.RoutingResultEvent) => {
                    if (e.routes.length > 0) {
                        const totalDistance = e.routes[0].summary?.totalDistance || 0
                        const totalDuration = e.routes[0].summary?.totalTime || 0
                        fullfillRoutingResultEvent({
                            totalDistance,
                            totalDuration
                        })
                    } else {
                        rejectRoutingResultEvent(new Error('no routes found'))
                    }
                })
            })
            
            fullfillRouting({
                routes: routesFoundProm,
                control: control
            })
        }
        if (opt.from) {
            withFrom(opt.from, true)
        } else {
            getGeoLocation(withFrom)
        }
    })
}

function routingMarkers(i: number, waypoint: any, n: number) {
    const marker = L.marker(waypoint.latLng, ownLocationMarkerOptions)
    return marker
}