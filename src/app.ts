// Import React and ReactDOM
import React from 'react';
import { createRoot } from 'react-dom/client';

// Import Framework7
import Framework7 from 'framework7';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import './css/icons.css';
import './css/app.less';

// Import App Component
import App from './components/LocatifyApp.tsx';

import Sheet from 'framework7/components/sheet';
import Fab from 'framework7/components/fab';
import Actions from 'framework7/components/actions'

Framework7.use([Sheet, Fab, Actions])

// Init F7 React Plugin
Framework7.use(Framework7React)

// Mount React App
const root = createRoot(document.getElementById('app')!);
root.render(React.createElement(App));