import { useCallback, useEffect, useMemo, useState } from "react";
import {LatLngExpression, LeafletMouseEvent, map, Map, tileLayer} from 'leaflet'
import { TileVariant } from "../LayerChangeButton";

import styles from './InteractiveMap.module.css'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  latLngExpression: LatLngExpression
  tileVariant: TileVariant
}

const deTiles = 'https://tile.openstreetmap.de/{z}/{x}/{y}.png'
const satTiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

const tileOptions = { maxZoom: 19 }
const satLayer = tileLayer(satTiles, tileOptions)
const deLayer = tileLayer(deTiles, tileOptions)

export const InteractiveMap: React.FC<MapProps> = ({
  latLngExpression,
  tileVariant
}) => {
  const [leaflet, setLeaflet] = useState<Map | null>(null)
  const initLeaflet = useCallback((div: HTMLDivElement | null) => {
    if (leaflet) {
      leaflet.off().remove();
    }
    if (div) {
      setLeaflet(map(div, { zoomControl: false }))
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
      leaflet.removeLayer(satLayer)
      leaflet.removeLayer(deLayer)
      switch (tileVariant) {
        case 'street':
          leaflet.addLayer(deLayer)
          break;
        case 'sat':
          leaflet.addLayer(satLayer)
          break;
      }
    }
  }, [leaflet, tileVariant])

  useEffect(():void => {
    if (!leaflet) return;

    leaflet.addEventListener("click", (e:LeafletMouseEvent):void => {
      console.log(e.latlng);
      ///TODO: Modal öffnen (LatLng übergeben)
    });
  }, [leaflet]);

  return (
    <div className={styles.root} ref={initLeaflet}>

    </div>
  );
};
