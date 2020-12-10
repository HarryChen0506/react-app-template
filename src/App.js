import React from 'react';
import Intl from '@/locales/Intl';
import Router from './router';
import './App.less';

const App = () => (
  <Intl>
    <div className="app">
      <Router />
    </div>
  </Intl>
);

export default App;
