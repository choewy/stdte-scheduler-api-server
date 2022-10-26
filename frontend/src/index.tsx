import './index.css';

import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/app';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <Suspense fallback={<div>Loading</div>}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
