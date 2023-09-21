import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          login:{
            Welcome: 'Welcome',
            Password: 'Password',
            Email: 'Email',
            Login: 'Login',
            StayLogged: 'Remember me',
            AllRights: 'All rights reserved',
            emailRequired: 'Email is required',
            passwordRequired: 'Password is required',
            emailInvalid: 'Invalid email address',
          }
        }
      },
      es: {
        translation: {
          login:{
            Welcome: 'Bienvenido',
            Password: 'Contraseña',
            Email: 'Correo electrónico',
            Login: 'Iniciar sesión',
            StayLogged: 'Recuerdame',
            AllRights: 'Todos los derechos reservados',
            emailRequired: 'El correo electrónico es requerido',
            passwordRequired: 'La contraseña es requerida',
            emailInvalid: 'Correo electrónico inválido',
          }
        }
      }
    }
  });

export default i18n;