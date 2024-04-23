import { useCallback, useEffect, useMemo, useState } from "react";
import {divIcon, LatLng, LatLngExpression, LeafletMouseEvent, map, Map, marker, routing, tileLayer} from 'leaflet'

import '../css/interactive-map.css'
import 'leaflet/dist/leaflet.css'
import { TileVariant, changeMapLayer, ownLocationMarkerOptions, selectedLocationMarkerOptions } from "../functions/interactiveMap";
import { Icon } from "framework7-react";
import { RoutingControl } from "../functions/routing";

interface MapProps {
  latLngExpression: LatLngExpression
  tileVariant: TileVariant,
  selectedLocation: LatLng | null,
  onLocationSelection: (latLng: LatLng) => void
  ownLocation: LatLng | null,
  routingControl: RoutingControl | null
}

export const InteractiveMap: React.FC<MapProps> = ({
  latLngExpression,
  tileVariant,
  selectedLocation,
  onLocationSelection,
  ownLocation,
  routingControl
}) => {
  const [leaflet, setLeaflet] = useState<Map | null>(null)
  const initLeaflet = useCallback((div: HTMLDivElement | null) => {
    if (leaflet) {
      leaflet.off().remove();
    }
    if (div) {
      setLeaflet(map(div, { zoomControl: false, attributionControl: false }))
    }
  }, [])

  useEffect(() => {
    if (leaflet) {
      leaflet.touchZoom.enable();
      leaflet.doubleClickZoom.disable();
      leaflet.scrollWheelZoom.enable();
      leaflet.setView(latLngExpression, 14);
      setTimeout(() => leaflet.invalidateSize(), 1)
    }
  }, [leaflet])

  useEffect(() => {
    if (leaflet) {
      changeMapLayer(leaflet, tileVariant)
    }
  }, [leaflet, tileVariant])

  useEffect(():void => {
    if (!leaflet) return;

    leaflet.addEventListener("click", (e:LeafletMouseEvent):void => {
      console.log(e.latlng);
      onLocationSelection(e.latlng)
    });
  }, [leaflet, onLocationSelection]);

  useEffect(() => {
    if (leaflet && selectedLocation) {
      const m = marker(selectedLocation, selectedLocationMarkerOptions).addTo(leaflet);
      return () => { 
        m.removeFrom(leaflet) 
      }
    }
    return () => {}
  }, [leaflet, selectedLocation])

  useEffect(() => {
    if (leaflet && ownLocation) {
      const m = marker(ownLocation, ownLocationMarkerOptions).addTo(leaflet);
      return () => { 
        m.removeFrom(leaflet) 
      }
    }
    return () => {}
  }, [leaflet, ownLocation])

  useEffect(() => {
    if (leaflet && routingControl) {
      leaflet.addControl(routingControl)
      console.log(routingControl)
      return () => leaflet.removeControl(routingControl)
    }
    return () => {}
  }, [leaflet, routingControl])

  return (
    <div className={'interactive-map-root'} ref={initLeaflet}>

    </div>
  );
};