import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n/i18n.js';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from './components/Protection/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
    <AuthProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <App />
        </NextThemesProvider>
      </NextUIProvider>
    </AuthProvider>
  //</React.StrictMode>
);
