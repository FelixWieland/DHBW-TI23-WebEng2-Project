import React, { useState, useEffect, useCallback } from 'react';

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
  const [location, setLocation] = useState<LatLng | null>(null)

  const onLocationSelection = useCallback((latLng: LatLng) => setLocation(latLng), [])
  const onClearLocation = useCallback(() => setLocation(null), [])

  return (
    <App {...f7params}>
      <View main>
        <Page>
          <InteractiveMap 
            latLngExpression={dhbwLatLngTuple}
            tileVariant={tileVariant}
            selectedLocation={location}
            onLocationSelection={onLocationSelection}
          />
          <LocationInformationModal 
            onDismiss={onClearLocation}
            content={location ? <LocationInformationContent latLng={location} /> : null}
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