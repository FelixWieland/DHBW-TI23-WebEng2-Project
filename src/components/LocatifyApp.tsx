import React, { useState, useEffect, useCallback, useMemo } from 'react';

import {
  f7ready,
  App,
  Link,
  Navbar,
  Page,
  Toolbar,
  View,
} from 'framework7-react';
import { InteractiveMap } from './InteractiveMap';
import { LatLng } from 'leaflet';
import { TileVariant } from '../functions/interactiveMap';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { LocationInformationContent } from './LocationInformationContent';
import { LocationInformationModal } from './LocationInformationModal';
import { MapTileVariantChangeButton } from './MapTileLayerChangeButton';
import { LocationInformationSidePanel } from './LocationInformationSidePanel';
import { LocateSelfButton } from './LocateSelfButton';
import { RoutingControl, RoutingData, startRoute } from '../functions/routing';

const f7params = {
  name: 'locatify',
  theme: 'auto',
  serviceWorker: process.env.NODE_ENV === 'production' ? {
    path: '/service-worker.js',
  } : {},
};


const dhbwLatLngTuple: [number, number, number?] = [47.6655626961182, 9.447195457639792, undefined]

const LocatifyApp = () => {
  const [tileVariant, setTileVariant] = useLocalStorageState<TileVariant>('leaflet-tile-variant', 'street')
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null)
  const [ownLocation, setOwnLocation] = useState<LatLng | null>(null)
  const [routingControl, setRoutingControl] = useState<RoutingControl | null>(null)
  const [routingData, setRoutingData] = useState<RoutingData | null>(null)

  const updateRoute = useCallback((latLng: LatLng) => {
    startRoute({
      updateOwnLocation: setOwnLocation,
      to: latLng,
      from: ownLocation
    }).then((obj) => {
      setRoutingControl(obj.control)
      obj.routes.then(setRoutingData)
    })
  }, [])

  const onRouteStart = useCallback(() => {
    if (selectedLocation) {
      updateRoute(selectedLocation)
    }
  }, [selectedLocation, ownLocation])

  const onLocationSelection = useCallback((latLng: LatLng) => {
    setSelectedLocation(latLng)
    if (routingControl) {
      updateRoute(latLng)
    }
  }, [ownLocation])

  const onClearLocation = useCallback(() => {
    setRoutingData(null)
    setRoutingControl(null)
    setSelectedLocation(null)
  }, [])

  const content = useMemo(() => selectedLocation ? 
    <LocationInformationContent 
      onRouteStart={onRouteStart} 
      latLng={selectedLocation} 
      routingData={routingData}
    /> : null, 
  [selectedLocation, onRouteStart, routingData])

  return (
    <App {...f7params}>
      <View main>
        <Page>
          <InteractiveMap
            latLngExpression={dhbwLatLngTuple}
            tileVariant={tileVariant}
            selectedLocation={selectedLocation}
            onLocationSelection={onLocationSelection}
            ownLocation={ownLocation}
            routingControl={routingControl}
          />
          <LocationInformationSidePanel
            onDismiss={onClearLocation}
            content={content}
          />
          <LocationInformationModal
            onDismiss={onClearLocation}
            content={content}
          />
          <LocateSelfButton
            onChangeOwnLocation={setOwnLocation}
          />
          <MapTileVariantChangeButton
            tileVariant={tileVariant}
            onChangeTileVariant={setTileVariant}
          />
        </Page>
      </View>
    </App>
  )
}
export default LocatifyApp;