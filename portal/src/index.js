import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './components/i18n/i18n';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import './App.css';
import { AuthProvider } from './components/Protection/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '#422ECF',
      primaryLightHover: '#422ECF',
      primaryLightActive: '#422ECF',
      primaryLightContrast: '#FFFFFF',
      primary: '#422ECF',
      primaryBorder: '#6fcf97',
      primaryBorderHover: '#6fcf97',
      primarySolidHover: '#6fcf97',
      primarySolidContrast: '$white',
      primaryShadow: '#6fcf97',
      background: '#202124',
      backgroundAlpha: '#202124',
      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',
      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    space: {},
    fonts: {}
  },
})

root.render(
  <React.StrictMode>
    <AuthProvider>
    <NextUIProvider theme={theme}>
      <App />
    </NextUIProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
