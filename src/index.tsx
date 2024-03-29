import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import placesMock from './mocks/places-mock.ts';
import reviewsMock from './mocks/reviews-mock.ts';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      placesMock = {placesMock}
      reviews = {reviewsMock}
    />
  </React.StrictMode>
);
