import { useCallback, useEffect, useMemo, useState } from "react";
import {divIcon, LatLng, LatLngExpression, LeafletMouseEvent, map, Map, marker, tileLayer} from 'leaflet'

import '../css/interactive-map.css'
import 'leaflet/dist/leaflet.css'
import { TileVariant, changeMapLayer } from "../functions/interactiveMap";
import { Icon } from "framework7-react";

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
      const m = marker(selectedLocation, {
        icon: divIcon({
          html: `<svg class="interactive-map-marker-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PlaceIcon"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"></path></svg>`
        })
      }).addTo(leaflet);
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