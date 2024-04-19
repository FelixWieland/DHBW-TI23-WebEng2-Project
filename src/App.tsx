import { IonApp, IonContent, IonPage, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/** Ionic Dark Mode */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';

/* Components */
import { InteractiveMap } from './components/InteractiveMap';
import { LayerChangeButton, TileVariant } from './components/LayerChangeButton';
import { useCallback, useState } from 'react';
import { LocationInformationModal } from './components/LocationInformationModal/LocationInformationModal';
import { LatLng } from 'leaflet';
import { LocationInformationContent } from './components/LocationInformationContent';

const dhbwLatLngTuple: [number, number, number?] = [47.6655626961182, 9.447195457639792, undefined]

setupIonicReact({
  mode: 'ios'
});

const App: React.FC = () => {
  const [tileVariant, setTileVariant] = useState<TileVariant>('street')
  const [location, setLocation] = useState<LatLng | null>(null)

  const onLocationSelection = useCallback((latLng: LatLng) => setLocation(latLng), [])
  const onClearLocation = useCallback(() => setLocation(null), [])

  return (
    <IonApp>
      <IonPage>
        <IonContent fullscreen>
          <InteractiveMap
            latLngExpression={dhbwLatLngTuple}
            tileVariant={tileVariant}
            onLocationSelection={onLocationSelection}
          />
          <LayerChangeButton
            tileVariant={tileVariant}
            onChange={setTileVariant}
          />
          <LocationInformationModal 
            onDismiss={onClearLocation}
            content={location ? <LocationInformationContent latLng={location} /> : null}
          />
        </IonContent>
      </IonPage>
    </IonApp>
  )
};

export default App;
