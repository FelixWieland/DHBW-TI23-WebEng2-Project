import { useCallback, useEffect, useMemo, useState } from "react";
import {LatLng, LatLngExpression, LeafletMouseEvent, map, Map, marker, tileLayer} from 'leaflet'

import '../css/interactive-map.css'
import 'leaflet/dist/leaflet.css'
import { TileVariant, changeMapLayer } from "../functions/interactiveMap";

interface MapProps {
  latLngExpression: LatLngExpression
  tileVariant: TileVariant,
  selectedLocation: LatLng | null,
  onLocationSelection: (latLng: LatLng) => void
}

export const InteractiveMap: React.FC<MapProps> = ({
  latLngExpression,
  tileVariant,
  selectedLocation,
  onLocationSelection
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
      const m = marker(selectedLocation).addTo(leaflet);
      return () => { 
        m.removeFrom(leaflet) 
      }
    }
    return () => {}
  }, [leaflet, selectedLocation])

  return (
    <div className={'interactive-map-root'} ref={initLeaflet}>

    </div>
  );
};