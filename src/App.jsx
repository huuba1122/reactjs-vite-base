import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { localeState } from '@recoil/atoms/locale';
import { useLocale } from 'ttag';
import LocaleService from '@services/utils/i18n';

import Index from './routes';

import './App.css';

// ----------------------------------------------------------------
function App() {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [locale, setLocale] = useRecoilState(localeState);
  useLocale(locale);
  React.useEffect(() => {
    LocaleService.fetchLocales().then(() => {
      setDataLoaded(true);
      setLocale(LocaleService.setLocale(locale));
    });
  }, []);
  if (!dataLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`localization ${locale}`}>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </div>
  );
}

export default App;
